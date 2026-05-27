import type { User } from './types';

const BASE_URL = '/api/users';

export const getUsers = async (): Promise<User[]> => {
  const response = await fetch(BASE_URL);

  if (!response.ok) {
    throw new Error('Erro ao obter lista de usuários.');
  }

  return response.json();
};

export const getUserById = async (id: string): Promise<User> => {
  const response = await fetch(`${BASE_URL}/${id}`);

  if (!response.ok) {
    throw new Error(`Erro ao obter detalhes do usuário.`);
  }

  return response.json();
};

export const createUser = async (user: Omit<User, 'id'>): Promise<User> => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error('Erro ao criar usuário.');
  }

  return response.json();
};

export async function deleteUser(id: string): Promise<void> {
  const response = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Erro ao deletar usuário.');
}
