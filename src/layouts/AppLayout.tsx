import { Outlet } from 'react-router-dom';
import { use } from 'react';

import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

import SidebarContext from '../contexts/SidebarContext';

const AppLayout = () => {
  const { isCollapsed, onToggle } = use(SidebarContext)!;

  return (
    <main className="w-dvw h-fit max-h-dvh overflow-x-hidden">
      <Sidebar collapsed={isCollapsed} onToggle={onToggle} />
      <Header />
      <Outlet />
    </main>
  );
};

export default AppLayout;
