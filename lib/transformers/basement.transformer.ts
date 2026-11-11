
import type { Basement } from "@/types/parking";

type BackendId = string | { value: string };

type BackendBasement = {
  id: BackendId;
  name: string;
  capacity: number;
  currentCount: number;
  available: number;
  isFull: boolean;
  updatedAt: string;
};

function normalizeBasementId(id: BackendId): string {
  if (typeof id === "string") {
    return id;
  }

  return id.value;
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

function transformItem(item: BackendBasement): Basement {
  return {
    id: normalizeBasementId(item.id),
    name: item.name,
    capacity: Number(item.capacity),
    currentCount: Number(item.currentCount),
    available: Number(item.available),
    isFull: Boolean(item.isFull),
    updatedAt: String(item.updatedAt),
  };
}

export function transformBasement(
  response: unknown
): Basement[] {
  const payload = extractPayload(response);

  if (!Array.isArray(payload)) {
    throw new Error("Format response Basement tidak valid.");
  }

  return payload.map((item) =>
    transformItem(item as BackendBasement)
  );
}

export function transformBasementDetail(
  response: unknown
): Basement {
  const payload = extractPayload(response);

  if (
    typeof payload !== "object" ||
    payload === null ||
    !("id" in payload)
  ) {
    throw new Error("Format detail Basement tidak valid.");
  }

  return transformItem(payload as BackendBasement);
}
