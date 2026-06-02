import type { Garage, GarageDetails, GarageInsert } from './types';
import type { Plan } from '../plans/types';

const BASE_URL = '/api/garages';

interface GaragesParams {
  page: number;
  limit: number;
  isDigital?: boolean;
  search?: string;
}

export interface GaragesPaginatedResponse {
  data: Garage[];
  total: number;
  pages: number;
}

export const getGarages = async ({
  page,
  limit,
  isDigital,
  search,
}: GaragesParams): Promise<GaragesPaginatedResponse> => {
  const params = new URLSearchParams({
    _page: String(page),
    _limit: String(limit),
  });

  if (isDigital !== undefined) {
    params.set('isDigital', String(isDigital));
  }

  if (search) {
    params.set('name_like', search);
  }

  const response = await fetch(`${BASE_URL}?${params}`);

  if (!response.ok) {
    throw new Error('Erro ao obter lista de garagens.');
  }

  const data: Garage[] = await response.json();
  const total = Number(response.headers.get('X-Total-Count'));
  const pages = Math.ceil(total / limit);

  return { data, total, pages };
};

export const getGarageDetails = async (id: string): Promise<GarageDetails> => {
  const [garageResponse, plansResponse] = await Promise.all([
    fetch(`${BASE_URL}/${id}`),
    fetch(`/api/plans?garageId=${id}`),
  ]);

  if (!garageResponse.ok) {
    throw new Error('Erro ao obter detalhes da garagem.');
  }

  if (!plansResponse.ok) {
    throw new Error('Erro ao obter planos da garagem.');
  }

  const garage = await garageResponse.json();
  const plans: Plan[] = await plansResponse.json();

  return { ...garage, plans };
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

export const deleteGarage = async (id: string): Promise<void> => {
  const response = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Erro ao deletar garagem.');
};
