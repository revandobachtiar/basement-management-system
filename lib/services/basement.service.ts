
import { fetcher } from "@/lib/api/fetcher";
import { API_ENDPOINTS } from "@/lib/api/api";
import { USE_MOCK } from "@/lib/api/config";

import type {
  Basement,
  CreateBasementRequest,
  UpdateBasementRequest,
} from "@/types/parking";

import {
  transformBasement,
  transformBasementDetail,
} from "@/lib/transformers/basement.transformer";

import {
  getBasementsMock,
  createBasementMock,
  updateBasementMock,
} from "@/lib/services/basement.mock.service";

export const basementService = {
  async getAll(): Promise<Basement[]> {
    console.log("[BASEMENT] USE_MOCK:", USE_MOCK);

    if (USE_MOCK) {
      console.log("[BASEMENT] Mengambil data dari MOCK");
      return getBasementsMock();
    }

    console.log("[BASEMENT] Mengambil data dari API");

    const response = await fetcher<unknown>(
      API_ENDPOINTS.BASEMENT.GET
    );

    return transformBasement(response);
  },

  async getById(id: string): Promise<Basement> {
    if (USE_MOCK) {
      const data = getBasementsMock();
      const basement = data.find((item) => item.id === id);

      if (!basement) {
        throw new Error("Basement tidak ditemukan");
      }

      return basement;
    }

    const response = await fetcher<unknown>(
      API_ENDPOINTS.BASEMENT.GET_BY_ID(id)
    );

    return transformBasementDetail(response);
  },

  async search(): Promise<Basement[]> {
    if (USE_MOCK) {
      return getBasementsMock();
    }

    const response = await fetcher<unknown>(
      API_ENDPOINTS.BASEMENT.SEARCH
    );

    return transformBasement(response);
  },

  async create(
    input: CreateBasementRequest
  ): Promise<Basement> {
    if (USE_MOCK) {
      return createBasementMock(input);
    }

    const response = await fetcher<unknown>(
      API_ENDPOINTS.BASEMENT.POST,
      {
        method: "POST",
        body: JSON.stringify(input),
      }
    );

    return transformBasementDetail(response);
  },

  async update(
    id: string,
    input: UpdateBasementRequest
  ): Promise<Basement> {
    if (USE_MOCK) {
      return updateBasementMock(id, input);
    }

    const response = await fetcher<unknown>(
      API_ENDPOINTS.BASEMENT.PUT(id),
      {
        method: "PUT",
        body: JSON.stringify(input),
      }
    );

    return transformBasementDetail(response);
  },
};
