"use client"

import { useMemo, useState } from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  ArrowDownToLine,
  ArrowUpFromLine,
} from "lucide-react"

interface ActivitySummary {
  totalIn: number
  totalOut: number
}

interface BasementOption {
  id: string
  name: string
}

interface TodayActivityCardProps {
  basements: BasementOption[]
  data?: {
    building?: ActivitySummary
    byBasement?: Record<string, ActivitySummary>
  }
}

export function TodayActivityCard({
  basements,
  data,
}: TodayActivityCardProps) {
  const [selectedBasement, setSelectedBasement] = useState("building")

  const activity = useMemo<ActivitySummary>(() => {
    if (selectedBasement === "building") {
      return data?.building ?? {
        totalIn: 0,
        totalOut: 0,
      }
    }

    return data?.byBasement?.[selectedBasement] ?? {
      totalIn: 0,
      totalOut: 0,
    }
  }, [data, selectedBasement])

  const totalIn = activity.totalIn
  const totalOut = activity.totalOut

  const difference = totalIn - totalOut
  const totalActivity = totalIn + totalOut

  const inPercentage =
    totalActivity > 0 ? (totalIn / totalActivity) * 100 : 0

  const outPercentage =
    totalActivity > 0 ? (totalOut / totalActivity) * 100 : 0

  const selectedBasementName =
    selectedBasement === "building"
      ? "Seluruh Gedung"
      : basements.find((item) => item.id === selectedBasement)?.name ??
        "Basement"

  return (
    <Card className="border-slate-200 bg-white shadow-sm">
      <CardHeader>
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
          <div>
            <CardTitle className="text-lg font-bold text-[#202B40]">
              Aktivitas Hari Ini
            </CardTitle>

            <CardDescription>
              Rekap kendaraan masuk dan keluar
            </CardDescription>
          </div>

          {/* Filter Basement */}
          <Select
            value={selectedBasement}
            onValueChange={setSelectedBasement}
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Pilih basement" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="building">
                Seluruh Gedung
              </SelectItem>

              {basements.map((basement) => (
                <SelectItem key={basement.id} value={basement.id}>
                  {basement.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="grid grid-cols-2 gap-3">
          {/* IN */}
          <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-4">
            <div className="flex items-center gap-2 text-blue-600">
              <ArrowDownToLine className="size-4" />
              <span className="text-sm font-medium">
                Kendaraan Masuk
              </span>
            </div>

            <p className="mt-3 text-3xl font-bold text-[#202B40]">
              {totalIn.toLocaleString("id-ID")}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              IN hari ini
            </p>
          </div>

          {/* OUT */}
          <div className="rounded-xl border border-orange-100 bg-orange-50/60 p-4">
            <div className="flex items-center gap-2 text-orange-600">
              <ArrowUpFromLine className="size-4" />
              <span className="text-sm font-medium">
                Kendaraan Keluar
              </span>
            </div>

            <p className="mt-3 text-3xl font-bold text-[#202B40]">
              {totalOut.toLocaleString("id-ID")}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              OUT hari ini
            </p>
          </div>
        </div>

        {/* Comparison */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-medium text-slate-500">
            <span>Perbandingan aktivitas</span>
            <span>
              {totalActivity.toLocaleString("id-ID")} kendaraan
            </span>
          </div>

          <div className="flex h-3 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full bg-blue-500 transition-all"
              style={{ width: `${inPercentage}%` }}
            />

            <div
              className="h-full bg-orange-500 transition-all"
              style={{ width: `${outPercentage}%` }}
            />
          </div>
        </div>

        {/* Net Difference */}
        <div className="flex items-center justify-between rounded-lg bg-slate-50 p-3">
          <div>
            <p className="text-sm font-semibold text-slate-700">
              Selisih Kendaraan
            </p>

            <p className="text-xs text-slate-500">
              Masuk dikurangi keluar
            </p>
          </div>

          <span
            className={`text-lg font-bold ${
              difference >= 0
                ? "text-emerald-600"
                : "text-red-600"
            }`}
          >
            {difference > 0 ? "+" : ""}
            {difference.toLocaleString("id-ID")}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}