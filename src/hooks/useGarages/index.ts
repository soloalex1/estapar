import { use } from 'react';

import { getGarages } from '../../services/garages';

// fora do hook pra preservar a mesma ref
const garagesPromise = getGarages();

const useGarages = () => {
  const garages = use(garagesPromise);
  return { garages };
};

export default useGarages;
