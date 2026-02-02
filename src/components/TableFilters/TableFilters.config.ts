import { THREAT_LEVELS } from '../../constants/config';

/**
 * Configuration for table filters with labels and placeholders in Spanish.
 */

export const filterConfig = {
  country: {
    label: 'País',
    placeholder: 'Filtrar por país',
  },
  city: {
    label: 'Ciudad',
    placeholder: 'Filtrar por ciudad',
  },
  threatLevel: {
    label: 'Nivel de Amenaza',
    placeholder: 'Seleccionar nivel',
    options: THREAT_LEVELS,
  },
} as const;