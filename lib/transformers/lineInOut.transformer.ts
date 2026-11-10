import type { LineInOut, Basement } from "@/types/parking";

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
  response: unknown,
  basements: BasementReference[]
): LineInOut[] {
  const configurations = extractLineInOutArray(response);

  return configurations.map((item) => {
    const inBasement = basements.find(
      (basement) => basement.name === item.inToBasement
    );

    const outBasement = basements.find(
      (basement) => basement.name === item.outToBasement
    );

    const inName = inBasement?.name ?? "—";
    const outName = outBasement?.name ?? "—";
    const name = `Line ${item.lineId} – ${inName} ${inBasement && outBasement ? "↔" : "→"} ${outName}`;

    return {
      id: String(item.id),
      name,
      lineId: String(item.lineId),
      inToBasementId: inBasement?.id ?? null,
      outToBasementId: outBasement?.id ?? null,
    };
  });
}