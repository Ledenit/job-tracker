import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('JobTracker API is running!');
});


app.get('/api/applications', async (req, res, next) => {
  try {
    const applications = await prisma.application.findMany({
      include: { company: true },
      orderBy: { order: 'asc' },
    });
    res.json(applications);
  } catch (error) {
    next(error);
  }
});

app.put('/api/applications/reorder', async (req, res, next) => {
  try {
    const { updates } = req.body; 
    
    const transaction = updates.map((u) => 
      prisma.application.update({
        where: { id: u.id },
        data: { status: u.status, order: u.order }
      })
    );
    await prisma.$transaction(transaction);
    
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

app.post('/api/applications', async (req, res, next) => {
  try {
    const { companyName, isAccredited, city, position, salaryFrom, salaryTo, format, link, internshipDuration, priority } = req.body;

    if (!companyName || !position) {
      return res.status(400).json({ success: false, message: 'Поля Компания и Должность обязательны' });
    }
    if (salaryFrom < 0 || salaryTo < 0) {
      return res.status(400).json({ success: false, message: 'Зарплата не может быть отрицательной' });
    }

    const newApplication = await prisma.application.create({
      data: {
        position, salaryFrom, salaryTo, format, link, internshipDuration, priority,
        company: {
          connectOrCreate: {
            where: { name: companyName },
            create: { name: companyName, isAccredited, city },
          },
        },
      },
      include: { company: true },
    });
    res.status(201).json(newApplication);
  } catch (error) {
    next(error);
  }
});

app.put('/api/applications/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, notes, position, salaryFrom, salaryTo, format, link, internshipDuration, priority } = req.body;

    // Валидация
    if (salaryFrom < 0 || salaryTo < 0) {
      return res.status(400).json({ success: false, message: 'Зарплата не может быть отрицательной' });
    }
    if (salaryFrom && salaryTo && salaryTo < salaryFrom) {
      return res.status(400).json({ success: false, message: 'Зарплата ДО не может быть меньше Зарплаты ОТ' });
    }

    const updated = await prisma.application.update({
      where: { id: Number(id) },
      data: { status, notes, position, salaryFrom, salaryTo, format, link, internshipDuration, priority },
      include: { company: true },
    });
    res.json(updated);
  } catch (error) {
    next(error);
  }
});

app.delete('/api/applications/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.application.delete({
      where: { id: Number(id) },
    });
    res.json({ success: true, message: 'Отклик успешно удален' });
  } catch (error) {
    next(error);
  }
});


app.use((err, req, res, next) => {
  console.error('ERROR:', err.stack);

  res.status(500).json({
    success: false,
    message: err.message || 'Внутренняя ошибка сервера',
  });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});