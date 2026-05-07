import { CalendarDays, Globe, Building2, Link as LinkIcon, Trash2, Edit2, Clock } from 'lucide-react';
import type { Application } from '../types';
import styles from './ApplicationDetails.module.css';

interface DetailsProps {
    app: Application;
    onEdit: () => void;
    onDelete: () => void;
}

export const ApplicationDetails = ({ app, onEdit, onDelete }: DetailsProps) => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <span className={styles.companyName}>{app.company.name}</span>
                    <span className={styles.position}>{app.position}</span>
                </div>
            </div>

            <div className={styles.grid}>
                <div className={styles.item}>
                    <span className={styles.label}>Статус</span>
                    <span className={styles.value}>{app.status}</span>
                </div>
                <div className={styles.item}>
                    <span className={styles.label}>Приоритет</span>
                    <span className={styles.value}>{app.priority}</span>
                </div>
                <div className={styles.item}>
                    <span className={styles.label}>Зарплата</span>
                    <span className={styles.value}>
                        {app.salaryFrom || app.salaryTo ? `${app.salaryFrom || 0} - ${app.salaryTo || '...'} ₽` : 'Не указана'}
                    </span>
                </div>
                <div className={styles.item}>
                    <span className={styles.label}>Формат</span>
                    <span className={styles.value}>
                        {app.format === 'Remote' ? <><Globe size={16} /> Удаленка</> : <><Building2 size={16} /> Офис ({app.company.city || '—'})</>}
                    </span>
                </div>
                {app.internshipDuration && (
                    <div className={styles.item}>
                        <span className={styles.label}>Стажировка</span>
                        <span className={styles.value}><Clock size={16} /> {app.internshipDuration} мес.</span>
                    </div>
                )}
                <div className={styles.item}>
                    <span className={styles.label}>Создано</span>
                    <span className={styles.value}><CalendarDays size={16} /> {new Date(app.createdAt).toLocaleDateString()}</span>
                </div>
            </div>

            {app.link && (
                <div className={styles.item}>
                    <span className={styles.label}>Ссылка на вакансию</span>
                    <a href={app.link} target="_blank" rel="noreferrer" className={styles.value} style={{ color: 'var(--primary-color)' }}>
                        <LinkIcon size={16} /> Перейти на сайт
                    </a>
                </div>
            )}

            <div className={styles.notesSection}>
                <span className={styles.label}>Заметки</span>
                <div className={styles.notesContent}>{app.notes || 'Нет дополнительных заметок'}</div>
            </div>

            <div className={styles.footer}>
                <button className={styles.editBtn} onClick={onEdit}><Edit2 size={18} /> Редактировать</button>
                <button className={styles.deleteBtn} onClick={onDelete}><Trash2 size={18} /> Удалить отклик</button>
            </div>
        </div>
    );
};