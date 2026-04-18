// components/ui-primitives.jsx

/* ─── カラー定数 ─── */
const C = {
  bg: '#0B0F1A',
  surface: '#121828',
  card: '#1A2235',
  border: 'rgba(255,255,255,0.07)',
  borderHi: 'rgba(255,255,255,0.15)',
  gold: '#F5C842',
  goldDim: '#C9A030',
  red: '#FF3B3B',
  green: '#30D158',
  blue: '#0A84FF',
  purple: '#BF5AF2',
  orange: '#FF9F0A',
  teal: '#32ADE6',
  text: '#FFFFFF',
  textSub: 'rgba(255,255,255,0.55)',
  textMuted: 'rgba(255,255,255,0.3)',
};

/* ─── AIスコアリング ─── */
const getScoreColor = (score) => {
  if (score >= 85) return C.gold;
  if (score >= 75) return C.orange;
  if (score >= 65) return C.teal;
  return C.textSub;
};

/* ─── バッジ ─── */
const Badge = ({ children, color, bg, style = {} }) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center',
    padding: '2px 8px', borderRadius: 6,
    fontSize: 10, fontWeight: 700, letterSpacing: '0.05em',
    color: color || C.text,
    background: bg || 'rgba(255,255,255,0.1)',
    ...style,
  }}>{children}</span>
);

const GradeBadge = ({ grade }) => {
  const map = {
    'G1':  { color: '#fff', bg: 'linear-gradient(135deg, #c9a030, #f5c842)' },
    'G2':  { color: '#fff', bg: 'linear-gradient(135deg, #888, #bbb)' },
    'G3':  { color: '#fff', bg: 'linear-gradient(135deg, #a0522d, #cd853f)' },
    'L':   { color: '#fff', bg: 'rgba(100,150,255,0.3)' },
    '1勝ク': { color: C.textSub, bg: 'rgba(255,255,255,0.1)' },
    'G2 ': { color: '#fff', bg: 'linear-gradient(135deg, #888, #bbb)' },
  };
  const s = map[grade] || { color: C.textSub, bg: 'rgba(255,255,255,0.08)' };
  return <Badge color={s.color} style={{ background: s.bg }}>{grade || '—'}</Badge>;
};

const MarkBadge = ({ mark }) => {
  if (!mark) return null;
  const map = {
    'M': { label: 'M', color: '#fff', bg: 'rgba(0,180,120,0.7)' },
    'I': { label: 'I', color: '#fff', bg: 'rgba(180,80,255,0.7)' },
  };
  const s = map[mark] || { label: mark, color: '#fff', bg: 'rgba(255,255,255,0.2)' };
  return <Badge color={s.color} style={{ background: s.bg, minWidth: 20, justifyContent: 'center' }}>{s.label}</Badge>;
};

/* ─── ポジション着順 ─── */
const PosChip = ({ pos }) => {
  const bg = pos === 1 ? C.gold
    : pos === 2 ? '#9E9E9E'
    : pos === 3 ? '#CD853F'
    : pos <= 5 ? 'rgba(255,255,255,0.15)'
    : 'rgba(255,255,255,0.07)';
  const color = pos <= 3 ? '#000' : C.textSub;
  return (
    <span style={{
      display:'inline-flex', alignItems:'center', justifyContent:'center',
      width: 22, height: 22, borderRadius: 6,
      fontSize: 11, fontWeight: 800,
      background: bg, color,
    }}>{pos}</span>
  );
};

/* ─── プログレスバー ─── */
const ProgressBar = ({ value, max = 100, color, height = 4, style = {} }) => (
  <div style={{ width: '100%', background: 'rgba(255,255,255,0.08)', borderRadius: 99, overflow: 'hidden', height, ...style }}>
    <div style={{
      height: '100%',
      width: `${Math.min(100, (value / max) * 100)}%`,
      background: color || C.gold,
      borderRadius: 99,
      transition: 'width 0.6s cubic-bezier(.4,0,.2,1)',
    }}/>
  </div>
);

/* ─── スコアリング（円形） ─── */
const ScoreRing = ({ score, size = 52 }) => {
  const r = (size - 6) / 2;
  const circ = 2 * Math.PI * r;
  const color = getScoreColor(score);
  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none"
          stroke="rgba(255,255,255,0.1)" strokeWidth={4}/>
        <circle cx={size/2} cy={size/2} r={r} fill="none"
          stroke={color} strokeWidth={4}
          strokeDasharray={circ}
          strokeDashoffset={circ * (1 - score / 100)}
          strokeLinecap="round"/>
      </svg>
      <div style={{
        position:'absolute', inset:0,
        display:'flex', alignItems:'center', justifyContent:'center',
        fontSize: size * 0.26, fontWeight: 800, color,
        fontFamily: 'Inter, sans-serif',
      }}>{score}</div>
    </div>
  );
};

/* ─── 枠番カラー ─── */
const GATE_COLORS = [
  '', '#fff', '#000', '#f00', '#00a0e9',
  '#f7d000', '#009e6b', '#f5824e', '#e91e8c',
];
const GateChip = ({ gate, no }) => {
  const bg = GATE_COLORS[gate] || '#888';
  const isLight = [1, 4, 5, 6].includes(gate);
  return (
    <div style={{
      display: 'inline-flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      width: 32, height: 36, borderRadius: 6,
      background: bg,
      border: gate === 1 ? '1px solid rgba(255,255,255,0.2)' : 'none',
      flexShrink: 0,
    }}>
      <span style={{ fontSize: 8, fontWeight: 700, color: isLight ? '#000' : '#fff', opacity: 0.7, lineHeight:1 }}>枠{gate}</span>
      <span style={{ fontSize: 14, fontWeight: 900, color: isLight ? '#000' : '#fff', lineHeight:1.2 }}>{no}</span>
    </div>
  );
};

/* ─── セクションヘッダー ─── */
const SectionHeader = ({ title, sub, right, style = {} }) => (
  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12, ...style }}>
    <div>
      <span style={{ fontSize: 13, fontWeight: 800, letterSpacing: '0.04em', color: C.text }}>{title}</span>
      {sub && <span style={{ fontSize: 10, color: C.textMuted, marginLeft: 8 }}>{sub}</span>}
    </div>
    {right && <div style={{ fontSize: 11, color: C.textSub }}>{right}</div>}
  </div>
);

/* ─── カード ─── */
const Card = ({ children, style = {}, onClick }) => (
  <div onClick={onClick} style={{
    background: C.card,
    borderRadius: 14,
    border: `1px solid ${C.border}`,
    overflow: 'hidden',
    cursor: onClick ? 'pointer' : 'default',
    ...style,
  }}>{children}</div>
);

/* ─── 適性メーター ─── */
const FitMeter = ({ label, value, color }) => (
  <div style={{ flex: 1 }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
      <span style={{ fontSize: 9, color: C.textMuted, fontWeight: 600, letterSpacing: '0.05em' }}>{label}</span>
      <span style={{ fontSize: 10, fontWeight: 800, color: color || C.gold }}>{value}</span>
    </div>
    <ProgressBar value={value} color={color || C.gold} height={3}/>
  </div>
);

/* ─── 印 ─── */
const AIMark = ({ mark, style = {} }) => {
  if (!mark) return null;
  const map = {
    '◎': { color: C.gold, size: 18 },
    '○': { color: '#fff', size: 16 },
    '▲': { color: C.orange, size: 14 },
    '△': { color: C.teal, size: 13 },
  };
  const s = map[mark] || { color: C.textSub, size: 12 };
  return <span style={{ fontSize: s.size, fontWeight: 900, color: s.color, lineHeight:1, ...style }}>{mark}</span>;
};

/* ─── Divider ─── */
const Divider = ({ style = {} }) => (
  <div style={{ height: 1, background: C.border, margin: '8px 0', ...style }}/>
);

Object.assign(window, {
  C, getScoreColor, Badge, GradeBadge, MarkBadge, PosChip,
  ProgressBar, ScoreRing, GateChip, SectionHeader, Card,
  FitMeter, AIMark, Divider,
});
