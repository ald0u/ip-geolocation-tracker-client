import { useState, useCallback, useMemo } from 'react';
import { PAGINATION } from '../constants/config';
import type { PaginationResponse, UsePaginationResult } from '../types';

/**
 * Custom React hook for managing pagination state and actions.
 * @param initialPage The initial page number to start pagination from. Default is 1.
 * @returns An object containing pagination state and functions to manipulate it.
 */

export const usePagination = <T = Record<string, unknown>>(
  initialPage = PAGINATION.DEFAULT_PAGE
): UsePaginationResult<T> => {
  const [pagination, setPagination] = useState<PaginationResponse<T>>({
    page: initialPage,
    limit: PAGINATION.DEFAULT_LIMIT,
    total: 0,
    totalPages: 0,
  });

  const setPage = useCallback((page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  }, []);

  const nextPage = useCallback(() => {
    setPagination((prev) => ({
      ...prev,
      page: Math.min(prev.page + 1, prev.totalPages),
    }));
  }, []);

  const prevPage = useCallback(() => {
    setPagination((prev) => ({
      ...prev,
      page: Math.max(prev.page - 1, 1),
    }));
  }, []);

  const updatePagination = useCallback((newPagination: PaginationResponse<T>) => {
    setPagination(newPagination);
  }, []);

  const resetPagination = useCallback(() => {
    setPagination((prev) => ({ ...prev, page: 1 }));
  }, []);

  const canGoNext = useMemo(
    () => pagination.page < pagination.totalPages,
    [pagination.page, pagination.totalPages]
  );

  const canGoPrev = useMemo(() => pagination.page > 1, [pagination.page]);

  return {
    pagination,
    setPage,
    nextPage,
    prevPage,
    updatePagination,
    resetPagination,
    canGoNext,
    canGoPrev,
  };
};