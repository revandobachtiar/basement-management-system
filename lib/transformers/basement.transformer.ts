import type { Basement } from "@/types/parking";

type BackendBasement = {
  id: string;
  name: string;
  capacity: number;
  currentCount: number;
  available: number;
  isFull: boolean;
  updatedAt: string;
};

function extractBasementArray(response: unknown): BackendBasement[] {
  let payload = response;


  if (
    typeof payload === "object" &&
    payload !== null &&
    !Array.isArray(payload) &&
    "data" in payload
  ) {
    payload = payload.data;
  }

  if (!Array.isArray(payload)) {
    throw new Error("Format response Basement tidak valid.");
  }

  return payload as BackendBasement[];
}

export function transformBasement(
  response: unknown
): Basement[] {
  const basements = extractBasementArray(response);

  return basements.map((item) => ({
    id: String(item.id),
    name: item.name,
    capacity: Number(item.capacity),
    currentCount: Number(item.currentCount),
    available: Number(item.available),
    isFull: Boolean(item.isFull),
    updatedAt: String(item.updatedAt),
  }));
}