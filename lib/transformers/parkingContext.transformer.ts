
import type { ParkingContext } from "@/types/parking";

type BackendId = string | number | { value: string };

type ParkingContextResponse = {
  id: BackendId;
  lineInOutBasementId: BackendId;
  context: "IN" | "OUT";
  apply: "INCREMENT" | "REDUCE";
};

function normalizeId(id: BackendId): string {
  if (typeof id === "object" && id !== null) {
    return id.value;
  }

  return String(id);
}

function extractPayload(response: unknown): unknown {
  if (
    typeof response === "object" &&
    response !== null &&
    !Array.isArray(response) &&
    "data" in response
  ) {
    return response.data;
  }

  return response;
}

export function transformParkingContext(
  response: unknown
): ParkingContext {
  const payload = extractPayload(response);

  if (
    typeof payload !== "object" ||
    payload === null ||
    !("id" in payload) ||
    !("lineInOutBasementId" in payload) ||
    !("context" in payload) ||
    !("apply" in payload)
  ) {
    throw new Error("Format response Context tidak valid.");
  }

  const item = payload as ParkingContextResponse;

  return {
    id: normalizeId(item.id),
    lineInOutBasementId: normalizeId(item.lineInOutBasementId),
    context: item.context,
    apply: item.apply,
  };
}

export function transformParkingContextList(
  response: unknown
): ParkingContext[] {
  const payload = extractPayload(response);

  if (!Array.isArray(payload)) {
    throw new Error("Format daftar Context tidak valid.");
  }

  return payload.map(transformParkingContext);
}
