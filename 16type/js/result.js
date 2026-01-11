// タイプコードの各文字に対応する日本語ラベル
const typeLabels = {
  R: '恋心',
  W: '尊み',
  E: '交流',
  I: '没入',
  D: '本気',
  L: 'ゆるく',
  S: '一途',
  V: '多様'
};

// タイプコードから詳細ラベル文字列を生成する関数
function getTypeDetailLabel(type) {
  return type.split('').map(function(char) {
    return typeLabels[char] || char;
  }).join(' × ');
}

function fadeInChat() {
  const chatElement = document.getElementById('chat');
  chatElement.classList.add('fade-in');
}

function getTypeFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('type') || '';
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
    const nameText = document.createTextNode(compatibleData.name + ' ');
    const typeCode = document.createElement('span');
    typeCode.className = 'compatibility-type-code';
    typeCode.textContent = item.type;
    name.appendChild(nameText);
    name.appendChild(typeCode);
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

  const type = getTypeFromURL();
  const data = typeData[type];

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
  const typeDetail = document.createElement('div');
  typeDetail.className = 'type-detail text-sm';
  typeDetail.textContent = getTypeDetailLabel(type);
  typeHeader.appendChild(typeName);
  typeHeader.appendChild(typeCode);
  typeHeader.appendChild(typeDetail);
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
  retryLink.href = 'index.html';
  retryLink.className = 'answer-button';
  retryLink.style.display = 'block';
  retryLink.style.textDecoration = 'none';
  retryLink.style.boxSizing = 'border-box';
  retryLink.textContent = '最初に戻る';
  retrySection.appendChild(retryLink);
  chatElement.appendChild(retrySection);

  fadeInChat();
}

document.addEventListener('DOMContentLoaded', displayResult);
