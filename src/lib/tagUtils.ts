export interface TagColor {
  bg: string;
  text: string;
  border: string;
}

export const tagColors: TagColor[] = [
  { bg: '#dbeafe', text: '#2563eb', border: '#bfdbfe' }, // Blue
  { bg: '#fef3c7', text: '#d97706', border: '#fcd34d' }, // Orange
  { bg: '#dcfce7', text: '#16a34a', border: '#bbf7d0' }, // Green
  { bg: '#fce7f3', text: '#ec4899', border: '#f9a8d4' }, // Pink
  { bg: '#e0e7ff', text: '#7c3aed', border: '#c7d2fe' }, // Purple
  { bg: '#fef2f2', text: '#dc2626', border: '#fecaca' }, // Red
  { bg: '#f0fdf4', text: '#059669', border: '#a7f3d0' }, // Emerald
  { bg: '#fef9c3', text: '#ca8a04', border: '#fde047' }, // Yellow
  { bg: '#f1f5f9', text: '#475569', border: '#cbd5e1' }, // Gray
  { bg: '#f0f9ff', text: '#0284c7', border: '#7dd3fc' }, // Sky
];

export const defaultTags = [
  'work',
  'personal', 
  'urgent',
  'important',
  'meeting',
  'email',
  'call',
  'research',
  'planning',
  'review'
];

/**
 * Generate a consistent color for a tag based on its name
 */
export const getTagColor = (tagName: string): TagColor => {
  const hash = tagName.toLowerCase().split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  return tagColors[Math.abs(hash) % tagColors.length];
};

/**
 * Get all unique tags from a list of tasks
 */
export const getAllTags = (tasks: any[]): string[] => {
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
export const getTagCounts = (tasks: any[]): Record<string, number> => {
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
  tasks: any[], 
  selectedTags: string[], 
  mode: 'AND' | 'OR'
): any[] => {
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