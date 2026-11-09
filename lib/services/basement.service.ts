
import { fetcher } from "@/lib/api/fetcher";
import { API_ENDPOINTS } from "@/lib/api/api";

import {
  getBasementsMock,
  createBasementMock,
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
    if (USE_MOCK) {
      return getBasementsMock();
    }

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
};
