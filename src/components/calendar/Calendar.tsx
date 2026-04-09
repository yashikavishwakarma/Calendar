import { useState, useRef } from "react"
import CalendarHeader from "./CalendarHeader"
import CalendarGrid from "./CalendarGrid"
import { useCalendar } from "../../hooks/useCalendar"

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

const CalendarContent = ({
  currentDate, getNote, addNote, onPrev, onNext, notes, translations, isSnapshot = false,
}: {
  currentDate: Date; getNote: any; addNote: any
  onPrev: () => void; onNext: () => void; notes: any[]
  translations: { [key: string]: any }
  isSnapshot?: boolean
}) => {
  const [activeTab, setActiveTab] = useState<"notes" | "festival">("notes")
  const festivalNotes = notes.filter(note => !!note.image)
  const regularNotes = notes.filter(note => !note.image)
  const months = translations.months || MONTHS

  return (
    <div className="calendar-container" style={{
      width: "100%", height: "100%", display: "flex", flexDirection: "column",
      overflow: "hidden", borderRadius: "20px",
      backgroundColor: "var(--glass-bg)", border: "1px solid var(--glass-border)",
      boxShadow: "0 35px 90px rgba(0,0,0,0.18)", backdropFilter: "blur(20px)",
    }}>
      <div style={{ height: "45%", flexShrink: 0 }}>
        <CalendarHeader currentDate={currentDate} prevMonth={onPrev} nextMonth={onNext} months={translations.months} />
      </div>
      <div className="calendar-body">
        <div className="calendar-grid-panel" style={{
          borderTop: "1px solid var(--glass-border)", overflow: "hidden",
        }}>
          <CalendarGrid currentDate={currentDate} getNote={getNote} addNote={addNote} translations={translations} />
        </div>
        <div className="calendar-notes-panel" style={{
          borderTop: "1px solid var(--glass-border)", borderLeft: "1px solid var(--glass-border)",
          display: "flex", flexDirection: "column", overflow: "hidden",
          backgroundColor: "rgba(255,255,255,0.18)",
          backdropFilter: "blur(18px)",
        }}>
          <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--border)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <button
                type="button"
                onClick={() => setActiveTab("notes")}
                style={{
                  flex: 1,
                  padding: "10px 12px",
                  borderRadius: "14px",
                  border: activeTab === "notes" ? "1px solid var(--accent)" : "1px solid transparent",
                  background: activeTab === "notes" ? "rgba(255,255,255,0.12)" : "transparent",
                  color: activeTab === "notes" ? "var(--text-primary)" : "var(--text-muted)",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                {translations.notesTab} ({regularNotes.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("festival")}
                style={{
                  flex: 1,
                  padding: "10px 12px",
                  borderRadius: "14px",
                  border: activeTab === "festival" ? "1px solid var(--accent)" : "1px solid transparent",
                  background: activeTab === "festival" ? "rgba(255,255,255,0.12)" : "transparent",
                  color: activeTab === "festival" ? "var(--text-primary)" : "var(--text-muted)",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                {translations.festivalTab} ({festivalNotes.length})
              </button>
            </div>
          </div>
          <div style={{
            flex: 1,
            overflowY: isSnapshot ? "hidden" : "auto",
            padding: "8px 12px",
            display: "flex", flexDirection: "column", gap: "14px",
          }}>
            {activeTab === "festival" ? (
              festivalNotes.length > 0 ? (
                <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "10px" }}>
                  {festivalNotes.map(note => (
                    <div key={note.id} style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "12px",
                      borderRadius: "16px",
                      backgroundColor: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.12)",
                    }}>
                      <span style={{ fontSize: "18px" }}>{note.image}</span>
                      <div style={{ minWidth: 0 }}>
                        <p style={{ margin: 0, fontSize: "10px", color: "var(--text-muted)" }}>
                          {note.day} {months[note.month]} {note.year}
                        </p>
                        <p style={{ margin: 0, fontSize: "12px", fontWeight: 600, color: "var(--text-primary)" }}>
                          {note.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ color: "var(--text-muted)", fontSize: "12px", textAlign: "center", marginTop: "24px" }}>
                  {translations.noFestivalEvents}
                </p>
              )
            ) : (
              regularNotes.length > 0 ? (
                regularNotes.map(note => (
                  <div key={note.id} style={{
                    position: "relative", display: "flex", alignItems: "flex-start", gap: "8px",
                    padding: note.pinned ? "16px 10px 10px" : "10px", borderRadius: "12px",
                    border: note.pinned ? "1.5px solid var(--accent)" : "1px solid var(--border)",
                    backgroundColor: note.pinned ? "var(--accent-soft)" : "var(--bg-card)",
                  }}>
                    {note.pinned && (
                      <div style={{
                        position: "absolute", top: "-8px", left: "10px",
                        backgroundColor: "var(--accent)", color: "var(--today-text)",
                        fontSize: "9px", fontWeight: 700, padding: "2px 8px",
                        borderRadius: "999px", letterSpacing: "0.05em",
                      }}>⭐ TOP NOTE</div>
                    )}
                    <span style={{ fontSize: "20px", lineHeight: 1, flexShrink: 0 }}>{note.emoji}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ margin: "0 0 2px", fontSize: "10px", color: "var(--text-muted)" }}>
                        {note.day}
                        {note.endDay ? ` - ${note.endDay}` : ""} {months[note.month]} {note.year}
                      </p>
                      <p style={{
                        margin: 0, fontSize: "12px", fontWeight: 600, color: "var(--text-primary)",
                        lineHeight: 1.4, wordBreak: "break-word",
                      }}>{note.text}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ color: "var(--text-muted)", fontSize: "12px", textAlign: "center", marginTop: "24px" }}>
                  {translations.noNotesYet}
                </p>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const Calendar = ({ translations }: { translations: { [key: string]: any } }) => {
  const { currentDate, prevMonth, nextMonth, addNote, getNote, notes } = useCalendar()
  const [isFlipping, setIsFlipping] = useState(false)
  const [direction, setDirection] = useState<"next" | "prev">("next")
  const [frontDate, setFrontDate] = useState(currentDate)
  const [backDate, setBackDate] = useState(currentDate)
  const isAnimating = useRef(false)

  const flip = (dir: "next" | "prev", action: () => void) => {
    if (isAnimating.current) return
    isAnimating.current = true
    setDirection(dir)

    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + (dir === "next" ? 1 : -1),
      1
    )
    setFrontDate(currentDate)
    setBackDate(newDate)
    setIsFlipping(true)

    setTimeout(() => action(), 450)
    setTimeout(() => {
      setIsFlipping(false)
      isAnimating.current = false
    }, 900)
  }

  const handlePrev = () => flip("prev", prevMonth)
  const handleNext = () => flip("next", nextMonth)

  return (
    <>
      <style>{`
        html, body {
          overflow: hidden;
        }

        .calendar-body {
          display: flex;
          flex: 1;
          overflow: hidden;
          gap: 16px;
          gap: 16px;
        }

        .calendar-grid-panel {
          width: 70%;
          border-top: 1px solid var(--glass-border);
          overflow: hidden;
        }

        .calendar-notes-panel {
          width: 30%;
          border-top: 1px solid var(--glass-border);
          border-left: 1px solid var(--glass-border);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          background-color: rgba(255,255,255,0.18);
          backdrop-filter: blur(18px);
        }

        @media (max-width: 920px) {
          .calendar-container {
            width: 90vw;
            max-width: 520px;
          }

          .calendar-body {
            flex-direction: column;
          }
          .calendar-grid-panel,
          .calendar-notes-panel {
            width: 100%;
          }
          .calendar-notes-panel {
            border-left: none;
            border-top: 1px solid var(--glass-border);
          }
        }

        @keyframes bookFlipNext {
          0%   { transform: perspective(2000px) rotateX(0deg);   }
          100% { transform: perspective(2000px) rotateX(180deg); }
        }
        @keyframes bookFlipPrev {
          0%   { transform: perspective(2000px) rotateX(0deg);    }
          100% { transform: perspective(2000px) rotateX(-180deg); }
        }
        @keyframes faceShadow {
          0%   { opacity: 0;    }
          45%  { opacity: 0.6;  }
          50%  { opacity: 0.65; }
          100% { opacity: 0;    }
        }
        @keyframes backReveal {
          0%,  50% { opacity: 0; }
          51%, 100% { opacity: 1; }
        }
        @keyframes spineShadowNext {
          0%   { opacity: 0;    height: 0px;  }
          20%  { opacity: 0.45; height: 70px; }
          50%  { opacity: 0.5;  height: 90px; }
          80%  { opacity: 0.3;  height: 55px; }
          100% { opacity: 0;    height: 0px;  }
        }
        @keyframes spineShadowPrev {
          0%   { opacity: 0;    height: 0px;  }
          20%  { opacity: 0.45; height: 70px; }
          50%  { opacity: 0.5;  height: 90px; }
          80%  { opacity: 0.3;  height: 55px; }
          100% { opacity: 0;    height: 0px;  }
        }
      `}</style>

      <div style={{
        width: "80%",
        maxWidth: "1200px",
        height: "80vh",
        position: "relative",
        perspective: "2000px",
        margin: "auto",
        overflow: "hidden",
      }}>

        {/* STATIC PAGE — new month revealed beneath */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 1,
          borderRadius: "20px", overflow: "hidden",
          boxShadow: "0 25px 60px rgba(0,0,0,0.3)",
        }}>
          <CalendarContent
            currentDate={isFlipping ? backDate : currentDate}
            getNote={getNote} addNote={addNote}
            onPrev={handlePrev} onNext={handleNext}
            notes={notes}
            translations={translations}
            isSnapshot={false}
          />

          {isFlipping && (
            <div style={{
              position: "absolute", left: 0, right: 0,
              pointerEvents: "none", zIndex: 2, borderRadius: "20px",
              ...(direction === "next"
                ? { top: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 100%)" }
                : { bottom: 0, background: "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 100%)" }
              ),
              animation: `${direction === "next" ? "spineShadowNext" : "spineShadowPrev"} 0.9s ease forwards`,
            }} />
          )}
        </div>

        {/* TURNING PAGE */}
        {isFlipping && (
          <div style={{
            position: "absolute", inset: 0, zIndex: 4,
            transformStyle: "preserve-3d",
            transformOrigin: direction === "next" ? "center top" : "center bottom",
            animation: `${direction === "next" ? "bookFlipNext" : "bookFlipPrev"} 0.9s cubic-bezier(0.45, 0.05, 0.55, 0.95) forwards`,
          }}>

            {/* FRONT FACE — snapshot, no scroll, no pointer events */}
            <div style={{
              position: "absolute", inset: 0, borderRadius: "20px",
              overflow: "hidden",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              pointerEvents: "none",
            }}>
              <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
                <CalendarContent
                  currentDate={frontDate}
                  getNote={getNote} addNote={addNote}
                  onPrev={() => {}} onNext={() => {}}
                  notes={notes}
                  translations={translations}
                  isSnapshot={true}
                />
              </div>
              <div style={{
                position: "absolute", inset: 0, borderRadius: "20px",
                pointerEvents: "none", zIndex: 2,
                background: direction === "next"
                  ? "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.05) 60%, transparent 100%)"
                  : "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.05) 60%, transparent 100%)",
                animation: "faceShadow 0.9s ease forwards",
              }} />
            </div>

            {/* BACK FACE — snapshot of new month */}
            <div style={{
              position: "absolute", inset: 0, borderRadius: "20px",
              overflow: "hidden",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateX(-180deg)",
              pointerEvents: "none",
              animation: "backReveal 0.9s ease forwards",
            }}>
              <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
                <CalendarContent
                  currentDate={backDate}
                  getNote={getNote} addNote={addNote}
                  onPrev={() => {}} onNext={() => {}}
                  notes={notes}
                  translations={translations}
                  isSnapshot={true}
                />
              </div>
            </div>

          </div>
        )}
      </div>
    </>
  )
}

export default Calendar