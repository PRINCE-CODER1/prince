import { clsx, type ClassValue } from "clsx";

// Simple cn utility without tailwind-merge to reduce dependencies
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
