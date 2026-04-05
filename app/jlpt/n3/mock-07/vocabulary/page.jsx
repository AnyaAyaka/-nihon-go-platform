'use client'
import AccessCheck from '../../../../AccessCheck'

export default function Page() {
  return (
    <>
      <AccessCheck level="N3" mockNum={7} />
      <div dangerouslySetInnerHTML={{ __html: `<!DOCTYPE html>

<html lang="ja">
<head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>JLPT N3 Vocabulary - MOCK-07 | Nihon GO!</title>
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
<h1>JLPT N3 Mock Test 07 - 語彙</h1>
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
<div class="question-text">今日の試合で新しい<u>記録</u>が生まれた。</div>
<div class="options">
<div class="option" data-value="1">1. きろ</div>
<div class="option" data-value="2">2. きろく</div>
<div class="option" data-value="3">3. きろく</div>
<div class="option" data-value="4">4. けいろく</div>
</div>
<div class="explanation">「記録」は「きろく」と読みます。</div>
</div>
<div class="question" data-answer="2">
<div class="question-num">問2</div>
<div class="question-text">最近の気候の<u>変化</u>は激しく、対策が必要だ。</div>
<div class="options">
<div class="option" data-value="1">1. へんげ</div>
<div class="option" data-value="2">2. へんか</div>
<div class="option" data-value="3">3. へんこう</div>
<div class="option" data-value="4">4. へんがく</div>
</div>
<div class="explanation">「変化」は「へんか」と読みます。</div>
</div>
<div class="question" data-answer="1">
<div class="question-num">問3</div>
<div class="question-text">試験の<u>準備</u>のために、毎日図書館に通っている。</div>
<div class="options">
<div class="option" data-value="1">1. じゅんび</div>
<div class="option" data-value="2">2. じゅんぼ</div>
<div class="option" data-value="3">3. しゅんび</div>
<div class="option" data-value="4">4. しゅんぼ</div>
</div>
<div class="explanation">「準備」は「じゅんび」と読みます。</div>
</div>
<div class="question" data-answer="4">
<div class="question-num">問4</div>
<div class="question-text">来年の旅行の<u>計画</u>を立て始めた。</div>
<div class="options">
<div class="option" data-value="1">1. けいが</div>
<div class="option" data-value="2">2. けいがく</div>
<div class="option" data-value="3">3. けいかく</div>
<div class="option" data-value="4">4. けいかく</div>
</div>
<div class="explanation">「計画」は「けいかく」と読みます。</div>
</div>
<div class="question" data-answer="2">
<div class="question-num">問5</div>
<div class="question-text">会社の<u>経営</u>が厳しくなり、リストラが始まった。</div>
<div class="options">
<div class="option" data-value="1">1. けいえ</div>
<div class="option" data-value="2">2. けいえい</div>
<div class="option" data-value="3">3. きょうえい</div>
<div class="option" data-value="4">4. きょうえ</div>
</div>
<div class="explanation">「経営」は「けいえい」と読みます。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問6</div>
<div class="question-text">この地域では<u>農業</u>が主な産業だ。</div>
<div class="options">
<div class="option" data-value="1">1. のうぎょ</div>
<div class="option" data-value="2">2. のうごう</div>
<div class="option" data-value="3">3. のうぎょう</div>
<div class="option" data-value="4">4. のうこう</div>
</div>
<div class="explanation">「農業」は「のうぎょう」と読みます。</div>
</div>
<div class="question" data-answer="1">
<div class="question-num">問7</div>
<div class="question-text">彼女の<u>態度</u>が問題になり、上司に呼ばれた。</div>
<div class="options">
<div class="option" data-value="1">1. たいど</div>
<div class="option" data-value="2">2. たいとう</div>
<div class="option" data-value="3">3. だいど</div>
<div class="option" data-value="4">4. だいとう</div>
</div>
<div class="explanation">「態度」は「たいど」と読みます。</div>
</div>
<div class="question" data-answer="2">
<div class="question-num">問8</div>
<div class="question-text">この仕事は高い<u>技術</u>が必要だ。</div>
<div class="options">
<div class="option" data-value="1">1. きじゅ</div>
<div class="option" data-value="2">2. ぎじゅつ</div>
<div class="option" data-value="3">3. きじゅつ</div>
<div class="option" data-value="4">4. ぎじゅ</div>
</div>
<div class="explanation">「技術」は「ぎじゅつ」と読みます。</div>
</div>
</div>
<!-- 問題2: 漢字書き -->
<div class="section"><div class="section-title">問題2</div>
<div class="question" data-answer="2">
<div class="question-num">問9</div>
<div class="question-text">奨学金の申請書類を<u>うけた</u>。</div>
<div class="options">
<div class="option" data-value="1">1. 得た</div>
<div class="option" data-value="2">2. 受けた</div>
<div class="option" data-value="3">3. 取けた</div>
<div class="option" data-value="4">4. 引けた</div>
</div>
<div class="explanation">「うける」は「受ける」と書きます。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問10</div>
<div class="question-text">大切なことは言葉でしっかり<u>つたえる</u>べきだ。</div>
<div class="options">
<div class="option" data-value="1">1. 通える</div>
<div class="option" data-value="2">2. 話える</div>
<div class="option" data-value="3">3. 伝える</div>
<div class="option" data-value="4">4. 告える</div>
</div>
<div class="explanation">「つたえる」は「伝える」と書きます。</div>
</div>
<div class="question" data-answer="1">
<div class="question-num">問11</div>
<div class="question-text">この問題についてよく<u>かんがえて</u>から答えてください。</div>
<div class="options">
<div class="option" data-value="1">1. 考えて</div>
<div class="option" data-value="2">2. 感がえて</div>
<div class="option" data-value="3">3. 観えて</div>
<div class="option" data-value="4">4. 鑑えて</div>
</div>
<div class="explanation">「かんがえる」は「考える」と書きます。</div>
</div>
<div class="question" data-answer="4">
<div class="question-num">問12</div>
<div class="question-text">レポートのために資料を<u>しらべた</u>。</div>
<div class="options">
<div class="option" data-value="1">1. 知べた</div>
<div class="option" data-value="2">2. 探べた</div>
<div class="option" data-value="3">3. 見べた</div>
<div class="option" data-value="4">4. 調べた</div>
</div>
<div class="explanation">「しらべる」は「調べる」と書きます。</div>
</div>
<div class="question" data-answer="2">
<div class="question-num">問13</div>
<div class="question-text">彼女は困難な状況でも笑顔を<u>たもった</u>。</div>
<div class="options">
<div class="option" data-value="1">1. 守った</div>
<div class="option" data-value="2">2. 保った</div>
<div class="option" data-value="3">3. 持った</div>
<div class="option" data-value="4">4. 続った</div>
</div>
<div class="explanation">「たもつ」は「保つ」と書きます。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問14</div>
<div class="question-text">新しい言語を<u>まなぶ</u>のは楽しい。</div>
<div class="options">
<div class="option" data-value="1">1. 習ぶ</div>
<div class="option" data-value="2">2. 教ぶ</div>
<div class="option" data-value="3">3. 学ぶ</div>
<div class="option" data-value="4">4. 知ぶ</div>
</div>
<div class="explanation">「まなぶ」は「学ぶ」と書きます。</div>
</div>
</div>
<!-- 問題3: 文脈規定 -->
<div class="section"><div class="section-title">問題3</div>
<div class="question" data-answer="2">
<div class="question-num">問15</div>
<div class="question-text">試験（　　）のため、毎日単語を覚えている。</div>
<div class="options">
<div class="option" data-value="1">1. 開始</div>
<div class="option" data-value="2">2. 対策</div>
<div class="option" data-value="3">3. 発表</div>
<div class="option" data-value="4">4. 記録</div>
</div>
<div class="explanation">試験に向けて準備することを「対策」と言います。</div>
</div>
<div class="question" data-answer="4">
<div class="question-num">問16</div>
<div class="question-text">彼女は授業中いつも積極的に（　　）する。</div>
<div class="options">
<div class="option" data-value="1">1. 欠席</div>
<div class="option" data-value="2">2. 遅刻</div>
<div class="option" data-value="3">3. 退学</div>
<div class="option" data-value="4">4. 発言</div>
</div>
<div class="explanation">授業中に積極的に意見を言うことを「発言する」と言います。</div>
</div>
<div class="question" data-answer="1">
<div class="question-num">問17</div>
<div class="question-text">彼女は授業中に居眠りする（　　）があって、先生によく注意される。</div>
<div class="options">
<div class="option" data-value="1">1. 傾向</div>
<div class="option" data-value="2">2. 記録</div>
<div class="option" data-value="3">3. 準備</div>
<div class="option" data-value="4">4. 計画</div>
</div>
<div class="explanation">「〜する傾向がある」はそうなりやすいという意味です。居眠りしがちな様子を表します。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問18</div>
<div class="question-text">先生の（　　）のおかげで、苦手な数学が得意になった。</div>
<div class="options">
<div class="option" data-value="1">1. 批判</div>
<div class="option" data-value="2">2. 命令</div>
<div class="option" data-value="3">3. 指導</div>
<div class="option" data-value="4">4. 管理</div>
</div>
<div class="explanation">先生が教えて導くことを「指導」と言います。おかげで得意になったという結果と一致します。</div>
</div>
<div class="question" data-answer="2">
<div class="question-num">問19</div>
<div class="question-text">大学の（　　）が来月に迫り、緊張している。</div>
<div class="options">
<div class="option" data-value="1">1. 卒業式</div>
<div class="option" data-value="2">2. 入学試験</div>
<div class="option" data-value="3">3. 授業料</div>
<div class="option" data-value="4">4. 夏休み</div>
</div>
<div class="explanation">「入学試験が迫り緊張している」という文脈が最も自然です。</div>
</div>
<div class="question" data-answer="4">
<div class="question-num">問20</div>
<div class="question-text">この学校は（　　）率が高く、多くの生徒が有名大学に入る。</div>
<div class="options">
<div class="option" data-value="1">1. 遅刻</div>
<div class="option" data-value="2">2. 退学</div>
<div class="option" data-value="3">3. 欠席</div>
<div class="option" data-value="4">4. 合格</div>
</div>
<div class="explanation">有名大学に入ることを「合格率が高い」と表現します。遅刻・退学・欠席率が高くても有名大学には入れません。</div>
</div>
<div class="question" data-answer="1">
<div class="question-num">問21</div>
<div class="question-text">彼は（　　）が広く、どんな科目でも高い点数を取る。</div>
<div class="options">
<div class="option" data-value="1">1. 知識</div>
<div class="option" data-value="2">2. 感情</div>
<div class="option" data-value="3">3. 印象</div>
<div class="option" data-value="4">4. 体力</div>
</div>
<div class="explanation">どんな科目でも点数が高い理由として「知識が広い」が最も適切です。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問22</div>
<div class="question-text">授業の（　　）が悪く、何度説明してもわかってもらえなかった。</div>
<div class="options">
<div class="option" data-value="1">1. 内容</div>
<div class="option" data-value="2">2. 時間</div>
<div class="option" data-value="3">3. 進め方</div>
<div class="option" data-value="4">4. 場所</div>
</div>
<div class="explanation">説明してもわかってもらえない原因として「進め方が悪い」が最も適切です。</div>
</div>
<div class="question" data-answer="2">
<div class="question-num">問23</div>
<div class="question-text">彼女は勉強（　　）で、授業中も本ばかり読んでいる。</div>
<div class="options">
<div class="option" data-value="1">1. 嫌い</div>
<div class="option" data-value="2">2. 好き</div>
<div class="option" data-value="3">3. 苦手</div>
<div class="option" data-value="4">4. 得意</div>
</div>
<div class="explanation">授業中も本ばかり読んでいることから「勉強好き」が唯一自然です。「得意」とは意味が異なります。</div>
</div>
<div class="question" data-answer="4">
<div class="question-num">問24</div>
<div class="question-text">この試験は（　　）が高く、合格するのは難しい。</div>
<div class="options">
<div class="option" data-value="1">1. 人気</div>
<div class="option" data-value="2">2. 費用</div>
<div class="option" data-value="3">3. 評価</div>
<div class="option" data-value="4">4. 難易度</div>
</div>
<div class="explanation">合格が難しいという文脈から「難易度が高い」が唯一適切です。</div>
</div>
<div class="question" data-answer="1">
<div class="question-num">問25</div>
<div class="question-text">彼は（　　）が早く、新しいことをすぐに覚える。</div>
<div class="options">
<div class="option" data-value="1">1. 理解</div>
<div class="option" data-value="2">2. 発言</div>
<div class="option" data-value="3">3. 準備</div>
<div class="option" data-value="4">4. 記録</div>
</div>
<div class="explanation">新しいことをすぐ覚えることを「理解が早い」と表現します。</div>
</div>
</div>
<!-- 問題4: 言い換え類義語 -->
<div class="section"><div class="section-title">問題4</div>
<div class="question" data-answer="3">
<div class="question-num">問26</div>
<div class="question-text">この案件については、さらに<u>検討</u>が必要だ。</div>
<div class="options">
<div class="option" data-value="1">1. 無視すること</div>
<div class="option" data-value="2">2. 発表すること</div>
<div class="option" data-value="3">3. よく考えること</div>
<div class="option" data-value="4">4. 中止すること</div>
</div>
<div class="explanation">「検討」は「よく考えること」という意味です。</div>
</div>
<div class="question" data-answer="2">
<div class="question-num">問27</div>
<div class="question-text">試験に<u>ぎりぎり</u>間に合った。</div>
<div class="options">
<div class="option" data-value="1">1. 余裕を持って</div>
<div class="option" data-value="2">2. やっとのことで</div>
<div class="option" data-value="3">3. 早めに</div>
<div class="option" data-value="4">4. たまたま</div>
</div>
<div class="explanation">「ぎりぎり」は「やっとのことで、辛うじて」という意味です。</div>
</div>
<div class="question" data-answer="4">
<div class="question-num">問28</div>
<div class="question-text">彼女は<u>しっかり</u>と計画を立てて行動する。</div>
<div class="options">
<div class="option" data-value="1">1. ぼんやりと</div>
<div class="option" data-value="2">2. うっかりと</div>
<div class="option" data-value="3">3. のんびりと</div>
<div class="option" data-value="4">4. きちんと</div>
</div>
<div class="explanation">「しっかり」は「きちんと、確実に」という意味です。</div>
</div>
<div class="question" data-answer="1">
<div class="question-num">問29</div>
<div class="question-text">彼女は<u>ちゃんと</u>時間を守る人だ。</div>
<div class="options">
<div class="option" data-value="1">1. きちんと</div>
<div class="option" data-value="2">2. ぐったりと</div>
<div class="option" data-value="3">3. ぼんやりと</div>
<div class="option" data-value="4">4. うっかりと</div>
</div>
<div class="explanation">「ちゃんと」は「きちんと、しっかりと」という意味です。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問30</div>
<div class="question-text">彼は<u>ちゃんと</u>約束を守る人だ。</div>
<div class="options">
<div class="option" data-value="1">1. たまに</div>
<div class="option" data-value="2">2. めったに</div>
<div class="option" data-value="3">3. しっかりと</div>
<div class="option" data-value="4">4. うっかりと</div>
</div>
<div class="explanation">「ちゃんと」は「しっかりと、きちんと」という意味です。</div>
</div>
</div>
<!-- 問題5: 用法 -->
<div class="section"><div class="section-title">問題5</div>
<div class="question" data-answer="2">
<div class="question-num">問31</div>
<div class="question-text">つぎの「<strong>なんとか</strong>」をつかった文として、いちばんよいものを１・２・３・４からひとつえらんでください。</div>
<div class="options">
<div class="option" data-value="1">1. 彼はなんとか背が高い。</div>
<div class="option" data-value="2">2. 締め切りまでになんとか間に合った。</div>
<div class="option" data-value="3">3. なんとか今日は暑い。</div>
<div class="option" data-value="4">4. なんとか彼は料理が好きだ。</div>
</div>
<div class="explanation">「なんとか」は苦労してやっと実現した場面で使います。2が正しい使い方です。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問32</div>
<div class="question-text">つぎの「<strong>どうにか</strong>」をつかった文として、いちばんよいものを１・２・３・４からひとつえらんでください。</div>
<div class="options">
<div class="option" data-value="1">1. 彼はどうにか料理が上手だ。</div>
<div class="option" data-value="2">2. どうにか今日は晴れている。</div>
<div class="option" data-value="3">3. どうにか事故を防ぐことができた。</div>
<div class="option" data-value="4">4. どうにか彼女は背が高い。</div>
</div>
<div class="explanation">「どうにか」は苦労してかろうじて実現したことを表します。3が正しい使い方です。</div>
</div>
<div class="question" data-answer="1">
<div class="question-num">問33</div>
<div class="question-text">つぎの「<strong>せいぜい</strong>」をつかった文として、いちばんよいものを１・２・３・４からひとつえらんでください。</div>
<div class="options">
<div class="option" data-value="1">1. この工事はせいぜい3日もあれば終わるだろう。</div>
<div class="option" data-value="2">2. 彼はせいぜい背が高い。</div>
<div class="option" data-value="3">3. せいぜい今日は暑い。</div>
<div class="option" data-value="4">4. せいぜい昨日、友達に会った。</div>
</div>
<div class="explanation">「せいぜい」は「多く見積もっても、たかだか」という意味です。1が正しい使い方です。</div>
</div>
<div class="question" data-answer="4">
<div class="question-num">問34</div>
<div class="question-text">つぎの「<strong>しっかり</strong>」をつかった文として、いちばんよいものを１・２・３・４からひとつえらんでください。</div>
<div class="options">
<div class="option" data-value="1">1. しっかり昨日、電車に乗った。</div>
<div class="option" data-value="2">2. 彼はしっかり背が高い。</div>
<div class="option" data-value="3">3. しっかり今日は暑い。</div>
<div class="option" data-value="4">4. 毎日しっかり睡眠を取ることが健康の基本だ。</div>
</div>
<div class="explanation">「しっかり」は「きちんと、十分に」という意味です。4が正しい使い方です。</div>
</div>
<div class="question" data-answer="2">
<div class="question-num">問35</div>
<div class="question-text">つぎの「<strong>きちんと</strong>」をつかった文として、いちばんよいものを１・２・３・４からひとつえらんでください。</div>
<div class="options">
<div class="option" data-value="1">1. 彼女はきちんと背が高い。</div>
<div class="option" data-value="2">2. 提出物はきちんと期限までに出すべきだ。</div>
<div class="option" data-value="3">3. きちんと今日は月曜日だ。</div>
<div class="option" data-value="4">4. きちんと昨日、公園で遊んだ。</div>
</div>
<div class="explanation">「きちんと」は「正しく、整えて」という意味です。2が正しい使い方です。</div>
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
