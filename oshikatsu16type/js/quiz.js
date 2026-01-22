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

const answerLabels = [
  'そう思う',
  'ややそう思う',
  'どちらでもない',
  'あまりそう思わない',
  'そう思わない'
];

let currentIndex = 0;
// 軸ごとのスコア（-2〜+2の範囲で加算、正なら左側、負なら右側）
const scores = { RW: 0, EI: 0, DL: 0, SV: 0 };

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
  messageDiv.className = 'message bot text-sm';
  messageDiv.textContent = text;
  chatElement.appendChild(messageDiv);
}

function createAnswerButtons() {
  const chatElement = document.getElementById('chat');
  const controls = document.createElement('div');
  controls.className = 'controls';

  // 5段階ボタン: +2, +1, 0, -1, -2
  const scoreValues = [2, 1, 0, -1, -2];

  scoreValues.forEach((score, index) => {
    const button = document.createElement('button');
    button.className = 'answer-button';
    button.textContent = answerLabels[index];
    button.onclick = function() {
      handleAnswer(score);
    };
    controls.appendChild(button);
  });

  chatElement.appendChild(controls);
}

function showProgressCard() {
  const chatElement = document.getElementById('chat');
  const progressDiv = document.createElement('div');
  progressDiv.className = 'progress-card text-sm';
  progressDiv.textContent = (currentIndex + 1) + '/' + questions.length;
  chatElement.appendChild(progressDiv);
}

function showQuestionMessage(text) {
  const chatElement = document.getElementById('chat');
  const messageDiv = document.createElement('div');
  messageDiv.className = 'message bot question-text text-md';
  messageDiv.textContent = text;
  chatElement.appendChild(messageDiv);
}

function displayQuestion() {
  const chatElement = document.getElementById('chat');
  chatElement.innerHTML = '';

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
  // スコアが正なら左側（R/E/D/S）、0以下なら右側（W/I/L/V）
  const r = scores.RW > 0 ? 'R' : 'W';
  const e = scores.EI > 0 ? 'E' : 'I';
  const d = scores.DL > 0 ? 'D' : 'L';
  const s = scores.SV > 0 ? 'S' : 'V';
  return r + e + d + s;
}

function createScoreBar(score, maxScore, leftLabel, rightLabel) {
  // スコアは-maxScore〜+maxScoreの範囲、0が中央
  // パーセンテージは0〜100%で、0%が左端（正のスコア）、100%が右端（負のスコア）
  // 正のスコア（左側の特性）は左に、負のスコア（右側の特性）は右に表示
  const percentage = ((-score + maxScore) / (maxScore * 2)) * 100;

  const container = document.createElement('div');
  container.className = 'score-item';

  const labels = document.createElement('div');
  labels.className = 'score-labels text-sm';
  const leftSpan = document.createElement('span');
  leftSpan.textContent = leftLabel;
  const rightSpan = document.createElement('span');
  rightSpan.textContent = rightLabel;
  labels.appendChild(leftSpan);
  labels.appendChild(rightSpan);

  const barContainer = document.createElement('div');
  barContainer.className = 'score-bar-container';
  const dot = document.createElement('div');
  dot.className = 'score-dot';
  dot.style.left = percentage + '%';
  barContainer.appendChild(dot);

  container.appendChild(labels);
  container.appendChild(barContainer);

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
  resultTitle.className = 'result-title text-sm';
  resultTitle.textContent = 'あなたのタイプは…';
  chatElement.appendChild(resultTitle);

  // タイプ名（大きく）と英字4文字（小さく）
  const typeHeader = document.createElement('div');
  typeHeader.className = 'type-header';
  const typeName = document.createElement('div');
  typeName.className = 'type-name text-lg';
  typeName.textContent = data.name;
  const typeCode = document.createElement('div');
  typeCode.className = 'type-code text-sm';
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

  // 性格（見出しなし）
  const personalitySection = document.createElement('div');
  personalitySection.className = 'result-section';
  const personalityText = document.createElement('div');
  personalityText.className = 'section-text text-sm';
  personalityText.textContent = data.personality;
  personalitySection.appendChild(personalityText);
  chatElement.appendChild(personalitySection);

  // 楽しみ方
  const enjoymentSection = document.createElement('div');
  enjoymentSection.className = 'result-section';
  const enjoymentTitle = document.createElement('div');
  enjoymentTitle.className = 'section-title text-sm';
  enjoymentTitle.textContent = '推し活の楽しみ方';
  const enjoymentText = document.createElement('div');
  enjoymentText.className = 'section-text text-sm';
  enjoymentText.textContent = data.enjoyment;
  enjoymentSection.appendChild(enjoymentTitle);
  enjoymentSection.appendChild(enjoymentText);
  chatElement.appendChild(enjoymentSection);

  // 悩みへの向き合い方
  const adviceSection = document.createElement('div');
  adviceSection.className = 'result-section';
  const adviceTitle = document.createElement('div');
  adviceTitle.className = 'section-title text-sm';
  adviceTitle.textContent = '悩みへの向き合い方';
  const adviceText = document.createElement('div');
  adviceText.className = 'section-text text-sm';
  adviceText.textContent = data.advice;
  adviceSection.appendChild(adviceTitle);
  adviceSection.appendChild(adviceText);
  chatElement.appendChild(adviceSection);

  // スコア詳細（現状維持）
  const scoreSection = document.createElement('div');
  scoreSection.className = 'score-section';

  const scoreTitle = document.createElement('div');
  scoreTitle.className = 'score-title text-sm';
  scoreTitle.textContent = 'スコア詳細';
  scoreSection.appendChild(scoreTitle);

  scoreSection.appendChild(createScoreBar(scores.RW, maxScore, '(R) ガチ恋', '尊み (W)'));
  scoreSection.appendChild(createScoreBar(scores.EI, maxScore, '(E) みんなで', 'ひとりで (I)'));
  scoreSection.appendChild(createScoreBar(scores.DL, maxScore, '(D) 本気', 'ゆる (L)'));
  scoreSection.appendChild(createScoreBar(scores.SV, maxScore, '(S) 一途', '多様 (V)'));

  chatElement.appendChild(scoreSection);
  fadeInChat();
}

function showLoadingScreen(callback) {
  const chatElement = document.getElementById('chat');
  chatElement.innerHTML = '';

  const loadingContainer = document.createElement('div');
  loadingContainer.className = 'loading-container';

  const loadingText = document.createElement('div');
  loadingText.className = 'loading-text text-md';
  loadingText.textContent = '診断中…';
  loadingContainer.appendChild(loadingText);

  const loadingSpinner = document.createElement('div');
  loadingSpinner.className = 'loading-spinner';
  loadingContainer.appendChild(loadingSpinner);

  chatElement.appendChild(loadingContainer);
  fadeInChat();

  setTimeout(function() {
    fadeOutChat(callback);
  }, 1000);
}

function showResult() {
  const type = calculateType();

  // GA4に診断結果を送信
  if (typeof gtag === 'function') {
    gtag('event', 'diagnosis_result', {
      'type': type
    });
  }

  fadeOutChat(function() {
    showLoadingScreen(function() {
      window.location.href = 'result/' + type + '.html';
    });
  });
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
