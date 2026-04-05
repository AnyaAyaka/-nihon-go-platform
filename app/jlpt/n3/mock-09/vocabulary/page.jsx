'use client'
import AccessCheck from '../../../AccessCheck'

export default function Page() {
  return (
    <>
      <AccessCheck level="N3" mockNum={9} />
      <div dangerouslySetInnerHTML={{ __html: `<!DOCTYPE html>

<html lang="ja">
<head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>JLPT N3 Vocabulary - MOCK-09 | Nihon GO!</title>
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
<h1>JLPT N3 Mock Test 09 - 語彙</h1>
<div class="nav-back-row">
<a class="nav-back" href="/materials/jlpt/n3/">← 問題一覧</a>
</div>
<div class="nav">
<a class="active" href="vocabulary.html">語彙</a><a href="grammar.html">文法</a><a href="reading.html">読解</a><a href="listening.html">聴解</a>
</div>
<!-- 問題1: 漢字読み -->
<div class="section"><div class="section-title">問題1</div>
<div class="question" data-answer="2">
<div class="question-num">問1</div>
<div class="question-text">このサービスは地域住民に無料で<u>提供</u>されている。</div>
<div class="options">
<div class="option" data-value="1">1. ていこう</div>
<div class="option" data-value="2">2. ていきょう</div>
<div class="option" data-value="3">3. だいこう</div>
<div class="option" data-value="4">4. だいきょう</div>
</div>
<div class="explanation">「提供」は「ていきょう」と読みます。</div>
</div>
<div class="question" data-answer="1">
<div class="question-num">問2</div>
<div class="question-text">この国の経済は急速に<u>発展</u>している。</div>
<div class="options">
<div class="option" data-value="1">1. はってん</div>
<div class="option" data-value="2">2. はつてん</div>
<div class="option" data-value="3">3. ほってん</div>
<div class="option" data-value="4">4. ほつてん</div>
</div>
<div class="explanation">「発展」は「はってん」と読みます。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問3</div>
<div class="question-text">来月のマラソン大会に<u>参加</u>することにした。</div>
<div class="options">
<div class="option" data-value="1">1. さんが</div>
<div class="option" data-value="2">2. ざんか</div>
<div class="option" data-value="3">3. さんか</div>
<div class="option" data-value="4">4. ざんが</div>
</div>
<div class="explanation">「参加」は「さんか」と読みます。</div>
</div>
<div class="question" data-answer="4">
<div class="question-num">問4</div>
<div class="question-text">自分で<u>選択</u>した道を信じて進む。</div>
<div class="options">
<div class="option" data-value="1">1. せんたっく</div>
<div class="option" data-value="2">2. せんだく</div>
<div class="option" data-value="3">3. せんたく</div>
<div class="option" data-value="4">4. せんたく</div>
</div>
<div class="explanation">「選択」は「せんたく」と読みます。</div>
</div>
<div class="question" data-answer="2">
<div class="question-num">問5</div>
<div class="question-text">彼女は<u>困難</u>な状況でも笑顔を失わない。</div>
<div class="options">
<div class="option" data-value="1">1. こんなん</div>
<div class="option" data-value="2">2. こんなん</div>
<div class="option" data-value="3">3. こうなん</div>
<div class="option" data-value="4">4. こんにゅう</div>
</div>
<div class="explanation">「困難」は「こんなん」と読みます。</div>
</div>
<div class="question" data-answer="1">
<div class="question-num">問6</div>
<div class="question-text">新しい<u>規則</u>が来月から適用される。</div>
<div class="options">
<div class="option" data-value="1">1. きそく</div>
<div class="option" data-value="2">2. きっそく</div>
<div class="option" data-value="3">3. ぎそく</div>
<div class="option" data-value="4">4. ぎっそく</div>
</div>
<div class="explanation">「規則」は「きそく」と読みます。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問7</div>
<div class="question-text">この映画は<u>感動</u>的な結末で多くの人が泣いた。</div>
<div class="options">
<div class="option" data-value="1">1. かんとう</div>
<div class="option" data-value="2">2. かんどお</div>
<div class="option" data-value="3">3. かんどう</div>
<div class="option" data-value="4">4. かんとお</div>
</div>
<div class="explanation">「感動」は「かんどう」と読みます。</div>
</div>
<div class="question" data-answer="2">
<div class="question-num">問8</div>
<div class="question-text">彼の<u>判断</u>が会社の方向性を決めた。</div>
<div class="options">
<div class="option" data-value="1">1. はんたん</div>
<div class="option" data-value="2">2. はんだん</div>
<div class="option" data-value="3">3. ばんたん</div>
<div class="option" data-value="4">4. ばんだん</div>
</div>
<div class="explanation">「判断」は「はんだん」と読みます。</div>
</div>
</div>
<!-- 問題2: 漢字書き -->
<div class="section"><div class="section-title">問題2</div>
<div class="question" data-answer="3">
<div class="question-num">問9</div>
<div class="question-text">新しい環境にようやく<u>なれた</u>。</div>
<div class="options">
<div class="option" data-value="1">1. 成れた</div>
<div class="option" data-value="2">2. 馴れた</div>
<div class="option" data-value="3">3. 慣れた</div>
<div class="option" data-value="4">4. 親れた</div>
</div>
<div class="explanation">「なれる（慣れる）」は「慣れた」と書きます。</div>
</div>
<div class="question" data-answer="4">
<div class="question-num">問10</div>
<div class="question-text">地震で建物の壁が<u>こわれた</u>。</div>
<div class="options">
<div class="option" data-value="1">1. 砕れた</div>
<div class="option" data-value="2">2. 割れた</div>
<div class="option" data-value="3">3. 崩れた</div>
<div class="option" data-value="4">4. 壊れた</div>
</div>
<div class="explanation">「こわれる」は「壊れる」と書きます。</div>
</div>
<div class="question" data-answer="2">
<div class="question-num">問11</div>
<div class="question-text">卒業後の進路を自分で<u>きめた</u>。</div>
<div class="options">
<div class="option" data-value="1">1. 定めた</div>
<div class="option" data-value="2">2. 決めた</div>
<div class="option" data-value="3">3. 選めた</div>
<div class="option" data-value="4">4. 定めた</div>
</div>
<div class="explanation">「きめる」は「決める」と書きます。</div>
</div>
<div class="question" data-answer="1">
<div class="question-num">問12</div>
<div class="question-text">チョコレートは体温で<u>とける</u>。</div>
<div class="options">
<div class="option" data-value="1">1. 溶ける</div>
<div class="option" data-value="2">2. 解ける</div>
<div class="option" data-value="3">3. 融ける</div>
<div class="option" data-value="4">4. 流ける</div>
</div>
<div class="explanation">固体が液体になる「とける」は「溶ける」と書きます。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問13</div>
<div class="question-text">彼女は毎朝6時に<u>おきる</u>習慣がある。</div>
<div class="options">
<div class="option" data-value="1">1. 立きる</div>
<div class="option" data-value="2">2. 覚きる</div>
<div class="option" data-value="3">3. 起きる</div>
<div class="option" data-value="4">4. 目きる</div>
</div>
<div class="explanation">「おきる」は「起きる」と書きます。</div>
</div>
<div class="question" data-answer="2">
<div class="question-num">問14</div>
<div class="question-text">駅まで自転車で<u>むかった</u>。</div>
<div class="options">
<div class="option" data-value="1">1. 面かった</div>
<div class="option" data-value="2">2. 向かった</div>
<div class="option" data-value="3">3. 迎かった</div>
<div class="option" data-value="4">4. 進かった</div>
</div>
<div class="explanation">「むかう」は「向かう」と書きます。</div>
</div>
</div>
<!-- 問題3: 文脈規定 -->
<div class="section"><div class="section-title">問題3</div>
<div class="question" data-answer="1">
<div class="question-num">問15</div>
<div class="question-text">健康のために、塩分の（　　）を控えるよう医者に言われた。</div>
<div class="options">
<div class="option" data-value="1">1. 摂取量</div>
<div class="option" data-value="2">2. 生産量</div>
<div class="option" data-value="3">3. 輸出量</div>
<div class="option" data-value="4">4. 販売量</div>
</div>
<div class="explanation">塩分を「摂取する量」を控えるという文脈が適切です。</div>
</div>
<div class="question" data-answer="1">
<div class="question-num">問16</div>
<div class="question-text">引越し後の（　　）として、近所の人にお菓子を持って行った。</div>
<div class="options">
<div class="option" data-value="1">1. 挨拶</div>
<div class="option" data-value="2">2. 荷物</div>
<div class="option" data-value="3">3. 準備</div>
<div class="option" data-value="4">4. 費用</div>
</div>
<div class="explanation">引越し後に近所へお菓子を持参するのは「挨拶」の定番です。</div>
</div>
<div class="question" data-answer="4">
<div class="question-num">問17</div>
<div class="question-text">毎日の（　　）を記録することで、節約意識が高まった。</div>
<div class="options">
<div class="option" data-value="1">1. 予定</div>
<div class="option" data-value="2">2. 体重</div>
<div class="option" data-value="3">3. 気温</div>
<div class="option" data-value="4">4. 出費</div>
</div>
<div class="explanation">節約につながるのは「出費」を記録することです。</div>
</div>
<div class="question" data-answer="2">
<div class="question-num">問18</div>
<div class="question-text">彼女は（　　）が整理されていて、いつも部屋がきれいだ。</div>
<div class="options">
<div class="option" data-value="1">1. 感情</div>
<div class="option" data-value="2">2. 持ち物</div>
<div class="option" data-value="3">3. 言葉</div>
<div class="option" data-value="4">4. 考え</div>
</div>
<div class="explanation">部屋がきれいなのは「持ち物」が整理されているからです。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問19</div>
<div class="question-text">仕事で疲れたときは、好きな音楽を聴いて（　　）している。</div>
<div class="options">
<div class="option" data-value="1">1. 緊張</div>
<div class="option" data-value="2">2. 集中</div>
<div class="option" data-value="3">3. リラックス</div>
<div class="option" data-value="4">4. 運動</div>
</div>
<div class="explanation">疲れを癒すために「リラックスしている」という文脈が適切です。</div>
</div>
<div class="question" data-answer="4">
<div class="question-num">問20</div>
<div class="question-text">彼は（　　）がきいて、相手の気持ちをすぐに察することができる。</div>
<div class="options">
<div class="option" data-value="1">1. 声</div>
<div class="option" data-value="2">2. 体</div>
<div class="option" data-value="3">3. 足</div>
<div class="option" data-value="4">4. 気</div>
</div>
<div class="explanation">「気がきく」は細かいところに気づいて上手に対応できることを表します。</div>
</div>
<div class="question" data-answer="2">
<div class="question-num">問21</div>
<div class="question-text">彼女は毎日の（　　）を細かくつけていて、無駄遣いをしない。</div>
<div class="options">
<div class="option" data-value="1">1. 日記</div>
<div class="option" data-value="2">2. 家計簿</div>
<div class="option" data-value="3">3. スケジュール</div>
<div class="option" data-value="4">4. メモ</div>
</div>
<div class="explanation">毎日の支出を記録するノートを「家計簿」と言います。</div>
</div>
<div class="question" data-answer="2">
<div class="question-num">問22</div>
<div class="question-text">彼女は（　　）が広く、業界の様々な人と繋がっている。</div>
<div class="options">
<div class="option" data-value="1">1. 知識</div>
<div class="option" data-value="2">2. 人脈</div>
<div class="option" data-value="3">3. 体力</div>
<div class="option" data-value="4">4. 記憶力</div>
</div>
<div class="explanation">「人脈が広い」は多くの人とつながりを持っていることを表します。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問23</div>
<div class="question-text">毎日の生活に（　　）を持つことで、心が豊かになる。</div>
<div class="options">
<div class="option" data-value="1">1. 不満</div>
<div class="option" data-value="2">2. 不安</div>
<div class="option" data-value="3">3. 余裕</div>
<div class="option" data-value="4">4. 心配</div>
</div>
<div class="explanation">「余裕を持つことで心が豊かになる」という文脈が適切です。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問24</div>
<div class="question-text">家族が増えたので、毎月の（　　）を細かく管理するようになった。</div>
<div class="options">
<div class="option" data-value="1">1. 趣味</div>
<div class="option" data-value="2">2. 体重</div>
<div class="option" data-value="3">3. 家計</div>
<div class="option" data-value="4">4. 感情</div>
</div>
<div class="explanation">家族が増えてお金の管理が必要になる文脈から「家計」が適切です。</div>
</div>
<div class="question" data-answer="1">
<div class="question-num">問25</div>
<div class="question-text">彼は（　　）の切り替えが早く、失敗してもすぐに次のことを考える。</div>
<div class="options">
<div class="option" data-value="1">1. 感情</div>
<div class="option" data-value="2">2. 時間</div>
<div class="option" data-value="3">3. 体重</div>
<div class="option" data-value="4">4. 言葉</div>
</div>
<div class="explanation">「感情の切り替えが早い」は気持ちの立て直しが早いことを表します。</div>
</div>
</div>
<!-- 問題4: 言い換え類義語 -->
<div class="section"><div class="section-title">問題4</div>
<div class="question" data-answer="2">
<div class="question-num">問26</div>
<div class="question-text">今がその仕事を始める絶好の<u>チャンス</u>だ。</div>
<div class="options">
<div class="option" data-value="1">1. 方法</div>
<div class="option" data-value="2">2. 機会</div>
<div class="option" data-value="3">3. 理由</div>
<div class="option" data-value="4">4. 結果</div>
</div>
<div class="explanation">「チャンス」は「機会」と同じ意味です。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問27</div>
<div class="question-text">彼は頭がいい。<u>しかも</u>、スポーツも得意だ。</div>
<div class="options">
<div class="option" data-value="1">1. しかし</div>
<div class="option" data-value="2">2. だから</div>
<div class="option" data-value="3">3. そのうえ</div>
<div class="option" data-value="4">4. つまり</div>
</div>
<div class="explanation">「しかも」は「そのうえ、さらに」という意味で付け加えを表します。</div>
</div>
<div class="question" data-answer="1">
<div class="question-num">問28</div>
<div class="question-text">新しい靴が足に<u>ぴったり</u>で、とても歩きやすい。</div>
<div class="options">
<div class="option" data-value="1">1. ちょうど合って</div>
<div class="option" data-value="2">2. ふらついて</div>
<div class="option" data-value="3">3. ぐったりして</div>
<div class="option" data-value="4">4. そわそわして</div>
</div>
<div class="explanation">「ぴったり」はちょうど合っている様子を表します。</div>
</div>
<div class="question" data-answer="4">
<div class="question-num">問29</div>
<div class="question-text">悩みを話したら、気持ちが<u>すっきり</u>した。</div>
<div class="options">
<div class="option" data-value="1">1. 重くなった</div>
<div class="option" data-value="2">2. 複雑になった</div>
<div class="option" data-value="3">3. 悪化した</div>
<div class="option" data-value="4">4. 晴れ晴れとした</div>
</div>
<div class="explanation">「すっきり」は気持ちや状態がすがすがしくなる様子を表します。</div>
</div>
<div class="question" data-answer="2">
<div class="question-num">問30</div>
<div class="question-text">海で泳いだ後、体が<u>さっぱり</u>した。</div>
<div class="options">
<div class="option" data-value="1">1. 重くなって</div>
<div class="option" data-value="2">2. さわやかになって</div>
<div class="option" data-value="3">3. 疲れて</div>
<div class="option" data-value="4">4. 汚れて</div>
</div>
<div class="explanation">「さっぱり」は汚れが取れてさわやかになる様子を表します。</div>
</div>
</div>
<!-- 問題5: 用法 -->
<div class="section"><div class="section-title">問題5</div>
<div class="question" data-answer="2">
<div class="question-num">問31</div>
<div class="question-text">つぎの「<strong>ついに</strong>」をつかった文として、いちばんよいものを１・２・３・４からひとつえらんでください。</div>
<div class="options">
<div class="option" data-value="1">1. 彼はついに背が高い。</div>
<div class="option" data-value="2">2. 3年間の研究がついに完成した。</div>
<div class="option" data-value="3">3. ついに今日は暑い。</div>
<div class="option" data-value="4">4. ついに彼女は料理が上手だ。</div>
</div>
<div class="explanation">「ついに」は長い時間や努力の末に結果が出る場面で使います。2が正しい使い方です。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問32</div>
<div class="question-text">つぎの「<strong>とうとう</strong>」をつかった文として、いちばんよいものを１・２・３・４からひとつえらんでください。</div>
<div class="options">
<div class="option" data-value="1">1. 彼はとうとう背が高い。</div>
<div class="option" data-value="2">2. とうとう今日は月曜日だ。</div>
<div class="option" data-value="3">3. 待ち続けた返事がとうとう届いた。</div>
<div class="option" data-value="4">4. とうとう彼女は料理が上手だ。</div>
</div>
<div class="explanation">「とうとう」は長い時間の末についに結果が出る場面で使います。3が正しい使い方です。</div>
</div>
<div class="question" data-answer="4">
<div class="question-num">問33</div>
<div class="question-text">つぎの「<strong>やっと</strong>」をつかった文として、いちばんよいものを１・２・３・４からひとつえらんでください。</div>
<div class="options">
<div class="option" data-value="1">1. 彼はやっと背が高い。</div>
<div class="option" data-value="2">2. やっと今日は晴れている。</div>
<div class="option" data-value="3">3. やっと彼女は背が高い。</div>
<div class="option" data-value="4">4. 長い行列に並んで、やっと入れた。</div>
</div>
<div class="explanation">「やっと」は苦労や待ち時間の末にようやく実現したことを表します。4が正しい使い方です。</div>
</div>
<div class="question" data-answer="1">
<div class="question-num">問34</div>
<div class="question-text">つぎの「<strong>しかも</strong>」をつかった文として、いちばんよいものを１・２・３・４からひとつえらんでください。</div>
<div class="options">
<div class="option" data-value="1">1. この店は安い。しかも、料理がおいしい。</div>
<div class="option" data-value="2">2. 彼はしかも背が高い。</div>
<div class="option" data-value="3">3. しかも今日は暑い。</div>
<div class="option" data-value="4">4. しかも昨日、電車に乗った。</div>
</div>
<div class="explanation">「しかも」は「さらに加えて」という意味で、前の内容に付け加えるときに使います。1が正しい使い方です。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問35</div>
<div class="question-text">つぎの「<strong>そのうえ</strong>」をつかった文として、いちばんよいものを１・２・３・４からひとつえらんでください。</div>
<div class="options">
<div class="option" data-value="1">1. 彼はそのうえ背が高い。</div>
<div class="option" data-value="2">2. そのうえ今日は暑い。</div>
<div class="option" data-value="3">3. 彼女は成績がいい。そのうえ、人柄も素晴らしい。</div>
<div class="option" data-value="4">4. そのうえ昨日、公園を散歩した。</div>
</div>
<div class="explanation">「そのうえ」は「さらに、加えて」という意味です。3が正しい使い方です。</div>
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
