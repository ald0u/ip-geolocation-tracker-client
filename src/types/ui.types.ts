import type { ReactNode } from 'react';

/**
 * UI-related types and interfaces
 */
export type AlertType = 'success' | 'error' | 'info' | 'warning';

export interface AlertState<T extends AlertType = AlertType> {
  isOpen: boolean;
  type: T;
  title?: string;
  message: string;
  autoClose?: number;
}

/**
 * Modal state interface
 */
export interface ModalState<TData = unknown> {
  isOpen: boolean;
  title: string;
  content: ReactNode;
  data?: TData;
}

/**
 * Button variant types  AND Sizes
 */
export const BUTTON_VARIANTS = ['primary', 'secondary', 'ghost', 'danger'] as const;
export type ButtonVariant = typeof BUTTON_VARIANTS[number];
export const BUTTON_SIZES = ['sm', 'md', 'lg'] as const;
export type ButtonSize = typeof BUTTON_SIZES[number];

/**
 * Sort direction and Config type
 */
export type SortDirection = 'asc' | 'desc';

export interface SortConfig<T = string> {
  field: T;
  direction: SortDirection;
}

/**
 * Table column definition interface with Generic
 */
export interface TableColumn<T> {
  key: keyof T;
  label: string;
  sortable: boolean;
  render?: (value: T[keyof T], row: T) => ReactNode;
  className?: string;
}

/**
 *  Loading state interface
 */
export interface LoadingState {
  isLoading: boolean;
  message?: string;
}

/**
 * Async operation state type with Generic
 */
export type AsyncState<T, E = Error> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: E };

/**
 * Form state type with Generic
 */
export type FormState<T> = | { type: 'idle' }
  | { type: 'submitting' }
  | { type: 'success'; data: T }
  | { type: 'error'; error: string };