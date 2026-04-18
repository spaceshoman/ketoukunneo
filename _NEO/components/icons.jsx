// icons.jsx — inline SVG icons for 血統くんNEO

const Icon = {
  Home: ({ size = 24, color = 'currentColor', filled = false }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M3 10.5L12 3l9 7.5V20a1 1 0 01-1 1h-5v-7h-6v7H4a1 1 0 01-1-1v-9.5z"
        stroke={color} strokeWidth="2" strokeLinejoin="round"
        fill={filled ? color : 'none'} />
    </svg>
  ),
  Race: ({ size = 24, color = 'currentColor', filled = false }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M4 18h16M6 14h12M8 10h8M10 6h4" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      {filled && <circle cx="12" cy="20" r="1.5" fill={color}/>}
    </svg>
  ),
  Pedigree: ({ size = 24, color = 'currentColor', filled = false }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="4" width="7" height="5" rx="1" stroke={color} strokeWidth="2" fill={filled ? color : 'none'}/>
      <rect x="15" y="2" width="7" height="4" rx="1" stroke={color} strokeWidth="2"/>
      <rect x="15" y="8" width="7" height="4" rx="1" stroke={color} strokeWidth="2"/>
      <rect x="15" y="14" width="7" height="4" rx="1" stroke={color} strokeWidth="2"/>
      <rect x="15" y="20" width="7" height="4" rx="1" stroke={color} strokeWidth="2"/>
      <path d="M9 6.5h6M9 6.5v3.5h6M9 6.5v9.5h6M9 6.5v15.5h6" stroke={color} strokeWidth="1.5"/>
    </svg>
  ),
  Search: ({ size = 24, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="7" stroke={color} strokeWidth="2"/>
      <path d="M16 16l5 5" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  User: ({ size = 24, color = 'currentColor', filled = false }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4" stroke={color} strokeWidth="2" fill={filled ? color : 'none'}/>
      <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke={color} strokeWidth="2" strokeLinecap="round" fill={filled ? color : 'none'}/>
    </svg>
  ),
  Star: ({ size = 16, color = 'currentColor', filled = false }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : 'none'}>
      <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7l3-7z" stroke={color} strokeWidth="1.8" strokeLinejoin="round"/>
    </svg>
  ),
  ChevronRight: ({ size = 16, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M9 6l6 6-6 6" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  ChevronDown: ({ size = 16, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M6 9l6 6 6-6" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Flame: ({ size = 16, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 2c1 3-2 5-2 8a4 4 0 004 4c0-2 2-3 2-6-3 0-3-4-4-6zM8 13a4 4 0 108 0c0 4-4 9-4 9s-4-5-4-9z"/>
    </svg>
  ),
  Bell: ({ size = 20, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M6 8a6 6 0 1112 0v5l2 3H4l2-3V8z" stroke={color} strokeWidth="2" strokeLinejoin="round"/>
      <path d="M10 19a2 2 0 104 0" stroke={color} strokeWidth="2"/>
    </svg>
  ),
  Horse: ({ size = 24, color = 'currentColor' }) => (
    // simplified horse silhouette
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M17 4c0 0 2 1 2 3 0 1-1 1-1 2s1 2 1 4-1 4-2 5-3 1-4 1-2-1-2-2 1-2 0-4-3-2-4-3-2-2-2-3 1-3 3-3 3 1 4 0 2-1 3-1 2 1 2 1z"/>
      <circle cx="17" cy="6.5" r="0.8" fill="#fff"/>
    </svg>
  ),
  Plus: ({ size = 16, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 5v14M5 12h14" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  ),
  Sparkles: ({ size = 16, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 2l1.5 5.5L19 9l-5.5 1.5L12 16l-1.5-5.5L5 9l5.5-1.5z"/>
      <path d="M19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8z" opacity=".7"/>
    </svg>
  ),
};

window.Icon = Icon;
