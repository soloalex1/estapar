import { getGarageDetails, getGarages } from '.';

describe('Garages Service', () => {
  const mockFetch = jest.fn();

  const mockHeaders = {
    get: jest.fn().mockReturnValue({
      'X-Total-Count': '10',
    }),
  };

  globalThis.fetch = mockFetch;

  const defaultPageProps = {
    page: 1,
    limit: 10,
  };

  beforeEach(() => {
    mockFetch.mockClear();
  });

  describe('getGarages', () => {
    it('should fetch a list of garages', async () => {
      const mockGarages = [
        {
          id: '1',
          name: 'Garage A',
          code: 'GA123',
          address: '123 Main St',
          city: 'CityX',
          state: 'StateY',
          regionalCode: 'RC1',
          isDigital: true,
        },
        {
          id: '2',
          name: 'Garage B',
          code: 'GB456',
          address: '456 Oak Ave',
          city: 'CityZ',
          state: 'StateW',
          regionalCode: 'RC2',
          isDigital: false,
        },
      ];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockGarages,
        headers: mockHeaders,
      });

      const { data } = await getGarages(defaultPageProps);

      expect(data).toEqual(mockGarages);
    });

    it('should return an empty array if there are no garages available', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => [],
        headers: mockHeaders,
      });

      const { data } = await getGarages(defaultPageProps);

      expect(data).toEqual([]);
    });

    it('should throw an error if the API call fails', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({ message: 'Erro ao obter lista de garagens.' }),
      });

      // passing promise call directly to check for rejects
      await expect(getGarages(defaultPageProps)).rejects.toThrow(
        'Erro ao obter lista de garagens.',
      );
    });
  });

  describe('getGarageDetails', () => {
    it('should fetch details about a garage given its ID', async () => {
      const mockGarage = {
        id: '1',
        name: 'Garage A',
        code: 'GA123',
        address: '123 Main St',
        city: 'CityX',
        state: 'StateY',
        regionalCode: 'RC1',
        isDigital: true,
      };

      const mockPlans = [
        {
          garageId: '1',
          description: 'Mensalista Noturno',
          vehicleType: 'motorcycle',
          totalSpots: 67,
          value: 1463.4,
          cancellationValue: 146.34,
          validFrom: '2026-06-02',
          validUntil: '2026-08-23',
          id: '1',
        },
      ];

      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockGarage,
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockPlans,
        });

      const result = await getGarageDetails('1');

      expect(result).toEqual({ ...mockGarage, plans: mockPlans });
    });

    it('should throw an error if the garage is not found', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({ message: 'Erro ao obter detalhes da garagem.' }),
      });

      await expect(getGarageDetails('999')).rejects.toThrow(
        'Erro ao obter detalhes da garagem.',
      );
    });

    it('should throw an error if the ID is a non-numeric string', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({ message: 'Erro ao obter detalhes da garagem.' }),
      });

      await expect(getGarageDetails('invalid-id')).rejects.toThrow(
        'Erro ao obter detalhes da garagem.',
      );
    });
  });
});
