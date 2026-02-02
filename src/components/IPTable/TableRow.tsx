import { memo, useCallback, useState } from 'react';
import { Button, Modal } from '../common';
import { tableColumns } from './IPTable.config';
import type { IPData } from '../../types';

interface TableRowProps {
  row: IPData;
  onDelete: (id: string) => Promise<void>;
  onSelectIP?: (ip: IPData) => void;
}

const TableRowComponent = ({ row, onDelete, onSelectIP }: TableRowProps) => {
  const [showModal, setShowModal] = useState(false);

  const handleDeleteClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setShowModal(true);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    setShowModal(false);
    onDelete(row.id);
  }, [row.id, onDelete]);

  const handleRowClick = useCallback(() => {
    onSelectIP?.(row);
  }, [row, onSelectIP]);

  return (
    <>
      <tr onClick={handleRowClick} className="hover:bg-gray-50 transition-colors cursor-pointer">
        {tableColumns.map((column) => (
          <td key={column.key} className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${column.className || ''}`}>
            {column.render ? column.render(row[column.key], row) : row[column.key]}
          </td>
        ))}
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          <Button variant="danger" size="sm" onClick={handleDeleteClick}>
            Eliminar
          </Button>
        </td>
      </tr>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Confirmar eliminación"
      >
        <div className="space-y-4">
          <p className="text-gray-700">
            ¿Estás seguro de que deseas eliminar la IP <span className="font-semibold">{row.ip}</span>?
          </p>
          <div className="flex gap-3 justify-end">
            <Button variant="ghost" onClick={() => setShowModal(false)}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={handleConfirmDelete}>
              Eliminar
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export const TableRow = memo(TableRowComponent);