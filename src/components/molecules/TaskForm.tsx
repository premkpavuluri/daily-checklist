import React, { useState } from 'react';
import Input from '../atoms/Input';
import Icon from '../atoms/Icon';
import Textarea from '../atoms/Textarea';
import TagInput from '../atoms/TagInput';
import { formatDateForInput, parseDateFromInput } from '../../lib/dateUtils';
import { validateTagName } from '../../lib/tagUtils';

export interface TaskFormInput {
  title: string;
  description?: string;
  important: boolean;
  urgent: boolean;
  deadline?: string;
  timeEstimate?: string;
  completedAt?: string;
  tags?: string[];
}

interface TaskFormProps {
  onSubmit: (task: TaskFormInput) => void;
  open: boolean;
  onClose: () => void;
  initialValues?: TaskFormInput;
  headerText?: string;
  submitButtonText?: string;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, open, onClose, initialValues, headerText = 'Add New Task', submitButtonText = 'Add Task' }) => {
  const [title, setTitle] = useState(initialValues?.title || '');
  const [description, setDescription] = useState(initialValues?.description || '');
  const [important, setImportant] = useState(initialValues?.important ?? true);
  const [urgent, setUrgent] = useState(initialValues?.urgent ?? false);
  const [showMore, setShowMore] = useState(false);
  const [deadline, setDeadline] = useState(initialValues?.deadline ? formatDateForInput(initialValues.deadline) : '');
  const [timeEstimate, setTimeEstimate] = useState(initialValues?.timeEstimate || '');
  const [tags, setTags] = useState<string[]>(initialValues?.tags || []);
  const [tagValidationError, setTagValidationError] = useState<string>('');

  // Helper function to format time estimate for display
  const formatTimeEstimate = (hours: string, minutes: string): string => {
    if (hours === '0' && minutes === '0') return '';
    
    let result = '';
    if (hours !== '0') {
      result += `${hours} hr${hours === '1' ? '' : 's'}`;
    }
    if (minutes !== '0') {
      if (result) result += ' ';
      result += `${minutes} min${minutes === '1' ? '' : 's'}`;
    }
    return result;
  };

  // Helper function to parse time estimate for display
  const parseTimeEstimate = (timeStr: string): { hours: string; minutes: string } => {
    if (!timeStr) return { hours: '', minutes: '0' };
    
    // Handle both old format (hours/minutes) and new format (hr/min)
    const hoursMatch = timeStr.match(/^(\d+)\s*(?:hours?|hrs?)/);
    const minutesMatch = timeStr.match(/(\d+)\s*(?:minutes?|mins?)/);
    
    return {
      hours: hoursMatch ? hoursMatch[1] : '0',
      minutes: minutesMatch ? minutesMatch[1] : '0'
    };
  };

  React.useEffect(() => {
    if (open && initialValues) {
      setTitle(initialValues.title || '');
      setDescription(initialValues.description || '');
      setImportant(initialValues.important ?? true);
      setUrgent(initialValues.urgent ?? false);
      setDeadline(initialValues.deadline ? formatDateForInput(initialValues.deadline) : '');
      setTimeEstimate(initialValues.timeEstimate || '');
      setTags(initialValues.tags || []);
      setTagValidationError('');
    } else if (open && !initialValues) {
      setTitle('');
      setDescription('');
      setImportant(true);
      setUrgent(false);
      setDeadline('');
      setTimeEstimate('');
      setTags([]);
      setTagValidationError('');
    }
  }, [open, initialValues]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (open) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  // Validate all tags
  const validateAllTags = (): boolean => {
    for (const tag of tags) {
      const validation = validateTagName(tag);
      if (!validation.isValid) {
        setTagValidationError(`Invalid tag "${tag}": ${validation.error}`);
        return false;
      }
    }
    setTagValidationError('');
    return true;
  };

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate tags before submission
    if (!validateAllTags()) {
      return;
    }
    
    onSubmit({ 
      title, 
      description, 
      important, 
      urgent, 
      deadline: deadline ? parseDateFromInput(deadline) : undefined, 
      timeEstimate: timeEstimate || undefined,
      tags
    });
    setTitle('');
    setDescription('');
    setImportant(true);
    setUrgent(false);
    setDeadline('');
    setTimeEstimate('');
    setTags([]);
    setShowMore(false);
    setTagValidationError('');
    onClose();
  };

  const handleFormKeyDown = (e: React.KeyboardEvent) => {
    // Prevent form submission when Enter is pressed in the tag input
    if (e.key === 'Enter' && e.target instanceof HTMLInputElement) {
      const target = e.target as HTMLInputElement;
      // Check if the input is part of the tag input (has a specific class or is within the tag input container)
      if (target.closest('[data-tag-input]')) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    }
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
          <h2 style={{ fontSize: 24, fontWeight: 600, color: '#22223b', margin: 0 }}>{headerText}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, marginRight: -8 }} aria-label="Close">
            <Icon name="close" size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} onKeyDown={handleFormKeyDown}>
          <Input label="Task Title *" value={title} autoFocus onChange={e => setTitle(e.target.value)} required style={{ marginBottom: 16, fontSize: 15, fontWeight: 400 }} />
          <Textarea label="Description" value={description} onChange={e => setDescription(e.target.value)} placeholder="Additional details..." />
          <div style={{ margin: '16px 0 0 0' }}>
            <label style={{ display: 'block', fontWeight: 500, marginBottom: 8, fontSize: 14, color: '#4b5563' }}>Tags</label>
            <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 8, fontStyle: 'italic' }}>
              Enter tag name and press Enter to create
            </div>
            <div data-tag-input>
              <TagInput 
                value={tags} 
                onChange={setTags} 
                placeholder="Add tags..." 
                style={{ marginBottom: 0 }}
              />
            </div>
            {/* Form-level tag validation error */}
            {tagValidationError && (
              <div style={{
                color: '#ef4444',
                fontSize: '12px',
                marginTop: '4px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}>
                <Icon name="alert" size={12} color="#ef4444" />
                {tagValidationError}
              </div>
            )}
          </div>
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
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <div style={{ flex: 1 }}>
                      <input
                        type="number"
                        min="0"
                        max="99"
                        placeholder="0"
                        value={parseTimeEstimate(timeEstimate).hours}
                        onChange={e => {
                          const hours = e.target.value;
                          const minutes = parseTimeEstimate(timeEstimate).minutes;
                          if (hours === '') {
                            setTimeEstimate('');
                          } else if (hours === '0' && minutes === '0') {
                            setTimeEstimate('');
                          } else {
                            setTimeEstimate(formatTimeEstimate(hours, minutes));
                          }
                        }}
                        style={{
                          width: '100%',
                          border: '1.5px solid #e5e7eb',
                          borderRadius: 8,
                          padding: '8px 10px',
                          fontSize: 13,
                          fontFamily: 'inherit',
                          background: timeEstimate ? '#f8fafc' : '#fef3c7',
                          color: '#22223b',
                          outline: 'none',
                          boxSizing: 'border-box',
                          boxShadow: '0 1px 2px #0001',
                          textAlign: 'center'
                        }}
                      />
                      <div style={{ fontSize: 10, color: '#6b7280', textAlign: 'center', marginTop: 2 }}>Hours</div>
                    </div>
                    <div style={{ fontSize: 18, color: '#6b7280', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: '40px', marginBottom: '12px' }}>:</div>
                    <div style={{ flex: 1 }}>
                      <input
                        type="number"
                        min="0"
                        max="59"
                        placeholder="0"
                        value={parseTimeEstimate(timeEstimate).minutes}
                        onChange={e => {
                          const minutes = e.target.value;
                          const hours = parseTimeEstimate(timeEstimate).hours;
                          if (hours === '0' && minutes === '0') {
                            setTimeEstimate('');
                          } else {
                            setTimeEstimate(formatTimeEstimate(hours, minutes));
                          }
                        }}
                        style={{
                          width: '100%',
                          border: '1.5px solid #e5e7eb',
                          borderRadius: 8,
                          padding: '8px 10px',
                          fontSize: 13,
                          fontFamily: 'inherit',
                          background: timeEstimate ? '#f8fafc' : '#fef3c7',
                          color: '#22223b',
                          outline: 'none',
                          boxSizing: 'border-box',
                          boxShadow: '0 1px 2px #0001',
                          textAlign: 'center'
                        }}
                      />
                      <div style={{ fontSize: 10, color: '#6b7280', textAlign: 'center', marginTop: 2 }}>Minutes</div>
                    </div>
                  </div>
                  {/* Quick preset buttons */}
                  <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
                    {['15m', '30m', '1h', '2h', '4h'].map(preset => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => {
                          if (preset.endsWith('m')) {
                            const minutes = preset.slice(0, -1);
                            setTimeEstimate(formatTimeEstimate('0', minutes));
                          } else {
                            const hours = preset.slice(0, -1);
                            setTimeEstimate(formatTimeEstimate(hours, '0'));
                          }
                        }}
                        style={{
                          background: '#f3f4f6',
                          border: '1px solid #d1d5db',
                          borderRadius: '6px',
                          padding: '4px 8px',
                          fontSize: '11px',
                          color: '#374151',
                          cursor: 'pointer',
                          transition: 'all 0.15s',
                          fontWeight: '500'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#e5e7eb';
                          e.currentTarget.style.borderColor = '#9ca3af';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = '#f3f4f6';
                          e.currentTarget.style.borderColor = '#d1d5db';
                        }}
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 28, gap: 12 }}>
            <button type="button" onClick={onClose} style={{
              minWidth: '50%',
              fontSize: 15,
              fontWeight: 500,
              borderRadius: 8,
              padding: '12px 15px',
              background: '#fff',
              color: '#4b5563',
              border: '1.5px solid #e5e7eb',
              boxShadow: '0 1px 2px #0001',
              cursor: 'pointer',
              marginRight: 0,
              transition: 'background 0.15s, color 0.15s',
            }}>Cancel</button>
            <button 
              type="submit" 
              disabled={tagValidationError.length > 0}
              style={{
                minWidth: '50%',
                fontSize: 15,
                fontWeight: 500,
                borderRadius: 8,
                padding: '12px 15px',
                background: tagValidationError.length > 0 ? '#9ca3af' : '#2563eb',
                color: '#fff',
                border: 'none',
                boxShadow: '0 2px 4px #2563eb22',
                cursor: tagValidationError.length > 0 ? 'not-allowed' : 'pointer',
                marginLeft: 0,
                transition: 'background 0.15s, color 0.15s',
              }}
            >
              {submitButtonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm; 