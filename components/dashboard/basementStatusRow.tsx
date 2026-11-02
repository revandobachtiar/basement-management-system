
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface Basement {
  name: string
  occupied: number
  capacity: number
  color: string
}

interface BasementStatusRowProps {
  basements?: Basement[]
}

const defaultBasements: Basement[] = [
  {
    name: "Basement P1",
    occupied: 125,
    capacity: 200,
    color: "bg-blue-500",
  },
  {
    name: "Basement P2",
    occupied: 116,
    capacity: 180,
    color: "bg-violet-500",
  },
  {
    name: "Basement P3",
    occupied: 85,
    capacity: 120,
    color: "bg-teal-500",
  },
]

export function BasementStatusRow({
  basements = defaultBasements,
}: BasementStatusRowProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {basements.map((basement) => {
        const percentage =
          basement.capacity > 0
            ? Math.min(
                100,
                (basement.occupied / basement.capacity) * 100
              )
            : 0

        return (
          <Card
            key={basement.name}
            className="border-slate-200 bg-white shadow-sm"
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between gap-2">
                <CardTitle className="text-base font-bold text-slate-800">
                  {basement.name}
                </CardTitle>

                <span className="text-xs font-medium text-slate-500">
                  {basement.occupied} / {basement.capacity} kendaraan
                </span>
              </div>
            </CardHeader>

            <CardContent>
              <div className="flex items-center gap-3">
                <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full transition-all ${basement.color}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                <span className="w-12 text-right text-sm font-bold text-slate-900">
                  {percentage.toFixed(1)}%
                </span>
              </div>

              <div className="mt-3 flex justify-between text-xs text-slate-400">
                <span>
                  Tersedia: {basement.capacity - basement.occupied} slot
                </span>
                <span>Keterisian</span>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
