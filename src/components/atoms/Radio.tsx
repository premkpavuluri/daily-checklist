import React from 'react';

interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Radio: React.FC<RadioProps> = ({ label, ...props }) => (
  <label className="radio-group">
    <input type="radio" {...props} />
    {label}
  </label>
);

export default Radio; 