
import { fetcher } from "@/lib/api/fetcher";
import { API_ENDPOINTS } from "@/lib/api/api";

import {
  getBasementsMock,
  createBasementMock,
  updateBasementCountMock,
  updateBasementMock,
} from "./basement.mock.service";

import type {
  Basement,
  AddBasementInput,
} from "@/types/parking";

import { transformBasement } from "@/lib/transformers/basement.transformer";

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === "true";

export const basementService = {
  async getAll(): Promise<Basement[]> {
  console.log("[BASEMENT] USE_MOCK:", USE_MOCK);

  if (USE_MOCK) {
        console.log("[BASEMENT] Menggunakan Mock Data");

        const data = getBasementsMock();

        console.log("[BASEMENT] Mock Data:", data);

        return data;
    }

    console.log("[BASEMENT] Mengambil data dari API");

    const response = await fetcher(
        API_ENDPOINTS.BASEMENT.GET
    );

    return transformBasement(response);
    },

  async create(input: AddBasementInput): Promise<Basement> {
    if (USE_MOCK) {
      return createBasementMock(input);
    }

    const response = await fetcher(
      API_ENDPOINTS.BASEMENT.POST,
      {
        method: "POST",
        body: JSON.stringify(input),
      }
    );

    return transformBasement([response])[0];
  },

  async update(
    id: string,
    input: AddBasementInput
  ): Promise<Basement> {
    if (USE_MOCK) {
      return updateBasementMock(id, input);
    }

    const response = await fetcher(
      API_ENDPOINTS.BASEMENT.PUT(id),
      {
        method: "PUT",
        body: JSON.stringify({ id, ...input }),
      }
    );

    return transformBasement([response])[0];
  },
  async updateCurrentCount(
    id: string,
    count: number
    ): Promise<Basement> {
    if (!USE_MOCK) {
        throw new Error(
        "Endpoint untuk mengubah jumlah kendaraan belum tersedia di backend."
        );
    }

    return updateBasementCountMock(id, count);
    },
};
