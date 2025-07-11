import React, { useState } from 'react';
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
  const [showDetails, setShowDetails] = useState(true);
  return (
    <div className="task-card" style={{ border: '1px solid #eee', borderRadius: 16, padding: 0, marginBottom: 18, background: '#fff', boxShadow: '0 2px 8px #0001' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 18px 0 18px' }}>
        <div style={{ fontWeight: 700, fontSize: 20, color: '#22223b' }}>{task.title}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button onClick={onEdit} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }} title="Edit"><Icon name="edit" size={18} /></button>
          <button onClick={onDelete} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }} title="Delete"><Icon name="close" size={18} /></button>
        </div>
      </div>
      {/* Hide/Show details */}
      <div style={{ padding: '0 18px', marginTop: 2, marginBottom: 2 }}>
        <button onClick={() => setShowDetails(d => !d)} style={{ background: 'none', border: 'none', color: '#2563eb', fontSize: 14, display: 'flex', alignItems: 'center', cursor: 'pointer', padding: 0 }}>
          <span style={{ marginRight: 4 }}><Icon name={showDetails ? 'close' : 'plus'} size={16} /></span>
          {showDetails ? 'Hide details' : 'Show details'}
        </button>
      </div>
      {/* Details */}
      {showDetails && task.description && (
        <div style={{ background: '#f8fafc', borderRadius: 8, margin: '8px 18px', padding: '12px 14px', fontSize: 16, color: '#22223b' }}>
          {task.description}
        </div>
      )}
      {/* Meta info */}
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '0 18px', marginTop: 4, marginBottom: 2, flexWrap: 'wrap' }}>
        {task.deadline && (
          <span style={{ display: 'inline-flex', alignItems: 'center', background: '#fff7ed', color: '#ea580c', borderRadius: 16, fontSize: 14, fontWeight: 500, padding: '3px 12px', gap: 5 }}>
            <Icon name="calendar" size={16} /> {task.deadline}
          </span>
        )}
        {task.timeEstimate && (
          <span style={{ display: 'inline-flex', alignItems: 'center', background: '#f3f0ff', color: '#a21caf', borderRadius: 16, fontSize: 14, fontWeight: 500, padding: '3px 12px', gap: 5 }}>
            <Icon name="clock" size={16} /> {task.timeEstimate} min
          </span>
        )}
        <span style={{ display: 'inline-flex', alignItems: 'center', background: '#f3f4f6', color: '#64748b', borderRadius: 16, fontSize: 14, fontWeight: 500, padding: '3px 12px', gap: 5 }}>
          <Icon name="clock" size={16} /> Created
        </span>
      </div>
      {/* Actions */}
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '10px 18px 18px 18px', marginTop: 6 }}>
        {task.state === 'created' && (
          <button onClick={() => onStateChange('in-progress')} style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 15, padding: '7px 22px', cursor: 'pointer' }}>Start</button>
        )}
        {task.state === 'in-progress' && (
          <button onClick={() => onStateChange('created')} style={{ background: '#f3f4f6', color: '#2563eb', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 15, padding: '7px 22px', cursor: 'pointer' }}>Pause</button>
        )}
        {task.state !== 'done' && (
          <button onClick={() => onStateChange('done')} style={{ background: '#22c55e', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 15, padding: '7px 22px', cursor: 'pointer' }}>Done</button>
        )}
      </div>
    </div>
  );
};

export default TaskCard; 