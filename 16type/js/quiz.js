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

const typeDescriptions = {
  'REDS': '永遠のガチ恋語り手',
  'REDV': '恋多き情熱クリエイター',
  'RELS': 'ゆるガチ恋ストーリーテラー',
  'RELV': '気まぐれ恋心の発信者',
  'RIDS': '静かに燃えるガチ恋',
  'RIDV': '恋多き隠れ沼ダイバー',
  'RILS': '静かに想うゆるガチ恋',
  'RILV': '気まぐれ恋心コレクター',
  'WEDS': '推しの布教長官',
  'WEDV': '尊みのマルチ伝道師',
  'WELS': 'ゆる尊み語り部',
  'WELV': 'ゆる尊みコレクター',
  'WIDS': '静かな忠誠心',
  'WIDV': '静かなる多界隈ウォッチャー',
  'WILS': 'マイペース見守り隊',
  'WILV': '静かにいろいろ愛でる人'
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
  // 各軸4問 × 最大スコア2 = 8が最大値
  const maxScore = 8;

  showMessage('診断結果');
  showMessage('あなたのタイプは: ' + typeDescriptions[type] + '（' + type + '）');

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

function initQuiz() {
  showQuestion();
}

document.addEventListener('DOMContentLoaded', initQuiz);
