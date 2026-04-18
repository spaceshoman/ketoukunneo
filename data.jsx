// data.jsx — 2026 皐月賞 実データ（JRA公式出走表より）
// 2026/04/19 中山11R 第86回皐月賞 GI 芝2000m

const RACE = {
  name: '皐月賞', nameEn: 'SATSUKI SHO',
  grade: 'GI',
  number: 'R11',
  round: '第86回',
  course: '中山',
  distance: 2000,
  surface: '芝',
  direction: '右',
  weather: '晴',
  condition: '良',
  date: '2026.04.19',
  day: '日',
  time: '15:40',
  purse: '2億円',
  purse2: '8000万',
  cond: '3歳オープン (国際) 牡・牝 (指定) 馬齢',
  fieldSize: 18,
  courseRecord: { time: '1:56.6', horse: 'クリスマスパレード', date: '2024.9.7' },
  raceRecord: { time: '1:57.0', horse: 'ミュージアムマイル', date: '2025.4.20' },
};

// helpers for AI score - roughly based on odds rank + form
function aiFromOdds(odds, form) {
  const fr = form[0]; // 前走着順
  const rank = Math.max(40, 100 - Math.log2(odds) * 10 - (fr ? fr * 2 : 0));
  return Math.min(99, Math.round(rank));
}

const HORSES = [
  { no: 1, gate: 1, name: 'カヴァレリッツォ', en: 'Cavalerizzo',
    sex: '牡', age: 3, color: '鹿', weight: 57.0, jockey: 'D.レーン', trainer: '吉岡辰弥',
    stable: '栗東', owner: '(有)シルクレーシング',
    odds: 7.0, pop: 4,
    record: '2-1-0-0', earnings: 9362.4, bodyWeight: 482,
    pedigree: {
      sire: { name: 'サートゥルナーリア', type: 'ロードカナロア系' },
      dam: { name: 'バラーディスト', sireOfDam: 'ハーツクライ', type: 'サンデー系' },
    },
    prevRaces: [
      { date: '25.12.21', course: '阪神', name: '朝日杯FS', grade: 'G1', dist: '1600芝', cond: '重', pos: 1, field: 14, jockey: 'C.デムーロ', time: '1:33.2' },
      { date: '25.11.15', course: '京都', name: 'デイリー2S', grade: 'G2', dist: '1600芝', cond: '良', pos: 2, field: 8, jockey: 'C.デムーロ', time: '1:33.1' },
      { date: '25.08.31', course: '中京', name: '新馬', grade: '', dist: '1600芝', cond: '良', pos: 1, field: 14, jockey: '北村友一', time: '1:34.2' },
    ],
    form: [1, 2, 1],
    tags: ['朝日杯勝ち馬', '距離延長', 'ロードカナロア系'],
    comment: '2歳G1王者。距離延長とコース替わりが鍵。',
  },
  { no: 2, gate: 1, name: 'サウンドムーブ', en: 'Sound Move',
    sex: '牡', age: 3, color: '鹿', weight: 57.0, jockey: '団野大成', trainer: '斉藤崇史',
    stable: '栗東', owner: '増田雄一', mark: 'M',
    odds: 105.4, pop: 16,
    record: '1-1-0-2', earnings: 3096.4, bodyWeight: 454,
    pedigree: {
      sire: { name: 'リアルスティール', type: 'サンデー系' },
      dam: { name: 'サウンドルチア', sireOfDam: 'スクリーンヒーロー', type: 'ロベルト系' },
    },
    prevRaces: [
      { date: '26.03.15', course: '中山', name: 'スプリングS', grade: 'G2', dist: '1800芝', cond: '良', pos: 4, field: 16, jockey: '団野大成', time: '1:46.2' },
      { date: '26.01.12', course: '京都', name: 'シンザン記念', grade: 'G3', dist: '1600芝', cond: '良', pos: 2, field: 16, jockey: '団野大成', time: '1:33.5' },
    ],
    form: [4, 2, 1],
    tags: ['追込', 'サンデー系'],
    comment: '末脚型。展開が向けば。',
  },
  { no: 3, gate: 2, name: 'サノノグレーター', en: 'Sano No Greater',
    sex: '牡', age: 3, color: '鹿', weight: 57.0, jockey: '田辺裕信', trainer: '尾形和幸',
    stable: '美浦', owner: '佐野信幸',
    odds: 58.0, pop: 13,
    record: '2-0-0-3', earnings: 2423.1, bodyWeight: 456,
    pedigree: {
      sire: { name: 'グレーターロンドン', type: 'ノーザンダンサー系' },
      dam: { name: 'メメクザリアーナ', sireOfDam: 'ジャングルポケット', type: 'グレイソヴリン系' },
    },
    prevRaces: [
      { date: '26.03.15', course: '中山', name: 'スプリングS', grade: 'G2', dist: '1800芝', cond: '良', pos: 5, field: 16, jockey: '田辺裕信', time: '1:46.2' },
      { date: '26.02.15', course: '東京', name: '共同通信杯', grade: 'G3', dist: '1800芝', cond: '良', pos: 6, field: 9, jockey: '横山武史', time: '1:46.4' },
    ],
    form: [5, 6, 1],
    tags: ['ノーザンダンサー系'],
    comment: '中山2000実績あり。穴なら。',
  },
  { no: 4, gate: 2, name: 'ロブチェン', en: 'Lobuche',
    sex: '牡', age: 3, color: '黒鹿', weight: 57.0, jockey: '松山弘平', trainer: '杉山晴紀',
    stable: '栗東', owner: 'フォレストレーシング',
    odds: 4.2, pop: 1,
    record: '2-0-1-0', earnings: 8870.9, bodyWeight: 518,
    pedigree: {
      sire: { name: 'ワールドプレミア', type: 'サンデー系' },
      dam: { name: 'ソングライティング', sireOfDam: "Giant's Causeway", type: 'ストームキャット系' },
    },
    prevRaces: [
      { date: '26.02.15', course: '東京', name: '共同通信杯', grade: 'G3', dist: '1800芝', cond: '良', pos: 3, field: 9, jockey: '松山弘平', time: '1:45.5' },
      { date: '25.12.27', course: '中山', name: 'ホープフルS', grade: 'G1', dist: '2000芝', cond: '良', pos: 1, field: 16, jockey: '松山弘平', time: '2:01.0' },
      { date: '25.11.09', course: '京都', name: '新馬', grade: '', dist: '2000芝', cond: '重', pos: 1, field: 8, jockey: '松山弘平', time: '2:04.5' },
    ],
    form: [3, 1, 1],
    tags: ['ホープフル覇者', '中山巧者', '重馬場◎'],
    comment: 'ホープフルS覇者。中山2000m実績。単勝1番人気。',
  },
  { no: 5, gate: 3, name: 'アスクエジンバラ', en: 'Ask Edinburgh',
    sex: '牡', age: 3, color: '青鹿', weight: 57.0, jockey: '岩田康誠', trainer: '福永祐一',
    stable: '栗東', owner: '廣崎利洋', mark: 'M',
    odds: 38.7, pop: 12,
    record: '2-2-1-2', earnings: 7647.3, bodyWeight: 458,
    pedigree: {
      sire: { name: 'リオンディーズ', type: 'キングマンボ系' },
      dam: { name: 'ハニートリップ', sireOfDam: 'マンハッタンカフェ', type: 'サンデー系' },
    },
    prevRaces: [
      { date: '26.03.15', course: '中山', name: 'スプリングS', grade: 'G2', dist: '1800芝', cond: '良', pos: 2, field: 16, jockey: '岩田康誠', time: '1:46.0' },
      { date: '25.12.27', course: '中山', name: 'ホープフルS', grade: 'G1', dist: '2000芝', cond: '良', pos: 3, field: 16, jockey: '岩田康誠', time: '2:01.2' },
    ],
    form: [2, 3, 2],
    tags: ['スプリング2着', '中山巧者'],
    comment: '堅実派。中山コース適性高い。',
  },
  { no: 6, gate: 3, name: 'フォルテアンジェロ', en: 'Forte Angelo',
    sex: '牡', age: 3, color: '鹿', weight: 57.0, jockey: '荻野極', trainer: '上原佑紀',
    stable: '美浦', owner: '(有)シルクレーシング',
    odds: 27.9, pop: 11,
    record: '1-2-0-0', earnings: 4026.8, bodyWeight: 450,
    pedigree: {
      sire: { name: 'フィエールマン', type: 'サンデー系' },
      dam: { name: 'レディアンジェラ', sireOfDam: 'Dark Angel', type: 'ダンチヒ系' },
    },
    prevRaces: [
      { date: '25.12.27', course: '中山', name: 'ホープフルS', grade: 'G1', dist: '2000芝', cond: '良', pos: 2, field: 16, jockey: 'T.マーカンド', time: '2:01.1' },
      { date: '25.11.02', course: '東京', name: '百日草特別', grade: '1勝ク', dist: '2000芝', cond: '良', pos: 2, field: 5, jockey: '戸崎圭太', time: '2:00.4' },
    ],
    form: [2, 2, 1],
    tags: ['ホープフル2着', 'フィエールマン産駒'],
    comment: 'ホープフル2着の実力。休み明けが鍵。',
  },
  { no: 7, gate: 4, name: 'ロードフィレール', en: 'Lord Filere',
    sex: '牡', age: 3, color: '鹿', weight: 57.0, jockey: '武豊', trainer: '吉岡辰弥',
    stable: '栗東', owner: '(株)ロードホースクラブ', mark: 'I',
    odds: 59.6, pop: 15,
    record: '1-2-0-0', earnings: 1707.8, bodyWeight: 524,
    pedigree: {
      sire: { name: 'キズナ', type: 'サンデー系' },
      dam: { name: 'プレミアムギフト', sireOfDam: 'オルフェーヴル', type: 'サンデー系' },
    },
    prevRaces: [
      { date: '26.03.21', course: '阪神', name: '若葉S', grade: 'L', dist: '2000芝', cond: '良', pos: 2, field: 12, jockey: '坂井瑠星', time: '1:58.9' },
      { date: '25.08.09', course: '新潟', name: '未勝利', grade: '', dist: '2000芝', cond: '良', pos: 1, field: 10, jockey: '戸崎圭太', time: '2:01.6' },
    ],
    form: [2, 1, 2],
    tags: ['武豊騎乗', 'キズナ産駒'],
    comment: '武豊手綱。一発狙い。',
  },
  { no: 8, gate: 4, name: 'マテンロウゲイル', en: 'Matenro Gale',
    sex: '牡', age: 3, color: '鹿', weight: 57.0, jockey: '横山和生', trainer: '野中賢二',
    stable: '栗東', owner: '寺田千代乃', mark: 'I',
    odds: 13.7, pop: 6,
    record: '2-3-0-0', earnings: 4822.7, bodyWeight: 502,
    pedigree: {
      sire: { name: 'エピファネイア', type: 'ロベルト系' },
      dam: { name: 'デザートライド', sireOfDam: 'Candy Ride', type: 'ファピアノ系' },
    },
    prevRaces: [
      { date: '26.03.21', course: '阪神', name: '若葉S', grade: 'L', dist: '2000芝', cond: '良', pos: 1, field: 12, jockey: '横山和生', time: '1:58.5' },
      { date: '26.01.18', course: '中山', name: '京成杯', grade: 'G3', dist: '2000芝', cond: '良', pos: 2, field: 15, jockey: '横山和生', time: '1:59.3' },
    ],
    form: [1, 2, 1],
    tags: ['若葉S勝ち', '中山2000実績'],
    comment: '京成杯2着→若葉S勝ち。上昇カーブ。',
  },
  { no: 9, gate: 5, name: 'ライヒスアドラー', en: 'Reichsadler',
    sex: '牡', age: 3, color: '鹿', weight: 57.0, jockey: '佐々木大輔', trainer: '上原佑紀',
    stable: '美浦', owner: '(株)G1レーシング', mark: 'I',
    odds: 23.7, pop: 10,
    record: '1-1-1-0', earnings: 3927.1, bodyWeight: 512,
    pedigree: {
      sire: { name: 'シスキン', type: 'ダンチヒ系' },
      dam: { name: 'クライリング', sireOfDam: 'ハーツクライ', type: 'サンデー系' },
    },
    prevRaces: [
      { date: '26.03.08', course: '中山', name: 'ディープ記念', grade: 'L', dist: '2000芝', cond: '良', pos: 2, field: 10, jockey: '佐々木大輔', time: '2:00.3' },
      { date: '25.11.24', course: '東京', name: '東スポ2歳S', grade: 'G3', dist: '1800芝', cond: '良', pos: 3, field: 12, jockey: '佐々木大輔', time: '1:46.2' },
    ],
    form: [2, 3, 1],
    tags: ['ディープ記念2着'],
    comment: '中山で堅実。一変あり。',
  },
  { no: 10, gate: 5, name: 'ラージアンサンブル', en: 'Large Ensemble',
    sex: '牡', age: 3, color: '鹿', weight: 57.0, jockey: '高杉吏麒', trainer: '武井亮',
    stable: '美浦', owner: '(株)グリーンファーム', mark: 'L',
    odds: 169.0, pop: 18,
    record: '2-0-0-3', earnings: 2758.7, bodyWeight: 472,
    pedigree: {
      sire: { name: 'ベンバトル', type: 'ダンチヒ系' },
      dam: { name: 'ナスノフォルテ', sireOfDam: 'ジャスタウェイ', type: 'サンデー系' },
    },
    prevRaces: [
      { date: '26.02.21', course: '阪神', name: 'すみれS', grade: 'L', dist: '2200芝', cond: '良', pos: 1, field: 7, jockey: '岩田望来', time: '2:12.4' },
    ],
    form: [1, 6, 1],
    tags: ['長距離型'],
    comment: 'すみれS勝ちも距離短縮試練。',
  },
  { no: 11, gate: 6, name: 'パントルナイーフ', en: "Pantre Naïf",
    sex: '牡', age: 3, color: '黒鹿', weight: 57.0, jockey: 'C.ルメール', trainer: '木村哲也',
    stable: '美浦', owner: '(有)キャロットファーム',
    odds: 15.3, pop: 7,
    record: '2-1-0-0', earnings: 4704.1, bodyWeight: 512,
    pedigree: {
      sire: { name: 'キズナ', type: 'サンデー系' },
      dam: { name: 'アールブリュット', sireOfDam: 'Makfi', type: 'ミスプロ系' },
    },
    prevRaces: [
      { date: '25.11.24', course: '東京', name: '東スポ2歳S', grade: 'G3', dist: '1800芝', cond: '良', pos: 1, field: 12, jockey: 'C.ルメール', time: '1:46.0' },
      { date: '25.09.21', course: '中山', name: '未勝利', grade: '', dist: '1800芝', cond: '良', pos: 1, field: 10, jockey: 'C.ルメール', time: '1:49.4' },
    ],
    form: [1, 1, 2],
    tags: ['東スポ2歳S勝ち', 'ルメール騎乗'],
    comment: '東スポ2歳S勝ちから直行。間隔空いた。',
  },
  { no: 12, gate: 6, name: 'グリーンエナジー', en: 'Green Energy',
    sex: '牡', age: 3, color: '栗', weight: 57.0, jockey: '戸崎圭太', trainer: '上原佑紀',
    stable: '美浦', owner: '鈴江崇文', mark: 'I',
    odds: 4.5, pop: 2,
    record: '2-0-1-0', earnings: 4903.9, bodyWeight: 490,
    pedigree: {
      sire: { name: 'スワーヴリチャード', type: 'サンデー系' },
      dam: { name: 'シンバル2', sireOfDam: 'Singspiel', type: 'ノーザンダンサー系' },
    },
    prevRaces: [
      { date: '26.01.18', course: '中山', name: '京成杯', grade: 'G3', dist: '2000芝', cond: '良', pos: 1, field: 15, jockey: '戸崎圭太', time: '1:59.3' },
      { date: '25.11.08', course: '東京', name: '未勝利', grade: '', dist: '2000芝', cond: '良', pos: 1, field: 12, jockey: '戸崎圭太', time: '2:01.2' },
    ],
    form: [1, 1, 3],
    tags: ['京成杯勝ち', '中山2000◎'],
    comment: '京成杯快勝。中山2000mの実績と上り33.8。',
  },
  { no: 13, gate: 7, name: 'アクロフェイズ', en: 'Acro Phase',
    sex: '牡', age: 3, color: '鹿', weight: 57.0, jockey: '西村淳也', trainer: '奥村豊',
    stable: '栗東', owner: '(有)キャロットファーム', mark: 'M',
    odds: 113.2, pop: 17,
    record: '1-1-1-1', earnings: 2824.2, bodyWeight: 476,
    pedigree: {
      sire: { name: 'ロードカナロア', type: 'キングマンボ系' },
      dam: { name: 'クルミネイト', sireOfDam: 'ディープインパクト', type: 'サンデー系' },
    },
    prevRaces: [
      { date: '26.03.15', course: '中山', name: 'スプリングS', grade: 'G2', dist: '1800芝', cond: '良', pos: 3, field: 16, jockey: '西村淳也', time: '1:46.0' },
      { date: '26.01.24', course: '京都', name: '若駒S', grade: 'L', dist: '2000芝', cond: '良', pos: 2, field: 13, jockey: '西村淳也', time: '2:01.4' },
    ],
    form: [3, 2, 1],
    tags: ['スプリング3着'],
    comment: 'スプリング3着。人気の盲点。',
  },
  { no: 14, gate: 7, name: 'ゾロアストロ', en: 'Zoroastro',
    sex: '牡', age: 3, color: '芦', weight: 57.0, jockey: '岩田望来', trainer: '宮田敬介',
    stable: '美浦', owner: '(有)サンデーレーシング', mark: 'M',
    odds: 22.0, pop: 9,
    record: '2-2-1-0', earnings: 7338.9, bodyWeight: 468,
    pedigree: {
      sire: { name: 'モーリス', type: 'ロベルト系' },
      dam: { name: 'アルミレーナ', sireOfDam: 'ディープインパクト', type: 'サンデー系' },
    },
    prevRaces: [
      { date: '26.02.10', course: '京都', name: 'きさらぎ賞', grade: 'G3', dist: '1800芝', cond: '良', pos: 1, field: 9, jockey: 'T.ハマーハン', time: '1:48.0' },
      { date: '25.11.24', course: '東京', name: '東スポ2歳S', grade: 'G3', dist: '1800芝', cond: '良', pos: 2, field: 12, jockey: 'T.マーカンド', time: '1:46.0' },
    ],
    form: [1, 2, 3],
    tags: ['きさらぎ賞勝ち', '芦毛', 'モーリス産駒'],
    comment: 'きさらぎ賞勝ち。芦毛の伏兵。',
  },
  { no: 15, gate: 7, name: 'リアライズシリウス', en: 'Realize Sirius',
    sex: '牡', age: 3, color: '芦', weight: 57.0, jockey: '津村明秀', trainer: '手塚貴久',
    stable: '美浦', owner: '今福洋介', mark: 'M',
    odds: 6.3, pop: 3,
    record: '3-0-0-1', earnings: 8718.6, bodyWeight: 530,
    pedigree: {
      sire: { name: 'ポエティックフレア', type: 'ダンチヒ系' },
      dam: { name: 'レッドミラベル', sireOfDam: 'ステイゴールド', type: 'サンデー系' },
    },
    prevRaces: [
      { date: '26.02.15', course: '東京', name: '共同通信杯', grade: 'G3', dist: '1800芝', cond: '良', pos: 1, field: 9, jockey: '津村明秀', time: '1:45.5' },
      { date: '25.12.21', course: '阪神', name: '朝日杯FS', grade: 'G1', dist: '1600芝', cond: '重', pos: 5, field: 14, jockey: '津村明秀', time: '1:34.0' },
      { date: '25.08.24', course: '新潟', name: '新潟2歳S', grade: 'G3', dist: '1600芝', cond: '良', pos: 1, field: 10, jockey: '津村明秀', time: '1:33.4' },
    ],
    form: [1, 5, 1],
    tags: ['共同通信杯勝ち', '新潟2歳S勝ち', '大型馬'],
    comment: '共同通信杯勝ち馬。530kgの大型。',
  },
  { no: 16, gate: 8, name: 'アルトラムス', en: 'Altramus',
    sex: '牡', age: 3, color: '黒鹿', weight: 57.0, jockey: '横山武史', trainer: '野中賢二',
    stable: '栗東', owner: '(株)社台レースホース', mark: 'M',
    odds: 58.6, pop: 14,
    record: '2-0-1-0', earnings: 5884.8, bodyWeight: 474,
    pedigree: {
      sire: { name: 'イスラボニータ', type: 'サンデー系' },
      dam: { name: 'デジマノハナ', sireOfDam: 'スクリーンヒーロー', type: 'ロベルト系' },
    },
    prevRaces: [
      { date: '26.03.28', course: '阪神', name: '毎日杯', grade: 'G3', dist: '1800芝', cond: '良', pos: 1, field: 7, jockey: '岩田望来', time: '1:45.1' },
      { date: '26.01.12', course: '京都', name: 'シンザン記念', grade: 'G3', dist: '1600芝', cond: '良', pos: 3, field: 16, jockey: '岩田望来', time: '1:33.6' },
    ],
    form: [1, 3, 1],
    tags: ['毎日杯勝ち'],
    comment: '毎日杯快勝。距離延長◎。',
  },
  { no: 17, gate: 8, name: 'アドマイヤクワッズ', en: 'Admire Quads',
    sex: '牡', age: 3, color: '鹿', weight: 57.0, jockey: '坂井瑠星', trainer: '友道康夫',
    stable: '栗東', owner: '近藤旬子', mark: 'I',
    odds: 18.9, pop: 8,
    record: '2-0-2-0', earnings: 7806.0, bodyWeight: 480,
    pedigree: {
      sire: { name: 'リアルスティール', type: 'サンデー系' },
      dam: { name: 'デイトライン', sireOfDam: 'Zoffany', type: 'ダンチヒ系' },
    },
    prevRaces: [
      { date: '26.03.08', course: '中山', name: 'ディープ記念', grade: 'L', dist: '2000芝', cond: '良', pos: 3, field: 10, jockey: '坂井瑠星', time: '2:00.3' },
      { date: '25.12.21', course: '阪神', name: '朝日杯FS', grade: 'G1', dist: '1600芝', cond: '重', pos: 3, field: 14, jockey: '坂井瑠星', time: '1:33.5' },
      { date: '25.11.15', course: '京都', name: 'デイリー2S', grade: 'G2', dist: '1600芝', cond: '良', pos: 1, field: 8, jockey: '坂井瑠星', time: '1:33.1' },
    ],
    form: [3, 3, 1],
    tags: ['朝日杯3着', '友道厩舎'],
    comment: '友道厩舎の本命候補。連対率高い。',
  },
  { no: 18, gate: 8, name: 'バステール', en: 'Basteet',
    sex: '牡', age: 3, color: '鹿', weight: 57.0, jockey: '川田将雅', trainer: '斉藤崇史',
    stable: '栗東', owner: '(有)シルクレーシング', mark: 'I',
    odds: 12.1, pop: 5,
    record: '2-1-0-0', earnings: 6332.8, bodyWeight: 456,
    pedigree: {
      sire: { name: 'キタサンブラック', type: 'サンデー系' },
      dam: { name: 'マンビア', sireOfDam: 'Aldebaran', type: 'ミスプロ系' },
    },
    prevRaces: [
      { date: '26.03.08', course: '中山', name: 'ディープ記念', grade: 'L', dist: '2000芝', cond: '良', pos: 1, field: 10, jockey: '川田将雅', time: '2:00.2' },
      { date: '25.12.20', course: '阪神', name: '未勝利', grade: '', dist: '2000芝', cond: '良', pos: 1, field: 16, jockey: 'C.デムーロ', time: '2:00.7' },
    ],
    form: [1, 1, 2],
    tags: ['ディープ記念勝ち', 'キタサンブラック産駒', '川田騎乗'],
    comment: 'ディープ記念快勝。川田×キタサンブラック。',
  },
];

// 馬ごとに AIスコア・適性を計算
HORSES.forEach(h => {
  // AIスコア: 人気と近走順位から
  const winRate = (h.record.match(/^(\d+)/) || [0,0])[1];
  const base = Math.max(50, 100 - Math.log2(h.odds) * 11);
  const formBonus = h.form[0] === 1 ? 6 : h.form[0] === 2 ? 3 : h.form[0] === 3 ? 1 : -2;
  h.aiScore = Math.min(98, Math.max(50, Math.round(base + formBonus)));

  // 印
  h.aiMark = h.pop === 1 ? '◎'
    : h.pop === 2 ? '○'
    : h.pop <= 4 ? '▲'
    : h.pop <= 7 ? '△'
    : '';

  // 距離適性（中山2000m向け）
  const distExp = h.prevRaces.some(r => r.dist.includes('2000')) ? 20 : 0;
  h.distanceFit = Math.min(95, 65 + distExp + (h.form[0] === 1 ? 10 : 0));

  // 馬場適性 (良)
  h.surfaceFit = 70 + (h.form[0] === 1 ? 15 : h.form[0] === 2 ? 8 : 0);

  // コース適性（中山）
  const nakayamaExp = h.prevRaces.filter(r => r.course === '中山').length;
  h.courseFit = Math.min(95, 65 + nakayamaExp * 10);
});

// 父系の系統別成績（架空データ、傾向重視）
const LINEAGE_TRENDS = [
  { name: 'サンデー系', type: 'sire', wins: 28, rate: 22.4, earnings: 4.8, trend: '◎' },
  { name: 'ロベルト系', type: 'sire', wins: 11, rate: 14.8, earnings: 2.1, trend: '○' },
  { name: 'キングマンボ系', type: 'sire', wins: 9, rate: 12.5, earnings: 1.8, trend: '△' },
  { name: 'サンデー系', type: 'broodmare', wins: 19, rate: 18.7, earnings: 3.2, trend: '○' },
  { name: 'ロベルト系', type: 'broodmare', wins: 14, rate: 15.1, earnings: 2.5, trend: '△' },
];

const COURSE_TRENDS = {
  course: '中山芝2000m (皐月賞)',
  winningSires: [
    { name: 'ディープインパクト系', rate: 24.1, sample: 58 },
    { name: 'キングカメハメハ系', rate: 18.3, sample: 41 },
    { name: 'ロベルト系', rate: 15.7, sample: 32 },
    { name: 'ハーツクライ系', rate: 14.2, sample: 47 },
  ],
  bias: {
    pace: 'ミドル',
    trackBias: '内有利',
    lastRace: '先行有利',
  },
};

Object.assign(window, { RACE, HORSES, LINEAGE_TRENDS, COURSE_TRENDS });
