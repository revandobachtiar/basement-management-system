"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight } from "lucide-react"

interface SettingCardProps {
  title: string
  description: string
  icon: React.ReactNode
  onClick: () => void
}

export function SettingCard({
  title,
  description,
  icon,
  onClick,
}: SettingCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left"
    >
      <Card className="h-full cursor-pointer transition-all hover:border-[#263653]/40 hover:shadow-md">
        <CardContent className="flex items-center gap-4 p-5">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#E6EBF8] text-[#263653]">
            {icon}
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-[#010634]">
              {title}
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              {description}
            </p>
          </div>

          <ChevronRight className="size-5 shrink-0 text-slate-400" />
        </CardContent>
      </Card>
    </button>
  )
}