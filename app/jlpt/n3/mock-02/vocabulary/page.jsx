'use client'
export default function Page() {
  return (
    <div dangerouslySetInnerHTML={{ __html: `<!DOCTYPE html>

<html lang="ja">
<head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>JLPT N3 Vocabulary - MOCK-02 | Nihon GO!</title>
<style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; 
            background: #f9fafb; 
            color: #333;
            line-height: 1.6;
            padding-bottom: 40px;
        }
        .header {
            background: #fff;
            border-bottom: 1px solid #e5e7eb;
            padding: 15px 0;
            position: sticky;
            top: 0;
            z-index: 100;
        }
        .header-inner {
            max-width: 900px;
            margin: 0 auto;
            padding: 0 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .logo { font-size: 1.2em; font-weight: bold; color: #333; text-decoration: none; }
        .logo span { color: #06b6d4; }
        .timer { 
            background: #f3f4f6; 
            padding: 8px 16px; 
            border-radius: 6px; 
            font-weight: 600;
            font-size: 1.1em;
        }
        .timer.warning { background: #fef3c7; color: #92400e; }
        .timer.danger { background: #fee2e2; color: #991b1b; }
        .next-section-btn {
            display: inline-block;
            margin-top: 20px;
            padding: 14px 28px;
            background: #06b6d4;
            color: #fff;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            font-size: 1.1em;
            transition: background 0.2s;
        }
        .next-section-btn:hover { background: #0e7490; }
        
        .container { max-width: 900px; margin: 0 auto; padding: 20px; }
        h1 { font-size: 1.5em; margin-bottom: 10px; text-align: center; }
        
        .section {
            background: #fff;
            border-radius: 12px;
            padding: 24px;
            margin-bottom: 20px;
            border: 1px solid #e5e7eb;
        }
        .section-title {
            font-size: 1.1em;
            font-weight: 600;
            margin-bottom: 20px;
            padding-bottom: 12px;
            border-bottom: 2px solid #06b6d4;
        }
        .question {
            margin-bottom: 24px;
            padding: 16px;
            background: #f9fafb;
            border-radius: 8px;
        }
        .question-num { 
            font-size: 0.85em; 
            color: #06b6d4; 
            font-weight: 600; 
            margin-bottom: 8px; 
        }
        .question-text { font-size: 1.05em; margin-bottom: 12px; }
        .options { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        @media (max-width: 600px) { .options { grid-template-columns: 1fr; } }
        .option {
            padding: 12px 16px;
            border: 2px solid #e5e7eb;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.15s;
            background: #fff;
        }
        .option:hover { border-color: #06b6d4; background: #ecfeff; }
        .option.selected { border-color: #06b6d4; background: #ecfeff; }
        .option.correct { border-color: #06b6d4; background: #cffafe; }
        .option.incorrect { border-color: #ef4444; background: #fee2e2; }
        .explanation {
            margin-top: 12px;
            padding: 12px;
            background: #fef3c7;
            border-radius: 6px;
            display: none;
            font-size: 0.9em;
        }
        
        .actions { text-align: center; margin: 30px 0; }
        .btn-submit {
            padding: 14px 40px;
            font-size: 1em;
            font-weight: 600;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            background: #06b6d4;
            color: #fff;
            transition: background 0.2s;
        }
        .btn-submit:hover { background: #0e7490; }
        
        .score {
            text-align: center;
            padding: 24px;
            background: #fff;
            border-radius: 12px;
            border: 1px solid #e5e7eb;
            display: none;
        }
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
<h1>JLPT N3 Mock Test 02 - 語彙</h1>
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
<div class="question-text">この地域では<u>観光</u>業が発展している。</div>
<div class="options">
<div class="option" data-value="1">1. かんこ</div>
<div class="option" data-value="2">2. かんごう</div>
<div class="option" data-value="3">3. かんこう</div>
<div class="option" data-value="4">4. かんきょう</div>
</div>
<div class="explanation">「観光」は「かんこう」と読みます。</div>
</div>
<div class="question" data-answer="2">
<div class="question-num">問2</div>
<div class="question-text">新しい<u>技術</u>を学ぶために、研修に参加した。</div>
<div class="options">
<div class="option" data-value="1">1. ぎじゅ</div>
<div class="option" data-value="2">2. ぎじゅつ</div>
<div class="option" data-value="3">3. きじゅつ</div>
<div class="option" data-value="4">4. きじゅ</div>
</div>
<div class="explanation">「技術」は「ぎじゅつ」と読みます。</div>
</div>
<div class="question" data-answer="1">
<div class="question-num">問3</div>
<div class="question-text">彼女は<u>将来</u>医者になりたいと思っている。</div>
<div class="options">
<div class="option" data-value="1">1. しょうらい</div>
<div class="option" data-value="2">2. しょうり</div>
<div class="option" data-value="3">3. しょらい</div>
<div class="option" data-value="4">4. しょり</div>
</div>
<div class="explanation">「将来」は「しょうらい」と読みます。</div>
</div>
<div class="question" data-answer="4">
<div class="question-num">問4</div>
<div class="question-text">この問題を<u>解決</u>するには時間がかかる。</div>
<div class="options">
<div class="option" data-value="1">1. かいつ</div>
<div class="option" data-value="2">2. かいつけ</div>
<div class="option" data-value="3">3. かいけつけ</div>
<div class="option" data-value="4">4. かいけつ</div>
</div>
<div class="explanation">「解決」は「かいけつ」と読みます。</div>
</div>
<div class="question" data-answer="2">
<div class="question-num">問5</div>
<div class="question-text">彼の<u>態度</u>がひどくて驚いた。</div>
<div class="options">
<div class="option" data-value="1">1. たいと</div>
<div class="option" data-value="2">2. たいど</div>
<div class="option" data-value="3">3. だいと</div>
<div class="option" data-value="4">4. だいど</div>
</div>
<div class="explanation">「態度」は「たいど」と読みます。</div>
</div>
<div class="question" data-answer="1">
<div class="question-num">問6</div>
<div class="question-text">会社の<u>方針</u>が変わった。</div>
<div class="options">
<div class="option" data-value="1">1. ほうしん</div>
<div class="option" data-value="2">2. ほうじん</div>
<div class="option" data-value="3">3. ほっしん</div>
<div class="option" data-value="4">4. ほっじん</div>
</div>
<div class="explanation">「方針」は「ほうしん」と読みます。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問7</div>
<div class="question-text">試験の<u>結果</u>が出るまで不安だった。</div>
<div class="options">
<div class="option" data-value="1">1. けつか</div>
<div class="option" data-value="2">2. けっか</div>
<div class="option" data-value="3">3. けっか</div>
<div class="option" data-value="4">4. けつが</div>
</div>
<div class="explanation">「結果」は「けっか」と読みます。</div>
</div>
<div class="question" data-answer="2">
<div class="question-num">問8</div>
<div class="question-text">毎朝<u>運動</u>するようにしている。</div>
<div class="options">
<div class="option" data-value="1">1. うどん</div>
<div class="option" data-value="2">2. うんどう</div>
<div class="option" data-value="3">3. うごん</div>
<div class="option" data-value="4">4. うんごう</div>
</div>
<div class="explanation">「運動」は「うんどう」と読みます。</div>
</div>
</div>
<!-- 問題2: 漢字書き -->
<div class="section"><div class="section-title">問題2</div>
<div class="question" data-answer="2">
<div class="question-num">問9</div>
<div class="question-text">駅まで<u>むかえ</u>に来てくれた。</div>
<div class="options">
<div class="option" data-value="1">1. 向え</div>
<div class="option" data-value="2">2. 迎え</div>
<div class="option" data-value="3">3. 迫え</div>
<div class="option" data-value="4">4. 招え</div>
</div>
<div class="explanation">「むかえ」は「迎え」と書きます。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問10</div>
<div class="question-text">この仕事を<u>つづける</u>つもりだ。</div>
<div class="options">
<div class="option" data-value="1">1. 繋ける</div>
<div class="option" data-value="2">2. 接ける</div>
<div class="option" data-value="3">3. 続ける</div>
<div class="option" data-value="4">4. 伸ける</div>
</div>
<div class="explanation">「つづける」は「続ける」と書きます。</div>
</div>
<div class="question" data-answer="1">
<div class="question-num">問11</div>
<div class="question-text">問題を<u>かいけつ</u>した。</div>
<div class="options">
<div class="option" data-value="1">1. 解決</div>
<div class="option" data-value="2">2. 快決</div>
<div class="option" data-value="3">3. 開決</div>
<div class="option" data-value="4">4. 界決</div>
</div>
<div class="explanation">「かいけつ」は「解決」と書きます。</div>
</div>
<div class="question" data-answer="4">
<div class="question-num">問12</div>
<div class="question-text">新しい情報を<u>あつめる</u>のが好きだ。</div>
<div class="options">
<div class="option" data-value="1">1. 纏める</div>
<div class="option" data-value="2">2. 貯める</div>
<div class="option" data-value="3">3. 積める</div>
<div class="option" data-value="4">4. 集める</div>
</div>
<div class="explanation">「あつめる」は「集める」と書きます。</div>
</div>
<div class="question" data-answer="2">
<div class="question-num">問13</div>
<div class="question-text">彼女は声が大きくて<u>めだつ</u>。</div>
<div class="options">
<div class="option" data-value="1">1. 見立つ</div>
<div class="option" data-value="2">2. 目立つ</div>
<div class="option" data-value="3">3. 眼立つ</div>
<div class="option" data-value="4">4. 気立つ</div>
</div>
<div class="explanation">「めだつ」は「目立つ」と書きます。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問14</div>
<div class="question-text">友達に<u>そうだん</u>してみた。</div>
<div class="options">
<div class="option" data-value="1">1. 相対</div>
<div class="option" data-value="2">2. 想談</div>
<div class="option" data-value="3">3. 相談</div>
<div class="option" data-value="4">4. 総談</div>
</div>
<div class="explanation">「そうだん」は「相談」と書きます。</div>
</div>
</div>
<!-- 問題3: 文脈規定 -->
<div class="section"><div class="section-title">問題3</div>
<div class="question" data-answer="3">
<div class="question-num">問15</div>
<div class="question-text">楽器を全く習ったことがないのに、彼はすぐに演奏できた。これは（　　）としか言えない。</div>
<div class="options">
<div class="option" data-value="1">1. 努力</div>
<div class="option" data-value="2">2. 経験</div>
<div class="option" data-value="3">3. 才能</div>
<div class="option" data-value="4">4. 練習</div>
</div>
<div class="explanation">習ったことがないのにすぐできた理由として「才能」が唯一適切です。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問16</div>
<div class="question-text">試験まで一度も諦めずに勉強し続けたのは、彼の強い（　　）のおかげだ。</div>
<div class="options">
<div class="option" data-value="1">1. 不満</div>
<div class="option" data-value="2">2. 不安</div>
<div class="option" data-value="3">3. 意志</div>
<div class="option" data-value="4">4. 心配</div>
</div>
<div class="explanation">諦めずに続ける力の根拠として「意志が強い」が最も適切です。</div>
</div>
<div class="question" data-answer="2">
<div class="question-num">問17</div>
<div class="question-text">この図書館は市民なら誰でも無料で（　　）できる。</div>
<div class="options">
<div class="option" data-value="1">1. 注文</div>
<div class="option" data-value="2">2. 利用</div>
<div class="option" data-value="3">3. 発注</div>
<div class="option" data-value="4">4. 宅配</div>
</div>
<div class="explanation">施設やサービスを使うことを「利用する」と言います。「手配」は手続きを整えること、「注文・発注」は商品を頼む意味です。</div>
</div>
<div class="question" data-answer="4">
<div class="question-num">問18</div>
<div class="question-text">この教材は例文や練習問題が（　　）で、一冊で十分勉強できる。</div>
<div class="options">
<div class="option" data-value="1">1. 複雑</div>
<div class="option" data-value="2">2. 深刻</div>
<div class="option" data-value="3">3. 専門</div>
<div class="option" data-value="4">4. 豊富</div>
</div>
<div class="explanation">例文や練習問題が多くそろっていることを「豊富」と言います。「複雑・専門」は勉強しやすいという文脈と合わず、「深刻」は内容の性質を表す言葉です。</div>
</div>
<div class="question" data-answer="1">
<div class="question-num">問19</div>
<div class="question-text">彼女の意見は常に（　　）で、みんなに信頼されている。</div>
<div class="options">
<div class="option" data-value="1">1. 公平</div>
<div class="option" data-value="2">2. 個人的</div>
<div class="option" data-value="3">3. 感情的</div>
<div class="option" data-value="4">4. 主観的</div>
</div>
<div class="explanation">偏りがなく信頼される意見は「公平」と表現します。</div>
</div>
<div class="question" data-answer="2">
<div class="question-num">問20</div>
<div class="question-text">彼女は毎日日記をつけて、その日の出来事を（　　）している。</div>
<div class="options">
<div class="option" data-value="1">1. 批評</div>
<div class="option" data-value="2">2. 記録</div>
<div class="option" data-value="3">3. 議論</div>
<div class="option" data-value="4">4. 報告</div>
</div>
<div class="explanation">日記に書き留めることを「記録する」と言います。「報告」は相手に伝えること、「議論」は意見を交わすこと、「批評」は評価・批判することです。</div>
</div>
<div class="question" data-answer="2">
<div class="question-num">問21</div>
<div class="question-text">彼のスピーチは（　　）があって、聴衆を引きつけた。</div>
<div class="options">
<div class="option" data-value="1">1. 長さ</div>
<div class="option" data-value="2">2. 説得力</div>
<div class="option" data-value="3">3. 音量</div>
<div class="option" data-value="4">4. 速さ</div>
</div>
<div class="explanation">聴衆を引きつける力は「説得力」が最も適切です。</div>
</div>
<div class="question" data-answer="4">
<div class="question-num">問22</div>
<div class="question-text">立てた計画は、すぐに（　　）に移すことが大切だ。</div>
<div class="options">
<div class="option" data-value="1">1. 廃止</div>
<div class="option" data-value="2">2. 終了</div>
<div class="option" data-value="3">3. 中断</div>
<div class="option" data-value="4">4. 実行</div>
</div>
<div class="explanation">「計画を実行に移す」は計画を実際に行動として進めることです。廃止・終了・中断はすべて計画を止める意味になります。</div>
</div>
<div class="question" data-answer="1">
<div class="question-num">問23</div>
<div class="question-text">彼女は人前で話すのが（　　）で、声が震えてしまう。</div>
<div class="options">
<div class="option" data-value="1">1. 苦手</div>
<div class="option" data-value="2">2. 得意</div>
<div class="option" data-value="3">3. 好き</div>
<div class="option" data-value="4">4. 楽しみ</div>
</div>
<div class="explanation">声が震えてしまうことから、「苦手」が最も適切です。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問24</div>
<div class="question-text">この店のサービスは（　　）が高く、リピーターが多い。</div>
<div class="options">
<div class="option" data-value="1">1. 値段</div>
<div class="option" data-value="2">2. 評価</div>
<div class="option" data-value="3">3. 評判</div>
<div class="option" data-value="4">4. 場所</div>
</div>
<div class="explanation">「評判が高い」は世間での口コミや噂がよいことを表します。「評価が高い」も似た意味ですが、「評判」は口コミ・噂のニュアンスが強く、リピーターが多いという文脈に最も自然です。</div>
</div>
<div class="question" data-answer="2">
<div class="question-num">問25</div>
<div class="question-text">彼は仕事で大きなミスをして、上司に（　　）を受けた。</div>
<div class="options">
<div class="option" data-value="1">1. 表彰</div>
<div class="option" data-value="2">2. 注意</div>
<div class="option" data-value="3">3. 賞賛</div>
<div class="option" data-value="4">4. 推薦</div>
</div>
<div class="explanation">ミスをして上司から受けるのは「注意」が最も適切です。</div>
</div>
</div>
<!-- 問題4: 言い換え類義語 -->
<div class="section"><div class="section-title">問題4</div>
<div class="question" data-answer="3">
<div class="question-num">問26</div>
<div class="question-text">彼女は仕事で<u>くたくた</u>になって帰ってきた。</div>
<div class="options">
<div class="option" data-value="1">1. 急いで</div>
<div class="option" data-value="2">2. うれしくて</div>
<div class="option" data-value="3">3. とても疲れて</div>
<div class="option" data-value="4">4. 心配して</div>
</div>
<div class="explanation">「くたくた」はひどく疲れた状態を表します。</div>
</div>
<div class="question" data-answer="1">
<div class="question-num">問27</div>
<div class="question-text">彼の判断はいつも<u>的確</u>だ。</div>
<div class="options">
<div class="option" data-value="1">1. 正確で適切</div>
<div class="option" data-value="2">2. 素早い</div>
<div class="option" data-value="3">3. 厳しい</div>
<div class="option" data-value="4">4. 優しい</div>
</div>
<div class="explanation">「的確」はぴったり合っていて正確であることを表します。</div>
</div>
<div class="question" data-answer="4">
<div class="question-num">問28</div>
<div class="question-text">その計画には<u>無理</u>がある。</div>
<div class="options">
<div class="option" data-value="1">1. 問題がない</div>
<div class="option" data-value="2">2. 費用がかかる</div>
<div class="option" data-value="3">3. 時間が余る</div>
<div class="option" data-value="4">4. 実現が難しい部分がある</div>
</div>
<div class="explanation">「無理がある」は実現するのが困難であることを表します。</div>
</div>
<div class="question" data-answer="2">
<div class="question-num">問29</div>
<div class="question-text">彼女は<u>さすが</u>プロだと思った。</div>
<div class="options">
<div class="option" data-value="1">1. やはり</div>
<div class="option" data-value="2">2. 期待通りに素晴らしい</div>
<div class="option" data-value="3">3. まさか</div>
<div class="option" data-value="4">4. 残念ながら</div>
</div>
<div class="explanation">「さすが」は評判や期待通りに優れていることへの感嘆を表します。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問30</div>
<div class="question-text">彼は<u>なかなか</u>決断しない人だ。</div>
<div class="options">
<div class="option" data-value="1">1. いつも</div>
<div class="option" data-value="2">2. 全然</div>
<div class="option" data-value="3">3. 容易には</div>
<div class="option" data-value="4">4. めったに</div>
</div>
<div class="explanation">「なかなか〜しない」は容易にはしないという意味です。「全然・めったに」は意味が異なり、「なかなか」は「容易には」が最も近い言い換えです。</div>
</div>
</div>
<!-- 問題5: 用法 -->
<div class="section"><div class="section-title">問題5</div>
<div class="question" data-answer="2">
<div class="question-num">問31</div>
<div class="question-text">つぎの「<strong>むしろ</strong>」をつかった文として、いちばんよいものを１・２・３・４からひとつえらんでください。</div>
<div class="options">
<div class="option" data-value="1">1. 彼はむしろ毎日練習している。</div>
<div class="option" data-value="2">2. 暑いのが苦手なので、むしろ冬のほうが好きだ。</div>
<div class="option" data-value="3">3. 彼女はむしろ三人兄弟だ。</div>
<div class="option" data-value="4">4. むしろ駅まで歩いて五分だ。</div>
</div>
<div class="explanation">「むしろ」は比較して「そちらのほうがよい・そちらに近い」という意味です。2のように対比する文脈で使います。他の選択肢は対比の意味がなく不自然です。</div>
</div>
<div class="question" data-answer="1">
<div class="question-num">問32</div>
<div class="question-text">つぎの「<strong>なるべく</strong>」をつかった文として、いちばんよいものを１・２・３・４からひとつえらんでください。</div>
<div class="options">
<div class="option" data-value="1">1. 環境のために、なるべく車を使わないようにしている。</div>
<div class="option" data-value="2">2. 彼はなるべく背が高い。</div>
<div class="option" data-value="3">3. なるべく明日は雨だ。</div>
<div class="option" data-value="4">4. なるべく彼女は優しい人だ。</div>
</div>
<div class="explanation">「なるべく」は「できる限り」という意味で、努力の方向を示します。1が正しい使い方です。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問33</div>
<div class="question-text">つぎの「<strong>かえって</strong>」をつかった文として、いちばんよいものを１・２・３・４からひとつえらんでください。</div>
<div class="options">
<div class="option" data-value="1">1. 休んだらかえって元気になった。</div>
<div class="option" data-value="2">2. 彼女はかえって親切だ。</div>
<div class="option" data-value="3">3. 薬を飲んだら、かえって気分が悪くなった。</div>
<div class="option" data-value="4">4. かえって今日は晴れている。</div>
</div>
<div class="explanation">「かえって」は予想とは逆の結果になるときに使います。3が正しい使い方です。</div>
</div>
<div class="question" data-answer="2">
<div class="question-num">問34</div>
<div class="question-text">つぎの「<strong>まさか</strong>」をつかった文として、いちばんよいものを１・２・３・４からひとつえらんでください。</div>
<div class="options">
<div class="option" data-value="1">1. まさか今日は天気がいい。</div>
<div class="option" data-value="2">2. まさか彼が遅刻するとは思わなかった。</div>
<div class="option" data-value="3">3. 彼女はまさか料理が上手だ。</div>
<div class="option" data-value="4">4. まさか駅まで歩いて行った。</div>
</div>
<div class="explanation">「まさか」は予想外の出来事への驚きを表し、「まさか〜とは」の形でよく使います。1・3・4は普通の事実描写で「まさか」は入りません。</div>
</div>
<div class="question" data-answer="2">
<div class="question-num">問35</div>
<div class="question-text">つぎの「<strong>あわてる</strong>」をつかった文として、いちばんよいものを１・２・３・４からひとつえらんでください。</div>
<div class="options">
<div class="option" data-value="1">1. 試験が終わって、あわてて安心した。</div>
<div class="option" data-value="2">2. 財布を忘れたことに気づいて、あわてて家に戻った。</div>
<div class="option" data-value="3">3. 彼女はあわてて料理が上手だ。</div>
<div class="option" data-value="4">4. 毎朝あわてて起きている。</div>
</div>
<div class="explanation">「あわてる」は突然のことに驚いて急いで行動することです。1の「安心する」はあわてる状況と矛盾し、4は「毎朝」という習慣とあわてるの組み合わせが不自然です。2が正しい使い方です。</div>
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
