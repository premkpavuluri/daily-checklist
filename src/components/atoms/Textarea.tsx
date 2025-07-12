import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

const Textarea: React.FC<TextareaProps> = ({ label, ...props }) => (
  <div style={{ marginBottom: 18 }}>
    {label && <label style={{ display: 'block', fontWeight: 500, marginBottom: 6, fontSize: 16 }}>{label}</label>}
    <textarea
      {...props}
      style={{
        width: '100%',
        minHeight: 90,
        resize: 'vertical',
        border: '1.5px solid #e5e7eb',
        borderRadius: 10,
        padding: '12px 14px',
        fontSize: 16,
        fontFamily: 'inherit',
        background: '#f8fafc',
        color: '#22223b',
        outline: 'none',
        boxSizing: 'border-box',
        boxShadow: '0 1px 2px #0001',
        ...props.style,
      }}
    />
  </div>
);

export default Textarea; 