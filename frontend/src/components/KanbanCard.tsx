import { Trash2, Globe, Building2 } from 'lucide-react';
import type { DraggableProvided } from '@hello-pangea/dnd';
import type { Application } from '../types';
import styles from './KanbanCard.module.css';

interface KanbanCardProps {
  app: Application;
  provided: DraggableProvided;
  onDelete: (id: number) => void;
}

export const KanbanCard = ({ app, provided, onDelete }: KanbanCardProps) => {
  return (
    <div
      className={styles.card}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <div className={styles.cardHeader}>
        <span className={styles.companyName}>{app.company.name}</span>
        <button 
          className={styles.deleteBtn}
          onClick={() => {
            if (window.confirm('Точно удалить?')) onDelete(app.id);
          }}
        >
          <Trash2 size={16} />
        </button>
      </div>
      
      <div className={styles.position}>{app.position}</div>
      
      <div className={styles.cardFooter}>
        <span className={styles.salary}>
          {app.salaryFrom ? `${app.salaryFrom} ₽` : 'З/П не указана'}
        </span>
        
        <span className={styles.formatBadge}>
          {app.format === 'Remote' ? (
            <><Globe size={14} /> Удаленка</>
          ) : (
            <><Building2 size={14} /> Офис</>
          )}
        </span>
      </div>
    </div>
  );
};