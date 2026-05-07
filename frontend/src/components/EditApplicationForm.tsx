import { useState } from 'react';
import toast from 'react-hot-toast';
import { useUpdateApplication } from '../hooks/useApplications';
import { CustomSelect } from './CustomSelect';
import styles from './AddApplicationForm.module.css';
import type { Application } from '../types';

interface EditFormProps {
    app: Application;
    onClose: () => void;
}

export const EditApplicationForm = ({ app, onClose }: EditFormProps) => {
    const { mutate: updateApp, isPending } = useUpdateApplication();

    const [formData, setFormData] = useState({
        companyName: app.company.name,
        position: app.position,
        format: app.format,
        link: app.link || '',
        isAccredited: app.company.isAccredited,
        city: app.company.city || '',
        priority: app.priority,
        salaryFrom: app.salaryFrom || '',
        salaryTo: app.salaryTo || '',
        internshipDuration: app.internshipDuration || '',
        notes: app.notes || '',
        status: app.status
    });

    const validateForm = () => {
        if (!formData.companyName.trim() || !formData.position.trim()) {
            toast.error('Заполните обязательные поля');
            return false;
        }
        if (formData.salaryFrom !== '' && Number(formData.salaryFrom) < 0) {
            toast.error('Зарплата не может быть меньше 0');
            return false;
        }
        if (formData.salaryTo !== '' && Number(formData.salaryFrom) > Number(formData.salaryTo)) {
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

        updateApp(
            { id: app.id, data: formData },
            { onSuccess: () => onClose() }
        );
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
            <h2 className={styles.title}>Редактировать отклик</h2>
            <form className={styles.form} onSubmit={handleSubmit}>

                <div className={styles.row}>
                    <div className={styles.col}>
                        <label>Компания <span className={styles.required}>*</span></label>
                        <input name="companyName" value={formData.companyName} disabled onChange={handleChange} />
                    </div>
                    <div className={styles.col}>
                        <label>Должность <span className={styles.required}>*</span></label>
                        <input name="position" value={formData.position} onChange={handleChange} />
                    </div>
                </div>

                <div className={styles.row}>
                    <div className={styles.col}>
                        <label>Зарплата ОТ (руб)</label>
                        <input type="number" name="salaryFrom" value={formData.salaryFrom} onChange={handleChange} min="0" />
                    </div>
                    <div className={styles.col}>
                        <label>Зарплата ДО (руб)</label>
                        <input type="number" name="salaryTo" value={formData.salaryTo} onChange={handleChange} min="0" />
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
                        <input type="url" name="link" value={formData.link} onChange={handleChange} />
                    </div>
                    <div className={styles.col}>
                        <label>Стажировка (мес.)</label>
                        <input type="number" name="internshipDuration" value={formData.internshipDuration} onChange={handleChange} min="1" max="12" />
                    </div>
                </div>

                <div className={`${styles.formGroup} ${styles.checkboxGroup}`}>
                    <input type="checkbox" id="isAccreditedEdit" name="isAccredited" checked={formData.isAccredited} onChange={handleChange} />
                    <label htmlFor="isAccreditedEdit">IT-аккредитация</label>
                </div>

                <div className={styles.formGroup}>
                    <label>Заметки</label>
                    <textarea
                        name="notes"
                        className={styles.textarea}
                        value={formData.notes}
                        onChange={handleChange} // ТЕПЕРЬ ОШИБКИ НЕТ
                        placeholder="Контакты HR, стек технологий..."
                        rows={3}
                    />
                </div>

                <button type="submit" className={styles.submitBtn} disabled={isPending}>
                    {isPending ? 'Сохранение...' : 'Сохранить изменения'}
                </button>
            </form>
        </div>
    );
};