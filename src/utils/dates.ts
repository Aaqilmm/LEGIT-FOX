import { format, formatDistanceToNow, isAfter, isBefore, addDays, parseISO } from 'date-fns';

/**
 * Date utility functions for consistent date formatting and calculations
 */

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return format(d, 'MMM dd, yyyy');
}

export function formatDateTime(date: Date | string): string {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return format(d, 'MMM dd, yyyy HH:mm');
}

export function formatTimeAgo(date: Date | string): string {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return formatDistanceToNow(d, { addSuffix: true });
}

export function isOverdue(dueDate: Date | string): boolean {
  const d = typeof dueDate === 'string' ? parseISO(dueDate) : dueDate;
  return isBefore(d, new Date());
}

export function isDueSoon(dueDate: Date | string, daysThreshold: number = 3): boolean {
  const d = typeof dueDate === 'string' ? parseISO(dueDate) : dueDate;
  const thresholdDate = addDays(new Date(), daysThreshold);
  return isAfter(d, new Date()) && isBefore(d, thresholdDate);
}

export function calculateAge(startDate: Date | string): number {
  const start = typeof startDate === 'string' ? parseISO(startDate) : startDate;
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - start.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
