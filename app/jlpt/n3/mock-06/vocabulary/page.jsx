'use client'
import AccessCheck from '../../../AccessCheck'

export default function Page() {
  return (
    <>
      <AccessCheck level="N3" mockNum={6} />
      <div dangerouslySetInnerHTML={{ __html: `<!DOCTYPE html>

<html lang="ja">
<head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>JLPT N3 Vocabulary - MOCK-06 | Nihon GO!</title>
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
<h1>JLPT N3 Mock Test 06 - 語彙</h1>
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
<div class="question-text">交差点で<u>事故</u>が起きて、道路が渋滞している。</div>
<div class="options">
<div class="option" data-value="1">1. じこう</div>
<div class="option" data-value="2">2. じこ</div>
<div class="option" data-value="3">3. しこう</div>
<div class="option" data-value="4">4. しこ</div>
</div>
<div class="explanation">「事故」は「じこ」と読みます。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問2</div>
<div class="question-text">旅行の<u>費用</u>を節約するために、早めに予約した。</div>
<div class="options">
<div class="option" data-value="1">1. ひよ</div>
<div class="option" data-value="2">2. ひよく</div>
<div class="option" data-value="3">3. ひよう</div>
<div class="option" data-value="4">4. ひよく</div>
</div>
<div class="explanation">「費用」は「ひよう」と読みます。</div>
</div>
<div class="question" data-answer="1">
<div class="question-num">問3</div>
<div class="question-text">毎朝早起きする<u>習慣</u>が健康につながっている。</div>
<div class="options">
<div class="option" data-value="1">1. しゅうかん</div>
<div class="option" data-value="2">2. しゅかん</div>
<div class="option" data-value="3">3. じゅうかん</div>
<div class="option" data-value="4">4. じゅかん</div>
</div>
<div class="explanation">「習慣」は「しゅうかん」と読みます。</div>
</div>
<div class="question" data-answer="2">
<div class="question-num">問4</div>
<div class="question-text">長年の<u>努力</u>が実を結び、夢を達成した。</div>
<div class="options">
<div class="option" data-value="1">1. どりよく</div>
<div class="option" data-value="2">2. どりょく</div>
<div class="option" data-value="3">3. とりよく</div>
<div class="option" data-value="4">4. とりょく</div>
</div>
<div class="explanation">「努力」は「どりょく」と読みます。</div>
</div>
<div class="question" data-answer="4">
<div class="question-num">問5</div>
<div class="question-text">この地域は<u>治安</u>がよく、夜でも安全に歩ける。</div>
<div class="options">
<div class="option" data-value="1">1. ちあん</div>
<div class="option" data-value="2">2. じあん</div>
<div class="option" data-value="3">3. ちがん</div>
<div class="option" data-value="4">4. ちあん</div>
</div>
<div class="explanation">「治安」は「ちあん」と読みます。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問6</div>
<div class="question-text">新しい<u>制度</u>が導入されて、働き方が変わった。</div>
<div class="options">
<div class="option" data-value="1">1. せいと</div>
<div class="option" data-value="2">2. せいとう</div>
<div class="option" data-value="3">3. せいど</div>
<div class="option" data-value="4">4. せいどう</div>
</div>
<div class="explanation">「制度」は「せいど」と読みます。</div>
</div>
<div class="question" data-answer="1">
<div class="question-num">問7</div>
<div class="question-text">この工場では毎日大量に製品を<u>生産</u>している。</div>
<div class="options">
<div class="option" data-value="1">1. せいさん</div>
<div class="option" data-value="2">2. せいざん</div>
<div class="option" data-value="3">3. しょうさん</div>
<div class="option" data-value="4">4. しょうざん</div>
</div>
<div class="explanation">「生産」は「せいさん」と読みます。</div>
</div>
<div class="question" data-answer="2">
<div class="question-num">問8</div>
<div class="question-text">彼の<u>発言</u>が会議の雰囲気を変えた。</div>
<div class="options">
<div class="option" data-value="1">1. はつこと</div>
<div class="option" data-value="2">2. はつげん</div>
<div class="option" data-value="3">3. はっこと</div>
<div class="option" data-value="4">4. はっげん</div>
</div>
<div class="explanation">「発言」は「はつげん」と読みます。</div>
</div>
</div>
<!-- 問題2: 漢字書き -->
<div class="section"><div class="section-title">問題2</div>
<div class="question" data-answer="3">
<div class="question-num">問9</div>
<div class="question-text">どんなに難しくても、<u>あきらめない</u>ことが大切だ。</div>
<div class="options">
<div class="option" data-value="1">1. 飽きらめない</div>
<div class="option" data-value="2">2. 空きらめない</div>
<div class="option" data-value="3">3. 諦めない</div>
<div class="option" data-value="4">4. 明きらめない</div>
</div>
<div class="explanation">「あきらめる」は「諦める」と書きます。</div>
</div>
<div class="question" data-answer="2">
<div class="question-num">問10</div>
<div class="question-text">彼女は3人の子供を一人で<u>そだてた</u>。</div>
<div class="options">
<div class="option" data-value="1">1. 成てた</div>
<div class="option" data-value="2">2. 育てた</div>
<div class="option" data-value="3">3. 養てた</div>
<div class="option" data-value="4">4. 生てた</div>
</div>
<div class="explanation">「そだてる」は「育てる」と書きます。</div>
</div>
<div class="question" data-answer="1">
<div class="question-num">問11</div>
<div class="question-text">駅に<u>むかって</u>歩いていたら、雨が降り始めた。</div>
<div class="options">
<div class="option" data-value="1">1. 向かって</div>
<div class="option" data-value="2">2. 迎かって</div>
<div class="option" data-value="3">3. 前かって</div>
<div class="option" data-value="4">4. 面かって</div>
</div>
<div class="explanation">「むかう」は「向かう」と書きます。</div>
</div>
<div class="question" data-answer="4">
<div class="question-num">問12</div>
<div class="question-text">マラソンで初めて42kmを<u>こえた</u>とき、感動した。</div>
<div class="options">
<div class="option" data-value="1">1. 越えた</div>
<div class="option" data-value="2">2. 渡えた</div>
<div class="option" data-value="3">3. 抜えた</div>
<div class="option" data-value="4">4. 超えた</div>
</div>
<div class="explanation">距離を「こえる」は「超える」と書きます。</div>
</div>
<div class="question" data-answer="2">
<div class="question-num">問13</div>
<div class="question-text">彼は会議中も<u>おだやかな</u>表情を崩さなかった。</div>
<div class="options">
<div class="option" data-value="1">1. 平やかな</div>
<div class="option" data-value="2">2. 穏やかな</div>
<div class="option" data-value="3">3. 和やかな</div>
<div class="option" data-value="4">4. 静やかな</div>
</div>
<div class="explanation">「おだやか」は「穏やか」と書きます。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問14</div>
<div class="question-text">この問題を<u>かいけつ</u>するには時間がかかりそうだ。</div>
<div class="options">
<div class="option" data-value="1">1. 回結</div>
<div class="option" data-value="2">2. 解消</div>
<div class="option" data-value="3">3. 解決</div>
<div class="option" data-value="4">4. 改決</div>
</div>
<div class="explanation">「かいけつ」は「解決」と書きます。</div>
</div>
</div>
<!-- 問題3: 文脈規定 -->
<div class="section"><div class="section-title">問題3</div>
<div class="question" data-answer="3">
<div class="question-num">問15</div>
<div class="question-text">地震の（　　）で、電車が長時間止まってしまった。</div>
<div class="options">
<div class="option" data-value="1">1. 成果</div>
<div class="option" data-value="2">2. 原料</div>
<div class="option" data-value="3">3. 影響</div>
<div class="option" data-value="4">4. 関係</div>
</div>
<div class="explanation">地震が原因で電車が止まることを「影響」と表現します。</div>
</div>
<div class="question" data-answer="1">
<div class="question-num">問16</div>
<div class="question-text">（　　）に関するニュースが増え、環境問題への意識が高まっている。</div>
<div class="options">
<div class="option" data-value="1">1. 温暖化</div>
<div class="option" data-value="2">2. 観光化</div>
<div class="option" data-value="3">3. 電子化</div>
<div class="option" data-value="4">4. 近代化</div>
</div>
<div class="explanation">環境問題の代表的なテーマとして「温暖化」が最も適切です。</div>
</div>
<div class="question" data-answer="4">
<div class="question-num">問17</div>
<div class="question-text">この法律は国民の生活を（　　）するために作られた。</div>
<div class="options">
<div class="option" data-value="1">1. 批判</div>
<div class="option" data-value="2">2. 競争</div>
<div class="option" data-value="3">3. 利用</div>
<div class="option" data-value="4">4. 保護</div>
</div>
<div class="explanation">法律が国民のために「保護」するという文脈が適切です。</div>
</div>
<div class="question" data-answer="2">
<div class="question-num">問18</div>
<div class="question-text">彼の（　　）な発言が多くの人を傷つけてしまった。</div>
<div class="options">
<div class="option" data-value="1">1. 丁寧</div>
<div class="option" data-value="2">2. 無責任</div>
<div class="option" data-value="3">3. 冷静</div>
<div class="option" data-value="4">4. 真剣</div>
</div>
<div class="explanation">人を傷つける発言の形容として「無責任」が唯一適切です。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問19</div>
<div class="question-text">会議で新しい提案が（　　）され、来月から実施することになった。</div>
<div class="options">
<div class="option" data-value="1">1. 批判</div>
<div class="option" data-value="2">2. 否定</div>
<div class="option" data-value="3">3. 承認</div>
<div class="option" data-value="4">4. 延期</div>
</div>
<div class="explanation">提案が通って実施されるのは「承認」されたからです。</div>
</div>
<div class="question" data-answer="1">
<div class="question-num">問20</div>
<div class="question-text">試験に（　　）するために、毎日3時間勉強している。</div>
<div class="options">
<div class="option" data-value="1">1. 合格</div>
<div class="option" data-value="2">2. 成功</div>
<div class="option" data-value="3">3. 到着</div>
<div class="option" data-value="4">4. 発表</div>
</div>
<div class="explanation">試験のために勉強する目的として「合格」が唯一適切です。</div>
</div>
<div class="question" data-answer="4">
<div class="question-num">問21</div>
<div class="question-text">彼女は（　　）に強く、失敗してもすぐに立ち直る。</div>
<div class="options">
<div class="option" data-value="1">1. 感情</div>
<div class="option" data-value="2">2. 印象</div>
<div class="option" data-value="3">3. 記憶</div>
<div class="option" data-value="4">4. 精神的</div>
</div>
<div class="explanation">「精神的に強い」は困難に負けない強さを表します。</div>
</div>
<div class="question" data-answer="2">
<div class="question-num">問22</div>
<div class="question-text">彼は（　　）な性格で、いつも周りの人を笑わせる。</div>
<div class="options">
<div class="option" data-value="1">1. 深刻</div>
<div class="option" data-value="2">2. 陽気</div>
<div class="option" data-value="3">3. 慎重</div>
<div class="option" data-value="4">4. 無責任</div>
</div>
<div class="explanation">「陽気な性格」は明るく楽しい性格を表します。周りを笑わせるという文脈に合います。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問23</div>
<div class="question-text">この地域では（　　）が深刻で、若者が都市部に流出している。</div>
<div class="options">
<div class="option" data-value="1">1. 人気</div>
<div class="option" data-value="2">2. 成長</div>
<div class="option" data-value="3">3. 過疎化</div>
<div class="option" data-value="4">4. 発展</div>
</div>
<div class="explanation">若者が流出して人口が減ることを「過疎化」と言います。</div>
</div>
<div class="question" data-answer="1">
<div class="question-num">問24</div>
<div class="question-text">政府は経済の（　　）のために、様々な政策を打ち出している。</div>
<div class="options">
<div class="option" data-value="1">1. 活性化</div>
<div class="option" data-value="2">2. 悪化</div>
<div class="option" data-value="3">3. 停止</div>
<div class="option" data-value="4">4. 縮小</div>
</div>
<div class="explanation">経済をよくするための政策の目的として「活性化」が適切です。</div>
</div>
<div class="question" data-answer="4">
<div class="question-num">問25</div>
<div class="question-text">彼は感情に流されず（　　）に話し合いを進めた。</div>
<div class="options">
<div class="option" data-value="1">1. あいまい</div>
<div class="option" data-value="2">2. 感情的</div>
<div class="option" data-value="3">3. 遠慮がち</div>
<div class="option" data-value="4">4. 論理的</div>
</div>
<div class="explanation">「感情に流されず」という条件から、「論理的に」が唯一適切です。</div>
</div>
</div>
<!-- 問題4: 言い換え類義語 -->
<div class="section"><div class="section-title">問題4</div>
<div class="question" data-answer="3">
<div class="question-num">問26</div>
<div class="question-text">彼女は長い努力の末に、<u>ついに</u>夢を実現した。</div>
<div class="options">
<div class="option" data-value="1">1. たちまち</div>
<div class="option" data-value="2">2. さっそく</div>
<div class="option" data-value="3">3. とうとう</div>
<div class="option" data-value="4">4. いきなり</div>
</div>
<div class="explanation">「ついに」は「とうとう」と同じ意味で、長い時間や努力の末に結果が出ることを表します。</div>
</div>
<div class="question" data-answer="2">
<div class="question-num">問27</div>
<div class="question-text">彼はどんな仕事も<u>こなす</u>ことができる。</div>
<div class="options">
<div class="option" data-value="1">1. 始める</div>
<div class="option" data-value="2">2. やり遂げる</div>
<div class="option" data-value="3">3. 断る</div>
<div class="option" data-value="4">4. 楽しむ</div>
</div>
<div class="explanation">「こなす」は「やり遂げる・うまく処理する」という意味です。</div>
</div>
<div class="question" data-answer="1">
<div class="question-num">問28</div>
<div class="question-text">赤ちゃんが<u>にこにこ</u>しながら手を振っている。</div>
<div class="options">
<div class="option" data-value="1">1. 楽しそうに笑いながら</div>
<div class="option" data-value="2">2. 泣きながら</div>
<div class="option" data-value="3">3. 怒りながら</div>
<div class="option" data-value="4">4. 眠そうにしながら</div>
</div>
<div class="explanation">「にこにこ」は楽しそうに笑っている様子を表します。</div>
</div>
<div class="question" data-answer="4">
<div class="question-num">問29</div>
<div class="question-text">長時間歩いて、体が<u>ぐったり</u>している。</div>
<div class="options">
<div class="option" data-value="1">1. 元気いっぱいで</div>
<div class="option" data-value="2">2. すっきりして</div>
<div class="option" data-value="3">3. わくわくして</div>
<div class="option" data-value="4">4. 疲れ果てて</div>
</div>
<div class="explanation">「ぐったり」は疲れ果てて力が抜けた状態を表します。</div>
</div>
<div class="question" data-answer="2">
<div class="question-num">問30</div>
<div class="question-text">雨上がりで窓ガラスが<u>ぴかぴか</u>に光っている。</div>
<div class="options">
<div class="option" data-value="1">1. 汚れて</div>
<div class="option" data-value="2">2. きれいに輝いて</div>
<div class="option" data-value="3">3. 曇って</div>
<div class="option" data-value="4">4. 割れて</div>
</div>
<div class="explanation">「ぴかぴか」はきれいに光り輝いている様子を表します。</div>
</div>
</div>
<!-- 問題5: 用法 -->
<div class="section"><div class="section-title">問題5</div>
<div class="question" data-answer="1">
<div class="question-num">問31</div>
<div class="question-text">つぎの「めったに」をつかった文として、いちばんよいものを１・２・３・４からひとつえらんでください。</div>
<div class="options">
<div class="option" data-value="1">1. めったに行かない店に、久しぶりに行った。</div>
<div class="option" data-value="2">2. めったに今日は暑い。</div>
<div class="option" data-value="3">3. 彼はめったに背が高い。</div>
<div class="option" data-value="4">4. めったに昨日、映画を見た。</div>
</div>
<div class="explanation">「めったに〜ない」は「ほとんどない、滅多にない」という意味です。1が正しい使い方です。</div>
</div>
<div class="question" data-answer="2">
<div class="question-num">問32</div>
<div class="question-text">つぎの「<strong>わざわざ</strong>」をつかった文として、いちばんよいものを１・２・３・４からひとつえらんでください。</div>
<div class="options">
<div class="option" data-value="1">1. 彼女はわざわざ料理が上手だ。</div>
<div class="option" data-value="2">2. 遠いところをわざわざ来てくださってありがとうございます。</div>
<div class="option" data-value="3">3. わざわざ今日は晴れている。</div>
<div class="option" data-value="4">4. わざわざ昨日、公園で遊んだ。</div>
</div>
<div class="explanation">「わざわざ」は「特別に手間をかけて」という意味です。2が正しい使い方です。</div>
</div>
<div class="question" data-answer="1">
<div class="question-num">問33</div>
<div class="question-text">つぎの「<strong>せめて</strong>」をつかった文として、いちばんよいものを１・２・３・４からひとつえらんでください。</div>
<div class="options">
<div class="option" data-value="1">1. 忙しくても、せめて週に一度は家族と食事をしたい。</div>
<div class="option" data-value="2">2. 彼はせめて背が高い。</div>
<div class="option" data-value="3">3. せめて今日は天気がいい。</div>
<div class="option" data-value="4">4. せめて昨日、友達に会った。</div>
</div>
<div class="explanation">「せめて」は「最低限これだけはしたい」という気持ちを表します。1が正しい使い方です。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問34</div>
<div class="question-text">つぎの「いよいよ」をつかった文として、いちばんよいものを１・２・３・４からひとつえらんでください。</div>
<div class="options">
<div class="option" data-value="1">1. 彼はいよいよ背が高い。</div>
<div class="option" data-value="2">2. いよいよ今日は暑い。</div>
<div class="option" data-value="3">3. いよいよ明日から試験が始まる。</div>
<div class="option" data-value="4">4. いよいよ昨日、電車に乗った。</div>
</div>
<div class="explanation">「いよいよ」は「ついに、とうとう（期待や緊張を持って）」という意味です。3が正しい使い方です。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問35</div>
<div class="question-text">つぎの「<strong>とうとう</strong>」をつかった文として、いちばんよいものを１・２・３・４からひとつえらんでください。</div>
<div class="options">
<div class="option" data-value="1">1. 彼女はとうとう料理が上手だ。</div>
<div class="option" data-value="2">2. とうとう今日は暑い。</div>
<div class="option" data-value="3">3. 心配していたことがとうとう起きてしまった。</div>
<div class="option" data-value="4">4. 彼はとうとう背が高い。</div>
</div>
<div class="explanation">「とうとう」は長い時間の末についに結果が出る場面で使います。3が正しい使い方です。</div>
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
