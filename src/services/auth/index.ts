import type { AuthUser, LoginPayload } from './types';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

// Simula o POST /login consultando o db.json via json-server
export const loginService = async (
  payload: LoginPayload,
): Promise<AuthUser> => {
  const response = await fetch(
    `/api/login?email=${payload.email}&password=${payload.password}`,
  );

  const results: Array<Omit<AuthUser, 'name'>> = await response.json();

  if (!results.length) {
    throw new Error('E-mail ou senha inválidos.');
  }

  const { id, token } = results[0];

  const userResponse = await fetch(`/api/users/${id}`);
  if (!userResponse.ok) throw new Error('Usuário não encontrado.');

  const user = await userResponse.json();

  const authUser: AuthUser = { ...user, token };

  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(authUser));

  return authUser;
};

export const logoutService = (): void => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
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
