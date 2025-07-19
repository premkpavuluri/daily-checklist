import { Task } from './tagUtils';

export interface SearchFilters {
  query: string;
  tags: string[];
  status: string[];
  dateRange: {
    start?: string;
    end?: string;
  };
  important?: boolean;
  urgent?: boolean;
}

export interface SearchResult {
  task: Task;
  relevance: number;
  matchedFields: string[];
}

/**
 * Search tasks by text query (title and description)
 */
export const searchTasksByText = (tasks: Task[], query: string): Task[] => {
  if (!query.trim()) return tasks;
  
  const searchTerm = query.toLowerCase().trim();
  const terms = searchTerm.split(' ').filter(term => term.length > 0);
  
  return tasks.filter(task => {
    const title = task.title.toLowerCase();
    const description = (task.description || '').toLowerCase();
    
    // Check if all search terms are found in title or description
    return terms.every(term => 
      title.includes(term) || description.includes(term)
    );
  });
};

/**
 * Filter tasks by tags
 */
export const filterTasksByTags = (tasks: Task[], tags: string[]): Task[] => {
  if (tags.length === 0) return tasks;
  
  return tasks.filter(task => {
    if (!task.tags || task.tags.length === 0) return false;
    return tags.some(tag => 
      task.tags!.some(taskTag => taskTag.toLowerCase() === tag.toLowerCase())
    );
  });
};

/**
 * Filter tasks by status
 */
export const filterTasksByStatus = (tasks: Task[], statuses: string[]): Task[] => {
  if (statuses.length === 0) return tasks;
  
  return tasks.filter(task => 
    statuses.includes(task.state)
  );
};

/**
 * Filter tasks by date range
 */
export const filterTasksByDateRange = (tasks: Task[], startDate?: string, endDate?: string): Task[] => {
  if (!startDate && !endDate) return tasks;
  
  return tasks.filter(task => {
    if (!task.deadline) return false;
    
    const taskDate = new Date(task.deadline);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    
    if (start && taskDate < start) return false;
    if (end && taskDate > end) return false;
    
    return true;
  });
};

/**
 * Filter tasks by importance/urgency
 */
export const filterTasksByPriority = (tasks: Task[], important?: boolean, urgent?: boolean): Task[] => {
  return tasks.filter(task => {
    if (important !== undefined && task.important !== important) return false;
    if (urgent !== undefined && task.urgent !== urgent) return false;
    return true;
  });
};

/**
 * Comprehensive search function that combines all filters
 */
export const searchTasks = (tasks: Task[], filters: SearchFilters): Task[] => {
  let results = [...tasks];
  
  // Text search
  if (filters.query.trim()) {
    results = searchTasksByText(results, filters.query);
  }
  
  // Tag filter
  if (filters.tags.length > 0) {
    results = filterTasksByTags(results, filters.tags);
  }
  
  // Status filter
  if (filters.status.length > 0) {
    results = filterTasksByStatus(results, filters.status);
  }
  
  // Date range filter
  if (filters.dateRange.start || filters.dateRange.end) {
    results = filterTasksByDateRange(results, filters.dateRange.start, filters.dateRange.end);
  }
  
  // Priority filter
  if (filters.important !== undefined || filters.urgent !== undefined) {
    results = filterTasksByPriority(results, filters.important, filters.urgent);
  }
  
  return results;
};

/**
 * Calculate search relevance score for ranking results
 */
export const calculateRelevance = (task: Task, query: string): number => {
  if (!query.trim()) return 0;
  
  const searchTerm = query.toLowerCase().trim();
  const title = task.title.toLowerCase();
  const description = (task.description || '').toLowerCase();
  
  let score = 0;
  
  // Title matches get higher weight
  if (title.includes(searchTerm)) {
    score += 10;
    // Exact title match gets bonus
    if (title === searchTerm) score += 5;
  }
  
  // Description matches
  if (description.includes(searchTerm)) {
    score += 5;
  }
  
  // Tag matches
  if (task.tags) {
    task.tags.forEach(tag => {
      if (tag.toLowerCase().includes(searchTerm)) {
        score += 3;
      }
    });
  }
  
  return score;
};

/**
 * Highlight search terms in text
 */
export const highlightSearchTerms = (text: string, query: string): string => {
  if (!query.trim()) return text;
  
  const terms = query.toLowerCase().split(' ').filter(term => term.length > 0);
  let highlightedText = text;
  
  terms.forEach(term => {
    const regex = new RegExp(`(${term})`, 'gi');
    highlightedText = highlightedText.replace(regex, '<mark>$1</mark>');
  });
  
  return highlightedText;
};

/**
 * Get search suggestions based on task data
 */
export const getSearchSuggestions = (tasks: Task[]): string[] => {
  const suggestions = new Set<string>();
  
  tasks.forEach(task => {
    // Add task titles as suggestions
    const words = task.title.toLowerCase().split(' ').filter(word => word.length > 2);
    words.forEach(word => suggestions.add(word));
    
    // Add tags as suggestions
    if (task.tags) {
      task.tags.forEach(tag => suggestions.add(tag.toLowerCase()));
    }
  });
  
  return Array.from(suggestions).slice(0, 10); // Limit to 10 suggestions
}; 