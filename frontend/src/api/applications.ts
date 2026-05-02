import type { Application, CreateApplicationDTO } from '../types';

const API_URL = 'http://localhost:5000/api/applications';

export const getApplications = async (): Promise<Application[]> => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Ошибка загрузки откликов');
  return res.json();
};

export const createApplication = async (data: CreateApplicationDTO): Promise<Application> => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Ошибка создания отклика');
  return res.json();
};

export const updateApplicationStatus = async ({ id, status }: { id: number; status: string }): Promise<Application> => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error('Ошибка обновления статуса');
  return res.json();
};

export const deleteApplication = async (id: number): Promise<void> => {
  const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Ошибка удаления');
};