import { useState } from 'react';
import toast from 'react-hot-toast';
import { useCreateApplication } from '../hooks/useApplications';
import { CustomSelect } from './CustomSelect';
import styles from './AddApplicationForm.module.css';
import type { CreateApplicationDTO } from '../types';

interface FormProps {
  onClose: () => void;
}

export const AddApplicationForm = ({ onClose }: FormProps) => {
  const { mutate: createApplication, isPending } = useCreateApplication();

  const [formData, setFormData] = useState<CreateApplicationDTO>({
    companyName: '', position: '', format: 'Remote', link: '', isAccredited: false, city: '', priority: 'Medium', notes: ''
  });

  const validateForm = () => {
    if (!formData.companyName.trim() || !formData.position.trim()) {
      toast.error('Заполните обязательные поля');
      return false;
    }
    if (formData.salaryFrom && formData.salaryFrom < 0) {
      toast.error('Зарплата не может быть меньше 0');
      return false;
    }
    if (formData.salaryTo && formData.salaryFrom && formData.salaryTo < formData.salaryFrom) {
      toast.error('Зарплата ДО не может быть меньше зарплаты ОТ');
      return false;
    }
    if (formData.link && !formData.link.startsWith('http')) {
      toast.error('Ссылка должна начинаться с http:// или https://');
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    createApplication(formData, {
      onSuccess: () => onClose()
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    if (type === 'number' && Number(value) < 0) return;

    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? (value === '' ? '' : Number(value)) : value
    }));
  };

  const handleCustomChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div style={{ padding: '30px' }}>
      <h2 className={styles.title}>Добавить отклик</h2>
      <form className={styles.form} onSubmit={handleSubmit}>

        <div className={styles.row}>
          <div className={styles.col}>
            <label>Компания <span className={styles.required}>*</span></label>
            <input name="companyName" value={formData.companyName} onChange={handleChange} placeholder="ООО Яндекс" />
          </div>
          <div className={styles.col}>
            <label>Должность <span className={styles.required}>*</span></label>
            <input name="position" value={formData.position} onChange={handleChange} placeholder="Frontend Developer" />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.col}>
            <label>Зарплата ОТ (руб)</label>
            <input type="number" name="salaryFrom" value={formData.salaryFrom || ''} onChange={handleChange} />
          </div>
          <div className={styles.col}>
            <label>Зарплата ДО (руб)</label>
            <input type="number" name="salaryTo" value={formData.salaryTo || ''} onChange={handleChange} />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.col}>
            <label>Формат работы</label>
            <CustomSelect
              name="format" value={formData.format} onChange={handleCustomChange}
              options={[{ value: 'Remote', label: 'Удаленка' }, { value: 'Office', label: 'Офис' }, { value: 'Hybrid', label: 'Гибрид' }]}
            />
          </div>
          <div className={styles.col}>
            <label>Приоритет</label>
            <CustomSelect
              name="priority" value={formData.priority} onChange={handleCustomChange}
              options={[{ value: 'High', label: 'Высокий' }, { value: 'Medium', label: 'Средний' }, { value: 'Low', label: 'Низкий' }]}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.col}>
            <label>Ссылка на вакансию</label>
            <input type="url" name="link" value={formData.link || ''} onChange={handleChange} placeholder="https://hh.ru/..." />
          </div>
          <div className={styles.col}>
            <label>Стажировка (мес.)</label>
            <input type="number" name="internshipDuration" value={formData.internshipDuration || ''} onChange={handleChange} min="1" max="12" />
          </div>
        </div>

        <div className={`${styles.formGroup} ${styles.checkboxGroup}`}>
          <input type="checkbox" id="isAccredited" name="isAccredited" checked={formData.isAccredited} onChange={handleChange} />
          <label htmlFor="isAccredited">IT-аккредитация</label>
        </div>

        <div className={styles.formGroup}>
          <label>Заметки</label>
          <textarea
            name="notes"
            className={styles.textarea}
            value={formData.notes}
            onChange={handleChange}
            placeholder="Контакты HR, стек технологий..."
            rows={3}
          />
        </div>

        <button type="submit" className={styles.submitBtn} disabled={isPending}>
          {isPending ? 'Сохранение...' : 'Создать карточку'}
        </button>
      </form>
    </div>
  );
};