import React, { useState } from 'react';
import Icon from '../atoms/Icon';
import { formatDate, isOverdue, formatCompletionDate } from '../../lib/dateUtils';
import { getTagColor } from '../../lib/tagUtils';

export type TaskState = 'created' | 'in-progress' | 'wip' | 'done';

export interface Task {
  id: string;
  title: string;
  description?: string;
  deadline?: string;
  timeEstimate?: string;
  state: TaskState;
  important: boolean;
  urgent: boolean;
  completedAt?: string;
  tags?: string[];
}

interface TaskCardProps {
  task: Task;
  onStateChange: (state: TaskState) => void;
  onEdit: () => void;
  onDelete: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onStateChange, onEdit, onDelete }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [isHovered, setIsHovered] = useState(false);


  return (
    <div 
      className="task-card" 
      style={{ 
        border: '1px solid #eee', 
        borderRadius: 8, 
        padding: 0, 
        marginBottom: 0, 
        background: '#fff', 
        boxShadow: '0 2px 8px #0001', 
        minHeight: 0, 
        fontSize: 13, 
        width: '100%',
        position: 'relative'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 8px 0 8px' }}>
        <div style={{ fontWeight: 600, fontSize: 14, color: '#22223b', minHeight: 18, maxWidth: '80%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={task.title}>{task.title}</div>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 4,
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.2s ease-in-out'
        }}>
          <button onClick={onEdit} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 1 }} title="Edit"><Icon name="edit" size={13} color="#64748b" /></button>
          <button onClick={onDelete} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 1 }} title="Delete"><Icon name="close" size={13} color="#64748b" /></button>
        </div>
      </div>
      {/* Show/Hide details (only if description exists) */}
      {task.description && (
        <div style={{ padding: '0 8px', marginTop: 2, marginBottom: 2 }}>
          <button onClick={() => setShowDetails(d => !d)} style={{ background: 'none', border: 'none', color: '#2563eb', fontSize: 12, display: 'flex', alignItems: 'center', cursor: 'pointer', padding: 0, gap: 3 }}>
            <Icon name={showDetails ? 'eye-closed' : 'eye'} size={13} />
            {showDetails ? 'Hide details' : 'Show details'}
          </button>
        </div>
      )}
      {/* Details (only if description exists and showDetails is true) */}
      {task.description && showDetails && (
        <div style={{ background: '#f8fafc', borderRadius: 6, margin: '4px 8px', padding: '6px 8px', fontSize: 12, color: '#22223b' }}>
          {task.description}
        </div>
      )}
      {/* Due date, time estimate, and tags */}
      {(task.deadline || task.timeEstimate || (task.tags && task.tags.length > 0)) && (
        <div style={{ padding: '4px 8px', marginBottom: '5px', display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center' }}>
          {task.deadline && task.state !== 'done' && (
            <span style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              background: isOverdue(task.deadline) ? '#fef2f2' : '#f0f9ff', 
              color: isOverdue(task.deadline) ? '#dc2626' : '#0369a1', 
              borderRadius: 12, 
              fontSize: 11, 
              fontWeight: 500, 
              padding: '2px 8px', 
              gap: 4,
              border: isOverdue(task.deadline) ? '1px solid #fecaca' : '1px solid #bae6fd'
            }}>
              <Icon name="calendar" size={11} color={isOverdue(task.deadline) ? '#dc2626' : '#0369a1'} />
              {isOverdue(task.deadline) ? 'Overdue' : formatDate(task.deadline)}
            </span>
          )}
          {task.timeEstimate && task.state !== 'done' && (
            <span style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              background: '#f3f4f6', 
              color: '#64748b', 
              borderRadius: 12, 
              fontSize: 11, 
              fontWeight: 500, 
              padding: '2px 8px', 
              gap: 4 
            }}>
              <Icon name="clock" size={11} color="#64748b" />
              {task.timeEstimate}
            </span>
          )}
          {task.tags && task.tags.map((tag, index) => {
            const color = getTagColor(tag);
            return (
              <span
                key={index}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  background: color.bg,
                  color: color.text,
                  borderRadius: 12,
                  fontSize: 11,
                  fontWeight: 500,
                  padding: '2px 8px',
                  gap: 4,
                  border: `1px solid ${color.border}`,
                }}
              >
                <Icon name="tag" size={10} color={color.text} />
                {tag}
              </span>
            );
          })}
        </div>
      )}
      {/* Completion date for done tasks */}
      {task.state === 'done' && task.completedAt && (
        <div style={{ padding: '4px 8px', display: 'flex', alignItems: 'center' }}>
          <span style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            background: '#f0fdf4', 
            color: '#16a34a', 
            borderRadius: 12, 
            fontSize: 11, 
            fontWeight: 500, 
            padding: '2px 8px', 
            gap: 4,
            border: '1px solid #bbf7d0'
          }}>
            <Icon name="done" size={11} color="#16a34a" />
            {formatCompletionDate(task.completedAt)}
          </span>
        </div>
      )}
      {/* Meta info and Actions on same line */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8px 8px 8px', marginTop: 2, marginBottom: 0, flexWrap: 'wrap', gap: 4 }}>
        {task.state !== 'done' && (
          <span style={{ display: 'inline-flex', alignItems: 'center', background: '#f3f4f6', color: '#64748b', borderRadius: 12, fontSize: 11, fontWeight: 500, padding: '2px 8px', gap: 4 }}>
            <Icon name={task.state === 'in-progress' ? 'play' : task.state === 'wip' ? 'pause' : 'clock'} size={11} color={task.state === 'in-progress' ? '#2563eb' : task.state === 'wip' ? '#f59e0a' : '#64748b'} />
            {task.state === 'in-progress' ? 'In progress' : task.state === 'wip' ? 'WIP' : 'Created'}
          </span>
        )}
        <div style={{ display: 'flex', gap: 4 }}>
          {task.state === 'created' && (
            <button onClick={() => onStateChange('in-progress')} style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 500, fontSize: 11, padding: '3px 10px', cursor: 'pointer' }}>Start</button>
          )}
          {task.state === 'in-progress' && (
            <button onClick={() => onStateChange('wip')} style={{ background: '#dbeafe', color: '#2563eb', border: 'none', borderRadius: 6, fontWeight: 500, fontSize: 11, padding: '3px 10px', cursor: 'pointer' }}>Pause</button>
          )}
          {task.state === 'wip' && (
            <button onClick={() => onStateChange('in-progress')} style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 500, fontSize: 11, padding: '3px 10px', cursor: 'pointer' }}>Resume</button>
          )}
          {task.state !== 'done' && (
            <button onClick={() => onStateChange('done')} style={{ background: '#22c55e', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 500, fontSize: 11, padding: '3px 10px', cursor: 'pointer' }}>Done</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard; 