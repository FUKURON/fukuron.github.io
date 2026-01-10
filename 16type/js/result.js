function fadeInChat() {
  const chatElement = document.getElementById('chat');
  chatElement.classList.add('fade-in');
}

function getScoresFromURL() {
  const params = new URLSearchParams(window.location.search);
  return {
    RW: parseInt(params.get('RW'), 10) || 0,
    EI: parseInt(params.get('EI'), 10) || 0,
    DL: parseInt(params.get('DL'), 10) || 0,
    SV: parseInt(params.get('SV'), 10) || 0
  };
}

function calculateType(scores) {
  const r = scores.RW > 0 ? 'R' : 'W';
  const e = scores.EI > 0 ? 'E' : 'I';
  const d = scores.DL > 0 ? 'D' : 'L';
  const s = scores.SV > 0 ? 'S' : 'V';
  return r + e + d + s;
}

function createScoreBar(score, maxScore, leftLabel, rightLabel) {
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

function createCompatibilitySection(type) {
  const compatibleTypes = compatibilityData[type];
  if (!compatibleTypes || compatibleTypes.length === 0) {
    return null;
  }

  const section = document.createElement('div');
  section.className = 'compatibility-section';

  const title = document.createElement('div');
  title.className = 'section-title text-sm';
  title.textContent = '一緒に推し活すると楽しい仲間';
  section.appendChild(title);

  const list = document.createElement('div');
  list.className = 'compatibility-list';

  compatibleTypes.forEach(function(item) {
    const compatibleData = typeData[item.type];
    if (!compatibleData) {
      return;
    }

    const card = document.createElement('div');
    card.className = 'compatibility-card';

    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'compatibility-image-wrapper';

    const image = document.createElement('img');
    image.className = 'compatibility-image';
    image.src = compatibleData.image;
    image.alt = compatibleData.name;

    imageWrapper.appendChild(image);
    card.appendChild(imageWrapper);

    const name = document.createElement('div');
    name.className = 'compatibility-name text-sm';
    name.textContent = compatibleData.name;
    card.appendChild(name);

    const description = document.createElement('div');
    description.className = 'compatibility-description text-sm';
    description.textContent = item.description;
    card.appendChild(description);

    list.appendChild(card);
  });

  section.appendChild(list);
  return section;
}

function displayResult() {
  const chatElement = document.getElementById('chat');
  chatElement.innerHTML = '';

  const scores = getScoresFromURL();
  const type = calculateType(scores);
  const data = typeData[type];
  const maxScore = 8;

  if (!data) {
    chatElement.innerHTML = '<div class="message bot text-sm">診断結果が見つかりませんでした。<a href="test.html">診断をやり直す</a></div>';
    fadeInChat();
    return;
  }

  const resultTitle = document.createElement('div');
  resultTitle.className = 'result-title text-sm';
  resultTitle.textContent = 'あなたの推し活キャラは…';
  chatElement.appendChild(resultTitle);

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

  const typeImage = document.createElement('img');
  typeImage.className = 'type-image';
  typeImage.src = data.image;
  typeImage.alt = data.name;
  chatElement.appendChild(typeImage);

  const personalitySection = document.createElement('div');
  personalitySection.className = 'result-section';
  const personalityText = document.createElement('div');
  personalityText.className = 'section-text text-sm';
  personalityText.textContent = data.personality;
  personalitySection.appendChild(personalityText);
  chatElement.appendChild(personalitySection);

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

  // 相性セクションを追加
  const compatibilitySection = createCompatibilitySection(type);
  if (compatibilitySection) {
    chatElement.appendChild(compatibilitySection);
  }

  const retrySection = document.createElement('div');
  retrySection.className = 'result-section';
  retrySection.style.textAlign = 'center';
  retrySection.style.marginTop = '32px';
  const retryLink = document.createElement('a');
  retryLink.href = 'test.html';
  retryLink.className = 'answer-button';
  retryLink.style.display = 'block';
  retryLink.style.textDecoration = 'none';
  retryLink.style.boxSizing = 'border-box';
  retryLink.textContent = 'もう一度診断する';
  retrySection.appendChild(retryLink);
  chatElement.appendChild(retrySection);

  fadeInChat();
}

document.addEventListener('DOMContentLoaded', displayResult);
