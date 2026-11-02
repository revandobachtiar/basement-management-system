
import {
  Card,
  CardContent,
} from "@/components/ui/card"

import {
  Video,
  Wifi,
  WifiOff,
  ArrowDownToLine,
  ArrowUpFromLine,
} from "lucide-react"

interface Camera {
  id: number
  name: string
  area: string
  status: "online" | "offline"
  vehicleIn: number
  vehicleOut: number
  playbackUrl?: string
}

interface CctvMonitoringGridProps {
  cameras?: Camera[]
}

const defaultCameras: Camera[] = [
  {
    id: 1,
    name: "Line 1",
    area: "Akses P1",
    status: "online",
    vehicleIn: 12,
    vehicleOut: 8,
  },
  {
    id: 2,
    name: "Line 2",
    area: "Akses P1",
    status: "online",
    vehicleIn: 15,
    vehicleOut: 10,
  },
  {
    id: 3,
    name: "Line 3",
    area: "P1 ↔ P2",
    status: "online",
    vehicleIn: 10,
    vehicleOut: 9,
  },
  {
    id: 4,
    name: "Line 4",
    area: "P1 ↔ P2",
    status: "online",
    vehicleIn: 11,
    vehicleOut: 7,
  },
  {
    id: 5,
    name: "Line 5",
    area: "P2 ↔ P3",
    status: "online",
    vehicleIn: 9,
    vehicleOut: 8,
  },
  {
    id: 6,
    name: "Line 6",
    area: "P2 ↔ P3",
    status: "online",
    vehicleIn: 9,
    vehicleOut: 6,
  },
]

export function CctvMonitoringGrid({
  cameras = defaultCameras,
}: CctvMonitoringGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {cameras.map((camera) => (
        <Card
          key={camera.id}
          className="overflow-hidden border-slate-200 bg-white p-0 shadow-sm"
        >
          {/* Camera Preview */}
          <div className="relative aspect-video overflow-hidden bg-slate-900">
            {camera.playbackUrl && camera.status === "online" ? (
              <video
                src={camera.playbackUrl}
                autoPlay
                muted
                playsInline
                controls={false}
                className="size-full object-cover"
              />
            ) : (
              <div className="flex size-full flex-col items-center justify-center gap-2 bg-slate-800 text-slate-400">
                <Video className="size-10 opacity-60" />
                <span className="text-xs">
                  {camera.status === "online"
                    ? "Camera Preview"
                    : "Camera Offline"}
                </span>
              </div>
            )}

            {/* Camera Name */}
            <div className="absolute left-2 top-2 flex items-center gap-2 rounded-md bg-black/70 px-2.5 py-1.5 text-xs font-medium text-white">
              <span
                className={`size-2 rounded-full ${
                  camera.status === "online"
                    ? "bg-emerald-400"
                    : "bg-red-500"
                }`}
              />
              {camera.name} - {camera.area}
            </div>

            {/* Camera Status */}
            <div
              className={`absolute right-2 top-2 flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold text-white ${
                camera.status === "online"
                  ? "bg-emerald-600/90"
                  : "bg-red-600/90"
              }`}
            >
              {camera.status === "online" ? (
                <Wifi className="size-3" />
              ) : (
                <WifiOff className="size-3" />
              )}

              {camera.status === "online" ? "Online" : "Offline"}
            </div>

            {/* Vehicle Counter */}
            <div className="absolute bottom-2 left-2 flex gap-2">
              <span className="flex items-center gap-1 rounded-md bg-black/75 px-2 py-1 text-xs font-medium text-white">
                <ArrowDownToLine className="size-3 text-emerald-400" />
                IN: {camera.vehicleIn}
              </span>

              <span className="flex items-center gap-1 rounded-md bg-black/75 px-2 py-1 text-xs font-medium text-white">
                <ArrowUpFromLine className="size-3 text-orange-400" />
                OUT: {camera.vehicleOut}
              </span>
            </div>
          </div>

          {/* Camera Information */}
          <CardContent className="flex items-center justify-between p-3">
            <div>
              <p className="text-sm font-semibold text-slate-800">
                {camera.name}
              </p>
              <p className="text-xs text-slate-500">
                {camera.area}
              </p>
            </div>

            <span
              className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                camera.status === "online"
                  ? "bg-emerald-50 text-emerald-600"
                  : "bg-red-50 text-red-600"
              }`}
            >
              {camera.status === "online" ? "Connected" : "Disconnected"}
            </span>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

