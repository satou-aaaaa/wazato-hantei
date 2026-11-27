# AGENTS.md

わざと？わざとじゃない？：副作用のある短い話（会社・学校・町内会など。犯罪の話は使わない）を読み、「わざと」「わざとじゃない」を判定する（正解の無い問い）。同じ形の話を悪い副作用とよい副作用の2通りで出し、答えがよし悪しで変わったか（かたより）を点数で見せ、Knobe（2003）の実験（悪い副作用82%・よい副作用23%が「わざと」）とくらべる。続けて、実験の数や話の形を学ぶ問題を1日5問（正解がある）。`index.html` と `data.js`（話と問題の種類）を GitHub Pages で公開する。

## 準備（最初に一度）

```bash
bash scripts/setup.sh   # Node.js（版は .nvmrc）を確かめ、検査の依存とブラウザを入れる。何度実行してもよい
```

Claude Code のクラウドセッションでは `.claude/settings.json` のフックが自動で実行する。

## push する前の確認

```bash
node qa/run.mjs   # 問題（10種類×3000問：答えが原典の数・話の形どおり・2段目）・判定の組とかたより・今日の回と上級（3年分）・とことん・通しで遊ぶ・続きから・復習・幅320px・PWA・引き継ぎ・見やすさ（CI の QA と同じ）
```

## このリポジトリの決まり

- 数は原典の値だけ：Knobe (2003) "Intentional Action and Side Effects in Ordinary Language", Analysis 63(3): 190–194（82%・23%・78人・77%・30%・42人・責める4.8・ほめる1.4）と、Cova ら (2021) Review of Philosophy and Psychology 12: 9–44（40本・およそ7割・Knobe 2003 は再現）。`data.js` の `PAPER` にだけ書き、`qa/run.mjs` の `TB`（別に書いた原典の表）とくらべる。確かめられない数（「知らなかったら何%」など）は足さない。
- 判定には正解を出さない。判定の答えは自信をかける・復習・★に入れない（深さは学べる問いだけ）。判定の答えをほめたり責めたりする言葉・実績を置かない（かたより0点をごほうびにしない）。
- 話は身近な場面（会社・学校・町内会・病院・駅など）だけ。犯罪・事故・争いの話、実在の人・会社・国、特定の人や国のよい悪いのくらべを入れない。人は役の名前で書き、性別を決めない。
- 話の形は Knobe の1つ目の実験と同じ（ねらいを言う → 副作用を先に聞く → 「どうでもいい」と言う → 副作用が起きる）。形を変えた話（聞いていない・ねらっていた）は「実験の形とくらべる」問いだけで使う。
- 2段目：ねらいと副作用 → 「副作用は？」、数の問い → 「反対の話では？」、どちらが多い → 「なぜ分かれた？」、形くらべ → 「同じ形にするには？」、人数 → 「どこで？」、やり直し → 「何割？」。
- 今日の回（判定6話＋やさしい2・ふつう2・むずかしい1）・上級（むずかしい3）は日本時間の日付の種で決まり、だれでも同じ。`Math.random()` は練習・とことんの種だけ。`SC`・`KINDS` は最後に足すだけ（QA の `PIN` が第1回を見る）。`data.js` を変える PR は自動ではマージされない（`hold_paths`）。
- ★はまちがい＋ヒントの数（0で★3・1で★2・2以上で★1）。上級はヒントなし。時間制限なし。
- 好きなだけ遊べる：チケット・ライフ・回数制限・🔒で開くモードを入れない（shared-workflows `routines/game-dev.md` F1〜F7。QA が見る）。練習の判定は何度でも。
- 記録 `wzt-v1`・文字 `wzt-fs`・復習 `wzt-depth`。`depth.js`・`qa/depth-check.mjs`・見やすさ（`<!-- a11y:begin -->`〜`end`・`qa/a11y.mjs`）・引き継ぎ（`transfer.js`・`qa/transfer-check.mjs`）・store・core・kiroku は shared-workflows `template/` の写しで、ここでは直さない。
- 画面の土台は どこから砂山？（sunayama-doko）から写した。写し元の言葉が残っていないかを QA が見る。
- 共有は遊ぶ人が押したときに開くリンクだけ。シェアの文に学べる問いの問題・答えを出さない（かたよりは正解の無い答えなので出す）。外へ通信しない（CSP の `connect-src 'self'` を広げない）。
- PWA：画面のファイルを足したら `sw.js` の `SHELL` にも足し、中身を大きく変えたら `CACHE` の版を上げる。アイコンは `node tools/make-icons.cjs`、`og.png` は `node tools/make-og.cjs`。
- 公開リポジトリなので、個人情報・鍵を入れない。

## 公開

- GitHub Pages は `main` のルート（`/`）を公開する。PR の QA と Secret scan が ✅ になると `automerge.yml` が自動でマージする。止めたいときは下書きにするか、ラベル「自動マージしない」を付ける。
- `sw.js`・`manifest.webmanifest`・`data.js` を変える PR は自動ではマージされない（`hold_paths`）。CodeRabbit のレビューを読み、手でマージする直前に今の head へのレビューを読み直す。CodeRabbit は PR に `@coderabbitai review` とコメントして頼む。

## 共通のきまり

- PR の作り方・マージの仕方は satou-aaaaa/shared-workflows の `routines/pr.md`、全体のきまりは `routines/common.md` に従う。
- CI の部品は shared-workflows の共通部品を呼ぶ。リポジトリ側の .github/workflows には呼び出しと設定値だけを書く。
- Claude 以外の AI・人が作業するときは、shared-workflows の `routines/tool-map.md` と `routines/without-claude.md` を読む。
