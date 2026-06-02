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

const mockOnOpenDetails = jest.fn();

const renderGarageCard = (garage: Garage = mockGarage) => {
  return render(
    <GarageCard garage={garage} onOpenDetails={mockOnOpenDetails} />,
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

  it('should open the details sidesheet when clicking on actions button', async () => {
    renderGarageCard();

    const detailsButton = screen.getByRole('button', {
      name: /detalhes/i,
    });

    await userEvent.click(detailsButton);

    expect(mockOnOpenDetails).toHaveBeenCalledWith(mockGarage.id);
  });
});
