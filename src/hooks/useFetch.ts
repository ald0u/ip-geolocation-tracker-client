import { useCallback, useEffect, useRef, useState } from 'react';
import type { UseFetchResult } from '../types';

/**
 * Custom React hook for fetching data with support for loading, error handling, and refetching.
 * @param fetchFn The function that returns a promise to fetch data.
 * @param options Optional configuration for the fetch operation.
 * @returns An object containing the fetch state and a refetch function.
 */
export const useFetch = <T, E = Error>(
  fetchFn: () => Promise<T>,
  options?: {
    immediate?: boolean;
    onSuccess?: (data: T) => void;
    onError?: (error: E) => void;
  }
): UseFetchResult<T, E> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<E | null>(null);
  const isMountedRef = useRef(true);

  const refetch = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await fetchFn();

      if (isMountedRef.current) {
        setData(result);
        options?.onSuccess?.(result);
      }
    } catch (err) {
      if (isMountedRef.current) {
        const error = err as E;
        setError(error);
        options?.onError?.(error);
      }
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  }, [fetchFn, options]);

  useEffect(() => {
    if (options?.immediate) {
      refetch();
    }
  }, [refetch, options?.immediate])

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    }
  }, [])

  return { data, loading, error, refetch };
};