'use client'
import AccessCheck from '../../../AccessCheck'

export default function Page() {
  return (
    <>
      <AccessCheck level="N3" mockNum={4} />
      <div dangerouslySetInnerHTML={{ __html: `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JLPT N3 Grammar - MOCK-04 | Nihon GO!</title>
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
        <h1>JLPT N3 Mock Test 04 - 文法</h1>
        <div class="nav-back-row">
            <a href="/materials/jlpt/n3/" class="nav-back">&#8592; 問題一覧</a>
        </div>
        <div class="nav">
            <a href="vocabulary.html">語彙</a><a href="grammar.html" class="active">文法</a><a href="reading.html">読解</a><a href="listening.html">聴解</a>
        </div>

        <!-- 問題1: 文法形式 -->
        <div class="section"><div class="section-title">問題1 文法形式</div>

        <div class="question" data-answer="3">
            <div class="question-num">問題1</div>
            <div class="question-text">彼女が泣いているのに、笑う（　　）。</div>
            <div class="options">
                <div class="option" data-value="1">1. ことになっている</div>
                <div class="option" data-value="2">2. ようになった</div>
                <div class="option" data-value="3">3. わけにはいかない</div>
                <div class="option" data-value="4">4. に違いない</div>
            </div>
            <div class="explanation">「わけにはいかない」は「〜することはできない（道義的に）」という意味です。</div>
        </div>

        <div class="question" data-answer="1">
            <div class="question-num">問題2</div>
            <div class="question-text">あのレストランはいつも混んでいる。おいしい（　　）。</div>
            <div class="options">
                <div class="option" data-value="1">1. に決まっている</div>
                <div class="option" data-value="2">2. わけにはいかない</div>
                <div class="option" data-value="3">3. ことになっている</div>
                <div class="option" data-value="4">4. にしては</div>
            </div>
            <div class="explanation">「に決まっている」は「〜に違いない」という強い確信を表します。</div>
        </div>

        <div class="question" data-answer="4">
            <div class="question-num">問題3</div>
            <div class="question-text">日本に来て（　　）、日本語の難しさがわかった。</div>
            <div class="options">
                <div class="option" data-value="1">1. からには</div>
                <div class="option" data-value="2">2. ものの</div>
                <div class="option" data-value="3">3. にもかかわらず</div>
                <div class="option" data-value="4">4. はじめて</div>
            </div>
            <div class="explanation">「〜てはじめて」は「〜して初めてわかった・できた」という意味です。</div>
        </div>

        <div class="question" data-answer="2">
            <div class="question-num">問題4</div>
            <div class="question-text">会議は毎週月曜日に行われる（　　）。</div>
            <div class="options">
                <div class="option" data-value="1">1. にしては</div>
                <div class="option" data-value="2">2. ことになっている</div>
                <div class="option" data-value="3">3. だけあって</div>
                <div class="option" data-value="4">4. はじめて</div>
            </div>
            <div class="explanation">「ことになっている」は規則・習慣として決まっていることを表します。</div>
        </div>

        <div class="question" data-answer="3">
            <div class="question-num">問題5</div>
            <div class="question-text">毎日練習したおかげで、ピアノが弾ける（　　）。</div>
            <div class="options">
                <div class="option" data-value="1">1. わけにはいかない</div>
                <div class="option" data-value="2">2. に決まっている</div>
                <div class="option" data-value="3">3. ようになった</div>
                <div class="option" data-value="4">4. だけあって</div>
            </div>
            <div class="explanation">「〜ようになった」は能力や状態の変化を表します。</div>
        </div>

        <div class="question" data-answer="1">
            <div class="question-num">問題6</div>
            <div class="question-text">10年間フランスに住んでいた（　　）、フランス語が上手だ。</div>
            <div class="options">
                <div class="option" data-value="1">1. だけあって</div>
                <div class="option" data-value="2">2. ものの</div>
                <div class="option" data-value="3">3. からには</div>
                <div class="option" data-value="4">4. ずにはいられない</div>
            </div>
            <div class="explanation">「だけあって」は「〜だから当然」という納得の理由を表します。</div>
        </div>

        <div class="question" data-answer="4">
            <div class="question-num">問題7</div>
            <div class="question-text">あの映画を見て、感動せず（　　）いられなかった。</div>
            <div class="options">
                <div class="option" data-value="1">1. わけには</div>
                <div class="option" data-value="2">2. ことには</div>
                <div class="option" data-value="3">3. だけでは</div>
                <div class="option" data-value="4">4. には</div>
            </div>
            <div class="explanation">「〜ずにはいられなかった」は「〜せずにはいられない」という感情の抑制ができないことを表します。</div>
        </div>

        <div class="question" data-answer="2">
            <div class="question-num">問題8</div>
            <div class="question-text">彼は子供（　　）、大人より落ち着いている。</div>
            <div class="options">
                <div class="option" data-value="1">1. だけあって</div>
                <div class="option" data-value="2">2. にしては</div>
                <div class="option" data-value="3">3. ずにはいられない</div>
                <div class="option" data-value="4">4. からには</div>
            </div>
            <div class="explanation">「にしては」は「〜の割には予想外だ」という意味です。子供なのに落ち着いているという予想外の結果を表します。</div>
        </div>

        <div class="question" data-answer="3">
            <div class="question-num">問題9</div>
            <div class="question-text">彼女は昨日から連絡がない。何かあった（　　）。</div>
            <div class="options">
                <div class="option" data-value="1">1. ことになっている</div>
                <div class="option" data-value="2">2. わけにはいかない</div>
                <div class="option" data-value="3">3. に違いない</div>
                <div class="option" data-value="4">4. ようになった</div>
            </div>
            <div class="explanation">「に違いない」は「きっと〜だと思う」という強い推量を表します。</div>
        </div>

        <div class="question" data-answer="1">
            <div class="question-num">問題10</div>
            <div class="question-text">明日は大事な試験があるから、今夜は遊ぶ（　　）。</div>
            <div class="options">
                <div class="option" data-value="1">1. わけにはいかない</div>
                <div class="option" data-value="2">2. ことになっている</div>
                <div class="option" data-value="3">3. に違いない</div>
                <div class="option" data-value="4">4. だけあって</div>
            </div>
            <div class="explanation">「わけにはいかない」は道義的・状況的にできないことを表します。</div>
        </div>

        <div class="question" data-answer="4">
            <div class="question-num">問題11</div>
            <div class="question-text">出かけようとした（　　）、雨が降ってきた。</div>
            <div class="options">
                <div class="option" data-value="1">1. うちに</div>
                <div class="option" data-value="2">2. ために</div>
                <div class="option" data-value="3">3. ものの</div>
                <div class="option" data-value="4">4. ところに</div>
            </div>
            <div class="explanation">「〜ところに」はある状況の最中に別のことが起きることを表します。</div>
        </div>

        <div class="question" data-answer="2">
            <div class="question-num">問題12</div>
            <div class="question-text">彼女は看護師である（　　）、人の痛みがよくわかる。</div>
            <div class="options">
                <div class="option" data-value="1">1. ずにはいられない</div>
                <div class="option" data-value="2">2. だけあって</div>
                <div class="option" data-value="3">3. ものの</div>
                <div class="option" data-value="4">4. からには</div>
            </div>
            <div class="explanation">「名詞であるだけあって」は「〜だから当然」という納得の理由を表します。</div>
        </div>

        <div class="question" data-answer="3">
            <div class="question-num">問題13</div>
            <div class="question-text">日本に来た（　　）、日本語をマスターするつもりだ。</div>
            <div class="options">
                <div class="option" data-value="1">1. ものの</div>
                <div class="option" data-value="2">2. にしては</div>
                <div class="option" data-value="3">3. からには</div>
                <div class="option" data-value="4">4. だけあって</div>
            </div>
            <div class="explanation">「からには」は「〜した以上は〜するつもりだ」という決意を表します。</div>
        </div>

        </div>

        <!-- 問題2: 並べ替え -->
        <div class="section"><div class="section-title">問題2 文の組み立て</div>
        <p style="color:#666; font-size:0.9em; margin-bottom:16px;">次の文の ＿＿ に入る最もよいものを選んでください。</p>

        <div class="question" data-answer="2">
            <div class="question-num">問題14</div>
            <div class="question-text">彼は健康の ＿＿ ★ ＿＿ ＿＿ いる。</div>
            <div class="options options-horizontal">
                <div class="option" data-value="1">1. ために</div>
                <div class="option" data-value="2">2. 毎朝</div>
                <div class="option" data-value="3">3. 続けて</div>
                <div class="option" data-value="4">4. 走り</div>
            </div>
            <div class="explanation">正しい順序：「健康のために毎朝走り続けている」。★は「毎朝」が入ります。</div>
        </div>

        <div class="question" data-answer="1">
            <div class="question-num">問題15</div>
            <div class="question-text">この店は ＿＿ ★ ＿＿ ＿＿ おいしい。</div>
            <div class="options options-horizontal">
                <div class="option" data-value="1">1. わりに</div>
                <div class="option" data-value="2">2. 料理が</div>
                <div class="option" data-value="3">3. とても</div>
                <div class="option" data-value="4">4. 値段の</div>
            </div>
            <div class="explanation">正しい順序：「値段のわりに料理がとてもおいしい」。★は「わりに」が入ります。</div>
        </div>

        <div class="question" data-answer="2">
            <div class="question-num">問題16</div>
            <div class="question-text">彼女は ＿＿ ★ ＿＿ ＿＿ なった。</div>
            <div class="options options-horizontal">
                <div class="option" data-value="1">1. 泳げる</div>
                <div class="option" data-value="2">2. 練習して</div>
                <div class="option" data-value="3">3. ように</div>
                <div class="option" data-value="4">4. 毎日</div>
            </div>
            <div class="explanation">正しい順序：「毎日練習して泳げるようになった」。★は「練習して」が入ります。</div>
        </div>

        <div class="question" data-answer="3">
            <div class="question-num">問題17</div>
            <div class="question-text">この問題は ＿＿ ★ ＿＿ ＿＿ ない。</div>
            <div class="options options-horizontal">
                <div class="option" data-value="1">1. 一人では</div>
                <div class="option" data-value="2">2. 難しくて</div>
                <div class="option" data-value="3">3. 解け</div>
                <div class="option" data-value="4">4. とうてい</div>
            </div>
            <div class="explanation">正しい順序：「難しくて一人ではとうてい解けない」。★は「解け」が入ります。</div>
        </div>

        <div class="question" data-answer="3">
            <div class="question-num">問題18</div>
            <div class="question-text">彼は ＿＿ ★ ＿＿ ＿＿ いる。</div>
            <div class="options options-horizontal">
                <div class="option" data-value="1">1. ことに</div>
                <div class="option" data-value="2">2. 後悔して</div>
                <div class="option" data-value="3">3. 言った</div>
                <div class="option" data-value="4">4. あんなことを</div>
            </div>
            <div class="explanation">正しい順序：「あんなことを言ったことに後悔している」。★は「言った」が入ります。</div>
        </div>

        </div>

        <!-- 問題3: 文章文法 -->
        <div class="actions">
        <div class="section-box">
            <div class="section-title">問題3 文章の文法</div>
            <div class="section-desc">次の文章を読んで、文章全体の内容を考えて、（19）から（23）の中に入る最もよいものを、1・2・3・4から一つ選びなさい。</div>
            <div class="passage-section">
                <div class="passage-box">
                    日本では「もったいない」という言葉が（　<b>19</b>　）使われる。これは物を無駄にすることへの惜しむ気持ちを表す言葉で、食べ物や資源を（　<b>20</b>　）大切にするという考え方だ。<br><br>
                    この「もったいない」の精神は、環境問題が（　<b>21</b>　）現代において、世界から注目されている。実際に、この言葉は英語に（　<b>22</b>　）そのまま「mottainai」として使われることもある。<br><br>
                    物があふれる時代だからこそ、一つ一つの物を（　<b>23</b>　）使う姿勢が大切なのではないだろうか。
                </div>
                <div class="passage-questions">
                    <div class="question" data-answer="2">
                        <div class="question-num">問題19</div>
                        <div class="question-text">（19）</div>
                        <div class="options options-horizontal">
                            <div class="option" data-value="1">1. めったに</div>
                            <div class="option" data-value="2">2. よく</div>
                            <div class="option" data-value="3">3. ほとんど</div>
                            <div class="option" data-value="4">4. ほかに</div>
                        </div>
                        <div class="explanation">「もったいない」がよく使われるという文脈から「よく」が適切です。</div>
                    </div>
                    <div class="question" data-answer="3">
                        <div class="question-num">問題20</div>
                        <div class="question-text">（20）</div>
                        <div class="options options-horizontal">
                            <div class="option" data-value="1">1. 増やして</div>
                            <div class="option" data-value="2">2. 買わずに</div>
                            <div class="option" data-value="3">3. 無駄にせずに</div>
                            <div class="option" data-value="4">4. 売らずに</div>
                        </div>
                        <div class="explanation">「もったいない」の精神は物を「無駄にせずに大切にする」ことです。</div>
                    </div>
                    <div class="question" data-answer="1">
                        <div class="question-num">問題21</div>
                        <div class="question-text">（21）</div>
                        <div class="options options-horizontal">
                            <div class="option" data-value="1">1. 深刻化している</div>
                            <div class="option" data-value="2">2. 解決された</div>
                            <div class="option" data-value="3">3. 関係ない</div>
                            <div class="option" data-value="4">4. 楽しまれる</div>
                        </div>
                        <div class="explanation">「もったいない」が世界から注目される理由として、環境問題が「深刻化している」が適切です。</div>
                    </div>
                    <div class="question" data-answer="4">
                        <div class="question-num">問題22</div>
                        <div class="question-text">（22）</div>
                        <div class="options options-horizontal">
                            <div class="option" data-value="1">1. 消えて</div>
                            <div class="option" data-value="2">2. 禁止され</div>
                            <div class="option" data-value="3">3. 忘れられ</div>
                            <div class="option" data-value="4">4. 訳されずに</div>
                        </div>
                        <div class="explanation">英語に「訳されずに」そのまま使われるという文脈です。</div>
                    </div>
                    <div class="question" data-answer="2">
                        <div class="question-num">問題23</div>
                        <div class="question-text">（23）</div>
                        <div class="options options-horizontal">
                            <div class="option" data-value="1">1. 捨てて</div>
                            <div class="option" data-value="2">2. 大切に</div>
                            <div class="option" data-value="3">3. 急いで</div>
                            <div class="option" data-value="4">4. 無駄に</div>
                        </div>
                        <div class="explanation">「もったいない」の精神から「大切に使う姿勢」が文脈に合います。</div>
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
