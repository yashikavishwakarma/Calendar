import type { Theme } from "../types/theme"

export const THEMES: Theme[] = [
  {
  id: "tuf",
  name: "TUF Mode",
  mood: "grind szn ",
//   emoji: "⚔️",
  vars: {
    "--bg-primary": "#0f0f0f",        // main dark bg
    "--bg-secondary": "#181818",      // slightly lighter sections
    "--bg-card": "#1f1f1f",           // cards
    "--accent": "#ff7a18",            // STRIVER ORANGE 🔥
    "--accent-soft": "#3b1f0f",       // subtle orange bg
    "--text-primary": "#ffffff",      // main text
    "--text-secondary": "#b3b3b3",    // secondary text
    "--text-muted": "#6b7280",        // muted
    "--border": "#2a2a2a",            // borders
    "--header-from": "#1a1a1a",       
    "--header-to": "#0f0f0f",
    "--today-bg": "#ff7a18",          // highlight (important)
    "--today-text": "#ffffff",
    "--wave": "#0f0f0f",
    "--day-label": "#9ca3af",
  }
},
  {
    id: "chill",
    name: "Chill Vibes",
    mood: "calm & cozy ",
    // emoji: "🧊",
    vars: {
      "--bg-primary": "#f0f9ff",
      "--bg-secondary": "#e6f4fb",
      "--bg-card": "#ffffff",
      "--accent": "#7cc6e6",
      "--accent-soft": "#d6eef8",
      "--text-primary": "#2c5d73",
      "--text-secondary": "#5c8ea3",
      "--text-muted": "#a7c7d9",
      "--border": "#d6eef8",
      "--header-from": "#d6eef8",
      "--header-to": "#f0f9ff",
      "--today-bg": "#7cc6e6",
      "--today-text": "#ffffff",
      "--wave": "#ffffff",
      "--day-label": "#5c8ea3",
    }
  },
  {
    id: "grind",
    name: "Grind Mode",
    mood: "steady focus",
    // emoji: "🌿",
    vars: {
      "--bg-primary": "#f4fbf6",
      "--bg-secondary": "#e3f3e8",
      "--bg-card": "#ffffff",
      "--accent": "#86cfa5",
      "--accent-soft": "#d7f2e1",
      "--text-primary": "#2f5d44",
      "--text-secondary": "#5e8d72",
      "--text-muted": "#a6cbb3",
      "--border": "#d7f2e1",
      "--header-from": "#d7f2e1",
      "--header-to": "#f4fbf6",
      "--today-bg": "#86cfa5",
      "--today-text": "#ffffff",
      "--wave": "#ffffff",
      "--day-label": "#5e8d72",
    }
  },
  {
    id: "aesthetic",
    name: "Aesthetic",
    mood: "soft life ",
    // emoji: "🌸",
    vars: {
      "--bg-primary": "#fff1f6",
      "--bg-secondary": "#fde2ec",
      "--bg-card": "#ffffff",
      "--accent": "#f4a7c3",
      "--accent-soft": "#fde2ec",
      "--text-primary": "#6b2d44",
      "--text-secondary": "#9c4d6c",
      "--text-muted": "#e4a5bd",
      "--border": "#fde2ec",
      "--header-from": "#fbcfe0",
      "--header-to": "#fff1f6",
      "--today-bg": "#f4a7c3",
      "--today-text": "#ffffff",
      "--wave": "#ffffff",
      "--day-label": "#9c4d6c",
    }
  },
  {
    id: "chaos",
    name: "Chaos Mode",
    mood: "soft chaos ",
    // emoji: "🌈",
    vars: {
      "--bg-primary": "#f6f3ff",
      "--bg-secondary": "#ede9fe",
      "--bg-card": "#ffffff",
      "--accent": "#c4b5fd",
      "--accent-soft": "#e9e4ff",
      "--text-primary": "#4c3f91",
      "--text-secondary": "#7b6fcf",
      "--text-muted": "#b4a7f5",
      "--border": "#e9e4ff",
      "--header-from": "#ddd6fe",
      "--header-to": "#f6f3ff",
      "--today-bg": "#c4b5fd",
      "--today-text": "#ffffff",
      "--wave": "#ffffff",
      "--day-label": "#7b6fcf",
    }
  },
  {
    id: "midnight",
    name: "Midnight",
    mood: "calm night ",
    // emoji: "🌙",
    vars: {
      "--bg-primary": "#f1f5f9",
      "--bg-secondary": "#e2e8f0",
      "--bg-card": "#ffffff",
      "--accent": "#a5b4fc",
      "--accent-soft": "#e0e7ff",
      "--text-primary": "#334155",
      "--text-secondary": "#64748b",
      "--text-muted": "#94a3b8",
      "--border": "#e0e7ff",
      "--header-from": "#e0e7ff",
      "--header-to": "#f1f5f9",
      "--today-bg": "#a5b4fc",
      "--today-text": "#ffffff",
      "--wave": "#ffffff",
      "--day-label": "#64748b",
    }
  },
]