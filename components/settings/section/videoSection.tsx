
"use client";

import { useState, type FormEvent } from "react";

import { useCamera } from "@/hooks/useCamera";
import { useBasement } from "@/hooks/useBasement";
import { useLine } from "@/hooks/useLine";

import StreamPreview from "@/components/dashboard/streamPreview";

import type { StreamType } from "@/types/parking";

export function VideoSection() {
  // CAMERA
  const {
    cameras,
    addCamera,
    deleteCamera,
    isLoading: cameraLoading,
    error: cameraError,
  } = useCamera();

  // BASEMENT
  const {
    basements,
    isLoading: basementLoading,
    error: basementError,
  } = useBasement();

  // LINE
  const {
    lines,
    isLoading: lineLoading,
    error: lineError,
  } = useLine();

  // FORM STATE
  const [name, setName] = useState("");
  const [streamingUrl, setStreamingUrl] = useState("");
  const [streamType, setStreamType] = useState<StreamType>("HLS");
  const [basementId, setBasementId] = useState("");
  const [lineId, setLineId] = useState("");
  const [direction, setDirection] = useState<"IN" | "OUT">("IN");

  // UI STATE
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const isLoading =
    cameraLoading || basementLoading || lineLoading;

  const hasError =
    cameraError || basementError || lineError;

  // VALIDATE STREAMING URL
  const isValidHttpUrl = (value: string): boolean => {
    try {
      const url = new URL(value);

      return (
        url.protocol === "http:" ||
        url.protocol === "https:"
      );
    } catch {
      return false;
    }
  };

  // ADD CAMERA
  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Nama kamera wajib diisi.");
      return;
    }

    if (!isValidHttpUrl(streamingUrl.trim())) {
      setError(
        "Masukkan URL streaming HTTP atau HTTPS yang valid."
      );
      return;
    }

    if (!basementId || !lineId) {
      setError("Basement dan Line wajib dipilih.");
      return;
    }

    try {
      setIsSaving(true);

      await addCamera({
        name: name.trim(),
        streamingUrl: streamingUrl.trim(),
        streamType,
        basementId,
        lineId,
        direction,
        isActive: true,
      });

      // RESET FORM
      setName("");
      setStreamingUrl("");
      setStreamType("HLS");
      setBasementId("");
      setLineId("");
      setDirection("IN");
    } catch (err) {
      console.error("Gagal menambahkan kamera:", err);
      setError("Gagal menambahkan kamera. Silakan coba kembali.");
    } finally {
      setIsSaving(false);
    }
  };

  // DELETE CAMERA
  const handleDelete = async (id: string) => {
    setError("");

    try {
      setDeletingId(id);

      await deleteCamera(id);
    } catch (err) {
      console.error("Gagal menghapus kamera:", err);
      setError("Gagal menghapus kamera. Silakan coba kembali.");
    } finally {
      setDeletingId(null);
    }
  };

  // GET BASEMENT NAME
  const getBasementName = (id: string) =>
    basements.find((item) => item.id === id)?.name ?? "-";

  // GET LINE NAME
  const getLineName = (id: string) =>
    lines.find((item) => item.id === id)?.name ?? "-";

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h2 className="text-lg font-semibold text-slate-900">
          Video Streaming Configuration
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Tambahkan dan kelola sumber video CCTV untuk monitoring kendaraan.
        </p>
      </div>

      {/* DATA ERROR */}
      {hasError && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          Gagal mengambil data konfigurasi. Periksa koneksi API atau konfigurasi mock.
        </div>
      )}

      {/* ADD CAMERA FORM */}
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

        {/* CAMERA NAME */}
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
            required
          />
        </div>

        {/* STREAMING URL */}
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
            required
          />

          <p className="text-xs text-slate-400">
            Gunakan URL streaming HTTP atau HTTPS yang dapat diakses oleh browser.
          </p>
        </div>

        {/* STREAM TYPE */}
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

        {/* BASEMENT AND LINE */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* BASEMENT */}
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
              disabled={basementLoading || basements.length === 0}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-slate-500 disabled:cursor-not-allowed disabled:bg-slate-100"
              required
            >
              <option value="">Select Basement</option>

              {basements.map((basement) => (
                <option key={basement.id} value={basement.id}>
                  {basement.name}
                </option>
              ))}
            </select>
          </div>

          {/* LINE */}
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
              disabled={lineLoading || lines.length === 0}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-slate-500 disabled:cursor-not-allowed disabled:bg-slate-100"
              required
            >
              <option value="">Select Line</option>

              {lines.map((line) => (
                <option key={line.id} value={line.id}>
                  {line.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* DIRECTION */}
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

        {/* VIDEO PREVIEW */}
        <div className="space-y-2">
          <div>
            <h4 className="text-sm font-medium text-slate-700">
              Video Preview
            </h4>

            <p className="text-xs text-slate-400">
              Preview menggunakan URL dan format yang dimasukkan.
            </p>
          </div>

          <StreamPreview
            url={streamingUrl.trim()}
            type={streamType}
          />
        </div>

        {/* FORM ERROR */}
        {error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
            {error}
          </p>
        )}

        {/* SUBMIT */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={
              isSaving ||
              isLoading ||
              basements.length === 0 ||
              lines.length === 0
            }
            className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Add Camera"}
          </button>
        </div>
      </form>

      {/* CAMERA LIST */}
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-slate-800">
            Registered Cameras
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Daftar kamera yang telah dikonfigurasi.
          </p>
        </div>

        {/* LOADING */}
        {cameraLoading ? (
          <div className="rounded-xl border border-slate-200 bg-white px-5 py-10 text-center">
            <p className="text-sm text-slate-500">
              Memuat daftar kamera...
            </p>
          </div>
        ) : cameras.length === 0 ? (
          /* EMPTY STATE */
          <div className="rounded-xl border border-dashed border-slate-300 px-5 py-10 text-center">
            <p className="text-sm font-medium text-slate-600">
              Belum ada kamera terdaftar
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Tambahkan kamera melalui form di atas.
            </p>
          </div>
        ) : (
          /* CAMERA CARDS */
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            {cameras.map((camera) => (
              <div
                key={camera.id}
                className="overflow-hidden rounded-xl border border-slate-200 bg-white"
              >
                <div className="p-4">
                  {/* CAMERA INFORMATION */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="font-semibold text-slate-800">
                        {camera.name}
                      </h4>

                      <p className="mt-1 text-xs text-slate-500">
                        {getBasementName(camera.basementId)} ·{" "}
                        {getLineName(camera.lineId)} ·{" "}
                        {camera.direction}
                      </p>
                    </div>

                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        camera.isActive
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {camera.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>

                  {/* CAMERA PREVIEW */}
                  <div className="mt-4">
                    <StreamPreview
                      url={camera.streamingUrl}
                      type={camera.streamType}
                    />
                  </div>

                  {/* CAMERA ACTION */}
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <span className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-600">
                      {camera.streamType}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleDelete(camera.id)}
                      disabled={deletingId === camera.id}
                      className="text-sm font-medium text-red-600 transition hover:text-red-800 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {deletingId === camera.id
                        ? "Deleting..."
                        : "Delete Camera"}
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
