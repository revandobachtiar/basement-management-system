import { http } from "@/lib/api/http";
import type {
  Basement,
  AddBasementInput,
} from "@/types/parking";
import { transformBasement } from "@/lib/transformers/basement.transformer";

export const basementService = {
  async getAll(): Promise<Basement[]> {
    const response = await http.get<unknown>("/basement");
    return transformBasement(response);
  },

  async create(input: AddBasementInput): Promise<Basement> {
    const response = await http.post<unknown>("/basement", input);
    const result = transformBasement([response]);
    return result[0];
  },
};