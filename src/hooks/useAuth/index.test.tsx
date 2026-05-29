import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import AuthContext, { type AuthContextValue } from '../../contexts/AuthContext';
import { useAuth } from '.';

const mockContextValue: AuthContextValue = {
  user: {
    id: '1',
    name: 'Ana Lima',
    email: 'ana@email.com',
  },
  isAuthenticated: true,
  login: jest.fn(),
  logout: jest.fn(),
};

const TestComponent = () => {
  const { user, isAuthenticated, logout } = useAuth();
  return (
    <div>
      <span data-testid="name">{user?.name}</span>
      <span data-testid="authenticated">{String(isAuthenticated)}</span>
      <button onClick={logout}>Sair</button>
    </div>
  );
};

const renderWithContext = (value: AuthContextValue) => {
  return render(
    <AuthContext value={value}>
      <TestComponent />
    </AuthContext>,
  );
};

describe('useAuth', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return the user data when the user is logged in', () => {
    renderWithContext(mockContextValue);
    expect(screen.getByTestId('name')).toHaveTextContent('Ana Lima');
  });

  it('should return isAuthenticated as true when there is a user', () => {
    renderWithContext(mockContextValue);
    expect(screen.getByTestId('authenticated')).toHaveTextContent('true');
  });

  it('should return isAuthenticated as false when there is no user', () => {
    renderWithContext({
      ...mockContextValue,
      user: null,
      isAuthenticated: false,
    });
    expect(screen.getByTestId('authenticated')).toHaveTextContent('false');
  });

  it('should call logout when clicking the logout button', async () => {
    renderWithContext(mockContextValue);
    await userEvent.click(screen.getByRole('button', { name: /sair/i }));
    expect(mockContextValue.logout).toHaveBeenCalledTimes(1);
  });

  it('should call login with the correct credentials', async () => {
    renderWithContext(mockContextValue);
    await act(async () => {
      await mockContextValue.login({
        email: 'ana@email.com',
        password: '123456',
      });
    });
    expect(mockContextValue.login).toHaveBeenCalledWith({
      email: 'ana@email.com',
      password: '123456',
    });
  });

  it('should throw an error when used outside of AuthContext', () => {
    const consoleError = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    expect(() => render(<TestComponent />)).toThrow(
      'useAuth deve ser usado dentro de AuthProvider',
    );
    consoleError.mockRestore();
  });
});
