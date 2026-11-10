
"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useBasement } from "@/hooks/useBasement";

const basementColors = [
  "bg-blue-500",
  "bg-violet-500",
  "bg-teal-500",
  "bg-orange-500",
  "bg-cyan-500",
];

export function BasementStatusRow() {
  const {
    basements,
    isLoading,
    error,
  } = useBasement();

  if (isLoading) {
    return <p className="text-sm text-slate-500">Memuat status Basement...</p>;
  }

  if (error) {
    return <p className="text-sm text-red-600">Gagal memuat status Basement.</p>;
  }

  if (basements.length === 0) {
    return <p className="text-sm text-slate-500">Belum ada Basement terdaftar.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {basements.map((basement, index) => {
        const percentage =
          basement.capacity > 0
            ? Math.min(
                100,
                (basement.currentCount / basement.capacity) * 100
              )
            : 0;

        const available = Math.max(
          0,
          basement.capacity - basement.currentCount
        );

        return (
          <Card
            key={basement.id}
            className="border-slate-200 bg-white shadow-sm"
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between gap-2">
                <CardTitle className="text-base font-bold text-slate-800">
                  {basement.name}
                </CardTitle>

                <span className="text-xs font-medium text-slate-500">
                  {basement.currentCount} / {basement.capacity} kendaraan
                </span>
              </div>
            </CardHeader>

            <CardContent>
              <div className="flex items-center gap-3">
                <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full transition-all ${
                      basementColors[index % basementColors.length]
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                <span className="w-12 text-right text-sm font-bold text-slate-900">
                  {percentage.toFixed(1)}%
                </span>
              </div>

              <div className="mt-3 flex justify-between text-xs text-slate-400">
                <span>Tersedia: {available} slot</span>
                <span>Keterisian</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
