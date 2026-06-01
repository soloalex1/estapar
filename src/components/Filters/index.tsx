import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Input from '../Input';

const GarageFilters = () => {
  return (
    <form
      aria-labelledby="filters-title"
      className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg"
    >
      <span id="filters-title" className="sr-only">
        Filtros para garagens
      </span>

      <Input
        id="search"
        label="Buscar garagem por nome"
        placeholder="Buscar por nome ou código"
        icon={<MagnifyingGlassIcon />}
        isLabelHidden
      />
    </form>
  );
};

export default GarageFilters;
