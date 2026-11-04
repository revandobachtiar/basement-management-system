
import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

import { AppSidebar } from "@/components/Layout/appSidebar";
import { SiteHeader } from "@/components/Layout/topHeader";
import { ParkingDataProvider } from "@/contexts/parkingDataContext";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Parking Management System",
  description: "Parking Management System - Trans Studio Mall Bandung",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="id"
      className={`${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <ParkingDataProvider>
          <SidebarProvider>
            <AppSidebar />

            <SidebarInset className="min-w-0 bg-background">
              <SiteHeader />

              <main className="flex-1">
                {children}
              </main>
            </SidebarInset>
          </SidebarProvider>
        </ParkingDataProvider>
      </body>
    </html>
  );
}
