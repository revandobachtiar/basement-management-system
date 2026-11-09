
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

// Basement

export type Basement = {
  id: string;
  name: string;
  capacity: number;
  currentCount: number;
  available: number;
  isFull: boolean;
  updatedAt: string;
};

// Line

export type Line = {
  id: string;
  name: string;
  direction: "in" | "out" | "both";
  isActive: boolean;
};

// Line IN/OUT Basement

export type LineInOut = {
  id: string;
  lineId: string;
  inToBasementId: string | null;
  outToBasementId: string | null;
};


export type ParkingContext = {
  id: string;
  lineInOutBasementId: string;
  context: "IN" | "OUT";
  apply: "INCREASE" | "REDUCE";
};

// Basement Count Update
export type basementCountUpdate = {
  basementId: string;
  count: number;
};

// INPUT TYPES


export type AddCameraInput = Omit<Camera, "id">;

export type AddBasementInput = Pick<
  Basement,
  "name" | "capacity"
>;

export type AddLineInput = Omit<Line, "id">;

export type AddLineInOutInput = {
  lineId: string;
  inToBasementId: string;
  outToBasementId: string;
};

export type AddContextInput = Omit<ParkingContext, "id">;

export type UpdateBasementCountInput = basementCountUpdate;
