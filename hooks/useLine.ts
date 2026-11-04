
"use client";

import { useParkingData } from "@/hooks/useParkingData";
import type { AddLineInput } from "@/types/parking";

export function useLine() {
  const {
    data: { lines },
    addLine,
  } = useParkingData();

  return {
    lines,
    addLine: (line: AddLineInput) => addLine(line),
  };
}
