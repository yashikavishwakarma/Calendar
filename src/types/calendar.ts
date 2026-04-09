export interface CalendarNote {
  id: string
  day: number
  month: number
  year: number
  endDay?: number
  text: string
  emoji?: string
  image?: string
  position?: "left" | "right"
}