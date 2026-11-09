
import { mockLines } from "@/mock/mockData";

import type {
  Line,
  AddLineInput,
} from "@/types/parking";

export function getLinesMock(): Line[] {
  return mockLines.map((item) => ({ ...item })) as Line[];
}

export function getLineByIdMock(id: string): Line {
  const line = mockLines.find((item) => item.id === id);

  if (!line) {
    throw new Error("Line tidak ditemukan");
  }

  return { ...line } as Line;
}

export function createLineMock(input: AddLineInput): Line {
  const newLine = {
    id: `line-${Date.now()}`,
    ...input,
  };

  mockLines.push(newLine);

  return { ...newLine } as Line;
}

export function updateLineMock(
  id: string,
  input: Partial<AddLineInput>
): Line {
  const index = mockLines.findIndex((item) => item.id === id);

  if (index === -1) {
    throw new Error("Line tidak ditemukan");
  }

  mockLines[index] = {
    ...mockLines[index],
    ...input,
  };

  return { ...mockLines[index] } as Line;
}

export function deleteLineMock(id: string): void {
  const index = mockLines.findIndex((item) => item.id === id);

  if (index === -1) {
    throw new Error("Line tidak ditemukan");
  }

  mockLines.splice(index, 1);
}
