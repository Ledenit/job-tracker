import { DragDropContext, type DropResult } from '@hello-pangea/dnd';
import { useApplications, useUpdateStatus, useDeleteApplication } from '../hooks/useApplications';
import { KanbanColumn } from '../components/KanbanColumn';
import styles from './KanbanBoard.module.css';

const COLUMNS = [
  { id: 'Sent', title: 'Отправлено' },
  { id: 'Interview', title: 'Собеседование' },
  { id: 'Offer', title: 'Оффер' },
  { id: 'Rejected', title: 'Отказ' }
];

export const KanbanBoard = () => {
  const { data: applications, isLoading } = useApplications();
  const { mutate: updateStatus } = useUpdateStatus();
  const { mutate: deleteApp } = useDeleteApplication();

  if (isLoading) return <h2>Загрузка доски...</h2>;
  if (!applications) return null;

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination || destination.droppableId === source.droppableId) return;

    updateStatus({ 
      id: Number(draggableId), 
      status: destination.droppableId 
    });
  };

  return (
    <div className={styles.boardContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>Kanban Доска</h2>
      </div>
      
      <DragDropContext onDragEnd={onDragEnd}>
        <div className={styles.board}>
          {COLUMNS.map(column => (
            <KanbanColumn 
              key={column.id}
              id={column.id}
              title={column.title}
              applications={applications.filter(app => app.status === column.id)}
              onDelete={deleteApp}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};