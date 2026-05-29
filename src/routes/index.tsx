import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { AuthProvider } from '../providers/AuthProvider';
import { SidebarProvider } from '../providers/SidebarProvider';
import AppLayout from '../layouts/AppLayout';

import { PrivateRoute } from './PrivateRoute';

import LoginPage from '../pages/Login';
import HomePage from '../pages/Home';
import GaragesPage from '../pages/Garages';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SidebarProvider>
          <Routes>
            <Route path="*" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route element={<PrivateRoute />}>
              <Route element={<AppLayout />}>
                <Route path="/home" element={<HomePage />} />
                <Route path="/garages" element={<GaragesPage />} />
              </Route>
            </Route>
          </Routes>
        </SidebarProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppRoutes;
