import { useState } from "react"
import CalendarCell from "./CalendarCell"
import type { CalendarNote } from "../../types/calendar"

const DEFAULT_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

interface Props {
  currentDate: Date
  getNote: (day: number, month: number, year: number) => CalendarNote | undefined
  addNote: (note: CalendarNote) => void
  translations: { [key: string]: any }
}

const CalendarGrid = ({ currentDate, getNote, addNote, translations }: Props) => {
  const [selectionStart, setSelectionStart] = useState<number | null>(null)
  const [selectionEnd, setSelectionEnd] = useState<number | null>(null)
  const [noteText, setNoteText] = useState("")
  const DAYS: string[] = translations.days || DEFAULT_DAYS
  const [noteEmoji, setNoteEmoji] = useState("")
  const [notesOpen, setNotesOpen] = useState(true)
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false)

  const today = new Date()
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const firstDay = new Date(year, month, 1).getDay()
  const totalDays = new Date(year, month + 1, 0).getDate()
  const prevMonthDays = new Date(year, month, 0).getDate()

  const selectedDates = (() => {
    if (selectionStart === null) return []
    const start = Math.min(selectionStart, selectionEnd ?? selectionStart)
    const end = Math.max(selectionStart, selectionEnd ?? selectionStart)
    return Array.from({ length: end - start + 1 }, (_, idx) => start + idx)
  })()

  const handleSelect = (day: number) => {
    if (selectionStart === null) {
      setSelectionStart(day)
      setSelectionEnd(null)
      return
    }

    if (selectionEnd === null) {
      setSelectionEnd(day)
      return
    }

    setSelectionStart(day)
    setSelectionEnd(null)
  }

  const handleSave = () => {
    if (!noteText.trim() || selectionStart === null) return

    const dayFrom = Math.min(selectionStart, selectionEnd ?? selectionStart)
    const dayTo = Math.max(selectionStart, selectionEnd ?? selectionStart)

    addNote({
      id: Math.random().toString(36).slice(2, 12),
      day: dayFrom,
      endDay: dayTo !== dayFrom ? dayTo : undefined,
      month,
      year,
      text: noteText,
      emoji: noteEmoji || undefined,
    })

    setSelectionStart(null)
    setSelectionEnd(null)
    setNoteText("")
    setNoteEmoji("")
  }

  const cells = Array.from({ length: 42 }).map((_, i) => {
    if (i < firstDay)
      return { day: prevMonthDays - firstDay + i + 1, type: "prev" as const }
    else if (i < firstDay + totalDays)
      return { day: i - firstDay + 1, type: "current" as const }
    else
      return { day: i - firstDay - totalDays + 1, type: "next" as const }
  })

  return (
    <div className="calendar-grid-layout" style={{ display: "flex", height: "100%" }}>
      <style>{`
        .calendar-grid-layout {
          display: flex;
          height: 100%;
          gap: 16px;
        }

        .calendar-add-panel {
          transition: width 0.25s ease;
        }

        .calendar-add-panel .add-emoji-button {
          min-width: 140px;
        }

        @media (max-width: 820px) {
          .calendar-grid-layout {
            flex-direction: column;
            overflow-y: auto;
          }

          .calendar-add-panel {
            width: 100% !important;
            min-width: auto !important;
            border-left: none !important;
            border-top: 1px solid var(--border) !important;
            flex-shrink: 0;
            min-height: 300px;
          }

          .calendar-add-panel .add-emoji-button {
            width: 100%;
          }
        }

        @media (max-width: 520px) {
          .calendar-grid-layout {
            gap: 10px;
          }

          .calendar-add-panel {
            padding-top: 12px;
          }
        }
      `}</style>
      
      {/* LEFT: Calendar */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>

        {/* Days */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          padding: "10px",
          gap: "6px",
        }}>
          {DAYS.map(day => (
            <div key={day} style={{
              textAlign: "center",
              fontSize: "12px",
              fontWeight: 600,
              color: "var(--day-label)",
            }}>
              {day}
            </div>
          ))}
        </div>

        {/* Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gridTemplateRows: "repeat(6, 1fr)",
          gap: "6px",
          padding: "10px",
          flex: 1,
        }}>
          {cells.map((cell, i) => (
            <CalendarCell
              key={i}
              day={cell.day}
              type={cell.type}
              isToday={
                cell.type === "current" &&
                cell.day === today.getDate() &&
                month === today.getMonth() &&
                year === today.getFullYear()
              }
              note={cell.type === "current" ? getNote(cell.day, month, year) : undefined}
              isSelected={cell.type === "current" && selectedDates.includes(cell.day)}
              onClick={() => handleSelect(cell.day)}
            />
          ))}
        </div>
      </div>

      {/* RIGHT PANEL (only when selected) */}
      {selectedDates.length > 0 && (
        <div className="calendar-add-panel" style={{
          width: notesOpen ? "300px" : "40px",
          minWidth: notesOpen ? "300px" : "40px",
          borderLeft: "1px solid var(--border)",
          position: "relative",
          overflow: "hidden",
          background: "rgba(255,255,255,0.04)",
          transition: "width 0.25s ease",
          display: "flex",
          flexDirection: "column",
          minHeight: 0,
        }}>
          <button
            onClick={() => setNotesOpen((open) => !open)}
            aria-label={notesOpen ? "Hide notes panel" : "Show notes panel"}
            style={{
              position: "absolute",
              top: "16px",
              left: notesOpen ? "-18px" : "8px",
              width: "32px",
              height: "32px",
              borderRadius: "999px",
              border: "1px solid var(--border)",
              background: "var(--bg-card)",
              color: "var(--text-primary)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 20px rgba(0,0,0,0.18)",
              transition: "left 0.25s ease, transform 0.25s ease",
              transform: notesOpen ? "translateX(0)" : "translateX(0)",
            }}
          >
            {notesOpen ? ">" : "<"}
          </button>

          <div style={{
            width: "100%",
            transform: notesOpen ? "translateX(0)" : "translateX(260px)",
            transition: "transform 0.25s ease",
            padding: "16px",
            color: "var(--text-primary)",
            flex: 1,
            overflowY: "auto",
            minHeight: 0,
          }}>
            <h3 style={{ marginBottom: "10px", color: "var(--text-primary)" }}>{translations.addNotesHeader}</h3>

            <div style={{ marginBottom: "10px", color: "var(--text-primary)" }}>
              <strong style={{ color: "var(--text-muted)" }}>{translations.selectedLabel}</strong> {selectedDates.length > 1
                ? `${selectedDates[0]} - ${selectedDates[selectedDates.length - 1]}`
                : selectedDates[0]}
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "14px" }}>
              <button
                type="button"
                className="add-emoji-button"
                onClick={() => setEmojiPickerOpen((open) => !open)}
                style={{
                  padding: "10px 14px",
                  borderRadius: "10px",
                  border: "1px solid var(--border)",
                  background: "var(--bg-card)",
                  color: "var(--text-primary)",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                {noteEmoji ? `${translations.selectedEmoji} ${noteEmoji}` : translations.pickEmoji}
              </button>
              {noteEmoji && (
                <span style={{ color: "var(--text-muted)", fontSize: "13px", alignSelf: "center" }}>
                  {translations.selectedEmoji} {noteEmoji}
                </span>
              )}
            </div>

            {emojiPickerOpen && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "16px" }}>
                {["🎉", "🎂", "🥳", "🎈", "🪔", "🌈", "🎄", "✨", "🥂", "🎁"].map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => {
                      setNoteEmoji(emoji)
                      setEmojiPickerOpen(false)
                    }}
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "12px",
                      border: noteEmoji === emoji ? "2px solid var(--accent)" : "1px solid var(--border)",
                      background: "var(--bg-card)",
                      cursor: "pointer",
                      fontSize: "18px",
                    }}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}

            <textarea
              placeholder={translations.writeNotePlaceholder}
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              style={{
                width: "100%",
                height: "80px",
                borderRadius: "8px",
                padding: "8px",
                border: "1px solid var(--border)",
                background: "var(--bg-card)",
                color: "var(--text-primary)",
              }}
            />

            <button
              onClick={handleSave}
              style={{
                marginTop: "10px",
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "none",
                background: "var(--accent)",
                color: "#fff",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {translations.saveNote}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CalendarGrid