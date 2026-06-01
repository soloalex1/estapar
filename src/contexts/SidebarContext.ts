import { createContext } from 'react';

export interface SidebarContextValue {
  isCollapsed: boolean;
  onToggle: () => void;
}

const SidebarContext = createContext<SidebarContextValue | null>(null);

export default SidebarContext;
