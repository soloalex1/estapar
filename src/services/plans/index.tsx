import type { Plan, PlanInsert } from './types';

const BASE_URL = '/api/plans';

export const createPlan = async (payload: PlanInsert): Promise<Plan> => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error('Erro ao criar plano.');
  }

  return response.json();
};

export const updatePlan = async (
  id: string,
  payload: PlanInsert,
): Promise<Plan> => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Erro ao atualizar plano.');
  }

  return response.json();
};
