import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import registerModals from './modals';

import AppRoutes from './routes';

import './index.css';

registerModals();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRoutes />
  </StrictMode>,
);
