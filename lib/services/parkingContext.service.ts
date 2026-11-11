
import { fetcher } from "@/lib/api/fetcher";
import { API_ENDPOINTS } from "@/lib/api/api";
import { USE_MOCK } from "@/lib/api/config";

import type {
  ParkingContext,
  CreateParkingContextRequest,
} from "@/types/parking";

import {
  transformParkingContext,
  transformParkingContextList,
} from "@/lib/transformers/parkingContext.transformer";

import {
  getParkingContextsMock,
  createParkingContextMock,
  updateParkingContextMock,
  deleteParkingContextMock,
} from "@/lib/services/parkingContext.mock.service";

export const parkingContextService = {
  async getAll(): Promise<ParkingContext[]> {
    if (USE_MOCK) return getParkingContextsMock();

    const response = await fetcher<unknown>(
      API_ENDPOINTS.PARKING_CONTEXT.GET
    );

    return transformParkingContextList(response as
      | { data: Parameters<typeof transformParkingContextList>[0] extends { data: infer T } ? T : never }
      | Parameters<typeof transformParkingContextList>[0]);
  },

  async getById(id: string): Promise<ParkingContext> {
    if (USE_MOCK) {
      const contexts = getParkingContextsMock();
      const context = contexts.find((item) => item.id === id);

      if (!context) throw new Error("Context tidak ditemukan.");
      return context;
    }

    const response = await fetcher<unknown>(
      API_ENDPOINTS.PARKING_CONTEXT.GET_BY_ID(id)
    );

    const payload =
      typeof response === "object" &&
      response !== null &&
      "data" in response
        ? response.data
        : response;

    return transformParkingContext(payload as Parameters<typeof transformParkingContext>[0]);
  },

  async create(
    input: CreateParkingContextRequest
  ): Promise<ParkingContext> {
    if (USE_MOCK) return createParkingContextMock(input);

    const response = await fetcher<unknown>(
      API_ENDPOINTS.PARKING_CONTEXT.POST,
      {
        method: "POST",
        body: JSON.stringify(input),
      }
    );

    return this.transformSingle(response);
  },

  async update(
    id: string,
    input: CreateParkingContextRequest
  ): Promise<ParkingContext> {
    if (USE_MOCK) return updateParkingContextMock(id, input);

    const response = await fetcher<unknown>(
      API_ENDPOINTS.PARKING_CONTEXT.PUT(id),
      {
        method: "PUT",
        body: JSON.stringify(input),
      }
    );

    return this.transformSingle(response);
  },

  async delete(id: string): Promise<void> {
    if (USE_MOCK) return deleteParkingContextMock(id);

    await fetcher<void>(
      API_ENDPOINTS.PARKING_CONTEXT.DELETE(id),
      { method: "DELETE" }
    );
  },

  transformSingle(response: unknown): ParkingContext {
    const payload =
      typeof response === "object" &&
      response !== null &&
      "data" in response
        ? response.data
        : response;

    return transformParkingContext(
      payload as Parameters<typeof transformParkingContext>[0]
    );
  },
};
