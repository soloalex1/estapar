import { createGarage, deleteGarage, getGarageById, getGarages } from '.';

describe('Garages Service', () => {
  const mockFetch = jest.fn();

  beforeEach(() => {
    globalThis.fetch = mockFetch;
  });

  afterEach(() => {
    jest.clearAllMocks();
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
      });

      const result = await getGarages();

      expect(result).toEqual(mockGarages);
    });

    it('should return an empty array if there are no garages available', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      });

      const result = await getGarages();

      expect(result).toEqual([]);
    });

    it('should throw an error if the API call fails', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({ message: 'Erro ao obter lista de garagens.' }),
      });

      // passing promise call directly to check for rejects
      await expect(getGarages()).rejects.toThrow(
        'Erro ao obter lista de garagens.',
      );
    });
  });

  describe('getGarageById', () => {
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

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockGarage,
      });

      const result = await getGarageById('1');

      expect(result).toEqual(mockGarage);
    });

    it('should throw an error if the garage is not found', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({ message: 'Erro ao obter detalhes da garagem.' }),
      });

      await expect(getGarageById('999')).rejects.toThrow(
        'Erro ao obter detalhes da garagem.',
      );
    });

    it('should throw an error if the ID is a non-numeric string', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({ message: 'Erro ao obter detalhes da garagem.' }),
      });

      await expect(getGarageById('invalid-id')).rejects.toThrow(
        'Erro ao obter detalhes da garagem.',
      );
    });
  });

  describe('createGarage', () => {
    it('should create a new garage and return its details', async () => {
      const newGarage = {
        name: 'Garage C',
        code: 'GC789',
        address: '789 Pine Rd',
        city: 'CityY',
        state: 'StateZ',
        regionalCode: 'RC3',
        isDigital: false,
      };

      const createdGarage = { id: '3', ...newGarage };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => createdGarage,
      });

      const result = await createGarage(newGarage);

      expect(result).toEqual(createdGarage);
    });

    it('should throw an error if the API call fails', async () => {
      const newGarage = {
        name: 'Garage C',
        code: 'GC789',
        address: '789 Pine Rd',
        city: 'CityY',
        state: 'StateZ',
        regionalCode: 'RC3',
        isDigital: false,
      };

      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({ message: 'Erro ao criar garagem.' }),
      });

      await expect(createGarage(newGarage)).rejects.toThrow(
        'Erro ao criar garagem.',
      );
    });
  });

  describe('deleteGarage', () => {
    it('should delete a garage given its ID', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
      });

      await deleteGarage('1');
      expect(mockFetch).toHaveBeenCalledWith('/api/garages/1', {
        method: 'DELETE',
      });
    });

    it('should throw an error if the garage cannot be deleted', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
      });

      await expect(deleteGarage('1')).rejects.toThrow(
        'Erro ao deletar garagem.',
      );
    });
  });
});
