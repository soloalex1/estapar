import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Profile from '.';
import { useAuth } from '../../hooks/useAuth';

jest.mock('../../hooks/useAuth');

const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

describe('Profile', () => {
  const mockLogout = jest.fn();

  beforeEach(() => {
    mockUseAuth.mockReturnValue({
      user: {
        id: '1',
        name: 'Ana Lima',
        email: 'ana@email.com',
      },
      isAuthenticated: true,
      login: jest.fn(),
      logout: mockLogout,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Desktop View', () => {
    it('should render the user name', () => {
      render(<Profile />);

      const name = screen.getByText(/ana lima/i);

      expect(name).toBeInTheDocument();
    });

    it('should call logout when clicking the logout button', async () => {
      render(<Profile />);

      const button = screen.getByRole('button', { name: /sair/i });
      await userEvent.click(button);

      expect(mockLogout).toHaveBeenCalledTimes(1);
    });
  });
});
