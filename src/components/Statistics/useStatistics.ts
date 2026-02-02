import { useEffect, useState } from 'react';
import { ipService } from '../../services';
import type { Statistics } from './Statistics.types';

export const useStatistics = () => {
  const [stats, setStats] = useState<Statistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await ipService.getStats();
        if (response.data) {
          setStats(response.data);
        }
        setError(null);
      } catch {
        setError('Error al cargar estadísticas');
        setStats(null);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading, error };
};
