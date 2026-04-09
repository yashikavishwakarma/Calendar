import { useState } from "react"
import type { CalendarNote } from "../types/calendar"

export const useCalendar = () => {
  const today = new Date()
  const [currentDate, setCurrentDate] = useState(today)
  const [notes, setNotes] = useState<CalendarNote[]>([])

  const prevMonth = () =>
    setCurrentDate(d => new Date(d.getFullYear(), d.getMonth() - 1, 1))

  const nextMonth = () =>
    setCurrentDate(d => new Date(d.getFullYear(), d.getMonth() + 1, 1))

  const addNote = (note: CalendarNote) => {
    setNotes(prev => [...prev.filter(
      n => !(n.day === note.day && n.month === note.month && n.year === note.year)
    ), note])
  }

  const getNote = (day: number, month: number, year: number) =>
    notes.find(n => n.day === day && n.month === month && n.year === year)

  return { currentDate, prevMonth, nextMonth, notes, addNote, getNote }
}