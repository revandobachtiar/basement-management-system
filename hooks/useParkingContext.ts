
"use client";

import { useParkingData } from "@/hooks/useParkingData";
import type { AddContextInput } from "@/types/parking";

export function useParkingContext() {
  const {
    data: { contexts },
    addContext,
  } = useParkingData();

  return {
    contexts,
    addContext: (item: AddContextInput) =>
      addContext(item),
  };
}
