import { memo, useCallback, useState, useEffect, type ChangeEvent } from 'react';
import { Input, Button } from '../common';
import { filterConfig } from './TableFilters.config';
import type { TableFiltersProps } from './TableFilters.types';
import type { IPFilters } from '../../types';

const TableFiltersComponent = ({
  filters,
  onFilterChange,
  onClearFilters,
  hasActiveFilters,
  activeFilterCount,
}: TableFiltersProps) => {
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  useEffect(() => {
    const timer = setTimeout(() => {
      Object.keys(localFilters).forEach((key) => {
        const filterKey = key as keyof IPFilters;
        if (localFilters[filterKey] !== filters[filterKey]) {
          onFilterChange(filterKey, localFilters[filterKey] as IPFilters[typeof filterKey]);
        }
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [localFilters, filters, onFilterChange]);

  const handleInputChange = useCallback(
    <K extends keyof IPFilters>(key: K) =>
      (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setLocalFilters((prev) => ({ ...prev, [key]: e.target.value }));
      },
    []
  );

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Filtros
          {activeFilterCount > 0 && (
            <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
              {activeFilterCount}
            </span>
          )}
        </h3>
        {hasActiveFilters && (
          <Button variant="secondary" size="sm" onClick={onClearFilters}>
            Limpiar filtros
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          label={filterConfig.country.label}
          placeholder={filterConfig.country.placeholder}
          value={localFilters.country || ''}
          onChange={handleInputChange('country')}
        />

        <Input
          label={filterConfig.city.label}
          placeholder={filterConfig.city.placeholder}
          value={localFilters.city || ''}
          onChange={handleInputChange('city')}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {filterConfig.threatLevel.label}
          </label>
          <select
            value={localFilters.threatLevel || ''}
            onChange={handleInputChange('threatLevel')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
          >
            <option value="">{filterConfig.threatLevel.placeholder}</option>
            {filterConfig.threatLevel.options.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export const TableFilters = memo(TableFiltersComponent);