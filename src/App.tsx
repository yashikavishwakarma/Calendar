// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import './App.css'
import Calendar from "./components/calendar/Calendar"
import ThemePicker from "./components/ThemePicker"

function App() {
  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "var(--bg-primary)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      transition: "background-color 0.3s",
    }}>
      {/* Theme picker — top right */}
      <div style={{ position: "fixed", top: "20px", right: "24px", zIndex: 50 }}>
        <ThemePicker />
      </div>

      <Calendar />
    </div>
  )
}

export default App