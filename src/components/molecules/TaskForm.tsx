import React, { useState } from 'react';
import Input from '../atoms/Input';
import Icon from '../atoms/Icon';
import Textarea from '../atoms/Textarea';

export interface TaskFormInput {
  title: string;
  description?: string;
  important: boolean;
  urgent: boolean;
  deadline?: string;
  timeEstimate?: string;
}

interface TaskFormProps {
  onSubmit: (task: TaskFormInput) => void;
  open: boolean;
  onClose: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, open, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [important, setImportant] = useState(true);
  const [urgent, setUrgent] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [deadline, setDeadline] = useState('');
  const [timeEstimate, setTimeEstimate] = useState('');

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description, important, urgent, deadline, timeEstimate });
    setTitle('');
    setDescription('');
    setImportant(true);
    setUrgent(false);
    setDeadline('');
    setTimeEstimate('');
    setShowMore(false);
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(34, 34, 59, 0.18)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backdropFilter: 'blur(6px)',
      WebkitBackdropFilter: 'blur(6px)',
    }} onClick={onClose}>
      <div style={{
        background: '#fff',
        borderRadius: 16,
        boxShadow: '0 8px 32px #0002',
        padding: '28px 32px 24px 32px',
        minWidth: 400,
        maxWidth: 420,
        width: '100%',
        position: 'relative',
      }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h2 style={{ fontSize: 24, fontWeight: 600, color: '#22223b', margin: 0 }}>Add New Task</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, marginRight: -8 }} aria-label="Close">
            <Icon name="close" size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <Input label="Task Title *" value={title} onChange={e => setTitle(e.target.value)} required style={{ marginBottom: 16, fontSize: 15, fontWeight: 400 }} />
          <Textarea label="Description" value={description} onChange={e => setDescription(e.target.value)} placeholder="Additional details..." />
          <div style={{ margin: '20px 0 0 0' }}>
            <div style={{ fontWeight: 500, marginBottom: 8, fontSize: 14, color: '#4b5563' }}>Does this contribute to your long-term goals?</div>
            <div style={{
              display: 'flex',
              background: '#f5f6fa',
              borderRadius: 8,
              boxShadow: '0 1px 3px #e5e7eb, 0 1px 0 #fff inset',
              padding: 2,
              gap: 0,
              marginBottom: 6,
            }}>
              <button type="button" onClick={() => setImportant(true)} style={{
                flex: 1,
                background: important ? '#fff' : 'transparent',
                color: important ? '#2563eb' : '#6b7280',
                border: 'none',
                borderRadius: 6,
                fontWeight: important ? 500 : 400,
                fontSize: 14,
                boxShadow: important ? '0 1px 3px #e0e7ef, 0 0 0 1px #e5e7eb' : 'none',
                outline: 'none',
                transition: 'background 0.15s, color 0.15s',
                padding: '10px 12px',
                margin: 0,
                zIndex: important ? 2 : 1,
              }}>Yes, Important</button>
              <button type="button" onClick={() => setImportant(false)} style={{
                flex: 1,
                background: !important ? '#fff' : 'transparent',
                color: !important ? '#2563eb' : '#6b7280',
                border: 'none',
                borderRadius: 6,
                fontWeight: !important ? 500 : 400,
                fontSize: 14,
                boxShadow: !important ? '0 1px 3px #e0e7ef, 0 0 0 1px #e5e7eb' : 'none',
                outline: 'none',
                transition: 'background 0.15s, color 0.15s',
                padding: '10px 12px',
                margin: 0,
                zIndex: !important ? 2 : 1,
              }}>No, Not Important</button>
            </div>
          </div>
          <div style={{ margin: '16px 0 0 0' }}>
            <div style={{ fontWeight: 500, marginBottom: 8, fontSize: 14, color: '#4b5563' }}>Does this need immediate attention?</div>
            <div style={{
              display: 'flex',
              background: '#f5f6fa',
              borderRadius: 8,
              boxShadow: '0 1px 3px #e5e7eb, 0 1px 0 #fff inset',
              padding: 2,
              gap: 0,
              marginBottom: 6,
            }}>
              <button type="button" onClick={() => setUrgent(true)} style={{
                flex: 1,
                background: urgent ? '#fff' : 'transparent',
                color: urgent ? '#2563eb' : '#6b7280',
                border: 'none',
                borderRadius: 6,
                fontWeight: urgent ? 500 : 400,
                fontSize: 14,
                boxShadow: urgent ? '0 1px 3px #e0e7ef, 0 0 0 1px #e5e7eb' : 'none',
                outline: 'none',
                transition: 'background 0.15s, color 0.15s',
                padding: '10px 12px',
                margin: 0,
                zIndex: urgent ? 2 : 1,
              }}>Yes, Urgent</button>
              <button type="button" onClick={() => setUrgent(false)} style={{
                flex: 1,
                background: !urgent ? '#fff' : 'transparent',
                color: !urgent ? '#2563eb' : '#6b7280',
                border: 'none',
                borderRadius: 6,
                fontWeight: !urgent ? 500 : 400,
                fontSize: 14,
                boxShadow: !urgent ? '0 1px 3px #e0e7ef, 0 0 0 1px #e5e7eb' : 'none',
                outline: 'none',
                transition: 'background 0.15s, color 0.15s',
                padding: '10px 12px',
                margin: 0,
                zIndex: !urgent ? 2 : 1,
              }}>No, Can Wait</button>
            </div>
          </div>
          <div style={{ margin: '16px 0 0 0' }}>
            <button type="button" onClick={() => setShowMore(v => !v)} style={{
              background: 'none',
              border: 'none',
              color: '#2563eb',
              fontWeight: 500,
              fontSize: 14,
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              margin: 0,
              padding: 0,
              marginBottom: 2,
              gap: 4,
            }}>
              <span style={{ display: 'inline-block', transform: showMore ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s', fontSize: 14 }}>&#9654;</span>
              {showMore ? 'Hide Additional Options' : 'Show Additional Options'}
            </button>
            {showMore && (
              <div style={{ margin: '16px 0 0 0' }}>
                <div style={{ marginBottom: 12 }}>
                  <Input label="Deadline" type="date" value={deadline} onChange={e => setDeadline(e.target.value)} style={{ fontSize: 14 }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: 500, marginBottom: 6, fontSize: 14 }}>Time Estimate</label>
                  <select
                    value={timeEstimate}
                    onChange={e => setTimeEstimate(e.target.value)}
                    style={{
                      width: '100%',
                      border: '1.5px solid #e5e7eb',
                      borderRadius: 8,
                      padding: '10px 12px',
                      fontSize: 14,
                      fontFamily: 'inherit',
                      background: '#f8fafc',
                      color: '#22223b',
                      outline: 'none',
                      boxSizing: 'border-box',
                      boxShadow: '0 1px 2px #0001',
                      marginBottom: 0,
                    }}
                  >
                    <option value="">Select estimate...</option>
                    <option value="15 minutes">15 minutes</option>
                    <option value="30 minutes">30 minutes</option>
                    <option value="1 hour">1 hour</option>
                    <option value="2 hours">2 hours</option>
                  </select>
                </div>
              </div>
            )}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 28, gap: 12 }}>
            <button type="button" onClick={onClose} style={{
              minWidth: 120,
              fontSize: 15,
              fontWeight: 500,
              borderRadius: 8,
              padding: '12px 20px',
              background: '#fff',
              color: '#4b5563',
              border: '1.5px solid #e5e7eb',
              boxShadow: '0 1px 2px #0001',
              cursor: 'pointer',
              marginRight: 0,
              transition: 'background 0.15s, color 0.15s',
            }}>Cancel</button>
            <button type="submit" style={{
              minWidth: 120,
              fontSize: 15,
              fontWeight: 500,
              borderRadius: 8,
              padding: '12px 20px',
              background: '#2563eb',
              color: '#fff',
              border: 'none',
              boxShadow: '0 2px 4px #2563eb22',
              cursor: 'pointer',
              marginLeft: 0,
              transition: 'background 0.15s, color 0.15s',
            }}>Add Task</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm; 