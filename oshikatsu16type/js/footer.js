/**
 * フッターコンポーネント
 * 全ページで共通のフッターを動的に挿入する
 * フッターの内容を変更する場合は、このファイルのみを編集すればOK
 */

const footerConfig = {
  links: [
    { text: 'プライバシーポリシー', url: '#' },
    { text: '利用規約', url: '#' }
  ],
  copyright: '推し活キャラ診断 © FUKURON inc. All rights reserved.'
};

function initFooter() {
  const footer = document.createElement('footer');
  footer.className = 'site-footer';

  var linksHtml = '<div class="footer-links">';
  footerConfig.links.forEach(function(link, index) {
    if (index > 0) {
      linksHtml += '<span class="footer-separator">　</span>';
    }
    linksHtml += '<a href="' + link.url + '" class="footer-link">' + link.text + '</a>';
  });
  linksHtml += '</div>';

  var copyrightHtml = '<p class="footer-text">' + footerConfig.copyright + '</p>';

  footer.innerHTML = linksHtml + copyrightHtml;
  document.body.appendChild(footer);
}

document.addEventListener('DOMContentLoaded', initFooter);
