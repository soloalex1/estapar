import { render, screen, waitFor, act, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NiceModal from '@ebay/nice-modal-react';

import ConfirmationModal from '.';

const MODAL_ID = 'confirmation-modal';

const mockOnConfirm = jest.fn();

beforeAll(() => {
  NiceModal.register(MODAL_ID, ConfirmationModal);
});

afterEach(async () => {
  await act(async () => {
    NiceModal.remove(MODAL_ID);
  });
  cleanup();
  jest.clearAllMocks();
});

const renderModal = async (
  props: Partial<{
    title: string;
    name: string;
    description: string;
    confirmLabel: string;
    cancelLabel: string;
    variant: 'danger' | 'warning' | 'info';
    onConfirm: () => void | Promise<void>;
  }> = {},
) => {
  render(<NiceModal.Provider />);

  await act(async () => {
    NiceModal.show(MODAL_ID, {
      title: 'Tem certeza?',
      name: 'Confirmar ação',
      onConfirm: mockOnConfirm,
      ...props,
    });
  });
};

describe('ConfirmationModal', () => {
  describe('Rendering', () => {
    it('should render the title correctly', async () => {
      await renderModal();

      const title = screen.getByRole('heading', { name: /tem certeza?/i });

      expect(title).toBeInTheDocument();
    });

    it('should render the description when available', async () => {
      await renderModal({ description: 'Esta ação não pode ser desfeita.' });

      const description = screen.getByText(/esta ação não pode ser desfeita/i);

      expect(description).toBeInTheDocument();
    });

    it('should render default button labels', async () => {
      await renderModal();

      const confirmButton = screen.getByRole('button', { name: /confirmar/i });
      const cancelButton = screen.getByRole('button', { name: /cancelar/i });

      expect(confirmButton).toBeInTheDocument();
      expect(cancelButton).toBeInTheDocument();
    });

    it('should render custom button labels', async () => {
      await renderModal({ confirmLabel: 'Excluir', cancelLabel: 'Voltar' });

      const deleteButton = screen.getByRole('button', { name: 'Excluir' });
      const backButton = screen.getByRole('button', { name: 'Voltar' });

      expect(deleteButton).toBeInTheDocument();
      expect(backButton).toBeInTheDocument();
    });
  });

  describe('Confirmation', () => {
    it('should call onConfirm when clicking on the confirm button', async () => {
      await renderModal();

      const confirmButton = screen.getByRole('button', { name: /confirmar/i });

      await userEvent.click(confirmButton);

      await waitFor(() => {
        expect(mockOnConfirm).toHaveBeenCalledTimes(1);
      });
    });

    it('deve fechar o modal após confirmar', async () => {
      mockOnConfirm.mockResolvedValueOnce(undefined);
      await renderModal();

      const confirmButton = screen.getByRole('button', { name: /confirmar/i });

      await userEvent.click(confirmButton);

      await waitFor(() => {
        const dialog = screen.queryByRole('dialog');
        expect(dialog).not.toBeInTheDocument();
      });
    });
  });

  describe('cancellation', () => {
    it('deve fechar o modal ao clicar em Cancelar', async () => {
      await renderModal();

      const cancelButton = screen.getByRole('button', { name: /cancelar/i });
      await userEvent.click(cancelButton);

      await waitFor(() => {
        const dialog = screen.queryByRole('dialog');
        expect(dialog).not.toBeInTheDocument();
      });
    });

    it('não deve chamar onConfirm ao cancelar', async () => {
      await renderModal();

      const cancelButton = screen.getByRole('button', { name: /cancelar/i });
      await userEvent.click(cancelButton);

      expect(mockOnConfirm).not.toHaveBeenCalled();
    });

    it('deve fechar o modal ao clicar no backdrop', async () => {
      await renderModal();

      await userEvent.click(screen.getByRole('dialog'));

      await waitFor(() => {
        const dialog = screen.queryByRole('dialog');
        expect(dialog).not.toBeInTheDocument();
      });
    });
  });
});
