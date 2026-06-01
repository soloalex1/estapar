import { screen, render } from '@testing-library/react';

import CardView from '.';

describe('CardView', () => {
  const mockGarages = [
    {
      id: '1',
      name: 'Garage A',
      code: 'GA123',
      address: '123 Main St',
      city: 'CityX',
      state: 'StateY',
      regionalCode: 'RC1',
      isDigital: true,
    },
    {
      id: '2',
      name: 'Garage B',
      code: 'GB456',
      address: '456 Oak Ave',
      city: 'CityZ',
      state: 'StateW',
      regionalCode: 'RC2',
      isDigital: false,
    },
  ];

  it('should render a list of garage cards', () => {
    render(
      <CardView
        isLoading={false}
        data={mockGarages}
        onEdit={jest.fn()}
        onDelete={jest.fn()}
      />,
    );

    const garageCards = screen.getAllByRole('article');
    expect(garageCards).toHaveLength(mockGarages.length);
  });

  it('should render loading state', () => {
    render(
      <CardView isLoading data={[]} onEdit={jest.fn()} onDelete={jest.fn()} />,
    );

    const loadingText = screen.getByText(/carregando.../i);
    expect(loadingText).toBeInTheDocument();
  });

  it('should render empty state', () => {
    render(
      <CardView
        isLoading={false}
        data={[]}
        onEdit={jest.fn()}
        onDelete={jest.fn()}
      />,
    );

    const emptyText = screen.getByText(/nenhuma garagem encontrada/i);
    expect(emptyText).toBeInTheDocument();
  });
});
