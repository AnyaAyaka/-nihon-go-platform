'use client'
export default function Page() {
  return (
    <div dangerouslySetInnerHTML={{ __html: `<!DOCTYPE html>

<html lang="ja">
<head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>JLPT N3 Vocabulary - MOCK-10 | Nihon GO!</title>
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
<h1>JLPT N3 Mock Test 10 - 語彙</h1>
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
<div class="question-text">この映画は映画評論家から高い<u>評価</u>を受けた。</div>
<div class="options">
<div class="option" data-value="1">1. ひょうが</div>
<div class="option" data-value="2">2. ひょうがく</div>
<div class="option" data-value="3">3. ひょうか</div>
<div class="option" data-value="4">4. ひょうかく</div>
</div>
<div class="explanation">「評価」は「ひょうか」と読みます。</div>
</div>
<div class="question" data-answer="2">
<div class="question-num">問2</div>
<div class="question-text">この図書館はどなたでも無料で<u>利用</u>できる。</div>
<div class="options">
<div class="option" data-value="1">1. りょう</div>
<div class="option" data-value="2">2. りよう</div>
<div class="option" data-value="3">3. りょうく</div>
<div class="option" data-value="4">4. りよく</div>
</div>
<div class="explanation">「利用」は「りよう」と読みます。</div>
</div>
<div class="question" data-answer="1">
<div class="question-num">問3</div>
<div class="question-text">環境問題への<u>意識</u>が、若い世代を中心に高まっている。</div>
<div class="options">
<div class="option" data-value="1">1. いしき</div>
<div class="option" data-value="2">2. いしく</div>
<div class="option" data-value="3">3. いちしき</div>
<div class="option" data-value="4">4. いちしく</div>
</div>
<div class="explanation">「意識」は「いしき」と読みます。</div>
</div>
<div class="question" data-answer="4">
<div class="question-num">問4</div>
<div class="question-text">食事と健康には密接な<u>関係</u>がある。</div>
<div class="options">
<div class="option" data-value="1">1. かんこう</div>
<div class="option" data-value="2">2. かんけい</div>
<div class="option" data-value="3">3. かんこうく</div>
<div class="option" data-value="4">4. かんけい</div>
</div>
<div class="explanation">「関係」は「かんけい」と読みます。</div>
</div>
<div class="question" data-answer="2">
<div class="question-num">問5</div>
<div class="question-text">毎月の収入と支出を<u>記録</u>して、家計を管理している。</div>
<div class="options">
<div class="option" data-value="1">1. きろ</div>
<div class="option" data-value="2">2. きろく</div>
<div class="option" data-value="3">3. けいろ</div>
<div class="option" data-value="4">4. けいろく</div>
</div>
<div class="explanation">「記録」は「きろく」と読みます。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問6</div>
<div class="question-text">彼女の<u>努力</u>が実を結び、夢を叶えた。</div>
<div class="options">
<div class="option" data-value="1">1. とりょく</div>
<div class="option" data-value="2">2. とりよく</div>
<div class="option" data-value="3">3. どりょく</div>
<div class="option" data-value="4">4. どりよく</div>
</div>
<div class="explanation">「努力」は「どりょく」と読みます。</div>
</div>
<div class="question" data-answer="1">
<div class="question-num">問7</div>
<div class="question-text">このシステムは多くの企業で<u>採用</u>されている。</div>
<div class="options">
<div class="option" data-value="1">1. さいよう</div>
<div class="option" data-value="2">2. さいよ</div>
<div class="option" data-value="3">3. ざいよう</div>
<div class="option" data-value="4">4. ざいよ</div>
</div>
<div class="explanation">「採用」は「さいよう」と読みます。</div>
</div>
<div class="question" data-answer="4">
<div class="question-num">問8</div>
<div class="question-text">この店は地元の<u>食材</u>を使った料理が自慢だ。</div>
<div class="options">
<div class="option" data-value="1">1. しょくぶつ</div>
<div class="option" data-value="2">2. しょくひん</div>
<div class="option" data-value="3">3. しょくじ</div>
<div class="option" data-value="4">4. しょくざい</div>
</div>
<div class="explanation">「食材」は「しょくざい」と読みます。</div>
</div>
</div>
<!-- 問題2: 漢字書き -->
<div class="section"><div class="section-title">問題2</div>
<div class="question" data-answer="3">
<div class="question-num">問9</div>
<div class="question-text">試験が終わったが、まだ不安が<u>のこっている</u>。</div>
<div class="options">
<div class="option" data-value="1">1. 後こっている</div>
<div class="option" data-value="2">2. 余こっている</div>
<div class="option" data-value="3">3. 残っている</div>
<div class="option" data-value="4">4. 留こっている</div>
</div>
<div class="explanation">「のこる」は「残る」と書きます。</div>
</div>
<div class="question" data-answer="2">
<div class="question-num">問10</div>
<div class="question-text">重い荷物をトラックで<u>はこんだ</u>。</div>
<div class="options">
<div class="option" data-value="1">1. 移んだ</div>
<div class="option" data-value="2">2. 運んだ</div>
<div class="option" data-value="3">3. 送んだ</div>
<div class="option" data-value="4">4. 配んだ</div>
</div>
<div class="explanation">「はこぶ」は「運ぶ」と書きます。</div>
</div>
<div class="question" data-answer="4">
<div class="question-num">問11</div>
<div class="question-text">彼の実力をようやく周りが<u>みとめた</u>。</div>
<div class="options">
<div class="option" data-value="1">1. 見知めた</div>
<div class="option" data-value="2">2. 確めた</div>
<div class="option" data-value="3">3. 証めた</div>
<div class="option" data-value="4">4. 認めた</div>
</div>
<div class="explanation">「みとめる」は「認める」と書きます。</div>
</div>
<div class="question" data-answer="1">
<div class="question-num">問12</div>
<div class="question-text">必要なものを全部<u>そろえた</u>から、準備は完了だ。</div>
<div class="options">
<div class="option" data-value="1">1. 揃えた</div>
<div class="option" data-value="2">2. 集えた</div>
<div class="option" data-value="3">3. 整えた</div>
<div class="option" data-value="4">4. 備えた</div>
</div>
<div class="explanation">「そろえる」は「揃える」と書きます。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問13</div>
<div class="question-text">この機械は古くなったので、新しいものに<u>とりかえた</u>。</div>
<div class="options">
<div class="option" data-value="1">1. 取変えた</div>
<div class="option" data-value="2">2. 取換えた</div>
<div class="option" data-value="3">3. 取り替えた</div>
<div class="option" data-value="4">4. 取り変えた</div>
</div>
<div class="explanation">「とりかえる」は「取り替える」と書きます。</div>
</div>
<div class="question" data-answer="2">
<div class="question-num">問14</div>
<div class="question-text">父の会社は長年にわたって地域社会に<u>こうけん</u>してきた。</div>
<div class="options">
<div class="option" data-value="1">1. 工献</div>
<div class="option" data-value="2">2. 貢献</div>
<div class="option" data-value="3">3. 功献</div>
<div class="option" data-value="4">4. 公献</div>
</div>
<div class="explanation">「こうけん」は「貢献」と書きます。</div>
</div>
</div>
<!-- 問題3: 文脈規定 -->
<div class="section"><div class="section-title">問題3</div>
<div class="question" data-answer="2">
<div class="question-num">問15</div>
<div class="question-text">駅前に新しいビルが（　　）し、街の雰囲気が変わった。</div>
<div class="options">
<div class="option" data-value="1">1. 消費</div>
<div class="option" data-value="2">2. 完成</div>
<div class="option" data-value="3">3. 販売</div>
<div class="option" data-value="4">4. 利用</div>
</div>
<div class="explanation">建物ができあがることを「完成する」と言います。</div>
</div>
<div class="question" data-answer="4">
<div class="question-num">問16</div>
<div class="question-text">毎月の（　　）を記録して、無駄遣いを減らすようにした。</div>
<div class="options">
<div class="option" data-value="1">1. 体重</div>
<div class="option" data-value="2">2. 気温</div>
<div class="option" data-value="3">3. 予定</div>
<div class="option" data-value="4">4. 支出</div>
</div>
<div class="explanation">お金の出費を「支出」と言います。</div>
</div>
<div class="question" data-answer="1">
<div class="question-num">問17</div>
<div class="question-text">この店は（　　）時間が長く、朝9時から夜11時まで開いている。</div>
<div class="options">
<div class="option" data-value="1">1. 営業</div>
<div class="option" data-value="2">2. 消費</div>
<div class="option" data-value="3">3. 節約</div>
<div class="option" data-value="4">4. 購入</div>
</div>
<div class="explanation">お店が開いて仕事をすることを「営業」と言います。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問18</div>
<div class="question-text">新しい仕事に就いてから（　　）が増え、生活が楽になった。</div>
<div class="options">
<div class="option" data-value="1">1. 費用</div>
<div class="option" data-value="2">2. 消費</div>
<div class="option" data-value="3">3. 収入</div>
<div class="option" data-value="4">4. 販売</div>
</div>
<div class="explanation">仕事で得るお金を「収入」と言います。</div>
</div>
<div class="question" data-answer="4">
<div class="question-num">問19</div>
<div class="question-text">旅行のために毎月少しずつ（　　）している。</div>
<div class="options">
<div class="option" data-value="1">1. 営業</div>
<div class="option" data-value="2">2. 消費</div>
<div class="option" data-value="3">3. 支出</div>
<div class="option" data-value="4">4. 貯金</div>
</div>
<div class="explanation">お金をためることを「貯金する」と言います。</div>
</div>
<div class="question" data-answer="1">
<div class="question-num">問20</div>
<div class="question-text">電気の（　　）を減らすため、こまめに電気を消すようにした。</div>
<div class="options">
<div class="option" data-value="1">1. 使用量</div>
<div class="option" data-value="2">2. 収入</div>
<div class="option" data-value="3">3. 販売</div>
<div class="option" data-value="4">4. 節約</div>
</div>
<div class="explanation">使う量を「使用量」と言います。</div>
</div>
<div class="question" data-answer="2">
<div class="question-num">問21</div>
<div class="question-text">この商品は（　　）が下がったので、買いやすくなった。</div>
<div class="options">
<div class="option" data-value="1">1. 営業</div>
<div class="option" data-value="2">2. 価格</div>
<div class="option" data-value="3">3. 貯金</div>
<div class="option" data-value="4">4. 収入</div>
</div>
<div class="explanation">商品の値段を「価格」と言います。</div>
</div>
<div class="question" data-answer="4">
<div class="question-num">問22</div>
<div class="question-text">図書館やスポーツ施設など、市民が（　　）できる施設が充実している。</div>
<div class="options">
<div class="option" data-value="1">1. 販売</div>
<div class="option" data-value="2">2. 貯金</div>
<div class="option" data-value="3">3. 収入</div>
<div class="option" data-value="4">4. 利用</div>
</div>
<div class="explanation">サービスや施設を使うことを「利用する」と言います。</div>
</div>
<div class="question" data-answer="1">
<div class="question-num">問23</div>
<div class="question-text">彼は（　　）が上手で、限られたお金で生活を楽しんでいる。</div>
<div class="options">
<div class="option" data-value="1">1. 節約</div>
<div class="option" data-value="2">2. 営業</div>
<div class="option" data-value="3">3. 消費</div>
<div class="option" data-value="4">4. 販売</div>
</div>
<div class="explanation">お金や資源を無駄なく使うことを「節約」と言います。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問24</div>
<div class="question-text">この（　　）は品質が高く、多くのお客さんに人気だ。</div>
<div class="options">
<div class="option" data-value="1">1. 収入</div>
<div class="option" data-value="2">2. 節約</div>
<div class="option" data-value="3">3. 商品</div>
<div class="option" data-value="4">4. 費用</div>
</div>
<div class="explanation">売り買いされるものを「商品」と言います。</div>
</div>
<div class="question" data-answer="2">
<div class="question-num">問25</div>
<div class="question-text">海外旅行には（　　）がかかるので、しっかり準備が必要だ。</div>
<div class="options">
<div class="option" data-value="1">1. 商品</div>
<div class="option" data-value="2">2. 費用</div>
<div class="option" data-value="3">3. 営業</div>
<div class="option" data-value="4">4. 貯金</div>
</div>
<div class="explanation">何かをするためにかかるお金を「費用」と言います。</div>
</div>
</div>
<!-- 問題4: 言い換え類義語 -->
<div class="section"><div class="section-title">問題4</div>
<div class="question" data-answer="2">
<div class="question-num">問26</div>
<div class="question-text">どんな困難も<u>乗り越えて</u>、彼は成功した。</div>
<div class="options">
<div class="option" data-value="1">1. 無視して</div>
<div class="option" data-value="2">2. 克服して</div>
<div class="option" data-value="3">3. 逃げて</div>
<div class="option" data-value="4">4. 忘れて</div>
</div>
<div class="explanation">「乗り越える」は「克服する、困難を超える」という意味です。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問27</div>
<div class="question-text">鍵を閉めたかどうか<u>うっかり</u>忘れてしまった。</div>
<div class="options">
<div class="option" data-value="1">1. わざと</div>
<div class="option" data-value="2">2. しっかり</div>
<div class="option" data-value="3">3. 不注意で</div>
<div class="option" data-value="4">4. 急いで</div>
</div>
<div class="explanation">「うっかり」は「不注意で、うかつにも」という意味です。</div>
</div>
<div class="question" data-answer="1">
<div class="question-num">問28</div>
<div class="question-text">試験勉強を<u>じっくり</u>取り組んだ結果、合格できた。</div>
<div class="options">
<div class="option" data-value="1">1. 時間をかけて丁寧に</div>
<div class="option" data-value="2">2. 急いで</div>
<div class="option" data-value="3">3. 適当に</div>
<div class="option" data-value="4">4. 慌てて</div>
</div>
<div class="explanation">「じっくり」は「時間をかけてじっくりと、丁寧に」という意味です。</div>
</div>
<div class="question" data-answer="4">
<div class="question-num">問29</div>
<div class="question-text">温泉に入って<u>ゆったり</u>できた。</div>
<div class="options">
<div class="option" data-value="1">1. 忙しく</div>
<div class="option" data-value="2">2. 慌ただしく</div>
<div class="option" data-value="3">3. 緊張して</div>
<div class="option" data-value="4">4. のんびりと</div>
</div>
<div class="explanation">「ゆったり」はゆとりを持ってのんびりしている様子を表します。</div>
</div>
<div class="question" data-answer="2">
<div class="question-num">問30</div>
<div class="question-text">子供たちが公園で<u>のびのび</u>遊んでいる。</div>
<div class="options">
<div class="option" data-value="1">1. 窮屈そうに</div>
<div class="option" data-value="2">2. 自由に伸び伸びと</div>
<div class="option" data-value="3">3. 静かに</div>
<div class="option" data-value="4">4. 真剣に</div>
</div>
<div class="explanation">「のびのび」は制限なく自由にのびやかな様子を表します。</div>
</div>
</div>
<!-- 問題5: 用法 -->
<div class="section"><div class="section-title">問題5</div>
<div class="question" data-answer="3">
<div class="question-num">問31</div>
<div class="question-text">つぎの「<strong>だいたい</strong>」をつかった文として、いちばんよいものを１・２・３・４からひとつえらんでください。</div>
<div class="options">
<div class="option" data-value="1">1. 彼はだいたい背が高い。</div>
<div class="option" data-value="2">2. だいたい今日は暑い。</div>
<div class="option" data-value="3">3. この仕事はだいたい3時間で終わる。</div>
<div class="option" data-value="4">4. だいたい昨日、映画を見た。</div>
</div>
<div class="explanation">「だいたい」は「おおよそ、ほぼ」という意味です。3が正しい使い方です。</div>
</div>
<div class="question" data-answer="2">
<div class="question-num">問32</div>
<div class="question-text">つぎの「<strong>おおよそ</strong>」をつかった文として、いちばんよいものを１・２・３・４からひとつえらんでください。</div>
<div class="options">
<div class="option" data-value="1">1. 彼はおおよそ背が高い。</div>
<div class="option" data-value="2">2. 参加者はおおよそ100名でした。</div>
<div class="option" data-value="3">3. おおよそ今日は晴れている。</div>
<div class="option" data-value="4">4. おおよそ昨日、電車に乗った。</div>
</div>
<div class="explanation">「おおよそ」は「おおむね、だいたい」という意味です。2が正しい使い方です。</div>
</div>
<div class="question" data-answer="4">
<div class="question-num">問33</div>
<div class="question-text">つぎの「<strong>ほぼ</strong>」をつかった文として、いちばんよいものを１・２・３・４からひとつえらんでください。</div>
<div class="options">
<div class="option" data-value="1">1. 彼はほぼ背が高い。</div>
<div class="option" data-value="2">2. ほぼ今日は暑い。</div>
<div class="option" data-value="3">3. ほぼ昨日、映画を見た。</div>
<div class="option" data-value="4">4. 準備はほぼ完了した。</div>
</div>
<div class="explanation">「ほぼ」は「だいたい、ほとんど」という意味です。4が正しい使い方です。</div>
</div>
<div class="question" data-answer="1">
<div class="question-num">問34</div>
<div class="question-text">つぎの「<strong>ぼんやり</strong>」をつかった文として、いちばんよいものを１・２・３・４からひとつえらんでください。</div>
<div class="options">
<div class="option" data-value="1">1. 疲れて、ぼんやりと空を見ていた。</div>
<div class="option" data-value="2">2. 彼はぼんやり背が高い。</div>
<div class="option" data-value="3">3. ぼんやり今日は暑い。</div>
<div class="option" data-value="4">4. ぼんやり昨日、公園を散歩した。</div>
</div>
<div class="explanation">「ぼんやり」はぼうっとして集中できていない様子を表します。1が正しい使い方です。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問35</div>
<div class="question-text">つぎの「<strong>うっかり</strong>」をつかった文として、いちばんよいものを１・２・３・４からひとつえらんでください。</div>
<div class="options">
<div class="option" data-value="1">1. 彼はうっかり背が高い。</div>
<div class="option" data-value="2">2. うっかり今日は月曜日だ。</div>
<div class="option" data-value="3">3. 大事な約束をうっかり忘れてしまった。</div>
<div class="option" data-value="4">4. うっかり彼女は料理が上手だ。</div>
</div>
<div class="explanation">「うっかり」は不注意で何かをしてしまったときに使います。3が正しい使い方です。</div>
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
  )
}
