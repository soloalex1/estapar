import { useState, useEffect } from 'react';

import { getGarageDetails } from '../../services/garages';

import type { GarageDetails } from '../../services/garages/types';
import type { GarageDetailsState } from './types';

interface UseGarageDetailsReturn {
  details: GarageDetails | null;
  isLoading: boolean;
  error: string | null;
}

const useGarageDetails = (id?: string): UseGarageDetailsReturn => {
  const [state, setState] = useState<GarageDetailsState>({ status: 'idle' });

  useEffect(() => {
    let cancelled = false;

    if (!id) return;

    getGarageDetails(id)
      .then((details) => {
        if (!cancelled) {
          setState({ status: 'success', details });
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
  }, [id]);

  if (!id) return { details: null, isLoading: false, error: null };

  return {
    details: state.status === 'success' ? state.details : null,
    isLoading: state.status === 'idle',
    error: state.status === 'error' ? state.message : null,
  };
};

export default useGarageDetails;
