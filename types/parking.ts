
export type StreamType = "HLS" | "MJPEG" | "MP4";

// Camera

export type Camera = {
  id: string;
  name: string;
  streamingUrl: string;
  streamType: StreamType;
  basementId: string;
  lineId: string;
  direction: "IN" | "OUT";
  isActive: boolean;
};

export type Basement = {
  id: string;
  name: string;
  capacity: number;
  currentCount: number;
  available: number;
  isFull: boolean;
  updatedAt: string;
};

export type CreateBasementRequest = {
  name: string;
  capacity: number;
};

export type UpdateBasementRequest = {
  id: string;
  name: string;
  capacity: number;
};

export type LineDirection = "in" | "out" | "both";

export type Line = {
  id: string;
  name: string;
  direction: LineDirection;
  isActive: boolean;
};

export type LineInOutBasement = {
  id: string;
  name: string;
  lineId: string;
  inToBasement: string;
  outToBasement: string;
};

export type CreateLineInOutBasementRequest = {
  name: string;
  lineId: string;
  inToBasementId: string;
  outToBasementId: string;
};

export type UpdateLineInOutBasementRequest =
  CreateLineInOutBasementRequest;

export type ParkingContext = {
  id: string;
  lineInOutBasementId: string;
  context: "IN" | "OUT";
  apply: "INCREMENT" | "REDUCE";
};

export type CreateParkingContextRequest = {
  lineInOutBasementId: string;
  context: "IN" | "OUT";
  apply: "INCREMENT" | "REDUCE";
};