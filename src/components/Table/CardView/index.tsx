import type { Garage } from '../../../services/garages/types';
import GarageCard from './Card';

type GaragesCardViewProps = {
  data: Garage[];
  isLoading: boolean;
  onEdit: (garage: Garage) => void;
  onDelete: (id: string) => void;
};

const GaragesCardView = ({
  data,
  isLoading,
  onDelete,
  onEdit,
}: GaragesCardViewProps) => {
  if (isLoading) {
    return <p className="text-gray-500">Carregando...</p>;
  }

  if (!isLoading && !data.length) {
    return <p>Nenhuma garagem encontrada.</p>;
  }

  return (
    <ul className="flex flex-col gap-4">
      {data.map((garage) => (
        <li key={garage.id}>
          <GarageCard garage={garage} onDelete={onDelete} onEdit={onEdit} />
        </li>
      ))}
    </ul>
  );
};

export default GaragesCardView;
