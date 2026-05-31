import type { Garage, GarageInsert } from './types';

const BASE_URL = '/api/garages';

interface GaragesParams {
  page: number;
  limit: number;
}

export interface GaragesPaginatedResponse {
  data: Garage[];
  total: number;
  pages: number;
}

export const getGarages = async ({
  page,
  limit,
}: GaragesParams): Promise<GaragesPaginatedResponse> => {
  const params = new URLSearchParams({
    _page: String(page),
    _limit: String(limit),
  });

  const response = await fetch(`${BASE_URL}?${params}`);

  if (!response.ok) {
    throw new Error('Erro ao obter lista de garagens.');
  }

  const data: Garage[] = await response.json();
  const total = Number(response.headers.get('X-Total-Count'));
  const pages = Math.ceil(total / limit);

  return { data, total, pages };
};

export const getGarageById = async (id: string): Promise<Garage> => {
  const response = await fetch(`${BASE_URL}/${id}`);

  if (!response.ok) {
    throw new Error(`Erro ao obter detalhes da garagem.`);
  }

  return response.json();
};

export const createGarage = async (garage: GarageInsert): Promise<Garage> => {
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
