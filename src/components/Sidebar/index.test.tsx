import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Sidebar from '.';
import userEvent from '@testing-library/user-event';

describe('Sidebar component', () => {
  it('renders the component and its children correctly', () => {
    render(
      <MemoryRouter>
        <Sidebar collapsed={false} />
      </MemoryRouter>,
    );

    const garagesLink = screen.getByText(/garagens/i);
    const mensalistsLink = screen.getByText(/mensalistas/i);

    const sidebarButton = screen.getByRole('button', {
      name: /colapsar menu/i,
    });

    expect(garagesLink).toBeInTheDocument();
    expect(mensalistsLink).toBeInTheDocument();
    expect(sidebarButton).toBeInTheDocument();
  });

  it('renders the collapsed state correctly', () => {
    render(
      <MemoryRouter>
        <Sidebar collapsed />
      </MemoryRouter>,
    );

    const linksList = screen.getByRole('list');
    const garagesLabel = screen.queryByText(/garagens/i);
    const mensalistsLabel = screen.queryByText(/mensalists/i);
    const sidebarButtonExpand = screen.getByRole('button', {
      name: /expandir menu/i,
    });

    const sidebarButtonCollapse = screen.queryByRole('button', {
      name: /colapsar menu/i,
    });

    expect(linksList).toBeInTheDocument();

    expect(garagesLabel).not.toBeInTheDocument();
    expect(mensalistsLabel).not.toBeInTheDocument();

    expect(sidebarButtonExpand).toBeInTheDocument();
    expect(sidebarButtonCollapse).toBeNull();
  });

  it('should call onToggle when clickin on collapse/expand button', async () => {
    const onToggle = jest.fn();

    render(
      <MemoryRouter>
        <Sidebar collapsed onToggle={onToggle} />
      </MemoryRouter>,
    );

    const sidebarButtonExpand = screen.getByRole('button', {
      name: /expandir menu/i,
    });

    userEvent.click(sidebarButtonExpand);

    await waitFor(() => {
      expect(onToggle).toHaveBeenCalled();
    });
  });
});
