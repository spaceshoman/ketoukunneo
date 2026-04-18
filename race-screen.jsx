// components/race-screen.jsx

const RaceScreen = ({ onNavigate }) => {
  const [tab, setTab] = React.useState('odds');

  const tabs = [
    { k: 'odds', label: 'オッズ' },
    { k: 'umabashira', label: '馬柱' },
    { k: 'course', label: 'コース' },
  ];

  return (
    <div style={{ height:'100%', display:'flex', flexDirection:'column', background:C.bg }}>
      {/* レースヘッダー */}
      <div style={{
        padding: '12px 16px 0',
        background: 'linear-gradient(180deg, #0D1B35 0%, rgba(13,27,53,0.95) 100%)',
        flexShrink: 0,
        borderBottom: `1px solid ${C.border}`,
      }}>
        <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:8 }}>
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:3 }}>
              <span style={{ fontSize:18, fontWeight:900, color:'#fff', letterSpacing:'-0.02em' }}>{RACE.name}</span>
              <GradeBadge grade={RACE.grade}/>
            </div>
            <div style={{ display:'flex', gap:10, fontSize:10, color:C.textSub }}>
              <span>{RACE.round}</span>
              <span>{RACE.course} {RACE.surface}{RACE.distance}m {RACE.direction}</span>
              <span>{RACE.date} {RACE.time}</span>
            </div>
          </div>
          <div style={{ textAlign:'right' }}>
            <div style={{ fontSize:10, color:C.textMuted }}>1着賞金</div>
            <div style={{ fontSize:14, fontWeight:800, color:C.gold }}>{RACE.purse}</div>
          </div>
        </div>

        {/* タブ */}
        <div style={{ display:'flex', gap:0, borderBottom:`1px solid ${C.border}` }}>
          {tabs.map(t => (
            <button key={t.k} onClick={() => setTab(t.k)} style={{
              flex:1, padding:'8px 0',
              background:'transparent', border:'none',
              fontSize:12, fontWeight:700, cursor:'pointer',
              color: tab === t.k ? C.gold : C.textSub,
              borderBottom: tab === t.k ? `2px solid ${C.gold}` : '2px solid transparent',
              transition:'all 0.2s',
            }}>{t.label}</button>
          ))}
        </div>
      </div>

      {/* タブコンテンツ */}
      <div style={{ flex:1, overflowY:'auto' }}>
        {tab === 'odds' && <OddsTab onNavigate={onNavigate}/>}
        {tab === 'umabashira' && <UmabashiraTab onNavigate={onNavigate}/>}
        {tab === 'course' && <CourseTab/>}
      </div>
    </div>
  );
};

/* ── オッズタブ ── */
const OddsTab = ({ onNavigate }) => {
  const sorted = [...HORSES].sort((a,b) => a.pop - b.pop);
  const maxOdds = Math.max(...HORSES.map(h => Math.min(h.odds, 100)));

  return (
    <div style={{ padding:'12px 14px 24px' }}>
      {sorted.map(h => {
        const barW = Math.min(100, (Math.log(h.odds + 1) / Math.log(maxOdds + 1)) * 100);
        return (
          <div
            key={h.no}
            onClick={() => onNavigate('detail', h)}
            style={{
              display:'flex', alignItems:'center', gap:10,
              padding:'9px 10px',
              marginBottom:5,
              background: C.card,
              borderRadius:10,
              border:`1px solid ${C.border}`,
              cursor:'pointer',
              position:'relative', overflow:'hidden',
            }}
          >
            {/* オッズ幅バー */}
            <div style={{
              position:'absolute', left:0, top:0, bottom:0,
              width:`${barW}%`,
              background: h.pop <= 3
                ? 'linear-gradient(90deg, rgba(245,200,66,0.08), transparent)'
                : 'linear-gradient(90deg, rgba(255,255,255,0.03), transparent)',
              pointerEvents:'none',
            }}/>

            <div style={{ fontSize:12, fontWeight:800, color:C.textMuted, width:20, textAlign:'center', flexShrink:0 }}>{h.pop}</div>
            <GateChip gate={h.gate} no={h.no}/>
            <AIMark mark={h.aiMark}/>

            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontSize:13, fontWeight:800, color:'#fff', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                {h.name}
              </div>
              <div style={{ fontSize:10, color:C.textSub }}>{h.jockey}</div>
            </div>

            <div style={{ textAlign:'right', flexShrink:0 }}>
              <div style={{
                fontSize: h.pop <= 3 ? 17 : 15,
                fontWeight: 900,
                color: h.pop === 1 ? C.gold : h.pop === 2 ? '#ccc' : h.pop === 3 ? '#CD853F' : C.textSub,
              }}>{h.odds}<span style={{ fontSize:10, fontWeight:500 }}>倍</span></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

/* ── 馬柱タブ ── */
const UmaashiraTab = ({ onNavigate }) => {
  const sorted = [...HORSES].sort((a,b) => a.no - b.no);
  return (
    <div style={{ padding:'12px 14px 24px' }}>
      {sorted.map(h => (
        <div
          key={h.no}
          onClick={() => onNavigate('detail', h)}
          style={{
            marginBottom: 8,
            background: C.card,
            borderRadius: 12,
            border: `1px solid ${C.border}`,
            overflow: 'hidden',
            cursor: 'pointer',
          }}
        >
          {/* ヘッダー行 */}
          <div style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 12px 6px' }}>
            <GateChip gate={h.gate} no={h.no}/>
            <div style={{ flex:1 }}>
              <div style={{ display:'flex', alignItems:'center', gap:5 }}>
                <AIMark mark={h.aiMark}/>
                <span style={{ fontSize:13, fontWeight:800, color:'#fff' }}>{h.name}</span>
                {h.mark && <MarkBadge mark={h.mark}/>}
              </div>
              <div style={{ fontSize:10, color:C.textSub, marginTop:1 }}>
                {h.jockey} / {h.trainer} ({h.stable})
              </div>
            </div>
            <div style={{ textAlign:'right' }}>
              <div style={{ fontSize:13, fontWeight:800, color: h.pop <= 3 ? C.gold : C.textSub }}>{h.odds}倍</div>
              <div style={{ fontSize:9, color:C.textMuted }}>{h.pop}人気</div>
            </div>
          </div>

          {/* 前走履歴 */}
          <div style={{ padding:'0 12px 10px' }}>
            <div style={{ display:'flex', gap:5, overflowX:'auto' }}>
              {h.prevRaces.map((r,i) => (
                <div key={i} style={{
                  flexShrink:0, background:'rgba(255,255,255,0.04)',
                  borderRadius:8, padding:'5px 8px', minWidth:96,
                }}>
                  <div style={{ display:'flex', alignItems:'center', gap:4, marginBottom:3 }}>
                    <PosChip pos={r.pos}/>
                    <GradeBadge grade={r.grade}/>
                    <span style={{ fontSize:9, color:C.textMuted }}>{r.field}頭</span>
                  </div>
                  <div style={{ fontSize:9, fontWeight:700, color:'#fff', marginBottom:1, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', maxWidth:80 }}>{r.name}</div>
                  <div style={{ fontSize:9, color:C.textMuted }}>{r.course} {r.dist}</div>
                  <div style={{ fontSize:9, color:C.textMuted }}>{r.date}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// エクスポート用エイリアス
const UmaashiraTabWrapped = UmaashiraTab;

/* ── コースタブ ── */
const CourseTab = () => {
  return (
    <div style={{ padding:'16px 14px 24px' }}>
      {/* コースプロフィール */}
      <Card style={{ padding:'14px 16px', marginBottom:12 }}>
        <SectionHeader title="中山芝2000m" sub="右・内回り"/>
        <div style={{ fontSize:11, color:C.textSub, lineHeight:1.7, marginBottom:12 }}>
          スタートから1コーナーまでの距離が短く、前半から激しい位置取り争いになりやすい。急坂を2回通過し、スタミナと機動力が問われる。
        </div>
        <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
          {[
            { label:'コースレコード', value:RACE.courseRecord.time, sub:RACE.courseRecord.horse },
            { label:'レースレコード', value:RACE.raceRecord.time, sub:RACE.raceRecord.horse },
          ].map((item,i) => (
            <div key={i} style={{
              flex:1, minWidth:120,
              background:'rgba(255,255,255,0.04)', borderRadius:10, padding:'10px 12px',
            }}>
              <div style={{ fontSize:9, color:C.textMuted, marginBottom:4 }}>{item.label}</div>
              <div style={{ fontSize:16, fontWeight:900, color:C.gold, fontFamily:'Inter,sans-serif' }}>{item.value}</div>
              <div style={{ fontSize:9, color:C.textSub, marginTop:2 }}>{item.sub}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* バイアス */}
      <Card style={{ padding:'14px 16px', marginBottom:12 }}>
        <SectionHeader title="馬場バイアス"/>
        <div style={{ display:'flex', gap:8 }}>
          {[
            { k:'ペース', v:COURSE_TRENDS.bias.pace },
            { k:'馬場偏向', v:COURSE_TRENDS.bias.trackBias },
            { k:'傾向', v:COURSE_TRENDS.bias.lastRace },
          ].map((item,i) => (
            <div key={i} style={{
              flex:1, background:'rgba(255,255,255,0.04)', borderRadius:10,
              padding:'8px 10px', textAlign:'center',
            }}>
              <div style={{ fontSize:9, color:C.textMuted, marginBottom:4 }}>{item.k}</div>
              <div style={{ fontSize:13, fontWeight:800, color:'#fff' }}>{item.v}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* 父系傾向 */}
      <Card style={{ padding:'14px 16px' }}>
        <SectionHeader title="父系勝率ランキング"/>
        {COURSE_TRENDS.winningSires.map((s,i) => (
          <div key={i} style={{ display:'flex', alignItems:'center', gap:10, marginBottom:10 }}>
            <span style={{
              width:22, height:22, borderRadius:6, flexShrink:0,
              display:'flex', alignItems:'center', justifyContent:'center',
              background: i===0 ? C.gold : i===1 ? '#9E9E9E' : i===2 ? '#CD853F' : 'rgba(255,255,255,0.08)',
              color: i<=2 ? '#000' : C.textSub,
              fontSize:11, fontWeight:900,
            }}>{i+1}</span>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:11, fontWeight:700, color:'#fff', marginBottom:3 }}>{s.name}</div>
              <ProgressBar value={s.rate} max={30} color={i===0?C.gold:i===1?'#9E9E9E':C.teal} height={3}/>
            </div>
            <div style={{ textAlign:'right' }}>
              <div style={{ fontSize:13, fontWeight:800, color:i===0?C.gold:C.textSub }}>{s.rate}%</div>
              <div style={{ fontSize:9, color:C.textMuted }}>n={s.sample}</div>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
};

window.RaceScreen = RaceScreen;
