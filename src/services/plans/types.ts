export type VehicleType = 'car' | 'motorcycle' | 'suv';

export type PlanStatus = 'active' | 'inactive';

export interface Plan {
  id: string;
  description: string;
  status: PlanStatus;
  vehicleType: VehicleType;
  totalSpots: number;
  value: number;
  cancellationValue: number;
  validFrom: string;
  validUntil: string | null;
  occupiedSpots: number;
  availableSpots: number;
}

export type PlanInsert = Omit<Plan, 'id' | 'occupiedSpots' | 'availableSpots'>;
