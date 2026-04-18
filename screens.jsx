// components/screens.jsx

/* ════════════════════════════════
   HomeScreen — トップ画面
   ════════════════════════════════ */
const HomeScreen = ({ onNavigate }) => {
  const { useRef, useEffect } = React;
  const horse = HORSES[3]; // ロブチェン（1番人気）
  const topPicks = HORSES.filter(h => h.pop <= 5).sort((a,b) => a.pop - b.pop);

  return (
    <div style={{
      height: '100%', overflowY: 'auto',
      background: C.bg,
    }}>
      {/* ヒーローバナー */}
      <div style={{
        position: 'relative',
        padding: '20px 20px 24px',
        background: 'linear-gradient(160deg, #0D1B35 0%, #1A0A2E 100%)',
        overflow: 'hidden',
      }}>
        {/* 装飾グリッド */}
        <div style={{
          position:'absolute', inset:0,
          backgroundImage: 'radial-gradient(circle at 80% 50%, rgba(245,200,66,0.12) 0%, transparent 60%), radial-gradient(circle at 20% 80%, rgba(10,132,255,0.1) 0%, transparent 50%)',
          pointerEvents:'none',
        }}/>
        {/* トラック装飾ライン */}
        <div style={{
          position:'absolute', bottom:-10, right:-20,
          width:200, height:200,
          border:'1px solid rgba(245,200,66,0.1)',
          borderRadius:'50%',
        }}/>
        <div style={{
          position:'absolute', bottom:-30, right:-40,
          width:260, height:260,
          border:'1px solid rgba(245,200,66,0.06)',
          borderRadius:'50%',
        }}/>

        {/* レース情報 */}
        <div style={{ position:'relative', zIndex:1 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:8 }}>
            <Badge color={C.bg} style={{ background: C.gold, fontSize:9, letterSpacing:'0.1em', fontWeight:900 }}>LIVE</Badge>
            <span style={{ fontSize:10, color:'rgba(245,200,66,0.8)', fontWeight:700, letterSpacing:'0.08em' }}>本日開催</span>
          </div>
          <div style={{ fontSize:22, fontWeight:900, color:'#fff', letterSpacing:'-0.02em', marginBottom:2 }}>
            {RACE.name}
            <span style={{ fontSize:13, color:'rgba(255,255,255,0.5)', fontWeight:500, marginLeft:8 }}>{RACE.round}</span>
          </div>
          <div style={{ fontSize:11, color:'rgba(255,255,255,0.55)', marginBottom:16, display:'flex', gap:12 }}>
            <span>{RACE.course} {RACE.surface}{RACE.distance}m</span>
            <span>{RACE.date} {RACE.time}</span>
            <span>天候:{RACE.weather} 馬場:{RACE.condition}</span>
          </div>

          {/* メインボタン */}
          <button
            onClick={() => onNavigate('race')}
            style={{
              display:'flex', alignItems:'center', gap:10,
              width:'100%', padding:'14px 18px',
              background:'linear-gradient(135deg, rgba(245,200,66,0.2), rgba(245,200,66,0.08))',
              border:'1px solid rgba(245,200,66,0.35)',
              borderRadius:14, cursor:'pointer', textAlign:'left',
            }}>
            <IconTrophy size={20} style={{ color:C.gold, flexShrink:0 }}/>
            <div>
              <div style={{ fontSize:13, fontWeight:800, color:'#fff' }}>出走馬を見る</div>
              <div style={{ fontSize:10, color:'rgba(255,255,255,0.5)' }}>全{RACE.fieldSize}頭 AIスコア付き</div>
            </div>
            <IconChevronRight size={18} style={{ marginLeft:'auto', color:'rgba(255,255,255,0.4)' }}/>
          </button>
        </div>
      </div>

      {/* コンテンツ */}
      <div style={{ padding:'0 16px 100px' }}>

        {/* AI TOP PICKS */}
        <div style={{ padding:'20px 0 12px' }}>
          <SectionHeader
            title="AI TOP PICKS"
            sub="人気順"
            right={<span onClick={() => onNavigate('race')} style={{ cursor:'pointer', color:C.gold }}>全頭 →</span>}
          />
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            {topPicks.map(h => (
              <Card key={h.no} onClick={() => onNavigate('detail', h)} style={{ padding:'12px 14px' }}>
                <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                  <GateChip gate={h.gate} no={h.no}/>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:3 }}>
                      <AIMark mark={h.aiMark}/>
                      <span style={{ fontSize:14, fontWeight:800, color:'#fff', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{h.name}</span>
                      {h.mark && <MarkBadge mark={h.mark}/>}
                    </div>
                    <div style={{ fontSize:10, color:C.textSub }}>
                      {h.jockey} · {h.pedigree.sire.name}
                    </div>
                  </div>
                  <div style={{ textAlign:'right', flexShrink:0 }}>
                    <ScoreRing score={h.aiScore} size={44}/>
                  </div>
                </div>
                {/* 適性バー */}
                <div style={{ marginTop:10, display:'flex', gap:8 }}>
                  <FitMeter label="距離" value={h.distanceFit} color={C.gold}/>
                  <FitMeter label="コース" value={h.courseFit} color={C.teal}/>
                  <FitMeter label="馬場" value={h.surfaceFit} color={C.green}/>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* コース傾向 */}
        <div style={{ paddingTop:8 }}>
          <SectionHeader title="コース傾向" sub="中山芝2000m"/>
          <Card style={{ padding:'14px 16px' }}>
            <div style={{ display:'flex', gap:8, marginBottom:12, flexWrap:'wrap' }}>
              {Object.entries(COURSE_TRENDS.bias).map(([k,v]) => (
                <div key={k} style={{
                  padding:'5px 10px', background:'rgba(255,255,255,0.06)',
                  borderRadius:8, fontSize:11, color:C.textSub,
                }}>
                  <span style={{ color:C.textMuted, marginRight:4 }}>{k==='pace'?'ペース':k==='trackBias'?'馬場偏向':'直近傾向'}</span>
                  <span style={{ color:'#fff', fontWeight:700 }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ fontSize:11, color:C.textMuted, marginBottom:8 }}>勝ち馬父系</div>
            {COURSE_TRENDS.winningSires.slice(0,3).map((s,i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6 }}>
                <span style={{ fontSize:10, color:C.textMuted, width:18 }}>{i+1}</span>
                <span style={{ fontSize:11, color:C.textSub, flex:1 }}>{s.name}</span>
                <span style={{ fontSize:11, fontWeight:700, color:C.gold }}>{s.rate}%</span>
                <ProgressBar value={s.rate} max={30} color={C.gold} height={3} style={{ width:60 }}/>
              </div>
            ))}
          </Card>
        </div>

      </div>
    </div>
  );
};

/* ════════════════════════════════
   HorseListScreen — 全頭一覧
   ════════════════════════════════ */
const HorseListScreen = ({ onNavigate }) => {
  const [sortKey, setSortKey] = React.useState('pop');
  const [filter, setFilter] = React.useState('');

  const sorted = [...HORSES]
    .filter(h => filter === '' || h.name.includes(filter) || h.pedigree.sire.name.includes(filter))
    .sort((a,b) => {
      if (sortKey === 'pop') return a.pop - b.pop;
      if (sortKey === 'score') return b.aiScore - a.aiScore;
      if (sortKey === 'no') return a.no - b.no;
      return 0;
    });

  const sortOpts = [
    { k:'pop', label:'人気' },
    { k:'score', label:'AIスコア' },
    { k:'no', label:'馬番' },
  ];

  return (
    <div style={{ height:'100%', display:'flex', flexDirection:'column', background:C.bg }}>
      {/* ヘッダー */}
      <div style={{
        padding:'16px 16px 12px',
        background:'rgba(18,24,40,0.95)',
        backdropFilter:'blur(10px)',
        borderBottom:`1px solid ${C.border}`,
        flexShrink:0,
      }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:10 }}>
          <div>
            <div style={{ fontSize:16, fontWeight:900, color:'#fff' }}>{RACE.name} <GradeBadge grade={RACE.grade}/></div>
            <div style={{ fontSize:10, color:C.textSub }}>{RACE.course} {RACE.surface}{RACE.distance}m · {RACE.fieldSize}頭</div>
          </div>
        </div>
        {/* ソートタブ */}
        <div style={{ display:'flex', gap:6 }}>
          {sortOpts.map(o => (
            <button key={o.k} onClick={() => setSortKey(o.k)} style={{
              padding:'5px 12px', borderRadius:8, border:'none',
              fontSize:11, fontWeight:700, cursor:'pointer',
              background: sortKey === o.k ? C.gold : 'rgba(255,255,255,0.08)',
              color: sortKey === o.k ? '#000' : C.textSub,
              transition:'all 0.2s',
            }}>{o.label}</button>
          ))}
        </div>
      </div>

      {/* リスト */}
      <div style={{ flex:1, overflowY:'auto', padding:'8px 12px 24px' }}>
        {sorted.map((h, i) => (
          <div
            key={h.no}
            onClick={() => onNavigate('detail', h)}
            style={{
              display:'flex', alignItems:'center', gap:10,
              padding:'10px 10px',
              marginBottom:6,
              background: C.card,
              borderRadius:12,
              border:`1px solid ${C.border}`,
              cursor:'pointer',
              transition:'background 0.15s',
            }}
          >
            <GateChip gate={h.gate} no={h.no}/>

            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ display:'flex', alignItems:'center', gap:5, marginBottom:2 }}>
                <AIMark mark={h.aiMark}/>
                <span style={{ fontSize:13, fontWeight:800, color:'#fff', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{h.name}</span>
                {h.mark && <MarkBadge mark={h.mark}/>}
              </div>
              <div style={{ display:'flex', gap:8, fontSize:10, color:C.textSub }}>
                <span>{h.jockey}</span>
                <span style={{ color:C.textMuted }}>·</span>
                <span>{h.pedigree.sire.name}</span>
              </div>
              {/* 前走 */}
              {h.prevRaces[0] && (
                <div style={{ display:'flex', alignItems:'center', gap:4, marginTop:3 }}>
                  <PosChip pos={h.prevRaces[0].pos}/>
                  <span style={{ fontSize:9, color:C.textMuted }}>{h.prevRaces[0].name}</span>
                  <GradeBadge grade={h.prevRaces[0].grade}/>
                </div>
              )}
            </div>

            <div style={{ textAlign:'right', flexShrink:0 }}>
              <ScoreRing score={h.aiScore} size={40}/>
              <div style={{ fontSize:10, color:C.textMuted, marginTop:2 }}>
                {h.odds}倍 <span style={{ color:C.textSub }}>{h.pop}人気</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

window.HomeScreen = HomeScreen;
window.HorseListScreen = HorseListScreen;
