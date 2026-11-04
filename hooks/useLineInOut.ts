
"use client";

import { useParkingData } from "@/hooks/useParkingData";
import type { AddLineInOutInput } from "@/types/parking";

export function useLineInOut() {
  const {
    data: { lineInOuts },
    addLineInOut,
    deleteLineInOut,
  } = useParkingData();

  return {
    lineInOuts,
    addLineInOut: (item: AddLineInOutInput) =>
      addLineInOut(item),
    deleteLineInOut,
  };
}
