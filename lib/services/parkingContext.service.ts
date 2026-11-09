
import {
  getParkingContextsMock,
  getParkingContextByIdMock,
  createParkingContextMock,
  updateParkingContextMock,
  deleteParkingContextMock,
  type AddParkingContextInput,
} from "./parkingContext.mock.service";

import type { ParkingContext } from "@/types/parking";

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === "true";

function ensureMockMode(): void {
  if (!USE_MOCK) {
    throw new Error(
      "Parking Context API belum tersedia di backend. " +
      "Gunakan NEXT_PUBLIC_USE_MOCK=true."
    );
  }
}

export const parkingContextService = {
  async getAll(): Promise<ParkingContext[]> {
    ensureMockMode();
    return getParkingContextsMock();
  },

  async getById(id: string): Promise<ParkingContext> {
    ensureMockMode();
    return getParkingContextByIdMock(id);
  },

  async create(
    input: AddParkingContextInput
  ): Promise<ParkingContext> {
    ensureMockMode();
    return createParkingContextMock(input);
  },

  async update(
    id: string,
    input: Partial<AddParkingContextInput>
  ): Promise<ParkingContext> {
    ensureMockMode();
    return updateParkingContextMock(id, input);
  },

  async remove(id: string): Promise<void> {
    ensureMockMode();
    return deleteParkingContextMock(id);
  },
};
