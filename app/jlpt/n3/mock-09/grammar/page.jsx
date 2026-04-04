'use client'
export default function Page() {
  return (
    <div dangerouslySetInnerHTML={{ __html: `<!DOCTYPE html>

<html lang="ja">
<head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>JLPT N3 Grammar - MOCK-09 | Nihon GO!</title>
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
<h1>JLPT N3 Mock Test 09 - 文法</h1>
<div class="nav-back-row">
<a class="nav-back" href="/materials/jlpt/n3/">← 問題一覧</a>
</div>
<div class="nav">
<a href="vocabulary.html">語彙</a><a class="active" href="grammar.html">文法</a><a href="reading.html">読解</a><a href="listening.html">聴解</a>
</div>
<!-- 問題1: 文法形式 -->
<div class="section"><div class="section-title">問題1 文法形式</div>
<div class="question" data-answer="2">
<div class="question-num">問題1</div>
<div class="question-text">彼の態度（　　）、やる気がないのは明らかだ。</div>
<div class="options">
<div class="option" data-value="1">1. にあたって</div>
<div class="option" data-value="2">2. からして</div>
<div class="option" data-value="3">3. を中心に</div>
<div class="option" data-value="4">4. に先立って</div>
</div>
<div class="explanation">「からして」は「〜を見ただけで、〜から判断しても明らかだ」という意味です。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問題2</div>
<div class="question-text">新しいプロジェクトを始める（　　）、チーム全員で目標を確認した。</div>
<div class="options">
<div class="option" data-value="1">1. からして</div>
<div class="option" data-value="2">2. を中心に</div>
<div class="option" data-value="3">3. にあたって</div>
<div class="option" data-value="4">4. とは限らない</div>
</div>
<div class="explanation">「にあたって」は「〜する際に、〜するに当たって」という意味です。</div>
</div>
<div class="question" data-answer="4">
<div class="question-num">問題3</div>
<div class="question-text">この地区の再開発は駅前（　　）進められている。</div>
<div class="options">
<div class="option" data-value="1">1. からして</div>
<div class="option" data-value="2">2. にあたって</div>
<div class="option" data-value="3">3. に先立って</div>
<div class="option" data-value="4">4. を中心に</div>
</div>
<div class="explanation">「を中心に」は「〜を軸として、〜を中心として」という意味です。</div>
</div>
<div class="question" data-answer="2">
<div class="question-num">問題4</div>
<div class="question-text">彼女は泣き（　　）、最後まで発表をやり遂げた。</div>
<div class="options">
<div class="option" data-value="1">1. からして</div>
<div class="option" data-value="2">2. ながらも</div>
<div class="option" data-value="3">3. かねない</div>
<div class="option" data-value="4">4. かねて</div>
</div>
<div class="explanation">「ながらも」は「〜しながらも、それでも」という逆接の継続を表します。</div>
</div>
<div class="question" data-answer="2">
<div class="question-num">問題5</div>
<div class="question-text">このまま練習をさぼっていると、試合に負け（　　）。</div>
<div class="options">
<div class="option" data-value="1">1. かねます</div>
<div class="option" data-value="2">2. かねない</div>
<div class="option" data-value="3">3. に先立って</div>
<div class="option" data-value="4">4. とは限らない</div>
</div>
<div class="explanation">「かねない」は「〜する危険性がある」という意味です。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問題6</div>
<div class="question-text">彼女は仕事が忙しい（　　）、ボランティア活動もしている。</div>
<div class="options">
<div class="option" data-value="1">1. からして</div>
<div class="option" data-value="2">2. かねない</div>
<div class="option" data-value="3">3. ばかりか</div>
<div class="option" data-value="4">4. とは限らない</div>
</div>
<div class="explanation">「ばかりか」は「〜だけでなく、さらに〜も」という意味です。</div>
</div>
<div class="question" data-answer="4">
<div class="question-num">問題7</div>
<div class="question-text">式典の開始（　　）、主催者から挨拶があった。</div>
<div class="options">
<div class="option" data-value="1">1. からして</div>
<div class="option" data-value="2">2. を中心に</div>
<div class="option" data-value="3">3. かねない</div>
<div class="option" data-value="4">4. に先立って</div>
</div>
<div class="explanation">「に先立って」は「〜の前に、〜に先行して」という意味です。</div>
</div>
<div class="question" data-answer="1">
<div class="question-num">問題8</div>
<div class="question-text">値段が高いからといって、品質がいい（　　）。</div>
<div class="options">
<div class="option" data-value="1">1. とは限らない</div>
<div class="option" data-value="2">2. からして</div>
<div class="option" data-value="3">3. に先立って</div>
<div class="option" data-value="4">4. にあたって</div>
</div>
<div class="explanation">「とは限らない」は「必ずしも〜ではない」という意味です。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問題9</div>
<div class="question-text">上司への反論は、なかなか言い（　　）。</div>
<div class="options">
<div class="option" data-value="1">1. ながらも</div>
<div class="option" data-value="2">2. からして</div>
<div class="option" data-value="3">3. かねる</div>
<div class="option" data-value="4">4. に先立って</div>
</div>
<div class="explanation">「かねる」は「〜しにくい、〜するのが難しい」という意味です。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問題10</div>
<div class="question-text">今回のミスは、彼の不注意（　　）だと言わざるを得ない。</div>
<div class="options">
<div class="option" data-value="1">1. からして</div>
<div class="option" data-value="2">2. にあたって</div>
<div class="option" data-value="3">3. のせい</div>
<div class="option" data-value="4">4. を中心に</div>
</div>
<div class="explanation">「のせい」は「〜が原因で、〜のために（悪い結果）」という意味です。</div>
</div>
<div class="question" data-answer="2">
<div class="question-num">問題11</div>
<div class="question-text">雨が降っている（　　）、彼は傘を持たずに出かけた。</div>
<div class="options">
<div class="option" data-value="1">1. からして</div>
<div class="option" data-value="2">2. にもかかわらず</div>
<div class="option" data-value="3">3. を中心に</div>
<div class="option" data-value="4">4. に先立って</div>
</div>
<div class="explanation">「にもかかわらず」は「〜なのに、それでも」という逆接を表します。</div>
</div>
<div class="question" data-answer="4">
<div class="question-num">問題12</div>
<div class="question-text">長年の努力（　　）、彼女はついに夢を実現した。</div>
<div class="options">
<div class="option" data-value="1">1. からして</div>
<div class="option" data-value="2">2. を中心に</div>
<div class="option" data-value="3">3. に先立って</div>
<div class="option" data-value="4">4. のすえに</div>
</div>
<div class="explanation">「のすえに」は「長い時間や努力の末に」という意味です。</div>
</div>
<div class="question" data-answer="2">
<div class="question-num">問題13</div>
<div class="question-text">苦労した（　　）、成功の喜びがわかる。</div>
<div class="options">
<div class="option" data-value="1">1. からして</div>
<div class="option" data-value="2">2. からこそ</div>
<div class="option" data-value="3">3. を中心に</div>
<div class="option" data-value="4">4. に先立って</div>
</div>
<div class="explanation">「からこそ」は「〜だからこそ、そのことが理由で」という強調を表します。</div>
</div>
</div>
<!-- 問題2: 並べ替え -->
<div class="section"><div class="section-title">問題2 文の組み立て</div>
<p style="color:#666; font-size:0.9em; margin-bottom:16px;">次の文の ＿＿ に入る最もよいものを選んでください。</p>
<div class="question" data-answer="3">
<div class="question-num">問題14</div>
<div class="question-text">彼女の顔を見る ＿＿ ★ ＿＿ ＿＿ 思い出す。</div>
<div class="options options-horizontal">
<div class="option" data-value="1">1. 故郷の</div>
<div class="option" data-value="2">2. 景色を</div>
<div class="option" data-value="3">3. 母と過ごした</div>
<div class="option" data-value="4">4. たびに</div>
</div>
<div class="explanation">正しい順序：「見るたびに母と過ごした故郷の景色を思い出す」。★は「母と過ごした」が入ります。</div>
</div>
<div class="question" data-answer="2">
<div class="question-num">問題15</div>
<div class="question-text">医者に ＿＿ ★ ＿＿ ＿＿ した。</div>
<div class="options options-horizontal">
<div class="option" data-value="1">1. 勧められ</div>
<div class="option" data-value="2">2. て</div>
<div class="option" data-value="3">3. 禁煙する</div>
<div class="option" data-value="4">4. ことに</div>
</div>
<div class="explanation">正しい順序：「医者に勧められて禁煙することにした」。★は「て」が入ります。</div>
</div>
<div class="question" data-answer="1">
<div class="question-num">問題16</div>
<div class="question-text">子供の頃から ＿＿ ★ ＿＿ ＿＿ なった。</div>
<div class="options options-horizontal">
<div class="option" data-value="1">1. 重ねて</div>
<div class="option" data-value="2">2. 練習を</div>
<div class="option" data-value="3">3. 泳げる</div>
<div class="option" data-value="4">4. ように</div>
</div>
<div class="explanation">正しい順序：「練習を重ねて泳げるようになった」。★は「重ねて」が入ります。</div>
</div>
<div class="question" data-answer="4">
<div class="question-num">問題17</div>
<div class="question-text">彼女は ＿＿ ＿＿ ★ ＿＿ 合格した。</div>
<div class="options options-horizontal">
<div class="option" data-value="1">1. 努力</div>
<div class="option" data-value="2">2. 試験に</div>
<div class="option" data-value="3">3. 長年の</div>
<div class="option" data-value="4">4. のすえに</div>
</div>
<div class="explanation">正しい順序：「長年の努力のすえに試験に合格した」。★は「のすえに」が入ります。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問題18</div>
<div class="question-text">苦労した ＿＿ ＿＿ ★ ＿＿ なれた。</div>
<div class="options options-horizontal">
<div class="option" data-value="1">1. から</div>
<div class="option" data-value="2">2. 強く</div>
<div class="option" data-value="3">3. 精神的に</div>
<div class="option" data-value="4">4. こそ</div>
</div>
<div class="explanation">正しい順序：「苦労したからこそ精神的に強くなれた」。★は「精神的に」が入ります。</div>
</div>
</div>
<!-- 問題3: 文章文法 -->
<div class="actions">
<div class="section-box">
<div class="section-title">問題3 文章の文法</div>
<div class="section-desc">次の文章を読んで、文章全体の内容を考えて、（19）から（23）の中に入る最もよいものを、1・2・3・4から一つ選びなさい。</div>
<div class="passage-section">
<div class="passage-box">
                    最近、SNSを（　<b>19</b>　）情報を得る人が増えている。手軽に情報を集められる（　<b>20</b>　）、誰でも発信できるため、信頼性の低い情報も（　<b>21</b>　）。<br/><br/>
                    情報を見る際は、複数の情報源を（　<b>22</b>　）確認することが大切だ。SNSの情報が正しい（　<b>23</b>　）ので、慎重に判断する必要がある。
                </div>
<div class="passage-questions">
<div class="question" data-answer="3">
<div class="question-num">問題19</div>
<div class="question-text">（19）</div>
<div class="options options-horizontal">
<div class="option" data-value="1">1. のために</div>
<div class="option" data-value="2">2. くらべて</div>
<div class="option" data-value="3">3. 通じて</div>
<div class="option" data-value="4">4. 先立って</div>
</div>
<div class="explanation">「SNSを通じて情報を得る」が最も自然な表現です。</div>
</div>
<div class="question" data-answer="2">
<div class="question-num">問題20</div>
<div class="question-text">（20）</div>
<div class="options options-horizontal">
<div class="option" data-value="1">1. からして</div>
<div class="option" data-value="2">2. 一方で</div>
<div class="option" data-value="3">3. にあたって</div>
<div class="option" data-value="4">4. ばかりか</div>
</div>
<div class="explanation">「手軽に集められる一方で、信頼性の低い情報もある」という対比が自然です。</div>
</div>
<div class="question" data-answer="4">
<div class="question-num">問題21</div>
<div class="question-text">（21）</div>
<div class="options options-horizontal">
<div class="option" data-value="1">1. 少ない</div>
<div class="option" data-value="2">2. 正確だ</div>
<div class="option" data-value="3">3. 信頼できる</div>
<div class="option" data-value="4">4. 混ざっている</div>
</div>
<div class="explanation">信頼性の低い情報も「混ざっている」が文脈に合います。</div>
</div>
<div class="question" data-answer="1">
<div class="question-num">問題22</div>
<div class="question-text">（22）</div>
<div class="options options-horizontal">
<div class="option" data-value="1">1. 比べながら</div>
<div class="option" data-value="2">2. 無視して</div>
<div class="option" data-value="3">3. 信じて</div>
<div class="option" data-value="4">4. 捨てて</div>
</div>
<div class="explanation">複数の情報源を「比べながら確認する」ことが情報リテラシーの基本です。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問題23</div>
<div class="question-text">（23）</div>
<div class="options options-horizontal">
<div class="option" data-value="1">1. からして</div>
<div class="option" data-value="2">2. にあたって</div>
<div class="option" data-value="3">3. とは限らない</div>
<div class="option" data-value="4">4. を中心に</div>
</div>
<div class="explanation">「SNSの情報が正しいとは限らない」という文脈が適切です。</div>
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
  )
}
