export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || '/api',
  TIMEOUT: 10000,
} as const;

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 5,
  MAX_LIMIT: 100,
} as const;

export const THREAT_LEVELS = ['Low', 'Medium', 'High', 'Critical', 'Unknown'] as const;

export type ThreatLevel = (typeof THREAT_LEVELS)[number];

export const MAP_CONFIG = {
  DEFAULT_CENTER: { lat: 20, lng: 0 } as const,
  DEFAULT_ZOOM: 2,
  MARKER_ZOOM: 13,
} as const;

export const DEBOUNCE_DELAY = {
  SEARCH: 300,
  FILTER: 500,
} as const;