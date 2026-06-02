import { type ReactNode } from 'react';
import { EyeIcon } from '@heroicons/react/24/outline';

import type { Garage } from '../../services/garages/types';

type GaragesTableProps = {
  data: Garage[];
  isLoading: boolean;
  onOpenDetails: (id: string) => void;
};

const Table = ({ data, isLoading, onOpenDetails }: GaragesTableProps) => {
  return (
    <div
      className={`w-full overflow-x-auto rounded-lg border border-gray-200 ${isLoading ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}
    >
      <table className="w-full text-sm text-left text-black table-fixed">
        <thead className="border-b border-gray-200">
          <tr>
            <Th width="8">Código</Th>
            <Th width="20">Nome</Th>
            <Th width="20">Endereço</Th>
            <Th width="12">Cidade/UF</Th>
            <Th width="8">Regional</Th>
            <Th width="5">Ações</Th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.length === 0 && !isLoading ? (
            <tr>
              <td colSpan={7} className="text-center py-10 text-gray-400">
                Nenhuma garagem encontrada.
              </td>
            </tr>
          ) : (
            data.map((garage) => (
              <tr
                key={garage.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <Td>
                  <span className="font-mono text-gray-500">{garage.code}</span>
                </Td>
                <Td>{garage.name}</Td>
                <Td>{garage.address}</Td>
                <Td>
                  {garage.city}/{garage.state}
                </Td>
                <Td>{garage.regionalCode}</Td>
                <Td>
                  <button onClick={() => onOpenDetails(garage.id)}>
                    <span className="sr-only">Detalhes</span>
                    <EyeIcon className="w-5 h-5 text-blue-500 hover:text-brand" />
                  </button>
                </Td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

type ThProps = {
  children?: ReactNode;
  srOnly?: boolean;
  width: string;
};

const Th = ({ children, srOnly, width }: ThProps) => {
  return (
    <th
      scope="col"
      style={width ? { width: `${width}%` } : undefined}
      className="px-3 py-2 font-medium uppercase tracking-wide text-xs"
    >
      {srOnly ? <span className="sr-only">{children}</span> : children}
    </th>
  );
};

const Td = ({ children }: { children: ReactNode }) => {
  return (
    <td className="px-3 py-2 text-gray-700 max-w-0 overflow-hidden text-ellipsis whitespace-nowrap">
      {children}
    </td>
  );
};

export default Table;
