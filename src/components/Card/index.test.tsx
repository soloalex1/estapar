import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import Card from '.';

describe('Card component', () => {
  it('renders the component and its children correctly', () => {
    render(
      <MemoryRouter>
        <Card to="/test">Test Content</Card>
      </MemoryRouter>,
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('has the correct href attribute', () => {
    render(
      <MemoryRouter>
        <Card to="/test">Test Content</Card>
      </MemoryRouter>,
    );
    expect(screen.getByRole('link')).toHaveAttribute('href', '/test');
  });

  it('displays the correct focus indicator when the card is focused', async () => {
    render(
      <MemoryRouter>
        <Card to="/test">First card</Card>
        <Card to="/test2">Second card</Card>
      </MemoryRouter>,
    );

    const firstCardLink = screen.getByText('First card').closest('a');
    const secondCardLink = screen.getByText('Second card').closest('a');

    expect(firstCardLink).toBeInTheDocument();
    expect(secondCardLink).toBeInTheDocument();

    userEvent.tab();

    await waitFor(() => {
      expect(firstCardLink).toHaveFocus();
      expect(secondCardLink).not.toHaveFocus();
    });

    userEvent.tab();

    await waitFor(() => {
      expect(secondCardLink).toHaveFocus();
      expect(firstCardLink).not.toHaveFocus();
    });
  });
});
