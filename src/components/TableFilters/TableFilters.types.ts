import type { IPFilters } from '../../types';

/**
 * Props for the TableFilters component.
 */

export interface TableFiltersProps {
  filters: Partial<IPFilters>;
  onFilterChange: <K extends keyof IPFilters>(key: K, value: IPFilters[K]) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
  activeFilterCount: number;
}