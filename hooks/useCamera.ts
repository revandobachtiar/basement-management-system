"use client";

import { useParkingData } from "@/hooks/useParkingData";
import type { AddCameraInput, Camera } from "@/types/parking";

export function useCamera() {
  const {
    data: { cameras },
    addCamera,
    deleteCamera,
    updateCamera,
  } = useParkingData();

  return {
    cameras,
    addCamera: (camera: AddCameraInput) => addCamera(camera),
    deleteCamera,
    updateCamera: (id: string, updates: Partial<Camera>) =>
      updateCamera(id, updates),
  };
}
