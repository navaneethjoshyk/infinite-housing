// Logo icon — dark navy geometric mark (vertical bar + horizontal bars)
export function LogoIcon({ size = 48 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Vertical bar on the left */}
      <rect x="4" y="4" width="12" height="40" rx="1" fill="#1B2341"/>
      {/* Top horizontal bar */}
      <rect x="20" y="4" width="24" height="11" rx="1" fill="#1B2341"/>
      {/* Middle horizontal bar */}
      <rect x="20" y="19" width="24" height="11" rx="1" fill="#1B2341"/>
      {/* Bottom horizontal bar */}
      <rect x="20" y="33" width="24" height="11" rx="1" fill="#1B2341"/>
    </svg>
  )
}

// Full wordmark — icon + "INFINITE SPACES" text
export function LogoWordmark({ iconSize = 36 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <LogoIcon size={iconSize} />
      <span style={{
        fontFamily: 'system-ui, sans-serif',
        fontWeight: '600',
        fontSize: '13px',
        letterSpacing: '0.12em',
        color: '#1B2341',
        textTransform: 'uppercase',
        lineHeight: 1.2,
      }}>
        INFINITE<br />SPACES
      </span>
    </div>
  )
}
