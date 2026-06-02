import type { User, UserInsert } from './types';

const BASE_URL = '/api/register';

export const registerUser = async (payload: UserInsert): Promise<User> => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const { message } = await response.json();
    throw new Error(message ?? 'Erro ao cadastrar usuário.');
  }

  return response.json();
};
