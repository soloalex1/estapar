import { createContext } from 'react';

import type { AuthUserStored, LoginPayload } from '../services/auth/types';

export interface AuthContextValue {
  user: AuthUserStored | null;
  isAuthenticated: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export default AuthContext;
