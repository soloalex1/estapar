export interface Garage {
  id: string;
  name: string;
  code: string;
  address: string;
  city: string;
  state: string;
  regionalCode: string;
  isDigital: boolean;
}

export type GarageInsert = Omit<Garage, 'id'>;

export interface GaragePlan {
  id: string;
  description: string;
  value: number;
  totalSpots: number;
  occupiedSpots: number;
  availableSpots: number;
  status: 'active' | 'inactive';
}

export interface GarageDetails extends Garage {
  branch: string;
  totalSpots: number;
  occupiedSpots: number;
  availableSpots: number;
  plans: GaragePlan[];
  qrCodeUrl?: string;
}
