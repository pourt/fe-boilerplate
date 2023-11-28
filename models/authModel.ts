import type { AccessToken } from './accessToken';
import type { User } from './user';

export interface Auth {
  user: User;
  access_token: AccessToken;
}
