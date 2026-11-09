
import type { ParkingContext } from "@/types/parking";

type ParkingContextResponse = {
  id: string | number;
  lineInOutBasementId: string | number;
  context: "IN" | "OUT";
  apply: "INCREASE" | "REDUCE";
};

export function transformParkingContext(
  data: ParkingContextResponse
): ParkingContext {
  return {
    id: String(data.id),
    lineInOutBasementId: String(data.lineInOutBasementId),
    context: data.context,
    apply: data.apply,
  };
}

export function transformParkingContextList(
  response:
    | { data: ParkingContextResponse[] }
    | ParkingContextResponse[]
): ParkingContext[] {
  const data = Array.isArray(response) ? response : response.data;

  return data.map(transformParkingContext);
}
