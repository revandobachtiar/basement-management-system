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
  LineInOut,
  AddLineInOutInput,
} from "@/types/parking";

import { transformLineInOut } from "@/lib/transformers/lineInOut.transformer";

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === "true";

// Helper untuk mengambil daftar basement (butuh untuk transformasi)
async function fetchBasements(): Promise<{ id: string; name: string }[]> {
  const response = await fetcher<unknown>(
    API_ENDPOINTS.BASEMENT.GET,
    { method: "GET" }
  );
  return Array.isArray(response) ? (response as { id: string; name: string }[]) : [];
}

export const lineInOutService = {
  async getAll(): Promise<LineInOut[]> {
    if (USE_MOCK) {
      return getLineInOutsMock();
    }

    const [response, basements] = await Promise.all([
      fetcher<unknown>(API_ENDPOINTS.LINE_IN_OUT_BASEMENT.GET, {
        method: "GET",
      }),
      fetchBasements(),
    ]);

    return transformLineInOut(response, basements);
  },

  async getById(id: string): Promise<LineInOut> {
    if (USE_MOCK) {
      return getLineInOutByIdMock(id);
    }

    const [response, basements] = await Promise.all([
      fetcher<unknown>(API_ENDPOINTS.LINE_IN_OUT_BASEMENT.GET_BY_ID(id), {
        method: "GET",
      }),
      fetchBasements(),
    ]);

    const result = transformLineInOut([response], basements);
    return result[0];
  },

  async create(input: AddLineInOutInput): Promise<LineInOut> {
    if (USE_MOCK) {
      return createLineInOutMock(input);
    }

    const response = await fetcher<LineInOut>(
      API_ENDPOINTS.LINE_IN_OUT_BASEMENT.POST,
      {
        method: "POST",
        body: JSON.stringify(input),
      }
    );

    return response;
  },

  async update(
    id: string,
    input: AddLineInOutInput
  ): Promise<LineInOut> {
    if (USE_MOCK) {
      return updateLineInOutMock(id, input);
    }

    const response = await fetcher<LineInOut>(
      API_ENDPOINTS.LINE_IN_OUT_BASEMENT.PUT(id),
      {
        method: "PUT",
        body: JSON.stringify({
          id,
          ...input,
        }),
      }
    );

    return response;
  },

  async remove(id: string): Promise<void> {
    if (USE_MOCK) {
      return deleteLineInOutMock(id);
    }

    await fetcher(
      API_ENDPOINTS.LINE_IN_OUT_BASEMENT.DELETE(id),
      {
        method: "DELETE",
      }
    );
  },
};
