
"use client";

import { useContext } from "react";
import { ParkingDataContext } from "@/contexts/parkingDataContext";

export function useParkingData() {
  const context = useContext(ParkingDataContext);

  if (!context) {
    throw new Error(
      "useParkingData harus digunakan di dalam ParkingDataProvider."
    );
  }

  return context;
}
