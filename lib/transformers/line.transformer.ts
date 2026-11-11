
import type { Line } from "@/types/parking";

type BackendId = string | { value: string };

type BackendLine = {
  id: BackendId;
  name: string;
  direction: "in" | "out" | "both";
  isActive: boolean;
};

function normalizeLineId(id: BackendId): string {
  return typeof id === "string" ? id : id.value;
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

function transformItem(item: BackendLine): Line {
  return {
    id: normalizeLineId(item.id),
    name: item.name,
    direction: item.direction,
    isActive: Boolean(item.isActive),
  };
}

export function transformLine(response: unknown): Line[] {
  const payload = extractPayload(response);

  if (!Array.isArray(payload)) {
    throw new Error("Format response Line tidak valid.");
  }

  return payload.map((item) =>
    transformItem(item as BackendLine)
  );
}

export function transformLineDetail(
  response: unknown
): Line {
  const payload = extractPayload(response);

  if (
    typeof payload !== "object" ||
    payload === null ||
    !("id" in payload)
  ) {
    throw new Error("Format detail Line tidak valid.");
  }

  return transformItem(payload as BackendLine);
}
