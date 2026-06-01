import ActionMenu from '../../ActionMenu';

import type { Garage } from '../../../../services/garages/types';

type GarageCardProps = {
  garage: Garage;
  onEdit: (garage: Garage) => void;
  onDelete: (id: string) => void;
};

const GarageCard = ({ garage, onEdit, onDelete }: GarageCardProps) => {
  return (
    <article
      aria-label={garage.name}
      className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col gap-3"
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h2 className="text-sm font-semibold text-gray-800">{garage.name}</h2>
          <span className="font-mono text-xs text-gray-400">{garage.code}</span>
        </div>
        <ActionMenu garage={garage} onEdit={onEdit} onDelete={onDelete} />
      </div>

      <div className="flex flex-col gap-1.5">
        <CardField label="Endereço" value={garage.address} />
        <CardField label="Cidade/UF" value={`${garage.city}/${garage.state}`} />
        <CardField label="Regional" value={garage.regionalCode} />
      </div>
    </article>
  );
};

const CardField = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="flex items-baseline gap-1.5">
      <span className="text-xs text-gray-400 shrink-0">{label}:</span>
      <span className="text-xs text-gray-700">{value}</span>
    </div>
  );
};

export default GarageCard;
