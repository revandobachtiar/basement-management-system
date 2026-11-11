
"use client";

import useSWR from "swr";
import { useCallback } from "react";

import { parkingContextService } from "@/lib/services/parkingContext.service";
import type { CreateParkingContextRequest } from "@/types/parking";

const PARKING_CONTEXT_KEY = "/parking-context";

export function useParkingContext() {
  const {
    data: contexts = [],
    error,
    isLoading,
    mutate,
  } = useSWR(
    PARKING_CONTEXT_KEY,
    () => parkingContextService.getAll(),
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      shouldRetryOnError: true,
      errorRetryCount: 3,
      dedupingInterval: 2000,
    }
  );

  const addContext = useCallback(
    async (input: CreateParkingContextRequest) => {
      const result = await parkingContextService.create(input);
      await mutate();
      return result;
    },
    [mutate]
  );

  const updateContext = useCallback(
    async (id: string, input: CreateParkingContextRequest) => {
      const result = await parkingContextService.update(id, input);
      await mutate();
      return result;
    },
    [mutate]
  );

  const deleteContext = useCallback(
    async (id: string) => {
      await parkingContextService.delete(id);
      await mutate();
    },
    [mutate]
  );

  const getContextById = useCallback(
    (id: string) => parkingContextService.getById(id),
    []
  );

  const refreshContexts = useCallback(
    () => mutate(),
    [mutate]
  );

  return {
    contexts,
    error,
    isLoading,
    addContext,
    updateContext,
    deleteContext,
    getContextById,
    refreshContexts,
  };
}
