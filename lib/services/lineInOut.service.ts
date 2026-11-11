
import { fetcher } from "@/lib/api/fetcher";
import { API_ENDPOINTS } from "@/lib/api/api";

import {
  getLineInOutsMock,
  getLineInOutByIdMock,
  createLineInOutMock,
  updateLineInOutMock,
  deleteLineInOutMock,
} from "./lineInOut.mock.service";

import type {
  LineInOutBasement,
  CreateLineInOutBasementRequest,
  UpdateLineInOutBasementRequest,
  Basement,
} from "@/types/parking";

import { transformLineInOut } from "@/lib/transformers/lineInOut.transformer";
import { USE_MOCK } from "@/lib/api/config";

type BackendId = string | { value: string };

type BackendBasement = {
  id: BackendId;
  name: string;
};

function normalizeId(id: BackendId): string {
  return typeof id === "string" ? id : id.value;
}

async function fetchBasements(): Promise<Pick<Basement, "id" | "name">[]> {
  const response = await fetcher<unknown>(
    API_ENDPOINTS.BASEMENT.GET
  );

  const payload =
    typeof response === "object" &&
    response !== null &&
    !Array.isArray(response) &&
    "data" in response
      ? response.data
      : response;

  if (!Array.isArray(payload)) return [];

  return (payload as BackendBasement[]).map((item) => ({
    id: normalizeId(item.id),
    name: item.name,
  }));
}

async function transformResponse(
  response: unknown
): Promise<LineInOutBasement> {
  const basements = await fetchBasements();

  const result = transformLineInOut(response, basements);

  if (!result[0]) {
    throw new Error("Data Line IN/OUT tidak ditemukan.");
  }

  return result[0];
}

const JSON_HEADERS = {
  "Content-Type": "application/json",
};

export const lineInOutService = {
  async getAll(): Promise<LineInOutBasement[]> {

    if (USE_MOCK) {
      return getLineInOutsMock();
    }

    const [response, basements] = await Promise.all([
      fetcher<LineInOutBasement[]>(
        API_ENDPOINTS.LINE_IN_OUT_BASEMENT.GET,
        { method: "GET" }
      ),

      fetchBasements(),
    ]);

    const result = transformLineInOut(response, basements);

    console.log("[LINE IN/OUT] Data hasil transformasi:", result);

    return result;
  },

  async getById(id: string): Promise<LineInOutBasement> {
    if (USE_MOCK) {
      return getLineInOutByIdMock(id);
    }

    const [response, basements] = await Promise.all([
      fetcher<LineInOutBasement>(
        API_ENDPOINTS.LINE_IN_OUT_BASEMENT.GET_BY_ID(id),
        { method: "GET" }
      ),
      fetchBasements(),
    ]);


    return transformResponse(response);
  },
  async create(
    input: CreateLineInOutBasementRequest
  ): Promise<LineInOutBasement> {
    if (USE_MOCK) return createLineInOutMock(input);

    const payload = {
      name: input.name,
      lineId: input.lineId,
      inToBasementId: input.inToBasementId || null,
      outToBasementId: input.outToBasementId || null,
    };

    console.log("[LINE IN/OUT] Payload POST:", payload);

    const response = await fetcher<unknown>(
      API_ENDPOINTS.LINE_IN_OUT_BASEMENT.POST,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      }
    );

    console.log("[LINE IN/OUT] Response POST:", response);

    return transformResponse(response);
  },

  async update(
    id: string,

    input: UpdateLineInOutBasementRequest
  ): Promise<LineInOutBasement> {
    if (USE_MOCK) return updateLineInOutMock(id, input);

    const payload = {
      ...input,
      inToBasementId: input.inToBasementId || null,
      outToBasementId: input.outToBasementId || null,
      id,
    };

    console.log("[LINE IN/OUT] Payload PUT:", payload);

    const response = await fetcher<unknown>(

      API_ENDPOINTS.LINE_IN_OUT_BASEMENT.PUT(id),
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...input, id }),
      }
    );

    console.log("[LINE IN/OUT] Response PUT:", response);

    return transformResponse(response);
  },

  async remove(id: string): Promise<void> {
    if (USE_MOCK) return deleteLineInOutMock(id);

    await fetcher(
      API_ENDPOINTS.LINE_IN_OUT_BASEMENT.DELETE(id),
      { method: "DELETE" }
    );
  },
};
