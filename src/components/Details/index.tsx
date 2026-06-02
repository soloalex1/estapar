import { useState, type PointerEvent } from 'react';
import { FocusTrap } from 'focus-trap-react';
import {
  BuildingOffice2Icon,
  MapPinIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

import PlansTab from './PlansTab';

import useGarageDetails from '../../hooks/useGarageDetails';

type DetailsTab = 'plans' | 'discounts' | 'settings';

const tabs: { id: DetailsTab; label: string }[] = [
  { id: 'plans', label: 'Planos' },
  { id: 'discounts', label: 'Descontos' },
  { id: 'settings', label: 'Configurações' },
];

type GarageSidesheetProps = {
  garageId: string | null;
  onClose: () => void;
};

const GarageDetails = ({ garageId, onClose }: GarageSidesheetProps) => {
  const [activeTab, setActiveTab] = useState<DetailsTab>('plans');
  const { details, isLoading, error } = useGarageDetails(garageId ?? '');

  console.log('details:', details);

  const isOpen = !!garageId;

  const handleBackdropClick = (e: PointerEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return (
    <>
      <div
        onClick={handleBackdropClick}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
          isOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      />

      <FocusTrap active={isOpen}>
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Detalhes da garagem"
          className={`fixed top-0 right-0 z-50 h-full w-full max-w-4xl bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {isLoading && (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-gray-400">Carregando...</p>
            </div>
          )}

          {error && (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-red-500">{error}</p>
            </div>
          )}

          {details && !isLoading && (
            <>
              {/* Header */}
              <div className="px-8 pt-8 pb-6 border-b border-gray-100">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <BuildingOffice2Icon className="w-10 h-10 text-brand shrink-0" />
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 uppercase">
                        {details.name}
                      </h2>
                      <p className="text-sm text-gray-400 mt-0.5">
                        Código: {details.code} -
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    aria-label="Fechar"
                    className="p-1.5 rounded hover:bg-gray-100 transition-colors shrink-0"
                  >
                    <XMarkIcon className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                <div className="flex flex-col gap-2 mt-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPinIcon className="w-4 h-4 text-gray-400 shrink-0" />
                    <span className="uppercase">{details.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <BuildingOffice2Icon className="w-4 h-4 text-gray-400 shrink-0" />
                    <span>
                      Filial:{' '}
                      <span className="uppercase">{details.branch}</span>
                      {' · '}Regional: {details.regionalCode}
                    </span>
                  </div>
                </div>
              </div>

              <div className="px-8 border-b border-gray-100">
                <div className="flex gap-6">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-3 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === tab.id
                          ? 'border-green-500 text-green-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto px-8 py-6">
                {activeTab === 'plans' && <PlansTab details={details} />}
                {activeTab === 'discounts' && (
                  <p className="text-sm text-gray-400">
                    Nenhum desconto cadastrado.
                  </p>
                )}
                {activeTab === 'settings' && (
                  <p className="text-sm text-gray-400">
                    Configurações indisponíveis.
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </FocusTrap>
    </>
  );
};

export default GarageDetails;
