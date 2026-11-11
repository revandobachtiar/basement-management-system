import { fetcher } from "@/lib/api/fetcher";
import { API_ENDPOINTS } from "@/lib/api/api";
import type {
  ParkingContext,
  CreateParkingContextRequest,
} from "@/types/parking";

export const parkingContextService = {
  async getAll(): Promise<ParkingContext[]> {
    return fetcher<ParkingContext[]>(
      API_ENDPOINTS.PARKING_CONTEXT.GET
    );
  },

  async getById(id: string): Promise<ParkingContext> {
    return fetcher<ParkingContext>(
      API_ENDPOINTS.PARKING_CONTEXT.GET_BY_ID(id)
    );
  },

  async create(
    input: CreateParkingContextRequest
  ): Promise<ParkingContext> {
    return fetcher<ParkingContext>(
      API_ENDPOINTS.PARKING_CONTEXT.POST,
      {
        method: "POST",
        body: JSON.stringify(input),
      }
    );
  },

  async update(
    id: string,
    input: CreateParkingContextRequest
  ): Promise<ParkingContext> {
    return fetcher<ParkingContext>(
      API_ENDPOINTS.PARKING_CONTEXT.PUT(id),
      {
        method: "PUT",
        body: JSON.stringify(input),
      }
    );
  },

  async delete(id: string): Promise<void> {
    return fetcher<void>(
      API_ENDPOINTS.PARKING_CONTEXT.DELETE(id),
      { method: "DELETE" }
    );
  },
};