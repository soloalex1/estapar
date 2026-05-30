import { useRef, useEffect, useState } from 'react';
import {
  EllipsisVerticalIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';

import type { Garage } from '../../../services/garages/types';

type ActionMenuProps = {
  garage: Garage;
  onEdit: (garage: Garage) => void;
  onDelete: (id: string) => void;
};

const ActionMenu = ({ garage, onEdit, onDelete }: ActionMenuProps) => {
  const [open, setOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const handleToggleOpen = () => {
    setOpen(!open);
  };

  const handleEditClick = () => {
    onEdit(garage);
  };

  const handleDeleteClick = () => {
    onDelete(garage.id);
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleClickOutside = (e: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }

      document.addEventListener('mousedown', handleClickOutside);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    };
  }, []);

  return (
    <div ref={popoverRef} className="relative flex justify-start">
      <button
        onClick={handleToggleOpen}
        aria-label={`Ações para ${garage.name}`}
        aria-expanded={open}
        aria-haspopup="menu"
        className="p-1 rounded hover:bg-gray-100 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
      >
        <EllipsisVerticalIcon className="w-5 h-5 text-gray-500" />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-8 z-10 w-36 bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden"
        >
          <button
            role="menuitem"
            onClick={handleEditClick}
            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors focus-visible:outline-none focus-visible:bg-brand/50 "
          >
            <PencilIcon className="w-4 h-4" />
            Editar
          </button>
          <button
            role="menuitem"
            onClick={handleDeleteClick}
            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors focus-visible:outline-none focus-visible:bg-brand/50"
          >
            <TrashIcon className="w-4 h-4" />
            Excluir
          </button>
        </div>
      )}
    </div>
  );
};

export default ActionMenu;
