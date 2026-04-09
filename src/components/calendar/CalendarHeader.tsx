import { useTheme } from "../../context/ThemeContext"

interface Props {
  currentDate: Date
  prevMonth: () => void
  nextMonth: () => void
  months: string[]
}

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
                <stop offset="0%" stopColor="#4a4a4a" />
                <stop offset="25%" stopColor="#9a9a9a" />
                <stop offset="50%" stopColor="#d0d0d0" />
                <stop offset="75%" stopColor="#8a8a8a" />
                <stop offset="100%" stopColor="#3a3a3a" />
              </linearGradient>
              <linearGradient id={`coilShine${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#222" stopOpacity="0.8" />
                <stop offset="40%" stopColor="#fff" stopOpacity="0.35" />
                <stop offset="60%" stopColor="#fff" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#111" stopOpacity="0.7" />
              </linearGradient>
            </defs>
            <path
              d="M 3,28 C 3,18 19,18 19,8"
              fill="none"
              stroke="#2a2a2a"
              strokeWidth="3.5"
              strokeLinecap="round"
              opacity="0.6"
            />
            <ellipse
              cx="11" cy="18"
              rx="8" ry="4.5"
              fill="none"
              stroke={`url(#coilGrad${i})`}
              strokeWidth="4"
            />
            <path
              d="M 3,18 C 3,8 19,8 19,18"
              fill="none"
              stroke={`url(#coilGrad${i})`}
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M 19,18 C 19,28 3,28 3,18"
              fill="none"
              stroke="#555"
              strokeWidth="3.5"
              strokeLinecap="round"
              opacity="0.5"
            />
            <path
              d="M 5,13 C 6,9 16,9 17,13"
              fill="none"
              stroke="rgba(255,255,255,0.55)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
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

const HeaderContent = ({
  date,
  image,
  prevMonth,
  nextMonth,
  months,
}: {
  date: Date
  image: string
  prevMonth: () => void
  nextMonth: () => void
  months: string[]
}) => {
  const { theme } = useTheme()

  return (
    <div style={{
      background: image ? `url(${image}) center / cover no-repeat` : "var(--header-from)",
      backgroundColor: "var(--header-from)",
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: "100%",
      width: "100%",
      position: "relative",
      overflow: "hidden",
      borderRadius: "16px 16px 0 0",
      padding: "24px",
    }}>

    {/* LIGHT OVERLAY */}
    <div style={{
      position: "absolute",
      inset: 0,
      background: "rgba(0,0,0,0.02)", // lighter
      zIndex: 1,
    }} />

    {/* 🔥 COMPACT TOP-LEFT UI */}
    <div style={{
      position: "relative",
      zIndex: 2,
      display: "flex",
      flexDirection: "column",
      gap: "4px"
    }}>

      {/* YEAR */}
      <p style={{
        margin: 0,
        fontSize: "33px",
        fontWeight: 700,
        letterSpacing: "0.2em",
        color: "#fff"
      }}>
        {date.getFullYear()}
      </p>

      {/* MONTH + BUTTONS */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "10px"
      }}>

        {/* PREV */}
        <button
          onClick={prevMonth}
          style={{
            background: "rgba(255,255,255,0.15)",
            border: "none",
            color: "#fff",
            fontSize: "16px",
            cursor: "pointer",
            borderRadius: "50%",
            width: "28px",
            height: "28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          ‹
        </button>

        {/* MONTH */}
        <h1 style={{
          margin: 0,
          fontSize: "36px",
          fontWeight: 700,
          color: "#fff",
          letterSpacing: "-0.5px"
        }}>
          {months[date.getMonth()]}
        </h1>

        {theme.id === "tuf" && (
          <span style={{
            color: "#fff",
            fontSize: "14px",
            textTransform: "lowercase",
            letterSpacing: "0.25em",
            opacity: 0.9,
            marginLeft: "8px"
          }}>

          </span>
        )}

        {/* NEXT */}
        <button
          onClick={nextMonth}
          style={{
            background: "rgba(255,255,255,0.15)",
            border: "none",
            color: "#fff",
            fontSize: "16px",
            cursor: "pointer",
            borderRadius: "50%",
            width: "28px",
            height: "28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          ›
        </button>

      </div>

    </div>

    {/* WAVES */}
    <div style={{
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "100%",
      lineHeight: 0,
      zIndex: 2
    }}>
      <svg viewBox="0 0 1200 60" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%" }}>
        <path d="M0,40 C80,10 160,55 280,30 C400,5 480,50 600,28 C720,5 820,45 940,25 C1060,5 1140,40 1200,30 L1200,60 L0,60 Z" fill="var(--bg-primary)" fillOpacity="0.15" />
        <path d="M0,48 C100,20 220,58 380,38 C520,18 600,55 740,38 C880,20 980,52 1100,38 C1150,30 1180,42 1200,38 L1200,60 L0,60 Z" fill="var(--bg-primary)" fillOpacity="0.4" />
        <path d="M0,54 C150,35 280,60 450,48 C600,36 700,58 850,48 C1000,36 1100,55 1200,50 L1200,60 L0,60 Z" fill="var(--bg-primary)" />
      </svg>
    </div>

  </div>
)
}

const CalendarHeader = ({ currentDate, prevMonth, nextMonth, months }: Props) => {
  const { theme } = useTheme()

  return (
    <div style={{ height: "100%", width: "100%", position: "relative" }}>
      <SpiralBinding />
      <div style={{
        position: "absolute",
        inset: 0,
        borderRadius: "16px 16px 0 0",
        overflow: "hidden",
      }}>
        <HeaderContent date={currentDate} image={theme.image} prevMonth={prevMonth} nextMonth={nextMonth} months={months} />
      </div>
    </div>
  )
}

export default CalendarHeader
