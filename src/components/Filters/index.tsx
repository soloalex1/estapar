import { useEffect, useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

import Input from '../Input';
import Toggle from './Toggle';

import useDebounce from '../../hooks/useDebounce';

import type { GarageFiltersProps } from './types';

const GarageFilters = ({ filters, onChange }: GarageFiltersProps) => {
  const [searchInput, setSearchInput] = useState(filters.search);
  const debouncedSearch = useDebounce(searchInput);

  const onDigitalChange = (value: boolean) => {
    onChange({ ...filters, isDigital: value });
  };

  useEffect(() => {
    if (debouncedSearch === filters.search) return;

    onChange({ ...filters, search: debouncedSearch });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      aria-labelledby="filters-title"
      className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between p-4 bg-white border border-gray-200 rounded-lg mb-4"
    >
      <span id="filters-title" className="sr-only">
        Filtros para garagens
      </span>

      <Toggle checked={filters.isDigital} onChange={onDigitalChange} />

      <div className="w-full h-fit md:w-64">
        <Input
          id="search"
          label="Buscar garagem por nome"
          placeholder="Buscar por nome ou código"
          icon={<MagnifyingGlassIcon className="h-4 w-4" />}
          isLabelHidden
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
    </form>
  );
};

export default GarageFilters;
