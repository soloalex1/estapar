import { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

import Input from '../Input';
import Toggle from '../Toggle';

import type { GarageFiltersProps } from './types';

const GarageFilters = ({ filters, onChange }: GarageFiltersProps) => {
  const [searchInput, setSearchInput] = useState(filters.search);

  const onDigitalChange = (value: boolean) => {
    onChange({ ...filters, isDigital: value });
  };

  const onSearchChange = (value: string) => {
    setSearchInput(value);
    onChange({ ...filters, search: value });
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      aria-labelledby="filters-title"
      className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between p-4 bg-white border border-gray-200 rounded-lg mb-4"
    >
      <span id="filters-title" className="sr-only">
        Filtros para garagens
      </span>

      <Toggle
        label="Mensalista Digital"
        checked={filters.isDigital}
        onChange={onDigitalChange}
      />

      <div className="w-full h-fit md:w-64">
        <Input
          id="search"
          label="Buscar garagem por nome"
          placeholder="Buscar por nome ou código"
          icon={<MagnifyingGlassIcon className="h-4 w-4" />}
          isLabelHidden
          value={searchInput}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </form>
  );
};

export default GarageFilters;
