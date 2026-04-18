// components/icons.jsx
const Icon = ({ d, size = 20, stroke = 'currentColor', fill = 'none', strokeWidth = 1.5, ...p }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke}
    strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d={d}/>
  </svg>
);

const IconTrophy = ({ size }) => (
  <svg width={size||20} height={size||20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
    <path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
  </svg>
);

const IconChevronRight = ({ size }) => (
  <Icon d="m9 18 6-6-6-6" size={size||20} strokeWidth={2}/>
);

const IconChevronLeft = ({ size }) => (
  <Icon d="m15 18-6-6 6-6" size={size||20} strokeWidth={2}/>
);

const IconStar = ({ size, filled }) => (
  <svg width={size||20} height={size||20} viewBox="0 0 24 24"
    fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={1.5}
    strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

const IconDna = ({ size }) => (
  <svg width={size||20} height={size||20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 15c6.667-6 13.333 0 20-6"/><path d="M9 22c1.798-1.998 2.518-3.995 2.807-5.993"/>
    <path d="M15 2c-1.798 1.998-2.518 3.995-2.807 5.993"/>
    <path d="m17 6-2.5-2.5"/><path d="m14 8-1-1"/><path d="m7 18 2.5 2.5"/>
    <path d="m3.5 14.5.5.5"/><path d="m20 9 .5.5"/><path d="m6.5 12.5 1 1"/>
    <path d="m16.5 10.5 1 1"/><path d="m10 16 1.5 1.5"/>
  </svg>
);

const IconBarChart = ({ size }) => (
  <svg width={size||20} height={size||20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/>
    <line x1="6" y1="20" x2="6" y2="16"/><line x1="2" y1="20" x2="22" y2="20"/>
  </svg>
);

const IconTicket = ({ size }) => (
  <svg width={size||20} height={size||20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/>
    <path d="M13 5v2"/><path d="M13 17v2"/><path d="M13 11v2"/>
  </svg>
);

const IconHome = ({ size }) => (
  <svg width={size||20} height={size||20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);

const IconSearch = ({ size }) => (
  <Icon d="m21 21-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" size={size||20}/>
);

const IconArrowUp = ({ size }) => (
  <Icon d="m5 12 7-7 7 7M12 19V5" size={size||20} strokeWidth={2}/>
);

const IconHorse = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 22V12.5C5 9.5 7 7 10 6.5L12 6l2-1.5c1-0.8 2.5-0.5 3 0.5l1 2c0.5 1 0 2-1 2.5L16 10l1 3 1 4v5"/>
    <path d="M5 22h4l1-5h4l1 5h4"/>
    <circle cx="14" cy="4" r="1.2"/>
  </svg>
);

const IconInfo = ({ size }) => (
  <svg width={size||20} height={size||20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
  </svg>
);

const IconX = ({ size }) => (
  <Icon d="M18 6 6 18M6 6l12 12" size={size||20} strokeWidth={2}/>
);

const IconCheck = ({ size }) => (
  <Icon d="M20 6 9 17l-5-5" size={size||20} strokeWidth={2.5}/>
);

const IconFlag = ({ size }) => (
  <svg width={size||20} height={size||20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
    <line x1="4" y1="22" x2="4" y2="15"/>
  </svg>
);

Object.assign(window, {
  Icon, IconTrophy, IconChevronRight, IconChevronLeft,
  IconStar, IconDna, IconBarChart, IconTicket,
  IconHome, IconSearch, IconArrowUp, IconHorse,
  IconInfo, IconX, IconCheck, IconFlag
});
