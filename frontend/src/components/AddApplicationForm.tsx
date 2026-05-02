import { useState } from 'react';
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
    companyName: '', position: '', format: 'Remote', link: '', isAccredited: false, city: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createApplication(formData, {
      onSuccess: () => onClose(),
      onError: (err) => alert('Ошибка: ' + err.message)
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value }));
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
            <input required name="companyName" value={formData.companyName} onChange={handleChange} placeholder="ООО Яндекс" />
          </div>
          <div className={styles.col}>
            <label>Должность <span className={styles.required}>*</span></label>
            <input required name="position" value={formData.position} onChange={handleChange} placeholder="Frontend Developer" />
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
            <label>Стажировка (мес.)</label>
            <input type="number" name="internshipDuration" value={formData.internshipDuration || ''} onChange={handleChange} />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>Ссылка на вакансию</label>
          <input type="url" name="link" value={formData.link || ''} onChange={handleChange} />
        </div>

        <div className={`${styles.formGroup} ${styles.checkboxGroup}`}>
          <input type="checkbox" id="isAccredited" name="isAccredited" checked={formData.isAccredited} onChange={handleChange} />
          <label htmlFor="isAccredited">IT-аккредитация</label>
        </div>

        <button type="submit" className={styles.submitBtn} disabled={isPending}>
          {isPending ? 'Сохранение...' : 'Создать карточку'}
        </button>
      </form>
    </div>
  );
};