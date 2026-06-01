import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import GarageCard from '.';

import type { Garage } from '../../../../services/garages/types';

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

const renderGarageCard = (garage: Garage = mockGarage) => {
  return render(
    <GarageCard garage={garage} onEdit={mockOnEdit} onDelete={mockOnDelete} />,
  );
};

describe('GarageCard', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the garage info correctly', () => {
    renderGarageCard();

    const nameElement = screen.getByText('Garage 1');
    const codeElement = screen.getByText('000001');
    const addressElement = screen.getByText('Rua 1, 123');
    const cityStateElement = screen.getByText('São Paulo/SP');
    const regionalCodeElement = screen.getByText('SP1');

    expect(nameElement).toBeInTheDocument();
    expect(codeElement).toBeInTheDocument();
    expect(addressElement).toBeInTheDocument();
    expect(cityStateElement).toBeInTheDocument();
    expect(regionalCodeElement).toBeInTheDocument();
  });

  it('should render the action menu when clicking on actions button', async () => {
    renderGarageCard();

    const actionsButton = screen.getByRole('button', {
      name: /ações para garage 1/i,
    });

    await userEvent.click(actionsButton);

    const menu = await screen.findByRole('menu');

    expect(menu).toBeInTheDocument();
  });
});
