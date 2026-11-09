import type { Line } from "@/types/parking";

type BackendLine = {
  id: string;
  name: string;
  direction: "in" | "out" | "both";
  isActive: boolean;
};

function extractLineArray(response: unknown): BackendLine[] {
  let payload = response;

  // Mendukung respons berupa array langsung atau { data: [...] }
  if (
    typeof payload === "object" &&
    payload !== null &&
    !Array.isArray(payload) &&
    "data" in payload
  ) {
    payload = payload.data;
  }

  if (!Array.isArray(payload)) {
    throw new Error("Format response Line tidak valid.");
  }

  return payload as BackendLine[];
}

export function transformLine(response: unknown): Line[] {
  const lines = extractLineArray(response);

  return lines.map((item) => ({
    id: String(item.id),
    name: item.name,
    direction: item.direction,
    isActive: Boolean(item.isActive),
  }));
}