import { useCallback, useEffect, useRef, useState } from 'react';
import type { UseMutationResult } from '../types';

/**
 * Custom React hook for performing mutations with support for loading, error handling, and resetting.
 * @param mutationFn The mutation function that performs the asynchronous operation.
 * @param options Optional callbacks for success and error handling.
 * @returns An object containing the mutation state and functions.
 */
export const useMutation = <TData, TVariables, TError = Error>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: {
    onSuccess?: (data: TData, variables: TVariables) => void;
    onError?: (error: TError, variables: TVariables) => void;
  }
): UseMutationResult<TData, TVariables, TError> => {
  const [data, setData] = useState<TData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<TError | null>(null);
  const isMountedRef = useRef(true);

  const mutate = useCallback(async (variables: TVariables) => {
    try {
      setLoading(true);
      setError(null);
      const result = await mutationFn(variables);

      if (isMountedRef.current) {
        setData(result);
        options?.onSuccess?.(result, variables);
      }

      return result;
    } catch (err) {
      const error = err as TError;
      if (isMountedRef.current) {
        setError(error);
        options?.onError?.(error, variables);
      }
      throw error;
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  }, [mutationFn, options]);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    }
  }, [])

  return { data, loading, error, mutate, reset };
};