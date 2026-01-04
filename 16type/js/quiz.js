// 1) 質問（16問 / 各軸4問）
// axis: 'RW'|'EI'|'DL'|'SV'
// dir: +1 = 左側（R/E/D/S）向きの文, -1 = 右側（W/I/L/V）向きの文（逆向き）
const questions = [
  // RW
  { axis: 'RW', dir: +1, text: '推しへの気持ちは「恋をしている」感覚に近い。' },
  { axis: 'RW', dir: +1, text: '推しと自分の「もしも」の関係性を想像する。' },
  { axis: 'RW', dir: -1, text: '推しに自分の存在を認知されたくない。' },
  { axis: 'RW', dir: -1, text: '自分の気持ちより、推しの幸せや成功が大事。' },

  // EI
  { axis: 'EI', dir: +1, text: '推しの良さを誰かに伝えたり共有したい。' },
  { axis: 'EI', dir: +1, text: '推し活で仲間とつながることにワクワクする。' },
  { axis: 'EI', dir: -1, text: '推し活は基本ひとりでするほうが落ち着く。' },
  { axis: 'EI', dir: -1, text: '発信よりも自分の中で深く楽しむ時間が大切。' },

  // DL
  { axis: 'DL', dir: +1, text: '生活のリズムに推し活が組み込まれている。' },
  { axis: 'DL', dir: +1, text: '推しを「追いたい」気持ちが継続的にある。' },
  { axis: 'DL', dir: -1, text: '忙しいときは、推し活の優先度を下げられる。' },
  { axis: 'DL', dir: -1, text: '推し活は無理のない範囲で楽しみたい。' },

  // SV
  { axis: 'SV', dir: +1, text: '基本的に1人の推しを長く推すほうだ。' },
  { axis: 'SV', dir: +1, text: '新しいものにはどちらかというと慎重だ。' },
  { axis: 'SV', dir: -1, text: '気になるものは複数同時に推せる。' },
  { axis: 'SV', dir: -1, text: '推し変やジャンルの移動に抵抗がない。' }
];

// 16タイプのデータ（画像・テキストは後から差し替え可能）
const typeData = {
  'REDS': {
    name: '永遠のガチ恋語り手',
    image: 'images/types/REDS.png',
    personality: '推しの幸せは私の幸せ。現場も記念日も全力、推しへの愛が日々のエネルギー源。周囲を明るく照らす力を持っています。',
    enjoyment: '記念日を祝う、ポジティブな言葉で布教、仲間との積極的な交流。',
    advice: '一人で抱え込まず、同じ熱量の仲間と語り合うことで心の平穏を保って。'
  },
  'REDV': {
    name: '恋多き情熱クリエイター',
    image: 'images/types/REDV.png',
    personality: 'ダミーの性格テキストです。後から差し替えてください。',
    enjoyment: 'ダミーの楽しみ方テキストです。後から差し替えてください。',
    advice: 'ダミーの悩みへの向き合い方テキストです。後から差し替えてください。'
  },
  'RELS': {
    name: 'ゆるガチ恋ストーリーテラー',
    image: 'images/types/RELS.png',
    personality: 'ダミーの性格テキストです。後から差し替えてください。',
    enjoyment: 'ダミーの楽しみ方テキストです。後から差し替えてください。',
    advice: 'ダミーの悩みへの向き合い方テキストです。後から差し替えてください。'
  },
  'RELV': {
    name: '気まぐれ恋心の発信者',
    image: 'images/types/RELV.png',
    personality: 'ダミーの性格テキストです。後から差し替えてください。',
    enjoyment: 'ダミーの楽しみ方テキストです。後から差し替えてください。',
    advice: 'ダミーの悩みへの向き合い方テキストです。後から差し替えてください。'
  },
  'RIDS': {
    name: '静かに燃えるガチ恋',
    image: 'images/types/RIDS.png',
    personality: 'ダミーの性格テキストです。後から差し替えてください。',
    enjoyment: 'ダミーの楽しみ方テキストです。後から差し替えてください。',
    advice: 'ダミーの悩みへの向き合い方テキストです。後から差し替えてください。'
  },
  'RIDV': {
    name: '恋多き隠れ沼ダイバー',
    image: 'images/types/RIDV.png',
    personality: 'ダミーの性格テキストです。後から差し替えてください。',
    enjoyment: 'ダミーの楽しみ方テキストです。後から差し替えてください。',
    advice: 'ダミーの悩みへの向き合い方テキストです。後から差し替えてください。'
  },
  'RILS': {
    name: '静かに想うゆるガチ恋',
    image: 'images/types/RILS.png',
    personality: 'ダミーの性格テキストです。後から差し替えてください。',
    enjoyment: 'ダミーの楽しみ方テキストです。後から差し替えてください。',
    advice: 'ダミーの悩みへの向き合い方テキストです。後から差し替えてください。'
  },
  'RILV': {
    name: '気まぐれ恋心コレクター',
    image: 'images/types/RILV.png',
    personality: 'ダミーの性格テキストです。後から差し替えてください。',
    enjoyment: 'ダミーの楽しみ方テキストです。後から差し替えてください。',
    advice: 'ダミーの悩みへの向き合い方テキストです。後から差し替えてください。'
  },
  'WEDS': {
    name: '推しの布教長官',
    image: 'images/types/WEDS.png',
    personality: 'ダミーの性格テキストです。後から差し替えてください。',
    enjoyment: 'ダミーの楽しみ方テキストです。後から差し替えてください。',
    advice: 'ダミーの悩みへの向き合い方テキストです。後から差し替えてください。'
  },
  'WEDV': {
    name: '尊みのマルチ伝道師',
    image: 'images/types/WEDV.png',
    personality: 'ダミーの性格テキストです。後から差し替えてください。',
    enjoyment: 'ダミーの楽しみ方テキストです。後から差し替えてください。',
    advice: 'ダミーの悩みへの向き合い方テキストです。後から差し替えてください。'
  },
  'WELS': {
    name: 'ゆる尊み語り部',
    image: 'images/types/WELS.png',
    personality: 'ダミーの性格テキストです。後から差し替えてください。',
    enjoyment: 'ダミーの楽しみ方テキストです。後から差し替えてください。',
    advice: 'ダミーの悩みへの向き合い方テキストです。後から差し替えてください。'
  },
  'WELV': {
    name: 'ゆる尊みコレクター',
    image: 'images/types/WELV.png',
    personality: 'ダミーの性格テキストです。後から差し替えてください。',
    enjoyment: 'ダミーの楽しみ方テキストです。後から差し替えてください。',
    advice: 'ダミーの悩みへの向き合い方テキストです。後から差し替えてください。'
  },
  'WIDS': {
    name: '静かな忠誠心',
    image: 'images/types/WIDS.png',
    personality: 'ダミーの性格テキストです。後から差し替えてください。',
    enjoyment: 'ダミーの楽しみ方テキストです。後から差し替えてください。',
    advice: 'ダミーの悩みへの向き合い方テキストです。後から差し替えてください。'
  },
  'WIDV': {
    name: '静かなる多界隈ウォッチャー',
    image: 'images/types/WIDV.png',
    personality: 'ダミーの性格テキストです。後から差し替えてください。',
    enjoyment: 'ダミーの楽しみ方テキストです。後から差し替えてください。',
    advice: 'ダミーの悩みへの向き合い方テキストです。後から差し替えてください。'
  },
  'WILS': {
    name: 'マイペース見守り隊',
    image: 'images/types/WILS.png',
    personality: 'ダミーの性格テキストです。後から差し替えてください。',
    enjoyment: 'ダミーの楽しみ方テキストです。後から差し替えてください。',
    advice: 'ダミーの悩みへの向き合い方テキストです。後から差し替えてください。'
  },
  'WILV': {
    name: '静かにいろいろ愛でる人',
    image: 'images/types/WILV.png',
    personality: 'ダミーの性格テキストです。後から差し替えてください。',
    enjoyment: 'ダミーの楽しみ方テキストです。後から差し替えてください。',
    advice: 'ダミーの悩みへの向き合い方テキストです。後から差し替えてください。'
  }
};

const answerLabels = [
  'そう思う',
  'ややそう思う',
  'どちらでもない',
  'ややそう思わない',
  'そう思わない'
];

let currentIndex = 0;
// 軸ごとのスコア（-2〜+2の範囲で加算、正なら左側、負なら右側）
const scores = { RW: 0, EI: 0, DL: 0, SV: 0 };
const introText = '推し活タイプ診断へようこそ！自分の推し活タイプを突き止めるために、ありのままの自分で正直に回答してください（全16問）';

function fadeOutChat(callback) {
  const chatElement = document.getElementById('chat');
  chatElement.classList.add('fade-out');
  chatElement.classList.remove('fade-in');
  setTimeout(function() {
    chatElement.innerHTML = '';
    chatElement.classList.remove('fade-out');
    callback();
  }, 300);
}

function fadeInChat() {
  const chatElement = document.getElementById('chat');
  chatElement.classList.add('fade-in');
}

function showMessage(text) {
  const chatElement = document.getElementById('chat');
  const messageDiv = document.createElement('div');
  messageDiv.className = 'message bot';
  messageDiv.textContent = text;
  chatElement.appendChild(messageDiv);
}

function createAnswerButtons() {
  const chatElement = document.getElementById('chat');
  const controls = document.createElement('div');
  controls.className = 'controls';

  const buttonRow = document.createElement('div');
  buttonRow.className = 'button-row';
  // 5段階ボタン: +2, +1, 0, -1, -2
  const scoreValues = [2, 1, 0, -1, -2];
  const sizeClasses = ['btn-large', 'btn-medium', 'btn-small', 'btn-medium', 'btn-large'];

  scoreValues.forEach((score, index) => {
    const button = document.createElement('button');
    let colorClass;
    if (index < 2) {
      colorClass = 'btn-pink';
    } else if (index === 2) {
      colorClass = 'btn-neutral';
    } else {
      colorClass = 'btn-cyan';
    }
    button.className = colorClass + ' ' + sizeClasses[index];
    button.onclick = function() {
      handleAnswer(score);
    };
    buttonRow.appendChild(button);
  });

  controls.appendChild(buttonRow);

  const labelRow = document.createElement('div');
  labelRow.className = 'label-row';
  const labelLeft = document.createElement('span');
  labelLeft.className = 'label-pink';
  labelLeft.textContent = 'そう思う';
  const labelRight = document.createElement('span');
  labelRight.className = 'label-cyan';
  labelRight.textContent = 'そう思わない';
  labelRow.appendChild(labelLeft);
  labelRow.appendChild(labelRight);
  controls.appendChild(labelRow);

  chatElement.appendChild(controls);
}

function showProgressCard() {
  const chatElement = document.getElementById('chat');
  const progressDiv = document.createElement('div');
  progressDiv.className = 'progress-card';
  progressDiv.textContent = (currentIndex + 1) + '/' + questions.length;
  chatElement.appendChild(progressDiv);
}

function showQuestionMessage(text) {
  const chatElement = document.getElementById('chat');
  const messageDiv = document.createElement('div');
  messageDiv.className = 'message bot question-text';
  messageDiv.textContent = text;
  chatElement.appendChild(messageDiv);
}

function displayQuestion() {
  const chatElement = document.getElementById('chat');
  chatElement.innerHTML = '';

  if (currentIndex === 0) {
    showMessage(introText);
  }

  showProgressCard();

  const question = questions[currentIndex];
  showQuestionMessage(question.text);
  createAnswerButtons();
  fadeInChat();
}

function showQuestion() {
  if (currentIndex >= questions.length) {
    showResult();
    return;
  }

  if (currentIndex === 0) {
    displayQuestion();
  } else {
    fadeOutChat(displayQuestion);
  }
}

function handleAnswer(score) {
  const question = questions[currentIndex];
  // dir: +1なら「そう思う」が左側（R/E/D/S）向き、-1なら逆向き
  // スコアにdir を掛けることで、常に左側が正、右側が負になる
  scores[question.axis] += score * question.dir;

  currentIndex++;
  showQuestion();
}

function calculateType() {
  // スコアが0以上なら左側（R/E/D/S）、マイナスなら右側（W/I/L/V）
  const r = scores.RW >= 0 ? 'R' : 'W';
  const e = scores.EI >= 0 ? 'E' : 'I';
  const d = scores.DL >= 0 ? 'D' : 'L';
  const s = scores.SV >= 0 ? 'S' : 'V';
  return r + e + d + s;
}

function createScoreBar(score, maxScore, leftLabel, rightLabel, leftColor, rightColor) {
  // スコアは-maxScore〜+maxScoreの範囲、0が中央
  // パーセンテージは0〜100%で、50%が中央（スコア0）
  const percentage = ((score + maxScore) / (maxScore * 2)) * 100;
  const isLeft = score >= 0;

  const container = document.createElement('div');
  container.className = 'score-item';

  const labels = document.createElement('div');
  labels.className = 'score-labels';
  const leftSpan = document.createElement('span');
  leftSpan.textContent = leftLabel;
  leftSpan.style.color = leftColor;
  if (isLeft) leftSpan.style.fontWeight = 'bold';
  const rightSpan = document.createElement('span');
  rightSpan.textContent = rightLabel;
  rightSpan.style.color = rightColor;
  if (!isLeft) rightSpan.style.fontWeight = 'bold';
  labels.appendChild(leftSpan);
  labels.appendChild(rightSpan);

  const barContainer = document.createElement('div');
  barContainer.className = 'score-bar-container';
  const barFill = document.createElement('div');
  barFill.className = 'score-bar-fill';
  barFill.style.width = percentage + '%';
  barContainer.appendChild(barFill);

  const scoreText = document.createElement('div');
  scoreText.className = 'score-text';
  scoreText.textContent = score;

  container.appendChild(labels);
  container.appendChild(barContainer);
  container.appendChild(scoreText);

  return container;
}

function displayResult() {
  const chatElement = document.getElementById('chat');
  chatElement.innerHTML = '';
  const type = calculateType();
  const data = typeData[type];
  // 各軸4問 × 最大スコア2 = 8が最大値
  const maxScore = 8;

  // 診断結果の見出し
  const resultTitle = document.createElement('div');
  resultTitle.className = 'result-title';
  resultTitle.textContent = '診断結果';
  chatElement.appendChild(resultTitle);

  // タイプ名（大きく）と英字4文字（小さく）
  const typeHeader = document.createElement('div');
  typeHeader.className = 'type-header';
  const typeName = document.createElement('div');
  typeName.className = 'type-name';
  typeName.textContent = data.name;
  const typeCode = document.createElement('div');
  typeCode.className = 'type-code';
  typeCode.textContent = type;
  typeHeader.appendChild(typeName);
  typeHeader.appendChild(typeCode);
  chatElement.appendChild(typeHeader);

  // イメージ画像
  const typeImage = document.createElement('img');
  typeImage.className = 'type-image';
  typeImage.src = data.image;
  typeImage.alt = data.name;
  chatElement.appendChild(typeImage);

  // 性格
  const personalitySection = document.createElement('div');
  personalitySection.className = 'result-section';
  const personalityTitle = document.createElement('div');
  personalityTitle.className = 'section-title';
  personalityTitle.textContent = '性格';
  const personalityText = document.createElement('div');
  personalityText.className = 'section-text';
  personalityText.textContent = data.personality;
  personalitySection.appendChild(personalityTitle);
  personalitySection.appendChild(personalityText);
  chatElement.appendChild(personalitySection);

  // 楽しみ方
  const enjoymentSection = document.createElement('div');
  enjoymentSection.className = 'result-section';
  const enjoymentTitle = document.createElement('div');
  enjoymentTitle.className = 'section-title';
  enjoymentTitle.textContent = '楽しみ方';
  const enjoymentText = document.createElement('div');
  enjoymentText.className = 'section-text';
  enjoymentText.textContent = data.enjoyment;
  enjoymentSection.appendChild(enjoymentTitle);
  enjoymentSection.appendChild(enjoymentText);
  chatElement.appendChild(enjoymentSection);

  // 悩みへの向き合い方
  const adviceSection = document.createElement('div');
  adviceSection.className = 'result-section';
  const adviceTitle = document.createElement('div');
  adviceTitle.className = 'section-title';
  adviceTitle.textContent = '悩みへの向き合い方';
  const adviceText = document.createElement('div');
  adviceText.className = 'section-text';
  adviceText.textContent = data.advice;
  adviceSection.appendChild(adviceTitle);
  adviceSection.appendChild(adviceText);
  chatElement.appendChild(adviceSection);

  // スコア詳細（現状維持）
  const scoreSection = document.createElement('div');
  scoreSection.className = 'score-section';

  const scoreTitle = document.createElement('div');
  scoreTitle.className = 'score-title';
  scoreTitle.textContent = 'スコア詳細';
  scoreSection.appendChild(scoreTitle);

  scoreSection.appendChild(createScoreBar(scores.RW, maxScore, 'ガチ恋 (R)', '尊み (W)', '#F58CA8', '#7AC6D9'));
  scoreSection.appendChild(createScoreBar(scores.EI, maxScore, '語りたい (E)', '1人で楽しむ (I)', '#F58CA8', '#7AC6D9'));
  scoreSection.appendChild(createScoreBar(scores.DL, maxScore, '献身的 (D)', 'ゆる (L)', '#F58CA8', '#7AC6D9'));
  scoreSection.appendChild(createScoreBar(scores.SV, maxScore, '一途 (S)', '多様 (V)', '#F58CA8', '#7AC6D9'));

  chatElement.appendChild(scoreSection);
  fadeInChat();
}

function showResult() {
  fadeOutChat(displayResult);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function initQuiz() {
  shuffleArray(questions);
  showQuestion();
}

document.addEventListener('DOMContentLoaded', initQuiz);
