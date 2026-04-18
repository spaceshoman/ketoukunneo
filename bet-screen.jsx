// components/bet-screen.jsx

const BetScreen = () => {
  const [betType, setBetType] = React.useState('tansho'); // 単勝/複勝/馬連/馬単/3連複/3連単
  const [selected, setSelected] = React.useState([]); // 選択馬番
  const [amount, setAmount] = React.useState(100);
  const [result, setResult] = React.useState(null);

  const betTypes = [
    { k:'tansho',   label:'単勝',  desc:'1着を当てる', need:1, max:1 },
    { k:'fukusho',  label:'複勝',  desc:'3着内を当てる', need:1, max:1 },
    { k:'umaren',   label:'馬連',  desc:'1,2着（順不問）', need:2, max:2 },
    { k:'umatan',   label:'馬単',  desc:'1,2着（順番通り）', need:2, max:2 },
    { k:'sanrenpuku', label:'3連複', desc:'1-2-3着（順不問）', need:3, max:3 },
    { k:'sanrentan',  label:'3連単', desc:'1-2-3着（順番通り）', need:3, max:3 },
  ];
  const bt = betTypes.find(b => b.k === betType);

  const amountOpts = [100, 300, 500, 1000, 2000, 5000];

  const toggleHorse = (no) => {
    if (selected.includes(no)) {
      setSelected(selected.filter(n => n !== no));
    } else if (selected.length < bt.max) {
      setSelected([...selected, no]);
    } else {
      // 入れ替え（最古を削除）
      setSelected([...selected.slice(1), no]);
    }
    setResult(null);
  };

  const calcOdds = () => {
    if (selected.length < bt.need) return null;
    const horses = selected.map(no => HORSES.find(h => h.no === no)).filter(Boolean);
    const baseOdds = horses.reduce((acc, h) => acc * h.odds, 1);
    const multiplier = {
      tansho:1, fukusho:0.4,
      umaren:0.75, umatan:1.2,
      sanrenpuku:0.5, sanrentan:1.5
    }[betType] || 1;
    return Math.max(1.0, (baseOdds * multiplier * 0.8)).toFixed(1);
  };

  const simulate = () => {
    if (selected.length < bt.need) return;
    const odds = parseFloat(calcOdds());
    const payout = Math.round(amount * odds);
    const profit = payout - amount;
    setResult({ odds, payout, profit, win: Math.random() > 0.75 });
  };

  const horses = [...HORSES].sort((a,b) => a.no - b.no);
  const estimatedOdds = calcOdds();

  return (
    <div style={{ height:'100%', display:'flex', flexDirection:'column', background:C.bg }}>
      {/* ヘッダー */}
      <div style={{
        padding:'12px 16px', flexShrink:0,
        background:'rgba(18,24,40,0.98)',
        borderBottom:`1px solid ${C.border}`,
      }}>
        <div style={{ fontSize:15, fontWeight:900, color:'#fff', marginBottom:2 }}>馬券シミュレーター</div>
        <div style={{ fontSize:10, color:C.textSub }}>{RACE.name} · {RACE.date}</div>

        {/* 馬券種類 */}
        <div style={{ display:'flex', gap:5, marginTop:10, overflowX:'auto', paddingBottom:2 }}>
          {betTypes.map(b => (
            <button key={b.k} onClick={() => { setBetType(b.k); setSelected([]); setResult(null); }} style={{
              flexShrink:0, padding:'5px 10px', borderRadius:8,
              border:'none', cursor:'pointer', fontSize:11, fontWeight:800,
              background: betType === b.k ? C.gold : 'rgba(255,255,255,0.08)',
              color: betType === b.k ? '#000' : C.textSub,
              transition:'all 0.2s',
            }}>{b.label}</button>
          ))}
        </div>
        <div style={{ fontSize:10, color:C.textMuted, marginTop:6 }}>{bt.desc} · {bt.need}頭選択</div>
      </div>

      <div style={{ flex:1, overflowY:'auto', padding:'12px 14px 24px' }}>

        {/* 購入金額 */}
        <div style={{ marginBottom:14 }}>
          <SectionHeader title="購入金額"/>
          <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
            {amountOpts.map(a => (
              <button key={a} onClick={() => setAmount(a)} style={{
                padding:'6px 14px', borderRadius:8,
                border:`1px solid ${amount===a ? C.gold : C.border}`,
                background: amount===a ? 'rgba(245,200,66,0.15)' : 'rgba(255,255,255,0.04)',
                color: amount===a ? C.gold : C.textSub,
                fontSize:12, fontWeight:700, cursor:'pointer',
                transition:'all 0.2s',
              }}>{a.toLocaleString()}円</button>
            ))}
          </div>
        </div>

        {/* 馬選択 */}
        <div style={{ marginBottom:14 }}>
          <SectionHeader title="出走馬選択" sub={`${selected.length}/${bt.need}頭`}/>
          <div style={{ display:'flex', flexDirection:'column', gap:5 }}>
            {horses.map(h => {
              const isSelected = selected.includes(h.no);
              const selIdx = selected.indexOf(h.no);
              return (
                <div
                  key={h.no}
                  onClick={() => toggleHorse(h.no)}
                  style={{
                    display:'flex', alignItems:'center', gap:10,
                    padding:'9px 12px',
                    background: isSelected
                      ? 'linear-gradient(90deg, rgba(245,200,66,0.15), rgba(245,200,66,0.05))'
                      : C.card,
                    borderRadius:10,
                    border:`1px solid ${isSelected ? 'rgba(245,200,66,0.4)' : C.border}`,
                    cursor:'pointer', transition:'all 0.15s',
                  }}
                >
                  {/* 選択インジケーター */}
                  <div style={{
                    width:22, height:22, borderRadius:6, flexShrink:0,
                    background: isSelected ? C.gold : 'rgba(255,255,255,0.06)',
                    border:`1px solid ${isSelected ? C.gold : C.border}`,
                    display:'flex', alignItems:'center', justifyContent:'center',
                  }}>
                    {isSelected && (
                      bt.need === 1 ? <IconCheck size={12} style={{ color:'#000' }}/>
                      : <span style={{ fontSize:11, fontWeight:900, color:'#000' }}>{selIdx+1}</span>
                    )}
                  </div>

                  <GateChip gate={h.gate} no={h.no}/>
                  <AIMark mark={h.aiMark}/>

                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:13, fontWeight:800, color: isSelected ? C.gold : '#fff', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{h.name}</div>
                    <div style={{ fontSize:10, color:C.textSub }}>{h.jockey}</div>
                  </div>

                  <div style={{ textAlign:'right', flexShrink:0 }}>
                    <div style={{ fontSize:14, fontWeight:900, color: h.pop<=3 ? C.gold : C.textSub }}>{h.odds}<span style={{ fontSize:9 }}>倍</span></div>
                    <div style={{ fontSize:9, color:C.textMuted }}>{h.pop}人気</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 計算パネル */}
        {selected.length >= bt.need && (
          <Card style={{ padding:'16px', marginBottom:12, border:'1px solid rgba(245,200,66,0.3)' }}>
            <div style={{ display:'flex', gap:10, marginBottom:14 }}>
              <div style={{ flex:1, textAlign:'center' }}>
                <div style={{ fontSize:9, color:C.textMuted, marginBottom:2 }}>購入金額</div>
                <div style={{ fontSize:16, fontWeight:900, color:'#fff' }}>{amount.toLocaleString()}円</div>
              </div>
              <div style={{ width:1, background:C.border }}/>
              <div style={{ flex:1, textAlign:'center' }}>
                <div style={{ fontSize:9, color:C.textMuted, marginBottom:2 }}>推定オッズ</div>
                <div style={{ fontSize:16, fontWeight:900, color:C.gold }}>{estimatedOdds}倍</div>
              </div>
              <div style={{ width:1, background:C.border }}/>
              <div style={{ flex:1, textAlign:'center' }}>
                <div style={{ fontSize:9, color:C.textMuted, marginBottom:2 }}>推定払戻</div>
                <div style={{ fontSize:16, fontWeight:900, color:C.green }}>
                  {Math.round(amount * parseFloat(estimatedOdds)).toLocaleString()}円
                </div>
              </div>
            </div>

            {/* 選択馬表示 */}
            <div style={{ display:'flex', gap:6, marginBottom:14, flexWrap:'wrap' }}>
              {selected.map((no, i) => {
                const h = HORSES.find(x => x.no === no);
                return (
                  <div key={no} style={{
                    display:'flex', alignItems:'center', gap:6,
                    padding:'4px 8px', background:'rgba(245,200,66,0.12)',
                    border:'1px solid rgba(245,200,66,0.3)',
                    borderRadius:8,
                  }}>
                    {bt.need > 1 && <span style={{ fontSize:10, color:C.gold, fontWeight:800 }}>{i+1}着</span>}
                    <GateChip gate={h.gate} no={h.no}/>
                    <span style={{ fontSize:11, fontWeight:700, color:'#fff' }}>{h.name}</span>
                  </div>
                );
              })}
            </div>

            <button
              onClick={simulate}
              style={{
                width:'100%', padding:'12px',
                background:'linear-gradient(135deg, #C9A030, #F5C842)',
                border:'none', borderRadius:12,
                fontSize:14, fontWeight:900, color:'#000',
                cursor:'pointer',
                boxShadow:'0 4px 20px rgba(245,200,66,0.3)',
              }}
            >シミュレーション実行</button>
          </Card>
        )}

        {/* 結果 */}
        {result && (
          <Card style={{
            padding:'16px',
            border:`1px solid ${result.win ? 'rgba(48,209,88,0.4)' : 'rgba(255,59,59,0.3)'}`,
            background: result.win ? 'rgba(48,209,88,0.06)' : 'rgba(255,59,59,0.06)',
          }}>
            <div style={{ textAlign:'center', marginBottom:12 }}>
              <div style={{ fontSize:28, marginBottom:4 }}>{result.win ? '🏆' : '😔'}</div>
              <div style={{ fontSize:16, fontWeight:900, color: result.win ? C.green : C.red }}>
                {result.win ? '的中！' : 'ハズレ'}
              </div>
            </div>
            {result.win && (
              <div style={{ display:'flex', gap:10 }}>
                <div style={{ flex:1, textAlign:'center', padding:'10px', background:'rgba(48,209,88,0.08)', borderRadius:10 }}>
                  <div style={{ fontSize:9, color:C.textMuted, marginBottom:2 }}>払戻金</div>
                  <div style={{ fontSize:18, fontWeight:900, color:C.green }}>{result.payout.toLocaleString()}円</div>
                </div>
                <div style={{ flex:1, textAlign:'center', padding:'10px', background:'rgba(48,209,88,0.08)', borderRadius:10 }}>
                  <div style={{ fontSize:9, color:C.textMuted, marginBottom:2 }}>利益</div>
                  <div style={{ fontSize:18, fontWeight:900, color:C.gold }}>+{result.profit.toLocaleString()}円</div>
                </div>
              </div>
            )}
            <button
              onClick={() => { setSelected([]); setResult(null); }}
              style={{
                width:'100%', marginTop:12, padding:'10px',
                background:'rgba(255,255,255,0.06)',
                border:`1px solid ${C.border}`,
                borderRadius:10, color:C.textSub,
                fontSize:12, fontWeight:700, cursor:'pointer',
              }}
            >リセット</button>
          </Card>
        )}
      </div>
    </div>
  );
};

window.BetScreen = BetScreen;
