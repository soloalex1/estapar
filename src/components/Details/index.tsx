import { useState, type PointerEvent } from 'react';
import { FocusTrap } from 'focus-trap-react';
import {
  BuildingOffice2Icon,
  MapPinIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

import MensalistTab from './MensalistTab';

import useGarageDetails from '../../hooks/useGarageDetails';

const tabs: { id: string; label: string }[] = [
  { id: 'mensalist', label: 'Mensalista digital' },
];

type GarageSidesheetProps = {
  garageId: string | null;
  onClose: () => void;
};

const GarageDetails = ({ garageId, onClose }: GarageSidesheetProps) => {
  const [activeTab, setActiveTab] = useState('mensalist');
  const { details, isLoading, error } = useGarageDetails(garageId ?? '');

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
        className={`fixed inset-0 z-40 bg-black/60 transition-opacity duration-300 ${
          isOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      />

      <FocusTrap
        active={isOpen && !isLoading}
        focusTrapOptions={{
          escapeDeactivates: false,
          allowOutsideClick: true,
        }}
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="details-title"
          className={`fixed top-0 right-0 z-50 h-full max-h-dvh w-full md:w-[90%] overflow-y-hidden bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <span id="details-title" className="sr-only">
            Detalhes da garagem
          </span>

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

              <div className="flex-1 overflow-y-auto px-8 py-6">
                {activeTab === 'mensalist' && (
                  <MensalistTab details={details} />
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
