import type { GarageDetails } from '../../services/garages/types';

export type GarageDetailsState =
  | { status: 'idle' }
  | { status: 'error'; message: string }
  | { status: 'success'; details: GarageDetails; id: string };
