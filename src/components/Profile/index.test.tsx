import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NiceModal from '@ebay/nice-modal-react';
import { MemoryRouter } from 'react-router-dom';

import Profile from '.';

import { useAuth } from '../../hooks/useAuth';
import { MODAL_IDS } from '../Modals';

jest.mock('../../hooks/useAuth');

jest.mock('@ebay/nice-modal-react', () => ({
  ...jest.requireActual('@ebay/nice-modal-react'),
  show: jest.fn(),
}));

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

  it('should render the user name', () => {
    render(<Profile />);

    const name = screen.getByText(/ana lima/i);

    expect(name).toBeInTheDocument();
  });

  it('should open confirmation modal when clicking the logout button', async () => {
    render(
      <MemoryRouter>
        <NiceModal.Provider>
          <Profile />
        </NiceModal.Provider>
      </MemoryRouter>,
    );

    const button = screen.getByRole('button', { name: /sair/i });
    await userEvent.click(button);

    expect(NiceModal.show).toHaveBeenCalledWith(
      MODAL_IDS.CONFIRMATION,
      expect.objectContaining({
        title: 'Deseja sair da aplicação?',
        confirmLabel: 'Sair',
        variant: 'danger',
        onConfirm: mockLogout,
      }),
    );
  });
});
