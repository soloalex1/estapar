import { use } from 'react';
import { BuildingOffice2Icon } from '@heroicons/react/24/outline';

import Table from '../../components/Table';

import useGarages from '../../hooks/useGarages';
import SidebarContext from '../../contexts/SidebarContext';

const GaragesPage = () => {
  const { isCollapsed } = use(SidebarContext)!;

  return (
    <section
      aria-labelledby="garages-title"
      className={`w-full h-full mt-16 lg:mt-20 flex flex-col items-start justify-start gap-2 pl-22 pr-4 ${isCollapsed ? 'md:px-24' : 'md:pl-72 md:pr-16'} transition-all duration-300`}
    >
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
  const { garages, loading, error, deleteGarage } = useGarages();

  const handleEdit = () => {};

  const handleDelete = (id: string) => {
    deleteGarage(id);
  };

  if (loading) {
    return <p className="text-gray-400">Carregando...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return <Table data={garages} onEdit={handleEdit} onDelete={handleDelete} />;
};

export default GaragesPage;
