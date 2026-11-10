
import {
  mockLineInOuts,
  mockBasements,
} from "@/mock/mockData";

import type {
  LineInOut,
  AddLineInOutInput,
} from "@/types/parking";

function toFrontendModel(item: (typeof mockLineInOuts)[number]): LineInOut {
  return {
    id: item.id,
    name: item.name,
    lineId: item.lineId,
    inToBasementId: mockBasements.find(
      (basement) => basement.name === item.inToBasement
    )?.id,
    outToBasementId: mockBasements.find(
      (basement) => basement.name === item.outToBasement
    )?.id,
  } as LineInOut;
}

function toMockModel(input: AddLineInOutInput) {
  const inBasement = mockBasements.find(
    (basement) => basement.id === input.inToBasementId
  );
  const outBasement = mockBasements.find(
    (basement) => basement.id === input.outToBasementId
  );

  return {
    name: input.name,
    lineId: input.lineId,
    inToBasement: inBasement?.name,
    outToBasement: outBasement?.name,
  };
}

export function getLineInOutsMock(): LineInOut[] {
  return mockLineInOuts.map(toFrontendModel);
}

export function getLineInOutByIdMock(id: string): LineInOut {
  const item = mockLineInOuts.find((mapping) => mapping.id === id);

  if (!item) {
    throw new Error("Mapping Line IN/OUT tidak ditemukan");
  }

  return toFrontendModel(item);
}

export function createLineInOutMock(
  input: AddLineInOutInput
): LineInOut {
  const newItem = {
    id: `mapping-${Date.now()}`,
    ...toMockModel(input),
  };

  mockLineInOuts.push(newItem);

  return toFrontendModel(newItem);
}

export function updateLineInOutMock(
  id: string,
  input: AddLineInOutInput
): LineInOut {
  const index = mockLineInOuts.findIndex((item) => item.id === id);

  if (index === -1) {
    throw new Error("Mapping Line IN/OUT tidak ditemukan");
  }

  mockLineInOuts[index] = {
    id,
    ...toMockModel(input),
  };

  return toFrontendModel(mockLineInOuts[index]);
}

export function deleteLineInOutMock(id: string): void {
  const index = mockLineInOuts.findIndex((item) => item.id === id);

  if (index === -1) {
    throw new Error("Mapping Line IN/OUT tidak ditemukan");
  }

  mockLineInOuts.splice(index, 1);
}
