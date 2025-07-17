import React, { useState, useRef, useEffect } from 'react';
import Icon from './Icon';
import { getTagColor } from '../../lib/tagUtils';

interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  existingTags?: string[];
  placeholder?: string;
  style?: React.CSSProperties;
}

const TagInput: React.FC<TagInputProps> = ({ 
  value, 
  onChange, 
  existingTags = [], 
  placeholder = "Add tags...",
  style 
}) => {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredSuggestions = existingTags.filter(
    tag => tag.toLowerCase().includes(inputValue.toLowerCase()) && !value.includes(tag)
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setShowSuggestions(e.target.value.length > 0);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      addTag(inputValue.trim());
    } else if (e.key === 'Backspace' && !inputValue && value.length > 0) {
      removeTag(value[value.length - 1]);
    }
  };

  const addTag = (tag: string) => {
    if (tag && !value.includes(tag)) {
      onChange([...value, tag]);
      setInputValue('');
      setShowSuggestions(false);
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange(value.filter(tag => tag !== tagToRemove));
  };

  const handleSuggestionClick = (suggestion: string) => {
    addTag(suggestion);
  };

  const handleInputFocus = () => {
    if (inputValue.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleInputBlur = () => {
    // Delay hiding suggestions to allow clicking on them
    setTimeout(() => setShowSuggestions(false), 200);
  };

  return (
    <div style={{ position: 'relative', ...style }}>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '6px',
        padding: '8px 12px',
        border: '1.5px solid #e5e7eb',
        borderRadius: '8px',
        background: '#f8fafc',
        minHeight: '40px',
        alignItems: 'center',
      }}>
        {value.map((tag, index) => {
          const color = getTagColor(tag);
          return (
            <span
              key={index}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                background: color.bg,
                color: color.text,
                borderRadius: '16px',
                fontSize: '12px',
                fontWeight: '500',
                padding: '4px 8px',
                gap: '4px',
                border: `1px solid ${color.border}`,
              }}
            >
              {tag}
              <button
                onClick={() => removeTag(tag)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0',
                  display: 'flex',
                  alignItems: 'center',
                  color: color.text,
                  fontSize: '14px',
                  lineHeight: '1',
                }}
              >
                <Icon name="close" size={12} color={color.text} />
              </button>
            </span>
          );
        })}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder={value.length === 0 ? placeholder : ''}
          style={{
            border: 'none',
            outline: 'none',
            background: 'transparent',
            fontSize: '14px',
            flex: '1',
            minWidth: '120px',
            color: '#22223b',
          }}
        />
      </div>
      
      {/* Suggestions dropdown */}
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: '#fff',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          zIndex: 1000,
          maxHeight: '200px',
          overflowY: 'auto',
          marginTop: '4px',
        }}>
          {filteredSuggestions.map((suggestion, index) => {
            const color = getTagColor(suggestion);
            return (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: 'none',
                  background: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: '14px',
                  color: '#374151',
                  borderBottom: index < filteredSuggestions.length - 1 ? '1px solid #f3f4f6' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = '#f3f4f6';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'none';
                }}
              >
                <span style={{
                  display: 'inline-block',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: color.bg,
                  border: `1px solid ${color.border}`,
                }} />
                {suggestion}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TagInput; 