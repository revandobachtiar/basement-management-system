"use client"

import { useState } from "react"

import {
  CarFront,
  Layers,
  Route,
  ArrowLeftRight,
  Repeat,
  Video,
} from "lucide-react"

import { SettingCard } from "@/components/settings/shared/settingCard"
import { SettingDialog } from "@/components/settings/shared/settingDialog"

import { InitializationSection } from "@/components/settings/section/initializationSection"
import { BasementSection } from "@/components/settings/section/basementSection"
import { LineSection } from "@/components/settings/section/lineSection"
import { LineDirectionSection } from "@/components/settings/section/lineDirectionSection"
import { ContextSection } from "@/components/settings/section/contextSection"
import { VideoSection } from "@/components/settings/section/videoSection"

import type { SettingKey, SettingCardItem } from "@/components/settings/types/settingTypes"

const settingItems: SettingCardItem[] = [
  {
    id: "initialization",
    title: "Vehicle Initialization",
    description: "Configure initial vehicle count.",
    icon: <CarFront />,
  },
  {
    id: "basement",
    title: "Basement Management",
    description: "Manage basement areas.",
    icon: <Layers />,
  },
  {
    id: "line",
    title: "Line Management",
    description: "Manage parking entrance and exit lines.",
    icon: <Route />,
  },
  {
    id: "lineDirection",
    title: "Line IN / OUT",
    description: "Configure line directions.",
    icon: <ArrowLeftRight />,
  },
  {
    id: "context",
    title: "Context Configuration",
    description: "Configure vehicle count operations.",
    icon: <Repeat />,
  },
  {
    id: "video",
    title: "Video CCTV",
    description: "Manage CCTV streaming sources.",
    icon: <Video />,
  },
]

const settingContent: Record<
  SettingKey,
  {
    title: string
    description: string
    component: React.ReactNode
  }
> = {
  initialization: {
    title: "Vehicle Initialization",
    description: "Set the initial number of vehicles in the parking area.",
    component: <InitializationSection />,
  },
  basement: {
    title: "Basement Management",
    description: "Register and manage basement areas.",
    component: <BasementSection />,
  },
  line: {
    title: "Line Management",
    description: "Register and manage parking lines.",
    component: <LineSection />,
  },
  lineDirection: {
    title: "Line IN / OUT Configuration",
    description: "Configure the direction of each parking line.",
    component: <LineDirectionSection />,
  },
  context: {
    title: "Context Configuration",
    description: "Configure the vehicle counting operation.",
    component: <ContextSection />,
  },
  video: {
    title: "Video CCTV Management",
    description: "Add and configure CCTV video streams.",
    component: <VideoSection />,
  },
}

export function SettingSection() {
  const [activeSetting, setActiveSetting] =
    useState<SettingKey | null>(null)

  const selectedSetting = activeSetting
    ? settingContent[activeSetting]
    : null

  return (
    <div className="space-y-6 mx-10 mt-5" >
      <div>
        <h2 className="text-lg font-semibold text-[#010634]">
          Configuration Menu
        </h2>
        <p className="text-sm text-slate-500">
          Select a configuration to manage your parking system.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {settingItems.map((item) => (
          <SettingCard
            key={item.id}
            title={item.title}
            description={item.description}
            icon={item.icon}
            onClick={() => setActiveSetting(item.id)}
          />
        ))}
      </div>

      {selectedSetting && (
        <SettingDialog
          open={activeSetting !== null}
          onOpenChange={(open) => {
            if (!open) setActiveSetting(null)
          }}
          title={selectedSetting.title}
          description={selectedSetting.description}
        >
          {selectedSetting.component}
        </SettingDialog>
      )}
    </div>
  )
}