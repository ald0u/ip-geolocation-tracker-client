import type { IPCoordinates } from '../../types';

/**
 * Props for the MapView components
 */

export interface MapViewProps {
  coordinates: IPCoordinates;
  ipAddress: string;
  city: string;
  country: string;
}