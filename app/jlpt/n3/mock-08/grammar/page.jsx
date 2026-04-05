'use client'
import AccessCheck from '../../../../AccessCheck'

export default function Page() {
  return (
    <>
      <AccessCheck level="N3" mockNum={8} />
      <div dangerouslySetInnerHTML={{ __html: `<!DOCTYPE html>

<html lang="ja">
<head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>JLPT N3 Grammar - MOCK-08 | Nihon GO!</title>
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
<h1>JLPT N3 Mock Test 08 - 文法</h1>
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
<div class="question-text">気温が下がる（　　）、木の葉の色も変わっていく。</div>
<div class="options">
<div class="option" data-value="1">1. に比べて</div>
<div class="option" data-value="2">2. にともなって</div>
<div class="option" data-value="3">3. を通して</div>
<div class="option" data-value="4">4. をもとに</div>
</div>
<div class="explanation">「にともなって」は一方の変化に連動してもう一方も変化することを表します。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問題2</div>
<div class="question-text">留学の経験（　　）、人として大きく成長できた。</div>
<div class="options">
<div class="option" data-value="1">1. に加えて</div>
<div class="option" data-value="2">2. に比べて</div>
<div class="option" data-value="3">3. を通して</div>
<div class="option" data-value="4">4. にしたがって</div>
</div>
<div class="explanation">「を通して」は「〜を媒介・手段として」という意味です。</div>
</div>
<div class="question" data-answer="4">
<div class="question-num">問題3</div>
<div class="question-text">この小説は作者自身の経験（　　）書かれた作品だ。</div>
<div class="options">
<div class="option" data-value="1">1. のせいで</div>
<div class="option" data-value="2">2. に比べて</div>
<div class="option" data-value="3">3. に加えて</div>
<div class="option" data-value="4">4. をもとに</div>
</div>
<div class="explanation">「をもとに」は「〜を基礎・根拠として」という意味です。</div>
</div>
<div class="question" data-answer="1">
<div class="question-num">問題4</div>
<div class="question-text">英語（　　）、フランス語も話せるので、海外での仕事に役立っている。</div>
<div class="options">
<div class="option" data-value="1">1. に加えて</div>
<div class="option" data-value="2">2. に比べて</div>
<div class="option" data-value="3">3. を通して</div>
<div class="option" data-value="4">4. をもとに</div>
</div>
<div class="explanation">「に加えて」は「〜のうえさらに」という付け加えを表します。</div>
</div>
<div class="question" data-answer="2">
<div class="question-num">問題5</div>
<div class="question-text">去年（　　）、今年は売上が大幅に増えた。</div>
<div class="options">
<div class="option" data-value="1">1. をもとに</div>
<div class="option" data-value="2">2. に比べて</div>
<div class="option" data-value="3">3. にしたがって</div>
<div class="option" data-value="4">4. てこそ</div>
</div>
<div class="explanation">「に比べて」は「〜と比較すると」という意味です。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問題6</div>
<div class="question-text">プロ（　　）、練習の厳しさも普通ではない。</div>
<div class="options">
<div class="option" data-value="1">1. に比べて</div>
<div class="option" data-value="2">2. を通して</div>
<div class="option" data-value="3">3. ともなると</div>
<div class="option" data-value="4">4. をもとに</div>
</div>
<div class="explanation">「ともなると」は「そのレベル・立場になると、当然〜だ」という意味です。</div>
</div>
<div class="question" data-answer="4">
<div class="question-num">問題7</div>
<div class="question-text">子供（　　）わかる問題なのに、なぜ間違えたのか。</div>
<div class="options">
<div class="option" data-value="1">1. ともなると</div>
<div class="option" data-value="2">2. をもとに</div>
<div class="option" data-value="3">3. に加えて</div>
<div class="option" data-value="4">4. でさえ</div>
</div>
<div class="explanation">「さえ」は「〜のような極端な例でも」という意味で強調を表します。</div>
</div>
<div class="question" data-answer="1">
<div class="question-num">問題8</div>
<div class="question-text">努力し（　　）、結果がついてくる。</div>
<div class="options">
<div class="option" data-value="1">1. てこそ</div>
<div class="option" data-value="2">2. に比べて</div>
<div class="option" data-value="3">3. をもとに</div>
<div class="option" data-value="">4. にしたがって</div>
</div>
<div class="explanation">「てこそ」は「〜して初めて、〜することで真に」という強調条件を表します。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問題9</div>
<div class="question-text">山田さんは料理上手な（　　）、掃除も完璧にこなす。</div>
<div class="options">
<div class="option" data-value="1">1. にしたがって</div>
<div class="option" data-value="2">2. をもとに</div>
<div class="option" data-value="3">3. うえに</div>
<div class="option" data-value="4">4. てこそ</div>
</div>
<div class="explanation">「うえに」は「〜に加えて、さらに」という意味です。</div>
</div>
<div class="question" data-answer="2">
<div class="question-num">問題10</div>
<div class="question-text">年齢を重ねる（　　）、体力が落ちていくのを感じる。</div>
<div class="options">
<div class="option" data-value="1">1. おかげで</div>
<div class="option" data-value="2">2. につれて</div>
<div class="option" data-value="3">3. を通して</div>
<div class="option" data-value="4">4. をもとに</div>
</div>
<div class="explanation">「につれて」は変化に伴ってもう一方も変化することを表します。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問題11</div>
<div class="question-text">ボランティア活動（　　）、地域の人々とつながることができた。</div>
<div class="options">
<div class="option" data-value="1">1. おかげで</div>
<div class="option" data-value="2">2. に比べて</div>
<div class="option" data-value="3">3. を通じて</div>
<div class="option" data-value="4">4. に加えて</div>
</div>
<div class="explanation">「を通じて」は「〜を媒介として」という意味です。</div>
</div>
<div class="question" data-answer="1">
<div class="question-num">問題12</div>
<div class="question-text">彼女は子供が3人いる（　　）、フルタイムで働いている。</div>
<div class="options">
<div class="option" data-value="1">1. にもかかわらず</div>
<div class="option" data-value="2">2. に比べて</div>
<div class="option" data-value="3">3. ともなると</div>
<div class="option" data-value="4">4. てこそ</div>
</div>
<div class="explanation">「にもかかわらず」は「〜なのに、それでも」という逆接を表します。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問題13</div>
<div class="question-text">苦労した（　　）、今の自分がある。</div>
<div class="options">
<div class="option" data-value="1">1. に比べて</div>
<div class="option" data-value="2">2. にもかかわらず</div>
<div class="option" data-value="3" data-value"="">3. からこそ</div>
<div class="option" data-value="4">4. をもとに</div>
</div>
<div class="explanation">「からこそ」は「〜だからこそ、そのことが理由で」という強調を表します。</div>
</div>
</div>
<!-- 問題2: 並べ替え -->
<div class="section"><div class="section-title">問題2 文の組み立て</div>
<p style="color:#666; font-size:0.9em; margin-bottom:16px;">次の文の ＿＿ に入る最もよいものを選んでください。</p>
<div class="question" data-answer="3">
<div class="question-num">問題14</div>
<div class="question-text">練習を重ねて ＿＿ ＿＿ ★ ＿＿ なった。</div>
<div class="options options-horizontal">
<div class="option" data-value="1">1. 英語が</div>
<div class="option" data-value="2">2. 流暢に</div>
<div class="option" data-value="3">3. 話せる</div>
<div class="option" data-value="4">4. ように</div>
</div>
<div class="explanation">正しい順序：「英語が流暢に話せるようになった」。★は「話せる」が入ります。</div>
</div>
<div class="question" data-answer="2">
<div class="question-num">問題15</div>
<div class="question-text">彼女の歌を聴いて ＿＿ ★ ＿＿ ＿＿ なかった。</div>
<div class="options options-horizontal">
<div class="option" data-value="1">1. 感動せ</div>
<div class="option" data-value="2">2. ずには</div>
<div class="option" data-value="3">3. いられ</div>
<div class="option" data-value="4">4. どうしても</div>
</div>
<div class="explanation">正しい順序：「どうしても感動せずにはいられなかった」。★は「ずには」が入ります。</div>
</div>
<div class="question" data-answer="2">
<div class="question-num">問題16</div>
<div class="question-text">悩んだ末に ＿＿ ★ ＿＿ ＿＿ した。</div>
<div class="options options-horizontal">
<div class="option" data-value="1">1. 会社を</div>
<div class="option" data-value="2">2. ことに</div>
<div class="option" data-value="3">3. 辞める</div>
<div class="option" data-value="4">4. 思い切って</div>
</div>
<div class="explanation">正しい順序：「思い切って会社を辞めることにした」。★は「ことに」が入ります。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問題17</div>
<div class="question-text">彼は ＿＿ ＿＿ ★ ＿＿ 続けた。</div>
<div class="options options-horizontal">
<div class="option" data-value="1">1. 疲れを</div>
<div class="option" data-value="2">2. 感じ</div>
<div class="option" data-value="3">3. ながらも</div>
<div class="option" data-value="4">4. 走り</div>
</div>
<div class="explanation">正しい順序：「疲れを感じながらも走り続けた」。★は「ながらも」が入ります。</div>
</div>
<div class="question" data-answer="2">
<div class="question-num">問題18</div>
<div class="question-text">彼女は ＿＿ ★ ＿＿ ＿＿ 話せる。</div>
<div class="options options-horizontal">
<div class="option" data-value="1">1. 英語に</div>
<div class="option" data-value="2">2. 加えて</div>
<div class="option" data-value="3">3. スペイン語と</div>
<div class="option" data-value="4">4. 中国語も</div>
</div>
<div class="explanation">正しい順序：「英語に加えてスペイン語と中国語も話せる」。★は「加えて」が入ります。</div>
</div>
</div>
<!-- 問題3: 文章文法 -->
<div class="actions">
<div class="section-box">
<div class="section-title">問題3 文章の文法</div>
<div class="section-desc">次の文章を読んで、文章全体の内容を考えて、（19）から（23）の中に入る最もよいものを、1・2・3・4から一つ選びなさい。</div>
<div class="passage-section">
<div class="passage-box">
日本の伝統工芸は、職人が長年（　<b>19</b>　）技術を次の世代に伝えることで守られてきた。しかし近年、後継者不足が（　<b>20</b>　）、伝統工芸の未来は不透明だ。<br/><br/>
若者が伝統工芸の職人に（　<b>21</b>　）のは、収入の低さや修行期間の長さが原因だ。一方で、SNSを（　<b>22</b>　）伝統工芸の魅力を発信し、若い世代に広める取り組みも始まっている。<br/><br/>
伝統を守り（　<b>23</b>　）、新しい時代に合わせて変化することも必要ではないだろうか。
</div>
<div class="passage-questions">
<div class="question" data-answer="1">
<div class="question-num">問題19</div>
<div class="question-text">（19）</div>
<div class="options options-horizontal">
<div class="option" data-value="1">1. 磨いてきた</div>
<div class="option" data-value="2">2. 忘れてきた</div>
<div class="option" data-value="3">3. 壊してきた</div>
<div class="option" data-value="4">4. 捨ててきた</div>
</div>
<div class="explanation">職人が長年「磨いてきた」技術という表現が最も自然です。</div>
</div>
<div class="question" data-answer="1">
<div class="question-num">問題20</div>
<div class="question-text">（20）</div>
<div class="options options-horizontal">
<div class="option" data-value="1">1. 深刻なため</div>
<div class="option" data-value="2">2. 解決したため</div>
<div class="option" data-value="3">3. 減ったため</div>
<div class="option" data-value="4">4. なくなったため</div>
</div>
<div class="explanation">「後継者不足が深刻なため、伝統工芸の未来は不透明だ」が文脈に合います。</div>
</div>
<div class="question" data-answer="4">
<div class="question-num">問題21</div>
<div class="question-text">（21）</div>
<div class="options options-horizontal">
<div class="option" data-value="1">1. 興味を持つ</div>
<div class="option" data-value="2">2. 集まっている</div>
<div class="option" data-value="3">3. 増えている</div>
<div class="option" data-value="4">4. なりたがらない</div>
</div>
<div class="explanation">若者が職人に「なりたがらない」理由として収入や修行期間が挙げられています。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問題22</div>
<div class="question-text">（22）</div>
<div class="options options-horizontal">
<div class="option" data-value="1">1. 比べて</div>
<div class="option" data-value="2">2. もとに</div>
<div class="option" data-value="3">3. 活用して</div>
<div class="option" data-value="4">4. 加えて</div>
</div>
<div class="explanation">「SNSを活用して発信する」が最も自然な表現です。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問題23</div>
<div class="question-text">（23）</div>
<div class="options options-horizontal">
<div class="option" data-value="1">1. だけでなく</div>
<div class="option" data-value="2">2. ために</div>
<div class="option" data-value="3">3. つつも</div>
<div class="option" data-value="4">4. からには</div>
</div>
<div class="explanation">「伝統を守りつつも、変化することも必要」という逆接の継続が文脈に合います。</div>
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
