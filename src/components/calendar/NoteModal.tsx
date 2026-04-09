import { useState } from "react"
import type { CalendarNote } from "../../types/calendar"

const EMOJIS = [
  "🎉","📅","🔥","⭐","💡","📝","🎯","✅","❌","🚀",
  "💼","🎓","🏆","💰","📢","🎁","🍕","☕","🎵","💪",
  "🌟","📌","🔔","💻","🎮","🏋️","🌈","🤝","📊","🎨",
  "😊","😎","🥳","🤔","💯","🙌","👏","❤️","🌍","⚡"
]

interface Props {
  day: number
  month: number
  year: number
  existing?: CalendarNote
  onSave: (note: CalendarNote) => void
  onClose: () => void
}

const NoteModal = ({ day, month, year, existing, onSave, onClose }: Props) => {
  const [text, setText] = useState(existing?.text || "")
  const [emoji, setEmoji] = useState(existing?.emoji || "📝")
  const [position, setPosition] = useState<"left" | "right">(existing?.position || "left")
  const [pinned, setPinned] = useState(existing?.pinned || false)

  const handleSave = () => {
    if (!text.trim()) return
    onSave({
      id: existing?.id ?? `${day}-${month}-${year}`,
      day, month, year,
      text: text.trim(),
      emoji,
      position,
      pinned,
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-[420px] p-6 flex flex-col gap-4">

        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-700">
            Add Note — {day}/{month + 1}/{year}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
        </div>

        {/* Text input */}
        <textarea
          className="border border-gray-200 rounded-xl p-3 text-sm text-gray-700 resize-none h-24 focus:outline-none focus:ring-2 focus:ring-blue-300"
          placeholder="Write your note..."
          value={text}
          onChange={e => setText(e.target.value)}
        />

        {/* Top Note Toggle */}
        <button
          onClick={() => setPinned(p => !p)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "10px 14px",
            borderRadius: "12px",
            border: pinned ? "1.5px solid #fbbf24" : "1.5px solid #e5e7eb",
            backgroundColor: pinned ? "#fffbeb" : "#f9fafb",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
        >
          <span style={{ fontSize: "20px" }}>⭐</span>
          <div style={{ textAlign: "left" }}>
            <p style={{ margin: 0, fontSize: "13px", fontWeight: 600, color: pinned ? "#d97706" : "#6b7280" }}>
              {pinned ? "Marked as Top Note" : "Mark as Top Note"}
            </p>
            <p style={{ margin: 0, fontSize: "10px", color: "#9ca3af" }}>
              This note will be highlighted in the notes panel
            </p>
          </div>
          {/* Toggle indicator */}
          <div style={{ marginLeft: "auto" }}>
            <div style={{
              width: "36px",
              height: "20px",
              borderRadius: "999px",
              backgroundColor: pinned ? "#f59e0b" : "#d1d5db",
              position: "relative",
              transition: "background-color 0.2s",
            }}>
              <div style={{
                position: "absolute",
                top: "2px",
                left: pinned ? "18px" : "2px",
                width: "16px",
                height: "16px",
                borderRadius: "50%",
                backgroundColor: "white",
                transition: "left 0.2s",
              }} />
            </div>
          </div>
        </button>

        {/* Emoji picker */}
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Pick Emoji</p>
          <div className="grid grid-cols-10 gap-1">
            {EMOJIS.map(e => (
              <button
                key={e}
                onClick={() => setEmoji(e)}
                className={`text-xl p-1 rounded-lg hover:bg-blue-50 transition-all ${emoji === e ? "bg-blue-100 ring-2 ring-blue-400 scale-110" : ""}`}
              >
                {e}
              </button>
            ))}
          </div>
        </div>

        {/* Position selector */}
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Placement</p>
          <div className="flex gap-3">
            {(["left", "right"] as const).map(pos => (
              <button
                key={pos}
                onClick={() => setPosition(pos)}
                className={`flex-1 py-2 rounded-xl border-2 text-sm font-semibold capitalize transition-all
                  ${position === pos
                    ? "border-blue-500 bg-blue-50 text-blue-600"
                    : "border-gray-200 text-gray-400 hover:border-blue-200"}`}
              >
                {pos === "left" ? "⬅️ Left" : "Right ➡️"}
              </button>
            ))}
          </div>
        </div>

        {/* Preview */}
        <div className="bg-gray-50 rounded-xl p-3 flex items-start gap-2 border border-gray-100">
          <span className="text-2xl">{emoji}</span>
          <div style={{ flex: 1 }}>
            <p className="text-sm text-gray-600">{text || "Your note preview..."}</p>
          </div>
          {pinned && (
            <span style={{
              fontSize: "9px",
              fontWeight: 700,
              backgroundColor: "#fef3c7",
              color: "#d97706",
              padding: "2px 6px",
              borderRadius: "999px",
              whiteSpace: "nowrap",
            }}>
              ⭐ TOP
            </span>
          )}
        </div>

        {/* Save */}
        <button
          onClick={handleSave}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-xl transition-all"
        >
          Save Note
        </button>

      </div>
    </div>
  )
}

export default NoteModal