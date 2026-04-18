// app.jsx — main App: navigation, tabs, Tweaks panel
// Depends on screens, horse-detail, race-screen

const { useState: useStateApp, useEffect: useEffectApp } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "gold",
  "density": "standard",
  "treeDepth": 3,
  "showAI": true
}/*EDITMODE-END*/;

function App() {
  // persisted tweaks
  const [tweaks, setTweaks] = useStateApp(() => {
    try {
      const s = localStorage.getItem('kettokun-tweaks');
      if (s) return { ...TWEAK_DEFAULTS, ...JSON.parse(s) };
    } catch {}
    return TWEAK_DEFAULTS;
  });
  const [tweaksOpen, setTweaksOpen] = useStateApp(false);

  // navigation
  const [route, setRoute] = useStateApp(() => {
    try {
      const s = localStorage.getItem('kettokun-route');
      if (s) return JSON.parse(s);
    } catch {}
    return { screen: 'dashboard' };
  });

  useEffectApp(() => { localStorage.setItem('kettokun-route', JSON.stringify(route)); }, [route]);
  useEffectApp(() => { localStorage.setItem('kettokun-tweaks', JSON.stringify(tweaks)); }, [tweaks]);

  // edit mode
  useEffectApp(() => {
    const handler = (e) => {
      if (!e.data) return;
      if (e.data.type === '__activate_edit_mode') setTweaksOpen(true);
      if (e.data.type === '__deactivate_edit_mode') setTweaksOpen(false);
    };
    window.addEventListener('message', handler);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', handler);
  }, []);

  const setTweak = (k, v) => {
    setTweaks(t => {
      const next = { ...t, [k]: v };
      window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [k]: v } }, '*');
      return next;
    });
  };

  // apply accent override
  const themeOverride = applyAccent(tweaks.accent);

  // render current screen
  const bottomTab = route.screen === 'dashboard' ? 'home'
    : route.screen === 'race' ? 'race'
    : route.screen === 'horse' ? 'race'
    : 'home';

  let content;
  if (route.screen === 'dashboard') {
    content = <Dashboard
      onOpenRace={() => setRoute({ screen: 'race' })}
      onOpenHorse={(no) => setRoute({ screen: 'horse', no })}
    />;
  } else if (route.screen === 'race') {
    content = <RaceScreen
      onBack={() => setRoute({ screen: 'dashboard' })}
      onOpenHorse={(no) => setRoute({ screen: 'horse', no })}
    />;
  } else if (route.screen === 'horse') {
    content = <HorseDetail
      horseNo={route.no}
      treeDepth={tweaks.treeDepth}
      onBack={() => setRoute({ screen: 'race' })}
    />;
  } else if (route.screen === 'bet') {
    content = <BetScreen
      onBack={() => setRoute({ screen: 'dashboard' })}
      onOpenHorse={(no) => setRoute({ screen: 'horse', no })}
    />;
  }

  return (
    <div data-screen-label={`${route.screen}${route.no ? ' #' + route.no : ''}`}
      style={{
        background: THEME.bg, color: THEME.ink, height: '100%',
        display: 'flex', flexDirection: 'column', position: 'relative',
        overflow: 'hidden',
        ...themeOverride,
      }}>
      <div style={{ flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}>
        {/* topbar */}
        <TopBar/>
        {content}
      </div>
      <TabBar active={bottomTab} onNav={(k) => {
        if (k === 'home') setRoute({ screen: 'dashboard' });
        else if (k === 'race') setRoute({ screen: 'race' });
        else if (k === 'bet') setRoute({ screen: 'bet' });
      }}/>

      {tweaksOpen && <TweaksPanel tweaks={tweaks} setTweak={setTweak} onClose={() => setTweaksOpen(false)}/>}
    </div>
  );
}

// apply accent tint by overriding CSS variable (we use inline style THEME const, so pass via context-free override)
function applyAccent(a) {
  // default gold is baseline; tweak only changes --accent via CSS var
  const map = {
    gold:   '#FFB020',
    crimson:'#FF2D55',
    emerald:'#22C55E',
    violet: '#7C3AED',
  };
  const val = map[a] || map.gold;
  // update THEME.primary dynamically (since we use window.THEME)
  window.THEME.primary = val;
  return { ['--accent']: val };
}

function TopBar() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', padding: '8px 16px 6px',
      gap: 8,
    }}>
      {/* logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{
          width: 30, height: 30, borderRadius: 8,
          background: 'linear-gradient(135deg,#FFB020 0%,#FF2D55 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 900, color: '#0B0F1A', fontSize: 16,
        }}>血</div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 900, color: THEME.ink, letterSpacing: -0.3, lineHeight: 1 }}>
            血統くん<span style={{ color: THEME.primary }}>NEO</span>
          </div>
          <div style={{ fontSize: 8, color: THEME.inkSoft, letterSpacing: 1, marginTop: 2 }}>
            KETTO-KUN NEO · BLOODLINE INTELLIGENCE
          </div>
        </div>
      </div>
      <span style={{ flex: 1 }}/>
      <IconBtn><Icon.Search size={18} color={THEME.ink}/></IconBtn>
      <IconBtn>
        <Icon.Bell size={18} color={THEME.ink}/>
        <span style={{
          position: 'absolute', top: 6, right: 6, width: 6, height: 6, borderRadius: 3,
          background: THEME.hot,
        }}/>
      </IconBtn>
    </div>
  );
}

function IconBtn({ children }) {
  return (
    <button style={{
      width: 36, height: 36, borderRadius: 10,
      background: 'rgba(255,255,255,0.06)',
      border: 'none', color: THEME.ink, position: 'relative',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>{children}</button>
  );
}

function TabBar({ active, onNav }) {
  const items = [
    { k: 'home', label: 'ホーム', icon: Icon.Home },
    { k: 'race', label: 'レース', icon: Icon.Race },
    { k: 'bet', label: '買い目', icon: Icon.Sparkles },
    { k: 'pedigree', label: '血統', icon: Icon.Pedigree },
    { k: 'search', label: '検索', icon: Icon.Search },
    { k: 'user', label: 'マイ', icon: Icon.User },
  ];
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 20,
      background: 'rgba(11,15,26,0.85)',
      backdropFilter: 'blur(18px) saturate(180%)',
      WebkitBackdropFilter: 'blur(18px) saturate(180%)',
      borderTop: `1px solid ${THEME.border}`,
      display: 'flex', padding: '8px 0 22px',
    }}>
      {items.map(it => {
        const on = active === it.k;
        return (
          <button key={it.k} onClick={() => onNav(it.k)} style={{
            flex: 1, background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
            color: on ? THEME.primary : THEME.inkSoft,
          }}>
            <it.icon size={22} color={on ? THEME.primary : THEME.inkSoft} filled={on}/>
            <span style={{ fontSize: 10, fontWeight: on ? 700 : 500 }}>{it.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function TweaksPanel({ tweaks, setTweak, onClose }) {
  return (
    <div style={{
      position: 'absolute', right: 12, bottom: 90, width: 240, zIndex: 50,
      background: 'rgba(26,34,54,0.96)',
      backdropFilter: 'blur(12px)',
      border: `1px solid ${THEME.border}`,
      borderRadius: 14, padding: 12,
      boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
        <Icon.Sparkles size={12} color={THEME.primary}/>
        <span style={{ marginLeft: 6, fontSize: 11, fontWeight: 800, letterSpacing: 1, color: THEME.primary }}>TWEAKS</span>
        <span style={{ flex: 1 }}/>
        <button onClick={onClose} style={{ background: 'none', border: 'none', color: THEME.inkSoft, fontSize: 14, cursor: 'pointer' }}>×</button>
      </div>

      <Section label="アクセントカラー">
        {[
          { k: 'gold', c: '#FFB020' },
          { k: 'crimson', c: '#FF2D55' },
          { k: 'emerald', c: '#22C55E' },
          { k: 'violet', c: '#7C3AED' },
        ].map(o => (
          <button key={o.k} onClick={() => setTweak('accent', o.k)} style={{
            width: 28, height: 28, borderRadius: 8, background: o.c,
            border: tweaks.accent === o.k ? '2px solid #fff' : '2px solid transparent',
            cursor: 'pointer', marginRight: 6,
          }}/>
        ))}
      </Section>

      <Section label="情報密度">
        {['compact', 'standard', 'rich'].map(d => (
          <MiniToggle key={d} on={tweaks.density === d} onClick={() => setTweak('density', d)}>
            {d === 'compact' ? '密' : d === 'standard' ? '標準' : '詳細'}
          </MiniToggle>
        ))}
      </Section>

      <Section label="血統表の代数">
        {[3, 4, 5].map(d => (
          <MiniToggle key={d} on={tweaks.treeDepth === d} onClick={() => setTweak('treeDepth', d)}>
            {d}代
          </MiniToggle>
        ))}
      </Section>

      <Section label="AIスコア">
        <MiniToggle on={tweaks.showAI} onClick={() => setTweak('showAI', !tweaks.showAI)}>
          {tweaks.showAI ? '表示' : '非表示'}
        </MiniToggle>
      </Section>
    </div>
  );
}

function Section({ label, children }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ fontSize: 9, color: THEME.inkSoft, letterSpacing: 0.8, marginBottom: 5 }}>{label}</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>{children}</div>
    </div>
  );
}

function MiniToggle({ on, onClick, children }) {
  return (
    <button onClick={onClick} style={{
      padding: '5px 10px', borderRadius: 7,
      fontSize: 11, fontWeight: 700,
      background: on ? THEME.primary : 'rgba(255,255,255,0.06)',
      color: on ? THEME.primaryInk : THEME.inkSoft,
      border: 'none', cursor: 'pointer',
    }}>{children}</button>
  );
}

window.App = App;
