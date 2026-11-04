
"use client"

import * as React from "react"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { NavMain } from "@/components/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { LayoutDashboard, Settings } from "lucide-react"

export function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  const data = {
    navMain: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: <LayoutDashboard />,
        isActive: pathname === "/dashboard",
      },
      {
        title: "Settings",
        url: "/settings",
        icon: <Settings />,
        isActive: pathname === "/settings",
      },
    ],
  }

  return (
    <Sidebar variant="sidebar" collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="xl" render={<a href="/" />}>
              <div className="flex w-full items-center justify-center">
                <Image
                  src="/image/Trans_Studio_Mall.png"
                  alt="Logo Trans Studio Mall"
                  width={120}
                  height={40}
                  priority
                  className="h-auto w-[120px] object-contain"
                />
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="mt-16">
        <NavMain items={data.navMain} />
      </SidebarContent>
    </Sidebar>
  )
}
