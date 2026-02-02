import type { PaginationResponse } from './api.types';

/**
 * Generic interface for useFetch hook result
 */
export interface UseFetchResult<T, E = Error> {
  data: T | null;
  loading: boolean;
  error: E | null;
  refetch: () => Promise<void>;
}

/**
 * Generic interface for useMutation hook result
 */
export interface UseMutationResult<TData, TVariables, TError = Error> {
  mutate: (variables: TVariables) => Promise<TData>;
  data: TData | null;
  loading: boolean;
  error: TError | null;
  reset: () => void;
}

/**
 * Generic interface for usePagination hook result
 */
export interface UsePaginationResult<T = Record<string, unknown>> {
  pagination: PaginationResponse<T>;
  setPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  updatePagination: (pagination: PaginationResponse<T>) => void;
  resetPagination: () => void;
  canGoNext: boolean;
  canGoPrev: boolean;
}

/**
 * Generic interface for useFilters hook result
 */
export interface UseFiltersResult<T extends Record<string, unknown>> {
  filters: Partial<T>;
  updateFilters: <K extends keyof T>(key: K, value: T[K] | undefined) => void;
  clearFilters: () => void;
  setAllFilters: (filters: Partial<T>) => void;
  hasActiveFilters: boolean;
  activeFilterCount: number;
}
