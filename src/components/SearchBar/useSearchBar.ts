import { useState, useCallback, type ChangeEvent, type FormEvent } from 'react';
import { getIPValidationError } from '../../utils/validators';
import type { SearchBarState } from './SearchBar.types';

/**
 * Custom hook for managing SearchBar state and logic.
 * @param onSearch Function to call when a valid IP is submitted.
 * @returns An object containing state and handlers for the SearchBar component.
 */
export const useSearchBar = (onSearch: (ip: string) => Promise<void>) => {
  const [state, setState] = useState<SearchBarState>({
    inputValue: '',
    error: null,
  });

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setState((prev) => ({ ...prev, inputValue: value, error: null }));
  }, []);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const validationError = getIPValidationError(state.inputValue);
      if (validationError) {
        setState((prev) => ({ ...prev, error: validationError }));
        return;
      }

      await onSearch(state.inputValue.trim());
      setState({ inputValue: '', error: null });
    },
    [state.inputValue, onSearch]
  );

  const clearInput = useCallback(() => {
    setState({ inputValue: '', error: null });
  }, []);

  return {
    inputValue: state.inputValue,
    error: state.error,
    handleInputChange,
    handleSubmit,
    clearInput,
  };
};