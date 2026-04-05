'use client'
import AccessCheck from '../../../AccessCheck'

export default function Page() {
  return (
    <>
      <AccessCheck level="N3" mockNum={3} />
      <div dangerouslySetInnerHTML={{ __html: `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JLPT N3 Grammar - MOCK-03 | Nihon GO!</title>
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
            <a href="https://nihongo-world.com" class="logo">Nihon <span>GO!</span></a>
            <div class="timer" id="timer">70:00</div>
        </div>
    </header>
    <div class="container">
        <h1>JLPT N3 Mock Test 03 - 文法</h1>
        <div class="nav-back-row">
            <a href="/materials/jlpt/n3/" class="nav-back">&#8592; 問題一覧</a>
        </div>
        <div class="nav">
            <a href="vocabulary.html">語彙</a><a href="grammar.html" class="active">文法</a><a href="reading.html">読解</a><a href="listening.html">聴解</a>
        </div>

        <!-- 問題1: 文法形式 -->
        <div class="section"><div class="section-title">問題1 文法形式</div>

        <div class="question" data-answer="2">
            <div class="question-num">問題1</div>
            <div class="question-text">先生（　　）、苦手な数学が好きになった。</div>
            <div class="options">
                <div class="option" data-value="1">1. のせいで</div>
                <div class="option" data-value="2">2. のおかげで</div>
                <div class="option" data-value="3">3. のことで</div>
                <div class="option" data-value="4">4. のために</div>
            </div>
            <div class="explanation">「おかげで」は良い結果の原因を表します。数学が好きになったというポジティブな結果に合います。</div>
        </div>

        <div class="question" data-answer="3">
            <div class="question-num">問題2</div>
            <div class="question-text">天気が悪い（　　）、試合は予定通り行われた。</div>
            <div class="options">
                <div class="option" data-value="1">1. ために</div>
                <div class="option" data-value="2">2. からには</div>
                <div class="option" data-value="3">3. ものの</div>
                <div class="option" data-value="4">4. おかげで</div>
            </div>
            <div class="explanation">「ものの」は「〜だが、しかし」という逆接を表します。</div>
        </div>

        <div class="question" data-answer="1">
            <div class="question-num">問題3</div>
            <div class="question-text">彼女は子育て（　　）、仕事も続けている。</div>
            <div class="options">
                <div class="option" data-value="1">1. のかたわら</div>
                <div class="option" data-value="2">2. を通して</div>
                <div class="option" data-value="3">3. にとって</div>
                <div class="option" data-value="4">4. にかわって</div>
            </div>
            <div class="explanation">「のかたわら」は「〜をしながら、同時に別のこともする」という意味です。</div>
        </div>

        <div class="question" data-answer="4">
            <div class="question-num">問題4</div>
            <div class="question-text">この仕事は経験者（　　）難しくない。</div>
            <div class="options">
                <div class="option" data-value="1">1. によって</div>
                <div class="option" data-value="2">2. に関して</div>
                <div class="option" data-value="3">3. に対して</div>
                <div class="option" data-value="4">4. にとって</div>
            </div>
            <div class="explanation">「にとって」は立場・観点を表します。「経験者の立場から見れば」という意味です。</div>
        </div>

        <div class="question" data-answer="2">
            <div class="question-num">問題5</div>
            <div class="question-text">彼は日本に来る（　　）、必ずこのラーメン屋に寄る。</div>
            <div class="options">
                <div class="option" data-value="1">1. からには</div>
                <div class="option" data-value="2">2. たびに</div>
                <div class="option" data-value="3">3. うちに</div>
                <div class="option" data-value="4">4. ままに</div>
            </div>
            <div class="explanation">「たびに」は「〜するときはいつも」という繰り返しを表します。</div>
        </div>

        <div class="question" data-answer="3">
            <div class="question-num">問題6</div>
            <div class="question-text">エアコンをつけ（　　）寝てしまった。</div>
            <div class="options">
                <div class="option" data-value="1">1. さえすれば</div>
                <div class="option" data-value="2">2. てからでないと</div>
                <div class="option" data-value="3">3. っぱなしで</div>
                <div class="option" data-value="4">4. とたんに</div>
            </div>
            <div class="explanation">「っぱなし」は状態が続いたままであることを表します。エアコンをつけたままにして寝たという意味です。</div>
        </div>

        <div class="question" data-answer="1">
            <div class="question-num">問題7</div>
            <div class="question-text">お金（　　）あれば、旅行に行けるのに。</div>
            <div class="options">
                <div class="option" data-value="1">1. さえ</div>
                <div class="option" data-value="2">2. しか</div>
                <div class="option" data-value="3">3. こそ</div>
                <div class="option" data-value="4">4. ほど</div>
            </div>
            <div class="explanation">「さえ〜ば」は「〜だけが条件」という意味を表します。</div>
        </div>

        <div class="question" data-answer="4">
            <div class="question-num">問題8</div>
            <div class="question-text">その計画は費用がかかりすぎる（　　）、実現が難しい。</div>
            <div class="options">
                <div class="option" data-value="1">1. ものの</div>
                <div class="option" data-value="2">2. からには</div>
                <div class="option" data-value="3">3. おかげで</div>
                <div class="option" data-value="4">4. せいで</div>
            </div>
            <div class="explanation">「せいで」は悪い結果の原因を表します。費用がかかりすぎることが実現困難の原因です。</div>
        </div>

        <div class="question" data-answer="2">
            <div class="question-num">問題9</div>
            <div class="question-text">雨が降っている（　　）、彼女は傘を持たずに出かけた。</div>
            <div class="options">
                <div class="option" data-value="1">1. からには</div>
                <div class="option" data-value="2">2. にもかかわらず</div>
                <div class="option" data-value="3">3. にとって</div>
                <div class="option" data-value="4">4. のために</div>
            </div>
            <div class="explanation">「にもかかわらず」は「〜なのに」という逆接を表します。雨が降っているのに傘を持たずに出かけたという意味です。</div>
        </div>

        <div class="question" data-answer="3">
            <div class="question-num">問題10</div>
            <div class="question-text">先生は生徒（　　）、丁寧に説明した。</div>
            <div class="options">
                <div class="option" data-value="1">1. のくせに</div>
                <div class="option" data-value="2">2. ながらも</div>
                <div class="option" data-value="3">3. に対して</div>
                <div class="option" data-value="4">4. にかわって</div>
            </div>
            <div class="explanation">「に対して」は対象を表します。生徒を対象に説明したという意味です。</div>
        </div>

        <div class="question" data-answer="1">
            <div class="question-num">問題11</div>
            <div class="question-text">国際的なビジネスの場（　　）、英語力は欠かせない。</div>
            <div class="options">
                <div class="option" data-value="1">1. において</div>
                <div class="option" data-value="2">2. によって</div>
                <div class="option" data-value="3">3. に関して</div>
                <div class="option" data-value="4">4. にとって</div>
            </div>
            <div class="explanation">「において」は場所・場面・状況を示します。</div>
        </div>

        <div class="question" data-answer="2">
            <div class="question-num">問題12</div>
            <div class="question-text">約束した（　　）、最後まで責任を持ってやり遂げる。</div>
            <div class="options">
                <div class="option" data-value="1">1. ものの</div>
                <div class="option" data-value="2">2. からには</div>
                <div class="option" data-value="3">3. にもかかわらず</div>
                <div class="option" data-value="4">4. ながらも</div>
            </div>
            <div class="explanation">「からには」は「〜した以上は」という意味で、それに伴う義務や決意を表します。</div>
        </div>

        <div class="question" data-answer="2">
            <div class="question-num">問題13</div>
            <div class="question-text">新しい技術の登場（　　）、仕事のやり方が大きく変わった。</div>
            <div class="options">
                <div class="option" data-value="1">1. のせいで</div>
                <div class="option" data-value="2">2. によって</div>
                <div class="option" data-value="3">3. にとって</div>
                <div class="option" data-value="4">4. のために</div>
            </div>
            <div class="explanation">「によって」は手段・原因・きっかけを表します。</div>
        </div>

        </div>

        <!-- 問題2: 並べ替え -->
        <div class="section"><div class="section-title">問題2 文の組み立て</div>
        <p style="color:#666; font-size:0.9em; margin-bottom:16px;">次の文の ＿＿ に入る最もよいものを選んでください。</p>

        <div class="question" data-answer="3">
            <div class="question-num">問題14</div>
            <div class="question-text">彼女は ＿＿ ★ ＿＿ ＿＿ している。</div>
            <div class="options options-horizontal">
                <div class="option" data-value="1">1. 料理を</div>
                <div class="option" data-value="2">2. として</div>
                <div class="option" data-value="3">3. 趣味</div>
                <div class="option" data-value="4">4. 楽しんで</div>
            </div>
            <div class="explanation">正しい順序：「料理を趣味として楽しんでいる」。★は「趣味」が入ります。</div>
        </div>

        <div class="question" data-answer="1">
            <div class="question-num">問題15</div>
            <div class="question-text">彼女は先生に ＿＿ ★ ＿＿ ＿＿ た。</div>
            <div class="options options-horizontal">
                <div class="option" data-value="1">1. ほめられ</div>
                <div class="option" data-value="2">2. 発表を</div>
                <div class="option" data-value="3">3. して</div>
                <div class="option" data-value="4">4. よく</div>
            </div>
            <div class="explanation">正しい順序：「発表をよくしてほめられた」。★は「ほめられ」が入ります。</div>
        </div>

        <div class="question" data-answer="3">
            <div class="question-num">問題16</div>
            <div class="question-text">彼女は留学を ＿＿ ★ ＿＿ ＿＿ なった。</div>
            <div class="options options-horizontal">
                <div class="option" data-value="1">1. きっかけに</div>
                <div class="option" data-value="2">2. 英語が</div>
                <div class="option" data-value="3">3. 話せる</div>
                <div class="option" data-value="4">4. ように</div>
            </div>
            <div class="explanation">正しい順序：「留学をきっかけに英語が話せるようになった」。★は「話せる」が入ります。</div>
        </div>

        <div class="question" data-answer="1">
            <div class="question-num">問題17</div>
            <div class="question-text">この本は ＿＿ ★ ＿＿ ＿＿ います。</div>
            <div class="options options-horizontal">
                <div class="option" data-value="1">1. 世界中で</div>
                <div class="option" data-value="2">2. 読まれて</div>
                <div class="option" data-value="3">3. 30か国語に</div>
                <div class="option" data-value="4">4. 訳され</div>
            </div>
            <div class="explanation">正しい順序：「30か国語に訳され世界中で読まれています」。★は「世界中で」が入ります。</div>
        </div>

        <div class="question" data-answer="3">
            <div class="question-num">問題18</div>
            <div class="question-text">彼女は ＿＿ ★ ＿＿ ＿＿ なった。</div>
            <div class="options options-horizontal">
                <div class="option" data-value="1">1. 病気を</div>
                <div class="option" data-value="2">2. きっかけに</div>
                <div class="option" data-value="3">3. 健康に</div>
                <div class="option" data-value="4">4. 気をつけるように</div>
            </div>
            <div class="explanation">正しい順序：「病気をきっかけに健康に気をつけるようになった」。★は「健康に」が入ります。</div>
        </div>

        </div>

        <!-- 問題3: 文章文法 -->
        <div class="actions">
        <div class="section-box">
            <div class="section-title">問題3 文章の文法</div>
            <div class="section-desc">次の文章を読んで、文章全体の内容を考えて、（19）から（23）の中に入る最もよいものを、1・2・3・4から一つ選びなさい。</div>
            <div class="passage-section">
                <div class="passage-box">
                    日本では、挨拶のときにお辞儀をする習慣がある。これは相手への敬意を（　<b>19</b>　）表現する方法だ。<br><br>
                    お辞儀の角度は場面（　<b>20</b>　）異なり、深いほど丁寧な印象を与える。例えば、ビジネスの場では深くお辞儀をすることが（　<b>21</b>　）とされている。<br><br>
                    外国人の中には、最初はお辞儀のタイミングが（　<b>22</b>　）人も多いが、日本に住む（　<b>23</b>　）自然にできるようになると言う。
                </div>
                <div class="passage-questions">
                    <div class="question" data-answer="1">
                        <div class="question-num">問題19</div>
                        <div class="question-text">（19）</div>
                        <div class="options options-horizontal">
                            <div class="option" data-value="1">1. 体で</div>
                            <div class="option" data-value="2">2. 言葉で</div>
                            <div class="option" data-value="3">3. 音楽で</div>
                            <div class="option" data-value="4">4. 文章で</div>
                        </div>
                        <div class="explanation">お辞儀は体の動作なので「体で表現する」が正しいです。</div>
                    </div>
                    <div class="question" data-answer="1">
                        <div class="question-num">問題20</div>
                        <div class="question-text">（20）</div>
                        <div class="options options-horizontal">
                            <div class="option" data-value="1">1. によって</div>
                            <div class="option" data-value="2">2. に対して</div>
                            <div class="option" data-value="3">3. にとって</div>
                            <div class="option" data-value="4">4. に関して</div>
                        </div>
                        <div class="explanation">「場面によって異なる」は場面ごとに違うという意味です。</div>
                    </div>
                    <div class="question" data-answer="3">
                        <div class="question-num">問題21</div>
                        <div class="question-text">（21）</div>
                        <div class="options options-horizontal">
                            <div class="option" data-value="1">1. 失礼なこと</div>
                            <div class="option" data-value="2">2. 不要なこと</div>
                            <div class="option" data-value="3">3. 基本</div>
                            <div class="option" data-value="4">4. 問題</div>
                        </div>
                        <div class="explanation">ビジネスの場で深くお辞儀をすることが「基本とされている」が文脈に合います。</div>
                    </div>
                    <div class="question" data-answer="1">
                        <div class="question-num">問題22</div>
                        <div class="question-text">（22）</div>
                        <div class="options options-horizontal">
                            <div class="option" data-value="1">1. わからない</div>
                            <div class="option" data-value="2">2. わからず</div>
                            <div class="option" data-value="3">3. わからないで</div>
                            <div class="option" data-value="4">4. わからなければ</div>
                        </div>
                        <div class="explanation">「タイミングがわからない人も多い」が文脈に合います。</div>
                    </div>
                    <div class="question" data-answer="1">
                        <div class="question-num">問題23</div>
                        <div class="question-text">（23）</div>
                        <div class="options options-horizontal">
                            <div class="option" data-value="1">1. うちに</div>
                            <div class="option" data-value="2">2. ために</div>
                            <div class="option" data-value="3">3. からには</div>
                            <div class="option" data-value="4">4. ものの</div>
                        </div>
                        <div class="explanation">「日本に住むうちに自然にできるようになる」は時間の経過とともに変化することを表します。</div>
                    </div>
                </div>
            </div>
        </div>
        <button class="btn-submit" onclick="checkAnswers()">採点する</button>
        </div>

        <div class="score" id="score">
            <div class="score-num" id="score-num"></div>
            <div class="score-label">Score: <span id="score-pct"></span></div>
            <a href="reading.html" class="next-section-btn" id="next-btn" style="display: none;">次：読解 →</a>
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
<div style="text-align: center; padding: 30px 20px; background: #f8fafc; border-top: 1px solid #e5e7eb; margin-top: 40px;"><p style="color: #6b7280; font-size: 0.85rem; margin: 0;">Original JLPT practice content created by <a href="https://nihongo-world.com" style="color: #fb7185; text-decoration: none; font-weight: 500;">Nihon GO! World</a></p><p style="color: #9ca3af; font-size: 0.8rem; margin-top: 8px;">Free for personal use &bull; Government-certified teachers</p></div></body>
</html>
` }} />
    </>
  )
}
