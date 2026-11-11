
import type {
  LineInOutBasement,
  Basement,
} from "@/types/parking";

type BackendId = string | { value: string } | null;

type BackendLineInOut = {
  id: BackendId;
  name: string;
  lineId: BackendId;
  inToBasement: BackendId;
  outToBasement: BackendId;
};

type BasementReference = Pick<Basement, "id" | "name">;

function normalizeId(id: BackendId): string | null {
  if (id === null || id === undefined) {
    return null;
  }

  return typeof id === "string" ? id : id.value ?? null;
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

export function transformLineInOut(
  response: unknown,
  basements: BasementReference[]
): LineInOutBasement[] {
  const payload = extractPayload(response);

  const items = Array.isArray(payload)
    ? payload
    : payload && typeof payload === "object"
      ? [payload]
      : null;

  if (!items) {
    throw new Error(
      "Format response Line IN/OUT Basement tidak valid."
    );
  }

  return (items as BackendLineInOut[]).map((item) => {
    const id = normalizeId(item.id);
    const lineId = normalizeId(item.lineId);
    const inToBasementId = normalizeId(item.inToBasement);
    const outToBasementId = normalizeId(item.outToBasement);
    if (!id || !lineId) {
      throw new Error(
        "ID Line IN/OUT atau Line tidak valid."
      );
    }

    const inBasement = basements.find(
      (basement) => basement.id === inToBasementId
    );

    const outBasement = basements.find(
      (basement) => basement.id === outToBasementId
    );

    return {
      id,
      name: item.name,
      lineId,
      inToBasement: inToBasementId,
      outToBasement: outToBasementId,
      inToBasementName: inToBasementId
        ? inBasement?.name ?? "Basement tidak ditemukan"
        : "Tidak diatur",
      outToBasementName: outToBasementId
        ? outBasement?.name ?? "Basement tidak ditemukan"
        : "Tidak diatur",
    };
  });
}

