export default function TopBar({ onOpenCalendar }) {
  return (
    <div className="topbar">
      <div className="avatar">🐼</div>
      <div className="date">June 10</div>
      <svg
        className="cal"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#1c1b1f"
        strokeWidth="1.8"
        role="button"
        tabIndex={0}
        aria-label="Open month calendar"
        style={{ cursor: 'pointer' }}
        onClick={onOpenCalendar}
        onKeyDown={(e) => { if (e.key === 'Enter') onOpenCalendar() }}
      >
        <rect x="3" y="4.5" width="18" height="17" rx="3" />
        <path d="M3 9h18M8 2.5v4M16 2.5v4" />
      </svg>
    </div>
  )
}
