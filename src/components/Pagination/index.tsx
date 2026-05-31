import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

type PaginationProps = {
  page: number;
  pages: number;
  total: number;
  onPageChange: (page: number) => void;
};

type PageButtonProps = {
  onClick: () => void;
  disabled?: boolean;
  active?: boolean;
  children: React.ReactNode;
} & React.AriaAttributes;

const getPageNumbers = (current: number, total: number): (number | '...')[] => {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  if (current <= 4) return [1, 2, 3, 4, 5, '...', total];
  if (current >= total - 3)
    return [1, '...', total - 4, total - 3, total - 2, total - 1, total];

  return [1, '...', current - 1, current, current + 1, '...', total];
};

const Pagination = ({ page, pages, total, onPageChange }: PaginationProps) => {
  const pageNumbers = getPageNumbers(page, pages);
  const from = total === 0 ? 0 : (page - 1) * 10 + 1;
  const to = Math.min(page * 10, total);

  return (
    <div className="flex flex-col gap-4 md:flex-row items-center justify-center md:justify-between px-1 py-3 mt-2">
      <p className="text-sm text-gray-500">
        Exibindo {from}-{to} de{' '}
        <span className="font-medium text-gray-700">{total}</span> garagens
      </p>

      <nav aria-label="Paginação" className="flex items-center gap-1">
        <PageButton
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          aria-label="Página anterior"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </PageButton>

        {pageNumbers.map((p, i) =>
          p === '...' ? (
            <span
              key={`ellipsis-${i}`}
              className="px-2 text-gray-400 select-none"
            >
              ...
            </span>
          ) : (
            <PageButton
              key={p}
              onClick={() => onPageChange(Number(p))}
              active={p === page}
              aria-label={`Página ${p}`}
              aria-current={p === page ? 'page' : undefined}
            >
              {p}
            </PageButton>
          ),
        )}

        <PageButton
          onClick={() => onPageChange(page + 1)}
          disabled={page === pages}
          aria-label="Próxima página"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </PageButton>
      </nav>
    </div>
  );
};

const PageButton = ({
  onClick,
  disabled,
  active,
  children,
  ...aria
}: PageButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`min-w-8 h-8 px-2 rounded text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
        active
          ? 'text-brand border border-brand  font-medium'
          : 'text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed'
      }`}
      {...aria}
    >
      {children}
    </button>
  );
};

export default Pagination;
