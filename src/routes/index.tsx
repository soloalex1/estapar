import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NiceModal from '@ebay/nice-modal-react';

import { AuthProvider } from '../providers/AuthProvider';
import { SidebarProvider } from '../providers/SidebarProvider';
import AppLayout from '../layouts/AppLayout';

import { PrivateRoute } from './PrivateRoute';

import LoginPage from '../pages/Login';
import HomePage from '../pages/Home';
import GaragesPage from '../pages/Garages';
import NotFoundPage from '../pages/NotFound';
import RegisterPage from '../pages/Register';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SidebarProvider>
          <NiceModal.Provider>
            <Routes>
              <Route path="*" element={<NotFoundPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route element={<PrivateRoute />}>
                <Route element={<AppLayout />}>
                  <Route path="/home" element={<HomePage />} />
                  <Route path="/garages" element={<GaragesPage />} />
                </Route>
              </Route>
            </Routes>
          </NiceModal.Provider>
        </SidebarProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppRoutes;
