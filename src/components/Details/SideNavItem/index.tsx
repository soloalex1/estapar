import type { ReactNode } from 'react';

type SideNavItemProps = {
  icon: ReactNode;
  label: string;
  isActive?: boolean;
};

const SideNavItem = ({ icon, label, isActive }: SideNavItemProps) => {
  return (
    <button
      className={`flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors w-full text-left ${
        isActive
          ? 'text-gray-800 font-medium'
          : 'text-gray-500 hover:text-gray-700'
      }`}
    >
      {isActive && (
        <span className="w-1 h-5 bg-brand rounded-full absolute left-0" />
      )}
      {icon}
      {label}
    </button>
  );
};

export default SideNavItem;
