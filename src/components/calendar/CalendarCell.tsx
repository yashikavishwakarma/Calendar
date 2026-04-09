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
  const isFestival = !!note?.image && isCurrent
  const hasNote = !!note && isCurrent
  const showNoteEmoji = !!note?.emoji && !note?.image

  return (
    <>
      <style>{`
        .calendar-cell-date {
          font-size: 16px;
          font-weight: 600;
          color: ${isCurrent ? "var(--text-primary)" : "var(--text-muted)"};
        }

        .calendar-cell-emoji {
          position: absolute;
          left: 6px;
          top: 50%;
          transform: translateY(-50%);
          width: 26px;
          height: 26px;
          border-radius: 10px;
          padding: 2px;
          background: rgba(0, 0, 0, 0.24);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
        }

        .calendar-cell-image {
          position: absolute;
          left: 6px;
          top: 50%;
          transform: translateY(-50%);
          width: 26px;
          height: 26px;
          border-radius: 10px;
          padding: 2px;
          background: rgba(0, 0, 0, 0.12);
          color: var(--text-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
        }

        @media (max-width: 640px) {
          .calendar-cell-has-emoji .calendar-cell-date,
          .calendar-cell-has-image .calendar-cell-date {
            display: none;
          }

          .calendar-cell-emoji,
          .calendar-cell-image {
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 34px;
            height: 34px;
            font-size: 18px;
          }
        }
      `}</style>
      <div
        className={showNoteEmoji ? "calendar-cell-has-emoji" : note?.image ? "calendar-cell-has-image" : undefined}
        onClick={isCurrent ? onClick : undefined}
        onMouseEnter={isCurrent ? onHover : undefined}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          boxSizing: "border-box",
          borderRadius: "16px",
          backgroundColor: isToday
            ? "var(--date-today-bg, rgba(255,255,255,0.18))"
            : isSelected
            ? "var(--accent-soft)"
            : isFestival
            ? "rgba(255,255,255,0.12)"
            : hasNote
            ? "var(--accent-soft)"
            : isCurrent
            ? "var(--date-bg, rgba(255,255,255,0.06))"
            : "transparent",
          border: isToday
            ? "1px solid var(--accent)"
            : isSelected
            ? "2px solid var(--accent)"
            : hasNote
            ? "1px solid var(--accent)"
            : isCurrent
            ? `1px solid var(--date-border, rgba(255,255,255,0.12))`
            : "none",
          boxShadow: isToday ? "0 0 18px rgba(0, 0, 0, 0.2)" : "none",
          cursor: isCurrent ? "pointer" : "default",
          transition: "all 0.2s ease",
        }}
      >
        {/* Day */}
        <span className="calendar-cell-date">
          {day}
        </span>

      {/* Note emoji */}
      {showNoteEmoji && (
        <div className="calendar-cell-emoji">
          {note.emoji}
        </div>
      )}

      {/* Festival badge */}
      {note?.image && (
        <div className="calendar-cell-image">
          {note.image}
        </div>
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
    </div>
    </>
  )
}

export default CalendarCell