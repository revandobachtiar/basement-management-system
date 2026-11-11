


export type BasementResponse = {
  id: string;
  name: string;
  capacity: number;
  currentCount: number;
  available: number;
  isFull: boolean;
  updatedAt: string;
};

export type CreateBasementResponse = {
  id: string;
  name: string;
  capacity: number;
  currentCount: number;
};

export type LineResponse = {
  id: string;
  name: string;
  direction: "in" | "out" | "both";
  isActive: boolean;
};

export type LineInOutResponse = {
  id: string;
  name: string;
  lineId: string;
  inToBasement?: string;
  outToBasement?: string;
};

export type CreateLineInOutResponse = {
  id: string;
  lineId: string;
  inToBasementId?: string;
  outToBasementId?: string;
};


export const mockBasements: BasementResponse[] = [
  {
    id: "basement-p1",
    name: "Basement P1",
    capacity: 150,
    currentCount: 82,
    available: 68,
    isFull: false,
    updatedAt: "2026-11-09T10:30:00.000Z",
  },
  {
    id: "basement-p2",
    name: "Basement P2",
    capacity: 200,
    currentCount: 137,
    available: 63,
    isFull: false,
    updatedAt: "2026-11-09T10:30:00.000Z",
  },
  {
    id: "basement-p3",
    name: "Basement P3",
    capacity: 180,
    currentCount: 180,
    available: 0,
    isFull: true,
    updatedAt: "2026-11-09T10:30:00.000Z",
  },
];


export const mockLines: LineResponse[] = [
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
  {
    id: "line-3",
    name: "Line 3",
    direction: "both",
    isActive: true,
  },
  {
    id: "line-4",
    name: "Line 4",
    direction: "both",
    isActive: true,
  },
  {
    id: "line-5",
    name: "Line 5",
    direction: "in",
    isActive: true,
  },
  {
    id: "line-6",
    name: "Line 6",
    direction: "out",
    isActive: false,
  },
];


export const mockLineInOuts: LineInOutResponse[] = [
  {
    id: "mapping-1",
    name: "Line 1 – Basement P1 ↔ Basement P1",
    lineId: "line-1",
    inToBasement: "Basement P1",
    outToBasement: "Basement P1",
  },
  {
    id: "mapping-2",
    name: "Line 2 – Basement P2 ↔ Basement P2",
    lineId: "line-2",
    inToBasement: "Basement P2",
    outToBasement: "Basement P2",
  },
  {
    id: "mapping-3",
    name: "Line 3 – Basement P2 → Basement P1",
    lineId: "line-3",
    inToBasement: "Basement P2",
    outToBasement: "Basement P1",
  },
  {
    id: "mapping-4",
    name: "Line 4 – Basement P3 ↔ Basement P3",
    lineId: "line-4",
    inToBasement: "Basement P3",
    outToBasement: "Basement P3",
  },
  {
    id: "mapping-5",
    name: "Line 5 – Basement P1 →",
    lineId: "line-5",
    inToBasement: "Basement P1",
  },
  {
    id: "mapping-6",
    name: "Line 6 – → Basement P2",
    lineId: "line-6",
    outToBasement: "Basement P2",
  },
];


export const mockCreateBasementResponse: CreateBasementResponse = {
  id: "basement-p4",
  name: "Basement P4",
  capacity: 120,
  currentCount: 0,
};


export const mockCreateLineInOutResponse: CreateLineInOutResponse = {
  id: "mapping-7",
  lineId: "line-1",
  inToBasementId: "basement-p1",
  outToBasementId: "basement-p1",
};



export type CameraMock = {
  id: string;
  name: string;
  streamingUrl: string;
  streamType: "HLS" | "MJPEG" | "MP4";
  basementId: string;
  lineId: string;
  direction: "IN" | "OUT";
  isActive: boolean;
};

export const mockCameras: CameraMock[] = [
  {
    id: "camera-1",
    name: "CCTV Entrance P1",
    streamingUrl: "https://example.com/stream/p1-in.m3u8",
    streamType: "HLS",
    basementId: "basement-p1",
    lineId: "line-1",
    direction: "IN",
    isActive: true,
  },
  {
    id: "camera-2",
    name: "CCTV Exit P1",
    streamingUrl: "https://example.com/stream/p1-out.m3u8",
    streamType: "HLS",
    basementId: "basement-p1",
    lineId: "line-1",
    direction: "OUT",
    isActive: true,
  },
  {
    id: "camera-3",
    name: "CCTV Entrance P2",
    streamingUrl: "https://example.com/stream/p2-in.m3u8",
    streamType: "HLS",
    basementId: "basement-p2",
    lineId: "line-2",
    direction: "IN",
    isActive: true,
  },
  {
    id: "camera-4",
    name: "CCTV Exit P2",
    streamingUrl: "https://example.com/stream/p2-out.m3u8",
    streamType: "HLS",
    basementId: "basement-p2",
    lineId: "line-2",
    direction: "OUT",
    isActive: true,
  },
  {
    id: "camera-5",
    name: "CCTV Entrance P3",
    streamingUrl: "https://example.com/stream/p3-in.m3u8",
    streamType: "HLS",
    basementId: "basement-p3",
    lineId: "line-4",
    direction: "IN",
    isActive: true,
  },
  {
    id: "camera-6",
    name: "CCTV Exit P3",
    streamingUrl: "https://example.com/stream/p3-out.m3u8",
    streamType: "HLS",
    basementId: "basement-p3",
    lineId: "line-4",
    direction: "OUT",
    isActive: false,
  },
];



export type ParkingContextMock = {
  id: string;
  lineInOutBasementId: string;
  context: "IN" | "OUT";
  apply: "INCREMENT" | "REDUCE";
};

export const mockParkingContexts: ParkingContextMock[] = [
  {
    id: "context-1",
    lineInOutBasementId: "mapping-1",
    context: "IN",
    apply: "INCREMENT",
  },
  {
    id: "context-2",
    lineInOutBasementId: "mapping-1",
    context: "OUT",
    apply: "REDUCE",
  },
  {
    id: "context-3",
    lineInOutBasementId: "mapping-2",
    context: "IN",
    apply: "INCREMENT",
  },
  {
    id: "context-4",
    lineInOutBasementId: "mapping-2",
    context: "OUT",
    apply: "REDUCE",
  },
  {
    id: "context-5",
    lineInOutBasementId: "mapping-3",
    context: "IN",
    apply: "INCREMENT",
  },
  {
    id: "context-6",
    lineInOutBasementId: "mapping-3",
    context: "OUT",
    apply: "REDUCE",
  },
];

