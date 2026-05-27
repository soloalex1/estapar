import type { Garage } from './types';

const BASE_URL = '/api/garages';

export const getGarages = async (): Promise<Garage[]> => {
  const response = await fetch(BASE_URL);

  if (!response.ok) {
    throw new Error('Erro ao obter lista de garagens.');
  }

  return response.json();
};

export const getGarageById = async (id: string): Promise<Garage> => {
  const response = await fetch(`${BASE_URL}/${id}`);

  if (!response.ok) {
    throw new Error(`Erro ao obter detalhes da garagem.`);
  }

  return response.json();
};

export const createGarage = async (
  garage: Omit<Garage, 'id'>,
): Promise<Garage> => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(garage),
  });

  if (!response.ok) {
    throw new Error('Erro ao criar garagem.');
  }

  return response.json();
};

export async function deleteGarage(id: string): Promise<void> {
  const response = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Erro ao deletar garagem.');
}
