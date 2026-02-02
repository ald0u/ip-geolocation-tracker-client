/**
 * Common types for API responses and errors.
 */
export interface APIResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

/**
 * Interface for pagination metadata in API responses.
 */
export interface PaginationResponse<TMeta = Record<string, unknown>> {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  meta?: TMeta;
}

/**
 * Interface for paginated API responses.
 */
export interface PaginatedAPIResponse<T> extends APIResponse<T[]> {
  pagination?: PaginationResponse;
}

/**
 * Interface for API error details.
 */
export interface APIError {
  status?: number;
  message: string;
  code?: string;
  isIPDuplicate?: boolean;
}

/**
 * Interface for query parameters in API requests.
 */
export interface QueryParams extends Record<string, string | number | boolean | undefined> {
  page?: number;
  limit?: number;
}

/**
 * Type for handling API responses and errors.
 */
export type APIResponseHandler<T, R = T> = (response: APIResponse<T>) => R;
export type APIErrorHandler = (error: APIError) => void; 