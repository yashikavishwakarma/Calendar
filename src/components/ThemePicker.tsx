import { useState } from "react"
import type { Dispatch, SetStateAction } from "react"
import { useTheme } from "../context/ThemeContext"
import { THEMES } from "../themes/themes"

interface ThemePickerProps {
  language: "en" | "hi"
  setLanguage: Dispatch<SetStateAction<"en" | "hi">>
  text: string
  languageButton: string
}

const ThemePicker = ({ language, setLanguage, text, languageButton }: ThemePickerProps) => {
  const { theme, setTheme } = useTheme()
  const [open, setOpen] = useState(false)

  return (
    <div style={{ position: "relative" }}>

      {/* Trigger button */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "10px 16px",
          borderRadius: "999px",
          border: "1px solid rgba(255,255,255,0.22)",
          backgroundColor: "rgba(255,255,255,0.16)",
          color: "var(--text-primary)",
          cursor: "pointer",
          fontSize: "13px",
          fontWeight: 700,
          transition: "all 0.2s",
          backdropFilter: "blur(18px)",
          boxShadow: "0 18px 40px rgba(0,0,0,0.15)",
          borderColor: "var(--glass-border)",
        }}
      >
        <div style={{
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          backgroundColor: "var(--accent)",
          boxShadow: "0 0 12px var(--accent)",
        }} />
        <span>{theme.name}</span>

        <span style={{ fontSize: "10px", color: "var(--accent)", marginLeft: "2px" }}>
          {open ? "▲" : "▼"}
        </span>
      </button>

      <button
        type="button"
        onClick={() => setLanguage(language === "en" ? "hi" : "en")}
        style={{
          width: "100%",
          marginTop: "10px",
          padding: "10px 16px",
          borderRadius: "999px",
          border: "1px solid rgba(255,255,255,0.22)",
          backgroundColor: "rgba(255,255,255,0.16)",
          color: "var(--text-primary)",
          cursor: "pointer",
          fontSize: "13px",
          fontWeight: 700,
          transition: "all 0.2s",
          backdropFilter: "blur(18px)",
          boxShadow: "0 18px 40px rgba(0,0,0,0.15)",
          borderColor: "var(--glass-border)",
        }}
      >
        {languageButton}
      </button>

      {/* Dropdown */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            right: 0,
            width: "280px",
            backgroundColor: "rgba(255,255,255,0.18)",
            border: "1px solid var(--glass-border)",
            borderRadius: "20px",
            padding: "12px",
            zIndex: 100,
            boxShadow: "0 30px 70px rgba(0,0,0,0.18)",
            backdropFilter: "blur(22px)",
          }}
        >
          <p style={{
            margin: "4px 8px 8px",
            fontSize: "10px",
            fontWeight: 700,
            color: "var(--text-muted)",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}>
            {text}
          </p>

          {THEMES.map(t => (
            <button
              key={t.id}
              onClick={() => { setTheme(t); setOpen(false) }}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "12px 14px",
                borderRadius: "14px",
                border: "1px solid transparent",
                backgroundColor: theme.id === t.id ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.08)",
                cursor: "pointer",
                transition: "background 0.2s, transform 0.2s",
                textAlign: "left",
                boxShadow: theme.id === t.id ? "inset 0 0 0 1px rgba(255,255,255,0.24)" : "none",
              }}
            >
              <div style={{
                width: "36px",
                height: "36px",
                borderRadius: "16px",
                backgroundColor: t.id === "tuf" ? "#000" : "transparent",
                backgroundImage: t.image ? `url(${t.image})` : undefined,
                backgroundSize: "cover",
                backgroundPosition: "center",
                flexShrink: 0,
                border: "1px solid rgba(255,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                {t.id === "tuf" && (
                  <span style={{
                    color: "#fff",
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                  }}>
                    TUF
                  </span>
                )}
              </div>

              <div>
                <p style={{
                  margin: 0,
                  fontSize: "13px",
                  fontWeight: 700,
                  color: theme.id === t.id ? "var(--accent)" : "var(--text-primary)",
                }}>
                  {t.name}
                </p>
                <p style={{
                  margin: 0,
                  fontSize: "10px",
                  color: "var(--text-secondary)",
                }}>
                  {t.mood}
                </p>
              </div>

              {theme.id === t.id && (
                <span style={{ marginLeft: "auto", color: "var(--accent)", fontSize: "14px" }}>
                  ✓
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default ThemePicker