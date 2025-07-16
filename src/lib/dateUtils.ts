/**
 * Date utility functions for timezone-aware date handling
 */

// Get the user's timezone - defaults to Indian timezone (Asia/Kolkata) if not available
export const getUserTimezone = (): string => {
  try {
    // Try to get the browser's timezone
    const browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return browserTimezone || 'Asia/Kolkata';
  } catch {
    // Fallback to Indian timezone
    return 'Asia/Kolkata';
  }
};

// Get current date in user's timezone
export const getCurrentDate = (): Date => {
  return new Date();
};

// Format date for display with timezone awareness
export const formatDate = (dateString: string, options?: Intl.DateTimeFormatOptions): string => {
  try {
    const date = new Date(dateString);
    const timezone = getUserTimezone();
    const today = getCurrentDate();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Check if it's today or tomorrow
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      // Use timezone-aware formatting
      return date.toLocaleDateString('en-IN', {
        month: 'short',
        day: 'numeric',
        year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined,
        timeZone: timezone,
        ...options
      });
    }
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
};

// Check if deadline is overdue with timezone awareness
export const isOverdue = (dateString: string): boolean => {
  try {
    const deadline = new Date(dateString);
    const today = getCurrentDate();
    const todayStart = new Date(today);
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date(today);
    todayEnd.setHours(23, 59, 59, 999);
    
    // If it's today, don't consider it overdue
    if (deadline >= todayStart && deadline <= todayEnd) {
      return false;
    }
    
    // Check if it's overdue (before today)
    return deadline < todayStart;
  } catch (error) {
    console.error('Error checking overdue status:', error);
    return false;
  }
};

// Format completion date with timezone awareness
export const formatCompletionDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    const timezone = getUserTimezone();
    const today = getCurrentDate();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Completed today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Completed yesterday';
    } else {
      return `Completed on ${date.toLocaleDateString('en-IN', {
        month: 'short',
        day: 'numeric',
        year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined,
        timeZone: timezone
      })}`;
    }
  } catch (error) {
    console.error('Error formatting completion date:', error);
    return `Completed on ${dateString}`;
  }
};

// Get current date as ISO string with timezone awareness
export const getCurrentDateISO = (): string => {
  return getCurrentDate().toISOString();
};

// Format date for input fields (YYYY-MM-DD format)
export const formatDateForInput = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    const timezone = getUserTimezone();
    
    // Convert to user's timezone and format as YYYY-MM-DD
    const userDate = new Date(date.toLocaleString('en-US', { timeZone: timezone }));
    const year = userDate.getFullYear();
    const month = String(userDate.getMonth() + 1).padStart(2, '0');
    const day = String(userDate.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  } catch (error) {
    console.error('Error formatting date for input:', error);
    return dateString;
  }
};

// Parse date from input field with timezone awareness
export const parseDateFromInput = (dateString: string): string => {
  try {
    if (!dateString) return '';
    
    // Create date in user's timezone
    const date = new Date(dateString + 'T00:00:00');
    const timezone = getUserTimezone();
    
    // Convert to UTC for storage
    const utcDate = new Date(date.toLocaleString('en-US', { timeZone: timezone }));
    return utcDate.toISOString();
  } catch (error) {
    console.error('Error parsing date from input:', error);
    return dateString;
  }
}; 