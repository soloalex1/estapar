import NiceModal from '@ebay/nice-modal-react';
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

import { MODAL_IDS } from '../../Modals';

import QrCode from '../../../assets/qrcode.svg';

type MensalistTabProps = {
  details: GarageDetails;
  onSuccess: () => void;
};

const MensalistTab = ({ details, onSuccess }: MensalistTabProps) => {
  const handleNewPlanClick = () => {
    NiceModal.show(MODAL_IDS.PLAN, { garageId: details.id, onSuccess });
  };

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
        <div className="border border-gray-200 rounded-lg p-1 flex items-center justify-center">
          <img
            src={QrCode}
            alt="QR Code da garagem"
            className="h-24 w-24 object-contain"
          />
        </div>
      </section>
    );
  };

  return (
    <div className="flex gap-6">
      <nav
        aria-labelledby="plans-tab-label"
        className="flex flex-col gap-1 w-50 shrink-0 bg-white-surface border border-gray-200 rounded-lg"
      >
        <span id="plans-tab-label" className="sr-only">
          Selecione uma seção
        </span>
        <ul>
          <li>
            <SideNavItem
              icon={<CurrencyDollarIcon className="w-5 h-5 text-gray-500" />}
              label="Planos"
              isActive
            />
          </li>
          <li>
            <SideNavItem
              icon={<PercentBadgeIcon className="w-5 h-5 text-gray-500" />}
              label="Descontos"
            />
          </li>
          <li>
            <SideNavItem
              icon={<Cog6ToothIcon className="w-5 h-5 text-gray-500" />}
              label="Configurações"
            />
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
            <button
              onClick={handleNewPlanClick}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-green-600 border border-green-500 rounded-lg hover:bg-green-50 transition-colors"
            >
              <PlusIcon className="w-4 h-4" />
              Novo Plano
            </button>
          </div>

          <div className="rounded-lg border border-gray-200 overflow-hidden">
            <PlansTable plans={details.plans} onSuccess={onSuccess} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MensalistTab;
