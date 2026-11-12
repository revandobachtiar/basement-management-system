
"use client";

import { useState } from "react";

import { useLineInOut } from "@/hooks/useLineInOut";
import { useLine } from "@/hooks/useLine";
import { useBasement } from "@/hooks/useBasement";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import type {
  LineInOutBasement,
  CreateLineInOutBasementRequest,
} from "@/types/parking";

export function LineDirectionSection() {
  const {
    lineInOuts,
    addLineInOut,
    updateLineInOut,
    deleteLineInOut,
    isLoading,
  } = useLineInOut();

  const { lines } = useLine();
  const { basements } = useBasement();

  const [name, setName] = useState("");
  const [lineId, setLineId] = useState("");
  const [inBasementId, setInBasementId] = useState("");
  const [outBasementId, setOutBasementId] = useState("");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const resetForm = () => {
    setName("");
    setLineId("");
    setInBasementId("");
    setOutBasementId("");
    setEditingId(null);
  };

  const handleEdit = (item: LineInOutBasement) => {
    setEditingId(item.id);
    setName(item.name);
    setLineId(item.lineId);
    setInBasementId(item.inToBasement ?? "");
    setOutBasementId(item.outToBasement ?? "");
  };

  const handleSave = async () => {
 
    if (!name.trim() || !lineId) {
      alert("Nama konfigurasi dan Registered Line wajib diisi.");
      return;
    }

    // Jika keduanya diisi, basement tidak boleh sama.
    if (
      inBasementId &&
      outBasementId &&
      inBasementId === outBasementId
    ) {
      alert("Basement IN dan OUT tidak boleh sama.");
      return;
    }

    const payload: CreateLineInOutBasementRequest = {
      name: name.trim(),
      lineId,
      inToBasementId: inBasementId ,
      outToBasementId: outBasementId,
    };

    setIsSaving(true);

    try {
      if (editingId) {
        await updateLineInOut(editingId, payload);
        alert("Konfigurasi Line IN/OUT berhasil diperbarui.");
      } else {
        await addLineInOut(payload);
        alert("Konfigurasi Line IN/OUT berhasil ditambahkan.");
      }

      resetForm();
    } catch (error) {
      console.error("[LINE IN/OUT] Gagal menyimpan:", error);

      alert(
        editingId
          ? "Gagal memperbarui konfigurasi Line IN/OUT."
          : "Gagal menambahkan konfigurasi Line IN/OUT."
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus konfigurasi Line IN/OUT ini?")) return;

    try {
      await deleteLineInOut(id);

      if (editingId === id) resetForm();

      alert("Konfigurasi berhasil dihapus.");
    } catch (error) {
      console.error("[LINE IN/OUT] Gagal menghapus:", error);
      alert("Gagal menghapus konfigurasi.");
    }
  };

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
            <option value="">Tidak digunakan</option>

            {basements.map((basement) => (
              <option key={basement.id} value={basement.id}>
                {basement.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label>OUT → To Basement</Label>
          <select
            value={outBasementId}
            onChange={(e) => setOutBasementId(e.target.value)}
            className="h-10 w-full rounded-md border bg-background px-3 text-sm"
          >
            <option value="">Tidak digunakan</option>

            {basements.map((basement) => (
              <option key={basement.id} value={basement.id}>
                {basement.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="text-xs text-slate-500">
        Arah IN dan OUT dapat dikonfigurasi secara independen.
        Salah satu atau keduanya boleh tidak digunakan.
      </p>

      <div className="flex justify-end gap-2">
        {editingId && (
          <Button
            type="button"
            variant="outline"
            onClick={resetForm}
            disabled={isSaving}
          >
            Cancel Edit
          </Button>
        )}

        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-[#263653] hover:bg-[#344766]"
        >
          {isSaving
            ? "Saving..."
            : editingId
              ? "Update Line IN-OUT"
              : "Add Line IN-OUT"}
        </Button>
      </div>

      <div className="space-y-3 border-t pt-4">
        <h3 className="font-semibold">
          Registered Configurations
        </h3>

        {isLoading ? (
          <p className="text-sm text-slate-500">
            Loading configurations...
          </p>
        ) : lineInOuts.length === 0 ? (
          <p className="text-sm text-slate-500">
            Belum ada konfigurasi Line IN/OUT.
          </p>
        ) : (
          lineInOuts.map((item) => {
            const line = lines.find(
              (x) => x.id === item.lineId
            );

            const inBasement = basements.find(
              (x) => x.id === item.inToBasement
            );

            const outBasement = basements.find(
              (x) => x.id === item.outToBasement
            );

            return (
              <div
                key={item.id}
                className="flex flex-col justify-between gap-3 rounded-lg border p-3 sm:flex-row sm:items-center"
              >
                <div>
                  <p className="font-semibold">{item.name}</p>

                  <p className="text-sm text-slate-500">
                    {line?.name ?? "Line not found"}
                  </p>

                  <p className="text-xs text-slate-500">
                    IN:{" "}
                    {item.inToBasement
                      ? inBasement?.name ?? "Basement not found"
                      : "Tidak digunakan"}
                    {" · "}
                    OUT:{" "}
                    {item.outToBasement
                      ? outBasement?.name ?? "Basement not found"
                      : "Tidak digunakan"}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(item)}
                    disabled={isSaving}
                  >
                    Edit
                  </Button>

                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(item.id)}
                    disabled={isSaving}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
