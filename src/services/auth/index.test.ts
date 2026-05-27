import {
  loginService,
  logoutService,
  registerService,
  getStoredUser,
  getToken,
  isAuthenticated,
} from '.';

describe('AuthService', () => {
  const mockFetch = jest.fn();

  const mockToken = 'fake-token-ana-admin';
  const mockUser = {
    id: '1',
    name: 'Ana Lima',
    email: 'ana@email.com',
  };
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

    it('should throw a generic error message when login fails without a message', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({}),
      });

      const result = loginService({ email: 'x@x.com', password: 'errada' });

      await expect(result).rejects.toThrow('Erro ao fazer login.');
    });
  });

  describe('logout', () => {
    it('should remove token and user from localStorage', () => {
      localStorage.setItem('auth_token', mockToken);
      localStorage.setItem('auth_user', JSON.stringify(mockAuthUser));

      logoutService();

      expect(localStorage.getItem('auth_token')).toBeNull();
      expect(localStorage.getItem('auth_user')).toBeNull();
    });
  });

  describe('register', () => {
    it('should return auth user without token on successful registration', async () => {
      const mockInsertReturn = { ...mockAuthUser, token: undefined };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockInsertReturn,
      });

      const result = await registerService({
        name: 'Ana Lima',
        email: 'ana@email.com',
        password: '123456',
      });

      expect(result).toEqual({ ...mockAuthUser, token: undefined });
    });

    it('should throw an error when the email is already registered', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({ message: 'E-mail já cadastrado.' }),
      });

      const result = registerService({
        name: 'Ana Lima',
        email: 'ana@email.com',
        password: '123456',
      });

      await expect(result).rejects.toThrow('E-mail já cadastrado.');
    });

    it('should throw a generic error message when registration fails without a message', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({}),
      });

      const result = registerService({
        name: 'Ana Lima',
        email: 'ana@email.com',
        password: '123456',
      });

      await expect(result).rejects.toThrow('Erro ao criar usuário.');
    });
  });

  describe('getStoredUser', () => {
    it('should return the stored user from localStorage', () => {
      localStorage.setItem('auth_user', JSON.stringify(mockAuthUser));

      const result = getStoredUser();

      expect(result).toEqual(mockAuthUser);
    });

    it('should return null if no user is stored in localStorage', () => {
      localStorage.removeItem('auth_user');

      const result = getStoredUser();

      expect(result).toBeNull();
    });
  });

  describe('getToken', () => {
    it('should return the stored token from localStorage', () => {
      localStorage.setItem('auth_token', mockToken);

      const result = getToken();

      expect(result).toBe(mockToken);
    });

    it('should return null if no token is stored in localStorage', () => {
      localStorage.removeItem('auth_token');

      const result = getToken();

      expect(result).toBeNull();
    });
  });

  describe('isAuthenticated', () => {
    it('should return true if a token is stored in localStorage', () => {
      localStorage.setItem('auth_token', mockToken);

      const result = isAuthenticated();
      expect(result).toBe(true);
    });

    it('should return false if no token is stored in localStorage', () => {
      localStorage.removeItem('auth_token');

      const result = isAuthenticated();
      expect(result).toBe(false);
    });
  });
});
