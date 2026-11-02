
"use client"

import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 flex h-16 w-full shrink-0 items-center ">

      <div className="flex w-full items-center gap-3 px-4 lg:px-6">

        <SidebarTrigger className="size-9 text-[#263653] hover:bg-[#E6EBF8]" />

        

  
        <div className="flex flex-col justify-center">
          <h1 className="text-2xl font-bold tracking-tight text-[#010634]">
            Basement Management System
          </h1>
          <p className="text-sm text-slate-500">
            Trans Studio Mall Bandung
          </p>
        </div>

      </div>
    </header>
  )
}
