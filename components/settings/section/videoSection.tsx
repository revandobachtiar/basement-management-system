"use client";

"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import Hls from "hls.js";

import { useParkingData } from "@/hooks/useParkingData";

import type {
  Camera,
  StreamType,
} from "@/types/parking";

type StreamPreviewProps = {
  url: string;
  type: StreamType;
};

function StreamPreview({ url, type }: StreamPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video || !url) return;

    let hls: Hls | null = null;

    if (type === "HLS") {
      // Gunakan native HLS jika browser mendukungnya.
      if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = url;
      } else if (Hls.isSupported()) {
        hls = new Hls();
        hls.loadSource(url);
        hls.attachMedia(video);

        hls.on(Hls.Events.ERROR, (_event, data) => {
          if (data.fatal) {
            console.error("HLS playback error:", data);
          }
        });
      } else {
        console.error("Browser tidak mendukung pemutaran HLS.");
      }
    }

    if (type === "MP4") {
      video.src = url;
    }

    return () => {
      if (hls) {
        hls.destroy();
      }

      video.pause();
      video.removeAttribute("src");
      video.load();
    };
  }, [url, type]);

  if (!url) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-lg bg-slate-900 text-sm text-slate-400">
        Masukkan streaming URL untuk melihat preview
      </div>
    );
  }

  if (type === "MJPEG") {
    return (
      <div className="flex aspect-video items-center justify-center overflow-hidden rounded-lg bg-slate-900">
        <img
          src={url}
          alt="CCTV streaming preview"
          className="h-full w-full object-contain"
          onError={(event) => {
            event.currentTarget.style.display = "none";
          }}
        />
      </div>
    );
  }

  return (
    <div className="relative aspect-video overflow-hidden rounded-lg bg-slate-900">
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

export function VideoSection() {
  const { data, addCamera, deleteCamera } = useParkingData();

  const [name, setName] = useState("");
  const [streamingUrl, setStreamingUrl] = useState("");
  const [streamType, setStreamType] = useState<StreamType>("HLS");
  const [basementId, setBasementId] = useState("");
  const [lineId, setLineId] = useState("");
  const [direction, setDirection] = useState<"IN" | "OUT">("IN");
  const [error, setError] = useState("");

  const isValidHttpUrl = (value: string) => {
    try {
      const url = new URL(value);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch {
      return false;
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Nama kamera wajib diisi.");
      return;
    }

    if (!isValidHttpUrl(streamingUrl)) {
      setError("Masukkan URL streaming HTTP atau HTTPS yang valid.");
      return;
    }

    if (!basementId || !lineId) {
      setError("Basement dan Line wajib dipilih.");
      return;
    }

    addCamera({
      name: name.trim(),
      streamingUrl: streamingUrl.trim(),
      streamType,
      basementId,
      lineId,
      direction,
      isActive: true,
    });

    setName("");
    setStreamingUrl("");
    setStreamType("HLS");
    setBasementId("");
    setLineId("");
    setDirection("IN");
  };

  const getBasementName = (id: string) =>
    data.basements.find((item) => item.id === id)?.name ?? "-";

  const getLineName = (id: string) =>
    data.lines.find((item) => item.id === id)?.name ?? "-";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold text-slate-900">
          Video Streaming Configuration
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Tambahkan dan kelola sumber video CCTV untuk monitoring kendaraan.
        </p>
      </div>

      {/* Add Camera Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-xl border border-slate-200 bg-white p-5"
      >
        <div>
          <h3 className="font-semibold text-slate-800">
            Add CCTV Camera
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Masukkan informasi kamera dan alamat streaming.
          </p>
        </div>

        {/* Camera Name */}
        <div className="space-y-2">
          <label
            htmlFor="cameraName"
            className="text-sm font-medium text-slate-700"
          >
            Camera Name
          </label>
          <input
            id="cameraName"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Contoh: CCTV Basement P1 Entrance"
            className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-100"
          />
        </div>

        {/* Streaming URL */}
        <div className="space-y-2">
          <label
            htmlFor="streamingUrl"
            className="text-sm font-medium text-slate-700"
          >
            HTTP Streaming URL
          </label>
          <input
            id="streamingUrl"
            type="url"
            value={streamingUrl}
            onChange={(event) => setStreamingUrl(event.target.value)}
            placeholder="http://192.168.1.100:8080/stream/index.m3u8"
            className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-100"
          />
          <p className="text-xs text-slate-400">
            Gunakan URL streaming HTTP atau HTTPS yang dapat diakses oleh browser.
          </p>
        </div>

        {/* Stream Type */}
        <div className="space-y-2">
          <label
            htmlFor="streamType"
            className="text-sm font-medium text-slate-700"
          >
            Streaming Format
          </label>
          <select
            id="streamType"
            value={streamType}
            onChange={(event) =>
              setStreamType(event.target.value as StreamType)
            }
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-slate-500"
          >
            <option value="HLS">HLS (.m3u8)</option>
            <option value="MJPEG">MJPEG</option>
            <option value="MP4">MP4</option>
          </select>
        </div>

        {/* Basement and Line */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label
              htmlFor="basement"
              className="text-sm font-medium text-slate-700"
            >
              Basement
            </label>
            <select
              id="basement"
              value={basementId}
              onChange={(event) => setBasementId(event.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-slate-500"
            >
              <option value="">Select Basement</option>
              {data.basements.map((basement) => (
                <option key={basement.id} value={basement.id}>
                  {basement.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="line"
              className="text-sm font-medium text-slate-700"
            >
              Line
            </label>
            <select
              id="line"
              value={lineId}
              onChange={(event) => setLineId(event.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-slate-500"
            >
              <option value="">Select Line</option>
              {data.lines.map((line) => (
                <option key={line.id} value={line.id}>
                  {line.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Direction */}
        <div className="space-y-2">
          <label
            htmlFor="direction"
            className="text-sm font-medium text-slate-700"
          >
            Direction
          </label>
          <select
            id="direction"
            value={direction}
            onChange={(event) =>
              setDirection(event.target.value as "IN" | "OUT")
            }
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-slate-500"
          >
            <option value="IN">IN</option>
            <option value="OUT">OUT</option>
          </select>
        </div>

        {/* Preview */}
        <div className="space-y-2">
          <div>
            <h4 className="text-sm font-medium text-slate-700">
              Video Preview
            </h4>
            <p className="text-xs text-slate-400">
              Preview menggunakan URL dan format yang dimasukkan.
            </p>
          </div>

          <StreamPreview url={streamingUrl} type={streamType} />
        </div>

        {/* Error */}
        {error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
            {error}
          </p>
        )}

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700"
          >
            Add Camera
          </button>
        </div>
      </form>

      {/* Camera List */}
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-slate-800">
            Registered Cameras
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Daftar kamera yang telah dikonfigurasi.
          </p>
        </div>

        {data.cameras.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 px-5 py-10 text-center">
            <p className="text-sm font-medium text-slate-600">
              Belum ada kamera terdaftar
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Tambahkan kamera melalui form di atas.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            {data.cameras.map((camera: Camera) => (
              <div
                key={camera.id}
                className="overflow-hidden rounded-xl border border-slate-200 bg-white"
              >
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="font-semibold text-slate-800">
                        {camera.name}
                      </h4>
                      <p className="mt-1 text-xs text-slate-500">
                        {getBasementName(camera.basementId)} ·{" "}
                        {getLineName(camera.lineId)} · {camera.direction}
                      </p>
                    </div>

                    <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                      Active
                    </span>
                  </div>

                  <div className="mt-4">
                    <StreamPreview
                      url={camera.streamingUrl}
                      type={camera.streamType}
                    />
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-3">
                    <span className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-600">
                      {camera.streamType}
                    </span>

                    <button
                      type="button"
                      onClick={() => deleteCamera(camera.id)}
                      className="text-sm font-medium text-red-600 transition hover:text-red-800"
                    >
                      Delete Camera
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}