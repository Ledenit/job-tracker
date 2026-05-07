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

export const updateApplication = async ({ id, data }: { id: number; data: any }): Promise<Application> => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Ошибка обновления');
  return res.json();
};

export const reorderApplications = async (updates: { id: number; status: string; order: number }[]) => {
  const res = await fetch(`${API_URL}/reorder`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ updates }),
  });
  if (!res.ok) throw new Error('Ошибка сохранения порядка');
  return res.json();
};