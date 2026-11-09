
"use client";

import useSWR from "swr";
import { useCallback } from "react";

import { lineInOutService } from "@/lib/services/lineInOut.service";
import type { AddLineInOutInput } from "@/types/parking";

const LINE_IN_OUT_KEY = "/line-in-out-basement";

export function useLineInOut() {
  const {
    data: lineInOuts = [],
    error,
    isLoading,
    mutate,
  } = useSWR(
    LINE_IN_OUT_KEY,
    () => lineInOutService.getAll(), {
      revalidateOnFocus: true,
    revalidateOnReconnect: true,
    shouldRetryOnError: true,
    errorRetryCount: 3,
    dedupingInterval: 2000,
    }
  );

  const addLineInOut = useCallback(
    async (input: AddLineInOutInput) => {
      const result = await lineInOutService.create(input);
      await mutate();
      return result;
    },
    [mutate]
  );

  const updateLineInOut = useCallback(
    async (
      id: string,
      input: AddLineInOutInput
    ) => {
      const result = await lineInOutService.update(id, input);
      await mutate();
      return result;
    },
    [mutate]
  );

  const deleteLineInOut = useCallback(
    async (id: string) => {
      await lineInOutService.remove(id);
      await mutate();
    },
    [mutate]
  );

  const getLineInOutById = useCallback(
    (id: string) => lineInOutService.getById(id),
    []
  );

  const refreshLineInOuts = useCallback(
    () => mutate(),
    [mutate]
  );

  return {
    lineInOuts,
    error,
    isLoading,
    addLineInOut,
    updateLineInOut,
    deleteLineInOut,
    getLineInOutById,
    refreshLineInOuts,
  };
}
