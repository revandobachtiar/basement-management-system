"use client"

import { useState } from "react"

import { useBasement } from "@/hooks/useBasement"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function InitializationSection() {
  const { basements, updateBasementCount } = useBasement()

  const [basementId, setBasementId] = useState("")
  const [vehicleCount, setVehicleCount] = useState("326")

  const handleSave = () => {
    if (!basementId) {
      alert("Pilih Basement terlebih dahulu")
      return
    }

    const count = Number(vehicleCount)

    if (!Number.isInteger(count) || count < 0) {
      alert("Jumlah kendaraan harus berupa bilangan bulat positif")
      return
    }

    updateBasementCount(basementId, count)

    alert("Initial vehicle count berhasil disimpan")
  }

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <Label>Registered Basement</Label>

        <select
          value={basementId}
          onChange={(e) => setBasementId(e.target.value)}
          className="h-10 w-full rounded-md border bg-background px-3 text-sm"
        >
          <option value="">Select Basement</option>

          {basements.map((basement) => (
            <option key={basement.id} value={basement.id}>
              {basement.name}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <Label>Initial Vehicle Count</Label>

        <Input
          type="number"
          min="0"
          step="1"
          value={vehicleCount}
          onChange={(e) => setVehicleCount(e.target.value)}
          placeholder="Enter vehicle count"
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          onClick={() => {
            setBasementId("")
            setVehicleCount("326")
          }}
        >
          Cancel
        </Button>

        <Button onClick={handleSave}>
          Save Initialization
        </Button>
      </div>
    </div>
  )
}