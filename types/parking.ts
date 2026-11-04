
export type StreamType = "HLS" | "MJPEG" | "MP4";

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
};

export type Line = {
  id: string;
  name: string;
  direction: "both";
  isActive?: boolean;
};

export type LineInOut = {
  id: string;
  name: string;
  lineId: string;
  inToBasementId: string;
  outToBasementId: string;
};

export type ParkingContext = {
  id: string;
  lineInOutBasementId: string;
  context: "IN" | "OUT";
  apply: "INCREASE" | "REDUCE";
};

export type basementCountUpdate = {
  basementId: string;
  count: number;
};

// Input Types

export type AddCameraInput = Omit<Camera, "id">;

export type AddBasementInput = Omit<
  Basement,
  "id" | "currentCount"
>;

export type AddLineInput = Omit<Line, "id">;

export type AddLineInOutInput = Omit<LineInOut, "id">;

export type AddContextInput = Omit<ParkingContext, "id">;

export type UpdateBasementCountInput = Omit<basementCountUpdate, "basementId"> & {
  basementId: string;
};
