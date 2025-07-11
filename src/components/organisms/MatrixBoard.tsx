import React from 'react';
import MatrixLane, { Quadrant } from './MatrixLane';
import { Task, TaskState } from '../molecules/TaskCard';

interface MatrixBoardProps {
  tasks: Task[];
  onTaskStateChange: (taskId: string, state: TaskState) => void;
  onEditTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
}

const getQuadrant = (task: Task): Quadrant => {
  if (task.state === 'done') return 'done';
  if (task.important && task.urgent) return 'do-first';
  if (task.important && !task.urgent) return 'schedule';
  if (!task.important && task.urgent) return 'delegate';
  return 'eliminate';
};

const quadrants: Quadrant[] = ['do-first', 'schedule', 'delegate', 'eliminate', 'done'];

const MatrixBoard: React.FC<MatrixBoardProps> = ({ tasks, onTaskStateChange, onEditTask, onDeleteTask }) => {
  return (
    <div style={{ display: 'flex', gap: 16, width: '100%', minHeight: '70vh' }}>
      {quadrants.map(q => (
        <MatrixLane
          key={q}
          quadrant={q}
          tasks={tasks.filter(task => getQuadrant(task) === q)}
          onTaskStateChange={onTaskStateChange}
          onEditTask={onEditTask}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </div>
  );
};

export default MatrixBoard; 