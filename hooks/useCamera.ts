
"use client";

import useSWR from "swr";
import { useCallback } from "react";

import { cameraService } from "@/lib/services/camera.service";
import type { AddCameraInput } from "@/lib/services/camera.mock.service";
import type { Camera } from "@/types/parking";

const CAMERA_KEY = "/camera";

export function useCamera() {
  const {
    data: cameras = [],
    error,
    isLoading,
    mutate,
  } = useSWR(
    CAMERA_KEY,
    () => cameraService.getAll()
  );

  const addCamera = useCallback(
    async (input: AddCameraInput) => {
      const result = await cameraService.create(input);
      await mutate();
      return result;
    },
    [mutate]
  );

  const updateCamera = useCallback(
    async (
      id: string,
      input: Partial<AddCameraInput>
    ) => {
      const result = await cameraService.update(id, input);
      await mutate();
      return result;
    },
    [mutate]
  );

  const deleteCamera = useCallback(
    async (id: string) => {
      await cameraService.remove(id);
      await mutate();
    },
    [mutate]
  );

  const getCameraById = useCallback(
    (id: string) => cameraService.getById(id),
    []
  );

  const refreshCameras = useCallback(
    () => mutate(),
    [mutate]
  );

  return {
    cameras,
    error,
    isLoading,
    addCamera,
    updateCamera,
    deleteCamera,
    getCameraById,
    refreshCameras,
  };
}
