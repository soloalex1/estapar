import { loginService } from '.';

describe('AuthService', () => {
  const mockFetch = jest.fn();

  const mockUser = {
    id: '1',
    name: 'Ana Lima',
    email: 'ana@email.com',
    role: 'admin' as const,
  };
  const mockToken = 'fake-token-ana-admin';
  const mockAuthUser = { ...mockUser, token: mockToken };

  beforeEach(() => {
    globalThis.fetch = mockFetch;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should store token and user on localStorage after successful login', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ accessToken: mockToken, user: mockUser }),
      });

      const result = await loginService({
        email: 'ana@email.com',
        password: '123456',
      });

      expect(result).toEqual(mockAuthUser);
      expect(localStorage.getItem('auth_token')).toBe(mockToken);
      expect(JSON.parse(localStorage.getItem('auth_user')!)).toEqual(
        mockAuthUser,
      );
    });

    it('should throw an error when the response is not ok', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({ message: 'E-mail ou senha inválidos.' }),
      });

      await expect(
        loginService({ email: 'x@x.com', password: 'errada' }),
      ).rejects.toThrow('E-mail ou senha inválidos.');
    });
  });
});
