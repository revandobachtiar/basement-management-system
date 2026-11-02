
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
} from "@/components/ui/card"

import {
  CarFront,
  CircleParking,
  CheckCircle2,
} from "lucide-react"

interface KipSummaryCardProps {
  totalCapacity?: number
  occupied?: number
  available?: number
}

export function KipSummaryCard({
  totalCapacity = 500,
  occupied = 326,
  available = 174,
}: KipSummaryCardProps) {
  const occupancyRate =
    totalCapacity > 0
      ? (occupied / totalCapacity) * 100
      : 0

  const percentage = Math.min(100, occupancyRate)

  const cards = [
    {
      title: "Total Kapasitas",
      value: totalCapacity,
      description: "Slot Parkir",
      icon: CircleParking,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-100",
    },
    {
      title: "Terisi",
      value: occupied,
      description: "Kendaraan",
      icon: CarFront,
      iconColor: "text-orange-500",
      iconBg: "bg-orange-100",
    },
    {
      title: "Tersedia",
      value: available,
      description: "Slot Kosong",
      icon: CheckCircle2,
      iconColor: "text-emerald-600",
      iconBg: "bg-emerald-100",
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((item) => {
        const Icon = item.icon

        return (
          <Card
            key={item.title}
            className="border-slate-200 bg-white shadow-sm"
          >
            <CardContent className="flex items-center gap-4 p-5">
              <div
                className={`flex size-16 shrink-0 items-center justify-center rounded-full ${item.iconBg}`}
              >
                <Icon className={`size-8 ${item.iconColor}`} />
              </div>

              <div className="min-w-0">
                <CardDescription className="font-medium text-slate-500">
                  {item.title}
                </CardDescription>

                <p className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
                  {item.value.toLocaleString("id-ID")}
                </p>

                <p className="text-sm text-slate-500">
                  {item.description}
                </p>
              </div>
            </CardContent>
          </Card>
        )
      })}

      {/* Occupancy Donut */}
      <Card className="border-slate-200 bg-white shadow-sm">
        <CardContent className="flex h-full items-center gap-5 p-5">
          <div
            className="relative flex size-20 shrink-0 items-center justify-center rounded-full"
            style={{
              background: `conic-gradient(#1683f8 ${percentage}%, #e2e8f0 ${percentage}% 100%)`,
            }}
          >
            <div className="flex size-[62px] items-center justify-center rounded-full bg-white">
              <span className="text-base font-bold text-slate-900">
                {percentage.toFixed(1)}%
              </span>
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-slate-600">
              Tingkat Keterisian
            </p>

            <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-blue-500 transition-all"
                style={{ width: `${percentage}%` }}
              />
            </div>

            <p className="mt-2 text-xs text-slate-400">
              {occupied} dari {totalCapacity} slot terisi
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
