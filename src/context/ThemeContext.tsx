import { createContext, useContext, useState, useEffect } from "react"
import type { MoodTheme, Theme } from "../types/theme"
import { THEMES } from "../themes/themes"

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
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

  const setTheme = (theme: Theme) => {
    setThemeId(theme.id as MoodTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)