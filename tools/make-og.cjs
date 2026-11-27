// SNS で貼られたときの絵（og.png 1200×630）を作る。今日の問題（答え）は入れず、遊び方の例だけ（問題データにない言い方で、正解の印も付けない。CodeRabbit mansion-kimari#1）。
// 使い方: node tools/make-og.cjs（qa/ の playwright を使う）
const path = require("path");
const { chromium } = require(path.join(__dirname, "..", "qa", "node_modules", "playwright"));
(async () => {
  const b = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
  const btn = (mk, t, bg, bd) => `<div style="flex:1;font-size:32px;font-weight:900;padding:16px 8px;border-radius:12px;background:${bg};border:3px ${bd};text-align:center">${mk} ${t}</div>`;
  await p.setContent(`<body style="margin:0;font-family:'Noto Sans CJK JP','IPAPGothic',sans-serif">
  <div style="width:1200px;height:630px;box-sizing:border-box;padding:48px 64px;background:#f3efe4;color:#1d2a3f;display:flex;gap:48px;align-items:center">
    <div style="flex:0 0 440px">
      <div style="font-size:30px;color:#83261a;letter-spacing:.06em">ノーブ効果（副作用効果）</div>
      <div style="font-size:78px;font-weight:900;margin-top:8px;line-height:1.15;color:#123554">わざと？<br><span style="color:#b23a24;font-size:62px">わざとじゃない？</span></div>
      <div style="font-size:34px;margin-top:14px">副作用のよし悪しで<br>答えは変わる？</div>
    </div>
    <div style="flex:1;background:#fffdf7;border:4px solid #1d2a3f;border-radius:16px;overflow:hidden">
      <div style="background:#3b4a63;color:#fff;font-size:24px;padding:8px 18px">🏫 例の話</div>
      <div style="padding:18px 22px;font-size:30px;line-height:1.6;font-weight:700">
        <div style="color:#4c5568;font-size:26px">ある係が、新しい決まりを聞いた。</div>
        <div>「便利になります。それと、○○になります」</div>
        <div>「○○のことは、どうでもいい」</div>
      </div>
      <div style="display:flex;gap:12px;padding:0 18px 18px">${btn("●", "わざと", "#fbe9e4", "solid #83261a")}${btn("○", "わざとじゃない", "#e8eef7", "dashed #123554")}</div>
    </div>
  </div></body>`);
  await p.screenshot({ path: path.join(__dirname, "..", "og.png") });
  await b.close();
})();
