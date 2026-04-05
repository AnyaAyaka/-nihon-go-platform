'use client'
import AccessCheck from '../../../AccessCheck'

export default function Page() {
  return (
    <>
      <AccessCheck level="N3" mockNum={10} />
      <div dangerouslySetInnerHTML={{ __html: `<!DOCTYPE html>

<html lang="ja">
<head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>JLPT N3 Grammar - MOCK-10 | Nihon GO!</title>
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
        .options-horizontal { display: flex; flex-wrap: wrap; gap: 8px; }
        .options-horizontal .option { flex: 0 0 auto; min-width: 120px; }
        .option { padding: 12px 16px; border: 2px solid #e5e7eb; border-radius: 8px; cursor: pointer; transition: all 0.15s; background: #fff; color: #333; font-size: 1rem; text-align: left; }
        .option:hover { border-color: #06b6d4; background: #ecfeff; }
        .option.selected { border-color: #06b6d4; background: #ecfeff; }
        .option.correct { border-color: #06b6d4; background: #cffafe; }
        .option.incorrect { border-color: #ef4444; background: #fee2e2; }
        .explanation { margin-top: 12px; padding: 12px; background: #fef3c7; border-radius: 6px; display: none; font-size: 0.9em; }
        .passage-section { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; align-items: start; }
        .passage-box { background: #f8fafc; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; line-height: 2; position: sticky; top: 80px; font-size: 0.95rem; }
        .passage-questions { display: flex; flex-direction: column; gap: 16px; }
        @media (max-width: 768px) { .passage-section { grid-template-columns: 1fr; } .passage-box { position: static; } }
        .section-box { background: #fff; border-radius: 12px; padding: 24px; margin-bottom: 20px; border: 1px solid #e5e7eb; }
        .section-desc { color: #666; font-size: 0.9em; margin-bottom: 20px; }
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
<div class="timer" id="timer">70:00</div>
</div>
</header>
<div class="container">
<h1>JLPT N3 Mock Test 10 - 文法</h1>
<div class="nav-back-row">
<a class="nav-back" href="/materials/jlpt/n3/">← 問題一覧</a>
</div>
<div class="nav">
<a href="vocabulary.html">語彙</a><a class="active" href="grammar.html">文法</a><a href="reading.html">読解</a><a href="listening.html">聴解</a>
</div>
<!-- 問題1: 文法形式 -->
<div class="section"><div class="section-title">問題1 文法形式</div>
<div class="question" data-answer="3">
<div class="question-num">問題1</div>
<div class="question-text">外が暗い（　　）、もう夜になったとわかった。</div>
<div class="options">
<div class="option" data-value="1">1. ことなく</div>
<div class="option" data-value="2">2. ないことには</div>
<div class="option" data-value="3">3. ことから</div>
<div class="option" data-value="4">4. にほかならない</div>
</div>
<div class="explanation">「ことから」は「〜という事実・状況を根拠として」という意味です。</div>
</div>
<div class="question" data-answer="4">
<div class="question-num">問題2</div>
<div class="question-text">実際にやってみ（　　）、本当の難しさはわからない。</div>
<div class="options">
<div class="option" data-value="1">1. ことから</div>
<div class="option" data-value="2">2. ことなく</div>
<div class="option" data-value="3">3. にほかならない</div>
<div class="option" data-value="4">4. ないことには</div>
</div>
<div class="explanation">「ないことには」は「〜しなければ〜できない」という条件を表します。</div>
</div>
<div class="question" data-answer="2">
<div class="question-num">問題3</div>
<div class="question-text">彼女は一度も諦める（　　）、目標を達成した。</div>
<div class="options">
<div class="option" data-value="1">1. ないことには</div>
<div class="option" data-value="2">2. ことなく</div>
<div class="option" data-value="3">3. ものだ</div>
<div class="option" data-value="4">4. まい</div>
</div>
<div class="explanation">「ことなく」は「〜せずに、〜しないで」という意味です。</div>
</div>
<div class="question" data-answer="1">
<div class="question-num">問題4</div>
<div class="question-text">彼の成功は、毎日の努力の結果（　　）。</div>
<div class="options">
<div class="option" data-value="1">1. にほかならない</div>
<div class="option" data-value="2">2. ことから</div>
<div class="option" data-value="3">3. ないことには</div>
<div class="option" data-value="4">4. ことなく</div>
</div>
<div class="explanation">「にほかならない」は「まさに〜だ、〜に他ならない」という断定の強調を表します。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問題5</div>
<div class="question-text">子供の頃はよく祖父と釣りに行った（　　）。</div>
<div class="options">
<div class="option" data-value="1">1. にほかならない</div>
<div class="option" data-value="2">2. ことなく</div>
<div class="option" data-value="3">3. ものだ</div>
<div class="option" data-value="4">4. ことから</div>
</div>
<div class="explanation">「ものだ」は過去の習慣や思い出を表します。「〜したものだ」の形で使います。</div>
</div>
<div class="question" data-answer="4">
<div class="question-num">問題6</div>
<div class="question-text">二度とあんな失敗はする（　　）と心に誓った。</div>
<div class="options">
<div class="option" data-value="1">1. ことから</div>
<div class="option" data-value="2">2. ものだ</div>
<div class="option" data-value="3">3. ないことには</div>
<div class="option" data-value="4">4. まい</div>
</div>
<div class="explanation">「まい」は「〜しないつもりだ、〜するまい」という否定の意志を表します。</div>
</div>
<div class="question" data-answer="2">
<div class="question-num">問題7</div>
<div class="question-text">名前が外国語のように聞こえる（　　）、外国人と間違えられることがある。</div>
<div class="options">
<div class="option" data-value="1">1. ないことには</div>
<div class="option" data-value="2">2. ことから</div>
<div class="option" data-value="3">3. まい</div>
<div class="option" data-value="4">4. にほかならない</div>
</div>
<div class="explanation">「ことから」は名前が外国語に聞こえるという根拠から間違えられることを表します。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問題8</div>
<div class="question-text">努力した（　　）、今の成功がある。</div>
<div class="options">
<div class="option" data-value="1">1. ないことには</div>
<div class="option" data-value="2">2. まい</div>
<div class="option" data-value="3">3. からこそ</div>
<div class="option" data-value="4">4. ことなく</div>
</div>
<div class="explanation">「からこそ」は「〜だからこそ、そのことが理由で」という強調を表します。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問題9</div>
<div class="question-text">昔は電車の中で本を読む人が多かった（　　）。</div>
<div class="options">
<div class="option" data-value="1">1. ことから</div>
<div class="option" data-value="2">2. まい</div>
<div class="option" data-value="3">3. ものだ</div>
<div class="option" data-value="4">4. ことなく</div>
</div>
<div class="explanation">「ものだ」は過去の様子や当時の状況を振り返るときに使います。</div>
</div>
<div class="question" data-answer="4">
<div class="question-num">問題10</div>
<div class="question-text">彼は休まず働き続け、一度も文句を言う（　　）完走した。</div>
<div class="options">
<div class="option" data-value="1">1. ないことには</div>
<div class="option" data-value="2">2. ことから</div>
<div class="option" data-value="3">3. にほかならない</div>
<div class="option" data-value="4">4. ことなく</div>
</div>
<div class="explanation">「ことなく」は一度も文句を言わずに完走したという意味です。</div>
</div>
<div class="question" data-answer="2">
<div class="question-num">問題11</div>
<div class="question-text">彼女がこんなに上手なのは、毎日練習してきた証拠（　　）。</div>
<div class="options">
<div class="option" data-value="1">1. ことなく</div>
<div class="option" data-value="2">2. にほかならない</div>
<div class="option" data-value="3">3. まい</div>
<div class="option" data-value="4">4. ものだ</div>
</div>
<div class="explanation">「にほかならない」は毎日の練習がまさに上手さの理由だという断定を表します。</div>
</div>
<div class="question" data-answer="1">
<div class="question-num">問題12</div>
<div class="question-text">もう二度と彼には頼む（　　）と思っている。</div>
<div class="options">
<div class="option" data-value="1">1. まい</div>
<div class="option" data-value="2">2. ことから</div>
<div class="option" data-value="3">3. ないことには</div>
<div class="option" data-value="4">4. ことなく</div>
</div>
<div class="explanation">「まい」は二度と頼まないという強い否定の意志を表します。</div>
</div>
<div class="question" data-answer="4">
<div class="question-num">問題13</div>
<div class="question-text">長い話し合いの（　　）、ようやく結論が出た。</div>
<div class="options">
<div class="option" data-value="1">1. たびに</div>
<div class="option" data-value="2">2. ことなく</div>
<div class="option" data-value="3">3. まい</div>
<div class="option" data-value="4">4. のすえに</div>
</div>
<div class="explanation">「のすえに」は「長い時間や努力の末に」という意味です。</div>
</div>
</div>
<!-- 問題2: 並べ替え -->
<div class="section"><div class="section-title">問題2 文の組み立て</div>
<p style="color:#666; font-size:0.9em; margin-bottom:16px;">次の文の ＿＿ に入る最もよいものを選んでください。</p>
<div class="question" data-answer="4">
<div class="question-num">問題14</div>
<div class="question-text">彼女は ＿＿ ★ ＿＿ ＿＿ 達成した。</div>
<div class="options options-horizontal">
<div class="option" data-value="1">1. ことなく</div>
<div class="option" data-value="2">2. 一度も</div>
<div class="option" data-value="3">3. 目標を</div>
<div class="option" data-value="4">4. 諦める</div>
</div>
<div class="explanation">正しい順序：「一度も諦めることなく目標を達成した」。★は「諦める」が入ります。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問題15</div>
<div class="question-text">彼女が合格できたのは ＿＿ ★ ＿＿ ＿＿ だ。</div>
<div class="options options-horizontal">
<div class="option" data-value="1">1. くれた</div>
<div class="option" data-value="2">2. 先生が</div>
<div class="option" data-value="3">3. 指導して</div>
<div class="option" data-value="4">4. おかげ</div>
</div>
<div class="explanation">正しい順序：「先生が指導してくれたおかげだ」。★は「指導して」が入ります。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問題16</div>
<div class="question-text">子供の頃は ＿＿ ★ ＿＿ ＿＿ ものだ。</div>
<div class="options options-horizontal">
<div class="option" data-value="1">1. 夢中に</div>
<div class="option" data-value="2">2. なった</div>
<div class="option" data-value="3">3. ゲームに</div>
<div class="option" data-value="">4. よく</div>
</div>
<div class="explanation">正しい順序：「よくゲームに夢中になったものだ」。★は「ゲームに」が入ります。</div>
</div>
<div class="question" data-answer="1">
<div class="question-num">問題17</div>
<div class="question-text">直接 ＿＿ ★ ＿＿ ＿＿ わからない。</div>
<div class="options options-horizontal">
<div class="option" data-value="1">1. 話して</div>
<div class="option" data-value="2">2. ないことには</div>
<div class="option" data-value="3">3. みない</div>
<div class="option" data-value="4">4. 真相は</div>
</div>
<div class="explanation">正しい順序：「直接話してみないことには真相はわからない」。★は「話して」が入ります。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問題18</div>
<div class="question-text">彼は ＿＿ ＿＿ ★ ＿＿ 卒業した。</div>
<div class="options options-horizontal">
<div class="option" data-value="1">1. 一度も</div>
<div class="option" data-value="2">2. ことなく</div>
<div class="option" data-value="3">3. 休む</div>
<div class="option" data-value="4">4. 学校を</div>
</div>
<div class="explanation">正しい順序：「一度も休むことなく学校を卒業した」。★は「休む」が入ります。</div>
</div>
</div>
<!-- 問題3: 文章文法 -->
<div class="actions">
<div class="section-box">
<div class="section-title">問題3 文章の文法</div>
<div class="section-desc">次の文章を読んで、文章全体の内容を考えて、（19）から（23）の中に入る最もよいものを、1・2・3・4から一つ選びなさい。</div>
<div class="passage-section">
<div class="passage-box">
最近、スマートフォンを使いすぎる（　<b>19</b>　）、睡眠不足になる人が増えている。夜遅くまで画面を見ることで脳が刺激され、なかなか眠（　<b>20</b>　）。こうした生活が続くと、健康への影響は避け（　<b>21</b>　）。スマートフォンは便利な道具だが、使い方（　<b>22</b>　）、生活の質が大きく変わる。うまく付き合う（　<b>23</b>　）、まず自分の使用時間を把握することが大切だ。
</div>
<div class="passage-questions">
<div class="question" data-answer="3">
<div class="question-num">問題19</div>
<div class="question-text">（19）</div>
<div class="options options-horizontal">
<div class="option" data-value="1">1. ながら</div>
<div class="option" data-value="2">2. ものの</div>
<div class="option" data-value="3">3. ことから</div>
<div class="option" data-value="4">4. ために</div>
</div>
<div class="explanation">「ことから」は「〜という事実を根拠として」という意味です。</div>
</div>
<div class="question" data-answer="2">
<div class="question-num">問題20</div>
<div class="question-text">（20）</div>
<div class="options options-horizontal">
<div class="option" data-value="1">1. られない</div>
<div class="option" data-value="2">2. れなくなる</div>
<div class="option" data-value="3">3. てしまった</div>
<div class="option" data-value="4">4. るべきだ</div>
</div>
<div class="explanation">「眠れなくなる」が文脈に最も合います。</div>
</div>
<div class="question" data-answer="4">
<div class="question-num">問題21</div>
<div class="question-text">（21）</div>
<div class="options options-horizontal">
<div class="option" data-value="1">1. るべきだ</div>
<div class="option" data-value="2">2. られるはずだ</div>
<div class="option" data-value="3">3. るわけがない</div>
<div class="option" data-value="4">4. られない</div>
</div>
<div class="explanation">「健康への影響は避けられない」が文脈に合います。</div>
</div>
<div class="question" data-answer="1">
<div class="question-num">問題22</div>
<div class="question-text">（22）</div>
<div class="options options-horizontal">
<div class="option" data-value="1">1. によって</div>
<div class="option" data-value="2">2. ながら</div>
<div class="option" data-value="3">3. ものの</div>
<div class="option" data-value="4">4. ことから</div>
</div>
<div class="explanation">「使い方によって生活の質が変わる」が最も自然です。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問題23</div>
<div class="question-text">（23）</div>
<div class="options options-horizontal">
<div class="option" data-value="1">1. ことから</div>
<div class="option" data-value="2">2. ながら</div>
<div class="option" data-value="3">3. ためには</div>
<div class="option" data-value="4">4. ものの</div>
</div>
<div class="explanation">「うまく付き合うためには」が文脈に合います。</div>
</div>
</div>
</div>
</div>
<button class="btn-submit" onclick="checkAnswers()">採点する</button>
</div>
<div class="score" id="score">
<div class="score-num" id="score-num"></div>
<div class="score-label">Score: <span id="score-pct"></span></div>
<a class="next-section-btn" href="reading.html" id="next-btn" style="display: none;">次：読解 →</a>
</div>
</div>
<script>
        let timeLeft = 4200;
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
