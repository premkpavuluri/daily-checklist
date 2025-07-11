import React from 'react';
import Button from '../atoms/Button';
import Icon from '../atoms/Icon';

export type TaskState = 'created' | 'in-progress' | 'done';

export interface Task {
  id: string;
  title: string;
  description?: string;
  deadline?: string;
  timeEstimate?: string;
  state: TaskState;
  important: boolean;
  urgent: boolean;
}

interface TaskCardProps {
  task: Task;
  onStateChange: (state: TaskState) => void;
  onEdit: () => void;
  onDelete: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onStateChange, onEdit, onDelete }) => {
  return (
    <div className="task-card" style={{ border: '1px solid #eee', borderRadius: 8, padding: 16, marginBottom: 12, background: '#fff' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4>{task.title}</h4>
        <span>
          <Button variant="secondary" onClick={onEdit}><Icon name="edit" /></Button>
          <Button variant="danger" onClick={onDelete}><Icon name="delete" /></Button>
        </span>
      </div>
      {task.description && <div style={{ margin: '8px 0' }}>{task.description}</div>}
      <div style={{ display: 'flex', gap: 12, fontSize: 12, color: '#888' }}>
        {task.deadline && <span><Icon name="calendar" /> {task.deadline}</span>}
        {task.timeEstimate && <span><Icon name="clock" /> {task.timeEstimate} min</span>}
      </div>
      <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
        {task.state === 'created' && <Button onClick={() => onStateChange('in-progress')}>In Progress</Button>}
        {task.state === 'in-progress' && <Button variant="secondary" onClick={() => onStateChange('created')}>Pause</Button>}
        {task.state !== 'done' && <Button variant="success" onClick={() => onStateChange('done')}>Done</Button>}
      </div>
    </div>
  );
};

export default TaskCard; 