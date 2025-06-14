/**
 * 🎨 Utility - Class Name utility
 * Utility per combinare classi CSS condizionalmente (simile a clsx)
 */

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
