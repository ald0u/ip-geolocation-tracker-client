import { memo } from 'react';
import { TableRow } from './TableRow';
import { tableColumns } from './IPTable.config';
import type { IPTableProps } from './IPTable.types';

const IPTableComponent = ({ data, isLoading, onDelete, onSelectIP }: IPTableProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" role="status" aria-label="Cargando" />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No hay IPs registradas
      </div>
    );
  }

  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {tableColumns.map((column) => (
              <th
                key={column.key}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column.label}
              </th>
            ))}
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row) => (
            <TableRow key={row.id} row={row} onDelete={onDelete} onSelectIP={onSelectIP} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const IPTable = memo(IPTableComponent);