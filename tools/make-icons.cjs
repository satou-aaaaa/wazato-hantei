// アプリのアイコン（icon-192.png・icon-512.png）を作る。紺の地に、朱の●と藍の○（わざと？わざとじゃない？の2つの答え）。
// 使い方: node tools/make-icons.cjs（qa/ の playwright を使う）
const path = require("path");
const { chromium } = require(path.join(__dirname, "..", "qa", "node_modules", "playwright"));
(async () => {
  const b = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  for (const s of [192, 512]) {
    const p = await b.newPage({ viewport: { width: s, height: s } });
    await p.setContent(`<body style="margin:0"><svg width="${s}" height="${s}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" fill="#1d2a3f"/>
      <circle cx="32" cy="48" r="20" fill="#d9573c"/>
      <circle cx="68" cy="48" r="18" fill="none" stroke="#9fc0e8" stroke-width="5"/>
      <rect x="12" y="78" width="76" height="5" rx="2.5" fill="#fffdf7"/><rect x="47" y="70" width="6" height="16" rx="3" fill="#fffdf7"/></svg></body>`);
    await p.screenshot({ path: path.join(__dirname, "..", `icon-${s}.png`), clip: { x: 0, y: 0, width: s, height: s } });
  }
  await b.close();
})();
