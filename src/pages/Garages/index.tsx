import { use, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BuildingOffice2Icon,
  ArrowLeftIcon,
} from '@heroicons/react/24/outline';

import Table from '../../components/Table';
import Pagination from '../../components/Pagination';
import GarageFilters from '../../components/Filters';
import GaragesCardView from '../../components/Table/CardView';

import useGarages from '../../hooks/useGarages';
import SidebarContext from '../../contexts/SidebarContext';

import type { Filters } from '../../components/Filters/types';

const GaragesPage = () => {
  const navigate = useNavigate();
  const { isCollapsed } = use(SidebarContext)!;

  const goBack = () => {
    navigate(-1);
  };

  return (
    <section
      aria-labelledby="garages-title"
      className={`w-full h-full mt-16 lg:mt-20 flex flex-col items-start justify-start gap-2 pl-22 pr-4 ${isCollapsed ? 'md:px-24' : 'md:pl-72 md:pr-16'} transition-all duration-300`}
    >
      <button
        onClick={goBack}
        className="hidden md:inline-flex gap-2 items-center text-gray-500 mb-2 py-2 px-4 text-sm border-2 border-transparent hover:border-brand rounded-sm transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand "
      >
        <ArrowLeftIcon className="w-4 h-4" />
        Voltar
      </button>
      <div className="flex gap-2 justify-start items-center">
        <BuildingOffice2Icon className="w-9 h-9 text-brand" />
        <h1 id="garages-title" className="text-3xl text-black font-bold">
          Garagens
        </h1>
      </div>
      <p className="text-gray-500 mb-4">
        Visualize as garagens habilitadas para mensalidades digitais.
      </p>

      <section className="w-full">
        <GaragesTableWrapper />
      </section>
    </section>
  );
};

const GaragesTableWrapper = () => {
  const [filters, setFilters] = useState<Filters>({
    isDigital: true,
    search: '',
  });

  const {
    garages,
    isLoading,
    error,
    deleteGarage,
    pagination: { page, pages, total, setPage },
  } = useGarages(filters);

  const handleEdit = () => {};

  const handleDelete = (id: string) => {
    deleteGarage(id);
  };

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <>
      <GarageFilters filters={filters} onChange={setFilters} />

      <div className="md:hidden">
        <GaragesCardView
          data={garages}
          isLoading={isLoading}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>

      <div className="hidden md:block">
        <Table
          data={garages}
          isLoading={isLoading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <Pagination
        page={page}
        pages={pages}
        total={total}
        onPageChange={setPage}
      />
    </>
  );
};

export default GaragesPage;
