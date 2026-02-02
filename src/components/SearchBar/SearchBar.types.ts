/**
 * Types for the SearchBar component.
 */
export interface SearchBarProps {
  onSearch: (ip: string) => Promise<void>;
  isLoading: boolean;
}

export interface SearchBarState {
  inputValue: string;
  error: string | null;
}