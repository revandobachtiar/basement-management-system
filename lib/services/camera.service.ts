
import {
  getCamerasMock,
  getCameraByIdMock,
  createCameraMock,
  updateCameraMock,
  deleteCameraMock,
  type AddCameraInput,
} from "./camera.mock.service";

import type { Camera } from "@/types/parking";

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === "true";

function ensureMockMode(): void {
  if (!USE_MOCK) {
    throw new Error(
      "Camera API belum tersedia di backend. " +
      "Gunakan NEXT_PUBLIC_USE_MOCK=true."
    );
  }
}

export const cameraService = {
  async getAll(): Promise<Camera[]> {
    ensureMockMode();
    return getCamerasMock();
  },

  async getById(id: string): Promise<Camera> {
    ensureMockMode();
    return getCameraByIdMock(id);
  },

  async create(input: AddCameraInput): Promise<Camera> {
    ensureMockMode();
    return createCameraMock(input);
  },

  async update(
    id: string,
    input: Partial<AddCameraInput>
  ): Promise<Camera> {
    ensureMockMode();
    return updateCameraMock(id, input);
  },

  async remove(id: string): Promise<void> {
    ensureMockMode();
    return deleteCameraMock(id);
  },
};
