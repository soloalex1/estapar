import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Pagination from '.';

const onPageChange = jest.fn();

describe('Pagination component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the component with correct info', () => {
    render(
      <Pagination
        onPageChange={onPageChange}
        page={1}
        pages={10}
        total={100}
      />,
    );

    const text = screen.getByText(/exibindo 1-10/i);
    const currentButton = screen.getByRole('button', { name: /página 1$/i });
    const prevButton = screen.getByRole('button', { name: /página anterior/i });
    const nextButton = screen.getByRole('button', {
      name: /próxima página/i,
    });

    expect(text).toBeInTheDocument();
    expect(currentButton).toBeInTheDocument();
    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  });

  it('should disable previous page button when on the first page', () => {
    render(
      <Pagination
        onPageChange={onPageChange}
        page={1}
        pages={10}
        total={100}
      />,
    );

    const prevButton = screen.getByRole('button', {
      name: /página anterior/i,
    });
    const nextButton = screen.getByRole('button', {
      name: /próxima página/i,
    });

    expect(prevButton).toBeDisabled();
    expect(nextButton).toBeEnabled();
  });

  it('should disable next page button when on the last page', () => {
    render(
      <Pagination
        onPageChange={onPageChange}
        page={10}
        pages={10}
        total={100}
      />,
    );

    const prevButton = screen.getByRole('button', {
      name: /página anterior/i,
    });
    const nextButton = screen.getByRole('button', {
      name: /próxima página/i,
    });

    expect(prevButton).toBeEnabled();
    expect(nextButton).toBeDisabled();
  });

  it('given a small quantity of pages, should render all their numbers', () => {
    const pages = 5;

    render(
      <Pagination
        onPageChange={onPageChange}
        page={1}
        pages={pages}
        total={50}
      />,
    );

    const pagesArray = new Array(pages);

    pagesArray.map((page) => {
      const currentButton = screen.getByRole('button', {
        name: `Página ${page}`,
      });
      expect(currentButton).toBeInTheDocument();
      expect(currentButton).toBeEnabled();
    });
  });

  describe('onPageChange', () => {
    const defaultProps = {
      page: 3, // to enable both back and prev buttons
      pages: 5,
      total: 50,
      onPageChange: jest.fn(),
    };

    it('should call the function when clicking on the previous page button', async () => {
      render(<Pagination {...defaultProps} />);

      const prevButton = screen.getByRole('button', {
        name: /página anterior/i,
      });

      await userEvent.click(prevButton);

      expect(defaultProps.onPageChange).toHaveBeenCalledWith(2);
    });

    it('should call the function when clicking on the next page button', async () => {
      render(<Pagination {...defaultProps} />);

      const nextButton = screen.getByRole('button', {
        name: /próxima página/i,
      });

      await userEvent.click(nextButton);

      expect(defaultProps.onPageChange).toHaveBeenCalledWith(4);
    });

    it('should call the function with the correct value when clicking on a number', async () => {
      render(<Pagination {...defaultProps} />);

      const pageOneButton = screen.getByRole('button', { name: /página 1/i });

      await userEvent.click(pageOneButton);

      expect(defaultProps.onPageChange).toHaveBeenCalledWith(1);
    });

    it('should not call onPageChange when clicking on previous in the first page', async () => {
      render(<Pagination {...defaultProps} page={1} />);

      const prevButton = screen.getByRole('button', {
        name: /página anterior/i,
      });

      await userEvent.click(prevButton);

      expect(defaultProps.onPageChange).not.toHaveBeenCalled();
    });

    it('should not call onPageChange when clicking on next in the last page', async () => {
      render(<Pagination {...defaultProps} page={5} />);

      const nextButton = screen.getByRole('button', {
        name: /próxima página/i,
      });

      await userEvent.click(nextButton);

      expect(defaultProps.onPageChange).not.toHaveBeenCalled();
    });

    it('should only call the function once per click', async () => {
      render(<Pagination {...defaultProps} />);

      const nextButton = screen.getByRole('button', {
        name: /próxima página/i,
      });

      await userEvent.click(nextButton);

      expect(defaultProps.onPageChange).toHaveBeenCalledTimes(1);
    });
  });

  describe('Ellipsis variants', () => {
    it("should render a single ellipsis if it's on the first page", () => {
      render(
        <Pagination
          onPageChange={onPageChange}
          page={1}
          pages={20}
          total={200}
        />,
      );

      const ellipsisTextArray = screen.getAllByText('...');
      expect(ellipsisTextArray).toHaveLength(1);
    });

    it("should render a single ellipsis if it's on the last page", () => {
      render(
        <Pagination
          onPageChange={onPageChange}
          page={20}
          pages={20}
          total={200}
        />,
      );

      const ellipsisTextArray = screen.getAllByText('...');
      expect(ellipsisTextArray).toHaveLength(1);
    });

    it('should render two ellipses on any page for intermediate pages of large lists', () => {
      render(
        <Pagination
          onPageChange={onPageChange}
          page={10}
          pages={20}
          total={200}
        />,
      );

      const ellipsisTextArray = screen.getAllByText('...');
      expect(ellipsisTextArray).toHaveLength(2);
    });
  });
});
