import { formatDAte, formatThreatLevel } from '../../utils/formatter';
import type { IPTableColumn } from './IPTable.types';

export const tableColumns: IPTableColumn[] = [
  {
    key: 'ip',
    label: 'Dirección IP',
    className: 'font-mono font-semibold',
  },
  {
    key: 'country',
    label: 'País',
  },
  {
    key: 'city',
    label: 'Ciudad',
  },
  {
    key: 'isp',
    label: 'ISP',
  },
  {
    key: 'threatLevel',
    label: 'Amenaza',
    render: (value) => {
      const { text, color } = formatThreatLevel(String(value));
      return <span className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}> {text} </span>;
    },
  },
  {
    key: 'createdAt',
    label: 'Fecha',
    render: (value) => formatDAte(String(value)),
  },
];