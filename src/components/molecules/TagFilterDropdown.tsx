import React, { useState, useRef, useEffect } from 'react';
import Icon from '../atoms/Icon';
import { getTagColor, defaultTags } from '../../lib/tagUtils';

interface TagFilterDropdownProps {
  allTags: string[];
  selectedTags: string[];
  onTagSelect: (tag: string) => void;
  onTagDeselect: (tag: string) => void;
  onClearAll: () => void;
  tagCounts: Record<string, number>;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const TagFilterDropdown: React.FC<TagFilterDropdownProps> = ({
  allTags,
  selectedTags,
  onTagSelect,
  onTagDeselect,
  onClearAll,
  tagCounts,
  isOpen,
  onToggle,
  children,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onToggle();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onToggle]);

  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagDeselect(tag);
    } else {
      onTagSelect(tag);
    }
  };

  // Separate default tags from custom tags
  const defaultTagList = allTags.filter(tag => defaultTags.includes(tag));
  const customTagList = allTags.filter(tag => !defaultTags.includes(tag));

  return (
    <div ref={dropdownRef} style={{ position: 'relative' }}>
      {/* Trigger Button */}
      {children}
      {/* Dropdown Content */}
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          right: 0,
          background: '#fff',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          zIndex: 1000,
          minWidth: '220px',
          maxHeight: '400px',
          overflowY: 'auto',
          marginTop: '4px',
        }}>
          {/* Header */}
          <div style={{
            padding: '12px 16px',
            borderBottom: '1px solid #f3f4f6',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <span style={{
              fontSize: '14px',
              fontWeight: '600',
              color: '#111827',
            }}>
              Filter by tags
            </span>
            {selectedTags.length > 0 && (
              <button
                onClick={onClearAll}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#6b7280',
                  fontSize: '12px',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                }}
              >
                Clear all
              </button>
            )}
          </div>

          {/* Default Tags Section */}
          {defaultTagList.length > 0 && (
            <div>
              <div style={{
                padding: '8px 16px 4px 16px',
                fontSize: '12px',
                fontWeight: '600',
                color: '#6b7280',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                background: '#f9fafb',
              }}>
                Default Tags
              </div>
              <div style={{ padding: '4px 0' }}>
                {defaultTagList.map((tag) => {
                  const color = getTagColor(tag);
                  const isSelected = selectedTags.includes(tag);
                  const count = tagCounts[tag.toLowerCase()] || 0;
                  
                  return (
                    <label
                      key={tag}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '8px 16px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        color: '#374151',
                        transition: 'background 0.15s',
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.background = '#f9fafb';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = 'transparent';
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleTagToggle(tag)}
                        style={{
                          marginRight: '12px',
                          width: '16px',
                          height: '16px',
                          accentColor: color.text,
                        }}
                      />
                      <Icon name="tag" size={12} color={color.text} />
                      <span style={{ flex: 1, marginLeft: '8px' }}>{tag}</span>
                      <span style={{
                        background: '#f3f4f6',
                        color: '#6b7280',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: '500',
                        padding: '2px 6px',
                        minWidth: '20px',
                        textAlign: 'center',
                      }}>
                        {count}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* Custom Tags Section */}
          {customTagList.length > 0 && (
            <div>
              <div style={{
                padding: '8px 16px 4px 16px',
                fontSize: '12px',
                fontWeight: '600',
                color: '#6b7280',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                background: '#f9fafb',
                borderTop: defaultTagList.length > 0 ? '1px solid #e5e7eb' : 'none',
              }}>
                Custom Tags
              </div>
              <div style={{ padding: '4px 0' }}>
                {customTagList.map((tag) => {
                  const color = getTagColor(tag);
                  const isSelected = selectedTags.includes(tag);
                  const count = tagCounts[tag.toLowerCase()] || 0;
                  
                  return (
                    <label
                      key={tag}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '8px 16px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        color: '#374151',
                        transition: 'background 0.15s',
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.background = '#f9fafb';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = 'transparent';
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleTagToggle(tag)}
                        style={{
                          marginRight: '12px',
                          width: '16px',
                          height: '16px',
                          accentColor: color.text,
                        }}
                      />
                      <Icon name="tag" size={12} color={color.text} />
                      <span style={{ flex: 1, marginLeft: '8px' }}>{tag}</span>
                      <span style={{
                        background: '#f3f4f6',
                        color: '#6b7280',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: '500',
                        padding: '2px 6px',
                        minWidth: '20px',
                        textAlign: 'center',
                      }}>
                        {count}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* Empty state */}
          {allTags.length === 0 && (
            <div style={{
              padding: '16px',
              textAlign: 'center',
              color: '#6b7280',
              fontSize: '14px',
            }}>
              No tags available
            </div>
          )}

          {/* Footer with selected count */}
          {selectedTags.length > 0 && (
            <div style={{
              padding: '8px 16px',
              borderTop: '1px solid #f3f4f6',
              fontSize: '12px',
              color: '#6b7280',
              background: '#f9fafb',
            }}>
              {selectedTags.length} tag{selectedTags.length !== 1 ? 's' : ''} selected
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TagFilterDropdown; 