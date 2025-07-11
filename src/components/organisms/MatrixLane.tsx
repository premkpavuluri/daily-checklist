import React from 'react';
import TaskCard, { Task, TaskState } from '../molecules/TaskCard';

export type Quadrant = 'do-first' | 'schedule' | 'delegate' | 'eliminate' | 'done';

const quadrantMeta: Record<Quadrant, { title: string; colorVar: string; description: string; textColor?: string }> = {
  'do-first': { title: 'Do First', colorVar: 'var(--lane-do-first)', description: 'Urgent & Important', textColor: '#b91c1c' },
  'schedule': { title: 'Schedule', colorVar: 'var(--lane-schedule)', description: 'Not Urgent & Important', textColor: '#2563eb' },
  'delegate': { title: 'Delegate', colorVar: 'var(--lane-delegate)', description: 'Urgent & Not Important', textColor: '#b59f00' },
  'eliminate': { title: 'Eliminate', colorVar: 'var(--lane-eliminate)', description: 'Not Urgent & Not Important', textColor: '#22223b' },
  'done': { title: 'Done', colorVar: 'var(--lane-done)', description: 'Completed Tasks', textColor: '#16a34a' },
};

interface MatrixLaneProps {
  quadrant: Quadrant;
  tasks: Task[];
  onTaskStateChange: (taskId: string, state: TaskState) => void;
  onEditTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
}

const MatrixLane: React.FC<MatrixLaneProps> = ({ quadrant, tasks, onTaskStateChange, onEditTask, onDeleteTask }) => {
  const meta = quadrantMeta[quadrant];
  return (
    <section style={{
      background: meta.colorVar,
      borderRadius: 16,
      padding: 18,
      minHeight: '70vh',
      flex: 1,
      margin: 8,
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 2px 8px #0001',
      border: '1.5px solid #e5e7eb',
      transition: 'background 0.2s',
    }}>
      <header style={{ marginBottom: 8 }}>
        <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: meta.textColor }}>{meta.title}</h3>
        <div style={{ fontSize: 13, color: '#888', fontWeight: 500 }}>{meta.description}</div>
      </header>
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {tasks.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#bbb', marginTop: 32, fontSize: 16 }}>
            No active tasks
          </div>
        ) : (
          tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onStateChange={state => onTaskStateChange(task.id, state)}
              onEdit={() => onEditTask(task.id)}
              onDelete={() => onDeleteTask(task.id)}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default MatrixLane; 