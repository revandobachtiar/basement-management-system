
import { fetcher } from "@/lib/api/fetcher";
import { API_ENDPOINTS } from "@/lib/api/api";
import { USE_MOCK } from "@/lib/api/config";

import type {
  Basement,
  CreateBasementRequest,
  UpdateBasementRequest,
} from "@/types/parking";

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

    return fetcher<Basement[]>(API_ENDPOINTS.BASEMENT.GET);
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

    return fetcher<Basement>(
      API_ENDPOINTS.BASEMENT.GET_BY_ID(id)
    );
  },

  async search(): Promise<Basement[]> {
    if (USE_MOCK) {
      return getBasementsMock();
    }

    return fetcher<Basement[]>(API_ENDPOINTS.BASEMENT.SEARCH);
  },

  async create(
    input: CreateBasementRequest
  ): Promise<Basement> {
    if (USE_MOCK) {
      return createBasementMock(input);
    }

    return fetcher<Basement>(API_ENDPOINTS.BASEMENT.POST, {
      method: "POST",
      body: JSON.stringify(input),
    });
  },

  async update(
    id: string,
    input: UpdateBasementRequest
  ): Promise<Basement> {
    if (USE_MOCK) {
      return updateBasementMock(id, input);
    }

    return fetcher<Basement>(
      API_ENDPOINTS.BASEMENT.PUT(id),
      {
        method: "PUT",
        body: JSON.stringify(input),
      }
    );
  },
};
