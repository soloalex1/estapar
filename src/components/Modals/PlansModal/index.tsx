import { useActionState, useState, type MouseEvent } from 'react';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { FocusTrap } from 'focus-trap-react';
import { XMarkIcon } from '@heroicons/react/24/outline';

import Input from '../../Input';
import Toggle from '../../Toggle';

import type {
  Plan,
  PlanStatus,
  VehicleType,
} from '../../../services/plans/types';

import { createPlan, updatePlan } from '../../../services/plans';
import { parsePlanFormData } from './utils';

type PlanModalProps = {
  plan?: Plan;
  garageId: string;
  onSuccess?: () => void;
};

const vehicleTypeOptions: { value: VehicleType; label: string }[] = [
  { value: 'car', label: 'Carro' },
  { value: 'motorcycle', label: 'Moto' },
  { value: 'suv', label: 'SUV' },
];

const PlansModal = NiceModal.create(
  ({ plan, garageId, onSuccess }: PlanModalProps) => {
    const modal = useModal();
    const isEditing = !!plan;

    const [isPlanActive, setPlanActive] = useState(plan?.status === 'active');

    const [error, submitAction, isPending] = useActionState(
      async (_prev: string | null, formData: FormData) => {
        try {
          const payload = {
            ...parsePlanFormData(formData, garageId),
            status: (isPlanActive ? 'active' : 'inactive') as PlanStatus,
          };

          if (isEditing) {
            await updatePlan(plan.id, payload);
          } else {
            await createPlan(payload);
          }

          onSuccess?.();
          modal.hide();

          return null;
        } catch (err) {
          return err instanceof Error ? err.message : 'Erro ao salvar plano.';
        }
      },
      null,
    );

    const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) modal.hide();
    };

    if (!modal.visible) {
      return null;
    }

    return (
      <div
        className="fixed inset-0 z-60 flex items-center justify-center bg-black/40 px-4 pointer-events-none"
        onClick={handleBackdropClick}
      >
        <FocusTrap
          active={modal.visible && !isPending}
          focusTrapOptions={{
            escapeDeactivates: false,
            allowOutsideClick: true,
          }}
        >
          <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl pointer-events-auto">
            {/* Header */}
            <div className="flex items-start justify-between px-6 pt-6 pb-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {isEditing ? 'Editar Plano' : 'Novo Plano'}
                </h2>
                <p className="text-sm text-gray-400 mt-0.5">
                  Preencha os dados para{' '}
                  {isEditing ? 'editar o' : 'criar um novo'} plano.
                </p>
              </div>
              <button
                onClick={() => modal.hide()}
                aria-label="Fechar modal"
                className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <XMarkIcon className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Force-remounting when plan changes to correctly apply defaultValue */}
            <form key={plan?.id ?? 'new'} action={submitAction}>
              <div className="px-6 pb-4 flex flex-col gap-5">
                {/* Descrição + Status */}
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Descrição"
                    name="description"
                    placeholder="Digite a descrição do plano"
                    defaultValue={plan?.description ?? ''}
                    required
                  />

                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-gray-700">
                      Status
                    </label>
                    <Toggle
                      type="button"
                      label={isPlanActive ? 'Ativo' : 'Inativo'}
                      checked={isPlanActive}
                      onChange={setPlanActive}
                    />
                  </div>
                </div>

                {/* Tipo de Veículo + Total de Vagas */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="vehicleType"
                      className="text-sm font-medium text-gray-700"
                    >
                      Tipo de Veículo
                    </label>
                    <select
                      id="vehicleType"
                      name="vehicleType"
                      defaultValue={plan?.vehicleType ?? 'car'}
                      className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      {vehicleTypeOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <Input
                    label="Total de Vagas"
                    name="totalSpots"
                    type="number"
                    min="1"
                    defaultValue={String(plan?.totalSpots ?? 1)}
                    required
                  />
                </div>

                {/* Valor + Valor do Cancelamento */}
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Valor (R$)"
                    name="value"
                    type="number"
                    min="0"
                    step="0.01"
                    defaultValue={String(plan?.value ?? 0)}
                    required
                  />
                  <Input
                    label="Valor do Cancelamento (R$)"
                    name="cancellationValue"
                    type="number"
                    min="0"
                    step="0.01"
                    defaultValue={String(plan?.cancellationValue ?? 0)}
                    required
                  />
                </div>

                {/* Início da Validade + Fim da Validade */}
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Início da Validade"
                    name="validFrom"
                    type="date"
                    defaultValue={
                      plan?.validFrom ?? new Date().toISOString().split('T')[0]
                    }
                    required
                  />
                  <Input
                    label="Fim da Validade"
                    name="validUntil"
                    type="date"
                    defaultValue={plan?.validUntil ?? ''}
                  />
                </div>

                {error && (
                  <p role="alert" className="text-sm text-red-500">
                    {error}
                  </p>
                )}
              </div>

              {/* Footer */}
              <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => modal.hide()}
                  disabled={isPending}
                  className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-4 py-2 text-sm text-white bg-green-500 rounded-lg hover:bg-green-600 disabled:opacity-50 transition-colors"
                >
                  {isPending
                    ? 'Salvando...'
                    : isEditing
                      ? 'Salvar alterações'
                      : 'Criar'}
                </button>
              </div>
            </form>
          </div>
        </FocusTrap>
      </div>
    );
  },
);

export default PlansModal;
