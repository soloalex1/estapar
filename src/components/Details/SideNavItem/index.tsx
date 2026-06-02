import type { ReactNode } from 'react';

type SideNavItemProps = {
  icon: ReactNode;
  label: string;
  isActive?: boolean;
};

const SideNavItem = ({ icon, label, isActive }: SideNavItemProps) => {
  return (
    <>
      <button
        className={`flex items-center justify-start gap-2 px-6 py-4 rounded-md rounded-l-none text-sm transition-colors w-full text-left border-l-2 ${
          isActive
            ? 'bg-white text-gray-800 font-medium border-brand'
            : 'text-gray-500 hover:text-gray-700 border-transparent cursor-not-allowed pointer-events-none'
        }`}
      >
        {icon}
        {label}
      </button>
    </>
  );
};

export default SideNavItem;
