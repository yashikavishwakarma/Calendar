export interface CalendarNote {
  day: number
  month: number
  year: number
  text: string
  emoji?: string
  position?: "left" | "right"
}