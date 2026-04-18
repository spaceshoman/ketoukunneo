// components/horse-detail.jsx

const HorseDetailScreen = ({ horse: h, onBack }) => {
  const [tab, setTab] = React.useState('profile');

  const tabs = [
    { k:'profile', label:'プロフィール' },
    { k:'pedigree', label:'血統' },
    { k:'history', label:'戦績' },
  ];

  return (
    <div style={{ height:'100%', display:'flex', flexDirection:'column', background:C.bg }}>
      {/* ヘッダー */}
      <div style={{
        flexShrink:0,
        background:'linear-gradient(180deg, #0D1B35 0%, rgba(18,24,40,0.98) 100%)',
        borderBottom:`1px solid ${C.border}`,
      }}>
        {/* 戻るボタン + タイトル */}
        <div style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 12px 8px' }}>
          <button onClick={onBack} style={{
            background:'rgba(255,255,255,0.08)', border:`1px solid ${C.border}`,
            borderRadius:10, padding:'6px 10px', color:'#fff', cursor:'pointer',
            display:'flex', alignItems:'center', gap:4, fontSize:12, fontWeight:600,
          }}>
            <IconChevronLeft size={14}/> 戻る
          </button>
          <div style={{ flex:1, overflow:'hidden' }}>
            <div style={{ display:'flex', alignItems:'center', gap:6 }}>
              <AIMark mark={h.aiMark}/>
              <span style={{ fontSize:16, fontWeight:900, color:'#fff', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{h.name}</span>
              {h.mark && <MarkBadge mark={h.mark}/>}
            </div>
            <div style={{ fontSize:10, color:C.textSub }}>{h.en}</div>
          </div>
          <GateChip gate={h.gate} no={h.no}/>
        </div>

        {/* スコアバナー */}
        <div style={{
          margin:'0 12px 10px',
          padding:'12px 14px',
          background:'rgba(255,255,255,0.04)',
          borderRadius:12,
          border:`1px solid ${C.border}`,
          display:'flex', alignItems:'center', gap:14,
        }}>
          <ScoreRing score={h.aiScore} size={56}/>
          <div style={{ flex:1 }}>
            <div style={{ display:'flex', gap:8, marginBottom:8 }}>
              <FitMeter label="距離適性" value={h.distanceFit} color={C.gold}/>
            </div>
            <div style={{ display:'flex', gap:8, marginBottom:8 }}>
              <FitMeter label="コース適性" value={h.courseFit} color={C.teal}/>
            </div>
            <div style={{ display:'flex', gap:8 }}>
              <FitMeter label="馬場適性" value={h.surfaceFit} color={C.green}/>
            </div>
          </div>
          <div style={{ textAlign:'right', flexShrink:0 }}>
            <div style={{ fontSize:20, fontWeight:900, color: h.pop <= 3 ? C.gold : C.textSub, fontFamily:'Inter,sans-serif' }}>{h.odds}<span style={{ fontSize:11, fontWeight:500 }}>倍</span></div>
            <div style={{ fontSize:10, color:C.textMuted }}>{h.pop}番人気</div>
            <div style={{ fontSize:10, color:C.textSub, marginTop:2 }}>{h.record}</div>
          </div>
        </div>

        {/* タブ */}
        <div style={{ display:'flex', margin:'0 12px', borderBottom:`1px solid ${C.border}` }}>
          {tabs.map(t => (
            <button key={t.k} onClick={() => setTab(t.k)} style={{
              flex:1, padding:'8px 0', background:'transparent', border:'none',
              fontSize:11, fontWeight:700, cursor:'pointer',
              color: tab === t.k ? C.gold : C.textSub,
              borderBottom: tab === t.k ? `2px solid ${C.gold}` : '2px solid transparent',
              transition:'all 0.2s',
            }}>{t.label}</button>
          ))}
        </div>
      </div>

      {/* コンテンツ */}
      <div style={{ flex:1, overflowY:'auto', padding:'12px 14px 80px' }}>
        {tab === 'profile' && <ProfileTab h={h}/>}
        {tab === 'pedigree' && <PedigreeTab h={h}/>}
        {tab === 'history' && <HistoryTab h={h}/>}
      </div>
    </div>
  );
};

/* ── プロフィールタブ ── */
const ProfileTab = ({ h }) => (
  <div>
    {/* 基本情報 */}
    <Card style={{ padding:'14px 16px', marginBottom:12 }}>
      <SectionHeader title="基本情報"/>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px 16px' }}>
        {[
          ['性齢', `${h.sex}${h.age}`],
          ['毛色', h.color],
          ['斤量', `${h.weight}kg`],
          ['馬体重', `${h.bodyWeight}kg`],
          ['騎手', h.jockey],
          ['調教師', h.trainer],
          ['厩舎', h.stable],
          ['馬主', h.owner],
          ['総賞金', `${h.earnings.toLocaleString()}万`],
        ].map(([k,v]) => (
          <div key={k}>
            <div style={{ fontSize:9, color:C.textMuted, marginBottom:1 }}>{k}</div>
            <div style={{ fontSize:12, fontWeight:700, color:'#fff' }}>{v}</div>
          </div>
        ))}
      </div>
    </Card>

    {/* タグ */}
    {h.tags && h.tags.length > 0 && (
      <Card style={{ padding:'14px 16px', marginBottom:12 }}>
        <SectionHeader title="特徴タグ"/>
        <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
          {h.tags.map((t,i) => (
            <Badge key={i} color={C.text} style={{ background:'rgba(245,200,66,0.12)', border:'1px solid rgba(245,200,66,0.25)', fontSize:11, padding:'4px 10px' }}>{t}</Badge>
          ))}
        </div>
      </Card>
    )}

    {/* AIコメント */}
    {h.comment && (
      <Card style={{ padding:'14px 16px' }}>
        <SectionHeader title="AIコメント"/>
        <div style={{
          padding:'10px 12px',
          background:'rgba(10,132,255,0.08)',
          border:'1px solid rgba(10,132,255,0.2)',
          borderRadius:10,
          fontSize:12, lineHeight:1.7, color:'#fff',
        }}>
          {h.comment}
        </div>
      </Card>
    )}
  </div>
);

/* ── 血統タブ ── */
const PedigreeTab = ({ h }) => {
  const sire = h.pedigree.sire;
  const dam = h.pedigree.dam;

  // 父系のコース実績を検索
  const sireMatchHorses = HORSES.filter(x =>
    x.no !== h.no && x.pedigree.sire.type === sire.type
  );
  const sireAvgScore = sireMatchHorses.length > 0
    ? Math.round(sireMatchHorses.reduce((s,x) => s + x.aiScore, 0) / sireMatchHorses.length)
    : 0;

  return (
    <div>
      {/* 血統ツリー */}
      <Card style={{ padding:'14px 16px', marginBottom:12 }}>
        <SectionHeader title="血統構成"/>
        <div style={{ display:'flex', gap:8 }}>
          {/* 父 */}
          <div style={{ flex:1 }}>
            <div style={{ fontSize:9, color:C.textMuted, marginBottom:6, letterSpacing:'0.05em' }}>父（SIRE）</div>
            <div style={{
              padding:'12px',
              background:'linear-gradient(135deg, rgba(245,200,66,0.12), rgba(245,200,66,0.04))',
              border:'1px solid rgba(245,200,66,0.3)',
              borderRadius:12,
            }}>
              <div style={{ fontSize:13, fontWeight:800, color:C.gold, marginBottom:4 }}>{sire.name}</div>
              <Badge color={C.textSub} style={{ background:'rgba(255,255,255,0.08)', fontSize:10 }}>{sire.type}</Badge>
            </div>
          </div>
          {/* 母 */}
          <div style={{ flex:1 }}>
            <div style={{ fontSize:9, color:C.textMuted, marginBottom:6, letterSpacing:'0.05em' }}>母（DAM）</div>
            <div style={{
              padding:'12px',
              background:'linear-gradient(135deg, rgba(10,132,255,0.12), rgba(10,132,255,0.04))',
              border:'1px solid rgba(10,132,255,0.3)',
              borderRadius:12,
            }}>
              <div style={{ fontSize:13, fontWeight:800, color:C.teal, marginBottom:4 }}>{dam.name}</div>
              <Badge color={C.textSub} style={{ background:'rgba(255,255,255,0.08)', fontSize:10 }}>{dam.type}</Badge>
            </div>
          </div>
        </div>

        {/* 母父 */}
        <div style={{ marginTop:10 }}>
          <div style={{ fontSize:9, color:C.textMuted, marginBottom:6 }}>母父（BROODMARE SIRE）</div>
          <div style={{
            padding:'10px 12px',
            background:'rgba(255,255,255,0.04)',
            borderRadius:10,
            display:'flex', alignItems:'center', gap:8,
          }}>
            <span style={{ fontSize:12, fontWeight:700, color:'#fff' }}>{dam.sireOfDam}</span>
            <Badge color={C.textSub} style={{ background:'rgba(255,255,255,0.08)', fontSize:10 }}>{dam.type}</Badge>
          </div>
        </div>
      </Card>

      {/* 父系コース相性 */}
      <Card style={{ padding:'14px 16px', marginBottom:12 }}>
        <SectionHeader title="父系コース実績" sub="中山芝2000m"/>
        <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:12 }}>
          <div style={{
            padding:'8px 12px',
            background:'rgba(245,200,66,0.1)',
            borderRadius:10, border:'1px solid rgba(245,200,66,0.2)',
          }}>
            <div style={{ fontSize:9, color:C.textMuted, marginBottom:2 }}>同系統出走頭数</div>
            <div style={{ fontSize:18, fontWeight:900, color:C.gold }}>{sireMatchHorses.length + 1}<span style={{ fontSize:11 }}>頭</span></div>
          </div>
          <div style={{
            padding:'8px 12px',
            background:'rgba(255,255,255,0.04)',
            borderRadius:10,
          }}>
            <div style={{ fontSize:9, color:C.textMuted, marginBottom:2 }}>同系平均スコア</div>
            <div style={{ fontSize:18, fontWeight:900, color:getScoreColor(sireAvgScore) }}>{sireAvgScore}</div>
          </div>
        </div>

        {/* コース傾向の父系ランキング */}
        {COURSE_TRENDS.winningSires.map((cs,i) => {
          const isMatch = cs.name.includes(sire.type.replace('系','').slice(0,4));
          return (
            <div key={i} style={{
              display:'flex', alignItems:'center', gap:8, marginBottom:8,
              padding:'6px 10px', borderRadius:8,
              background: isMatch ? 'rgba(245,200,66,0.08)' : 'transparent',
              border: isMatch ? '1px solid rgba(245,200,66,0.2)' : '1px solid transparent',
            }}>
              <span style={{ fontSize:11, fontWeight:700, color: isMatch ? C.gold : C.textMuted, width:20 }}>{i+1}</span>
              <span style={{ fontSize:11, color: isMatch ? '#fff' : C.textSub, flex:1 }}>{cs.name}</span>
              <span style={{ fontSize:12, fontWeight:800, color: isMatch ? C.gold : C.textSub }}>{cs.rate}%</span>
              {isMatch && <Badge color={C.bg} style={{ background:C.gold, fontSize:9 }}>該当</Badge>}
            </div>
          );
        })}
      </Card>

      {/* 血統タイプ説明 */}
      <Card style={{ padding:'14px 16px' }}>
        <SectionHeader title="血統タイプ傾向"/>
        {LINEAGE_TRENDS.filter(lt => lt.name === sire.type || lt.name === dam.type).slice(0,2).map((lt,i) => (
          <div key={i} style={{ marginBottom:10 }}>
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:5 }}>
              <Badge color={C.bg} style={{ background:lt.trend==='◎'?C.gold:lt.trend==='○'?'#9E9E9E':'rgba(255,255,255,0.2)', fontSize:10 }}>{lt.trend}</Badge>
              <span style={{ fontSize:12, fontWeight:700, color:'#fff' }}>{lt.name}</span>
              <span style={{ fontSize:9, color:C.textMuted }}>{lt.type === 'sire' ? '父系' : '母系'}</span>
            </div>
            <div style={{ display:'flex', gap:16, fontSize:11, color:C.textSub }}>
              <span>勝利数 <strong style={{ color:'#fff' }}>{lt.wins}</strong></span>
              <span>勝率 <strong style={{ color:C.gold }}>{lt.rate}%</strong></span>
              <span>収得賞金 <strong style={{ color:'#fff' }}>{lt.earnings}億</strong></span>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
};

/* ── 戦績タブ ── */
const HistoryTab = ({ h }) => (
  <div>
    {/* サマリー */}
    <Card style={{ padding:'14px 16px', marginBottom:12 }}>
      <SectionHeader title="通算成績"/>
      <div style={{ display:'flex', gap:12, alignItems:'baseline' }}>
        <span style={{ fontSize:22, fontWeight:900, color:'#fff', fontFamily:'Inter,sans-serif' }}>{h.record}</span>
        <span style={{ fontSize:11, color:C.textSub }}>（着）</span>
        <span style={{ fontSize:14, fontWeight:700, color:C.gold }}>{h.earnings.toLocaleString()}万円</span>
      </div>

      {/* フォームドット */}
      <div style={{ display:'flex', gap:6, marginTop:12 }}>
        {h.form.map((pos,i) => (
          <div key={i} style={{ textAlign:'center' }}>
            <div style={{
              width:28, height:28, borderRadius:8,
              background: pos===1 ? C.gold : pos===2 ? '#9E9E9E' : pos===3 ? '#CD853F' : pos<=5 ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.07)',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:13, fontWeight:800,
              color: pos<=3 ? '#000' : C.textSub,
            }}>{pos}</div>
            <div style={{ fontSize:8, color:C.textMuted, marginTop:2 }}>{i===0?'前走':i===1?'2走前':'3走前'}</div>
          </div>
        ))}
      </div>
    </Card>

    {/* 過去レース */}
    {h.prevRaces.map((r, i) => (
      <Card key={i} style={{ padding:'14px 16px', marginBottom:8 }}>
        <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:8 }}>
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:3 }}>
              <PosChip pos={r.pos}/>
              <span style={{ fontSize:13, fontWeight:800, color:'#fff' }}>{r.name}</span>
              <GradeBadge grade={r.grade}/>
            </div>
            <div style={{ fontSize:10, color:C.textSub }}>
              {r.date} · {r.course} {r.dist} · {r.cond} · {r.field}頭
            </div>
          </div>
          <div style={{ textAlign:'right' }}>
            <div style={{ fontSize:15, fontWeight:800, color:'#fff', fontFamily:'Inter,sans-serif' }}>{r.time}</div>
            <div style={{ fontSize:10, color:C.textSub }}>{r.jockey}</div>
          </div>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <span style={{ fontSize:10, color:C.textMuted }}>着順</span>
          <div style={{ flex:1 }}>
            <ProgressBar
              value={Math.max(0, 100 - (r.pos - 1) * (100 / r.field))}
              color={r.pos===1 ? C.gold : r.pos<=3 ? C.orange : C.teal}
              height={4}
            />
          </div>
          <span style={{ fontSize:10, fontWeight:700, color:r.pos<=3 ? C.gold : C.textSub }}>
            {r.pos}/{r.field}
          </span>
        </div>
      </Card>
    ))}
  </div>
);

window.HorseDetailScreen = HorseDetailScreen;
