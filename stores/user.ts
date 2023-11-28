import { defineStore } from 'pinia';
import Api from '~/utils/api';
import type { ApiResponse } from '~/models/apiResponse';
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

  const signIn = async (payload: Login) => {
    try {
      await Api.post('auth/login', JSON.stringify(payload)).then(
        async ({ data }) => {
          const responseData = data.value as unknown as ApiResponse;
          const auth = responseData.data as unknown as Auth;
          setToken(auth?.access_token.value);
        }
      );

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
        const response = await Api.get('auth/user');

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
