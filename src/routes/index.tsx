import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { AuthProvider } from './AuthProvider';
import { PrivateRoute } from './PrivateRoute';

import LoginPage from '../pages/Login';
import HomePage from '../pages/Home';
import GaragesPage from '../pages/Garages';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="*" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<HomePage />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/garages" element={<GaragesPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppRoutes;
