export type MoodTheme =
  | "tuf"
  | "chill"
  | "grind"
  | "aesthetic"
  | "chaos"
  | "midnight"

export type Theme = {
  id: string
  name: string
  mood: string
//   emoji: string
//   heroImage: string   
  vars: Record<string, string>
}