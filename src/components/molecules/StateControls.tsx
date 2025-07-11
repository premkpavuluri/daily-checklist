import React from 'react';
import Button from '../atoms/Button';
import Icon from '../atoms/Icon';
import { TaskState } from './TaskCard';

interface StateControlsProps {
  state: TaskState;
  onStateChange: (state: TaskState) => void;
}

const StateControls: React.FC<StateControlsProps> = ({ state, onStateChange }) => (
  <div style={{ display: 'flex', gap: 8 }}>
    {state === 'created' && <Button onClick={() => onStateChange('in-progress')}><Icon name="pause" /> In Progress</Button>}
    {state === 'in-progress' && <Button variant="secondary" onClick={() => onStateChange('created')}><Icon name="pause" /> Pause</Button>}
    {state !== 'done' && <Button variant="success" onClick={() => onStateChange('done')}><Icon name="done" /> Done</Button>}
  </div>
);

export default StateControls; 