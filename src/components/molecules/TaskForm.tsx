import React, { useState } from 'react';
import Input from '../atoms/Input';
import Radio from '../atoms/Radio';
import Button from '../atoms/Button';
import Icon from '../atoms/Icon';

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
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h2 style={{ fontSize: 22 }}>Add New Task</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }} aria-label="Close">
            <Icon name="close" size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <Input label="Task Title" value={title} onChange={e => setTitle(e.target.value)} required />
          <Input label="Description" value={description} onChange={e => setDescription(e.target.value)} />
          <div style={{ margin: '12px 0' }}>
            <div style={{ fontWeight: 500, marginBottom: 4 }}>Does this contribute to your long-term goals?</div>
            <Radio label="Yes, Important" checked={important} onChange={() => setImportant(true)} name="important" />
            <Radio label="No, Not Important" checked={!important} onChange={() => setImportant(false)} name="important" />
          </div>
          <div style={{ margin: '12px 0' }}>
            <div style={{ fontWeight: 500, marginBottom: 4 }}>Does this need immediate attention?</div>
            <Radio label="Yes, Urgent" checked={urgent} onChange={() => setUrgent(true)} name="urgent" />
            <Radio label="No, Can Wait" checked={!urgent} onChange={() => setUrgent(false)} name="urgent" />
          </div>
          {showMore && (
            <div style={{ margin: '12px 0' }}>
              <Input label="Deadline" type="date" value={deadline} onChange={e => setDeadline(e.target.value)} />
              <Input label="Time Estimate (minutes)" type="number" value={timeEstimate} onChange={e => setTimeEstimate(e.target.value)} min={1} />
            </div>
          )}
          <Button type="button" variant="secondary" onClick={() => setShowMore(v => !v)}>
            {showMore ? 'Hide Additional Options' : 'Show Additional Options'}
          </Button>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}>
            <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
            <Button type="submit">Add Task</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm; 