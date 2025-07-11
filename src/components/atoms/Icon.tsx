import React from 'react';

interface IconProps {
  name: 'edit' | 'delete' | 'done' | 'pause' | 'calendar' | 'clock' | 'plus' | 'close';
  size?: number;
}

const icons: Record<string, React.ReactElement> = {
  edit: <svg width="1em" height="1em" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75l11.06-11.06-3.75-3.75L3 17.25zM20.71 7.04a1.003 1.003 0 0 0 0-1.42l-2.34-2.34a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.82z"/></svg>,
  delete: <svg width="1em" height="1em" viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>,
  done: <svg width="1em" height="1em" viewBox="0 0 24 24"><path d="M9 16.2l-3.5-3.5 1.41-1.41L9 13.38l7.09-7.09 1.41 1.41z"/></svg>,
  pause: <svg width="1em" height="1em" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>,
  calendar: <svg width="1em" height="1em" viewBox="0 0 24 24"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zm0-13H5V6h14v1z"/></svg>,
  clock: <svg width="1em" height="1em" viewBox="0 0 24 24"><path d="M12 8v5h5v-2h-3V8z"/><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/></svg>,
  plus: <svg width="1em" height="1em" viewBox="0 0 24 24"><path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z"/></svg>,
  close: <svg width="1em" height="1em" viewBox="0 0 24 24"><path d="M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7A1 1 0 0 0 5.7 7.11L10.59 12l-4.89 4.89a1 1 0 1 0 1.41 1.41L12 13.41l4.89 4.89a1 1 0 0 0 1.41-1.41L13.41 12l4.89-4.89a1 1 0 0 0 0-1.4z"/></svg>,
};

const Icon: React.FC<IconProps> = ({ name, size = 20 }) => (
  <span style={{ display: 'inline-flex', width: size, height: size, verticalAlign: 'middle' }}>
    {icons[name]}
  </span>
);

export default Icon; 