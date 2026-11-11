
"use client";

import { useState } from "react";

import { useParkingContext } from "@/hooks/useParkingContext";
import { useLineInOut } from "@/hooks/useLineInOut";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import type {
  ParkingContext,
  CreateParkingContextRequest,
} from "@/types/parking";

export function ContextSection() {
  const {
    contexts,
    addContext,
    updateContext,
    deleteContext,
    isLoading,
  } = useParkingContext();

  const { lineInOuts } = useLineInOut();

  const [relationId, setRelationId] = useState("");
  const [context, setContext] = useState<"IN" | "OUT">("IN");
  const [apply, setApply] = useState<"INCREMENT" | "REDUCE">("INCREMENT");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const resetForm = () => {
    setRelationId("");
    setContext("IN");
    setApply("INCREMENT");
    setEditingId(null);
  };

  const handleEdit = (item: ParkingContext) => {
    setEditingId(item.id);
    setRelationId(item.lineInOutBasementId);
    setContext(item.context);
    setApply(item.apply);
  };

  const handleContextChange = (value: "IN" | "OUT") => {
    setContext(value);
    setApply(value === "IN" ? "INCREMENT" : "REDUCE");
  };

  const handleSave = async () => {
    if (!relationId) {
      alert("Pilih konfigurasi Line IN-OUT.");
      return;
    }

    const payload: CreateParkingContextRequest = {
      lineInOutBasementId: relationId,
      context,
      apply,
    };

    setIsSaving(true);

    try {
      if (editingId) {
        await updateContext(editingId, payload);
        alert("Context berhasil diperbarui.");
      } else {
        await addContext(payload);
        alert("Context berhasil ditambahkan.");
      }

      resetForm();
    } catch (error) {
      console.error("[CONTEXT] Gagal menyimpan:", error);
      alert(
        editingId
          ? "Gagal memperbarui Context."
          : "Gagal menambahkan Context."
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus konfigurasi Context ini?")) return;

    try {
      await deleteContext(id);

      if (editingId === id) resetForm();

      alert("Context berhasil dihapus.");
    } catch (error) {
      console.error("[CONTEXT] Gagal menghapus:", error);
      alert("Gagal menghapus Context.");
    }
  };

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
          INCREMENT menambah jumlah kendaraan, sedangkan REDUCE
          mengurangi jumlah kendaraan.
        </p>
      </div>

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
              ? "Update Context"
              : "Save Context"}
        </Button>
      </div>

      <div className="space-y-3 border-t pt-4">
        <h3 className="font-semibold">Registered Context</h3>

        {isLoading ? (
          <p className="text-sm text-slate-500">Loading contexts...</p>
        ) : contexts.length === 0 ? (
          <p className="text-sm text-slate-500">
            Belum ada konfigurasi Context.
          </p>
        ) : (
          contexts.map((item) => {
            const relation = lineInOuts.find(
              (x) => x.id === item.lineInOutBasementId
            );

            return (
              <div
                key={item.id}
                className="flex flex-col justify-between gap-3 rounded-lg border p-3 sm:flex-row sm:items-center"
              >
                <div>
                  <p className="font-semibold">
                    {relation?.name ?? "Unknown Configuration"}
                  </p>

                  <p className="text-sm text-slate-500">
                    {item.context} → {item.apply}
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
