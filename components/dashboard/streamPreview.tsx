"use client";

import { useEffect, useRef } from "react";
import Hls from "hls.js";

import type { StreamType } from "@/types/parking";

type StreamPreviewProps = {
  url: string;
  type: StreamType;
};

export default function StreamPreview({
  url,
  type,
}: StreamPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video || !url || type === "MJPEG") return;

    let hls: Hls | null = null;

    if (type === "HLS") {
      if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = url;
        video.play().catch((err) =>
          console.warn("Autoplay blocked or failed:", err)
        );
      } else if (Hls.isSupported()) {
        hls = new Hls();
        hls.loadSource(url);
        hls.attachMedia(video);

        hls.on(Hls.Events.ERROR, (_event, data) => {
          if (data.fatal) {
            console.error("HLS playback error:", data);
          }
        });

        video.play().catch((err) =>
          console.warn("Autoplay blocked or failed:", err)
        );
      }
    }

    if (type === "MP4") {
      video.src = url;
      video.play().catch((err) =>
        console.warn("Autoplay blocked or failed:", err)
      );
    }

    return () => {
      hls?.destroy();
      video.pause();
      video.removeAttribute("src");
      video.load();
    };
  }, [url, type]);

  if (!url) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-lg bg-slate-900 text-sm text-slate-400">
        Streaming URL belum tersedia
      </div>
    );
  }

  if (type === "MJPEG") {
    return (
      <div className="aspect-video overflow-hidden rounded-lg bg-slate-900">
        <img
          src={url}
          alt="CCTV streaming"
          className="h-full w-full object-contain"
        />
      </div>
    );
  }

  return (
    <div className="aspect-video overflow-hidden rounded-lg bg-slate-900">
      <video
        ref={videoRef}
        controls
        autoPlay
        muted
        playsInline
        className="h-full w-full object-contain"
      />
    </div>
  );
}