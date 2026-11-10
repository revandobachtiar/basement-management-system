"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

import {
  Building2,
  Video,
  Route,
} from "lucide-react";

import { useBasement } from "@/hooks/useBasement";
import { useLine } from "@/hooks/useLine";
import { useCamera } from "@/hooks/useCamera";

export function CardSummary() {
  const {
    basements,
    isLoading: basementLoading,
  } = useBasement();

  const {
    lines,
    isLoading: lineLoading,
  } = useLine();

  const {
    cameras,
    isLoading: cameraLoading,
  } = useCamera();

  const isLoading =
    basementLoading || lineLoading || cameraLoading;

  const cards = [
    {
      title: "Total Basement",
      value: basements.length,
      icon: Building2,
    },
    {
      title: "Total Line",
      value: lines.length,
      icon: Route,
    },
    {
      title: "Total CCTV",
      value: cameras.length,
      icon: Video,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 px-6 pt-8 lg:grid-cols-3 lg:px-20">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <Card
            key={card.title}
            className="border-slate-200 bg-white shadow-sm"
          >
            <CardContent className="flex flex-col items-center gap-3 p-6">
              <Icon className="size-14 text-[#202653]" />

              <CardTitle className="text-3xl font-bold text-[#010634]">
                {isLoading
                  ? "..."
                  : card.value.toLocaleString("id-ID")}
              </CardTitle>

              <CardDescription className="text-base font-semibold text-[#010634]">
                {card.title}
              </CardDescription>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}