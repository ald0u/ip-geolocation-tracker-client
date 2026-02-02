export interface Statistics {
  total: number;
  byThreatLevel: Array<{ threatLevel: string; _count: number }>;
  topCountries: Array<{ country: string; _count: number }>;
}

export interface StatisticsProps {
  className?: string;
}
