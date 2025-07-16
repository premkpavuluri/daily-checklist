/**
 * Simple tests for date utility functions
 * Run with: npx ts-node src/lib/dateUtils.test.ts
 */

import { 
  getUserTimezone, 
  formatDate, 
  isOverdue, 
  formatCompletionDate,
  formatDateForInput,
  parseDateFromInput 
} from './dateUtils';

// Mock test function
function test(description: string, testFn: () => void) {
  try {
    testFn();
    console.log(`✅ ${description}`);
  } catch (error) {
    console.error(`❌ ${description}:`, error);
  }
}

// Test timezone detection
test('getUserTimezone should return a valid timezone', () => {
  const timezone = getUserTimezone();
  console.log(`   Detected timezone: ${timezone}`);
  if (!timezone || typeof timezone !== 'string') {
    throw new Error('Invalid timezone returned');
  }
});

// Test date formatting
test('formatDate should format dates correctly', () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const todayFormatted = formatDate(today.toISOString());
  const tomorrowFormatted = formatDate(tomorrow.toISOString());
  
  console.log(`   Today formatted: ${todayFormatted}`);
  console.log(`   Tomorrow formatted: ${tomorrowFormatted}`);
  
  if (todayFormatted !== 'Today') {
    throw new Error('Today should be formatted as "Today"');
  }
  if (tomorrowFormatted !== 'Tomorrow') {
    throw new Error('Tomorrow should be formatted as "Tomorrow"');
  }
});

// Test overdue detection
test('isOverdue should detect overdue dates', () => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  
  const isYesterdayOverdue = isOverdue(yesterday.toISOString());
  console.log(`   Yesterday overdue: ${isYesterdayOverdue}`);
  
  if (!isYesterdayOverdue) {
    throw new Error('Yesterday should be overdue');
  }
});

// Test completion date formatting
test('formatCompletionDate should format completion dates', () => {
  const today = new Date();
  const completionDate = formatCompletionDate(today.toISOString());
  
  console.log(`   Completion date: ${completionDate}`);
  
  if (!completionDate.includes('Completed today')) {
    throw new Error('Today completion should show "Completed today"');
  }
});

// Test input date formatting
test('formatDateForInput should format dates for input fields', () => {
  const testDate = new Date('2024-01-15T10:30:00Z');
  const formatted = formatDateForInput(testDate.toISOString());
  
  console.log(`   Input formatted: ${formatted}`);
  
  if (!formatted.match(/^\d{4}-\d{2}-\d{2}$/)) {
    throw new Error('Input format should be YYYY-MM-DD');
  }
});

console.log('\n🎉 All tests completed!'); 