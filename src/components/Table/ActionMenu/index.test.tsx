import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ActionMenu from '.';

import type { Garage } from '../../../services/garages/types';

const mockGarage: Garage = {
  id: '1',
  name: 'Garage 1',
  code: '000001',
  address: 'Rua 1, 123',
  city: 'São Paulo',
  state: 'SP',
  regionalCode: 'SP1',
  isDigital: true,
};

const mockOnEdit = jest.fn();
const mockOnDelete = jest.fn();

const renderActionMenu = () => {
  return render(
    <ActionMenu
      garage={mockGarage}
      onEdit={mockOnEdit}
      onDelete={mockOnDelete}
    />,
  );
};

describe('ActionMenu', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Toggle button and focus', () => {
    it('should render the toggle button', () => {
      renderActionMenu();

      const actionsButton = screen.getByRole('button', {
        name: /^ações para garage 1$/i,
      });

      expect(actionsButton).toBeInTheDocument();
    });

    it('should start with the menu closed by default', () => {
      renderActionMenu();

      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });

    it('should open the menu when clicked', async () => {
      renderActionMenu();

      const actionsButton = screen.getByRole('button', {
        name: /^ações para garage 1$/i,
      });

      await userEvent.click(actionsButton);

      const menu = await screen.findByRole('menu');

      expect(menu).toBeInTheDocument();
    });

    it('should close the menu when clicked again', async () => {
      renderActionMenu();

      const actionsButton = screen.getByRole('button', {
        name: /^ações para garage 1$/i,
      });

      await userEvent.click(actionsButton);

      const menu = await screen.findByRole('menu');
      expect(menu).toBeInTheDocument();

      await userEvent.click(actionsButton);
      expect(menu).not.toBeInTheDocument();
    });

    it('should update aria-expanded when opening the menu', async () => {
      renderActionMenu();

      const actionsButton = screen.getByRole('button', {
        name: /^ações para garage 1$/i,
      });

      expect(actionsButton).toHaveAttribute('aria-expanded', 'false');

      await userEvent.click(actionsButton);

      expect(actionsButton).toHaveAttribute('aria-expanded', 'true');
    });

    it('should close the menu when clicking outside', async () => {
      renderActionMenu();

      const actionsButton = screen.getByRole('button', {
        name: /^ações para garage 1$/i,
      });

      await userEvent.click(actionsButton);

      const menu = screen.queryByRole('menu');

      expect(menu).toBeInTheDocument();

      await userEvent.click(document.body);

      expect(menu).not.toBeInTheDocument();
    });

    it('should not close the menu when clicking inside it', async () => {
      renderActionMenu();

      const actionsButton = screen.getByRole('button', {
        name: /^ações para garage 1$/i,
      });
      await userEvent.click(actionsButton);

      const menu = await screen.findByRole('menu');
      await userEvent.click(menu);

      expect(menu).toBeInTheDocument();
    });
  });

  describe('Actions', () => {
    beforeEach(async () => {
      renderActionMenu();

      const actionsButton = screen.getByRole('button', {
        name: /^ações para garage 1$/i,
      });

      await userEvent.click(actionsButton);
    });

    it('should render the menu itens when opened', () => {
      const editOption = screen.getByRole('menuitem', { name: /editar/i });
      const deleteOption = screen.getByRole('menuitem', { name: /excluir/i });

      expect(editOption).toBeInTheDocument();
      expect(deleteOption).toBeInTheDocument();
    });

    it('should call onEdit with the correct garage when clicking edit', async () => {
      const editOption = screen.getByRole('menuitem', { name: /editar/i });

      await userEvent.click(editOption);

      expect(mockOnEdit).toHaveBeenCalledWith(mockGarage);
      expect(mockOnEdit).toHaveBeenCalledTimes(1);
    });

    it('should call onDelete with the correct garage when clicking delete', async () => {
      const deleteOption = screen.getByRole('menuitem', { name: /excluir/i });

      await userEvent.click(deleteOption);

      expect(mockOnDelete).toHaveBeenCalledWith(mockGarage.id);
      expect(mockOnDelete).toHaveBeenCalledTimes(1);
    });

    it('should close the menu when clicking edit', async () => {
      const editOption = screen.getByRole('menuitem', { name: /editar/i });

      await userEvent.click(editOption);

      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });

    it('should close the menu when clicking delete', async () => {
      const deleteOption = screen.getByRole('menuitem', { name: /excluir/i });

      await userEvent.click(deleteOption);

      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });
  });
});
