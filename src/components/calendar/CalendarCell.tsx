import type { CalendarNote } from "../../types/calendar"

interface CalendarCellProps {
  day: number
  type: "prev" | "current" | "next"
  isToday: boolean
  note?: CalendarNote
  isSelected?: boolean
  onClick: () => void
  onHover?: () => void
}

const CalendarCell = ({
  day,
  type,
  isToday,
  note,
  isSelected,
  onClick,
  onHover,
}: CalendarCellProps) => {
  const isCurrent = type === "current"

  return (
    <div
      onClick={isCurrent ? onClick : undefined}
      onMouseEnter={isCurrent ? onHover : undefined}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        borderRadius: "16px",
        backgroundColor: isCurrent ? "var(--bg-card)" : "transparent",
        cursor: isCurrent ? "pointer" : "default",
        transition: "all 0.2s ease",
      }}
    >
      {/* Day */}
      <span
        style={{
          fontSize: "16px",
          fontWeight: 600,
          color: isCurrent ? "var(--text-primary)" : "var(--text-muted)",
        }}
      >
        {day}
      </span>

      {/* Today */}
      {isToday && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "16px",
            border: "2px solid var(--accent)",
            boxShadow: "0 0 8px var(--accent-soft)",
          }}
        />
      )}

      {/* Selected */}
      {isSelected && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "16px",
            border: "2px solid var(--accent)",
            background: "var(--accent-soft)",
            opacity: 0.3,
          }}
        />
      )}

      {/* Dot */}
      {note && isCurrent && (
        <div
          style={{
            position: "absolute",
            bottom: "6px",
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            backgroundColor: "var(--accent)",
          }}
        />
      )}
    </div>
  )
}

export default CalendarCell