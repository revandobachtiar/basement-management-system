'use client'


import React from 'react'
import { AppSidebar } from '@/components/Layout/appSidebar'
import {SidebarProvider} from "@/components/ui/sidebar"
import { SiteHeader } from '@/components/Layout/topHeader'

export default function DashboardPage() {
  return (
    <SidebarProvider>
      <AppSidebar/>
    </SidebarProvider>
  )
}