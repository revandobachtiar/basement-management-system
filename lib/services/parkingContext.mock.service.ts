
import { mockParkingContexts } from "@/mock/mockData";

import type { ParkingContext } from "@/types/parking";

export type AddParkingContextInput = Omit<
  ParkingContext,
  "id"
>;

export function getParkingContextsMock(): ParkingContext[] {
  return mockParkingContexts.map((item) => ({
    ...item,
  })) as ParkingContext[];
}

export function getParkingContextByIdMock(
  id: string
): ParkingContext {
  const context = mockParkingContexts.find(
    (item) => item.id === id
  );

  if (!context) {
    throw new Error("Parking Context tidak ditemukan");
  }

  return { ...context } as ParkingContext;
}

export function createParkingContextMock(
  input: AddParkingContextInput
): ParkingContext {
  const newContext = {
    id: `context-${Date.now()}`,
    ...input,
  };

  mockParkingContexts.push(newContext);

  return { ...newContext } as ParkingContext;
}

export function updateParkingContextMock(
  id: string,
  input: Partial<AddParkingContextInput>
): ParkingContext {
  const index = mockParkingContexts.findIndex(
    (item) => item.id === id
  );

  if (index === -1) {
    throw new Error("Parking Context tidak ditemukan");
  }

  mockParkingContexts[index] = {
    ...mockParkingContexts[index],
    ...input,
  };

  return { ...mockParkingContexts[index] } as ParkingContext;
}

export function deleteParkingContextMock(id: string): void {
  const index = mockParkingContexts.findIndex(
    (item) => item.id === id
  );

  if (index === -1) {
    throw new Error("Parking Context tidak ditemukan");
  }

  mockParkingContexts.splice(index, 1);
}
