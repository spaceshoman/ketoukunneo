// race-screen.jsx — RaceScreen (出走馬一覧 + 血統比較)
// Depends on: data.jsx, ui-primitives.jsx

const { useState: useStateRS } = React;

function RaceScreen({ onOpenHorse, onBack }) {
  const [tab, setTab] = useStateRS('ai'); // ai | umaban | odds | pedigree
  const [compare, setCompare] = useStateRS(null); // null or {a, b}

  const sorted = React.useMemo(() => {
    const arr = [...HORSES];
    if (tab === 'ai') arr.sort((a, b) => b.aiScore - a.aiScore);
    else if (tab === 'umaban') arr.sort((a, b) => a.no - b.no);
    else if (tab === 'odds') arr.sort((a, b) => a.odds - b.odds);
    else arr.sort((a, b) => b.aiScore - a.aiScore);
    return arr;
  }, [tab]);

  return (
    <div style={{ paddingBottom: 90, background: THEME.bg, minHeight: '100%' }}>
      {/* sticky race header */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 10,
        background: THEME.bg,
        borderBottom: `1px solid ${THEME.border}`,
      }}>
        <div style={{ padding: '12px 16px 8px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <button onClick={onBack} style={{
            width: 32, height: 32, borderRadius: 10,
            background: 'rgba(255,255,255,0.06)', border: 'none',
            color: THEME.ink, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"/></svg>
          </button>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{
                fontSize: 9, fontWeight: 800, padding: '2px 5px', borderRadius: 3,
                background: THEME.primary, color: THEME.primaryInk, letterSpacing: 0.5,
              }}>G1</span>
              <span style={{ fontSize: 14, fontWeight: 800, color: THEME.ink }}>{RACE.name}</span>
            </div>
            <div style={{ fontSize: 10, color: THEME.inkSoft, marginTop: 2 }}>
              {RACE.course} {RACE.number} ・ {RACE.surface}{RACE.distance}m ・ {RACE.condition} ・ 発走 {RACE.time}
            </div>
          </div>
        </div>
        {/* sort tabs */}
        <div style={{ display: 'flex', padding: '0 16px 10px', gap: 6 }}>
          {[
            { k: 'ai', label: 'AIスコア順' },
            { k: 'umaban', label: '馬番順' },
            { k: 'odds', label: '人気順' },
            { k: 'pedigree', label: '血統別' },
          ].map(t => (
            <button key={t.k} onClick={() => setTab(t.k)} style={{
              padding: '6px 11px', borderRadius: 999,
              fontSize: 11, fontWeight: 700,
              background: tab === t.k ? THEME.primary : 'rgba(255,255,255,0.06)',
              color: tab === t.k ? THEME.primaryInk : THEME.inkSoft,
              border: 'none', cursor: 'pointer',
            }}>{t.label}</button>
          ))}
        </div>
      </div>

      {/* compare toolbar */}
      {compare && (
        <div style={{
          margin: '8px 16px 0', padding: '8px 10px',
          background: 'rgba(255,45,85,0.12)', border: '1px solid rgba(255,45,85,0.3)',
          borderRadius: 12, display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <Icon.Sparkles size={14} color={THEME.hot}/>
          <span style={{ fontSize: 11, color: THEME.ink, fontWeight: 600 }}>
            比較中: {compare.a ? HORSES.find(h => h.no === compare.a)?.name : '選択'} vs {compare.b ? HORSES.find(h => h.no === compare.b)?.name : '選択'}
          </span>
          <span style={{ flex: 1 }}/>
          <button onClick={() => setCompare(null)} style={{
            fontSize: 10, color: THEME.hot, background: 'none', border: 'none', fontWeight: 700,
          }}>×解除</button>
        </div>
      )}

      {/* list */}
      <div style={{ padding: '10px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {sorted.map(h => (
          <HorseRow key={h.no} horse={h}
            onClick={() => onOpenHorse(h.no)}
            onCompare={() => setCompare(c => {
              if (!c) return { a: h.no, b: null };
              if (!c.a) return { ...c, a: h.no };
              if (!c.b && c.a !== h.no) return { ...c, b: h.no };
              return { a: h.no, b: null };
            })}
            selected={compare && (compare.a === h.no || compare.b === h.no)}
          />
        ))}
      </div>

      {/* compare sheet */}
      {compare && compare.a && compare.b && (
        <CompareSheet a={HORSES.find(h => h.no === compare.a)} b={HORSES.find(h => h.no === compare.b)}/>
      )}
    </div>
  );
}

function HorseRow({ horse, onClick, onCompare, selected }) {
  const mc = markColor(horse.aiMark);
  return (
    <div style={{
      background: THEME.surface, borderRadius: 14,
      border: selected ? `1.5px solid ${THEME.hot}` : `1px solid ${THEME.border}`,
      overflow: 'hidden',
    }}>
      <div onClick={onClick} style={{
        padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer',
      }}>
        <div style={{
          width: 28, textAlign: 'center', fontSize: 17, fontWeight: 800, color: mc,
        }}>{horse.aiMark || '-'}</div>
        <Umaban no={horse.no} gate={horse.gate}/>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontSize: 14, fontWeight: 800, color: THEME.ink,
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          }}>{horse.name}</div>
          <div style={{ fontSize: 10, color: THEME.inkSoft, display: 'flex', gap: 6, marginTop: 1 }}>
            <span>{horse.sex}{horse.age}</span>
            <span>斤{horse.weight}</span>
            <span style={{ color: THEME.ink }}>{horse.jockey}</span>
          </div>
        </div>
        <div style={{ textAlign: 'right', minWidth: 50 }}>
          <div style={{ fontSize: 10, color: THEME.inkSoft, lineHeight: 1 }}>AI</div>
          <div style={{ fontSize: 18, fontWeight: 900, color: mc, lineHeight: 1.1, fontFeatureSettings: '"tnum"' }}>{horse.aiScore}</div>
        </div>
      </div>
      {/* pedigree summary strip */}
      <div style={{
        display: 'flex', alignItems: 'stretch',
        borderTop: `1px solid ${THEME.border}`,
        background: 'rgba(255,255,255,0.02)',
      }}>
        <div style={{ flex: 1, padding: '6px 10px', borderRight: `1px solid ${THEME.border}` }}>
          <div style={{ fontSize: 9, color: 'rgba(255,176,32,0.8)', fontWeight: 700, letterSpacing: 0.5 }}>父</div>
          <div style={{ fontSize: 11, fontWeight: 600, color: THEME.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {horse.pedigree.sire.name}
          </div>
          <div style={{ fontSize: 9, color: THEME.inkSoft }}>{horse.pedigree.sire.type}</div>
        </div>
        <div style={{ flex: 1, padding: '6px 10px', borderRight: `1px solid ${THEME.border}` }}>
          <div style={{ fontSize: 9, color: '#FF8FB1', fontWeight: 700, letterSpacing: 0.5 }}>母</div>
          <div style={{ fontSize: 11, fontWeight: 600, color: THEME.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {horse.pedigree.dam.name}
          </div>
          <div style={{ fontSize: 9, color: THEME.inkSoft }}>{horse.pedigree.dam.type}</div>
        </div>
        <button onClick={onCompare} style={{
          width: 56, background: selected ? THEME.hot : 'rgba(255,255,255,0.04)',
          border: 'none', color: selected ? '#fff' : THEME.inkSoft,
          fontSize: 10, fontWeight: 700, cursor: 'pointer',
        }}>{selected ? '選択中' : '比較'}</button>
      </div>
      {/* adaptability bars */}
      <div style={{ padding: '8px 12px 10px', display: 'flex', gap: 10 }}>
        <AdaptMini label="距離" value={horse.distanceFit} color={THEME.primary}/>
        <AdaptMini label="馬場" value={horse.surfaceFit} color={THEME.cool}/>
        <AdaptMini label="コース" value={horse.courseFit} color={THEME.green}/>
      </div>
    </div>
  );
}

function AdaptMini({ label, value, color }) {
  return (
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 6 }}>
      <span style={{ fontSize: 9, color: THEME.inkSoft, width: 26 }}>{label}</span>
      <div style={{ flex: 1 }}>
        <ScoreBar value={value} max={100} color={color} width="100%" height={4}/>
      </div>
      <span style={{ fontSize: 10, fontWeight: 700, color: THEME.ink, fontFeatureSettings: '"tnum"' }}>{value}</span>
    </div>
  );
}

function CompareSheet({ a, b }) {
  return (
    <div style={{
      margin: '12px 16px',
      background: 'linear-gradient(160deg,#1A1530 0%,#1A2236 100%)',
      borderRadius: 18, border: `1px solid rgba(255,45,85,0.3)`,
      padding: 14,
    }}>
      <div style={{ fontSize: 10, color: THEME.hot, fontWeight: 800, letterSpacing: 1.2, marginBottom: 8 }}>
        血統 HEAD TO HEAD
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <CompareCol h={a}/>
        <div style={{ width: 1, background: 'rgba(255,255,255,0.08)' }}/>
        <CompareCol h={b}/>
      </div>
      {/* Nick verdict */}
      <div style={{
        marginTop: 10, padding: '8px 10px',
        background: 'rgba(255,176,32,0.1)', border: '1px solid rgba(255,176,32,0.25)',
        borderRadius: 10,
      }}>
        <div style={{ fontSize: 10, color: THEME.primary, fontWeight: 700, letterSpacing: 0.5 }}>NICK判定</div>
        <div style={{ fontSize: 12, color: THEME.ink, marginTop: 2 }}>
          {a.name}の父系 × {b.name}の母父系の相性は{' '}
          <span style={{ color: THEME.primary, fontWeight: 800 }}>A</span>。中山2000mに向く配合。
        </div>
      </div>
    </div>
  );
}

function CompareCol({ h }) {
  return (
    <div style={{ flex: 1 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
        <Umaban no={h.no} gate={h.gate}/>
        <span style={{ fontSize: 12, fontWeight: 800, color: THEME.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{h.name}</span>
      </div>
      <MiniBar label="距離" value={h.distanceFit} color={THEME.primary}/>
      <MiniBar label="馬場" value={h.surfaceFit} color={THEME.cool}/>
      <MiniBar label="コース" value={h.courseFit} color={THEME.green}/>
      <MiniBar label="AI" value={h.aiScore} color={THEME.hot}/>
    </div>
  );
}

window.RaceScreen = RaceScreen;
