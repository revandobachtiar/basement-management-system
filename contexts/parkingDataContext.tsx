
"use client";

import {
  createContext,
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  mockCameras,
  mockBasements,
  mockLines,
  mockLineInOuts,
  mockContexts,
} from "@/mock/mock";

import type {
  Camera,
  Basement,
  Line,
  LineInOut,
  ParkingContext as ParkingContextType,
} from "@/types/parking";

export type ParkingDataState = {
  cameras: Camera[];
  basements: Basement[];
  lines: Line[];
  lineInOuts: LineInOut[];
  contexts: ParkingContextType[];
};

export type ParkingDataContextValue = {
  data: ParkingDataState;

  addCamera: (camera: Omit<Camera, "id">) => void;
  deleteCamera: (id: string) => void;
  updateCamera: (id: string, updates: Partial<Camera>) => void;

  addBasement: (
    basement: Omit<Basement, "id" | "currentCount">
  ) => void;
  updateBasementCount: (id: string, count: number) => void;

  addLine: (line: Omit<Line, "id">) => void;

  addLineInOut: (
    item: Omit<LineInOut, "id">
  ) => void;
  deleteLineInOut: (id: string) => void;

  addContext: (
    item: Omit<ParkingContextType, "id">
  ) => void;
};

export const ParkingDataContext =
  createContext<ParkingDataContextValue | undefined>(
    undefined
  );

const initialBasements: Basement[] = [
  {
    id: "basement-p1",
    name: "P1",
    capacity: 150,
    currentCount: 0,
  },
  {
    id: "basement-p2",
    name: "P2",
    capacity: 200,
    currentCount: 0,
  },
];

const initialLines: Line[] = [
  {
    id: "line-1",
    name: "Line 1",
    direction: "both",
    isActive: true,
  },
  {
    id: "line-2",
    name: "Line 2",
    direction: "both",
    isActive: true,
  },
];

export function ParkingDataProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [cameras, setCameras] = useState<Camera[]>(
    () => mockCameras.map((item) => ({ ...item }))
  );

  const [basements, setBasements] = useState<Basement[]>(
    () => mockBasements.map((item) => ({ ...item }))
  );

  const [lines, setLines] = useState<Line[]>(
    () => mockLines.map((item) => ({ ...item }))
  );

  const [lineInOuts, setLineInOuts] = useState<LineInOut[]>(
    () => mockLineInOuts.map((item) => ({ ...item }))
  );

  const [contexts, setContexts] = useState<ParkingContextType[]>(
    () => mockContexts.map((item) => ({ ...item }))
  );

  // CAMERA
  const addCamera = useCallback(
    (camera: Omit<Camera, "id">) => {
      setCameras((previous) => [
        ...previous,
        { ...camera, id: crypto.randomUUID() },
      ]);
    },
    []
  );

  const deleteCamera = useCallback((id: string) => {
    setCameras((previous) =>
      previous.filter((item) => item.id !== id)
    );
  }, []);

  const updateCamera = useCallback(
    (id: string, updates: Partial<Camera>) => {
      setCameras((previous) =>
        previous.map((item) =>
          item.id === id ? { ...item, ...updates } : item
        )
      );
    },
    []
  );

  // BASEMENT
  const addBasement = useCallback(
    (basement: Omit<Basement, "id" | "currentCount">) => {
      setBasements((previous) => [
        ...previous,
        {
          ...basement,
          id: crypto.randomUUID(),
          currentCount: 0,
        },
      ]);
    },
    []
  );

  // LINE
  const addLine = useCallback((line: Omit<Line, "id">) => {
    setLines((previous) => [
      ...previous,
      { ...line, id: crypto.randomUUID() },
    ]);
  }, []);

  // LINE IN/OUT
  const addLineInOut = useCallback(
    (item: Omit<LineInOut, "id">) => {
      setLineInOuts((previous) => [
        ...previous,
        { ...item, id: crypto.randomUUID() },
      ]);
    },
    []
  );

  const deleteLineInOut = useCallback((id: string) => {
    setLineInOuts((previous) =>
      previous.filter((item) => item.id !== id)
    );

    setContexts((previous) =>
      previous.filter(
        (item) => item.lineInOutBasementId !== id
      )
    );
  }, []);

  // CONTEXT
  const addContext = useCallback(
    (item: Omit<ParkingContextType, "id">) => {
      setContexts((previous) => [
        ...previous,
        { ...item, id: crypto.randomUUID() },
      ]);
    },
    []
  );
  const updateBasementCount = useCallback(
    (id: string, count: number) => {
      setBasements((previous) =>
        previous.map((basement) =>
          basement.id === id
            ? { ...basement, currentCount: count }
            : basement
        )
      );
    },
    []
  );

  const value = useMemo<ParkingDataContextValue>(
    () => ({
      data: {
        cameras,
        basements,
        lines,
        lineInOuts,
        contexts,
      },

      addCamera,
      deleteCamera,
      updateCamera,

      addBasement,
      addLine,

      addLineInOut,
      deleteLineInOut,

      addContext,
      updateBasementCount,
    }),
    [
      cameras,
      basements,
      lines,
      lineInOuts,
      contexts,
      addCamera,
      deleteCamera,
      updateCamera,
      addBasement,
      addLine,
      addLineInOut,
      deleteLineInOut,
      addContext,
      updateBasementCount,
    ]
  );

  return (
    <ParkingDataContext.Provider value={value}>
      {children}
    </ParkingDataContext.Provider>
  );
}
