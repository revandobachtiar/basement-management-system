
"use client"

import { useState } from "react"
import { useBasement } from "@/hooks/useBasement"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

export function BasementSection() {
  const { basements, addBasement } = useBasement()

  const [name, setName] = useState("")
  const [capacity, setCapacity] = useState("")

  const handleAdd = async () => {
    if (!name.trim() || !capacity) return

    const value = Number(capacity)

    if (!Number.isInteger(value) || value <= 0) {
      alert("Kapasitas harus berupa bilangan bulat positif")
      return
    }

    try {
      await addBasement({
        name: name.trim(),
        capacity: value,
      })

      setName("")
      setCapacity("")
    } catch {
      alert("Gagal menambahkan Basement")
    }
  }

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <Label>Basement Name</Label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Contoh: P4"
        />
      </div>

      <div className="space-y-2">
        <Label>Parking Capacity</Label>
        <Input
          type="number"
          min="1"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          placeholder="Contoh: 150"
        />
      </div>

      <Button
        onClick={handleAdd}
        className="bg-[#263653] hover:bg-[#344766]"
      >
        Add Basement
      </Button>

      <div className="space-y-3 border-t pt-4">
        <h3 className="font-semibold">Registered Basements</h3>

        {basements.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between rounded-lg border p-3"
          >
            <div>
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-slate-500">
                Capacity: {item.capacity} vehicles
              </p>
              <p className="text-sm text-slate-500">
                Current: {item.currentCount ?? 0} vehicles
              </p>
            </div>

            <Badge variant="secondary">Registered</Badge>
          </div>
        ))}
      </div>
    </div>
  )
}
