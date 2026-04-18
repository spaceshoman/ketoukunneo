// screens.jsx — main screens: Dashboard, RaceList, HorseDetail, PedigreeTab
// Depends on: data.jsx, icons.jsx, ui-primitives.jsx (window globals)

const { useState, useMemo } = React;

// ─────────────────────────────────────────────────────────────
// DASHBOARD — landing screen, shows focus race + AI picks + lineage watch
// ─────────────────────────────────────────────────────────────
function Dashboard({ onOpenRace, onOpenHorse }) {
  const top3 = [...HORSES].sort((a, b) => b.aiScore - a.aiScore).slice(0, 3);
  return (
    <div style={{ paddingBottom: 90 }}>
      {/* hero — focus race */}
      <HeroRaceCard race={RACE} onOpen={onOpenRace}/>

      {/* AI picks */}
      <SectionHead
        kicker="AI SCORE × 血統"
        title="本日の推奨馬"
        right={<span style={{ fontSize: 11, color: THEME.inkSoft }}>G1 皐月賞</span>}
      />
      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {top3.map(h => <PickCard key={h.no} horse={h} onClick={() => onOpenHorse(h.no)}/>)}
      </div>

      {/* course trends */}
      <SectionHead kicker="コース血統傾向" title={COURSE_TRENDS.course}/>
      <div style={{ padding: '0 16px' }}>
        <CourseTrendCard data={COURSE_TRENDS}/>
      </div>

      {/* lineage trends */}
      <SectionHead kicker="系統別 成績" title="注目種牡馬系統"/>
      <div style={{ padding: '0 16px' }}>
        <LineageTrendCard items={LINEAGE_TRENDS}/>
      </div>
    </div>
  );
}

function HeroRaceCard({ race, onOpen }) {
  return (
    <div style={{ padding: '0 16px', marginTop: 4 }}>
      <div onClick={onOpen} style={{
        position: 'relative', borderRadius: 22, overflow: 'hidden',
        background: 'linear-gradient(135deg,#1A1530 0%,#271139 30%,#3B0F2E 100%)',
        border: '1px solid rgba(255,176,32,0.25)',
        padding: '18px 18px 16px',
        cursor: 'pointer',
      }}>
        {/* glow */}
        <div style={{
          position: 'absolute', right: -40, top: -60, width: 220, height: 220,
          borderRadius: '50%', background: 'radial-gradient(closest-side,#FFB020 0%,rgba(255,176,32,0) 70%)',
          opacity: 0.45, pointerEvents: 'none',
        }}/>
        <div style={{
          position: 'absolute', left: -60, bottom: -80, width: 240, height: 240,
          borderRadius: '50%', background: 'radial-gradient(closest-side,#FF2D55 0%,rgba(255,45,85,0) 70%)',
          opacity: 0.35, pointerEvents: 'none',
        }}/>

        {/* meta row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, position: 'relative' }}>
          <span style={{
            fontSize: 10, fontWeight: 800, letterSpacing: 1,
            padding: '3px 7px', borderRadius: 4,
            background: THEME.primary, color: THEME.primaryInk,
          }}>G1</span>
          <span style={{ fontSize: 11, color: THEME.ink, fontWeight: 600 }}>{race.date} ({race.day})</span>
          <span style={{ fontSize: 11, color: THEME.inkSoft }}>{race.course} {race.number} ・ {race.round}</span>
          <span style={{ flex: 1 }}/>
          <span style={{ fontSize: 11, color: THEME.primary, fontWeight: 700 }}>発走 {race.time}</span>
        </div>

        {/* title */}
        <div style={{ position: 'relative' }}>
          <div style={{
            fontSize: 32, fontWeight: 900, color: THEME.ink, letterSpacing: -0.5,
            lineHeight: 1.05,
          }}>{race.name}</div>
          <div style={{
            fontSize: 11, color: THEME.inkSoft, letterSpacing: 3, marginTop: 4,
            fontFamily: 'ui-serif, serif', fontStyle: 'italic',
          }}>SATSUKI SHO 2026</div>
        </div>

        {/* stats row */}
        <div style={{
          display: 'flex', gap: 0, marginTop: 14, position: 'relative',
          background: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: '10px 4px',
          border: '1px solid rgba(255,255,255,0.06)',
        }}>
          {[
            { k: '距離', v: `${race.distance}m`, sub: race.surface },
            { k: '馬場', v: race.condition, sub: race.weather },
            { k: '頭数', v: `${RACE.fieldSize}頭`, sub: 'フルゲート' },
            { k: '賞金', v: race.purse, sub: '1着' },
          ].map((s, i) => (
            <div key={s.k} style={{
              flex: 1, textAlign: 'center',
              borderRight: i < 3 ? '1px solid rgba(255,255,255,0.06)' : 'none',
            }}>
              <div style={{ fontSize: 9, color: THEME.inkSoft, letterSpacing: 0.5, marginBottom: 2 }}>{s.k}</div>
              <div style={{ fontSize: 15, fontWeight: 800, color: THEME.ink, lineHeight: 1 }}>{s.v}</div>
              <div style={{ fontSize: 9, color: THEME.inkSoft, marginTop: 2 }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PickCard({ horse, onClick }) {
  const mc = markColor(horse.aiMark);
  return (
    <div onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: 12,
      background: THEME.surface, borderRadius: 16,
      padding: '12px 14px',
      border: `1px solid ${THEME.border}`, cursor: 'pointer',
    }}>
      <ScoreRing value={horse.aiScore} size={50} color={mc} label="AI"/>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
          <span style={{
            fontSize: 17, fontWeight: 800, color: mc, minWidth: 14, textAlign: 'center',
          }}>{horse.aiMark || '-'}</span>
          <Umaban no={horse.no} gate={horse.gate}/>
          <span style={{
            fontSize: 15, fontWeight: 800, color: THEME.ink,
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          }}>{horse.name}</span>
        </div>
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {horse.tags.slice(0, 2).map(t => <Chip key={t}>{t}</Chip>)}
        </div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <div style={{ fontSize: 10, color: THEME.inkSoft }}>単勝</div>
        <div style={{ fontSize: 16, fontWeight: 800, color: THEME.primary, fontFeatureSettings: '"tnum"' }}>
          {horse.odds.toFixed(1)}
        </div>
        <div style={{ fontSize: 9, color: THEME.inkSoft }}>{horse.pop}番人気</div>
      </div>
    </div>
  );
}

function CourseTrendCard({ data }) {
  return (
    <div style={{
      background: THEME.surface, borderRadius: 16,
      padding: '14px 14px 10px',
      border: `1px solid ${THEME.border}`,
    }}>
      {/* bias indicators */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        {[
          { k: 'ペース', v: data.bias.pace },
          { k: '馬場', v: data.bias.trackBias },
          { k: '脚質', v: data.bias.lastRace },
        ].map(b => (
          <div key={b.k} style={{
            flex: 1, padding: '8px 6px',
            background: 'rgba(0,212,255,0.08)',
            borderRadius: 10,
            border: '1px solid rgba(0,212,255,0.2)',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 9, color: THEME.inkSoft, marginBottom: 2 }}>{b.k}</div>
            <div style={{ fontSize: 12, fontWeight: 800, color: THEME.cool }}>{b.v}</div>
          </div>
        ))}
      </div>
      {/* winning sires */}
      <div style={{ fontSize: 10, color: THEME.inkSoft, marginBottom: 6, letterSpacing: 0.5 }}>
        勝率上位の種牡馬系統 (過去5年)
      </div>
      {data.winningSires.map(s => (
        <MiniBar
          key={s.name}
          label={s.name.replace('系', '')}
          value={s.rate}
          max={30}
          color={THEME.cool}
          rightLabel={`${s.rate}%`}
        />
      ))}
    </div>
  );
}

function LineageTrendCard({ items }) {
  return (
    <div style={{
      background: THEME.surface, borderRadius: 16,
      padding: 4,
      border: `1px solid ${THEME.border}`,
    }}>
      {items.map((l, i) => (
        <div key={l.name} style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '11px 12px',
          borderBottom: i < items.length - 1 ? `1px solid ${THEME.border}` : 'none',
        }}>
          <div style={{
            width: 28, height: 28, borderRadius: 7,
            background: l.type === 'sire' ? 'rgba(255,176,32,0.15)' : 'rgba(255,143,177,0.15)',
            color: l.type === 'sire' ? THEME.primary : '#FF8FB1',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 11, fontWeight: 800, flexShrink: 0,
          }}>{l.type === 'sire' ? '父' : '母父'}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: THEME.ink }}>{l.name}</div>
            <div style={{ fontSize: 10, color: THEME.inkSoft, fontFeatureSettings: '"tnum"' }}>
              勝利 {l.wins} ・ 複勝率 {l.rate}% ・ 賞金 {l.earnings}億
            </div>
          </div>
          <span style={{
            fontSize: 16, fontWeight: 800,
            color: l.trend === '◎' ? THEME.hot : l.trend === '○' ? THEME.primary : THEME.inkSoft,
          }}>{l.trend}</span>
        </div>
      ))}
    </div>
  );
}

Object.assign(window, { Dashboard });
