import { useState, useEffect } from 'react';

import { getGarageDetails } from '../../services/garages';

import type { GarageDetails } from '../../services/garages/types';
import type { GarageDetailsState } from './types';

interface UseGarageDetailsReturn {
  details: GarageDetails | null;
  isLoading: boolean;
  error: string | null;
  revalidate: () => void;
}

const useGarageDetails = (id?: string): UseGarageDetailsReturn => {
  const [state, setState] = useState<GarageDetailsState>({ status: 'idle' });
  const [revalidateKey, setRevalidateKey] = useState(0);

  useEffect(() => {
    if (!id) return;

    let cancelled = false;

    getGarageDetails(id)
      .then((details) => {
        if (!cancelled) {
          setState({ status: 'success', details, id });
        }
      })
      .catch((err: Error) => {
        if (!cancelled) {
          setState({ status: 'error', message: err.message });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [id, revalidateKey]);

  const isStale = state.status === 'success' && state.id !== id;

  const revalidate = () => {
    setRevalidateKey((prev) => prev + 1);
  };

  return {
    details: state.status === 'success' && !isStale ? state.details : null,
    isLoading: state.status === 'idle' || isStale,
    error: state.status === 'error' && !isStale ? state.message : null,
    revalidate,
  };
};

export default useGarageDetails;
