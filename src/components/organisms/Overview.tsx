import React from 'react';
import { Task } from '../molecules/TaskCard';

interface OverviewProps {
  tasks: Task[];
}

const Overview: React.FC<OverviewProps> = ({ tasks }) => {
  const total = tasks.length;
  const completed = tasks.filter(t => t.state === 'done').length;
  const inProgress = tasks.filter(t => t.state === 'in-progress').length;
  const wip = tasks.filter(t => t.state === 'wip').length;
  const critical = tasks.filter(t => t.important && t.urgent && t.state !== 'done').length;

  return (
    <section style={{ margin: '32px 0', display: 'flex', justifyContent: 'center', gap: 48 }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 24, color: '#3b82f6' }}>{total}</div>
        <div>Total Tasks</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 24, color: '#22c55e' }}>{completed}</div>
        <div>Completed</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 24, color: '#f59e42' }}>{inProgress}</div>
        <div>In Progress</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 24, color: '#f59e0a' }}>{wip}</div>
        <div>WIP</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 24, color: '#ef4444' }}>{critical}</div>
        <div>Critical Tasks</div>
      </div>
    </section>
  );
};

export default Overview; 