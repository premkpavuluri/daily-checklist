import React, { useState, useMemo, useEffect } from 'react';
import TaskCard, { Task, TaskState } from '../molecules/TaskCard';
import Icon from '../atoms/Icon';
import { loadDoneSortPreference, saveDoneSortPreference } from '../../lib/persistence';

export type Quadrant = 'do-first' | 'schedule' | 'delegate' | 'eliminate' | 'done';

const quadrantMeta: Record<Quadrant, { title: string; colorVar: string; description: string; textColor?: string }> = {
  'do-first': { title: 'Do First', colorVar: 'var(--lane-do-first)', description: 'Urgent & Important', textColor: '#b91c1c' },
  'schedule': { title: 'Schedule', colorVar: 'var(--lane-schedule)', description: 'Not Urgent & Important', textColor: '#2563eb' },
  'delegate': { title: 'Delegate', colorVar: 'var(--lane-delegate)', description: 'Urgent & Not Important', textColor: '#b59f00' },
  'eliminate': { title: 'Eliminate', colorVar: 'var(--lane-eliminate)', description: 'Not Urgent & Not Important', textColor: '#22223b' },
  'done': { title: 'Done', colorVar: 'var(--lane-done)', description: 'Completed Tasks', textColor: '#16a34a' },
};

const laneBgVars: Record<Quadrant, { header: string; body: string }> = {
  'do-first': { header: '#fee2e2', body: '#fef2f2' },
  'schedule': { header: '#dbeafe', body: '#eff6ff' },
  'delegate': { header: '#fef9c3', body: '#fefce8' },
  'eliminate': { header: '#e0e7ff', body: '#f8fafc' },
  'done': { header: '#bbf7d0', body: '#f0fdf4' },
};

interface MatrixLaneProps {
  quadrant: Quadrant;
  tasks: Task[];
  onTaskStateChange: (taskId: string, state: TaskState) => void;
  onEditTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
}

const MatrixLane: React.FC<MatrixLaneProps> = ({ quadrant, tasks, onTaskStateChange, onEditTask, onDeleteTask }) => {
  const [sortOrder, setSortOrder] = useState<'recent' | 'old'>('recent');
  const meta = quadrantMeta[quadrant];
  const laneBg = laneBgVars[quadrant];

  // Load sort preference on mount
  useEffect(() => {
    if (quadrant === 'done') {
      const savedSortOrder = loadDoneSortPreference();
      setSortOrder(savedSortOrder);
    }
  }, [quadrant]);

  // Sort tasks for the done lane
  const sortedTasks = useMemo(() => {
    if (quadrant !== 'done') return tasks;
    
    return [...tasks].sort((a, b) => {
      if (!a.completedAt && !b.completedAt) return 0;
      if (!a.completedAt) return 1;
      if (!b.completedAt) return -1;
      
      const dateA = new Date(a.completedAt).getTime();
      const dateB = new Date(b.completedAt).getTime();
      
      return sortOrder === 'recent' ? dateB - dateA : dateA - dateB;
    });
  }, [tasks, sortOrder, quadrant]);

  const handleSortToggle = () => {
    const newSortOrder = sortOrder === 'recent' ? 'old' : 'recent';
    setSortOrder(newSortOrder);
    if (quadrant === 'done') {
      saveDoneSortPreference(newSortOrder);
    }
  };

  return (
    <section style={{
      background: laneBg.body,
      borderRadius: 10,
      padding: 0,
      minHeight: '70vh',
      flex: 1,
      margin: 8,
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 2px 8px #0001',
      border: '1.5px solid #e5e7eb',
      transition: 'background 0.2s',
      overflow: 'hidden',
      minWidth: 240,
      maxWidth: 300,
    }}>
      <header style={{ marginBottom: 0, background: laneBg.header, padding: '18px 18px 10px 18px', borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
          <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: meta.textColor }}>{meta.title}</h3>
          {quadrant === 'done' && tasks.length > 0 && (
            <button
              onClick={handleSortToggle}
              style={{
                background: sortOrder === 'recent' ? '#f0fdf4' : '#dcfce7',
                border: `1px solid ${meta.textColor}40`,
                cursor: 'pointer',
                padding: '6px 10px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: 600,
                color: sortOrder === 'recent' ? meta.textColor : '#166534',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s ease',
                boxShadow: sortOrder === 'old' ? '0 1px 3px rgba(22, 163, 74, 0.15)' : 'none'
              }}
              title={`Currently showing: ${sortOrder === 'recent' ? 'Most recent first' : 'Oldest first'}. Click to toggle.`}
            >
              <Icon name="sort" size={14} color={sortOrder === 'recent' ? meta.textColor : '#166534'} />
              {sortOrder === 'recent' ? 'Old' : 'Recent'}
            </button>
          )}
        </div>
        <div style={{ fontSize: 13, color: '#888', fontWeight: 500 }}>
          {meta.description}
          {quadrant === 'done' && tasks.length > 0 && (
            <span style={{ marginLeft: '8px', color: meta.textColor, fontWeight: 600 }}>
              ({tasks.length} {tasks.length === 1 ? 'task' : 'tasks'})
            </span>
          )}
        </div>
      </header>
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', padding: '10px 10px', gap: 12 }}>
        {sortedTasks.length === 0 ? (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#bbb', fontSize: 16, padding: 10 }}>
            {quadrant === 'done' ? 'No completed tasks yet' : 'No active tasks'}
          </div>
        ) : (
          sortedTasks.map((task, index) => (
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