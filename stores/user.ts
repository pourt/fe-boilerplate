import { defineStore } from 'pinia';
import { api } from '~/composables/api';
import type { Auth } from '~/models/authModel';
import type { Login } from '~/models/login';
import type { User } from '~/models/user';

export const useUserStore = defineStore('user', () => {
  const user = ref();
  const bearerToken = useCookie('APP_COOKIE', {
    maxAge: 60 * 60 * 24 * 7,
  });

  const setAuthUser = (data?: {}) => (user.value = data);
  const setToken = (data?: string) => (bearerToken.value = data);

  const signIn = async (data: Login) => {
    try {
      const response = await api.post<Auth>('auth/login', JSON.stringify(data));

      setToken(response.access_token.value);

      await fetchAuthUser();
    } catch (error) {
      setAuthUser();
      setToken();
      console.log('signIn', error);
    }
  };

  const fetchAuthUser = async () => {
    if (bearerToken.value) {
      try {
        const response = await api.get<User>('auth/user');

        setAuthUser(response);
      } catch (error) {
        setAuthUser();
        setToken();
        console.log('signIn', error);
      }
    }
  };

  const logout = async () => {
    setAuthUser();
    setToken();
  };

  return {
    user,
    bearerToken,
    signIn,
    fetchAuthUser,
    logout,
    setAuthUser,
    setToken,
  };
});
