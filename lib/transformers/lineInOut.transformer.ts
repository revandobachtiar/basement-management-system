import type { LineInOut } from "@/types/parking";

type BackendLineInOut = {
  id: string;
  lineId: string;
  inToBasement?: string;
  outToBasement?: string;
};

function extractLineInOutArray(
  response: unknown
): BackendLineInOut[] {
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
    throw new Error("Format response Line IN/OUT Basement tidak valid.");
  }

  return payload as BackendLineInOut[];
}

export function transformLineInOut(
  response: unknown
): LineInOut[] {
  const configurations = extractLineInOutArray(response);

  return configurations.map((item) => ({
    id: String(item.id),
    lineId: String(item.lineId),
    inToBasementId: item.inToBasement
      ? String(item.inToBasement)
      : null,
    outToBasementId: item.outToBasement
      ? String(item.outToBasement)
      : null,
  }));
}