import { useState, type ReactNode } from 'react';

import SidebarContext from '../../contexts/SidebarContext';

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isCollapsed, setCollapsed] = useState(false);

  const onToggle = () => {
    setCollapsed(!isCollapsed);
  };

  return (
    <SidebarContext value={{ isCollapsed, onToggle }}>
      {children}
    </SidebarContext>
  );
};
