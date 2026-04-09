// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import './App.css'
import { useState } from 'react'
import { useTheme } from "./context/ThemeContext"
import Calendar from "./components/calendar/Calendar"
import ThemePicker from "./components/ThemePicker"

const translations = {
  en: {
    themePickerSubtitle: "pick ur vibe",
    languageButton: "Hindi",
    languageButtonActive: "English",
    notesTab: "Notes",
    festivalTab: "Festival",
    noFestivalEvents: "No festival events yet",
    noNotesYet: "No notes yet",
    addNotesHeader: "Add Notes",
    selectedLabel: "Selected:",
    pickEmoji: "Pick emoji",
    selectedEmoji: "Selected emoji:",
    writeNotePlaceholder: "Write your note...",
    saveNote: "Save Note",
    hideNotesPanel: "Hide notes panel",
    showNotesPanel: "Show notes panel",
    days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    months: ["January","February","March","April","May","June","July","August","September","October","November","December"],
  },
  hi: {
    themePickerSubtitle: "अपना मूड चुनें",
    languageButton: "English",
    languageButtonActive: "English",
    notesTab: "नोट्स",
    festivalTab: "त्योहार",
    noFestivalEvents: "अभी कोई त्योहार नहीं",
    noNotesYet: "अभी कोई नोट नहीं",
    addNotesHeader: "नोट जोड़ें",
    selectedLabel: "चयनित:",
    pickEmoji: "इमोजी चुनें",
    selectedEmoji: "चयनित इमोजी:",
    writeNotePlaceholder: "अपना नोट लिखें...",
    saveNote: "नोट सेव करें",
    hideNotesPanel: "नोट पैनल छुपाएँ",
    showNotesPanel: "नोट पैनल दिखाएँ",
    days: ["रवि", "सोम", "मंगल", "बुध", "गुरु", "शुक्र", "शनि"],
    months: ["जनवरी","फ़रवरी","मार्च","अप्रैल","मई","जून","जुलाई","अगस्त","सितंबर","अक्टूबर","नवंबर","दिसंबर"],
  }
}

function App() {
  const { theme } = useTheme()
  const [language, setLanguage] = useState<"en" | "hi">("en")
  const lang = translations[language]

  return (
    <div style={{
      minHeight: "100vh",
      width: "100%",
      position: "relative",
      overflow: "hidden",
      backgroundColor: "var(--bg-primary)",
      backgroundImage: theme.image
        ? `radial-gradient(circle at top left, rgba(255,255,255,0.14), transparent 24%), radial-gradient(circle at bottom right, rgba(255,255,255,0.12), transparent 28%), url(${theme.image})`
        : `radial-gradient(circle at top left, rgba(255,255,255,0.18), transparent 24%), radial-gradient(circle at bottom right, rgba(255,255,255,0.14), transparent 28%)`,
      backgroundSize: theme.image ? "cover" : undefined,
      backgroundPosition: theme.image ? "center" : undefined,
      backgroundRepeat: theme.image ? "no-repeat" : undefined,
      backgroundBlendMode: theme.image ? "overlay" : undefined,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
      transition: "background-color 0.35s, background-image 0.35s",
    }}>
      <div style={{ position: "fixed", top: "20px", right: "24px", zIndex: 50 }}>
        <ThemePicker
          language={language}
          setLanguage={setLanguage}
          text={lang.themePickerSubtitle}
          languageButton={lang.languageButton}
        />
      </div>

      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: "1400px", minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Calendar translations={lang} />
      </div>
    </div>
  )
}

export default App