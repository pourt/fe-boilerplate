import { useFetch } from '#app';
import type { ApiResponse } from '@/models/apiResponse';
import type { RuntimeConfig } from 'nuxt/schema';
import type { App } from 'vue';

class Api {
  public static appInstance: App;

  public static config: RuntimeConfig;

  public static init(app: App<Element>) {
    Api.appInstance = app;
    Api.config = useRuntimeConfig();
  }

  public static async get(enpoint: string, slug = ''): Promise<ApiResponse> {
    console.log('Api.config.public.BASE_URL,', Api.config.public.BASE_URL);
    const options = {
      baseURL: Api.config.public.baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
    };

    return (await useFetch(enpoint, options)).value as unknown as ApiResponse;
  }

  public static async post(enpoint: string, data = {}): Promise<ApiResponse> {
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: data,
      baseURL: Api.config.public.baseURL,
    };

    return (await useFetch(enpoint, options)) as unknown as ApiResponse;
  }

  public static async put(
    enpoint: string,
    slug = '',
    data = {}
  ): Promise<ApiResponse> {
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: data,
      baseURL: Api.config.public.baseURL,
    };

    return (await useFetch(enpoint, options)) as unknown as ApiResponse;
  }

  public static async delete(enpoint: string, slug = ''): Promise<ApiResponse> {
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
      baseURL: Api.config.public.baseURL,
    };

    return (await useFetch(enpoint, options)) as unknown as ApiResponse;
  }

  public static async head(enpoint: string): Promise<ApiResponse> {
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'HEAD',
      baseURL: Api.config.public.baseURL,
    };

    return (await useFetch(enpoint, options)) as unknown as ApiResponse;
  }
}

export default Api;
