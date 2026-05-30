import { useEffect, useState } from 'react';

import {
  getGarages,
  deleteGarage as deleteGarageService,
} from '../../services/garages';

import type { Garage } from '../../services/garages/types';

interface UseGaragesReturn {
  garages: Garage[];
  loading: boolean;
  error: string | null;
  deleteGarage: (id: string) => void;
}

const useGarages = (): UseGaragesReturn => {
  const [garages, setGarages] = useState<Garage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const deleteGarage = (id: string) => deleteGarageService(id);

  useEffect(() => {
    getGarages()
      .then(setGarages)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { garages, loading, error, deleteGarage };
};

export default useGarages;
