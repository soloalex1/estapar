import { Outlet } from 'react-router-dom';
import { use } from 'react';

import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

import SidebarContext from '../contexts/SidebarContext';

const AppLayout = () => {
  const { isCollapsed, onToggle } = use(SidebarContext)!;

  return (
    <div className="flex w-screen h-screen overflow-hidden">
      <Sidebar collapsed={isCollapsed} onToggle={onToggle} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto mb-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
