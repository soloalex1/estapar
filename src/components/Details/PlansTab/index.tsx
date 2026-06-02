import {
  CurrencyDollarIcon,
  PercentBadgeIcon,
  Cog6ToothIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';

import SideNavItem from '../SideNavItem';
import MetricsCard from '../MetricsCard';
import PlansTable from '../PlansTable';

import type { GarageDetails } from '../../../services/garages/types';

type PlansTabProps = {
  details: GarageDetails;
};

const PlansTab = ({ details }: PlansTabProps) => {
  const renderMetricsSection = () => {
    return (
      <section
        aria-labelledby="metrics-label"
        className="grid grid-cols-4 gap-4"
      >
        <span id="metrics-label" className="sr-only">
          Métricas da garagem
        </span>
        <MetricsCard
          label="Total de Vagas"
          value={details.totalSpots}
          color="gray"
        />
        <MetricsCard
          label="Ocupadas"
          value={details.occupiedSpots}
          color="orange"
        />
        <MetricsCard
          label="Disponíveis"
          value={details.availableSpots}
          color="green"
        />
        {details.qrCodeUrl && (
          <div className="border border-gray-200 rounded-lg p-3 flex items-center justify-center">
            <img
              src={details.qrCodeUrl}
              alt="QR Code da garagem"
              className="w-20 h-20"
            />
          </div>
        )}
      </section>
    );
  };

  return (
    <div className="flex gap-6">
      <nav
        aria-labelledby="plans-tab-label"
        className="flex flex-col gap-1 w-40 shrink-0"
      >
        <span id="plans-tab-label" className="sr-only">
          Selecione uma seção
        </span>
        <ul>
          <li>
            <SideNavItem
              icon={<CurrencyDollarIcon />}
              label="Planos"
              isActive
            />
          </li>
          <li>
            <SideNavItem icon={<PercentBadgeIcon />} label="Descontos" />
          </li>
          <li>
            <SideNavItem icon={<Cog6ToothIcon />} label="Configurações" />
          </li>
        </ul>
      </nav>

      {/* Conteúdo */}
      <div className="flex-1 flex flex-col gap-6">
        {renderMetricsSection()}

        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-gray-800">
              Planos Disponíveis
            </h3>
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-green-600 border border-green-500 rounded-lg hover:bg-green-50 transition-colors">
              <PlusIcon className="w-4 h-4" />
              Novo Plano
            </button>
          </div>

          <div className="rounded-lg border border-gray-200 overflow-hidden">
            <PlansTable plans={details.plans} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlansTab;
