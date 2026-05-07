import type { DraggableProvided } from '@hello-pangea/dnd';
import { Trash2, Globe, Building2, MapPin, CalendarDays, Flame, Zap, Snowflake, Edit2 } from 'lucide-react';
import type { Application } from '../types';
import styles from './KanbanCard.module.css';

interface KanbanCardProps {
  app: Application;
  provided: DraggableProvided;
  onDelete: (id: number) => void;
  onEdit: (app: Application) => void;
  onView: (app: Application) => void; // Добавлено и используется
}

const renderPriority = (priority: string) => {
  switch (priority) {
    case 'High': return <span className={styles.priorityBadge} style={{ color: 'var(--danger-color)', backgroundColor: 'rgba(239,68,68,0.1)' }}><Flame size={12} /> Высокий</span>;
    case 'Medium': return <span className={styles.priorityBadge} style={{ color: 'var(--primary-color)', backgroundColor: 'rgba(79,70,229,0.1)' }}><Zap size={12} /> Средний</span>;
    case 'Low': return <span className={styles.priorityBadge} style={{ color: 'var(--text-secondary)', backgroundColor: 'var(--bg-main)' }}><Snowflake size={12} /> Низкий</span>;
    default: return null;
  }
};

export const KanbanCard = ({ app, provided, onDelete, onEdit, onView }: KanbanCardProps) => {
  return (
    <div
      className={styles.card}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      onClick={() => onView(app)} 
    >
      <div className={styles.cardHeader}>
        <span className={styles.companyName}>{app.company.name}</span>
        <div className={styles.actions}>
          <button className={styles.actionBtn} onClick={(e) => { e.stopPropagation(); onEdit(app); }}>
            <Edit2 size={14} />
          </button>
          <button className={`${styles.actionBtn} ${styles.deleteBtn}`} onClick={(e) => { e.stopPropagation(); onDelete(app.id); }}>
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      <div className={styles.position}>{app.position}</div>

      <div className={styles.cardDetails}>
        {renderPriority(app.priority)}
        {app.company.city && <span className={styles.detailBadge}><MapPin size={12} /> {app.company.city}</span>}
        {app.internshipDuration && <span className={styles.detailBadge}><CalendarDays size={12} /> {app.internshipDuration} мес.</span>}
      </div>

      <div className={styles.cardFooter}>
        <span className={styles.salary}>{app.salaryFrom ? `${app.salaryFrom} ₽` : 'З/П не указана'}</span>
        <span className={styles.formatBadge}>
          {app.format === 'Remote' ? <><Globe size={14} /> Удаленка</> : <><Building2 size={14} /> Офис</>}
        </span>
      </div>
    </div>
  );
};