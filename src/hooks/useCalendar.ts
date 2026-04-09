import { useState, useEffect } from "react"
import type { CalendarNote } from "../types/calendar"

const STORAGE_KEY = "calendar-notes"

const defaultNotes: CalendarNote[] = [
  {
    id: "festival-new-year",
    day: 1,
    month: 0,
    year: new Date().getFullYear(),
    text: "New Year's Day",
    emoji: "🎉",
    image: "🎉",
  },
  {
    id: "festival-valentines",
    day: 14,
    month: 1,
    year: new Date().getFullYear(),
    text: "Valentine's Day",
    emoji: "💘",
    image: "💘",
  },
  {
    id: "festival-holi",
    day: 25,
    month: 2,
    year: new Date().getFullYear(),
    text: "Holi",
    emoji: "🌈",
    image: "🌈",
  },
  {
    id: "festival-easter",
    day: 17,
    month: 3,
    year: new Date().getFullYear(),
    text: "Easter",
    emoji: "🐣",
    image: "🐣",
  },
  {
    id: "festival-cinco",
    day: 5,
    month: 4,
    year: new Date().getFullYear(),
    text: "Cinco de Mayo",
    emoji: "🌮",
    image: "🌮",
  },
  {
    id: "festival-eid-fitr",
    day: 10,
    month: 3,
    year: new Date().getFullYear(),
    text: "Eid al-Fitr",
    emoji: "🕌",
    image: "🕌",
  },
  {
    id: "festival-ramadan",
    day: 22,
    month: 2,
    year: new Date().getFullYear(),
    text: "Ramadan Begins",
    emoji: "🌙",
    image: "🌙",
  },
  {
    id: "festival-diwali",
    day: 24,
    month: 9,
    year: new Date().getFullYear(),
    text: "Diwali",
    emoji: "🪔",
    image: "🪔",
  },
  {
    id: "festival-halloween",
    day: 31,
    month: 9,
    year: new Date().getFullYear(),
    text: "Halloween",
    emoji: "🎃",
    image: "🎃",
  },
  {
    id: "festival-thanksgiving",
    day: 28,
    month: 10,
    year: new Date().getFullYear(),
    text: "Thanksgiving",
    emoji: "🦃",
    image: "🦃",
  },
  {
    id: "festival-christmas",
    day: 25,
    month: 11,
    year: new Date().getFullYear(),
    text: "Christmas",
    emoji: "🎄",
    image: "🎄",
  },
]

export const useCalendar = () => {
  const today = new Date()
  const [currentDate, setCurrentDate] = useState(today)
  const [notes, setNotes] = useState<CalendarNote[]>([])

  // Load notes from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const parsedNotes = JSON.parse(stored)
        setNotes(parsedNotes)
      } catch (error) {
        console.error("Failed to parse stored notes:", error)
        setNotes(defaultNotes)
      }
    } else {
      setNotes(defaultNotes)
    }
  }, [])

  // Save notes to localStorage whenever notes change
  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
    }
  }, [notes])

  const prevMonth = () =>
    setCurrentDate(d => new Date(d.getFullYear(), d.getMonth() - 1, 1))

  const nextMonth = () =>
    setCurrentDate(d => new Date(d.getFullYear(), d.getMonth() + 1, 1))

  const addNote = (note: CalendarNote) => {
    setNotes(prev => [
      ...prev.filter(
        n => !(
          n.month === note.month &&
          n.year === note.year &&
          n.day === note.day &&
          n.endDay === note.endDay
        )
      ),
      note,
    ])
  }

  const getNote = (day: number, month: number, year: number) =>
    notes.find(n =>
      n.month === month &&
      n.year === year &&
      (
        n.day === day ||
        (typeof n.endDay === "number" && day >= n.day && day <= n.endDay)
      )
    )

  return { currentDate, prevMonth, nextMonth, notes, addNote, getNote }
}