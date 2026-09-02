// ==UserScript==
// @name         SheerID Link Extractor
// @namespace    https://github.com/sheerid-link-extractor
// @version      1.0.0
// @description  Automatically monitor SheerID verification links (services.sheerid.com / verify.sheerid.com) appearing on the page, show full link in a popup with one-click copy or open, to continue student verification across devices.
// @author       陈贪玩 (TG: @cclchat_bot)
// @match        *://*/*
// @run-at       document-idle
// @noframes
// @grant        GM_setClipboard
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// ==/UserScript==

(function () {
  'use strict';

  /* ============================================================
   * 1. 配置与匹配规则
   * ============================================================ */

  // SheerID 相关域名（匹配链接主体，不区分 http/https）
  var SHEERID_DOMAINS = [
    'services.sheerid.com',
    'verify.sheerid.com',
    'www.sheerid.com'
  ];

  // 判定一个 URL 是否为目标 SheerID 认证链接
  function isSheeridUrl(url) {
    if (!url) return false;
    try {
      // 支持相对路径处理但主要面向绝对 URL
      var u = new URL(url, location.href);
      // 命中 sheerid 域名
      for (var i = 0; i < SHEERID_DOMAINS.length; i++) {
        if (u.hostname.indexOf(SHEERID_DOMAINS[i]) !== -1) {
          // /verify/ 路径 + 验证特征参数并存才算认证链接，避免误报
          var hasVerifyPath = u.pathname.indexOf('/verify/') !== -1;
          var hasVerifyParam = u.search.indexOf('verificationId') !== -1 ||
                               u.search.indexOf('verificationIframeUid') !== -1 ||
                               u.search.indexOf('accountVerificationId') !== -1;
          if (hasVerifyPath && hasVerifyParam) return true;
          // 兜底：即使路径不含 /verify/，只要带核心验证参数也识别（某些部署路径不同）
          if (hasVerifyParam) return true;
        }
      }
    } catch (e) { /* ignore */ }
    return false;
  }

  // 归一化：去重、去尾部哈希、保留全部 query
  function normalizeUrl(url) {
    try {
      var u = new URL(url, location.href);
      u.hash = '';
      return u.href;
    } catch (e) {
      return url;
    }
  }

  // 是否已在当前会话里发现过（防止重复弹窗骚扰）
  var foundSet = Object.create(null);

  /* ============================================================
   * 2. 弹窗 UI
   * ============================================================ */

  function createPopup(linkContent) {
    // 移除旧的弹窗
    var old = document.getElementById('sheerid-extract-popup');
    if (old) old.remove();

    var wrap = document.createElement('div');
    wrap.id = 'sheerid-extract-popup';
    wrap.style.cssText = [
      'position:fixed',
      'z-index:999999',
      'top:16px',
      'right:16px',
      'left:16px',
      'max-width:480px',
      'margin:0 auto',
      'background:#111827',
      'color:#f9fafb',
      'border-radius:12px',
      'padding:14px 16px',
      'box-shadow:0 10px 40px rgba(0,0,0,.5)',
      'font:14px/1.5 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif',
      'border:1px solid #374151',
      'box-sizing:border-box'
    ].join(';');

    var title = document.createElement('div');
    title.textContent = '🎓 捕获到 SheerID 认证链接';
    title.style.cssText = 'font-weight:700;font-size:15px;margin-bottom:6px;color:#fff';

    var sub = document.createElement('div');
    sub.textContent = '复制到另一台设备打开，即可继续学生验证';
    sub.style.cssText = 'font-size:12px;color:#9ca3af;margin-bottom:8px';

    // 链接显示框
    var linkBox = document.createElement('div');
    linkBox.style.cssText = [
      'background:#1f2937',
      'border:1px solid #374151',
      'border-radius:8px',
      'padding:8px',
      'margin-bottom:10px',
      'word-break:break-all',
      'font-family:ui-monospace,SFMono-Regular,Menlo,monospace',
      'font-size:11px',
      'color:#93c5fd',
      'max-height:80px',
      'overflow-y:auto',
      'line-height:1.4'
    ].join(';');
    linkBox.textContent = linkContent || '';

    var btnRow = document.createElement('div');
    btnRow.style.cssText = 'display:flex;gap:8px;flex-wrap:wrap';

    function makeBtn(text, primary, onClick) {
      var b = document.createElement('button');
      b.type = 'button';
      b.textContent = text;
      b.style.cssText = [
        'flex:1',
        'min-width:90px',
        'padding:8px 12px',
        'border:none',
        'border-radius:8px',
        'font-size:13px',
        'font-weight:600',
        'cursor:pointer',
        'transition:opacity .15s'
      ].join(';');
      b.style.background = primary ? '#2563eb' : '#374151';
      b.style.color = '#fff';
      b.addEventListener('click', onClick);
      return b;
    }

    function copyLink() {
      var link = linkBox.textContent;
      try {
        if (typeof GM_setClipboard === 'function') {
          GM_setClipboard(link);
        } else {
          var ta = document.createElement('textarea');
          ta.value = link;
          ta.style.position = 'fixed';
          ta.style.opacity = '0';
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          ta.remove();
        }
        showToast('✅ 链接已复制');
      } catch (e) {
        showToast('❌ 复制失败，请手动长按复制');
      }
    }

    function openLink() {
      var link = linkBox.textContent;
      window.open(link, '_blank');
    }

    // 是否手机（粗略判断：触摸为主 + 窄屏）
    var isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) ||
                   (window.matchMedia && window.matchMedia('(max-width: 520px)').matches);

    var copyBtn = makeBtn('📋 复制', !isMobile, copyLink);
    var openBtn = makeBtn('🌐 打开', isMobile, openLink);
    var closeBtn = makeBtn('✕ 关闭', false, function () { wrap.remove(); });
    closeBtn.style.flex = '0 0 auto';

    btnRow.appendChild(copyBtn);
    if (isMobile) btnRow.appendChild(openBtn);
    btnRow.appendChild(closeBtn);

    wrap.appendChild(title);
    wrap.appendChild(sub);
    wrap.appendChild(linkBox);
    wrap.appendChild(btnRow);
    document.body.appendChild(wrap);

    return wrap;
  }

  // 轻量 toast 提示
  var toastTimer = null;
  function showToast(text) {
    var t = document.getElementById('sheerid-extract-toast');
    if (t) t.remove();
    t = document.createElement('div');
    t.id = 'sheerid-extract-toast';
    t.textContent = text;
    t.style.cssText = [
      'position:fixed',
      'z-index:9999999',
      'bottom:24px',
      'left:16px',
      'background:#111827',
      'color:#fff',
      'padding:10px 16px',
      'border-radius:8px',
      'font:13px/1.4 -apple-system,sans-serif',
      'box-shadow:0 4px 20px rgba(0,0,0,.4)',
      'transition:opacity .3s',
      'pointer-events:none'
    ].join(';');
    document.body.appendChild(t);
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      t.style.opacity = '0';
      setTimeout(function () { t.remove(); }, 400);
    }, 2500);
  }

  /* ============================================================
   * 3. 核心捕获逻辑
   * ============================================================ */

  function handleFound(url) {
    var norm = normalizeUrl(url);
    if (foundSet[norm]) return; // 已发现过
    if (!isSheeridUrl(norm)) return;
    foundSet[norm] = true;

    // 存进 localStorage 最近一条，便于找回
    try {
      localStorage.setItem('lastSheeridLink', norm);
    } catch (e) {}

    createPopup(norm);
    console.log('[SheerID Extract] 捕获链接:', norm);
  }

  // 3.1 扫描 performance 资源记录（捕获页面已加载的 iframe/资源）
  function scanPerformance() {
    try {
      var entries = performance.getEntriesByType('resource');
      for (var i = 0; i < entries.length; i++) {
        handleFound(entries[i].name);
      }
    } catch (e) {}
  }

  // 3.2 监听所有 iframe 的 src/srcdoc 变化
  function observeIframes() {
    function check(el) {
      if (!el) return;
      var src = el.src || el.getAttribute('src') || '';
      var srcdoc = el.getAttribute('srcdoc') || '';
      if (src) handleFound(src);
      if (srcdoc) {
        // srcdoc 内可能内嵌链接
        var m = srcdoc.match(/https?:\/\/[^"'\s>]+sheerid[^"'\s>]*/g);
        if (m) for (var i = 0; i < m.length; i++) handleFound(m[i]);
      }
    }
    // 已存在的 iframe
    document.querySelectorAll('iframe').forEach(check);
    // 新增 iframe
    new MutationObserver(function (muts) {
      muts.forEach(function (m) {
        m.addedNodes.forEach(function (node) {
          if (node.nodeType === 1) {
            if (node.tagName === 'IFRAME') check(node);
          }
        });
      });
    }).observe(document.body || document.documentElement, { childList: true, subtree: true });
  }

  // 3.3 拦截 fetch / XHR / URL 赋值，捕获动态链接
  function interceptNetwork() {
    // 包装 fetch
    var origFetch = window.fetch;
    if (origFetch) {
      window.fetch = function (input) {
        try {
          var url = (typeof input === 'string') ? input : (input && input.url);
          if (url) handleFound(url);
        } catch (e) {}
        return origFetch.apply(this, arguments);
      };
    }
    // 包装 XMLHttpRequest.open
    var origOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function (method, url) {
      try { handleFound(url); } catch (e) {}
      return origOpen.apply(this, arguments);
    };
  }

  // 3.4 当前页面 URL 本身是 SheerID 链接（用户直接导航过来）
  function checkCurrentPage() {
    handleFound(location.href);
  }

  /* ============================================================
   * 4. 菜单命令（可手动从 Tampermonkey 菜单抓取）
   * ============================================================ */
  function registerMenu() {
    if (typeof GM_registerMenuCommand === 'function') {
      GM_registerMenuCommand('🔍 重新扫描当前页面', function () {
        scanPerformance();
        // 把 recent 里的也扫一下
        var all = performance.getEntriesByType('resource');
        all.forEach(function (e) {
          if (isSheeridUrl(e.name)) handleFound(e.name);
        });
        showToast('🔍 已扫描，若未弹窗说明无新链接');
      });
      GM_registerMenuCommand('📋 复制最近一次 SheerID 链接', function () {
        var link = localStorage.getItem('lastSheeridLink');
        if (link) {
          try { GM_setClipboard(link); } catch (e) {}
          showToast('✅ 最近链接已复制');
        } else {
          showToast('⚠️ 暂无记录');
        }
      });
    }
  }

  /* ============================================================
   * 5. 启动
   * ============================================================ */
  function init() {
    // 只在非 sheerid 页面也监控；但她自己的验证页也启用
    document.addEventListener('DOMContentLoaded', function () {
      checkCurrentPage();
      scanPerformance();
      observeIframes();
    });
    // 万一 DOMContentLoaded 已过
    if (document.readyState !== 'loading') {
      checkCurrentPage();
      scanPerformance();
      observeIframes();
    }
    interceptNetwork();
    registerMenu();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
