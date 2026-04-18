// bet-screen.jsx — 買い目提案（券種別推奨）
// Depends on: data.jsx, ui-primitives.jsx

function BetScreen({ onBack, onOpenHorse }) {
  const [budget, setBudget] = React.useState(10000);
  const [risk, setRisk] = React.useState('balanced'); // safe | balanced | dream

  // Sort horses by AI score
  const ranked = React.useMemo(() => [...HORSES].sort((a, b) => b.aiScore - a.aiScore), []);
  const [honmei, taikou, tanana, renka, renka2, anake] = ranked;
  // honmei = ◎ (No.1 AI), taikou = ○ (No.2), tanana = ▲ (No.3), renka 4-5位, anake 穴
  const dream = ranked.find(h => h.pop >= 10 && h.aiScore >= 65) || ranked[10];

  // Build recommendations by bet type & risk profile
  const recs = buildRecs({ honmei, taikou, tanana, renka, renka2, anake, dream, risk });

  // Expected ROI / hit rate synthesis (heuristic)
  const summary = summarize(recs, ranked);

  return (
    <div style={{ paddingBottom: 90, background: THEME.bg, minHeight: '100%' }}>
      {/* header */}
      <div style={{
        padding: '12px 16px 10px',
        borderBottom: `1px solid ${THEME.border}`,
        position: 'sticky', top: 0, background: THEME.bg, zIndex: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button onClick={onBack} style={{
            width: 32, height: 32, borderRadius: 10,
            background: 'rgba(255,255,255,0.06)', border: 'none', color: THEME.ink,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"/></svg>
          </button>
          <div>
            <div style={{ fontSize: 10, color: THEME.primary, fontWeight: 800, letterSpacing: 1.5 }}>AI 買い目</div>
            <div style={{ fontSize: 16, fontWeight: 900, color: THEME.ink }}>血統 × スコア推奨</div>
          </div>
        </div>
      </div>

      {/* Strategy cards — 3 profiles */}
      <div style={{ padding: '14px 16px 8px', display: 'flex', gap: 8 }}>
        {[
          { k: 'safe', label: '堅実', sub: '的中率重視', color: THEME.green },
          { k: 'balanced', label: 'バランス', sub: '回収率◎', color: THEME.primary },
          { k: 'dream', label: '一撃', sub: '高配当狙い', color: THEME.hot },
        ].map(p => {
          const on = risk === p.k;
          return (
            <button key={p.k} onClick={() => setRisk(p.k)} style={{
              flex: 1, padding: '10px 8px', borderRadius: 12,
              background: on ? `linear-gradient(160deg, ${p.color}30, ${p.color}08)` : 'rgba(255,255,255,0.04)',
              border: on ? `1.5px solid ${p.color}` : `1px solid ${THEME.border}`,
              cursor: 'pointer', textAlign: 'left',
            }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: on ? p.color : THEME.ink }}>{p.label}</div>
              <div style={{ fontSize: 9, color: THEME.inkSoft, marginTop: 2 }}>{p.sub}</div>
            </button>
          );
        })}
      </div>

      {/* Budget slider */}
      <div style={{ padding: '4px 16px 12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
          <span style={{ fontSize: 10, color: THEME.inkSoft, letterSpacing: 0.5 }}>予算</span>
          <span style={{ fontSize: 16, fontWeight: 800, color: THEME.primary, fontFeatureSettings: '"tnum"' }}>
            ¥{budget.toLocaleString()}
          </span>
        </div>
        <input type="range" min="1000" max="50000" step="1000"
          value={budget} onChange={e => setBudget(+e.target.value)}
          style={{
            width: '100%', accentColor: THEME.primary, margin: 0,
          }}/>
      </div>

      {/* Summary pill */}
      <div style={{ padding: '0 16px 12px' }}>
        <div style={{
          display: 'flex', gap: 8,
          background: 'linear-gradient(120deg, rgba(255,176,32,0.08), rgba(255,45,85,0.06))',
          border: `1px solid rgba(255,176,32,0.25)`,
          borderRadius: 14, padding: 12,
        }}>
          <SummaryStat label="想定的中率" value={`${summary.hitRate}%`} color={THEME.green}/>
          <Sep/>
          <SummaryStat label="想定回収率" value={`${summary.roi}%`} color={THEME.primary}/>
          <Sep/>
          <SummaryStat label="推奨点数" value={`${summary.count}点`} color={THEME.cool}/>
        </div>
      </div>

      {/* Key horses panel */}
      <KeyHorses honmei={honmei} taikou={taikou} tanana={tanana} renka={renka} renka2={renka2} anake={dream}
        onOpenHorse={onOpenHorse}/>

      {/* Bet cards by type */}
      <div style={{ padding: '6px 16px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {recs.map((r, i) => (
          <BetCard key={i} rec={r} budget={budget} total={summary.unitTotal}/>
        ))}
      </div>

      {/* Reasoning */}
      <div style={{ padding: '0 16px 16px' }}>
        <div style={{
          background: THEME.surface, borderRadius: 14,
          padding: 14, border: `1px solid ${THEME.border}`,
        }}>
          <div style={{ fontSize: 10, color: THEME.primary, fontWeight: 800, letterSpacing: 1, marginBottom: 6 }}>
            AIレコメンド根拠
          </div>
          <div style={{ fontSize: 11.5, color: THEME.ink, lineHeight: 1.7 }}>
            <Reason name={honmei.name} why={`AIスコア${honmei.aiScore}。${honmei.tags.slice(0,2).join('・')}で中山2000mに適性。`} color={THEME.hot} mark="◎"/>
            <Reason name={taikou.name} why={`AIスコア${taikou.aiScore}。${taikou.tags[0]}。連軸として信頼。`} color={THEME.primary} mark="○"/>
            <Reason name={tanana.name} why={`AIスコア${tanana.aiScore}。${tanana.tags[0]}。末脚強烈。`} color={THEME.cool} mark="▲"/>
            <Reason name={dream.name} why={`${dream.pop}番人気の伏兵。${dream.tags[0] || '血統魅力'}。一発警戒。`} color="#B08CFF" mark="☆"/>
          </div>
        </div>
      </div>
    </div>
  );
}

function KeyHorses({ honmei, taikou, tanana, renka, renka2, anake, onOpenHorse }) {
  const items = [
    { h: honmei, mark: '◎', label: '本命', color: THEME.hot },
    { h: taikou, mark: '○', label: '対抗', color: THEME.primary },
    { h: tanana, mark: '▲', label: '単穴', color: THEME.cool },
    { h: renka, mark: '△', label: '連下', color: '#A5B4FC' },
    { h: renka2, mark: '△', label: '連下', color: '#A5B4FC' },
    { h: anake, mark: '☆', label: '穴', color: '#B08CFF' },
  ];
  return (
    <div style={{ padding: '0 16px 14px' }}>
      <div style={{
        background: THEME.surface, borderRadius: 14,
        border: `1px solid ${THEME.border}`, padding: 10,
      }}>
        <div style={{ fontSize: 10, color: THEME.inkSoft, letterSpacing: 1, marginBottom: 8, padding: '0 2px' }}>
          予想印
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
          {items.map((it, i) => (
            <div key={i} onClick={() => onOpenHorse(it.h.no)} style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '8px 8px', borderRadius: 10,
              background: 'rgba(255,255,255,0.03)',
              border: `1px solid ${it.color}30`,
              cursor: 'pointer',
            }}>
              <span style={{ fontSize: 16, fontWeight: 900, color: it.color }}>{it.mark}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 8, color: THEME.inkSoft }}>{it.label}</div>
                <div style={{ fontSize: 10, fontWeight: 700, color: THEME.ink,
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{it.h.no}. {it.h.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SummaryStat({ label, value, color }) {
  return (
    <div style={{ flex: 1, textAlign: 'center' }}>
      <div style={{ fontSize: 9, color: THEME.inkSoft, marginBottom: 2 }}>{label}</div>
      <div style={{ fontSize: 16, fontWeight: 900, color, fontFeatureSettings: '"tnum"' }}>{value}</div>
    </div>
  );
}

function Sep() {
  return <div style={{ width: 1, background: 'rgba(255,255,255,0.1)' }}/>;
}

function Reason({ name, why, color, mark }) {
  return (
    <div style={{ display: 'flex', gap: 6, marginBottom: 5 }}>
      <span style={{ color, fontWeight: 800, minWidth: 16 }}>{mark}</span>
      <span><span style={{ color: THEME.primary, fontWeight: 700 }}>{name}</span> — {why}</span>
    </div>
  );
}

function BetCard({ rec, budget, total }) {
  const share = total > 0 ? rec.units / total : 0;
  const yen = Math.round(budget * share / 100) * 100;
  return (
    <div style={{
      background: THEME.surface, borderRadius: 14,
      border: `1px solid ${rec.color}30`,
      overflow: 'hidden',
    }}>
      <div style={{
        padding: '10px 12px 8px',
        background: `linear-gradient(90deg, ${rec.color}22, transparent 70%)`,
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <span style={{
          padding: '3px 8px', borderRadius: 5,
          background: rec.color, color: '#0B0F1A',
          fontSize: 10, fontWeight: 900, letterSpacing: 1,
        }}>{rec.type}</span>
        <span style={{ fontSize: 13, fontWeight: 800, color: THEME.ink }}>{rec.label}</span>
        <span style={{ flex: 1 }}/>
        <span style={{ fontSize: 11, color: THEME.inkSoft, fontFeatureSettings: '"tnum"' }}>
          {rec.combos.length}点 ・ ¥{yen.toLocaleString()}
        </span>
      </div>
      <div style={{ padding: '4px 10px 10px', display: 'flex', flexDirection: 'column', gap: 4 }}>
        {rec.combos.map((c, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '6px 8px',
            background: 'rgba(255,255,255,0.03)', borderRadius: 8,
          }}>
            {c.nums.map(n => (
              <Umaban key={n} no={n} gate={HORSES.find(h => h.no === n)?.gate || 1}/>
            ))}
            <span style={{ flex: 1 }}/>
            {c.odds && <span style={{
              fontSize: 11, color: THEME.primary, fontWeight: 800, fontFeatureSettings: '"tnum"',
            }}>想定 {c.odds}倍</span>}
          </div>
        ))}
      </div>
      {rec.note && (
        <div style={{
          padding: '6px 12px 10px',
          fontSize: 10, color: THEME.inkSoft, lineHeight: 1.5,
          borderTop: `1px dashed ${THEME.border}`,
        }}>
          {rec.note}
        </div>
      )}
    </div>
  );
}

// ─── Build recs by risk profile ───
function buildRecs({ honmei, taikou, tanana, renka, renka2, anake, dream, risk }) {
  const H = honmei.no, T = taikou.no, A = tanana.no, R = renka.no, R2 = renka2.no, D = dream.no;

  const mkOdds = (h, factor = 1) => (h.odds * factor).toFixed(1);
  const combinedOdds = (...arr) => {
    const sum = arr.reduce((a, h) => a + 1 / h.odds, 0);
    return Math.round((1 / sum) * 10) / 10;
  };

  if (risk === 'safe') {
    return [
      { type: '単勝', label: `本命${honmei.name}に厚く`, color: THEME.green, units: 40,
        combos: [{ nums: [H], odds: honmei.odds.toFixed(1) }],
        note: 'AIスコア最高馬に単勝一点。回収率よりも的中の安定を優先。',
      },
      { type: '複勝', label: '本命 + 対抗の複勝2点', color: THEME.green, units: 30,
        combos: [
          { nums: [H], odds: (honmei.odds * 0.35).toFixed(1) },
          { nums: [T], odds: (taikou.odds * 0.35).toFixed(1) },
        ],
        note: '複勝圏内の確度が高い2頭。',
      },
      { type: 'ワイド', label: `◎-○-▲ BOX 3点`, color: THEME.cool, units: 30,
        combos: [
          { nums: [H, T], odds: combinedOdds(honmei, taikou) },
          { nums: [H, A], odds: combinedOdds(honmei, tanana) },
          { nums: [T, A], odds: combinedOdds(taikou, tanana) },
        ],
        note: '2頭が3着以内でOK。堅実派の王道。',
      },
    ];
  }

  if (risk === 'dream') {
    return [
      { type: '3連単', label: `◎→○▲→○▲△△ 8点`, color: THEME.hot, units: 40,
        combos: [
          { nums: [H, T, A], odds: (honmei.odds * taikou.odds * tanana.odds * 2).toFixed(0) },
          { nums: [H, T, R], odds: (honmei.odds * taikou.odds * renka.odds * 2).toFixed(0) },
          { nums: [H, T, D], odds: (honmei.odds * taikou.odds * dream.odds * 2).toFixed(0) },
          { nums: [H, A, T], odds: (honmei.odds * tanana.odds * taikou.odds * 2).toFixed(0) },
          { nums: [H, A, R], odds: (honmei.odds * tanana.odds * renka.odds * 2).toFixed(0) },
          { nums: [H, A, D], odds: (honmei.odds * tanana.odds * dream.odds * 2).toFixed(0) },
        ],
        note: '本命1着固定。相手に穴馬☆まで広く。的中すれば万馬券。',
      },
      { type: '3連複', label: `◎○-▲△☆ 流し`, color: THEME.hot, units: 30,
        combos: [
          { nums: [H, T, A], odds: (honmei.odds * taikou.odds * tanana.odds / 3).toFixed(0) },
          { nums: [H, T, D], odds: (honmei.odds * taikou.odds * dream.odds / 3).toFixed(0) },
          { nums: [H, A, D], odds: (honmei.odds * tanana.odds * dream.odds / 3).toFixed(0) },
          { nums: [T, A, D], odds: (taikou.odds * tanana.odds * dream.odds / 3).toFixed(0) },
        ],
        note: '穴馬☆が絡む高配当パターン。',
      },
      { type: '単勝', label: `穴馬 ${dream.name} 一撃`, color: '#B08CFF', units: 30,
        combos: [{ nums: [D], odds: dream.odds.toFixed(1) }],
        note: `${dream.pop}番人気。血統分析でAIスコア${dream.aiScore}の伏兵。`,
      },
    ];
  }

  // balanced
  return [
    { type: '馬連', label: `◎○▲△ 軸流し 5点`, color: THEME.primary, units: 30,
      combos: [
        { nums: [H, T], odds: (honmei.odds * taikou.odds / 2).toFixed(1) },
        { nums: [H, A], odds: (honmei.odds * tanana.odds / 2).toFixed(1) },
        { nums: [H, R], odds: (honmei.odds * renka.odds / 2).toFixed(1) },
        { nums: [H, R2], odds: (honmei.odds * renka2.odds / 2).toFixed(1) },
        { nums: [H, D], odds: (honmei.odds * dream.odds / 2).toFixed(1) },
      ],
      note: '本命軸の馬連5点。堅さと配当のバランス。',
    },
    { type: '馬単', label: `◎ → ○▲△ 3点`, color: THEME.primary, units: 25,
      combos: [
        { nums: [H, T], odds: (honmei.odds * taikou.odds * 0.9).toFixed(1) },
        { nums: [H, A], odds: (honmei.odds * tanana.odds * 0.9).toFixed(1) },
        { nums: [H, R], odds: (honmei.odds * renka.odds * 0.9).toFixed(1) },
      ],
      note: '本命1着固定の馬単。勝ち切る自信があるなら。',
    },
    { type: '3連複', label: `◎○-▲△△ BOX 4点`, color: THEME.hot, units: 25,
      combos: [
        { nums: [H, T, A], odds: (honmei.odds * taikou.odds * tanana.odds / 3).toFixed(0) },
        { nums: [H, T, R], odds: (honmei.odds * taikou.odds * renka.odds / 3).toFixed(0) },
        { nums: [H, A, R], odds: (honmei.odds * tanana.odds * renka.odds / 3).toFixed(0) },
        { nums: [T, A, R], odds: (taikou.odds * tanana.odds * renka.odds / 3).toFixed(0) },
      ],
      note: '上位4頭ボックス。人気サイドで固める手堅い構成。',
    },
    { type: 'ワイド', label: `◎-☆ 穴抑え`, color: '#B08CFF', units: 20,
      combos: [
        { nums: [H, D], odds: combinedOdds(honmei, dream) * 1.5 },
      ],
      note: `穴馬☆${dream.name}の保険。万一の高配当。`,
    },
  ];
}

function summarize(recs, ranked) {
  const count = recs.reduce((a, r) => a + r.combos.length, 0);
  const unitTotal = recs.reduce((a, r) => a + r.units, 0);
  // Simplified heuristics
  const avgMarkOdds = ranked.slice(0, 3).reduce((a, h) => a + h.odds, 0) / 3;
  const hitRate = Math.round(Math.max(18, Math.min(74, 100 - avgMarkOdds * 5)));
  const roi = Math.round(Math.max(90, Math.min(215, 80 + (avgMarkOdds * 4) + (count * 2))));
  return { count, unitTotal, hitRate, roi };
}

window.BetScreen = BetScreen;
