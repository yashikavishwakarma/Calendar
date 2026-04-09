import { useState } from "react"
import { useTheme } from "../context/ThemeContext"
import { THEMES } from "../themes/themes"

const ThemePicker = () => {
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
          padding: "8px 14px",
          borderRadius: "999px",
          border: `1.5px solid var(--accent)`,
          backgroundColor: "var(--accent-soft)",
          color: "var(--text-primary)",
          cursor: "pointer",
          fontSize: "13px",
          fontWeight: 600,
          transition: "all 0.2s",
        }}
      >
        <span style={{ fontSize: "16px" }}>{theme.emoji}</span>
        <span>{theme.name}</span>
        <span style={{ fontSize: "10px", color: "var(--accent)", marginLeft: "2px" }}>
          {open ? "▲" : "▼"}
        </span>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            right: 0,
            width: "260px",
            backgroundColor: "var(--bg-secondary)",
            border: "1px solid var(--border)",
            borderRadius: "16px",
            padding: "8px",
            zIndex: 100,
            boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
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
            pick ur vibe
          </p>

          {THEMES.map(t => (
            <button
              key={t.id}
              onClick={() => { setTheme(t.id); setOpen(false) }}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 12px",
                borderRadius: "10px",
                border: "none",
                backgroundColor: theme.id === t.id ? "var(--accent-soft)" : "transparent",
                cursor: "pointer",
                transition: "background 0.15s",
                textAlign: "left",
              }}
            >
              <span style={{ fontSize: "20px" }}>{t.emoji}</span>
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
                <span style={{ marginLeft: "auto", color: "var(--accent)", fontSize: "14px" }}>✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default ThemePicker