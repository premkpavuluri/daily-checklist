import { Task } from '../components/molecules/TaskCard';
import { validateTagName } from './tagUtils';

// Storage keys
const TASKS_KEY = 'eisenhower-tasks';
const FILTER_TAGS_KEY = 'eisenhower-filter-tags';
const DONE_SORT_KEY = 'eisenhower-done-sort';

/**
 * Load tasks from localStorage
 * @returns Array of tasks or empty array if no data or error
 */
export const loadTasks = (): Task[] => {
  try {
    // Check if we're on the client side
    if (typeof window === 'undefined') {
      return [];
    }
    
    const data = localStorage.getItem(TASKS_KEY);
    const tasks = data ? JSON.parse(data) : [];
    
    // Migrate existing tasks to ensure they have valid tags
    const migratedTasks = tasks.map((task: Task) => {
      let validTags: string[] = [];
      
      if (task.tags && task.tags.length > 0) {
        // Filter out invalid tags
        validTags = task.tags.filter(tag => {
          const validation = validateTagName(tag);
          return validation.isValid;
        });
      }
      
      // If no valid tags remain, use default tag
      if (validTags.length === 0) {
        validTags = ['others'];
      }
      
      return {
        ...task,
        tags: validTags
      };
    });
    
    // Save migrated tasks back if any changes were made
    if (JSON.stringify(tasks) !== JSON.stringify(migratedTasks)) {
      saveTasks(migratedTasks);
    }
    
    return migratedTasks;
  } catch {
    return [];
  }
};

/**
 * Save tasks to localStorage
 * @param tasks Array of tasks to save
 */
export const saveTasks = (tasks: Task[]): void => {
  // Check if we're on the client side
  if (typeof window === 'undefined') {
    return;
  }
  
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
};

/**
 * Generate a unique ID for tasks
 * @returns Random string ID
 */
export const generateId = (): string => {
  return Math.random().toString(36).slice(2, 10);
};

/**
 * Clear all stored tasks
 */
export const clearTasks = (): void => {
  // Check if we're on the client side
  if (typeof window === 'undefined') {
    return;
  }
  
  localStorage.removeItem(TASKS_KEY);
};

/**
 * Get the storage key used for tasks
 * @returns The storage key string
 */
export const getTasksKey = (): string => {
  return TASKS_KEY;
};

/**
 * Load filter tags from localStorage
 * @returns Array of filter tags or empty array if no data or error
 */
export const loadFilterTags = (): string[] => {
  try {
    // Check if we're on the client side
    if (typeof window === 'undefined') {
      return [];
    }
    
    const data = localStorage.getItem(FILTER_TAGS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

/**
 * Save filter tags to localStorage
 * @param tags Array of filter tags to save
 */
export const saveFilterTags = (tags: string[]): void => {
  // Check if we're on the client side
  if (typeof window === 'undefined') {
    return;
  }
  
  localStorage.setItem(FILTER_TAGS_KEY, JSON.stringify(tags));
};

/**
 * Clear stored filter tags
 */
export const clearFilterTags = (): void => {
  // Check if we're on the client side
  if (typeof window === 'undefined') {
    return;
  }
  
  localStorage.removeItem(FILTER_TAGS_KEY);
};

/**
 * Get the storage key used for filter tags
 * @returns The storage key string
 */
export const getFilterTagsKey = (): string => {
  return FILTER_TAGS_KEY;
};

/**
 * Load done lane sort preference from localStorage
 * @returns Sort preference ('recent' or 'old') or 'recent' as default
 */
export const loadDoneSortPreference = (): 'recent' | 'old' => {
  try {
    // Check if we're on the client side
    if (typeof window === 'undefined') {
      return 'recent';
    }
    
    const data = localStorage.getItem(DONE_SORT_KEY);
    return data === 'old' ? 'old' : 'recent';
  } catch {
    return 'recent';
  }
};

/**
 * Save done lane sort preference to localStorage
 * @param sortOrder Sort preference to save
 */
export const saveDoneSortPreference = (sortOrder: 'recent' | 'old'): void => {
  // Check if we're on the client side
  if (typeof window === 'undefined') {
    return;
  }
  
  localStorage.setItem(DONE_SORT_KEY, sortOrder);
};

/**
 * Clear stored done lane sort preference
 */
export const clearDoneSortPreference = (): void => {
  // Check if we're on the client side
  if (typeof window === 'undefined') {
    return;
  }
  
  localStorage.removeItem(DONE_SORT_KEY);
};

/**
 * Get the storage key used for done lane sort preference
 * @returns The storage key string
 */
export const getDoneSortKey = (): string => {
  return DONE_SORT_KEY;
}; 