export interface TagColor {
  bg: string;
  text: string;
  border: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  deadline?: string;
  timeEstimate?: string;
  state: 'created' | 'in-progress' | 'wip' | 'done';
  important: boolean;
  urgent: boolean;
  completedAt?: string;
  tags?: string[];
}

export const tagColors: TagColor[] = [
  { bg: '#dbeafe', text: '#2563eb', border: '#bfdbfe' }, // Blue
  { bg: '#fef3c7', text: '#d97706', border: '#fcd34d' }, // Orange
  { bg: '#dcfce7', text: '#16a34a', border: '#bbf7d0' }, // Green
  { bg: '#fce7f3', text: '#ec4899', border: '#f9a8d4' }, // Pink
  { bg: '#e0e7ff', text: '#7c3aed', border: '#c7d2fe' }, // Purple
  { bg: '#f0fdf4', text: '#059669', border: '#a7f3d0' }, // Emerald
  { bg: '#fef9c3', text: '#ca8a04', border: '#fde047' }, // Yellow
  { bg: '#f1f5f9', text: '#475569', border: '#cbd5e1' }, // Gray
  { bg: '#f0f9ff', text: '#0284c7', border: '#7dd3fc' }, // Sky
  { bg: '#ccfbf1', text: '#0d9488', border: '#99f6e4' }, // Teal
];

export const defaultTags = [
  'work',
  'personal', 
  'others'
];

// Storage key for custom tags
const CUSTOM_TAGS_KEY = 'eisenhower-custom-tags';

/**
 * Load custom tags from localStorage
 */
export const loadCustomTags = (): string[] => {
  try {
    const data = localStorage.getItem(CUSTOM_TAGS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

/**
 * Save custom tags to localStorage
 */
export const saveCustomTags = (tags: string[]): void => {
  localStorage.setItem(CUSTOM_TAGS_KEY, JSON.stringify(tags));
};

/**
 * Get all available tags (default + custom)
 */
export const getAllAvailableTags = (): string[] => {
  const customTags = loadCustomTags();
  return [...defaultTags, ...customTags];
};

/**
 * Add a new custom tag
 */
export const addCustomTag = (tag: string): void => {
  const customTags = loadCustomTags();
  if (!customTags.includes(tag) && !defaultTags.includes(tag)) {
    customTags.push(tag);
    saveCustomTags(customTags);
    console.log('Custom tag added:', tag, 'All custom tags:', customTags);
  }
};

/**
 * Remove unused custom tags from storage
 * @param tasks Array of all tasks to check against
 */
export const cleanupUnusedCustomTags = (tasks: Task[]): void => {
  const customTags = loadCustomTags();
  const usedTags = new Set<string>();
  
  // Collect all tags that are actually used in tasks
  tasks.forEach(task => {
    if (task.tags) {
      task.tags.forEach((tag: string) => {
        usedTags.add(tag.toLowerCase());
      });
    }
  });
  
  // Filter out unused custom tags (keep default tags)
  const usedCustomTags = customTags.filter(tag => {
    // Keep default tags
    if (defaultTags.includes(tag)) {
      return true;
    }
    // Keep custom tags that are still in use
    return usedTags.has(tag.toLowerCase());
  });
  
  // If we removed any tags, save the updated list
  if (usedCustomTags.length !== customTags.length) {
    const removedTags = customTags.filter(tag => !usedCustomTags.includes(tag));
    console.log('Cleaned up unused custom tags:', removedTags);
    saveCustomTags(usedCustomTags);
  }
};

/**
 * Debug function to check custom tags
 */
export const debugCustomTags = (): void => {
  const customTags = loadCustomTags();
  console.log('Current custom tags:', customTags);
  console.log('All available tags:', getAllAvailableTags());
};

/**
 * Validate tag name (no spaces, no special characters except hyphens and underscores)
 */
export const validateTagName = (tagName: string): { isValid: boolean; error?: string } => {
  if (!tagName.trim()) {
    return { isValid: false, error: 'Tag name cannot be empty' };
  }
  
  if (tagName.includes(' ')) {
    return { isValid: false, error: 'Tag name cannot contain spaces' };
  }
  
  if (!/^[a-zA-Z0-9_-]+$/.test(tagName)) {
    return { isValid: false, error: 'Tag name can only contain letters, numbers, hyphens (-), and underscores (_)' };
  }
  
  if (tagName.length > 20) {
    return { isValid: false, error: 'Tag name cannot be longer than 20 characters' };
  }
  
  return { isValid: true };
};

/**
 * Generate a consistent color for a tag based on its name
 */
export const getTagColor = (tagName: string): TagColor => {
  // Assign specific colors to default tags
  if (tagName === 'work') {
    return { bg: '#dbeafe', text: '#2563eb', border: '#bfdbfe' }; // Blue
  }
  if (tagName === 'personal') {
    return { bg: '#dcfce7', text: '#16a34a', border: '#bbf7d0' }; // Green
  }
  if (tagName === 'others') {
    return { bg: '#f1f5f9', text: '#475569', border: '#cbd5e1' }; // Gray
  }
  
  // For custom tags, use hash-based color generation
  const hash = tagName.toLowerCase().split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  return tagColors[Math.abs(hash) % tagColors.length];
};

/**
 * Get all unique tags from a list of tasks
 */
export const getAllTags = (tasks: Task[]): string[] => {
  const tagSet = new Set<string>();
  tasks.forEach(task => {
    if (task.tags) {
      task.tags.forEach((tag: string) => tagSet.add(tag.toLowerCase()));
    }
  });
  return Array.from(tagSet).sort();
};

/**
 * Get tag counts for all tags in a list of tasks
 */
export const getTagCounts = (tasks: Task[]): Record<string, number> => {
  const counts: Record<string, number> = {};
  tasks.forEach(task => {
    if (task.tags) {
      task.tags.forEach((tag: string) => {
        const normalizedTag = tag.toLowerCase();
        counts[normalizedTag] = (counts[normalizedTag] || 0) + 1;
      });
    }
  });
  return counts;
};

/**
 * Filter tasks based on selected tags and mode
 */
export const filterTasksByTags = (
  tasks: Task[], 
  selectedTags: string[], 
  mode: 'AND' | 'OR'
): Task[] => {
  if (selectedTags.length === 0) return tasks;
  
  return tasks.filter(task => {
    if (!task.tags || task.tags.length === 0) return false;
    
    const taskTags = task.tags.map((tag: string) => tag.toLowerCase());
    
    if (mode === 'AND') {
      return selectedTags.every(tag => taskTags.includes(tag.toLowerCase()));
    } else {
      return selectedTags.some(tag => taskTags.includes(tag.toLowerCase()));
    }
  });
};

/**
 * Ensure task has at least the "others" tag if no tags are provided
 */
export const ensureDefaultTag = (tags?: string[]): string[] => {
  if (!tags || tags.length === 0) {
    return ['others'];
  }
  return tags;
}; 