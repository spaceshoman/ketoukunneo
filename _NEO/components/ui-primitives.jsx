// ui-primitives.jsx — small building blocks for 血統くんNEO
// Theme, chips, scorebar, glass card, pedigree mini tree

// --- THEME TOKENS (default "rising sun" vibrant sport theme) ---
const THEME = {
  bg: '#0B0F1A',            // near-black indigo
  bg2: '#111827',           // elevated
  surface: '#1A2236',       // card
  surfaceAlt: '#232C44',
  ink: '#F3F4F6',
  inkSoft: '#9CA3AF',
  inkDim: '#6B7280',
  border: 'rgba(255,255,255,0.08)',
  // accents — sport neon
  primary: '#FFB020',        // 皐月の黄金
  primaryInk: '#0B0F1A',
  hot: '#FF2D55',            // 注目 / hot
  cool: '#00D4FF',            // 青い稲妻
  green: '#22C55E',
  line1: 'linear-gradient(135deg,#FFB020 0%,#FF6B2D 50%,#FF2D55 100%)',
  line2: 'linear-gradient(135deg,#00D4FF 0%,#7C3AED 100%)',
  lineSakura: 'linear-gradient(135deg,#FF8FB1 0%,#FF2D55 100%)',
};

// gate bar colors (JRA standard)
const GATE_COLORS = {
  1: { bg: '#FFFFFF', fg: '#000', border: '#000' },
  2: { bg: '#000000', fg: '#fff' },
  3: { bg: '#E3342F', fg: '#fff' },
  4: { bg: '#3B82F6', fg: '#fff' },
  5: { bg: '#FACC15', fg: '#000' },
  6: { bg: '#16A34A', fg: '#fff' },
  7: { bg: '#F97316', fg: '#fff' },
  8: { bg: '#EC4899', fg: '#fff' },
};
function gateStyle(g) {
  const base = GATE_COLORS[((g - 1) % 8) + 1] || GATE_COLORS[1];
  return base;
}

// AI mark -> color
function markColor(m) {
  return ({
    '◎': THEME.hot, '○': THEME.primary, '▲': THEME.cool, '△': '#A5B4FC',
  }[m]) || THEME.inkDim;
}

// numeric-chip (umaban)
function Umaban({ no, gate }) {
  const s = gateStyle(gate);
  return (
    <div style={{
      width: 30, height: 30, borderRadius: 8,
      background: s.bg, color: s.fg,
      border: s.border ? `1.5px solid ${s.border}` : 'none',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontWeight: 800, fontSize: 15, fontFeatureSettings: '"tnum"',
      flexShrink: 0,
    }}>{no}</div>
  );
}

// compact score pill with progress
function ScoreBar({ value, max = 100, color = THEME.primary, width = 80, height = 6 }) {
  const w = Math.max(0, Math.min(1, value / max));
  return (
    <div style={{ width, height, borderRadius: 999, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
      <div style={{ width: `${w * 100}%`, height: '100%', background: color, borderRadius: 999 }} />
    </div>
  );
}

// large AI score ring
function ScoreRing({ value, size = 56, stroke = 5, color = THEME.primary, label }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(1, value / 100));
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} stroke="rgba(255,255,255,0.08)" strokeWidth={stroke} fill="none"/>
        <circle cx={size / 2} cy={size / 2} r={r} stroke={color} strokeWidth={stroke} fill="none"
          strokeDasharray={c} strokeDashoffset={c * (1 - pct)} strokeLinecap="round"/>
      </svg>
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', color: THEME.ink,
      }}>
        <div style={{ fontSize: size * 0.34, fontWeight: 800, lineHeight: 1, fontFeatureSettings: '"tnum"' }}>{value}</div>
        {label && <div style={{ fontSize: 9, color: THEME.inkSoft, marginTop: 2 }}>{label}</div>}
      </div>
    </div>
  );
}

// chip
function Chip({ children, color, bg, border }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '3px 8px', borderRadius: 999,
      fontSize: 11, fontWeight: 600, letterSpacing: 0.2,
      color: color || THEME.ink,
      background: bg || 'rgba(255,255,255,0.08)',
      border: border || '1px solid rgba(255,255,255,0.08)',
      whiteSpace: 'nowrap',
    }}>{children}</span>
  );
}

// section heading
function SectionHead({ kicker, title, right }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
      padding: '18px 16px 10px',
    }}>
      <div>
        {kicker && <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: 1.4,
          color: THEME.primary, textTransform: 'uppercase', marginBottom: 2,
        }}>{kicker}</div>}
        <div style={{ fontSize: 18, fontWeight: 800, color: THEME.ink, letterSpacing: -0.3 }}>{title}</div>
      </div>
      {right}
    </div>
  );
}

// Tiny bar-chart row (horizontal)
function MiniBar({ label, value, max = 100, color = THEME.primary, rightLabel }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0' }}>
      <div style={{ width: 88, fontSize: 12, color: THEME.inkSoft, fontWeight: 600 }}>{label}</div>
      <div style={{ flex: 1 }}>
        <ScoreBar value={value} max={max} color={color} width="100%" height={6}/>
      </div>
      <div style={{ width: 50, textAlign: 'right', fontSize: 12, fontWeight: 700, color: THEME.ink, fontFeatureSettings: '"tnum"' }}>
        {rightLabel ?? `${value}`}
      </div>
    </div>
  );
}

Object.assign(window, {
  THEME, GATE_COLORS, gateStyle, markColor,
  Umaban, ScoreBar, ScoreRing, Chip, SectionHead, MiniBar,
});
