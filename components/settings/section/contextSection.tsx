
"use client"

import { useState } from "react"

import { useParkingContext } from "@/hooks/useParkingContext"
import { useLineInOut } from "@/hooks/useLineInOut"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export function ContextSection() {
  const { contexts, addContext } = useParkingContext()
  const { lineInOuts } = useLineInOut()

  const [relationId, setRelationId] = useState("")
  const [context, setContext] = useState<"IN" | "OUT">("IN")
  const [apply, setApply] = useState<"INCREMENT" | "REDUCE">("INCREMENT")

  const handleContextChange = (value: "IN" | "OUT") => {
    setContext(value)
    setApply(value === "IN" ? "INCREMENT" : "REDUCE")
  }

  const handleSave = () => {
    if (!relationId) {
      alert("Pilih konfigurasi Line IN-OUT")
      return
    }

    try {
      addContext({
        lineInOutBasementId: relationId,
        context,
        apply,
      })

      alert("Context berhasil disimpan")
    } catch {
      alert("Gagal menyimpan Context")
    }
  }

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <Label>Line IN-OUT Configuration</Label>

        <select
          value={relationId}
          onChange={(e) => setRelationId(e.target.value)}
          className="h-10 w-full rounded-md border bg-background px-3 text-sm"
        >
          <option value="">Select configuration</option>

          {lineInOuts.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <Label>Vehicle Movement Context</Label>

        <select
          value={context}
          onChange={(e) =>
            handleContextChange(e.target.value as "IN" | "OUT")
          }
          className="h-10 w-full rounded-md border bg-background px-3 text-sm"
        >
          <option value="IN">IN / Kendaraan Masuk</option>
          <option value="OUT">OUT / Kendaraan Keluar</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label>Stock Operation</Label>

        <select
          value={apply}
          onChange={(e) =>
            setApply(e.target.value as "INCREMENT" | "REDUCE")
          }
          className="h-10 w-full rounded-md border bg-background px-3 text-sm"
        >
          <option value="INCREMENT">INCREMENT</option>
          <option value="REDUCE">REDUCE</option>
        </select>

        <p className="text-xs text-slate-500">
          INCREMENT menambah jumlah kendaraan, sedangkan
          REDUCE mengurangi jumlah kendaraan.
        </p>
      </div>

      <Button
        onClick={handleSave}
        className="bg-[#263653] hover:bg-[#344766]"
      >
        Save Context
      </Button>

      <div className="space-y-3 border-t pt-4">
        <h3 className="font-semibold">Registered Context</h3>

        {contexts.map((item) => {
          const relation = lineInOuts.find(
            (x) => x.id === item.lineInOutBasementId
          )

          return (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-lg border p-3"
            >
              <div>
                <p className="font-semibold">
                  {relation?.name ?? "Unknown Configuration"}
                </p>

                <p className="text-sm text-slate-500">
                  {item.context} → {item.apply}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
