import { Task } from '../components/molecules/TaskCard';
import { validateTagName } from './tagUtils';

// Storage key for tasks
const TASKS_KEY = 'eisenhower-tasks';

/**
 * Load tasks from localStorage
 * @returns Array of tasks or empty array if no data or error
 */
export const loadTasks = (): Task[] => {
  try {
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
  localStorage.removeItem(TASKS_KEY);
};

/**
 * Get the storage key used for tasks
 * @returns The storage key string
 */
export const getTasksKey = (): string => {
  return TASKS_KEY;
}; 