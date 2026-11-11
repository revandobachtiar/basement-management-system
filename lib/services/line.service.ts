
import { fetcher } from "@/lib/api/fetcher";
import { API_ENDPOINTS } from "@/lib/api/api";

import {
  getLinesMock,
  createLineMock,
  updateLineMock,
  deleteLineMock,
} from "./line.mock.service";

import type {
  Line,
  CreateLineInOutBasementRequest,
  UpdateLineInOutBasementRequest,
} from "@/types/parking";

import { transformLine } from "@/lib/transformers/line.transformer";

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === "true";

export const lineService = {
  async getAll(): Promise<Line[]> {
    if (USE_MOCK) return getLinesMock();

    const response = await fetcher(API_ENDPOINTS.LINE.GET);

    return transformLine(response);
  },

  async create(input: CreateLineInOutBasementRequest): Promise<Line> {
    if (USE_MOCK) return createLineMock(input);

    const response = await fetcher(
      API_ENDPOINTS.LINE.POST,
      {
        method: "POST",
        body: JSON.stringify(input),
      }
    );

    return transformLine([response])[0];
  },

  async update(
    id: string,
    input: Partial<UpdateLineInOutBasementRequest>
  ): Promise<Line> {
    if (USE_MOCK) return updateLineMock(id, input);

    const response = await fetcher(
      API_ENDPOINTS.LINE.PUT(id),
      {
        method: "PUT",
        body: JSON.stringify({ id, ...input }),
      }
    );

    return transformLine([response])[0];
  },

  async remove(id: string): Promise<void> {
    if (USE_MOCK) return deleteLineMock(id);

    await fetcher(
      API_ENDPOINTS.LINE.DELETE(id),
      { method: "DELETE" }
    );
  },
};
