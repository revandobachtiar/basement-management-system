
"use client";

import useSWR from "swr";
import { useCallback } from "react";

import { basementService } from "@/lib/services/basement.service";
import type { CreateBasementRequest } from "@/types/parking";
import { updateBasementMock } from "@/lib/services/basement.mock.service";

const BASEMENT_KEY = "/basement";

export function useBasement() {
  const {
    data: basements = [],
    error,
    isLoading,
    mutate,
  } = useSWR("/basement", () => basementService.getAll(), {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    shouldRetryOnError: true,
    errorRetryCount: 3,
    dedupingInterval: 2000,
  });

  const addBasement = useCallback(
    async (input: CreateBasementRequest) => {
      const result = await basementService.create(input);
      await mutate();
      return result;
    },
    [mutate]
  );
  const updateBasementCount = useCallback(
    async (id: string, count: number) => {
      const result = await basementService.updateCurrentCount(
        id,
        count
      );

      await mutate();

      return result;
    },
    [mutate]
  );

  const updateBasement = useCallback(
    async (
      id: string,
      input: CreateBasementRequest
    ) => {
      const result = await basementService.update(id, input);
      await mutate();
      return result;
    },
    [mutate]
  );

  const refreshBasements = useCallback(
    () => mutate(),
    [mutate]
  );

  return {
    basements,
    error,
    isLoading,
    addBasement,
    updateBasementCount,
    updateBasement,
    refreshBasements,
  };
}
