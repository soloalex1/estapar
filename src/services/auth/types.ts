export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  token: string;
  password: string;
}

export type AuthUserInsert = Omit<AuthUser, 'token' | 'id'>;

export type AuthUserStored = Omit<AuthUser, 'password' | 'token'>;
