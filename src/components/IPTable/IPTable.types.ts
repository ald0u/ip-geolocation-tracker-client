import type { IPData } from '../../types';

/**
 * Props for the IPTable component.
 */

export interface IPTableProps {
  data: IPData[];
  isLoading: boolean;
  onDelete: (id: string) => Promise<void>;
  onSelectIP?: (ip: IPData) => void;
}

export interface IPTableColumn {
  key: keyof IPData;
  label: string;
  render?: (value: unknown, row: IPData) => React.ReactNode;
  className?: string;
}