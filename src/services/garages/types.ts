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
