import { memo } from 'react';
import { useStatistics } from './useStatistics';
import type { StatisticsProps } from './Statistics.types';

const StatCard = ({ title, value, className = '', bgColor = 'bg-gradient-to-br from-blue-500 to-blue-600' }: { title: string; value: string | number; className?: string; bgColor?: string }) => (
  <div className={`${bgColor} rounded-lg shadow-lg p-6 transform transition-transform hover:scale-105 ${className}`}>
    <h3 className="text-sm font-medium text-white/90 uppercase tracking-wide mb-2">{title}</h3>
    <p className="text-3xl font-bold text-white">{value}</p>
  </div>
);

const StatisticsComponent = ({ className = '' }: StatisticsProps) => {
  const { stats, loading, error } = useStatistics();

  if (loading) {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${className}`}>
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
            <div className="h-8 bg-gray-200 rounded w-3/4" />
          </div>
        ))}
      </div>
    );
  }

  if (error || !stats) {
    return null;
  }

  const threatLevelMap: Record<string, string> = {
    'Low': 'Bajo',
    'Medium': 'Medio',
    'High': 'Alto',
    'Critical': 'Crítico',
    'Unknown': 'Desconocido',
  };

  const topThreatLevel = stats.byThreatLevel[0];
  const topCountry = stats.topCountries[0];

  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${className}`}>
      <StatCard title="Total de IPs" value={stats.total} bgColor="bg-gradient-to-br from-blue-500 to-blue-600" />

      {topThreatLevel && (
        <StatCard
          title="Nivel de Amenaza Principal"
          value={`${threatLevelMap[topThreatLevel.threatLevel] || topThreatLevel.threatLevel} (${topThreatLevel._count})`}
          bgColor="bg-gradient-to-br from-purple-500 to-purple-600"
        />
      )}

      {topCountry && (
        <StatCard
          title="País con más IPs"
          value={`${topCountry.country} (${topCountry._count})`}
          bgColor="bg-gradient-to-br from-emerald-500 to-emerald-600"
        />
      )}
    </div>
  );
};

export const Statistics = memo(StatisticsComponent);
