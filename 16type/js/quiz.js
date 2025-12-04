const questions = [
  { trait: 'R', text: '推しを見るとき、あなたは物語を妄想する？' },
  { trait: 'R', text: '推しが恋愛したら少し複雑に感じる？' },
  { trait: 'R', text: '推しへの感情の主語は「私（恋）」？' },
  { trait: 'R', text: '推しの言動で動くのは心（感情）？' },
  { trait: 'R', text: '推しを形容するなら「恋」？' },
  { trait: 'E', text: '推し語りは共有したい？' },
  { trait: 'E', text: '現場は友達と行くのが楽しい？' },
  { trait: 'E', text: 'SNSで感想を投稿することが多い？' },
  { trait: 'E', text: '同担と語るのが嬉しい？' },
  { trait: 'E', text: '推し活は交流のきっかけ？' },
  { trait: 'D', text: '現場は行けるなら全部行く？' },
  { trait: 'D', text: 'グッズは積極的に揃える？' },
  { trait: 'D', text: '記念日を必ずお祝いする？' },
  { trait: 'D', text: '推し活が生活の中心になることがある？' },
  { trait: 'D', text: '気持ちの温度は安定して高い？' },
  { trait: 'S', text: '基本は1人の推しを長く推す？' },
  { trait: 'S', text: '新しいジャンルには慎重？' },
  { trait: 'S', text: '沼の移動はあまりしない？' },
  { trait: 'S', text: '創作欲はあまり湧かない？' },
  { trait: 'S', text: '直感で好きになる頻度は低い？' }
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
  '少しそう思う',
  'あまりそう思わない',
  'ややそう思わない',
  'そう思わない'
];

let currentIndex = 0;
const scores = { R: 0, E: 0, D: 0, S: 0 };
const introText = 'こんにちは！推し活診断へようこそ。6段階で答えてください。（全20問）';

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

  const labelRow = document.createElement('div');
  labelRow.className = 'label-row';
  const labelLeft = document.createElement('span');
  labelLeft.textContent = 'そう思う';
  const labelRight = document.createElement('span');
  labelRight.textContent = 'そう思わない';
  labelRow.appendChild(labelLeft);
  labelRow.appendChild(labelRight);
  controls.appendChild(labelRow);

  const buttonRow = document.createElement('div');
  buttonRow.className = 'button-row';
  const scoreValues = [5, 4, 3, 2, 1, 0];
  const sizeClasses = ['btn-large', 'btn-medium', 'btn-small', 'btn-small', 'btn-medium', 'btn-large'];

  scoreValues.forEach((score, index) => {
    const button = document.createElement('button');
    const colorClass = index < 3 ? 'btn-pink' : 'btn-cyan';
    button.className = colorClass + ' ' + sizeClasses[index];
    button.onclick = function() {
      handleAnswer(score);
    };
    buttonRow.appendChild(button);
  });

  controls.appendChild(buttonRow);
  chatElement.appendChild(controls);
}

function displayQuestion() {
  const chatElement = document.getElementById('chat');
  chatElement.innerHTML = '';
  
  if (currentIndex === 0) {
    showMessage(introText);
  }
  
  const question = questions[currentIndex];
  showMessage((currentIndex + 1) + '/' + questions.length + ' ' + question.text);
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
  const trait = questions[currentIndex].trait;
  scores[trait] += score;

  currentIndex++;
  showQuestion();
}

function calculateType() {
  const threshold = 13;
  const r = scores.R >= threshold ? 'R' : 'W';
  const e = scores.E >= threshold ? 'E' : 'I';
  const d = scores.D >= threshold ? 'D' : 'L';
  const s = scores.S >= threshold ? 'S' : 'V';
  return r + e + d + s;
}

function displayResult() {
  const chatElement = document.getElementById('chat');
  chatElement.innerHTML = '';
  const type = calculateType();
  showMessage('診断結果');
  showMessage('あなたのタイプは: ' + typeDescriptions[type] + '（' + type + '）');
  fadeInChat();
}

function showResult() {
  fadeOutChat(displayResult);
}

function initQuiz() {
  setTimeout(showQuestion, 700);
}

document.addEventListener('DOMContentLoaded', initQuiz);
