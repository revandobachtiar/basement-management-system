
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
  Legend,
} from "recharts"

type Period = "hourly" | "daily"

interface VehicleData {
  time: string
  in: number
  out: number
  total: number
  capacity: number
}

const HOURLY_DATA: VehicleData[] = [
  { time: "08:00", in: 12, out: 3, total: 9, capacity: 500 },
  { time: "09:00", in: 28, out: 8, total: 29, capacity: 500 },
  { time: "10:00", in: 42, out: 15, total: 56, capacity: 500 },
  { time: "11:00", in: 35, out: 18, total: 73, capacity: 500 },
  { time: "12:00", in: 48, out: 22, total: 99, capacity: 500 },
  { time: "13:00", in: 55, out: 30, total: 124, capacity: 500 },
  { time: "14:00", in: 62, out: 35, total: 151, capacity: 500 },
  { time: "15:00", in: 45, out: 40, total: 156, capacity: 500 },
  { time: "16:00", in: 58, out: 42, total: 172, capacity: 500 },
  { time: "17:00", in: 75, out: 48, total: 199, capacity: 500 },
  { time: "18:00", in: 85, out: 55, total: 229, capacity: 500 },
  { time: "19:00", in: 65, out: 70, total: 224, capacity: 500 },
  { time: "20:00", in: 52, out: 80, total: 196, capacity: 500 },
  { time: "21:00", in: 35, out: 90, total: 141, capacity: 500 },
]

const DAILY_DATA: VehicleData[] = [
  { time: "Sen", in: 420, out: 390, total: 180, capacity: 500 },
  { time: "Sel", in: 380, out: 410, total: 150, capacity: 500 },
  { time: "Rab", in: 510, out: 470, total: 190, capacity: 500 },
  { time: "Kam", in: 560, out: 520, total: 230, capacity: 500 },
  { time: "Jum", in: 680, out: 620, total: 290, capacity: 500 },
  { time: "Sab", in: 890, out: 820, total: 360, capacity: 500 },
  { time: "Min", in: 760, out: 810, total: 310, capacity: 500 },
]

interface VehicleChartCardProps {
  data?: {
    hourly?: VehicleData[]
    daily?: VehicleData[]
  }
}

export function VehicleChartCard({
  data,
}: VehicleChartCardProps) {
  const [period, setPeriod] = useState<Period>("hourly")

  const chartData = useMemo(
    () =>
      period === "hourly"
        ? data?.hourly ?? HOURLY_DATA
        : data?.daily ?? DAILY_DATA,
    [period, data]
  )

  return (
    <Card className="border-slate-200 bg-white shadow-sm">
      <CardHeader className="flex flex-row items-start justify-between gap-3">
        <div className="space-y-1">
          <CardTitle className="text-lg font-bold text-[#202B40]">
            Analisis Kendaraan
          </CardTitle>
        </div>

        <Select
          value={period}
          onValueChange={(value) => setPeriod(value as Period)}
        >
          <SelectTrigger className="w-[125px]">
            <SelectValue placeholder="Pilih periode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="hourly">Per Jam</SelectItem>
            <SelectItem value="daily">Per Hari</SelectItem>
          </SelectContent>
        </Select>
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
            Total
          </span>

          <span className="flex items-center gap-2 text-slate-600">
            <span className="size-2.5 rounded-full bg-red-400" />
            Kapasitas
          </span>
        </div>

        <div className="h-[320px] w-full">
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
                name="Kapasitas Gedung"
                stroke="#EF4444"
                strokeWidth={2}
                strokeDasharray="6 4"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
