import {
  BuildingOffice2Icon,
  TruckIcon,
  ChevronLeftIcon,
} from '@heroicons/react/24/outline';
import { NavLink } from 'react-router-dom';

import EstaparLogo from '../../assets/logo.svg?react';

type CollapsibleProps = {
  collapsed: boolean;
  onToggle?: () => void;
};

const Sidebar = ({ collapsed, onToggle }: CollapsibleProps) => {
  return (
    <aside
      aria-labelledby="sidebar-title"
      className={`hidden md:flex absolute top-0 z-30 flex-col h-screen bg-white-surface border-r border-gray-200 transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      <h2 id="sidebar-title" className="sr-only">
        Todas as páginas
      </h2>

      <div className="flex items-center h-16 px-4 border-b border-gray-200 overflow-hidden">
        <EstaparLogo
          className={`transition-all duration-300 ${collapsed ? 'w-8' : 'w-28'}`}
        />
      </div>

      <NavItems collapsed={collapsed} />
      <CollapseButton collapsed={collapsed} onToggle={onToggle} />
    </aside>
  );
};

const NavItems = ({ collapsed }: CollapsibleProps) => {
  const links = [
    { to: '/garagens', label: 'Garagens', icon: BuildingOffice2Icon },
    { to: '/mensalistas', label: 'Mensalistas', icon: TruckIcon },
  ];

  return (
    <nav className="flex flex-col gap-1 p-2 mt-2">
      {links.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
              isActive
                ? 'bg-green-50 text-green-600 font-medium'
                : 'text-gray-600 hover:bg-gray-100'
            }`
          }
        >
          <Icon className="w-5 h-5 shrink-0" />
          {!collapsed && (
            <span
              className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${
                collapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'
              }`}
            >
              {label}
            </span>
          )}
        </NavLink>
      ))}
    </nav>
  );
};

const CollapseButton = ({ collapsed, onToggle }: CollapsibleProps) => {
  return (
    <button
      onClick={onToggle}
      className="absolute -right-3 top-13 flex items-center justify-center w-6 h-6 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
    >
      <span className="sr-only">
        {collapsed ? 'Expandir menu' : 'Colapsar menu'}
      </span>
      <ChevronLeftIcon
        className={`w-3 h-3 text-gray-500 transition-transform duration-300 ${
          collapsed ? 'rotate-180' : 'rotate-0'
        }`}
      />
    </button>
  );
};

export default Sidebar;
