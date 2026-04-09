import { useState } from "react"
import CalendarCell from "./CalendarCell"
import type { CalendarNote } from "../../types/calendar"

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

interface Props {
  currentDate: Date
  getNote: (day: number, month: number, year: number) => CalendarNote | undefined
  addNote: (note: CalendarNote) => void
}

const CalendarGrid = ({ currentDate, getNote, addNote }: Props) => {
  const [selectedDates, setSelectedDates] = useState<number[]>([])
  const [noteText, setNoteText] = useState("")

  const today = new Date()
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const firstDay = new Date(year, month, 1).getDay()
  const totalDays = new Date(year, month + 1, 0).getDate()
  const prevMonthDays = new Date(year, month, 0).getDate()

  // ✅ select logic
  const handleSelect = (day: number) => {
    setSelectedDates((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    )
  }

  // ✅ save notes
  const handleSave = () => {
    if (!noteText.trim()) return

    selectedDates.forEach((day) => {
      addNote({
        day,
        month,
        year,
        text: noteText,
      })
    })

    setSelectedDates([])
    setNoteText("")
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
    <div style={{ display: "flex", height: "100%" }}>
      
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
              note={getNote(cell.day, month, year)}
              isSelected={selectedDates.includes(cell.day)}
              onClick={() => handleSelect(cell.day)}
            />
          ))}
        </div>
      </div>

      {/* RIGHT PANEL (only when selected) */}
      {selectedDates.length > 0 && (
        <div style={{
          width: "300px",
          borderLeft: "1px solid var(--border)",
          padding: "16px",
        }}>
          <h3 style={{ marginBottom: "10px" }}>Add Notes</h3>

          <div style={{ marginBottom: "10px" }}>
            <strong>Selected:</strong> {selectedDates.join(", ")}
          </div>

          <textarea
            placeholder="Write your note..."
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
            Save Note
          </button>
        </div>
      )}
    </div>
  )
}

export default CalendarGrid