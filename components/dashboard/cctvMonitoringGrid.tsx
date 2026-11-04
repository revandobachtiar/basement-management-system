"use client";

import { useCamera } from "@/hooks/useCamera";
import { useLine } from "@/hooks/useLine";
import { useBasement } from "@/hooks/useBasement";
import StreamPreview from "@/components/dashboard/streamPreview";

export function CctvMonitoringGrid() {
  const { cameras } = useCamera();
  const { lines } = useLine();
  const { basements } = useBasement();

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {cameras.map((camera) => {
        const line = lines.find(
          (item) => item.id === camera.lineId
        );

        const basement = basements.find(
          (item) => item.id === camera.basementId
        );

        return (
          <div
            key={camera.id}
            className="overflow-hidden rounded-xl border border-slate-200 bg-white"
          >
            <div className="p-4">
              <h3 className="font-semibold text-slate-800">
                {camera.name}
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                {basement?.name ?? "-"} · {line?.name ?? "-"} ·{" "}
                {camera.direction}
              </p>

              <div className="mt-4">
                <StreamPreview
                  url={camera.streamingUrl}
                  type={camera.streamType}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}