// components/ios-frame.jsx

const IOSDevice = ({ children, dark = true, width = 390, height = 844 }) => {
  const frameColor = dark ? '#1C1C1E' : '#F2F2F7';
  const borderColor = dark ? '#3A3A3C' : '#C7C7CC';
  const screenBg = dark ? '#0B0F1A' : '#F2F2F7';
  const btnColor = dark ? '#3A3A3C' : '#C7C7CC';

  return (
    <div style={{
      position: 'relative',
      width: width + 20,
      height: height + 20,
      borderRadius: 54,
      background: frameColor,
      border: `2px solid ${borderColor}`,
      boxShadow: dark
        ? '0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.1)'
        : '0 40px 80px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.05)',
      flexShrink: 0,
    }}>
      {/* 側面ボタン 左上 */}
      <div style={{ position:'absolute', left:-4, top:120, width:4, height:36, background:btnColor, borderRadius:'4px 0 0 4px' }}/>
      <div style={{ position:'absolute', left:-4, top:168, width:4, height:64, background:btnColor, borderRadius:'4px 0 0 4px' }}/>
      <div style={{ position:'absolute', left:-4, top:244, width:4, height:64, background:btnColor, borderRadius:'4px 0 0 4px' }}/>
      {/* 側面ボタン 右 */}
      <div style={{ position:'absolute', right:-4, top:180, width:4, height:88, background:btnColor, borderRadius:'0 4px 4px 0' }}/>

      {/* スクリーン */}
      <div style={{
        position: 'absolute',
        top: 10, left: 10,
        width: width,
        height: height,
        borderRadius: 44,
        background: screenBg,
        overflow: 'hidden',
      }}>
        {/* ノッチ（Dynamic Island） */}
        <div style={{
          position: 'absolute',
          top: 14,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 120,
          height: 34,
          background: '#000',
          borderRadius: 20,
          zIndex: 999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
        }}>
          {/* カメラ */}
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#1A1A1A', border: '2px solid #2A2A2A', flexShrink:0 }}/>
          {/* センサー */}
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#1a2235', flexShrink:0 }}/>
        </div>

        {/* ステータスバー */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: 56,
          zIndex: 998,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          padding: '0 24px 8px',
          color: dark ? '#fff' : '#000',
        }}>
          <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '-0.02em' }}>
            {new Date().getHours()}:{String(new Date().getMinutes()).padStart(2,'0')}
          </span>
          <div style={{ display:'flex', gap:6, alignItems:'center' }}>
            {/* 電波 */}
            <svg width={17} height={12} viewBox="0 0 17 12" fill={dark?'#fff':'#000'}>
              <rect x="0" y="6" width="3" height="6" rx="1"/>
              <rect x="4.5" y="4" width="3" height="8" rx="1"/>
              <rect x="9" y="1.5" width="3" height="10.5" rx="1"/>
              <rect x="13.5" y="0" width="3" height="12" rx="1"/>
            </svg>
            {/* WiFi */}
            <svg width={16} height={12} viewBox="0 0 16 12" fill="none" stroke={dark?'#fff':'#000'} strokeWidth={1.5}>
              <path d="M1 4.5C3.5 2 6.5 1 8 1s4.5 1 7 3.5" strokeLinecap="round"/>
              <path d="M3.5 7c1.2-1.2 2.8-2 4.5-2s3.3.8 4.5 2" strokeLinecap="round"/>
              <circle cx="8" cy="11" r="1.2" fill={dark?'#fff':'#000'} stroke="none"/>
            </svg>
            {/* バッテリー */}
            <div style={{ display:'flex', alignItems:'center', gap:1 }}>
              <div style={{ width:22, height:11, border:`1.5px solid ${dark?'rgba(255,255,255,0.6)':'rgba(0,0,0,0.6)'}`, borderRadius:3, padding:1.5 }}>
                <div style={{ height:'100%', width:'75%', background:dark?'#fff':'#000', borderRadius:1.5 }}/>
              </div>
              <div style={{ width:2, height:5, background:dark?'rgba(255,255,255,0.4)':'rgba(0,0,0,0.4)', borderRadius:'0 1px 1px 0' }}/>
            </div>
          </div>
        </div>

        {/* コンテンツエリア */}
        <div style={{
          position: 'absolute',
          top: 56, left: 0, right: 0,
          bottom: 0,
          overflow: 'hidden',
        }}>
          {children}
        </div>

        {/* ホームインジケーター */}
        <div style={{
          position: 'absolute',
          bottom: 8,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 120,
          height: 5,
          background: dark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)',
          borderRadius: 99,
          zIndex: 999,
        }}/>
      </div>
    </div>
  );
};

window.IOSDevice = IOSDevice;
