import { useState } from "react"

interface Props {
  currentDate: Date
  prevMonth: () => void
  nextMonth: () => void
}

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"]

const SpiralBinding = () => {
  const coilCount = 28
  const coils = Array.from({ length: coilCount })

  return (
    <div style={{
      position: "absolute",
      top: "-18px",
      left: 0,
      right: 0,
      zIndex: 20,
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-end",
      paddingLeft: "24px",
      paddingRight: "24px",
      gap: "0px",
      pointerEvents: "none",
    }}>
      {coils.map((_, i) => (
        <div key={i} style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
        }}>
          <svg
            width="22" height="36"
            viewBox="0 0 22 36"
            xmlns="http://www.w3.org/2000/svg"
            style={{ overflow: "visible", display: "block" }}
          >
            <defs>
              <linearGradient id={`coilGrad${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="#4a4a4a" />
                <stop offset="25%"  stopColor="#9a9a9a" />
                <stop offset="50%"  stopColor="#d0d0d0" />
                <stop offset="75%"  stopColor="#8a8a8a" />
                <stop offset="100%" stopColor="#3a3a3a" />
              </linearGradient>
              <linearGradient id={`coilShine${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="#222" stopOpacity="0.8" />
                <stop offset="40%"  stopColor="#fff" stopOpacity="0.35" />
                <stop offset="60%"  stopColor="#fff" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#111" stopOpacity="0.7" />
              </linearGradient>
            </defs>

            {/* Back arc — the part behind the page */}
            <path
              d="M 3,28 C 3,18 19,18 19,8"
              fill="none"
              stroke="#2a2a2a"
              strokeWidth="3.5"
              strokeLinecap="round"
              opacity="0.6"
            />

            {/* Main coil body */}
            <ellipse
              cx="11" cy="18"
              rx="8" ry="4.5"
              fill="none"
              stroke={`url(#coilGrad${i})`}
              strokeWidth="4"
            />

            {/* Top loop going above page */}
            <path
              d="M 3,18 C 3,8 19,8 19,18"
              fill="none"
              stroke={`url(#coilGrad${i})`}
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Bottom loop going below into page */}
            <path
              d="M 19,18 C 19,28 3,28 3,18"
              fill="none"
              stroke="#555"
              strokeWidth="3.5"
              strokeLinecap="round"
              opacity="0.5"
            />

            {/* Specular highlight on top arc */}
            <path
              d="M 5,13 C 6,9 16,9 17,13"
              fill="none"
              stroke="rgba(255,255,255,0.55)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />

            {/* Shadow under coil on page */}
            <ellipse
              cx="11" cy="28"
              rx="7" ry="1.5"
              fill="rgba(0,0,0,0.18)"
            />
          </svg>
        </div>
      ))}
    </div>
  )
}

const HeaderContent = ({ date }: { date: Date }) => (
  <div style={{
    background: "linear-gradient(135deg, var(--header-from) 0%, var(--header-to) 100%)",
    height: "100%",
    width: "100%",
    position: "relative",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "16px 16px 0 0",
  }}>
    {/* Decorative circles */}
    <div style={{ position: "absolute", top: "-40px", left: "-40px", width: "180px", height: "180px", borderRadius: "50%", backgroundColor: "var(--accent)", opacity: 0.1 }} />
    <div style={{ position: "absolute", bottom: "30px", right: "-20px", width: "140px", height: "140px", borderRadius: "50%", backgroundColor: "var(--accent)", opacity: 0.08 }} />
    <div style={{ position: "absolute", top: "20px", right: "80px", width: "60px", height: "60px", borderRadius: "50%", backgroundColor: "var(--accent)", opacity: 0.12 }} />

    <div style={{ textAlign: "center", zIndex: 2, marginBottom: "16px" }}>
      <p style={{ margin: 0, fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "4px" }}>
        {date.getFullYear()}
      </p>
      <h1 style={{ margin: 0, fontSize: "52px", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1, letterSpacing: "-1px" }}>
        {MONTHS[date.getMonth()]}
      </h1>
    </div>

    {/* Bottom wave */}
    <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", lineHeight: 0 }}>
      <svg viewBox="0 0 1200 60" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", display: "block" }}>
        <path d="M0,40 C80,10 160,55 280,30 C400,5 480,50 600,28 C720,5 820,45 940,25 C1060,5 1140,40 1200,30 L1200,60 L0,60 Z" fill="var(--bg-primary)" fillOpacity="0.15" />
        <path d="M0,48 C100,20 220,58 380,38 C520,18 600,55 740,38 C880,20 980,52 1100,38 C1150,30 1180,42 1200,38 L1200,60 L0,60 Z" fill="var(--bg-primary)" fillOpacity="0.4" />
        <path d="M0,54 C150,35 280,60 450,48 C600,36 700,58 850,48 C1000,36 1100,55 1200,50 L1200,60 L0,60 Z" fill="var(--bg-primary)" />
      </svg>
    </div>
  </div>
)

const CalendarHeader = ({ currentDate, prevMonth, nextMonth }: Props) => (
  <div style={{ height: "100%", width: "100%", position: "relative" }}>

    {/* Spiral binding — sits above the header, straddling the top edge */}
    <SpiralBinding />

    <div style={{
      position: "absolute",
      inset: 0,
      borderRadius: "16px 16px 0 0",
      overflow: "hidden",
    }}>
      <HeaderContent date={currentDate} />
    </div>

    {/* Navigation buttons */}
    <div style={{
      position: "absolute",
      bottom: "28px",
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 10,
      display: "flex",
      alignItems: "center",
      gap: "16px",
      backgroundColor: "rgba(0,0,0,0.2)",
      backdropFilter: "blur(8px)",
      borderRadius: "999px",
      padding: "8px 20px",
      border: "1px solid rgba(255,255,255,0.1)",
    }}>
      <button
        onClick={prevMonth}
        style={{
          background: "none",
          border: "none",
          color: "var(--text-primary)",
          fontSize: "22px",
          cursor: "pointer",
          fontWeight: 700,
          padding: "0 6px",
          opacity: 0.9,
          transition: "transform 0.2s",
        }}
        onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.3)")}
        onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
      >
        ‹
      </button>
      <span style={{
        fontSize: "13px",
        fontWeight: 600,
        color: "var(--text-primary)",
        letterSpacing: "0.05em",
        minWidth: "130px",
        textAlign: "center",
        opacity: 0.9,
      }}>
        {MONTHS[currentDate.getMonth()].slice(0, 3)} {currentDate.getFullYear()}
      </span>
      <button
        onClick={nextMonth}
        style={{
          background: "none",
          border: "none",
          color: "var(--text-primary)",
          fontSize: "22px",
          cursor: "pointer",
          fontWeight: 700,
          padding: "0 6px",
          opacity: 0.9,
          transition: "transform 0.2s",
        }}
        onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.3)")}
        onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
      >
        ›
      </button>
    </div>
  </div>
)

export default CalendarHeader