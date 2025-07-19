import React from 'react';

interface IconProps {
  name: 'edit' | 'delete' | 'done' | 'pause' | 'calendar' | 'clock' | 'plus' | 'close' | 'notes' | 'eye' | 'eye-closed' | 'play' | 'filter' | 'tag' | 'alert' | 'search';
  size?: number;
  color?: string;
}

const icons: Record<string, React.ReactElement> = {
  edit: <svg width="1em" height="1em" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75l11.06-11.06-3.75-3.75L3 17.25zM20.71 7.04a1.003 1.003 0 0 0 0-1.42l-2.34-2.34a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.82z"/></svg>,
  delete: <svg width="1em" height="1em" viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>,
  done: <svg width="1em" height="1em" viewBox="0 0 24 24"><path d="M9 16.2l-3.5-3.5 1.41-1.41L9 13.38l7.09-7.09 1.41 1.41z"/></svg>,
  pause: <svg width="1em" height="1em" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>,
  calendar: <svg width="1em" height="1em" viewBox="0 0 24 24"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zm0-13H5V6h14v1z"/></svg>,
  clock: <svg width="1em" height="1em" viewBox="0 0 24 24"><path d="M12 8v5h5v-2h-3V8z"/><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/></svg>,
  plus: <svg width="1.2em" height="1.2em" viewBox="0 0 24 24"><path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z"/></svg>,
  close: <svg width="1em" height="1em" viewBox="0 0 24 24"><path d="M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7A1 1 0 0 0 5.7 7.11L10.59 12l-4.89 4.89a1 1 0 1 0 1.41 1.41L12 13.41l4.89 4.89a1 1 0 0 0 1.41-1.41L13.41 12l4.89-4.89a1 1 0 0 0 0-1.4z"/></svg>,
  notes: <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none"><rect x="5" y="3" width="14" height="18" rx="2" fill="#fff" stroke="currentColor" strokeWidth="1.5"/><rect x="8" y="6" width="8" height="1.5" rx="0.75" fill="#cbd5e1"/><rect x="8" y="9" width="8" height="1.5" rx="0.75" fill="#cbd5e1"/><rect x="8" y="12" width="5" height="1.5" rx="0.75" fill="#cbd5e1"/></svg>,
  eye: <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" stroke="currentColor" strokeWidth="1.5"/><circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.5"/></svg>,
  'eye-closed': <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none"><path d="M3 3l18 18M1 12s4-7 11-7c2.5 0 4.5.5 6.2 1.3M23 12s-4 7-11 7c-2.5 0-4.5-.5-6.2-1.3" stroke="currentColor" strokeWidth="1.5"/><path d="M9.5 9.5a3.5 3.5 0 0 1 5 5" stroke="currentColor" strokeWidth="1.5"/></svg>,
  play: <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none"><polygon points="8,5 19,12 8,19" fill="currentColor"/></svg>,
  filter: <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none"><path d="M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2.586a1 1 0 0 1-.293.707l-6.414 6.414a1 1 0 0 0-.293.707V17l-4 4v-6.586a1 1 0 0 0-.293-.707L3.293 6.293A1 1 0 0 1 3 5.586V4z" stroke="currentColor" strokeWidth="1.5"/></svg>,
  tag: <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none"><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.78.78 2.05.78 2.83 0l7-7c.78-.78.78-2.05 0-2.83zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z" fill="currentColor"/></svg>,
  alert: <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none"><path d="M12 2L1 21h22L12 2zm0 3.17L19.83 19H4.17L12 5.17zM11 16h2v2h-2zm0-6h2v4h-2z" fill="currentColor"/></svg>,
  search: <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill="currentColor"/></svg>,
};

const Icon: React.FC<IconProps> = ({ name, size = 20, color }) => (
  <span style={{ display: 'inline-flex', width: size, height: size, verticalAlign: 'middle', color: color, fill: color }}>
    {icons[name]}
  </span>
);

export default Icon; 