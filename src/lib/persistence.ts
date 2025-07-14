import { Task } from '../components/molecules/TaskCard';

// Storage key for tasks
const TASKS_KEY = 'eisenhower-tasks';

/**
 * Load tasks from localStorage
 * @returns Array of tasks or empty array if no data or error
 */
export const loadTasks = (): Task[] => {
  try {
    const data = localStorage.getItem(TASKS_KEY);
    return data ? JSON.parse(data) : [];
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