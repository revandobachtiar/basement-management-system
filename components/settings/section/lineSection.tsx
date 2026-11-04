
"use client"

import { useState } from "react"
import { useLine } from "@/hooks/useLine"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

export function LineSection() {
  const { lines, addLine } = useLine()

  const [name, setName] = useState("")
  const [direction, setDirection] = useState("both")

  const handleAdd = async () => {
    if (!name.trim()) {
      alert("Nama Line wajib diisi")
      return
    }

    try {
      await addLine({
        name: name.trim(),
        direction : "both"
      })

      setName("")
      setDirection("both")
    } catch {
      alert("Gagal menambahkan Line")
    }
  }

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <Label>Line Name</Label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Contoh: L6"
        />
      </div>

      <div className="space-y-2">
        <Label>Line Direction</Label>

        <select
          value={direction}
          onChange={(e) => setDirection(e.target.value)}
          className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
        >
          <option value="both">Both (IN / OUT)</option>
        </select>

        <p className="text-xs text-slate-500">
          Direction mengikuti nilai yang diizinkan oleh API.
        </p>
      </div>

      <Button
        onClick={handleAdd}
        className="bg-[#263653] hover:bg-[#344766]"
      >
        Add Line
      </Button>

      <div className="space-y-3 border-t pt-4">
        <h3 className="font-semibold">Registered Lines</h3>

        {lines.map((line) => (
          <div
            key={line.id}
            className="flex items-center justify-between rounded-lg border p-3"
          >
            <div>
              <p className="font-semibold">{line.name}</p>
              <p className="text-sm text-slate-500">
                Direction: {line.direction}
              </p>
            </div>

            <Badge variant="secondary">
              {line.isActive ? "Active" : "Inactive"}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  )
}
