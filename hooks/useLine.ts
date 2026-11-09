
"use client";

import useSWR from "swr";
import { useCallback } from "react";

import { lineService } from "@/lib/services/line.service";
import type { AddLineInput } from "@/types/parking";

const LINE_KEY = "/line";

export function useLine() {
  const {
    data: lines = [],
    error,
    isLoading,
    mutate,
  } = useSWR(
    LINE_KEY,
    () => lineService.getAll(), {
      revalidateOnFocus: true,
    revalidateOnReconnect: true,
    shouldRetryOnError: true,
    errorRetryCount: 3,
    dedupingInterval: 2000,
    }
  );

  const addLine = useCallback(
    async (input: AddLineInput) => {
      const result = await lineService.create(input);
      await mutate();
      return result;
    },
    [mutate]
  );

  const updateLine = useCallback(
    async (
      id: string,
      input: Partial<AddLineInput>
    ) => {
      const result = await lineService.update(id, input);
      await mutate();
      return result;
    },
    [mutate]
  );

  const deleteLine = useCallback(
    async (id: string) => {
      await lineService.remove(id);
      await mutate();
    },
    [mutate]
  );

  const refreshLines = useCallback(
    () => mutate(),
    [mutate]
  );

  return {
    lines,
    error,
    isLoading,
    addLine,
    updateLine,
    deleteLine,
    refreshLines,
  };
}
