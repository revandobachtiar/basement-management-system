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
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts"

type Period = "hourly" | "daily"

interface VehicleData {
  time: string
  in: number
  out: number
  total: number
  capacity: number
}

interface BasementOption {
  id: string
  name: string
}

interface VehicleChartCardProps {
  basements: BasementOption[]
  data?: {
    hourly?: VehicleData[]
    daily?: VehicleData[]
    byBasement?: Record<
      string,
      {
        hourly?: VehicleData[]
        daily?: VehicleData[]
      }
    >
  }
}

// HOURLY_DATA dan DAILY_DATA tetap menggunakan data mock yang sudah ada.

export function VehicleChartCard({
  basements,
  data,
}: VehicleChartCardProps) {
  const [period, setPeriod] = useState<Period>("hourly")
  const [selectedBasement, setSelectedBasement] = useState("building")

  const chartData = useMemo(() => {
    // Seluruh gedung
    if (selectedBasement === "building") {
      if (period === "hourly") {
        return data?.hourly ?? HOURLY_DATA
      }

      return data?.daily ?? DAILY_DATA
    }

    // Basement tertentu
    const basementData = data?.byBasement?.[selectedBasement]

    if (period === "hourly") {
      return basementData?.hourly ?? []
    }

    return basementData?.daily ?? []
  }, [data, period, selectedBasement])

  const selectedBasementName =
    selectedBasement === "building"
      ? "Seluruh Gedung"
      : basements.find((item) => item.id === selectedBasement)?.name ??
        "Basement"

  return (
    <Card className="border-slate-200 bg-white shadow-sm">
      <CardHeader className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
        <div className="space-y-1">
          <CardTitle className="text-lg font-bold text-[#202B40]">
            Analisis Kendaraan
          </CardTitle>

          <CardDescription>
            Statistik kendaraan {selectedBasementName.toLowerCase()}
          </CardDescription>
        </div>

        <div className="flex flex-wrap gap-2">
          {/* Filter Basement */}
          <Select
            value={selectedBasement}
           onValueChange={(value) => {
              if (value !== null) {
                setSelectedBasement(value)
              }
            }}
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

          {/* Filter Periode */}
          <Select
            value={period}
            onValueChange={(value) => {
              if (value === "hourly" || value === "daily") {
                setPeriod(value)
              }
            }}
          >
            <SelectTrigger className="w-[125px]">
              <SelectValue placeholder="Pilih periode" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="hourly">Per Jam</SelectItem>
              <SelectItem value="daily">Per Hari</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent>
        <div className="mb-4 flex flex-wrap gap-x-5 gap-y-2 text-xs">
          <span className="flex items-center gap-2 text-slate-600">
            <span className="size-2.5 rounded-full bg-blue-500" />
            IN
          </span>

          <span className="flex items-center gap-2 text-slate-600">
            <span className="size-2.5 rounded-full bg-orange-500" />
            OUT
          </span>

          <span className="flex items-center gap-2 text-slate-600">
            <span className="size-2.5 rounded-full bg-emerald-500" />
            Total Kendaraan
          </span>

          <span className="flex items-center gap-2 text-slate-600">
            <span className="size-2.5 rounded-full bg-red-400" />
            Kapasitas
          </span>
        </div>

        <div className="h-[320px] w-full">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{
                  top: 10,
                  right: 15,
                  left: -15,
                  bottom: 5,
                }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#E2E8F0"
                />

                <XAxis
                  dataKey="time"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#64748B", fontSize: 12 }}
                  interval={0}
                />

                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#64748B", fontSize: 12 }}
                  allowDecimals={false}
                />

                <Tooltip
                  contentStyle={{
                    borderRadius: "10px",
                    border: "1px solid #E2E8F0",
                    fontSize: "12px",
                  }}
                />

                <Line
                  type="monotone"
                  dataKey="in"
                  name="IN"
                  stroke="#3B82F6"
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{ r: 5 }}
                />

                <Line
                  type="monotone"
                  dataKey="out"
                  name="OUT"
                  stroke="#F97316"
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{ r: 5 }}
                />

                <Line
                  type="monotone"
                  dataKey="total"
                  name="Total Kendaraan"
                  stroke="#10B981"
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{ r: 5 }}
                />

                <Line
                  type="monotone"
                  dataKey="capacity"
                  name="Kapasitas"
                  stroke="#EF4444"
                  strokeWidth={2}
                  strokeDasharray="6 4"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-full items-center justify-center rounded-lg border border-dashed border-slate-200">
              <p className="text-sm text-slate-500">
                Belum ada data kendaraan untuk {selectedBasementName}.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}