# 🎓 SheerID Link Extractor — 使用教程

> **自动提取 SheerID 认证链接，跨设备继续学生验证**
>
> 作者：**陈贪玩**　TG联系：**[@cclchat_bot](https://t.me/cclchat_bot)**
>                
> 交流群组：**[点我加群](https://t.me/KYCTW)**
>
> 操作演示：**[观看视频](https://t.me/KYCTWW/33)**

---

## 📌 脚本能做什么

在你浏览网页时，自动监听页面里出现的 **SheerID 认证链接**（`services.sheerid.com` / `verify.sheerid.com`）。一旦捕获，立即弹窗显示**完整链接**，支持：

- 📋 **一键复制** —— 发到另一台设备继续填资料
- 🌐 **一键打开** —— 直接在当前设备继续验证

**适用场景**：ChatGPT、GitHub Student Pack、Google Workspace for Education、Claude 等教育优惠验证流程，中途想换手机/电脑，复制链接即可接续完成资料填写和提交验证。

---

## 一、电脑端（以 Chrome 为例）

### 第 1 步：安装油猴扩展 Tampermonkey

1. 打开 Chrome 浏览器。
2. 进入 [Chrome 网上应用店 - Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)。
3. 点击「**添加到 Chrome**」→「**添加扩展程序**」。
4. 安装完成后，地址栏右侧会出现一个 🐵 图标。

> 也可以用替代扩展：**Violentmonkey**（[Chrome 网上应用店](https://chrome.google.com/webstore/detail/violentmonkey/jinjaccalgkegednnccohejagnlnfdag)）。

### 第 2 步：添加脚本

1. 点击地址栏右侧的 🐵 Tampermonkey 图标。
2. 选择「**添加新脚本**」。
3. 删除编辑器里默认的内容。
4. 打开本项目的脚本文件 [`SheerID-Link-Extractor.js`](../SheerID-Link-Extractor.js)，**全选、复制全部代码**。
5. 粘贴到 Tampermonkey 编辑器里。
6. 按 **Ctrl + S**（Mac 用 **Cmd + S**）保存。
7. 关闭编辑器。左下角应显示「已启用」。

### 第 3 步：验证生效

1. 随便打开一个网页（比如 `chatgpt.com/students/2026/`）。
2. 点击「领取免费优惠」进入验证流程，走到 SheerID 验证步骤。
3. 页面上会弹出「🎓 捕获到 SheerID 认证链接」弹窗，显示完整链接。
4. 点击「**📋 复制**」即可把链接发到其他设备。

> 电脑端弹窗默认**高亮「复制」按钮**，方便直接复制。

### 第 4 步：在其他设备继续

1. 把复制到的完整链接发给另一台设备的浏览器。
2. 在另一台设备打开该链接，登录同一个账号，即可接着填资料、提交验证。

---

## 二、手机端（iOS 以 Userscripts 为例）

> Userscripts 是 Safari 的油猴脚本管理器（开源、免费、无需越狱）。Safari 是 iOS 上唯一原生支持油猴脚本的浏览器。

### 第 1 步：安装 Userscripts App

1. 打开 **App Store**。
2. 搜索 **Userscripts**（作者 *Nicholas Riley*，橙色 ⚡ 图标），下载安装。

### 第 2 步：编写脚本文件

> **重要！** Userscripts 首次引导默认指向 **App 沙盒内目录**，与 iCloud Drive 同名文件夹**不互通**。务必先确认脚本目录指向 iCloud Drive。

1. 打开 **Files（文件）App**，进入 iCloud Drive 的 `Userscripts` 文件夹。
2. 新建一个文本文件，命名为 `SheerID-Link-Extractor.js`。
3. 打开本项目的 [`SheerID-Link-Extractor.js`](../SheerID-Link-Extractor.js)，全选复制全部代码，粘贴进去并保存。

### 第 3 步：Userscripts 设置脚本目录

1. 打开 **Userscripts App**。
2. 首次启动会引导选择「**Scripts Directory**」（脚本目录）。
3. 选择 **iCloud Drive** 下的 `Userscripts` 文件夹（不是 App 沙盒内那个）。
4. 进入后应能看到 `SheerID-Link-Extractor.js`，确认其 toggle 开关是**开启**状态。

### 第 4 步：开启 Safari 扩展

1. 打开 iPhone「**设置**」→「**Safari 浏览器**」→「**扩展**」。
2. 找到 **Userscripts**，打开开关。
3. 回到 Safari，点击地址栏左侧的「**大小**」图标（或扩展图标），允许 Userscripts 在当前网页运行。

### 第 5 步：验证生效

1. 在 Safari 打开 `chatgpt.com/students/2026/`。
2. 进入验证流程，走到 SheerID 验证步骤。
3. 页面弹出「🎓 捕获到 SheerID 认证链接」弹窗。

> **手机端**：弹窗默认**高亮「🌐 打开」按钮**。因为手机上换设备续填时，**点击直接打开**最省事；「📋 复制」按钮仍保留，方便把链接发到电脑。

### 第 6 步：在其他设备继续

1. 手机上点击「🌐 打开」直接在验证页继续；或点「📋 复制」把链接发出去。
2. 在另一台设备打开链接，登录同一账号继续填写提交。

---

## 三、其他设备（仅列出可用软件与平台）

> 其他平台只需装上对应油猴管理器，再导入这个脚本即可，操作方法与上述一致。

| 平台/浏览器 | 可用软件 | 是否推荐 | 说明 |
| --- | --- | --- | --- |
| **Chrome（桌面）** | Tampermonkey / Violentmonkey | ✅ 推荐 | 见上方「电脑端」演示 |
| **Edge（桌面）** | Tampermonkey / Violentmonkey | ✅ 推荐 | 与 Chrome 相同 |
| **Firefox（桌面）** | Tampermonkey / Violentmonkey | ✅ 推荐 | 支持 |
| **Safari（Mac）** | Tampermonkey for Safari | ✅ 推荐 | Mac 版 Safari |
| **iOS / iPadOS（Safari）** | Userscripts | ✅ 推荐 | 见上方「手机端」演示 |
| **iOS / iPadOS** | Tampermonkey for iOS | 可选 | App Store 付费 |
| **Android（Chrome/Firefox）** | Tampermonkey for Android | ⚠️ 受限 | 新版 Firefox 对油猴支持减弱 |
| **Android（Kiwi / 其他）** | Tampermonkey / Violentmonkey | ✅ 可用 | Kiwi 浏览器支持扩展 |
| **Linux（Firefox/Chrome）** | Tampermonkey / Violentmonkey | ✅ 推荐 | 同桌面版 |

---

## 🔧 常见问题

**Q1：脚本装好了但没弹窗？**
- 刷新页面再试；确认脚本 toggle 已开启；确认当前页面确实出现了 SheerID 跳转。

**Q2：手机端弹窗按钮颜色不一样？**
- 正常现象。脚本自动识别窄屏/触屏 → 手机端高亮「🌐 打开」，电脑端高亮「📋 复制」。

**Q3：跨设备打开链接提示「会话失效」？**
- SheerID 部分 offer 会锁定会话，跨设备可能无法直接续填。若遇到，把填到一半的**资料步骤**记录下来，在新设备重走流程即可。

**Q4：如何找回之前捕获的链接？**
- 点击油猴图标 → 「复制最近一次 SheerID 链接」菜单项，可复制最近一条（脚本会记住）。

---

## 📄 文件清单

- `SheerID-Link-Extractor.js` —— 油猴脚本本体

**作者：陈贪玩　·　Telegram：[@cclchat_bot](https://t.me/cclchat_bot)**
