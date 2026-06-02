import { createPlan, updatePlan } from '.';
import type { Plan, PlanInsert } from './types';

const mockFetch = jest.fn();
globalThis.fetch = mockFetch;

const mockPlanInsert: PlanInsert = {
  garageId: '1',
  description: 'Mensalista Noturno',
  status: 'active',
  vehicleType: 'car',
  totalSpots: 10,
  value: 1000,
  cancellationValue: 100,
  validFrom: '2026-01-01',
  validUntil: '2026-12-31',
};

const mockPlan: Plan = {
  id: '1',
  occupiedSpots: 0,
  availableSpots: 10,
  ...mockPlanInsert,
};

beforeEach(() => {
  mockFetch.mockClear();
});

describe('Plans Service', () => {
  describe('createPlan', () => {
    it('should return the created plan', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockPlan,
      });

      const result = await createPlan(mockPlanInsert);

      expect(result).toEqual(mockPlan);
    });

    it('should throw an error when response is not ok', async () => {
      mockFetch.mockResolvedValueOnce({ ok: false });

      await expect(createPlan(mockPlanInsert)).rejects.toThrow(
        'Erro ao criar plano.',
      );
    });
  });

  describe('updatePlan', () => {
    it('should return the updated plan', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockPlan,
      });

      const result = await updatePlan('1', mockPlanInsert);

      expect(result).toEqual(mockPlan);
    });

    it('should throw an error when response is not ok', async () => {
      mockFetch.mockResolvedValueOnce({ ok: false });

      await expect(updatePlan('1', mockPlanInsert)).rejects.toThrow(
        'Erro ao atualizar plano.',
      );
    });
  });
});
