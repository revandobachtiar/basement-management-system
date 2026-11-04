export type SettingKey =
  | "initialization"
  | "basement"
  | "line"
  | "lineDirection"
  | "context"
  | "video"

export interface SettingCardItem {
  id: SettingKey
  title: string
  description: string
  icon: React.ReactNode
}