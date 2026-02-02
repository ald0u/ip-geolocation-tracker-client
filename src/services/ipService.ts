import axios, { AxiosError } from 'axios';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import { API_CONFIG } from '../constants/config';
import type {
  IPData,
  APIResponse,
  PaginatedAPIResponse,
  APIError,
  QueryParams,
  IPCreatePayload,
} from '../types';

/**
 * Defines the HTTP request methods.
 */

type RequestMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

interface ServiceRequestConfig<T = unknown> extends AxiosRequestConfig {
  params?: T;
}

class IPService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_CONFIG.BASE_URL,
      timeout: API_CONFIG.TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.api.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.api.interceptors.response.use(
      (response) => response,
      (error: AxiosError<{ success: boolean; message?: string; error?: string }>) => {
        const apiError: APIError = {
          status: error.response?.status,
          message: error.response?.data?.message || error.response?.data?.error || error.message || 'Error desconocido',
          isIPDuplicate: error.response?.status === 409,
        };

        return Promise.reject(apiError);
      }
    );
  }

  private async request<TResponse, TData = unknown>(
    method: RequestMethod,
    url: string,
    data?: TData,
    config?: ServiceRequestConfig
  ): Promise<TResponse> {
    const response = await this.api.request<TResponse>({
      method,
      url,
      data,
      ...config,
    });

    return response.data;
  }

  async getAllIPs(params?: QueryParams & {
    country?: string;
    city?: string;
    threatLevel?: string;
  }): Promise<PaginatedAPIResponse<IPData>> {
    return this.request<PaginatedAPIResponse<IPData>>('get', '/ips', undefined, { params });
  }

  async createIP(ip: string): Promise<APIResponse<IPData>> {
    const payload: IPCreatePayload = { ip };
    return this.request<APIResponse<IPData>, IPCreatePayload>('post', '/ips', payload);
  }

  async deleteIP(id: string): Promise<APIResponse<void>> {
    return this.request<APIResponse<void>>('delete', `/ips/${id}`);
  }

  async getIPById(id: string): Promise<APIResponse<IPData>> {
    return this.request<APIResponse<IPData>>('get', `/ips/${id}`);
  }

  async getStats(): Promise<APIResponse<{
    total: number;
    byThreatLevel: Array<{ threatLevel: string; _count: number }>;
    topCountries: Array<{ country: string; _count: number }>;
  }>> {
    return this.request('get', '/ips/stats');
  }
}

export const ipService = new IPService();
export { IPService };