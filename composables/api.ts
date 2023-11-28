import { useFetch } from '#app';

export const api = {
  get: <type>(enpoint: string, slug = '') => {
    const config = useRuntimeConfig();

    console.log('config.public.BASE_URL', config.public.BASE_URL);

    const options = {
      baseURL: config.public.BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
    };

    return useFetch(enpoint, options) as type;
  },

  post: <type>(enpoint: string, data = {}) => {
    const config = useRuntimeConfig();

    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: data,
      baseURL: config.public.baseURL,
    };

    return useFetch(enpoint, options) as type;
  },

  put: <type>(enpoint: string, slug = '', data = {}) => {
    const config = useRuntimeConfig();

    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: data,
      baseURL: config.public.baseURL,
    };

    return useFetch(enpoint, options) as type;
  },

  delete: <type>(enpoint: string, slug = '') => {
    const config = useRuntimeConfig();

    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
      baseURL: config.public.baseURL,
    };

    return useFetch(enpoint, options) as type;
  },

  head: (enpoint: string) => {
    const config = useRuntimeConfig();

    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'HEAD',
      baseURL: config.public.baseURL,
    };

    return useFetch(enpoint, options);
  },
};
