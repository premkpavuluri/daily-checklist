import React, { useState, useRef, useEffect } from 'react';
import Icon from '../atoms/Icon';
import { getSearchSuggestions } from '../../lib/searchUtils';
import { Task } from '../../lib/tagUtils';

interface SearchBarProps {
  onSearch: (query: string) => void;
  allTasks: Task[];
  placeholder?: string;
  style?: React.CSSProperties;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  allTasks, 
  placeholder = "Search tasks...",
  style 
}) => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Generate suggestions when query changes
  useEffect(() => {
    if (query.length > 1) {
      const allSuggestions = getSearchSuggestions(allTasks);
      const filteredSuggestions = allSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filteredSuggestions.slice(0, 5));
      setShowSuggestions(filteredSuggestions.length > 0);
    } else {
      setShowSuggestions(false);
      setSuggestions([]);
    }
    setSelectedSuggestion(-1);
  }, [query, allTasks]);

  // Handle search with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearch(query);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, onSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedSuggestion(prev => 
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedSuggestion(prev => prev > 0 ? prev - 1 : -1);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedSuggestion >= 0 && suggestions[selectedSuggestion]) {
        setQuery(suggestions[selectedSuggestion]);
        setShowSuggestions(false);
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      inputRef.current?.blur();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false);
  };

  const handleClearSearch = () => {
    setQuery('');
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const handleInputFocus = () => {
    if (suggestions.length > 0) {
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
        alignItems: 'center',
        background: '#fff',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        padding: '8px 12px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        transition: 'border-color 0.2s, box-shadow 0.2s',
      }}>
        <Icon name="search" size={16} color="#6b7280" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder={placeholder}
          style={{
            border: 'none',
            outline: 'none',
            background: 'transparent',
            fontSize: '14px',
            flex: '1',
            marginLeft: '8px',
            color: '#374151',
          }}
        />
        {query && (
          <button
            onClick={handleClearSearch}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '2px',
              display: 'flex',
              alignItems: 'center',
              color: '#6b7280',
            }}
            title="Clear search"
          >
            <Icon name="close" size={14} color="#6b7280" />
          </button>
        )}
      </div>

      {/* Search suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: '#fff',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            zIndex: 1000,
            marginTop: '4px',
            maxHeight: '200px',
            overflowY: 'auto',
          }}
        >
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              style={{
                padding: '8px 12px',
                cursor: 'pointer',
                fontSize: '14px',
                color: '#374151',
                background: index === selectedSuggestion ? '#f3f4f6' : 'transparent',
                borderBottom: index < suggestions.length - 1 ? '1px solid #f3f4f6' : 'none',
              }}
              onMouseEnter={() => setSelectedSuggestion(index)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Icon name="search" size={12} color="#6b7280" />
                <span>{suggestion}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar; 