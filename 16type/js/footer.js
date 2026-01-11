/**
 * フッターコンポーネント
 * 全ページで共通のフッターを動的に挿入する
 * フッターの内容を変更する場合は、このファイルのみを編集すればOK
 */

const footerConfig = {
  text: '© FUKURON inc. All rights reserved.'
};

function initFooter() {
  const chatContainer = document.getElementById('chat');
  if (!chatContainer) return;

  const footer = document.createElement('footer');
  footer.className = 'site-footer';
  footer.innerHTML = '<p class="footer-text">' + footerConfig.text + '</p>';
  chatContainer.appendChild(footer);
}

document.addEventListener('DOMContentLoaded', initFooter);
