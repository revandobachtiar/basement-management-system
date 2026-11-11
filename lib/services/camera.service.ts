
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

async function apiRequest<T>(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<T> {
  const response = await fetch(input, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
  });

  if (!response.ok) {
    const errorData = (await response.json().catch(() => ({}))) as {
      message?: string;
    };
    throw new Error(
      errorData.message || `Gagal memanggil API kamera: ${response.status}`
    );
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

export const cameraService = {
  async getAll(): Promise<Camera[]> {
    if (USE_MOCK) {
      return getCamerasMock();
    }
    return apiRequest<Camera[]>("/api/cameras");
  },

  async getById(id: string): Promise<Camera> {
    if (USE_MOCK) {
      return getCameraByIdMock(id);
    }
    return apiRequest<Camera>(`/api/cameras/${id}`);
  },

  async create(input: AddCameraInput): Promise<Camera> {
    if (USE_MOCK) {
      return createCameraMock(input);
    }
    return apiRequest<Camera>("/api/cameras", {
      method: "POST",
      body: JSON.stringify(input),
    });
  },

  async update(
    id: string,
    input: Partial<AddCameraInput>
  ): Promise<Camera> {
    if (USE_MOCK) {
      return updateCameraMock(id, input);
    }
    return apiRequest<Camera>(`/api/cameras/${id}`, {
      method: "PUT",
      body: JSON.stringify(input),
    });
  },

  async remove(id: string): Promise<void> {
    if (USE_MOCK) {
      return deleteCameraMock(id);
    }
    await apiRequest<void>(`/api/cameras/${id}`, {
      method: "DELETE",
    });
  },
};

