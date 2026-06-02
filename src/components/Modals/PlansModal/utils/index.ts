import type {
  PlanInsert,
  PlanStatus,
  VehicleType,
} from '../../../../services/plans/types';

export const parsePlanFormData = (
  formData: FormData,
  garageId: string,
): PlanInsert => {
  const {
    description,
    status,
    vehicleType,
    totalSpots,
    value,
    cancellationValue,
    validFrom,
    validUntil,
  } = Object.fromEntries(formData.entries());

  return {
    garageId,
    description: description as string,
    status: status as PlanStatus,
    vehicleType: vehicleType as VehicleType,
    totalSpots: Number(totalSpots),
    value: Number(value),
    cancellationValue: Number(cancellationValue),
    validFrom: validFrom as string,
    validUntil: validUntil ? (validUntil as string) : null,
  };
};
