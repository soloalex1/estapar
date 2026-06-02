import { UserGroupIcon, PencilSquareIcon } from '@heroicons/react/24/outline';

import type { GaragePlan } from '../../../services/garages/types';

type PlansTableProps = {
  plans: GaragePlan[];
};

const HEADERS = [
  'Descrição',
  'Valor',
  'Vagas',
  'Ocupadas',
  'Disponíveis',
  'Status',
  'Ações',
];

const PlansTable = ({ plans }: PlansTableProps) => {
  return (
    <table className="w-full text-sm text-left">
      <thead className="bg-gray-50 border-b border-gray-200">
        <tr>
          {HEADERS.map((h) => (
            <th
              key={h}
              scope="col"
              className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide"
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {plans.length === 0 ? (
          <tr>
            <td colSpan={7} className="text-center py-8 text-gray-400">
              Nenhum plano cadastrado.
            </td>
          </tr>
        ) : (
          plans.map((plan) => <PlanRow key={plan.id} plan={plan} />)
        )}
      </tbody>
    </table>
  );
};

const PlanRow = ({ plan }: { plan: GaragePlan }) => {
  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-4 py-3 text-gray-700">
        <div className="flex items-center gap-2">
          <UserGroupIcon className="w-4 h-4 text-gray-400" />
          {plan.description}
        </div>
      </td>
      <td className="px-4 py-3 text-gray-700">
        {plan.value.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
      </td>
      <td className="px-4 py-3 text-gray-700">{plan.totalSpots}</td>
      <td className="px-4 py-3 text-gray-700">{plan.occupiedSpots}</td>
      <td className="px-4 py-3 text-gray-700">{plan.availableSpots}</td>
      <td className="px-4 py-3">
        <span
          className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
            plan.status === 'active'
              ? 'bg-green-100 text-green-700'
              : 'bg-gray-100 text-gray-500'
          }`}
        >
          {plan.status === 'active' ? 'Ativo' : 'Inativo'}
        </span>
      </td>
      <td className="px-4 py-3">
        <button
          aria-label={`Editar plano ${plan.description}`}
          className="p-1 rounded hover:bg-gray-100 transition-colors"
        >
          <PencilSquareIcon className="w-4 h-4 text-gray-500" />
        </button>
      </td>
    </tr>
  );
};

export default PlansTable;
