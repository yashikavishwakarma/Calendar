export type MoodTheme =
  | "tuf"
  | "chill"
  | "grind"
  | "aesthetic"
  | "midnight"

export type Theme = {
  id: string
  name: string
  mood: string
  image: string
//   emoji: string
//   heroImage: string   
  vars: Record<string, string>
}