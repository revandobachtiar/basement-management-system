
"use client";

import { useParkingData } from "@/hooks/useParkingData";
import type { AddBasementInput } from "@/types/parking";

export function useBasement() {
  const {
    data: { basements },
    addBasement,
    updateBasementCount,
  } = useParkingData();

  return {
    basements,
    addBasement: (basement: AddBasementInput) =>
      addBasement(basement),
    updateBasementCount,
  };
}
