import { registerUser } from '.';

import type { UserInsert } from './types';

const mockFetch = jest.fn();
globalThis.fetch = mockFetch;

const mockUserInsert: UserInsert = {
  name: 'Ana Lima',
  email: 'ana@email.com',
  password: '123456',
};

const mockUser = {
  id: '1',
  name: 'Ana Lima',
  email: 'ana@email.com',
  role: 'user' as const,
};

beforeEach(() => {
  mockFetch.mockClear();
});

describe('Users Service', () => {
  describe('registerUser', () => {
    it('should call fetch with correct url and method', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockUser,
      });

      await registerUser(mockUserInsert);

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/register',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        }),
      );
    });

    it('should call fetch with serialized payload', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockUser,
      });

      await registerUser(mockUserInsert);

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/register',
        expect.objectContaining({
          body: JSON.stringify(mockUserInsert),
        }),
      );
    });

    it('should return the registered user', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockUser,
      });

      const result = await registerUser(mockUserInsert);

      expect(result).toEqual(mockUser);
    });

    it('should throw an error with server message when response is not ok', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({ message: 'E-mail já cadastrado.' }),
      });

      await expect(registerUser(mockUserInsert)).rejects.toThrow(
        'E-mail já cadastrado.',
      );
    });

    it('should throw a generic error when server message is not provided', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({}),
      });

      await expect(registerUser(mockUserInsert)).rejects.toThrow(
        'Erro ao cadastrar usuário.',
      );
    });
  });
});
