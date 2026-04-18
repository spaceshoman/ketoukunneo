// horse-detail.jsx — HorseDetail with pedigree tree, adaptability, form
// Depends on: data.jsx, ui-primitives.jsx

function HorseDetail({ horseNo, onBack, treeDepth = 3 }) {
  const horse = HORSES.find(h => h.no === horseNo) || HORSES[0];
  const mc = markColor(horse.aiMark);
  const [tab, setTab] = React.useState('pedigree'); // pedigree | adapt | form

  return (
    <div style={{ paddingBottom: 90, background: THEME.bg, minHeight: '100%' }}>
      {/* hero */}
      <div style={{
        position: 'relative',
        background: `linear-gradient(180deg, ${THEME.surface} 0%, ${THEME.bg} 100%)`,
        padding: '14px 16px 20px',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', right: -30, top: -20, width: 180, height: 180,
          borderRadius: '50%',
          background: `radial-gradient(closest-side, ${mc} 0%, rgba(0,0,0,0) 70%)`,
          opacity: 0.18, pointerEvents: 'none',
        }}/>
        <button onClick={onBack} style={{
          width: 32, height: 32, borderRadius: 10,
          background: 'rgba(255,255,255,0.06)', border: 'none',
          color: THEME.ink, display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 8,
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"/></svg>
        </button>
        {/* name + mark */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, position: 'relative' }}>
          <Umaban no={horse.no} gate={horse.gate}/>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <span style={{ fontSize: 22, fontWeight: 800, color: mc }}>{horse.aiMark || '-'}</span>
              <span style={{ fontSize: 22, fontWeight: 900, color: THEME.ink, letterSpacing: -0.3 }}>{horse.name}</span>
            </div>
            <div style={{ fontSize: 10, color: THEME.inkSoft, letterSpacing: 2, marginTop: 2 }}>
              {horse.en.toUpperCase()}
            </div>
            <div style={{ fontSize: 11, color: THEME.inkSoft, marginTop: 4 }}>
              {horse.sex}3 ・ {horse.color} ・ 斤量{horse.weight}kg
            </div>
            <div style={{ fontSize: 11, color: THEME.ink, marginTop: 2 }}>
              騎手 <span style={{ fontWeight: 700 }}>{horse.jockey}</span> / 厩舎 <span style={{ fontWeight: 700 }}>{horse.trainer}</span>
            </div>
          </div>
          <ScoreRing value={horse.aiScore} size={64} color={mc} label="AI SCORE" stroke={6}/>
        </div>
        {/* tags */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 10 }}>
          {horse.tags.map(t => <Chip key={t} color={THEME.primary} bg="rgba(255,176,32,0.1)" border="1px solid rgba(255,176,32,0.3)">{t}</Chip>)}
        </div>
        {/* odds row */}
        <div style={{
          marginTop: 12, display: 'flex', gap: 8,
          background: 'rgba(255,255,255,0.04)', padding: 10, borderRadius: 12,
          border: `1px solid ${THEME.border}`,
        }}>
          <Stat label="単勝" value={horse.odds.toFixed(1)} color={THEME.primary}/>
          <Stat label="人気" value={`${horse.pop}番`} color={THEME.ink}/>
          <Stat label="距離適性" value={horse.distanceFit} color={THEME.cool}/>
          <Stat label="コース" value={horse.courseFit} color={THEME.green}/>
        </div>
      </div>

      {/* tabs */}
      <div style={{
        display: 'flex', gap: 0, padding: '0 16px',
        borderBottom: `1px solid ${THEME.border}`, position: 'sticky', top: 0, background: THEME.bg, zIndex: 5,
      }}>
        {[
          { k: 'pedigree', label: '血統表' },
          { k: 'adapt', label: '適性分析' },
          { k: 'form', label: '近走成績' },
        ].map(t => (
          <button key={t.k} onClick={() => setTab(t.k)} style={{
            flex: 1, padding: '12px 0', background: 'none', border: 'none',
            fontSize: 13, fontWeight: tab === t.k ? 800 : 600,
            color: tab === t.k ? THEME.ink : THEME.inkSoft,
            borderBottom: tab === t.k ? `2px solid ${THEME.primary}` : '2px solid transparent',
            cursor: 'pointer',
          }}>{t.label}</button>
        ))}
      </div>

      {tab === 'pedigree' && <PedigreeTree horse={horse} depth={treeDepth}/>}
      {tab === 'adapt' && <AdaptBreakdown horse={horse}/>}
      {tab === 'form' && <FormBreakdown horse={horse}/>}
    </div>
  );
}

function Stat({ label, value, color }) {
  return (
    <div style={{ flex: 1, textAlign: 'center' }}>
      <div style={{ fontSize: 9, color: THEME.inkSoft, marginBottom: 2 }}>{label}</div>
      <div style={{ fontSize: 15, fontWeight: 800, color: color || THEME.ink, fontFeatureSettings: '"tnum"' }}>{value}</div>
    </div>
  );
}

// --- Pedigree tree: horizontal layout, sire (top) vs dam (bottom)
function PedigreeTree({ horse, depth = 3 }) {
  // Build up to 3 levels from data.
  // L1: sire, dam
  // L2: sire.sire, sire.dam, dam.sire, dam.dam
  const p = horse.pedigree;

  // synthesize L3 placeholders from lineage types
  const fakeL3 = (base, suffix) => `${base.replace('系', '')}の${suffix}`;

  const boxSire = (label, color, name, type, small) => (
    <div style={{
      flex: 1, minWidth: 0, padding: small ? '6px 8px' : '8px 10px',
      background: color === 'sire'
        ? 'linear-gradient(90deg, rgba(255,176,32,0.14), rgba(255,176,32,0.03))'
        : 'linear-gradient(90deg, rgba(255,143,177,0.14), rgba(255,143,177,0.03))',
      borderLeft: `3px solid ${color === 'sire' ? THEME.primary : '#FF8FB1'}`,
      borderRadius: 8,
    }}>
      <div style={{
        fontSize: 8, letterSpacing: 1, fontWeight: 700,
        color: color === 'sire' ? THEME.primary : '#FF8FB1',
      }}>{label}</div>
      <div style={{
        fontSize: small ? 11 : 13, fontWeight: 700, color: THEME.ink,
        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
      }}>{name}</div>
      {type && <div style={{ fontSize: 9, color: THEME.inkSoft }}>{type}</div>}
    </div>
  );

  return (
    <div style={{ padding: '16px 16px 12px' }}>
      {/* Legend */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
        <Chip color={THEME.primary} bg="rgba(255,176,32,0.08)" border="1px solid rgba(255,176,32,0.25)">父系</Chip>
        <Chip color="#FF8FB1" bg="rgba(255,143,177,0.08)" border="1px solid rgba(255,143,177,0.3)">母系</Chip>
        <span style={{ flex: 1 }}/>
        <span style={{ fontSize: 10, color: THEME.inkSoft }}>{depth}代血統表</span>
      </div>

      {/* Level 1: sire */}
      <div style={{ marginBottom: 6 }}>
        {boxSire('父', 'sire', p.sire.name, p.sire.type)}
      </div>
      {/* Level 2 under sire */}
      {depth >= 2 && (
        <div style={{ display: 'flex', gap: 6, marginLeft: 16, marginBottom: 10, position: 'relative' }}>
          <TreeConnector/>
          {boxSire('父父', 'sire', p.sire.sire, null, true)}
          {boxSire('父母', 'dam', p.sire.dam, null, true)}
        </div>
      )}
      {/* Level 3 under sire — lineage-derived */}
      {depth >= 3 && (
        <div style={{ display: 'flex', gap: 4, marginLeft: 32, marginBottom: 14, flexWrap: 'wrap' }}>
          {[
            ['父父父', 'sire', p.sire.sire, '代表馬'],
            ['父父母', 'dam', p.sire.sire, '牝系'],
            ['父母父', 'sire', p.sire.dam, '代表馬'],
            ['父母母', 'dam', p.sire.dam, '牝系'],
          ].map(([lab, col, base, suf], i) => (
            <div key={i} style={{ flex: '1 1 45%', minWidth: 0 }}>
              {boxSire(lab, col, fakeL3(base, suf), null, true)}
            </div>
          ))}
        </div>
      )}

      {/* Level 1: dam */}
      <div style={{ marginBottom: 6 }}>
        {boxSire('母', 'dam', p.dam.name, p.dam.type)}
      </div>
      {depth >= 2 && (
        <div style={{ display: 'flex', gap: 6, marginLeft: 16, marginBottom: 10, position: 'relative' }}>
          <TreeConnector dam/>
          {boxSire('母父', 'sire', p.dam.sire, null, true)}
          {boxSire('母母', 'dam', p.dam.dam, null, true)}
        </div>
      )}
      {depth >= 3 && (
        <div style={{ display: 'flex', gap: 4, marginLeft: 32, marginBottom: 6, flexWrap: 'wrap' }}>
          {[
            ['母父父', 'sire', p.dam.sire, '代表馬'],
            ['母父母', 'dam', p.dam.sire, '牝系'],
            ['母母父', 'sire', p.dam.dam, '代表馬'],
            ['母母母', 'dam', p.dam.dam, '牝系'],
          ].map(([lab, col, base, suf], i) => (
            <div key={i} style={{ flex: '1 1 45%', minWidth: 0 }}>
              {boxSire(lab, col, fakeL3(base, suf), null, true)}
            </div>
          ))}
        </div>
      )}

      {/* Inbreeding */}
      <div style={{
        marginTop: 14, padding: 12, borderRadius: 12,
        background: 'rgba(124,58,237,0.08)',
        border: '1px solid rgba(124,58,237,0.25)',
      }}>
        <div style={{ fontSize: 10, color: '#B08CFF', fontWeight: 800, letterSpacing: 1 }}>INBREEDING</div>
        <div style={{ display: 'flex', gap: 12, marginTop: 6 }}>
          <div>
            <div style={{ fontSize: 9, color: THEME.inkSoft }}>インブリード係数</div>
            <div style={{ fontSize: 17, fontWeight: 900, color: THEME.ink, fontFeatureSettings: '"tnum"' }}>3.12%</div>
          </div>
          <div>
            <div style={{ fontSize: 9, color: THEME.inkSoft }}>共通祖先</div>
            <div style={{ fontSize: 12, color: THEME.ink, fontWeight: 700, marginTop: 2 }}>Northern Dancer 4×5</div>
          </div>
        </div>
      </div>

      {/* Analyst comment */}
      <div style={{
        marginTop: 10, padding: 12, borderRadius: 12,
        background: THEME.surface, border: `1px solid ${THEME.border}`,
      }}>
        <div style={{ fontSize: 10, color: THEME.primary, fontWeight: 800, letterSpacing: 1, marginBottom: 4 }}>
          ANALYST
        </div>
        <div style={{ fontSize: 12, color: THEME.ink, lineHeight: 1.55 }}>
          {horse.comment}
        </div>
      </div>
    </div>
  );
}

function TreeConnector({ dam }) {
  return (
    <div style={{
      position: 'absolute', left: -16, top: '-6px', bottom: 0, width: 16,
      borderLeft: `1.5px solid ${dam ? '#FF8FB1' : THEME.primary}`,
      opacity: 0.5,
    }}/>
  );
}

// --- Adaptability: radar + bars
function AdaptBreakdown({ horse }) {
  const metrics = [
    { k: '距離適性', v: horse.distanceFit, c: THEME.primary },
    { k: '馬場適性', v: horse.surfaceFit, c: THEME.cool },
    { k: 'コース適性', v: horse.courseFit, c: THEME.green },
    { k: '展開想定', v: 74, c: '#B08CFF' },
    { k: '血統総合', v: Math.round((horse.distanceFit + horse.surfaceFit + horse.courseFit) / 3), c: THEME.hot },
  ];
  return (
    <div style={{ padding: '16px 16px 12px' }}>
      {/* radar */}
      <div style={{
        background: THEME.surface, borderRadius: 16,
        padding: 14, border: `1px solid ${THEME.border}`, marginBottom: 10,
      }}>
        <div style={{ fontSize: 10, color: THEME.primary, fontWeight: 800, letterSpacing: 1, marginBottom: 6 }}>
          血統 ADAPTABILITY
        </div>
        <Radar values={metrics}/>
      </div>
      {/* bars */}
      <div style={{
        background: THEME.surface, borderRadius: 16,
        padding: '6px 14px', border: `1px solid ${THEME.border}`,
      }}>
        {metrics.map(m => (
          <MiniBar key={m.k} label={m.k} value={m.v} color={m.c}/>
        ))}
      </div>
    </div>
  );
}

function Radar({ values }) {
  const size = 240, cx = size / 2, cy = size / 2, r = 90;
  const n = values.length;
  const pt = (i, v) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / n;
    const rr = r * (v / 100);
    return [cx + Math.cos(a) * rr, cy + Math.sin(a) * rr];
  };
  const poly = values.map((m, i) => pt(i, m.v).join(',')).join(' ');
  return (
    <svg width="100%" viewBox={`0 0 ${size} ${size}`} style={{ display: 'block' }}>
      {[25, 50, 75, 100].map(lv => (
        <polygon key={lv}
          points={Array.from({ length: n }, (_, i) => pt(i, lv).join(',')).join(' ')}
          fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
      ))}
      {values.map((m, i) => {
        const [x, y] = pt(i, 100);
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="rgba(255,255,255,0.06)"/>;
      })}
      <polygon points={poly} fill="rgba(255,176,32,0.25)" stroke={THEME.primary} strokeWidth="2" strokeLinejoin="round"/>
      {values.map((m, i) => {
        const [x, y] = pt(i, m.v);
        return <circle key={i} cx={x} cy={y} r="3.5" fill={m.c}/>;
      })}
      {values.map((m, i) => {
        const [x, y] = pt(i, 118);
        return <text key={i} x={x} y={y} textAnchor="middle" dominantBaseline="middle"
          fill={THEME.ink} fontSize="10" fontWeight="700">{m.k}</text>;
      })}
    </svg>
  );
}

// --- Form
function FormBreakdown({ horse }) {
  const races = (horse.prevRaces || []).map(r => ({
    date: r.date, name: r.name, grade: r.grade,
    course: `${r.course}${r.dist.replace(/[^0-9]/g, '')}`,
    surface: r.dist.includes('芝') ? '芝' : 'ダ',
    cond: r.cond, pos: r.pos, jockey: r.jockey, time: r.time, field: r.field,
  }));
  return (
    <div style={{ padding: '16px 16px 12px' }}>
      <div style={{
        background: THEME.surface, borderRadius: 16,
        border: `1px solid ${THEME.border}`, overflow: 'hidden',
      }}>
        {races.map((r, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '11px 14px',
            borderBottom: i < races.length - 1 ? `1px solid ${THEME.border}` : 'none',
          }}>
            <div style={{ width: 36, fontSize: 10, color: THEME.inkSoft, fontFeatureSettings: '"tnum"' }}>{r.date}</div>
            <div style={{
              width: 26, height: 26, borderRadius: 6,
              background: r.pos === 1 ? 'rgba(255,176,32,0.18)' : 'rgba(255,255,255,0.05)',
              color: r.pos === 1 ? THEME.primary : THEME.ink,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 800, fontSize: 13, flexShrink: 0,
            }}>{r.pos}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: THEME.ink, display: 'flex', gap: 4 }}>
                {r.grade && <span style={{ fontSize: 9, padding: '1px 4px', background: THEME.primary, color: THEME.primaryInk, borderRadius: 3, fontWeight: 800 }}>{r.grade}</span>}
                <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.name}</span>
              </div>
              <div style={{ fontSize: 10, color: THEME.inkSoft, marginTop: 1 }}>
                {r.course} ・ {r.surface}{r.cond}{r.field ? ` ・ ${r.field}頭` : ''} ・ {r.jockey}
              </div>
            </div>
            <div style={{ fontSize: 11, color: THEME.ink, fontFeatureSettings: '"tnum"', fontWeight: 700 }}>{r.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { HorseDetail });
