import { useEffect, useState } from 'react';

import { getGarages, deleteGarage } from '../../services/garages';

import type { GaragesState, UseGaragesReturn } from './types';

const DEFAULT_LIMIT = 10;

const useGarages = (): UseGaragesReturn => {
  const [page, setPage] = useState(1);
  const [state, setState] = useState<GaragesState>({ status: 'idle' });

  const isSuccessful = state.status === 'success';

  useEffect(() => {
    let cancelled = false;

    getGarages({ page, limit: DEFAULT_LIMIT })
      .then(({ data, total, pages }) => {
        if (!cancelled) {
          setState({ status: 'success', data, total, pages });
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
  }, [page]);

  const handleSetPage = (newPage: number) => {
    setState({ status: 'idle' });
    setPage(newPage);
  };

  return {
    garages: isSuccessful ? state.data : [],
    isLoading: state.status === 'idle',
    error: state.status === 'error' ? state.message : null,
    deleteGarage,
    pagination: {
      page,
      pages: isSuccessful ? state.pages : 0,
      total: isSuccessful ? state.total : 0,
      setPage: handleSetPage,
    },
  };
};

export default useGarages;
