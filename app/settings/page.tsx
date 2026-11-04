'use client'

import {CardSummary} from "@/components/settings/cardSummary"
import {SettingSection} from "@/components/settings/settingSection"

export default function SettingsPage() {
    return (
        <div className="space-y-4">
            <CardSummary />
            <SettingSection />
        </div>
    )
}