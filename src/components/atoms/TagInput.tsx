import React, { useState, useRef, useEffect } from 'react';
import Icon from './Icon';
import { getTagColor, validateTagName, addCustomTag, getAllAvailableTags } from '../../lib/tagUtils';

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
  const [validationError, setValidationError] = useState<string>('');
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Get all available tags (default + custom) - this updates when new custom tags are added
  const allAvailableTags = getAllAvailableTags();

  const filteredSuggestions = allAvailableTags.filter(
    tag => tag.toLowerCase().includes(inputValue.toLowerCase()) && !value.includes(tag)
  );

  // Validate existing tags when value changes
  useEffect(() => {
    if (value.length > 0) {
      for (const tag of value) {
        const validation = validateTagName(tag);
        if (!validation.isValid) {
          setValidationError(`Invalid tag "${tag}": ${validation.error}`);
          return;
        }
      }
    }
    setValidationError('');
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setShowSuggestions(newValue.length > 0);
    
    // Clear validation error when user starts typing
    if (validationError) {
      setValidationError('');
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      e.stopPropagation();
      addTag(inputValue.trim());
    } else if (e.key === 'Backspace' && !inputValue && value.length > 0) {
      removeTag(value[value.length - 1]);
    }
  };

  const addTag = (tag: string) => {
    // Validate the tag
    const validation = validateTagName(tag);
    if (!validation.isValid) {
      setValidationError(validation.error || 'Invalid tag name');
      return;
    }

    // Check if tag already exists
    if (value.includes(tag)) {
      setValidationError('Tag already exists');
      return;
    }

    // Add to custom tags if it's not a default tag
    const defaultTags = ['work', 'personal', 'others'];
    if (!defaultTags.includes(tag)) {
      addCustomTag(tag);
      // Force re-render to update suggestions
      setRefreshTrigger(prev => prev + 1);
    }

    onChange([...value, tag]);
    setInputValue('');
    setShowSuggestions(false);
    setValidationError('');
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
        border: validationError ? '1.5px solid #ef4444' : '1.5px solid #e5e7eb',
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
              <Icon name="tag" size={11} color={color.text} />
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
      
      {/* Validation error message */}
      {validationError && (
        <div style={{
          color: '#ef4444',
          fontSize: '12px',
          marginTop: '4px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
        }}>
          <Icon name="alert" size={12} color="#ef4444" />
          {validationError}
        </div>
      )}
      
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
            const isDefaultTag = ['work', 'personal', 'others'].includes(suggestion);
            return (
              <button
                key={`${suggestion}-${refreshTrigger}`}
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
                {isDefaultTag && (
                  <span style={{
                    fontSize: '11px',
                    color: '#6b7280',
                    marginLeft: 'auto',
                    fontStyle: 'italic',
                  }}>
                    default
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TagInput; 