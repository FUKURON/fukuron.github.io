const questions = [
  { trait: 'R', text: '推しへの気持ちは「恋をしている」感覚に近い。' },
  { trait: 'R', text: '推しを見るとき、物語を妄想することが多い。' },
  { trait: 'R', text: '推しが恋愛すると聞くと、複雑な気持ちになる。' },
  { trait: 'R', text: '推しの言葉ひとつで、心や感情が大きく動く。' },
  { trait: 'R', text: '自分にとって推しは「恋人」に近い存在だ。' },
  { trait: 'E', text: '推しを語るときは、人と共有したいほうだ。' },
  { trait: 'E', text: '現場は、友達と一緒に行くほうが楽しい。' },
  { trait: 'E', text: '推しのことをSNSに投稿するほうだ。' },
  { trait: 'E', text: '同担と推しについて語り合えると嬉しい。' },
  { trait: 'E', text: '推し活は、人と交流するきっかけになっている。' },
  { trait: 'D', text: '現場には、行けるなら全部行きたいと思う。' },
  { trait: 'D', text: '推しのグッズは、積極的にあつめるほうだ。' },
  { trait: 'D', text: '推しの記念日は、できるだけ毎回お祝いする。' },
  { trait: 'D', text: '推し活が、生活の中心になる時期がある。' },
  { trait: 'D', text: '推しへの熱量は、常に高いほうだ。' },
  { trait: 'S', text: '基本的に、1人の推しを長く推すタイプだ。' },
  { trait: 'S', text: '新しいジャンルには、どちらかというと慎重だ。' },
  { trait: 'S', text: '推し変や沼の移動をすることはあまりない。' },
  { trait: 'S', text: '推しで創作をしたい気持ちはあまり湧かない。' },
  { trait: 'S', text: '直感で「この人が好き」となることは少ない。' }
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
const introText = '推し活タイプ診断へようこそ！自分の推し活タイプを突き止めるために、ありのままの自分で正直に回答してください（全20問）';

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
  showQuestion();
}

document.addEventListener('DOMContentLoaded', initQuiz);
