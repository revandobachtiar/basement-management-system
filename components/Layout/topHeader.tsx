
"use client"

import { usePathname } from "next/navigation"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Maximize2 } from "lucide-react"

export function SiteHeader() {
  const pathname = usePathname()


  const pageInfo = {
    "/": {
      title: "Basement Management System",
      subtitle: "Trans Studio Mall Bandung",
    },
    "/settings": {
      title: "Settings",
      subtitle: "Manage your parking system configuration",
    },
  }

  const currentPage = pageInfo[pathname as keyof typeof pageInfo] ?? {
    title: "Basement Management System",
    subtitle: "Trans Studio Mall Bandung",
  }

  return (
    <header className="sticky top-0 z-50 flex h-16 w-full shrink-0 items-center bg-[#f0f4fb]">
      <div className="flex w-full items-center gap-3 px-4 lg:px-6">

        <SidebarTrigger className="size-9 text-[#263653] hover:bg-[#E6EBF8]" />

        <div className="flex flex-col justify-center">
          <h1 className="text-2xl font-bold tracking-tight text-[#010634]">
            {currentPage.title}
          </h1>

          <p className="text-sm text-slate-500">
            {currentPage.subtitle}
          </p>
        </div>

        <div className="ml-auto">
          <Button size="icon-lg" aria-label="Fullscreen" variant="outline">
            <Maximize2 />
          </Button>
        </div>

      </div>
    </header>
  )
}
