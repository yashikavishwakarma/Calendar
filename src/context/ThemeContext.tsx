import { createContext, useContext, useState, useEffect } from "react"
import type { MoodTheme, Theme } from "../types/theme"
import { THEMES } from "../themes/themes"

interface ThemeContextType {
  theme: Theme
  setTheme: (id: MoodTheme) => void
}

const ThemeContext = createContext<ThemeContextType>({
  theme: THEMES[0],
  setTheme: () => {},
})

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [themeId, setThemeId] = useState<MoodTheme>("tuf")

  const theme = THEMES.find(t => t.id === themeId) ?? THEMES[0]

  useEffect(() => {
    const root = document.documentElement
    Object.entries(theme.vars).forEach(([key, val]) => {
      root.style.setProperty(key, val)
    })
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme: setThemeId }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)