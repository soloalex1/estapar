import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import registerModals from './components/Modals';

import AppRoutes from './routes';

import './index.css';

registerModals();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRoutes />
  </StrictMode>,
);
