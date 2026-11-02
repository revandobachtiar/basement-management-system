
import { KipSummaryCard } from "@/components/dashboard/kpiSummaryCard"
import { BasementStatusRow } from "@/components/dashboard/basementStatusRow"
import { Layers3 } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="min-h-screen space-y-6 bg-[#F4F7FC] p-6">


      <KipSummaryCard
        totalCapacity={500}
        occupied={326}
        available={174}
      />

      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <Layers3 className="size-5 text-[#263653]" />

          <h2 className="text-lg font-bold text-[#202B40]">
            Status Basement
          </h2>
        </div>

        <BasementStatusRow />
      </section>

    </div>
  )
}
