import { KipSummaryCard } from "@/components/dashboard/kpiSummaryCard";
import { BasementStatusRow } from "@/components/dashboard/basementStatusRow";
import { CctvMonitoringGrid } from "@/components/dashboard/cctvMonitoringGrid";
import { VehicleChartCard } from "@/components/dashboard/vehicleChartCard";
import { TodayActivityCard } from "@/components/dashboard/todayActivityCard";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="min-h-screen space-y-6 bg-[#F4F7FC] p-6">
      {/* Ringkasan kapasitas dan kendaraan */}
      <KipSummaryCard />

      {/* Status setiap basement */}
      <section className="space-y-3">
        <BasementStatusRow />
      </section>

      {/* Monitoring CCTV */}
      <section>
        <Card className="overflow-hidden border-slate-200 shadow-sm">
          <CardContent className="p-4">
            <div className="max-h-[650px] overflow-y-auto pr-2">
              <CctvMonitoringGrid />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Analisis kendaraan */}
      <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <VehicleChartCard />
        </div>

        <div className="xl:col-span-1">
          <TodayActivityCard />
        </div>
      </section>
    </div>
  );
}