# 🔍 Platform Compliance Assessment

> An evaluation of whether **SheerID-Link-Extractor.js** complies with platform rules and is suitable for hosting on GitHub.

---

## ✅ Verdict: Suitable for GitHub (platform-compliant)

**Nature of the script:** A purely local userscript that only listens for SheerID verification links appearing on a webpage and shows them for the user to **migrate their own verification flow** to another device.

It does **NOT** bypass, forge, automate, batch-claim, or impersonate any identity or verification process, nor does it modify or hijack third-party requests.

---

## 1. GitHub Platform Rules — ✅ Compliant

GitHub's **Acceptable Use Policies** require (core rule):

> *"Your use of the Service must not violate any applicable laws, including copyright or trademark laws, export control or sanctions laws, or other laws in your jurisdiction."*

**Key points:**
- GitHub's hard threshold is **whether it violates applicable law** (copyright, trademark, unlawful tools, etc.), **not** "whether it violates some third-party terms of service."
- This script does not infringe any copyright/trademark and does not facilitate unlawful activity. It is a **helper tool for users to manage their own legitimate verification flow**.
- GitHub already hosts several similar projects (e.g. the `sheerid-verification-tool` family), indicating such tools are not prohibited by the platform.

---

## 2. URL Detection Accuracy — ✅ No false positives

The script only matches actual SheerID verification links:
- Hostname matches `services.sheerid.com` / `verify.sheerid.com` / `www.sheerid.com`
- **And** carries verification parameters (`verificationId` / `verificationIframeUid` / `accountVerificationId`)

It will **not** match ordinary offer pages or unrelated sites, so it won't disturb normal browsing.

---

## 3. Areas to Keep in Mind — ⚠️ Gray, but not unlawful

1. **Third-party ToS (OpenAI / SheerID)**
   - Student-offer terms may theoretically restrict verification to a specific environment.
   - This script does **not** bypass verification; it only helps a user migrate their **own legitimate verification**, which generally doesn't violate its core intent.
   - If SheerID strictly binds the session, switching devices may yield "session expired" — this is a **technical limitation**, not a violation.

2. **Naming & description must match the intended use**
   - Repositories that get taken down on GitHub are typically those that explicitly teach "automated batch claiming / bypassing verification."
   - Your README should clearly state: **"Only for migrating the user's own legitimate student verification. Provides no bypass, forgery, automation, or identity impersonation capability."** *(This is already reflected in the README.)*

---

## 4. Risk-Reduction Suggestions

| Item | Recommendation |
| --- | --- |
| Repo positioning | Pure userscript helper; does not change any third-party service logic |
| README statement | Clearly state it only migrates **your own** legitimate verification |
| License | Add **MIT** (included) |
| Avoid wording | Do not use terms implying abuse (bypass, free-ride, batch, auto-claim) |
| Examples | Provide normal usage screenshots showing "copy link to another device" |

---

*Basis: GitHub Terms of Service (Acceptable Use Policies) official docs, ChatGPT student-offer official pages.*
*Author: 陈贪玩 · Telegram: @cclchat_bot*
