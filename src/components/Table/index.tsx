import { type ReactNode } from 'react';

import ActionMenu from './ActionMenu';

import type { Garage } from '../../services/garages/types';

type GaragesTableProps = {
  data: Garage[];
  onEdit: (garage: Garage) => void;
  onDelete: (id: string) => void;
};

const Table = ({ data, onEdit, onDelete }: GaragesTableProps) => {
  return (
    <div className="w-full overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full text-sm text-left text-black">
        <thead className="border-b border-gray-200">
          <tr>
            <Th>Código</Th>
            <Th>Nome</Th>
            <Th>Endereço</Th>
            <Th>Cidade/UF</Th>
            <Th>Regional</Th>
            <Th>Ações</Th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.length === 0 ? (
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
                  <ActionMenu
                    garage={garage}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                </Td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

const Th = ({
  children,
  srOnly,
}: {
  children?: ReactNode;
  srOnly?: boolean;
}) => {
  return (
    <th
      scope="col"
      className="px-4 py-3 font-medium uppercase tracking-wide text-xs"
    >
      {srOnly ? <span className="sr-only">{children}</span> : children}
    </th>
  );
};

const Td = ({ children }: { children: ReactNode }) => {
  return (
    <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{children}</td>
  );
};

export default Table;
