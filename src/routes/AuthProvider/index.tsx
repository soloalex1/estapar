import { useState, useCallback, type ReactNode } from 'react';

import {
  loginService,
  logoutService,
  getStoredUser,
} from '../../services/auth';
import type { AuthUser, LoginPayload } from '../../services/auth/types';

import { AuthContext } from '../../contexts/AuthContext';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(getStoredUser);

  const login = useCallback(async (payload: LoginPayload) => {
    const authUser = await loginService(payload);
    setUser(authUser);
  }, []);

  const logout = useCallback(() => {
    logoutService();
    setUser(null);
  }, []);

  return (
    <AuthContext value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext>
  );
};
