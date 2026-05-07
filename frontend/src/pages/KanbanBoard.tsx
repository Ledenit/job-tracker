import { useState, useEffect } from 'react';
import { DragDropContext, type DropResult } from '@hello-pangea/dnd';
import { useApplications, useReorderApplications, useDeleteApplication } from '../hooks/useApplications';
import { KanbanColumn } from '../components/KanbanColumn';
import { Modal } from '../components/Modal';
import { EditApplicationForm } from '../components/EditApplicationForm';
import type { Application } from '../types';
import styles from './KanbanBoard.module.css';
import { ApplicationDetails } from '../components/ApplicationDetails';

const COLUMNS = [
  { id: 'Sent', title: 'Отправлено' },
  { id: 'Interview', title: 'Собеседование' },
  { id: 'Offer', title: 'Оффер' },
  { id: 'Rejected', title: 'Отказ' }
];

export const KanbanBoard = () => {
  const { data: serverApps, isLoading } = useApplications();
  const { mutate: reorderApps } = useReorderApplications();
  const { mutate: deleteApp } = useDeleteApplication();

  const [localApps, setLocalApps] = useState<Application[]>([]);
  const [viewingApp, setViewingApp] = useState<Application | null>(null);
  const [editingApp, setEditingApp] = useState<Application | null>(null);

  useEffect(() => {
    if (serverApps) setLocalApps(serverApps);
  }, [serverApps]);

  if (isLoading && localApps.length === 0) return <h2>Загрузка...</h2>;

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const sourceColumnApps = localApps.filter(app => app.status === source.droppableId);
    const movedApp = sourceColumnApps[source.index];

    let newLocalApps = [...localApps];

    newLocalApps = newLocalApps.filter(app => app.id !== movedApp.id);

    const updatedApp = { ...movedApp, status: destination.droppableId };

    const destColumnApps = newLocalApps.filter(app => app.status === destination.droppableId);
    destColumnApps.splice(destination.index, 0, updatedApp);

    newLocalApps = [
      ...newLocalApps.filter(app => app.status !== destination.droppableId),
      ...destColumnApps
    ];

    setLocalApps(newLocalApps);

    const updates = newLocalApps
      .filter(app => app.status === destination.droppableId || app.status === source.droppableId)
      .map((app, index) => ({ id: app.id, status: app.status, order: index }));

    reorderApps(updates);
  };

   return (
    <div className={styles.boardContainer}>
      <div className={styles.header}><h2 className={styles.title}>Kanban Доска</h2></div>
      
      <DragDropContext onDragEnd={onDragEnd}>
        <div className={styles.board}>
          {COLUMNS.map(column => (
            <KanbanColumn 
              key={column.id}
              id={column.id}
              title={column.title}
              applications={localApps.filter(app => app.status === column.id)}
              onDelete={deleteApp}
              onEdit={setEditingApp} // Упростили передачу
              onView={setViewingApp} // Упростили передачу
            />
          ))}
        </div>
      </DragDropContext>

      <Modal isOpen={!!viewingApp} onClose={() => setViewingApp(null)}>
        {viewingApp && (
          <ApplicationDetails 
            app={viewingApp} 
            onEdit={() => { setEditingApp(viewingApp); setViewingApp(null); }} 
            onDelete={() => { if(window.confirm('Удалить?')) { deleteApp(viewingApp.id); setViewingApp(null); } }} 
          />
        )}
      </Modal>

      <Modal isOpen={!!editingApp} onClose={() => setEditingApp(null)}>
        {editingApp && <EditApplicationForm app={editingApp} onClose={() => setEditingApp(null)} />}
      </Modal>
    </div>
  );
};