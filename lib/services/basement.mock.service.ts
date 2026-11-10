
import { mockBasements } from "@/mock/mockData";

import type {
  Basement,
  AddBasementInput,
} from "@/types/parking";

export function getBasementsMock(): Basement[] {
  return mockBasements.map((item) => ({
    ...item,
  })) as Basement[];
}

export function createBasementMock(
  input: AddBasementInput
): Basement {
  const newBasement = {
    id: `basement-${Date.now()}`,
    name: input.name,
    capacity: input.capacity,
    currentCount: 0,
    available: input.capacity,
    isFull: false,
    updatedAt: new Date().toISOString(),
  };

  mockBasements.push(newBasement);

  return { ...newBasement } as Basement;
}

export function updateBasementMock(
  id: string,
  input: Partial<AddBasementInput>
): Basement {
  const index = mockBasements.findIndex(
    (item) => item.id === id
  );

  if (index === -1) {
    throw new Error("Basement tidak ditemukan");
  }

  const current = mockBasements[index];

  const updated = {
    ...current,
    ...input,
    available:
      (input.capacity ?? current.capacity) -
      current.currentCount,
    isFull:
      current.currentCount >=
      (input.capacity ?? current.capacity),
    updatedAt: new Date().toISOString(),
  };

  mockBasements[index] = updated;

  return { ...updated } as Basement;
}
export function updateBasementCountMock(
  id: string,
  count: number
): Basement {
  const index = mockBasements.findIndex(
    (item) => item.id === id
  );

  if (index === -1) {
    throw new Error("Basement tidak ditemukan");
  }

  const current = mockBasements[index];

  if (count < 0 || count > current.capacity) {
    throw new Error("Jumlah kendaraan melebihi kapasitas Basement");
  }

  const updated = {
    ...current,
    currentCount: count,
    available: current.capacity - count,
    isFull: count >= current.capacity,
    updatedAt: new Date().toISOString(),
  };

  mockBasements[index] = updated;

  return { ...updated } as Basement;
}