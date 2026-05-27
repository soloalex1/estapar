import type { AuthUser, AuthUserInsert, LoginPayload } from './types';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

export const loginService = async (
  payload: LoginPayload,
): Promise<AuthUser> => {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message ?? 'Erro ao fazer login.');
  }

  const { accessToken, user } = await response.json();
  const authUser: AuthUser = { ...user, token: accessToken };

  localStorage.setItem(TOKEN_KEY, accessToken);
  localStorage.setItem(USER_KEY, JSON.stringify(authUser));

  return authUser;
};

export const logoutService = (): void => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export const registerService = async (
  payload: AuthUserInsert,
): Promise<AuthUserInsert> => {
  const response = await fetch('/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const { message } = await response.json();
    throw new Error(message ?? 'Erro ao criar usuário.');
  }

  const authUser: AuthUserInsert = await response.json();

  return authUser;
};

export const getStoredUser = (): AuthUser | null => {
  const raw = localStorage.getItem(USER_KEY);
  return raw ? (JSON.parse(raw) as AuthUser) : null;
};

export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const isAuthenticated = (): boolean => {
  return !!getToken();
};
