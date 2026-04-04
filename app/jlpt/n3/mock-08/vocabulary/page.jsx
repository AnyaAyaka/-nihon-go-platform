'use client'
export default function Page() {
  return (
    <div dangerouslySetInnerHTML={{ __html: `<!DOCTYPE html>

<html lang="ja">
<head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>JLPT N3 Vocabulary - MOCK-08 | Nihon GO!</title>
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
<h1>JLPT N3 Mock Test 08 - 語彙</h1>
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
<div class="question-text">彼女はがんの<u>研究</u>に一生を捧げた。</div>
<div class="options">
<div class="option" data-value="1">1. けんきゅ</div>
<div class="option" data-value="2">2. けんきゅう</div>
<div class="option" data-value="3">3. けんぎゅ</div>
<div class="option" data-value="4">4. けんぎゅう</div>
</div>
<div class="explanation">「研究」は「けんきゅう」と読みます。</div>
</div>
<div class="question" data-answer="1">
<div class="question-num">問2</div>
<div class="question-text">先生の<u>説明</u>がわかりやすくて、すぐに理解できた。</div>
<div class="options">
<div class="option" data-value="1">1. せつめい</div>
<div class="option" data-value="2">2. せつめ</div>
<div class="option" data-value="3">3. せっめい</div>
<div class="option" data-value="4">4. せっめ</div>
</div>
<div class="explanation">「説明」は「せつめい」と読みます。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問3</div>
<div class="question-text">健康<u>管理</u>のために、毎日体重を測っている。</div>
<div class="options">
<div class="option" data-value="1">1. かんれ</div>
<div class="option" data-value="2">2. かんれい</div>
<div class="option" data-value="3">3. かんり</div>
<div class="option" data-value="4">4. かんりょう</div>
</div>
<div class="explanation">「管理」は「かんり」と読みます。</div>
</div>
<div class="question" data-answer="4">
<div class="question-num">問4</div>
<div class="question-text">プロジェクトがついに<u>完成</u>した。</div>
<div class="options">
<div class="option" data-value="1">1. かんじょう</div>
<div class="option" data-value="2">2. かんそう</div>
<div class="option" data-value="3">3. かんしょう</div>
<div class="option" data-value="4">4. かんせい</div>
</div>
<div class="explanation">「完成」は「かんせい」と読みます。</div>
</div>
<div class="question" data-answer="2">
<div class="question-num">問5</div>
<div class="question-text">環境<u>保護</u>のために、ゴミの分別を徹底している。</div>
<div class="options">
<div class="option" data-value="1">1. ほっご</div>
<div class="option" data-value="2">2. ほご</div>
<div class="option" data-value="3">3. ほっこ</div>
<div class="option" data-value="4">4. ほこ</div>
</div>
<div class="explanation">「保護」は「ほご」と読みます。</div>
</div>
<div class="question" data-answer="1">
<div class="question-num">問6</div>
<div class="question-text">川の<u>汚染</u>が深刻で、魚が住めなくなった。</div>
<div class="options">
<div class="option" data-value="1">1. おせん</div>
<div class="option" data-value="2">2. おぜん</div>
<div class="option" data-value="3">3. こせん</div>
<div class="option" data-value="4">4. こぜん</div>
</div>
<div class="explanation">「汚染」は「おせん」と読みます。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問7</div>
<div class="question-text">この地域では<u>再生</u>可能エネルギーの普及が進んでいる。</div>
<div class="options">
<div class="option" data-value="1">1. さいしょう</div>
<div class="option" data-value="2">2. さいせん</div>
<div class="option" data-value="3">3. さいせい</div>
<div class="option" data-value="4">4. さいしん</div>
</div>
<div class="explanation">「再生」は「さいせい」と読みます。</div>
</div>
<div class="question" data-answer="2">
<div class="question-num">問8</div>
<div class="question-text">森林<u>破壊</u>が進み、多くの動植物が絶滅の危機にある。</div>
<div class="options">
<div class="option" data-value="1">1. はかい</div>
<div class="option" data-value="2">2. はかい</div>
<div class="option" data-value="3">3. はがい</div>
<div class="option" data-value="4">4. はこわし</div>
</div>
<div class="explanation">「破壊」は「はかい」と読みます。</div>
</div>
</div>
<!-- 問題2: 漢字書き -->
<div class="section"><div class="section-title">問題2</div>
<div class="question" data-answer="3">
<div class="question-num">問9</div>
<div class="question-text">彼の才能をみんながようやく<u>みとめた</u>。</div>
<div class="options">
<div class="option" data-value="1">1. 見明めた</div>
<div class="option" data-value="2">2. 見証めた</div>
<div class="option" data-value="3">3. 認めた</div>
<div class="option" data-value="4">4. 確めた</div>
</div>
<div class="explanation">「みとめる」は「認める」と書きます。</div>
</div>
<div class="question" data-answer="2">
<div class="question-num">問10</div>
<div class="question-text">計画を<u>すすめる</u>には、まず予算を確保する必要がある。</div>
<div class="options">
<div class="option" data-value="1">1. 前める</div>
<div class="option" data-value="2">2. 進める</div>
<div class="option" data-value="3">3. 推める</div>
<div class="option" data-value="4">4. 勧める</div>
</div>
<div class="explanation">計画を「すすめる」は「進める」と書きます。</div>
</div>
<div class="question" data-answer="4">
<div class="question-num">問11</div>
<div class="question-text">先輩に荷物を持ってくれるよう<u>たのんだ</u>。</div>
<div class="options">
<div class="option" data-value="1">1. 信んだ</div>
<div class="option" data-value="2">2. 願んだ</div>
<div class="option" data-value="3">3. 依んだ</div>
<div class="option" data-value="4">4. 頼んだ</div>
</div>
<div class="explanation">「たのむ」は「頼む」と書きます。</div>
</div>
<div class="question" data-answer="1">
<div class="question-num">問12</div>
<div class="question-text">漢字を<u>まちがえて</u>書いてしまった。</div>
<div class="options">
<div class="option" data-value="1">1. 間違えて</div>
<div class="option" data-value="2">2. 誤がえて</div>
<div class="option" data-value="3">3. 違えて</div>
<div class="option" data-value="4">4. 外れえて</div>
</div>
<div class="explanation">「まちがえる」は「間違える」と書きます。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問13</div>
<div class="question-text">ゴミを正しく<u>わける</u>ことが環境保護につながる。</div>
<div class="options">
<div class="option" data-value="1">1. 別ける</div>
<div class="option" data-value="2">2. 離ける</div>
<div class="option" data-value="3">3. 分ける</div>
<div class="option" data-value="4">4. 区ける</div>
</div>
<div class="explanation">「わける」は「分ける」と書きます。</div>
</div>
<div class="question" data-answer="2">
<div class="question-num">問14</div>
<div class="question-text">自然を<u>まもる</u>ために、プラスチックの使用を減らす。</div>
<div class="options">
<div class="option" data-value="1">1. 護る</div>
<div class="option" data-value="2">2. 守る</div>
<div class="option" data-value="3">3. 保る</div>
<div class="option" data-value="4">4. 防る</div>
</div>
<div class="explanation">「まもる」は「守る」と書きます。</div>
</div>
</div>
<!-- 問題3: 文脈規定 -->
<div class="section"><div class="section-title">問題3</div>
<div class="question" data-answer="2">
<div class="question-num">問15</div>
<div class="question-text">地球温暖化の（　　）として、海面上昇や異常気象が挙げられる。</div>
<div class="options">
<div class="option" data-value="1">1. 原因</div>
<div class="option" data-value="2">2. 影響</div>
<div class="option" data-value="3">3. 目的</div>
<div class="option" data-value="4">4. 方法</div>
</div>
<div class="explanation">温暖化によって起きることは「影響」と表現します。</div>
</div>
<div class="question" data-answer="4">
<div class="question-num">問16</div>
<div class="question-text">プラスチックごみが海に流れ込み、海洋（　　）が深刻だ。</div>
<div class="options">
<div class="option" data-value="1">1. 保護</div>
<div class="option" data-value="2">2. 開発</div>
<div class="option" data-value="3">3. 回復</div>
<div class="option" data-value="4">4. 汚染</div>
</div>
<div class="explanation">ごみが流れ込んで海が汚れることを「海洋汚染」と言います。</div>
</div>
<div class="question" data-answer="1">
<div class="question-num">問17</div>
<div class="question-text">太陽光や風力などの（　　）エネルギーへの転換が急がれている。</div>
<div class="options">
<div class="option" data-value="1">1. 再生可能</div>
<div class="option" data-value="2">2. 化石</div>
<div class="option" data-value="3">3. 原子力</div>
<div class="option" data-value="4">4. 電気</div>
</div>
<div class="explanation">太陽光や風力は「再生可能エネルギー」の代表例です。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問18</div>
<div class="question-text">工場から出る排水が川に流れ、生態系に（　　）を与えている。</div>
<div class="options">
<div class="option" data-value="1">1. 利益</div>
<div class="option" data-value="2">2. 恵み</div>
<div class="option" data-value="3">3. 悪影響</div>
<div class="option" data-value="4">4. 支援</div>
</div>
<div class="explanation">排水が生態系に「悪影響を与える」という文脈が適切です。</div>
</div>
<div class="question" data-answer="2">
<div class="question-num">問19</div>
<div class="question-text">この地域では、絶滅の（　　）にある動物の保護活動が行われている。</div>
<div class="options">
<div class="option" data-value="1">1. 中心</div>
<div class="option" data-value="2">2. 危機</div>
<div class="option" data-value="3">3. 完全</div>
<div class="option" data-value="4">4. 完成</div>
</div>
<div class="explanation">「絶滅の危機にある」は絶滅しそうな状態を表す定型表現です。</div>
</div>
<div class="question" data-answer="4">
<div class="question-num">問20</div>
<div class="question-text">森林を（　　）することで、CO2の吸収量を増やすことができる。</div>
<div class="options">
<div class="option" data-value="1">1. 破壊</div>
<div class="option" data-value="2">2. 汚染</div>
<div class="option" data-value="3">3. 消費</div>
<div class="option" data-value="4">4. 保全</div>
</div>
<div class="explanation">CO2吸収を増やすためには森林を「保全する」ことが適切です。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問21</div>
<div class="question-text">石油や石炭などの（　　）燃料の使用が、地球温暖化の原因となっている。</div>
<div class="options">
<div class="option" data-value="1">1. 温室効果</div>
<div class="option" data-value="2">2. 再生可能</div>
<div class="option" data-value="3">3. 化石</div>
<div class="option" data-value="4">4. 天然</div>
</div>
<div class="explanation">石油や石炭など、地中に埋蔵された古代の生物が変化したものを「化石燃料」と言います。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問22</div>
<div class="question-text">市民が（　　）に参加し、公園のゴミを拾った。</div>
<div class="options">
<div class="option" data-value="1">1. 競争</div>
<div class="option" data-value="2">2. 可能性</div>
<div class="option" data-value="3">3. ボランティア活動</div>
<div class="option" data-value="4">4. 管理</div>
</div>
<div class="explanation">市民がゴミを拾う活動として「ボランティア活動」が最も適切です。</div>
</div>
<div class="question" data-answer="2">
<div class="question-num">問23</div>
<div class="question-text">この川は水質（　　）が進み、昔のようにきれいな水が戻ってきた。</div>
<div class="options">
<div class="option" data-value="1">1. 悪化</div>
<div class="option" data-value="2">2. 改善</div>
<div class="option" data-value="3">3. 破壊</div>
<div class="option" data-value="4">4. 汚染</div>
</div>
<div class="explanation">きれいな水が戻ってきたという結果から「水質改善」が適切です。</div>
</div>
<div class="question" data-answer="4">
<div class="question-num">問24</div>
<div class="question-text">環境問題は一国だけでは解決できず、国際的な（　　）が必要だ。</div>
<div class="options">
<div class="option" data-value="1">1. 競争</div>
<div class="option" data-value="2">2. 対立</div>
<div class="option" data-value="3">3. 批判</div>
<div class="option" data-value="4">4. 協力</div>
</div>
<div class="explanation">国際的に一緒に取り組むことを「国際的な協力」と言います。</div>
</div>
<div class="question" data-answer="1">
<div class="question-num">問25</div>
<div class="question-text">毎日シャワーの時間を短くすることで、水の（　　）を節約できる。</div>
<div class="options">
<div class="option" data-value="1">1. 使用量</div>
<div class="option" data-value="2">2. 生産量</div>
<div class="option" data-value="3">3. 輸出量</div>
<div class="option" data-value="4">4. 研究量</div>
</div>
<div class="explanation">シャワー時間を短くすると水の「使用量」を節約できます。</div>
</div>
</div>
<!-- 問題4: 言い換え類義語 -->
<div class="section"><div class="section-title">問題4</div>
<div class="question" data-answer="2">
<div class="question-num">問26</div>
<div class="question-text">掃除をするのが<u>おっくう</u>で、つい後回しにしてしまう。</div>
<div class="options">
<div class="option" data-value="1">1. 楽しくて</div>
<div class="option" data-value="2">2. めんどうで</div>
<div class="option" data-value="3">3. 難しくて</div>
<div class="option" data-value="4">4. 簡単で</div>
</div>
<div class="explanation">「おっくう」は「めんどうで気が進まない」という意味です。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問27</div>
<div class="question-text">彼は<u>どうしても</u>その仕事を引き受けたくなかった。</div>
<div class="options">
<div class="option" data-value="1">1. たまに</div>
<div class="option" data-value="2">2. めったに</div>
<div class="option" data-value="3">3. どんなことがあっても</div>
<div class="option" data-value="4">4. いつも</div>
</div>
<div class="explanation">「どうしても」は「どんなことがあっても、絶対に」という意味です。</div>
</div>
<div class="question" data-answer="1">
<div class="question-num">問28</div>
<div class="question-text">疲れて足が<u>ふらふら</u>して、まっすぐ歩けない。</div>
<div class="options">
<div class="option" data-value="1">1. ふらついて</div>
<div class="option" data-value="2">2. ぴかぴかして</div>
<div class="option" data-value="3">3. にこにこして</div>
<div class="option" data-value="4">4. ぐったりして</div>
</div>
<div class="explanation">「ふらふら」はバランスが取れずにふらつく様子を表します。</div>
</div>
<div class="question" data-answer="4">
<div class="question-num">問29</div>
<div class="question-text">頭の中で考えが<u>ぐるぐる</u>して、眠れなかった。</div>
<div class="options">
<div class="option" data-value="1">1. すっきりして</div>
<div class="option" data-value="2">2. ぼんやりして</div>
<div class="option" data-value="3">3. しっかりして</div>
<div class="option" data-value="4">4. 堂々巡りして</div>
</div>
<div class="explanation">「ぐるぐる」は同じことが繰り返し頭を回る状態を表します。</div>
</div>
<div class="question" data-answer="2">
<div class="question-num">問30</div>
<div class="question-text">大事な発表の前で<u>そわそわ</u>している。</div>
<div class="options">
<div class="option" data-value="1">1. ゆったりして</div>
<div class="option" data-value="2">2. 落ち着かなくなって</div>
<div class="option" data-value="3">3. 眠そうにして</div>
<div class="option" data-value="4">4. 怒って</div>
</div>
<div class="explanation">「そわそわ」は緊張や不安で落ち着かない様子を表します。</div>
</div>
</div>
<!-- 問題5: 用法 -->
<div class="section"><div class="section-title">問題5</div>
<div class="question" data-answer="3">
<div class="question-num">問31</div>
<div class="question-text">つぎの「<strong>いっそ</strong>」をつかった文として、いちばんよいものを１・２・３・４からひとつえらんでください。</div>
<div class="options">
<div class="option" data-value="1">1. 彼はいっそ背が高い。</div>
<div class="option" data-value="2">2. いっそ今日は暑い。</div>
<div class="option" data-value="3">3. こんなに悩むなら、いっそやめてしまった方が楽だ。</div>
<div class="option" data-value="4">4. いっそ昨日、映画を見た。</div>
</div>
<div class="explanation">「いっそ」は「思い切って〜した方がいい」という意味です。3が正しい使い方です。</div>
</div>
<div class="question" data-answer="2">
<div class="question-num">問32</div>
<div class="question-text">つぎの「<strong>むしろ</strong>」をつかった文として、いちばんよいものを１・２・３・４からひとつえらんでください。</div>
<div class="options">
<div class="option" data-value="1">1. 彼はむしろ背が高い。</div>
<div class="option" data-value="2">2. 薬を飲んだら、むしろ症状が悪化した。</div>
<div class="option" data-value="3">3. むしろ今日は晴れている。</div>
<div class="option" data-value="4">4. むしろ昨日、電車に乗った。</div>
</div>
<div class="explanation">「むしろ」は「それよりも、逆に」という意味です。2が正しい使い方です。</div>
</div>
<div class="question" data-answer="4">
<div class="question-num">問33</div>
<div class="question-text">つぎの「<strong>かえって</strong>」をつかった文として、いちばんよいものを１・２・３・４からひとつえらんでください。</div>
<div class="options">
<div class="option" data-value="1">1. 彼女はかえって料理が上手だ。</div>
<div class="option" data-value="2">2. かえって今日は月曜日だ。</div>
<div class="option" data-value="3">3. かえって彼は背が高い。</div>
<div class="option" data-value="4">4. 手伝ったつもりが、かえって迷惑をかけてしまった。</div>
</div>
<div class="explanation">「かえって」は「逆に、思っていた結果と反対になった」という意味です。4が正しい使い方です。</div>
</div>
<div class="question" data-answer="1">
<div class="question-num">問34</div>
<div class="question-text">つぎの「<strong>あくまで</strong>」をつかった文として、いちばんよいものを１・２・３・４からひとつえらんでください。</div>
<div class="options">
<div class="option" data-value="1">1. これはあくまで私個人の意見です。</div>
<div class="option" data-value="2">2. 彼はあくまで背が高い。</div>
<div class="option" data-value="3">3. あくまで今日は暑い。</div>
<div class="option" data-value="4">4. あくまで昨日、映画を見た。</div>
</div>
<div class="explanation">「あくまで」は「どこまでも、〜にすぎない」という限定の意味です。1が正しい使い方です。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問35</div>
<div class="question-text">つぎの「<strong>どうしても</strong>」をつかった文として、いちばんよいものを１・２・３・４からひとつえらんでください。</div>
<div class="options">
<div class="option" data-value="1">1. 彼はどうしても背が高い。</div>
<div class="option" data-value="2">2. どうしても今日は暑い。</div>
<div class="option" data-value="3">3. どうしても諦めきれず、もう一度挑戦することにした。</div>
<div class="option" data-value="4">4. どうしても昨日、公園を散歩した。</div>
</div>
<div class="explanation">「どうしても」は「どんなことがあっても、絶対に」という強い意志を表します。3が正しい使い方です。</div>
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
