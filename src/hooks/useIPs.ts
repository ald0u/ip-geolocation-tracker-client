import { useState, useCallback, useEffect } from 'react';
import { ipService } from '../services/ipService';
import { usePagination } from './usePagination';
import { useFilters } from './useFilters';
import type { IPData, IPFilters, APIError } from '../types';

/**
 * Hook to manage IP data fetching, creation, deletion, pagination, and filtering.
 * @returns {UseIPsResult}
 */

interface UseIPsResult {
  ips: IPData[];
  loading: boolean;
  error: string | null;
  isBackendDown: boolean;
  pagination: ReturnType<typeof usePagination>['pagination'];
  filters: Partial<IPFilters>;
  hasActiveFilters: boolean;
  activeFilterCount: number;
  fetchIPs: () => Promise<void>;
  createIP: (ip: string) => Promise<{ success: boolean; isDuplicate?: boolean; data?: IPData }>;
  deleteIP: (id: string) => Promise<void>;
  setPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  canGoNext: boolean;
  canGoPrev: boolean;
  updateFilters: <K extends keyof IPFilters>(key: K, value: IPFilters[K]) => void;
  clearFilters: () => void;
  retryConnection: () => Promise<void>;
}

export const useIPs = (): UseIPsResult => {
  const [ips, setIps] = useState<IPData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isBackendDown, setIsBackendDown] = useState(false);

  const {
    pagination,
    updatePagination,
    setPage,
    nextPage,
    prevPage,
    resetPagination,
    canGoNext,
    canGoPrev,
  } = usePagination();

  const {
    filters,
    updateFilters,
    clearFilters: clearFiltersState,
    hasActiveFilters,
    activeFilterCount,
  } = useFilters<IPFilters>();

  const fetchIPs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await ipService.getAllIPs({
        page: pagination.page,
        limit: pagination.limit,
        ...filters,
      });

      if (response.success && response.data) {
        setIps(response.data);
        if (response.pagination) {
          updatePagination(response.pagination);
        }
      }
      setIsBackendDown(false);
    } catch (err) {
      const apiError = err as APIError;
      if (!apiError.status || apiError.status >= 500) {
        setIsBackendDown(true);
      }
      setError(apiError.message || 'Error al cargar las IPs');
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.limit, filters, updatePagination]);

  const createIP = useCallback(
    async (ip: string) => {
      try {
        setLoading(true);
        setError(null);

        const response = await ipService.createIP(ip);

        if (response.success) {
          await fetchIPs();
          return { success: true, data: response.data };
        }

        return { success: false };
      } catch (err) {
        const apiError = err as APIError;
        setError(apiError.message);
        return {
          success: false,
          isDuplicate: apiError.isIPDuplicate,
        };
      } finally {
        setLoading(false);
      }
    },
    [fetchIPs]
  );

  const deleteIP = useCallback(
    async (id: string) => {
      try {
        setLoading(true);
        setError(null);

        await ipService.deleteIP(id);
        await fetchIPs();
      } catch (err) {
        const apiError = err as APIError;
        setError(apiError.message || 'Error al eliminar la IP');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [fetchIPs]
  );

  const clearFilters = useCallback(() => {
    clearFiltersState();
    resetPagination();
  }, [clearFiltersState, resetPagination]);

  const retryConnection = useCallback(async () => {
    setIsBackendDown(false);
    await fetchIPs();
  }, [fetchIPs]);

  useEffect(() => {
    fetchIPs();
  }, [fetchIPs]);

  return {
    ips,
    loading,
    error,
    isBackendDown,
    pagination,
    filters,
    hasActiveFilters,
    activeFilterCount,
    fetchIPs,
    createIP,
    deleteIP,
    setPage,
    nextPage,
    prevPage,
    canGoNext,
    canGoPrev,
    updateFilters,
    clearFilters,
    retryConnection,
  };
};