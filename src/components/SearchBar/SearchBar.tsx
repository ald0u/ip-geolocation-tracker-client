import { memo } from 'react';
import { Input, Button } from '../common';
import { useSearchBar } from './useSearchBar';
import type { SearchBarProps } from './SearchBar.types';

/**
 * SearchBarComponent
 */

const SearchBarComponent = ({ onSearch, isLoading }: SearchBarProps) => {
  const { inputValue, error, handleInputChange, handleSubmit } = useSearchBar(onSearch);

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="flex gap-3">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Ingresa una dirección IP (ej: 8.8.8.8)"
            value={inputValue}
            onChange={handleInputChange}
            error={error || undefined}
            disabled={isLoading}
            aria-label="Dirección IP"
          />
        </div>
        <Button type="submit" isLoading={isLoading} disabled={isLoading || !inputValue.trim()}>
          Buscar
        </Button>
      </div>
    </form>
  );
};

export const SearchBar = memo(SearchBarComponent);