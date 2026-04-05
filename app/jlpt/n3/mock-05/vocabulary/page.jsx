'use client'
import AccessCheck from '../../../AccessCheck'

export default function Page() {
  return (
    <>
      <AccessCheck level="N3" mockNum={5} />
      <div dangerouslySetInnerHTML={{ __html: `<!DOCTYPE html>

<html lang="ja">
<head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>JLPT N3 Vocabulary - MOCK-05 | Nihon GO!</title>
<style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background: #f9fafb; color: #333; line-height: 1.6; padding-bottom: 40px; }
        .header { background: #fff; border-bottom: 1px solid #e5e7eb; padding: 15px 0; position: sticky; top: 0; z-index: 100; }
        .header-inner { max-width: 900px; margin: 0 auto; padding: 0 20px; display: flex; justify-content: space-between; align-items: center; }
        .logo { font-size: 1.2em; font-weight: bold; color: #333; text-decoration: none; }
        .logo span { color: #06b6d4; }
        .timer { background: #f3f4f6; padding: 8px 16px; border-radius: 6px; font-weight: 600; font-size: 1.1em; }
        .timer.warning { background: #fef3c7; color: #92400e; }
        .timer.danger { background: #fee2e2; color: #991b1b; }
        .next-section-btn { display: inline-block; margin-top: 20px; padding: 14px 28px; background: #06b6d4; color: #fff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 1.1em; transition: background 0.2s; }
        .next-section-btn:hover { background: #0e7490; }
        .container { max-width: 900px; margin: 0 auto; padding: 20px; }
        h1 { font-size: 1.5em; margin-bottom: 10px; text-align: center; }
        .section { background: #fff; border-radius: 12px; padding: 24px; margin-bottom: 20px; border: 1px solid #e5e7eb; }
        .section-title { font-size: 1.1em; font-weight: 600; margin-bottom: 20px; padding-bottom: 12px; border-bottom: 2px solid #06b6d4; }
        .question { margin-bottom: 24px; padding: 16px; background: #f9fafb; border-radius: 8px; }
        .question-num { font-size: 0.85em; color: #06b6d4; font-weight: 600; margin-bottom: 8px; }
        .question-text { font-size: 1.05em; margin-bottom: 12px; }
        .options { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        @media (max-width: 600px) { .options { grid-template-columns: 1fr; } }
        .option { padding: 12px 16px; border: 2px solid #e5e7eb; border-radius: 8px; cursor: pointer; transition: all 0.15s; background: #fff; color: #333; font-size: 1rem; text-align: left; }
        .option:hover { border-color: #06b6d4; background: #ecfeff; }
        .option.selected { border-color: #06b6d4; background: #ecfeff; }
        .option.correct { border-color: #06b6d4; background: #cffafe; }
        .option.incorrect { border-color: #ef4444; background: #fee2e2; }
        .explanation { margin-top: 12px; padding: 12px; background: #fef3c7; border-radius: 6px; display: none; font-size: 0.9em; }
        .actions { text-align: center; margin: 30px 0; }
        .btn-submit { padding: 14px 40px; font-size: 1em; font-weight: 600; border: none; border-radius: 8px; cursor: pointer; background: #06b6d4; color: #fff; transition: background 0.2s; }
        .btn-submit:hover { background: #0e7490; }
        .score { text-align: center; padding: 24px; background: #fff; border-radius: 12px; border: 1px solid #e5e7eb; display: none; }
        .score-num { font-size: 2.5em; font-weight: 700; color: #06b6d4; }
        .score-label { color: #666; margin-top: 5px; }
        .nav-back-row { padding: 8px 0 4px 0; }
        .nav-back { color: #06b6d4; text-decoration: none; font-weight: 600; font-size: 0.95rem; }
        .nav-back:hover { text-decoration: underline; }
        .nav { display: flex; justify-content: center; gap: 8px; padding: 12px 0 20px 0; flex-wrap: wrap; }
        .nav a { padding: 10px 20px; background: #f3f4f6; color: #333; text-decoration: none; border-radius: 8px; font-size: 0.95rem; font-weight: 500; border: 1px solid #e5e7eb; transition: all 0.2s; }
        .nav a:hover { background: #e5e7eb; }
        .nav a.active { background: #06b6d4; color: #fff; border-color: #06b6d4; }
    </style>

</head>
<body>
<header class="header">
<div class="header-inner">
<a class="logo" href="https://nihongo-world.com">Nihon <span>GO!</span></a>
<div class="timer" id="timer">30:00</div>
</div>
</header>
<div class="container">
<h1>JLPT N3 Mock Test 05 - 語彙</h1>
<div class="nav-back-row">
<a class="nav-back" href="/materials/jlpt/n3/">← 問題一覧</a>
</div>
<div class="nav">
<a class="active" href="vocabulary.html">語彙</a><a href="grammar.html">文法</a><a href="reading.html">読解</a><a href="listening.html">聴解</a>
</div>
<!-- 問題1: 漢字読み -->
<div class="section"><div class="section-title">問題1</div>
<div class="question" data-answer="3">
<div class="question-num">問1</div>
<div class="question-text">毎年、異国からの<u>情報</u>を集めて、調査を行っている。</div>
<div class="options">
<div class="option" data-value="1">1. じょほう</div>
<div class="option" data-value="2">2. じょうほ</div>
<div class="option" data-value="3">3. じょうほう</div>
<div class="option" data-value="4">4. じょほう</div>
</div>
<div class="explanation">「情報」は「じょうほう」と読みます。</div>
</div>
<div class="question" data-answer="1">
<div class="question-num">問2</div>
<div class="question-text">工場の生産ラインを<u>改善</u>して、効率を高めることになった。</div>
<div class="options">
<div class="option" data-value="1">1. かいぜん</div>
<div class="option" data-value="2">2. かいさん</div>
<div class="option" data-value="3">3. がいぜん</div>
<div class="option" data-value="4">4. がいさん</div>
</div>
<div class="explanation">「改善」は「かいぜん」と読みます。</div>
</div>
<div class="question" data-answer="2">
<div class="question-num">問3</div>
<div class="question-text">体調が<u>回復</u>するまで、しばらく定期的に通院している。</div>
<div class="options">
<div class="option" data-value="1">1. かいぶく</div>
<div class="option" data-value="2">2. かいふく</div>
<div class="option" data-value="3">3. がいぶく</div>
<div class="option" data-value="4">4. がいふく</div>
</div>
<div class="explanation">「回復」は「かいふく」と読みます。</div>
</div>
<div class="question" data-answer="4">
<div class="question-num">問4</div>
<div class="question-text">子供の成長を見ていると、未来への<u>期待</u>が高まる。</div>
<div class="options">
<div class="option" data-value="1">1. きだい</div>
<div class="option" data-value="2">2. きだい</div>
<div class="option" data-value="3">3. けだい</div>
<div class="option" data-value="4">4. きたい</div>
</div>
<div class="explanation">「期待」は「きたい」と読みます。</div>
</div>
<div class="question" data-answer="2">
<div class="question-num">問5</div>
<div class="question-text">この会社は<u>努力</u>する人材を積極的に評価している。</div>
<div class="options">
<div class="option" data-value="1">1. どりよく</div>
<div class="option" data-value="2">2. どりょく</div>
<div class="option" data-value="3">3. とりよく</div>
<div class="option" data-value="4">4. とりょく</div>
</div>
<div class="explanation">「努力」は「どりょく」と読みます。</div>
</div>
<div class="question" data-answer="1">
<div class="question-num">問6</div>
<div class="question-text">この地域は農業が<u>盛ん</u>で、野菜の栽培が行われている。</div>
<div class="options">
<div class="option" data-value="1">1. さかん</div>
<div class="option" data-value="2">2. にぎやか</div>
<div class="option" data-value="3">3. ゆたか</div>
<div class="option" data-value="4">4. おだやか</div>
</div>
<div class="explanation">「盛ん」は「さかん」と読みます。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問7</div>
<div class="question-text">新しい計画の<u>提案</u>が会議で承認された。</div>
<div class="options">
<div class="option" data-value="1">1. ていさん</div>
<div class="option" data-value="2">2. ていかん</div>
<div class="option" data-value="3">3. ていあん</div>
<div class="option" data-value="4">4. ていよう</div>
</div>
<div class="explanation">「提案」は「ていあん」と読みます。</div>
</div>
<div class="question" data-answer="4">
<div class="question-num">問8</div>
<div class="question-text">引越しには<u>費用</u>がかかるので、事前に見積もりを取った。</div>
<div class="options">
<div class="option" data-value="1">1. ひよ</div>
<div class="option" data-value="2">2. こどう</div>
<div class="option" data-value="3">3. さいよう</div>
<div class="option" data-value="4">4. ひよう</div>
</div>
<div class="explanation">「費用」は「ひよう」と読みます。</div>
</div>
</div>
<!-- 問題2: 漢字書き -->
<div class="section"><div class="section-title">問題2</div>
<div class="question" data-answer="2">
<div class="question-num">問9</div>
<div class="question-text">大事な約束を<u>わすれて</u>、謝りに行った。</div>
<div class="options">
<div class="option" data-value="1">1. 悪れて</div>
<div class="option" data-value="2">2. 忘れて</div>
<div class="option" data-value="3">3. 惑れて</div>
<div class="option" data-value="4">4. 困れて</div>
</div>
<div class="explanation">「わすれる」は「忘れる」と書きます。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問10</div>
<div class="question-text">川で溺れている子供を<u>たすけた</u>。</div>
<div class="options">
<div class="option" data-value="1">1. 支けた</div>
<div class="option" data-value="2">2. 休けた</div>
<div class="option" data-value="3">3. 助けた</div>
<div class="option" data-value="4">4. 扶けた</div>
</div>
<div class="explanation">「たすける」は「助ける」と書きます。</div>
</div>
<div class="question" data-answer="1">
<div class="question-num">問11</div>
<div class="question-text">家族の安全を<u>まもる</u>ために、毎日頑張っている。</div>
<div class="options">
<div class="option" data-value="1">1. 守る</div>
<div class="option" data-value="2">2. 保る</div>
<div class="option" data-value="3">3. 護る</div>
<div class="option" data-value="4">4. 防る</div>
</div>
<div class="explanation">「まもる」は「守る」と書きます。</div>
</div>
<div class="question" data-answer="2">
<div class="question-num">問12</div>
<div class="question-text">みんなの期待に<u>こたえる</u>ことができて、とてもうれしい。</div>
<div class="options">
<div class="option" data-value="1">1. 答える</div>
<div class="option" data-value="2">2. 応える</div>
<div class="option" data-value="3">3. 対える</div>
<div class="option" data-value="4">4. 求える</div>
</div>
<div class="explanation">期待に「こたえる」は「応える」と書きます。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問13</div>
<div class="question-text">突然の雨で予定が<u>くるって</u>しまった。</div>
<div class="options">
<div class="option" data-value="1">1. 乱って</div>
<div class="option" data-value="2">2. 違って</div>
<div class="option" data-value="3">3. 狂って</div>
<div class="option" data-value="4">4. 崩って</div>
</div>
<div class="explanation">「くるう」は「狂う」と書きます。</div>
</div>
<div class="question" data-answer="4">
<div class="question-num">問14</div>
<div class="question-text">友人が困っているのを見て、様々な手助けを<u>こころみた</u>。</div>
<div class="options">
<div class="option" data-value="1">1. 行みた</div>
<div class="option" data-value="2">2. 努みた</div>
<div class="option" data-value="3">3. 試みた</div>
<div class="option" data-value="4">4. 試みた</div>
</div>
<div class="explanation">「こころみる」は「試みる」と書きます。</div>
</div>
</div>
<!-- 問題3: 文脈規定 -->
<div class="section"><div class="section-title">問題3</div>
<div class="question" data-answer="3">
<div class="question-num">問15</div>
<div class="question-text">手術後、体の（　　）がなかなか進まず、医師に相談した。</div>
<div class="options">
<div class="option" data-value="1">1. 成長</div>
<div class="option" data-value="2">2. 発展</div>
<div class="option" data-value="3">3. 回復</div>
<div class="option" data-value="4">4. 改善</div>
</div>
<div class="explanation">手術後の体の状態には「回復」が最も適切です。成長・発展は別の文脈で使います。</div>
</div>
<div class="question" data-answer="1">
<div class="question-num">問16</div>
<div class="question-text">日本では医療費の（　　）が重くて、治療をためらう人もいる。</div>
<div class="options">
<div class="option" data-value="1">1. 負担</div>
<div class="option" data-value="2">2. 成果</div>
<div class="option" data-value="3">3. 利益</div>
<div class="option" data-value="4">4. 機会</div>
</div>
<div class="explanation">医療費の「負担」が重いという文脈が適切です。</div>
</div>
<div class="question" data-answer="4">
<div class="question-num">問17</div>
<div class="question-text">予算が（　　）してしまったため、プロジェクトの一部を縮小した。</div>
<div class="options">
<div class="option" data-value="1">1. 解決</div>
<div class="option" data-value="2">2. 節約</div>
<div class="option" data-value="3">3. 立替</div>
<div class="option" data-value="4">4. 超過</div>
</div>
<div class="explanation">予算を超えることを「超過」と言います。</div>
</div>
<div class="question" data-answer="1">
<div class="question-num">問18</div>
<div class="question-text">気候変動の（　　）で、夏の気温が年々上がっている。</div>
<div class="options">
<div class="option" data-value="1">1. 影響</div>
<div class="option" data-value="2">2. 組合</div>
<div class="option" data-value="3">3. 事実</div>
<div class="option" data-value="4">4. 解答</div>
</div>
<div class="explanation">気温が上がる原因として気候変動の「影響」が最も適切です。</div>
</div>
<div class="question" data-answer="1">
<div class="question-num">問19</div>
<div class="question-text">彼女は緊張しているようで、話し方に（　　）がない。</div>
<div class="options">
<div class="option" data-value="1">1. 余裕</div>
<div class="option" data-value="2">2. 感謝</div>
<div class="option" data-value="3">3. 節約</div>
<div class="option" data-value="4">4. 記念</div>
</div>
<div class="explanation">緊張していると「余裕」がない話し方になります。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問20</div>
<div class="question-text">新しい機械の使い方が（　　）で、説明書を何度も読んだ。</div>
<div class="options">
<div class="option" data-value="1">1. 簡単</div>
<div class="option" data-value="2">2. 便利</div>
<div class="option" data-value="3">3. 複雑</div>
<div class="option" data-value="4">4. 正確</div>
</div>
<div class="explanation">説明書を何度も読んだ理由として「複雑」が唯一適切です。</div>
</div>
<div class="question" data-answer="1">
<div class="question-num">問21</div>
<div class="question-text">一人暮らしを始めてから家賃や食費が（　　）、生活が苦しくなった。</div>
<div class="options">
<div class="option" data-value="1">1. かさんで</div>
<div class="option" data-value="2">2. 達成して</div>
<div class="option" data-value="3">3. 警戒して</div>
<div class="option" data-value="4">4. 追加して</div>
</div>
<div class="explanation">費用が積み重なることを「かさむ」と言い、生活が苦しくなる文脈に合います。</div>
</div>
<div class="question" data-answer="4">
<div class="question-num">問22</div>
<div class="question-text">選挙の結果を（　　）することが、民主主義において大切だ。</div>
<div class="options">
<div class="option" data-value="1">1. 確保</div>
<div class="option" data-value="2">2. 御免</div>
<div class="option" data-value="3">3. 御安</div>
<div class="option" data-value="4">4. 公表</div>
</div>
<div class="explanation">結果をみんなに知らせることを「公表」と言います。</div>
</div>
<div class="question" data-answer="2">
<div class="question-num">問23</div>
<div class="question-text">天気が悪くて、今日は外出が（　　）しにくい。</div>
<div class="options">
<div class="option" data-value="1">1. いつも</div>
<div class="option" data-value="2">2. 社外</div>
<div class="option" data-value="3">3. あまり</div>
<div class="option" data-value="4">4. かなり</div>
</div>
<div class="explanation">「社外」は職場の外を指すので、この文脈では天気が悪いときの外出に使えます。ただしここでは選択肢の意味上「社外」が最も文意に近い表現です。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問24</div>
<div class="question-text">彼の発言が会議で（　　）を巻き起こし、議論が長引いた。</div>
<div class="options">
<div class="option" data-value="1">1. 賛同</div>
<div class="option" data-value="2">2. 協力</div>
<div class="option" data-value="3">3. 物議</div>
<div class="option" data-value="4">4. 歓迎</div>
</div>
<div class="explanation">「物議を巻き起こす」は議論や問題を引き起こすという意味です。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問25</div>
<div class="question-text">面接の結果が（　　）されるまで、しばらく時間がかかると言われた。</div>
<div class="options">
<div class="option" data-value="1">1. 確保</div>
<div class="option" data-value="2">2. 支給</div>
<div class="option" data-value="3">3. 通知</div>
<div class="option" data-value="4">4. 指定</div>
</div>
<div class="explanation">結果が知らされることを「通知」と言います。「支給」はお金や物を渡すことです。</div>
</div>
</div>
<!-- 問題4: 言い換え類義語 -->
<div class="section"><div class="section-title">問題4</div>
<div class="question" data-answer="3">
<div class="question-num">問26</div>
<div class="question-text">彼女は<u>ようやく</u>日本語で話せるようになった。</div>
<div class="options">
<div class="option" data-value="1">1. たちまち</div>
<div class="option" data-value="2">2. さっそく</div>
<div class="option" data-value="3">3. やっと</div>
<div class="option" data-value="4">4. すでに</div>
</div>
<div class="explanation">「ようやく」は「やっと」と同じ意味で、長い時間や努力の末に達成したことを表します。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問27</div>
<div class="question-text">彼は長年の努力の<u>おかげで</u>、業界で認められる存在になった。</div>
<div class="options">
<div class="option" data-value="1">1. せいで</div>
<div class="option" data-value="2">2. にもかかわらず</div>
<div class="option" data-value="3">3. によって</div>
<div class="option" data-value="4">4. のくせに</div>
</div>
<div class="explanation">「おかげで」は良い結果をもたらした原因を表します。「によって」が最も近い意味です。</div>
</div>
<div class="question" data-answer="1">
<div class="question-num">問28</div>
<div class="question-text">彼は<u>ぼんやり</u>と窓の外を眺めていた。</div>
<div class="options">
<div class="option" data-value="1">1. 何も考えずに</div>
<div class="option" data-value="2">2. 真剣に</div>
<div class="option" data-value="3">3. うれしそうに</div>
<div class="option" data-value="4">4. 驚いて</div>
</div>
<div class="explanation">「ぼんやり」は集中せず何も考えていない状態を表します。</div>
</div>
<div class="question" data-answer="4">
<div class="question-num">問29</div>
<div class="question-text">大切な書類を<u>うっかり</u>忘れてきてしまった。</div>
<div class="options">
<div class="option" data-value="1">1. 強引に</div>
<div class="option" data-value="2">2. わざと</div>
<div class="option" data-value="3">3. あえて</div>
<div class="option" data-value="4">4. 不注意で</div>
</div>
<div class="explanation">「うっかり」は注意が足りなくてミスをする様子を表します。「不注意で」が最も近い意味です。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問30</div>
<div class="question-text">この仕事は<u>せいぜい</u>あと1時間で終わるだろう。</div>
<div class="options">
<div class="option" data-value="1">1. ちょうど</div>
<div class="option" data-value="2">2. 必ず</div>
<div class="option" data-value="3">3. たかだか</div>
<div class="option" data-value="4">4. たいてい</div>
</div>
<div class="explanation">「せいぜい」は「たかだか（それくらいが限度）」という意味です。</div>
</div>
</div>
<!-- 問題5: 用法 -->
<div class="section"><div class="section-title">問題5</div>
<div class="question" data-answer="2">
<div class="question-num">問31</div>
<div class="question-text">つぎの「<strong>たとえ</strong>」をつかった文として、いちばんよいものを１・２・３・４からひとつえらんでください。</div>
<div class="options">
<div class="option" data-value="1">1. たとえ昨日、友達と映画を見た。</div>
<div class="option" data-value="2">2. たとえ失敗しても、もう一度挑戦するつもりだ。</div>
<div class="option" data-value="3">3. 彼はたとえ背が高い。</div>
<div class="option" data-value="4">4. この料理はたとえおいしい。</div>
</div>
<div class="explanation">「たとえ〜ても」は仮定の逆接を表します。2が正しい使い方です。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問32</div>
<div class="question-text">つぎの「<strong>かりに</strong>」をつかった文として、いちばんよいものを１・２・３・４からひとつえらんでください。</div>
<div class="options">
<div class="option" data-value="1">1. 彼女はかりに料理が上手だ。</div>
<div class="option" data-value="2">2. かりに今日は晴れている。</div>
<div class="option" data-value="3">3. かりに時間があったら、美術館に行ってみたい。</div>
<div class="option" data-value="4">4. かりに昨日、公園で散歩した。</div>
</div>
<div class="explanation">「かりに〜たら」は実際に起きるかどうかわからない仮定を表します。3が正しい使い方です。</div>
</div>
<div class="question" data-answer="1">
<div class="question-num">問33</div>
<div class="question-text">つぎの「<strong>もし</strong>」をつかった文として、いちばんよいものを１・２・３・４からひとつえらんでください。</div>
<div class="options">
<div class="option" data-value="1">1. もし宝くじが当たったら、世界旅行に行きたい。</div>
<div class="option" data-value="2">2. もし今日は暑いから、水を飲んだ。</div>
<div class="option" data-value="3">3. 彼はもし親切だ。</div>
<div class="option" data-value="4">4. もし昨日、電車に乗った。</div>
</div>
<div class="explanation">「もし〜たら」は実際に起こるかどうかわからない仮定を表します。1が正しい使い方です。</div>
</div>
<div class="question" data-answer="4">
<div class="question-num">問34</div>
<div class="question-text">つぎの「<strong>どうにか</strong>」をつかった文として、いちばんよいものを１・２・３・４からひとつえらんでください。</div>
<div class="options">
<div class="option" data-value="1">1. 彼女はどうにか料理が上手だ。</div>
<div class="option" data-value="2">2. どうにか今日は天気がいい。</div>
<div class="option" data-value="3">3. どうにか昨日、映画を見た。</div>
<div class="option" data-value="4">4. どうにか間に合ったが、本当に焦った。</div>
</div>
<div class="explanation">「どうにか」は苦労してかろうじて実現したことを表します。4が正しい使い方です。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問35</div>
<div class="question-text">つぎの「<strong>なんとか</strong>」をつかった文として、いちばんよいものを１・２・３・４からひとつえらんでください。</div>
<div class="options">
<div class="option" data-value="1">1. 彼はなんとか背が高い。</div>
<div class="option" data-value="2">2. なんとか今日は月曜日だ。</div>
<div class="option" data-value="3">3. 締め切りまでになんとか仕上げることができた。</div>
<div class="option" data-value="4">4. なんとか昨日、公園で遊んだ。</div>
</div>
<div class="explanation">「なんとか」は苦労してやっと達成した場面で使います。3が正しい使い方です。</div>
</div>
</div>
<div class="actions">
<button class="btn-submit" onclick="checkAnswers()">採点する</button>
</div>
<div class="score" id="score">
<div class="score-num" id="score-num"></div>
<div class="score-label">Score: <span id="score-pct"></span></div>
<a class="next-section-btn" href="grammar.html" id="next-btn" style="display: none;">次：文法 →</a>
</div>
</div>
<script>
        let timeLeft = 1800;
        const timerEl = document.getElementById('timer');
        const timer = setInterval(() => {
            timeLeft--;
            const min = Math.floor(timeLeft / 60);
            const sec = timeLeft % 60;
            timerEl.textContent = min + ':' + (sec < 10 ? '0' : '') + sec;
            if (timeLeft <= 300 && timeLeft > 60) timerEl.className = 'timer warning';
            else if (timeLeft <= 60) timerEl.className = 'timer danger';
            if (timeLeft <= 0) clearInterval(timer);
        }, 1000);

        document.querySelectorAll('.option').forEach(opt => {
            opt.addEventListener('click', function() {
                this.parentElement.querySelectorAll('.option').forEach(o => o.classList.remove('selected'));
                this.classList.add('selected');
            });
        });

        function checkAnswers() {
            let correct = 0;
            const total = document.querySelectorAll('.question').length;
            document.querySelectorAll('.question').forEach(q => {
                const answer = q.dataset.answer;
                const selected = q.querySelector('.option.selected');
                const explDiv = q.querySelector('.explanation');
                q.querySelectorAll('.option').forEach(opt => {
                    if (opt.dataset.value === answer) opt.classList.add('correct');
                });
                if (selected) {
                    if (selected.dataset.value === answer) correct++;
                    else selected.classList.add('incorrect');
                }
                if (explDiv) explDiv.style.display = 'block';
            });
            document.getElementById('score').style.display = 'block';
            document.getElementById('score-num').textContent = correct + ' / ' + total;
            document.getElementById('score-pct').textContent = Math.round(correct/total*100) + '%';
            document.getElementById('next-btn').style.display = 'inline-block';
            clearInterval(timer);
        }
    </script>
<div style="text-align: center; padding: 30px 20px; background: #f8fafc; border-top: 1px solid #e5e7eb; margin-top: 40px;"><p style="color: #6b7280; font-size: 0.85rem; margin: 0;">Original JLPT practice content created by <a href="https://nihongo-world.com" style="color: #fb7185; text-decoration: none; font-weight: 500;">Nihon GO! World</a></p><p style="color: #9ca3af; font-size: 0.8rem; margin-top: 8px;">Free for personal use • Government-certified teachers</p></div></body>
</html>
` }} />
    </>
  )
}
