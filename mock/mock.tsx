
import type {
  Camera,
  Basement,
  Line,
  LineInOut,
  ParkingContext as ParkingContextType,
} from "@/types/parking";

// ==========================================
// MOCK DATA: BASEMENT
// ==========================================

export const mockBasements: Basement[] = [
  {
    id: "basement-p1",
    name: "P1",
    capacity: 150,
    currentCount: 86,
  },
  {
    id: "basement-p2",
    name: "P2",
    capacity: 2000,
    currentCount: 124,
  },
  {
    id: "basement-p3",
    name: "P3",
    capacity: 1000,
    currentCount: 50,
  },
];

// ==========================================
// MOCK DATA: LINE
// ==========================================

export const mockLines: Line[] = [
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

// ==========================================
// MOCK DATA: LINE IN / OUT
// ==========================================

export const mockLineInOuts: LineInOut[] = [
  {
    id: "line-in-out-1",
    name: "Line In Out 1",
    lineId: "line-1",
    inToBasementId: "basement-p1",
    outToBasementId: "basement-p2",
  },
];

// ==========================================
// MOCK DATA: CONTEXT
// ==========================================

export const mockContexts: ParkingContextType[] = [
  {
    id: "context-1",
    lineInOutBasementId: "line-in-out-1",
    context: "IN",
    apply: "INCREASE",
  },
  {
    id: "context-2",
    lineInOutBasementId: "line-in-out-1",
    context: "OUT",
    apply: "REDUCE",
  },
];

// ==========================================
// MOCK DATA: CAMERA
// ==========================================

export const mockCameras: Camera[] = [];
