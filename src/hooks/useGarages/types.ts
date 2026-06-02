import type { Garage } from '../../services/garages/types';

export type GaragesState =
  | { status: 'idle' }
  | { status: 'error'; message: string }
  | { status: 'success'; data: Garage[]; total: number; pages: number };

export interface UseGaragesReturn {
  garages: Garage[];
  isLoading: boolean;
  error: string | null;
  pagination: {
    page: number;
    pages: number;
    total: number;
    setPage: (page: number) => void;
  };
}
