
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  ArrowDownToLine,
  ArrowUpFromLine,
} from "lucide-react"

interface TodayActivityCardProps {
  totalIn?: number
  totalOut?: number
}

export function TodayActivityCard({
  totalIn = 148,
  totalOut = 132,
}: TodayActivityCardProps) {
  const difference = totalIn - totalOut
  const totalActivity = totalIn + totalOut

  const inPercentage =
    totalActivity > 0 ? (totalIn / totalActivity) * 100 : 0

  const outPercentage =
    totalActivity > 0 ? (totalOut / totalActivity) * 100 : 0

  return (
    <Card className="border-slate-200 bg-white shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-bold text-[#202B40]">
              Aktivitas Hari Ini
            </CardTitle>
            <CardDescription>
              Rekap kendaraan masuk dan keluar
            </CardDescription>
          </div>

          <div className="flex size-10 items-center justify-center rounded-xl bg-blue-50">
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="grid grid-cols-2 gap-3">
          {/* IN */}
          <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-4">
            <div className="flex items-center gap-2 text-blue-600">
              <ArrowDownToLine className="size-4" />
              <span className="text-sm font-medium">Kendaraan Masuk</span>
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
              <span className="text-sm font-medium">Kendaraan Keluar</span>
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
            <span>{totalActivity} kendaraan</span>
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
              difference >= 0 ? "text-emerald-600" : "text-red-600"
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
