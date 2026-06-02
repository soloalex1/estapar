import { render, screen, waitFor, act, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NiceModal from '@ebay/nice-modal-react';

import PlansModal from '.';

import { createPlan, updatePlan } from '../../../services/plans';
import type { Plan } from '../../../services/plans/types';

jest.mock('../../../services/plans');
jest.mock('focus-trap-react', () => ({
  FocusTrap: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

const mockCreatePlan = createPlan as jest.MockedFunction<typeof createPlan>;
const mockUpdatePlan = updatePlan as jest.MockedFunction<typeof updatePlan>;

const mockPlan: Plan = {
  id: '1',
  garageId: '1',
  description: 'Mensalista Noturno',
  status: 'active',
  vehicleType: 'car',
  totalSpots: 10,
  occupiedSpots: 5,
  availableSpots: 5,
  value: 1000,
  cancellationValue: 100,
  validFrom: '2026-01-01',
  validUntil: '2026-12-31',
};

const mockOnSuccess = jest.fn();
const MODAL_ID = 'plan-modal';

let container: HTMLDivElement;

beforeAll(() => {
  NiceModal.register(MODAL_ID, PlansModal);
});

beforeEach(() => {
  mockCreatePlan.mockResolvedValue(mockPlan);
  mockUpdatePlan.mockResolvedValue(mockPlan);
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(async () => {
  await act(async () => {
    NiceModal.remove(MODAL_ID);
  });
  cleanup();
  jest.clearAllMocks();
  jest.resetModules();
});

const renderModal = async (props: { plan?: Plan; garageId?: string } = {}) => {
  render(<NiceModal.Provider />, { container });

  await act(async () => {
    NiceModal.show(MODAL_ID, {
      garageId: '1',
      onSuccess: mockOnSuccess,
      ...props,
    });
  });
};

describe('PlansModal', () => {
  describe('Basic rendering', () => {
    it("should render the new plan title when there's no plan", async () => {
      await renderModal();

      const newPlan = screen.getByRole('heading', { name: /novo plano/i });

      expect(newPlan).toBeInTheDocument();
    });

    it("should render the edit plan title when there's a plan", async () => {
      await renderModal({ plan: mockPlan });

      const editPlan = screen.getByRole('heading', { name: /editar plano/i });

      expect(editPlan).toBeInTheDocument();
    });

    it('should render all form fields', async () => {
      await renderModal();

      const descriptionField = screen.getByLabelText(/descrição/i);
      expect(descriptionField).toBeInTheDocument();

      const vehicleType = screen.getByLabelText(/tipo de veículo/i);
      expect(vehicleType).toBeInTheDocument();

      const totalSpots = screen.getByLabelText(/total de vagas/i);
      expect(totalSpots).toBeInTheDocument();

      const amount = screen.getByLabelText(/valor \(r\$\)/i);
      expect(amount).toBeInTheDocument();

      const cancelFee = screen.getByLabelText(/valor do cancelamento/i);
      expect(cancelFee).toBeInTheDocument();

      const validFrom = screen.getByLabelText(/início da validade/i);
      expect(validFrom).toBeInTheDocument();

      const validUntil = screen.getByLabelText(/fim da validade/i);
      expect(validUntil).toBeInTheDocument();
    });

    it('should fill the fields when editing', async () => {
      await renderModal({ plan: mockPlan });

      const descriptionField = screen.getByLabelText(/descrição/i);
      const totalSpots = screen.getByLabelText(/total de vagas/i);
      const amount = screen.getByLabelText(/valor \(r\$\)/i);
      const cancelFee = screen.getByLabelText(/valor do cancelamento/i);

      expect(descriptionField).toHaveValue('Mensalista Noturno');
      expect(totalSpots).toHaveValue(10);
      expect(amount).toHaveValue(1000);
      expect(cancelFee).toHaveValue(100);
    });

    it('should render Create button when creating', async () => {
      await renderModal();

      const createButton = screen.getByRole('button', { name: /criar/i });

      expect(createButton).toBeInTheDocument();
    });

    it('should render Save button when editing', async () => {
      await renderModal({ plan: mockPlan });

      const saveButton = screen.getByRole('button', {
        name: /salvar alterações/i,
      });

      expect(saveButton).toBeInTheDocument();
    });
  });

  describe('Create Modal', () => {
    it('should call createPlan on creating new plan', async () => {
      await renderModal();

      const descriptionField = screen.getByLabelText(/descrição/i);

      await userEvent.clear(descriptionField);
      await userEvent.type(descriptionField, 'Novo Plano Teste');

      const createButton = screen.getByRole('button', { name: /criar/i });

      await userEvent.click(createButton);

      await waitFor(() => {
        expect(mockCreatePlan).toHaveBeenCalledTimes(1);
      });
    });

    it('should call onSuccess after successfully creating', async () => {
      await renderModal();

      const descriptionField = screen.getByLabelText(/descrição/i);
      await userEvent.type(descriptionField, 'Novo Plano');

      const createButton = screen.getByRole('button', { name: /criar/i });

      await userEvent.click(createButton);

      await waitFor(() => {
        expect(mockOnSuccess).toHaveBeenCalledTimes(1);
      });
    });

    it('should not call updatePlan on creation', async () => {
      await renderModal();
      const createButton = screen.getByRole('button', { name: /criar/i });

      await userEvent.click(createButton);

      await waitFor(() => {
        expect(mockUpdatePlan).not.toHaveBeenCalled();
      });
    });
  });

  describe('Edit Modal', () => {
    it('should call updatePlan with correct id', async () => {
      await renderModal({ plan: mockPlan });

      const saveButton = screen.getByRole('button', {
        name: /salvar alterações/i,
      });

      await userEvent.click(saveButton);

      await waitFor(() => {
        expect(mockUpdatePlan).toHaveBeenCalledWith(
          mockPlan.id,
          expect.objectContaining({ garageId: '1' }),
        );
      });
    });

    it('should call onSuccess after editing successfully', async () => {
      await renderModal({ plan: mockPlan });

      const saveButton = screen.getByRole('button', {
        name: /salvar alterações/i,
      });

      await userEvent.click(saveButton);

      await waitFor(() => {
        expect(mockOnSuccess).toHaveBeenCalledTimes(1);
      });
    });

    it('não deve chamar createPlan ao editar', async () => {
      await renderModal({ plan: mockPlan });

      const saveButton = screen.getByRole('button', {
        name: /salvar alterações/i,
      });

      await userEvent.click(saveButton);

      await waitFor(() => {
        expect(mockCreatePlan).not.toHaveBeenCalled();
      });
    });
  });

  describe('Error handling', () => {
    it('should show an error message when creation fails', async () => {
      mockCreatePlan.mockRejectedValueOnce(new Error('Erro ao criar plano.'));

      await renderModal();

      const descriptionField = screen.getByLabelText(/descrição/i);

      await userEvent.clear(descriptionField);
      await userEvent.type(descriptionField, 'Novo Plano Teste');

      const createButton = screen.getByRole('button', { name: /criar/i });
      await userEvent.click(createButton);

      await waitFor(() => {
        const errorText = screen.getByText(/erro ao criar plano/i);

        expect(errorText).toBeInTheDocument();
      });
    });

    it('should show an error message when update fails', async () => {
      mockUpdatePlan.mockRejectedValueOnce(
        new Error('Erro ao atualizar plano.'),
      );
      await renderModal({ plan: mockPlan });

      const editButton = screen.getByRole('button', {
        name: /salvar alterações/i,
      });

      await userEvent.click(editButton);

      await waitFor(() => {
        const errorText = screen.getByText(/erro ao atualizar plano/i);
        expect(errorText).toBeInTheDocument();
      });
    });

    it('should not call onSuccess when there is an error', async () => {
      mockCreatePlan.mockRejectedValueOnce(new Error('Erro ao criar plano.'));
      await renderModal();

      const createButton = screen.getByRole('button', { name: /criar/i });
      await userEvent.click(createButton);

      await waitFor(() => {
        expect(mockOnSuccess).not.toHaveBeenCalled();
      });
    });
  });

  describe('Closing', () => {
    it('should close modal when clicking on Cancel', async () => {
      await renderModal();

      const cancelButton = screen.getByRole('button', { name: /cancelar/i });

      await userEvent.click(cancelButton);

      await waitFor(() => {
        const newPlan = screen.queryByText(/novo plano/i);
        expect(newPlan).not.toBeInTheDocument();
      });
    });

    it('should close modal when clicking on close button', async () => {
      await renderModal();

      const closeButton = screen.getByRole('button', { name: /fechar modal/i });

      await userEvent.click(closeButton);

      await waitFor(() => {
        const newPlan = screen.queryByText(/novo plano/i);
        expect(newPlan).not.toBeInTheDocument();
      });
    });
  });
});
