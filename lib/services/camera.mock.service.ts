
import { mockCameras } from "@/mock/mockData";

import type { Camera } from "@/types/parking";

export type AddCameraInput = Omit<Camera, "id">;

export function getCamerasMock(): Camera[] {
  return mockCameras.map((item) => ({ ...item })) as Camera[];
}

export function getCameraByIdMock(id: string): Camera {
  const camera = mockCameras.find((item) => item.id === id);

  if (!camera) {
    throw new Error("Camera tidak ditemukan");
  }

  return { ...camera } as Camera;
}

export function createCameraMock(input: AddCameraInput): Camera {
  const newCamera = {
    id: `camera-${Date.now()}`,
    ...input,
  };

  mockCameras.push(newCamera);

  return { ...newCamera } as Camera;
}

export function updateCameraMock(
  id: string,
  input: Partial<AddCameraInput>
): Camera {
  const index = mockCameras.findIndex((item) => item.id === id);

  if (index === -1) {
    throw new Error("Camera tidak ditemukan");
  }

  mockCameras[index] = {
    ...mockCameras[index],
    ...input,
  };

  return { ...mockCameras[index] } as Camera;
}

export function deleteCameraMock(id: string): void {
  const index = mockCameras.findIndex((item) => item.id === id);

  if (index === -1) {
    throw new Error("Camera tidak ditemukan");
  }

  mockCameras.splice(index, 1);
}
