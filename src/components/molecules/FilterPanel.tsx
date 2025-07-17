import React from 'react';
import Icon from '../atoms/Icon';
import { getTagColor, getTagCounts } from '../../lib/tagUtils';

interface FilterPanelProps {
  allTags: string[];
  selectedTags: string[];
  onTagSelect: (tag: string) => void;
  onTagDeselect: (tag: string) => void;
  onClearAll: () => void;
  filterMode: 'AND' | 'OR';
  onModeChange: (mode: 'AND' | 'OR') => void;
  tagCounts: Record<string, number>;
  isOpen: boolean;
  onToggle: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  allTags,
  selectedTags,
  onTagSelect,
  onTagDeselect,
  onClearAll,
  filterMode,
  onModeChange,
  tagCounts,
  isOpen,
  onToggle,
}) => {
  if (!isOpen) return null;

  return (
    <div style={{
      background: '#fff',
      border: '1px solid #e5e7eb',
      borderRadius: '12px',
      padding: '20px',
      marginBottom: '16px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '16px',
          fontWeight: '600',
          color: '#111827',
        }}>
          <Icon name="filter" size={18} color="#6b7280" />
          Filter Tasks
        </div>
        <button
          onClick={onToggle}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            color: '#6b7280',
          }}
        >
          <Icon name="close" size={16} color="#6b7280" />
        </button>
      </div>

      {/* Filter Mode Toggle */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{
          fontWeight: '500',
          marginBottom: '8px',
          fontSize: '14px',
          color: '#374151',
        }}>
          Filter Mode:
        </div>
        <div style={{
          display: 'flex',
          background: '#f3f4f6',
          borderRadius: '8px',
          padding: '2px',
          gap: '0',
        }}>
          <button
            onClick={() => onModeChange('AND')}
            style={{
              flex: 1,
              background: filterMode === 'AND' ? '#2563eb' : 'transparent',
              color: filterMode === 'AND' ? '#fff' : '#6b7280',
              border: 'none',
              borderRadius: '6px',
              fontWeight: filterMode === 'AND' ? '500' : '400',
              fontSize: '14px',
              padding: '8px 12px',
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            AND (All tags)
          </button>
          <button
            onClick={() => onModeChange('OR')}
            style={{
              flex: 1,
              background: filterMode === 'OR' ? '#2563eb' : 'transparent',
              color: filterMode === 'OR' ? '#fff' : '#6b7280',
              border: 'none',
              borderRadius: '6px',
              fontWeight: filterMode === 'OR' ? '500' : '400',
              fontSize: '14px',
              padding: '8px 12px',
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            OR (Any tag)
          </button>
        </div>
      </div>

      {/* Selected Tags */}
      {selectedTags.length > 0 && (
        <div style={{ marginBottom: '16px' }}>
          <div style={{
            fontWeight: '500',
            marginBottom: '8px',
            fontSize: '14px',
            color: '#374151',
          }}>
            Selected Tags:
          </div>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '6px',
            alignItems: 'center',
          }}>
            {selectedTags.map((tag) => {
              const color = getTagColor(tag);
              return (
                <span
                  key={tag}
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
                    onClick={() => onTagDeselect(tag)}
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
            <button
              onClick={onClearAll}
              style={{
                background: '#f3f4f6',
                color: '#6b7280',
                border: '1px solid #d1d5db',
                borderRadius: '16px',
                fontSize: '12px',
                fontWeight: '500',
                padding: '4px 8px',
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = '#e5e7eb';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = '#f3f4f6';
              }}
            >
              Clear All
            </button>
          </div>
        </div>
      )}

      {/* Available Tags */}
      <div>
        <div style={{
          fontWeight: '500',
          marginBottom: '8px',
          fontSize: '14px',
          color: '#374151',
        }}>
          Available Tags:
        </div>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '6px',
        }}>
          {allTags.map((tag) => {
            const color = getTagColor(tag);
            const isSelected = selectedTags.includes(tag);
            const count = tagCounts[tag.toLowerCase()] || 0;
            
            return (
              <button
                key={tag}
                onClick={() => isSelected ? onTagDeselect(tag) : onTagSelect(tag)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  background: isSelected ? color.bg : '#f3f4f6',
                  color: isSelected ? color.text : '#6b7280',
                  borderRadius: '16px',
                  fontSize: '12px',
                  fontWeight: '500',
                  padding: '4px 8px',
                  gap: '4px',
                  border: `1px solid ${isSelected ? color.border : '#d1d5db'}`,
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
                onMouseOver={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.background = '#e5e7eb';
                  }
                }}
                onMouseOut={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.background = '#f3f4f6';
                  }
                }}
              >
                {tag}
                <span style={{
                  background: isSelected ? color.text : '#9ca3af',
                  color: isSelected ? color.bg : '#fff',
                  borderRadius: '8px',
                  fontSize: '10px',
                  fontWeight: '600',
                  padding: '1px 4px',
                  minWidth: '16px',
                  textAlign: 'center',
                }}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FilterPanel; 