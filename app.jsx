// components/app.jsx

const App = () => {
  // screen: 'home' | 'race' | 'list' | 'detail' | 'bet'
  const [screen, setScreen] = React.useState('home');
  const [selectedHorse, setSelectedHorse] = React.useState(null);
  const [activeTab, setActiveTab] = React.useState('home');

  const navigate = (target, data = null) => {
    if (target === 'detail' && data) {
      setSelectedHorse(data);
      setScreen('detail');
    } else {
      setScreen(target);
      if (['home','list','bet'].includes(target)) setActiveTab(target);
      if (target === 'race') setActiveTab('race');
    }
  };

  const navTabs = [
    { k:'home', label:'ホーム', Icon:IconHome },
    { k:'race', label:'レース', Icon:IconFlag },
    { k:'list', label:'出走馬', Icon:IconHorse },
    { k:'bet',  label:'馬券',  Icon:IconTicket },
  ];

  return (
    <div style={{ height:'100%', display:'flex', flexDirection:'column', background:C.bg, position:'relative' }}>
      {/* コンテンツエリア */}
      <div style={{ flex:1, overflow:'hidden' }}>
        {screen === 'home' && <HomeScreen onNavigate={navigate}/>}
        {screen === 'race' && <RaceScreen onNavigate={navigate}/>}
        {screen === 'list' && <HorseListScreen onNavigate={navigate}/>}
        {screen === 'detail' && selectedHorse && (
          <HorseDetailScreen horse={selectedHorse} onBack={() => setScreen('list')}/>
        )}
        {screen === 'bet' && <BetScreen/>}
      </div>

      {/* ボトムナビゲーション */}
      <div style={{
        flexShrink: 0,
        display: 'flex',
        background: 'rgba(12,16,28,0.97)',
        borderTop: `1px solid ${C.border}`,
        backdropFilter: 'blur(20px)',
        paddingBottom: 4,
      }}>
        {navTabs.map(({ k, label, Icon: Ic }) => {
          const isActive = activeTab === k;
          return (
            <button
              key={k}
              onClick={() => navigate(k)}
              style={{
                flex: 1, display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                padding: '8px 4px 4px',
                background: 'transparent', border: 'none',
                cursor: 'pointer', gap: 3,
                transition: 'all 0.2s',
              }}
            >
              {/* アクティブインジケーター */}
              {isActive && (
                <div style={{
                  position: 'absolute',
                  width: 40, height: 2,
                  background: C.gold,
                  borderRadius: 1,
                  top: 0,
                  transform: 'translateY(-1px)',
                  boxShadow: `0 0 8px ${C.gold}`,
                }}/>
              )}
              <Ic size={22} style={{
                color: isActive ? C.gold : 'rgba(255,255,255,0.4)',
                transition: 'color 0.2s',
              }}/>
              <span style={{
                fontSize: 9, fontWeight: 700,
                color: isActive ? C.gold : 'rgba(255,255,255,0.35)',
                letterSpacing: '0.02em',
                transition: 'color 0.2s',
              }}>{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

window.App = App;
