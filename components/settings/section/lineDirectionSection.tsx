
"use client"

import { useState } from "react"

import { useLineInOut } from "@/hooks/useLineInOut"
import { useLine } from "@/hooks/useLine"
import { useBasement } from "@/hooks/useBasement"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LineDirectionSection() {
  const {
    lineInOuts,
    addLineInOut,
    deleteLineInOut,
  } = useLineInOut()

  const { lines } = useLine()
  const { basements } = useBasement()

  const [name, setName] = useState("")
  const [lineId, setLineId] = useState("")
  const [inBasementId, setInBasementId] = useState("")
  const [outBasementId, setOutBasementId] = useState("")

  const handleAdd = () => {
    if (
      !name.trim() ||
      !lineId ||
      !inBasementId ||
      !outBasementId
    ) {
      alert("Lengkapi seluruh konfigurasi")
      return
    }

    if (inBasementId === outBasementId) {
      alert("Basement masuk dan keluar tidak boleh sama")
      return
    }

    try {
      addLineInOut({
        name: name.trim(),
        lineId,
        inToBasementId: inBasementId,
        outToBasementId: outBasementId,
      })

      setName("")
      setLineId("")
      setInBasementId("")
      setOutBasementId("")

      alert("Konfigurasi Line IN-OUT berhasil ditambahkan")
    } catch {
      alert("Gagal membuat konfigurasi Line IN-OUT")
    }
  }

  const handleDelete = (id: string) => {
    if (!confirm("Hapus konfigurasi Line IN-OUT ini?")) return

    try {
      deleteLineInOut(id)
      alert("Konfigurasi berhasil dihapus")
    } catch {
      alert("Gagal menghapus konfigurasi")
    }
  }

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <Label>Configuration Name</Label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Contoh: Line In Out 12"
        />
      </div>

      <div className="space-y-2">
        <Label>Registered Line</Label>
        <select
          value={lineId}
          onChange={(e) => setLineId(e.target.value)}
          className="h-10 w-full rounded-md border bg-background px-3 text-sm"
        >
          <option value="">Select Line</option>

          {lines.map((line) => (
            <option key={line.id} value={line.id}>
              {line.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>IN → To Basement</Label>
          <select
            value={inBasementId}
            onChange={(e) => setInBasementId(e.target.value)}
            className="h-10 w-full rounded-md border bg-background px-3 text-sm"
          >
            <option value="">Select destination</option>

            {basements.map((basement) => (
              <option key={basement.id} value={basement.id}>
                {basement.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label>OUT → From Basement</Label>
          <select
            value={outBasementId}
            onChange={(e) => setOutBasementId(e.target.value)}
            className="h-10 w-full rounded-md border bg-background px-3 text-sm"
          >
            <option value="">Select source</option>

            {basements.map((basement) => (
              <option key={basement.id} value={basement.id}>
                {basement.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Button
        onClick={handleAdd}
        className="bg-[#263653] hover:bg-[#344766]"
      >
        Add Line IN-OUT
      </Button>

      <div className="space-y-3 border-t pt-4">
        <h3 className="font-semibold">Registered Configurations</h3>

        {lineInOuts.map((item) => {
          const line = lines.find(
            (x) => x.id === item.lineId
          )

          const inBasement = basements.find(
            (x) => x.id === item.inToBasementId
          )

          const outBasement = basements.find(
            (x) => x.id === item.outToBasementId
          )

          return (
            <div
              key={item.id}
              className="flex items-center justify-between gap-3 rounded-lg border p-3"
            >
              <div>
                <p className="font-semibold">{item.name}</p>

                <p className="text-sm text-slate-500">
                  {line?.name ?? "Line not found"}
                </p>

                <p className="text-xs text-slate-500">
                  IN: {inBasement?.name ?? "-"} · OUT: {outBasement?.name ?? "-"}
                </p>
              </div>

              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </Button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
