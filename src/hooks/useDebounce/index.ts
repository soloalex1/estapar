import { useState, useEffect } from 'react';

const DELAY = 500;

const useDebounce = <T>(value: T): T => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), DELAY);

    return () => {
      clearTimeout(timer);
    };
  }, [value]);

  return debounced;
};

export default useDebounce;
