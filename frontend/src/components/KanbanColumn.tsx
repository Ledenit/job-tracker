import { Droppable, Draggable } from '@hello-pangea/dnd';
import { KanbanCard } from './KanbanCard';
import type { Application } from '../types';
import styles from './KanbanColumn.module.css';

interface KanbanColumnProps {
  id: string;
  title: string;
  applications: Application[];
  onDelete: (id: number) => void;
  onEdit: (app: Application) => void;
  onView: (app: Application) => void;
}

export const KanbanColumn = ({ id, title, applications, onDelete, onEdit, onView }: KanbanColumnProps) => {
  return (
    <div className={styles.column}>
      <div className={styles.columnHeader}>
        <span>{title}</span>
        <span className={styles.badge}>{applications.length}</span>
      </div>

      <Droppable droppableId={id}>
        {(provided) => (
          <div className={styles.cardList} ref={provided.innerRef} {...provided.droppableProps}>
            {applications.map((app, index) => (
              <Draggable key={app.id} draggableId={app.id.toString()} index={index}>
                {(provided) => (
                  <KanbanCard 
                    app={app} 
                    provided={provided} 
                    onDelete={onDelete} 
                    onEdit={onEdit} 
                    onView={onView} 
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};