import { useState } from 'react';
import {
  Cog6ToothIcon,
  ArrowRightStartOnRectangleIcon,
  UserIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

import { useAuth } from '../../hooks/useAuth';

const Profile = () => {
  const { user, logout } = useAuth();

  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleOpenMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <>
      <div className="hidden md:flex items-center justify-end gap-4">
        <div className="flex items-center gap-2">
          <UserIcon className="w-6 h-6 text-gray-500" />
          <span className="text-gray-500">{user?.name}</span>
        </div>

        <button
          className="inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          onClick={logout}
        >
          <ArrowRightStartOnRectangleIcon className="w-6 h-6 text-gray-500" />
          <span className="text-gray-500">Sair</span>
        </button>
      </div>

      <button
        onClick={handleOpenMobileMenu}
        className="md:hidden border border-gray-300 rounded p-2"
      >
        <span className="sr-only">Abrir/fechar menu</span>
        {isMobileOpen ? (
          <XMarkIcon className="w-6 h-6 text-gray-500" />
        ) : (
          <Cog6ToothIcon className="w-6 h-6 text-gray-500" />
        )}
      </button>

      {isMobileOpen && (
        <ul className="absolute z-10 top-full right-0 mt-2 h-fit w-full bg-white border border-gray-200 rounded shadow-lg py-2 transition-all duration-300">
          <li className="flex items-center gap-2 px-4 py-2">
            <UserIcon className="w-5 h-5 text-gray-500" />
            <span className="text-gray-500 text-sm">{user?.name}</span>
          </li>
          <li>
            <button
              onClick={logout}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
            >
              <ArrowRightStartOnRectangleIcon className="w-5 h-5 text-gray-500" />
              <span className="text-gray-500 text-sm">Sair</span>
            </button>
          </li>
        </ul>
      )}
    </>
  );
};

export default Profile;
