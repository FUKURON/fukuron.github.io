// 相性データ（独立管理）
// 各タイプに対して相性の良い3タイプを定義
// type: 相性の良いタイプコード（typeDataのキーと対応）
// description: 相性の説明文
const compatibilityData = {
  'REDS': [
    { type: 'WEDS', description: '情熱的な推し活スタイルが共鳴し、一緒にイベントを盛り上げられる最高のパートナー。' },
    { type: 'REDV', description: '同じ熱量で語り合えるから、推しトークが止まらない！' },
    { type: 'RELS', description: 'お互いの推しへの愛を尊重し合える、心地よい関係が築ける。' }
  ],
  'REDV': [
    { type: 'REDS', description: '一途な情熱を分かち合える、最高の推し活仲間。' },
    { type: 'WEDV', description: '新しい推しの魅力を一緒に発見できる、冒険心あふれるコンビ。' },
    { type: 'RELV', description: 'ゆるく広く楽しむスタイルが合い、気軽に推し活できる。' }
  ],
  'RELS': [
    { type: 'REDS', description: '熱量は違えど、推しへの愛は本物同士。良いバランスが取れる。' },
    { type: 'WELS', description: '穏やかに推しを見守るスタイルが似ていて、居心地が良い。' },
    { type: 'RILS', description: '一途に推しを想う気持ちが通じ合う、静かな絆。' }
  ],
  'RELV': [
    { type: 'REDV', description: '多様な推しを楽しむ姿勢が合い、新しい出会いを共有できる。' },
    { type: 'WELV', description: '気軽に推し活を楽しめる、ストレスフリーな関係。' },
    { type: 'RILV', description: 'マイペースに推しを楽しむスタイルが似ていて、無理なく付き合える。' }
  ],
  'RIDS': [
    { type: 'WIDS', description: '静かに深く推しを想う姿勢が共鳴し、言葉少なくても通じ合える。' },
    { type: 'RIDV', description: '一人で楽しむスタイルを尊重し合える、程よい距離感の関係。' },
    { type: 'REDS', description: '違うスタイルだからこそ、新しい推し活の視点をもらえる。' }
  ],
  'RIDV': [
    { type: 'RIDS', description: '深い推し愛を持つ者同士、静かに語り合える貴重な存在。' },
    { type: 'WIDV', description: '多様な推しを一人で楽しむスタイルが合い、お互いの世界を尊重できる。' },
    { type: 'RILV', description: 'ゆるく広く楽しむ姿勢が似ていて、気楽に推し活できる。' }
  ],
  'RILS': [
    { type: 'RELS', description: '穏やかに推しを想う気持ちが通じ合い、心地よい時間を過ごせる。' },
    { type: 'WILS', description: '静かに一途に推しを見守るスタイルが似ていて、安心感がある。' },
    { type: 'RIDS', description: '深い愛情を持つ者同士、言葉にしなくても分かり合える。' }
  ],
  'RILV': [
    { type: 'RELV', description: 'ゆるく多様に楽しむスタイルが合い、新しい推しを一緒に見つけられる。' },
    { type: 'WILV', description: 'マイペースに推し活を楽しむ姿勢が似ていて、無理なく付き合える。' },
    { type: 'RIDV', description: '一人の時間も大切にしながら、時々語り合える良い関係。' }
  ],
  'WEDS': [
    { type: 'REDS', description: '情熱的な推し活スタイルが共鳴し、一緒にイベントを盛り上げられる。' },
    { type: 'WEDV', description: '推しの魅力を広める仲間として、最高のチームワークを発揮。' },
    { type: 'WELS', description: '推しへの尊敬の念を共有でき、深い話ができる。' }
  ],
  'WEDV': [
    { type: 'REDV', description: '新しい推しを一緒に発見する楽しさを共有できる。' },
    { type: 'WEDS', description: '推しの魅力を広めたい気持ちが合い、布教活動が捗る。' },
    { type: 'WELV', description: '気軽に多様な推しを楽しめる、フットワークの軽いコンビ。' }
  ],
  'WELS': [
    { type: 'RELS', description: '穏やかに推しを見守るスタイルが似ていて、居心地が良い。' },
    { type: 'WEDS', description: '推しへの尊敬を共有しながら、時に熱く語り合える。' },
    { type: 'WILS', description: '静かに推しを想う気持ちが通じ合い、心地よい関係。' }
  ],
  'WELV': [
    { type: 'RELV', description: '気軽に推し活を楽しめる、ストレスフリーな関係。' },
    { type: 'WEDV', description: '多様な推しを一緒に楽しめる、冒険心あふれるコンビ。' },
    { type: 'WILV', description: 'マイペースに推し活を楽しむ姿勢が似ていて、無理なく付き合える。' }
  ],
  'WIDS': [
    { type: 'RIDS', description: '静かに深く推しを想う姿勢が共鳴し、言葉少なくても通じ合える。' },
    { type: 'WIDV', description: '一人で楽しむスタイルを尊重し合える、程よい距離感の関係。' },
    { type: 'WILS', description: '静かに一途に推しを見守る姿勢が似ていて、安心感がある。' }
  ],
  'WIDV': [
    { type: 'RIDV', description: '多様な推しを一人で楽しむスタイルが合い、お互いの世界を尊重できる。' },
    { type: 'WIDS', description: '深い推し愛を持つ者同士、静かに語り合える貴重な存在。' },
    { type: 'WILV', description: 'ゆるく広く楽しむ姿勢が似ていて、気楽に推し活できる。' }
  ],
  'WILS': [
    { type: 'RILS', description: '静かに一途に推しを見守るスタイルが似ていて、安心感がある。' },
    { type: 'WELS', description: '穏やかに推しを想う気持ちが通じ合い、心地よい時間を過ごせる。' },
    { type: 'WIDS', description: '深い愛情を持つ者同士、言葉にしなくても分かり合える。' }
  ],
  'WILV': [
    { type: 'RILV', description: 'マイペースに推し活を楽しむ姿勢が似ていて、無理なく付き合える。' },
    { type: 'WELV', description: 'ゆるく多様に楽しむスタイルが合い、新しい推しを一緒に見つけられる。' },
    { type: 'WIDV', description: '一人の時間も大切にしながら、時々語り合える良い関係。' }
  ]
};
