# Contributing to SheerID Link Extractor

Thanks for your interest in contributing! 🎉

This project is a small, focused **userscript** that helps users detect SheerID student-verification links and move their own verification flow between devices. We welcome helpful, responsible contributions.

---

## ⚖️ Scope & Guidelines (important)

This project is a **passive, local helper tool**. It is **not** intended to:

- Bypass, forge, or automate SheerID verification
- Batch-claim educational discounts
- Impersonate or verify the identity of anyone other than yourself
- Collect, store, or transmit any personal data

Contributions must **respect the terms of service** of the platforms involved and remain within the scope of "previewing a link so a user can continue their own verification."

---

## 🧰 Prerequisites

- [Node.js](https://nodejs.org/) 18+
- A userscript manager to test: **Tampermonkey**, **Violentmonkey**, or **Userscripts** (iOS)

---

## 🛠️ Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/chentanwan/sheerid-link-extractor.git
   cd sheerid-link-extractor
   ```
2. Edit `SheerID-Link-Extractor.js`.
3. Validate your changes locally:
   ```bash
   node scripts/validate.js
   node --check SheerID-Link-Extractor.js
   ```
4. Test in a browser by installing the userscript and reproducing your change.

---

## 📝 How to Contribute

1. **Fork** the repository.
2. Create a topic branch:
   ```bash
   git checkout -b feature/my-feature
   ```
3. Make your changes. Keep them **focused and minimal**.
4. Run the validation script (see above).
5. Commit with a clear message:
   ```bash
   git commit -m "feat: describe your change"
   ```
6. Push and open a **Pull Request**.

Recommended commit prefixes:
- `feat:` — new feature
- `fix:` — bug fix
- `docs:` — documentation
- `ci:` — CI / build config
- `refactor:` — code cleanup (no behavior change)

---

## ✅ Before Your Pull Request

- [ ] `node scripts/validate.js` passes (syntax + metadata + size guard)
- [ ] `node --check SheerID-Link-Extractor.js` passes
- [ ] Tested in a real browser (Tampermonkey / Violentmonkey / Userscripts)
- [ ] Stays within the ethical scope above (no bypass / automation / impersonation)
- [ ] If you changed behavior or UI, consider updating the README

---

## 📚 Reporting Bugs / Feature Requests

Please use the GitHub **Issues** templates:
- [Bug report](./.github/ISSUE_TEMPLATE/bug_report.yml)
- [Feature request](./.github/ISSUE_TEMPLATE/feature_request.yml)

Include your script version, browser + userscript manager, and the page URL (with any sensitive info redacted).

---

## 🤝 Code of Conduct

Be respectful and constructive. Criticism is for the **code**, never for people. See [GitHub's Community Guidelines](https://docs.github.com/en/site-policy/github-terms/github-community-guidelines).

---

*Built by 陈贪玩 · Telegram: [@cclchat_bot](https://t.me/cclchat_bot)*
