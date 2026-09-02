# 🎓 SheerID Link Extractor

<div align="center">

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0-brightgreen.svg)](./SheerID-Link-Extractor.js)
[![Stars](https://img.shields.io/github/stars/chentanwan/sheerid-link-extractor.svg?style=flat&color=yellow)](https://github.com/chentanwan/sheerid-link-extractor)
[![Forks](https://img.shields.io/github/forks/chentanwan/sheerid-link-extractor.svg?style=flat&color=orange)](https://github.com/chentanwan/sheerid-link-extractor)
[![Issues](https://img.shields.io/github/issues/chentanwan/sheerid-link-extractor.svg?style=flat&color=red)](https://github.com/chentanwan/sheerid-link-extractor/issues)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/chentanwan/sheerid-link-extractor/pulls)

**✍️ 作者 陈贪玩 · 📮 Telegram: [@cclchat_bot](https://t.me/cclchat_bot)**

> A lightweight **userscript** that automatically detects **SheerID student verification links** (`services.sheerid.com` / `verify.sheerid.com`) appearing on any webpage, and shows them in a popup for **one-click copy or open** — so you can continue your student verification on another device.

**[🌐 English](README.md) · [🇨🇳 简体中文](docs/README.zh-CN.md)**

</div>

---

## ✨ What it does

While you browse, the script silently monitors the page for **SheerID authentication links**. When one is captured, it pops up a compact panel showing the **full URL**, with two actions:

- 📋 **Copy** — send the link to another device to continue filling in your details
- 🌐 **Open** — continue the verification right where you are

**Use case:** Educational discounts that verify through SheerID — **ChatGPT, GitHub Student Developer Pack, Google Workspace for Education, Claude**, etc. If you're mid-verification and want to switch from one device to another, copy the link and resume right where you left off.

---

## 🚀 Features

- 🔍 **Multi-path capture** — listens to page resources (`performance`), `<iframe>` `src`/`srcdoc`, `fetch`/`XMLHttpRequest`, and the current navigation URL.
- 🧹 **Smart filtering** — only matches real SheerID verification links (domain + verification params), avoiding false positives on ordinary pages.
- 💾 **Remembers the last link** — recover a previously captured link anytime from the extension menu.
- 📱 **Responsive UI** — highlights **Copy** on desktop, **Open** on mobile (touch / narrow screens).
- 🌐 **Cross-browser** — works with Tampermonkey, Violentmonkey, and Userscripts (iOS Safari).

---

## 📥 Installation

### Desktop (Chrome / Edge / Firefox)

1. Install **[Tampermonkey](https://www.tampermonkey.net/)** (or **Violentmonkey**).
2. Open the extension menu → **Create a new script**.
3. Clear the default template, then paste the entire content of [`SheerID-Link-Extractor.js`](./SheerID-Link-Extractor.js).
4. Press **Ctrl/Cmd + S** to save and enable it.

### Mobile (iOS Safari via Userscripts)

1. Install **Userscripts** from the App Store.
2. In the **Files** app, create `SheerID-Link-Extractor.js` inside your iCloud Drive `Userscripts` folder and paste the script content.
3. Open the **Userscripts** app → point **Scripts Directory** to that folder.
4. In **Settings → Safari → Extensions**, enable **Userscripts**.
5. Reload the target page.

> ⚠️ **Important:** Userscripts' first-run default directory is inside the app sandbox, which is **not shared** with the iCloud Drive folder of the same name. Make sure you point the app to the correct location.

### Other platforms

Any place that can run userscripts works — just install the matching manager (Tampermonkey / Violentmonkey / Userscripts) and import the script. Works on Chrome, Edge, Firefox, Safari (macOS), iOS/iPadOS, Android, and Linux.

---

## 🖼️ Usage

1. Open a student-offer page (e.g. `chatgpt.com/students/2026/`).
2. Start the verification flow until you reach the SheerID step.
3. The script detects the SheerID verification link and shows the popup automatically.
4. Click **Copy** to move it to another device, or **Open** to continue locally.

---

## ⚙️ How it works

The script injects into all pages (`@match *://*/*`) and captures SheerID links via several independent channels:

| Channel | Description |
| --- | --- |
| `performance.getEntriesByType('resource')` | Scans resources already loaded by the page |
| `MutationObserver` on `<iframe>` | Detects dynamically inserted/adjusted iframes and their `src` / `srcdoc` |
| `fetch` / `XMLHttpRequest` interception | Grabs links used in network calls |
| Current navigation URL | Catches the case where the user lands directly on a SheerID page |

A URL is only treated as a SheerID verification link if its hostname matches a SheerID domain **and** it carries verification parameters (`verificationId` / `verificationIframeUid` / `accountVerificationId`).

---

## ⚖️ Legal & Compliance

This is a **passive, local helper tool** — it does **not** bypass, forge, automate, batch-claim, or impersonate any identity or verification process. It only surfaces a URL so a user can **continue their own legitimate student verification on another device**.

The script does not modify or interfere with any third-party service logic. Use it only to manage **your own** verification. Respect the terms of service of the platforms you use.

---

## 📦 Project Structure

```
sheerid-link-extractor/
├── SheerID-Link-Extractor.js   # The userscript
├── README.md                   # This file (EN, overview + install)
├── docs/README.zh-CN.md        # Detailed Chinese tutorial
└── COMPLIANCE.md               # Platform-compliance assessment
```

---

## 📄 License

Distributed under the **MIT License**. See [LICENSE](./LICENSE) for details.

---

## 🙋 FAQ

**Q: The script is installed but no popup appears?**
Refresh the page, confirm the script toggle is on, and make sure the page actually triggers a SheerID redirect.

**Q: Why are the button colors different on mobile vs desktop?**
By design — the UI highlights **Open** on touch/narrow screens and **Copy** on desktop, matching how you'd naturally continue on each device.

**Q: The link says "session expired" on another device?**
Some SheerID offers lock the session to the originating device. If so, note the steps of the partially-filled form and restart the flow on the new device.

**Q: How do I recover a previously captured link?**
Use the extension menu item "Copy last SheerID link" — the script remembers the most recent one.

---

*© 2026 陈贪玩. Built for the community. Telegram: [@cclchat_bot](https://t.me/cclchat_bot)*
