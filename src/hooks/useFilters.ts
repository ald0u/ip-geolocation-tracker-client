import { useCallback, useMemo, useState } from 'react';
import type { UseFiltersResult } from '../types';

export const useFilters = <T extends Record<string, unknown>>(): UseFiltersResult<T> => {
  const [filters, setFilters] = useState<Partial<T>>({});

  const updateFilters = useCallback(<K extends keyof T>(key: K, value: T[K] | undefined) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value ?? undefined
    }));
  }, [])

  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);

  const setAllFilters = useCallback((newFilters: Partial<T>) => {
    setFilters(newFilters);
  }, []);

  const hasActiveFilters = useMemo(
    () => Object.values(filters).some((value) => value !== undefined && value !== ''),
    [filters]
  )

  const activeFilterCount = useMemo(
    () => Object.values(filters).filter((value) => value !== undefined && value !== '').length,
    [filters]
  )

  return {
    filters,
    updateFilters,
    clearFilters,
    setAllFilters,
    hasActiveFilters,
    activeFilterCount
  }
}