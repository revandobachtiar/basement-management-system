import type { LineInOutBasement, Basement } from "@/types/parking";

type BasementReference = Pick<Basement, "id" | "name">;

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

  if (
    typeof payload === "object" &&
    payload !== null &&
    !Array.isArray(payload) &&
    "data" in payload
  ) {
    payload = payload.data;
  }

  if (!Array.isArray(payload)) {
    throw new Error(
      "Format response Line IN/OUT Basement tidak valid."
    );
  }

  return payload as BackendLineInOut[];
}

export function transformLineInOut(
  item: LineInOutBasement,
  basements: Basement[]
) {
  const inBasement = basements.find(
    (basement) => basement.id === item.inToBasement
  );

  const outBasement = basements.find(
    (basement) => basement.id === item.outToBasement
  );

  return {
    ...item,
    inToBasementName: inBasement?.name ?? "Tidak ditemukan",
    outToBasementName: outBasement?.name ?? "Tidak ditemukan",
  };
}