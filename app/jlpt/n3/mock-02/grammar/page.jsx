'use client'
import AccessCheck from '../../../../AccessCheck'

export default function Page() {
  return (
    <>
      <AccessCheck level="N3" mockNum={2} />
      <div dangerouslySetInnerHTML={{ __html: `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JLPT N3 Grammar - MOCK-02 | Nihon GO!</title>
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
        .options-horizontal { display: flex; flex-wrap: wrap; gap: 8px; }
        .options-horizontal .option { flex: 0 0 auto; min-width: 120px; }
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
        .passage-section {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 24px;
            align-items: start;
        }
        .passage-box {
            background: #f8fafc;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 20px;
            line-height: 2;
            position: sticky;
            top: 80px;
            font-size: 0.95rem;
        }
        .passage-questions { display: flex; flex-direction: column; gap: 16px; }
        @media (max-width: 768px) {
            .passage-section { grid-template-columns: 1fr; }
            .passage-box { position: static; }
        }
        .section-box {
            background: #fff;
            border-radius: 12px;
            padding: 24px;
            margin-bottom: 20px;
            border: 1px solid #e5e7eb;
        }
        .section-desc { color: #666; font-size: 0.9em; margin-bottom: 20px; }
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
            <a href="https://nihongo-world.com" class="logo">Nihon <span>GO!</span></a>
            <div class="timer" id="timer">70:00</div>
        </div>
    </header>
    <div class="container">
        <h1>JLPT N3 Mock Test 02 - 文法</h1>
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
            <div class="question-text">子供の頃（　　）、ずっとピアノを習っている。</div>
            <div class="options">
                <div class="option" data-value="1">1. からこそ</div>
                <div class="option" data-value="2">2. だけで</div>
                <div class="option" data-value="3">3. から</div>
                <div class="option" data-value="4">4. ほど</div>
            </div>
            <div class="explanation">「子供の頃から」は起点を表します。「から」は時間・場所の起点を示します。</div>
        </div>

        <div class="question" data-answer="2">
            <div class="question-num">問題2</div>
            <div class="question-text">子供たちに飴を一人（　　）二個配った。</div>
            <div class="options">
                <div class="option" data-value="1">1. だけ</div>
                <div class="option" data-value="2">2. ずつ</div>
                <div class="option" data-value="3">3. しか</div>
                <div class="option" data-value="4">4. ほど</div>
            </div>
            <div class="explanation">「ずつ」は均等に分ける際に使います。「一人だけ二個」は一人だけという意味になり、「一人しか・一人ほど」は不自然です。</div>
        </div>

        <div class="question" data-answer="4">
            <div class="question-num">問題3</div>
            <div class="question-text">彼女（　　）、あなたの気持ちはきっとわかってくれる。</div>
            <div class="options">
                <div class="option" data-value="1">1. について</div>
                <div class="option" data-value="2">2. によって</div>
                <div class="option" data-value="3">3. に関して</div>
                <div class="option" data-value="4">4. なら</div>
            </div>
            <div class="explanation">「〜なら」は「〜であれば」という条件・話題提示を表します。</div>
        </div>

        <div class="question" data-answer="1">
            <div class="question-num">問題4</div>
            <div class="question-text">傘を持ってくれば（　　）。雨でびしょぬれになってしまった。</div>
            <div class="options">
                <div class="option" data-value="1">1. よかった</div>
                <div class="option" data-value="2">2. いい</div>
                <div class="option" data-value="3">3. よさそうだ</div>
                <div class="option" data-value="4">4. よかろう</div>
            </div>
            <div class="explanation">「〜ばよかった」は過去の後悔を表します。後文に「なってしまった」という過去の結果があるので「よかった」が唯一の正解です。</div>
        </div>

        <div class="question" data-answer="3">
            <div class="question-num">問題5</div>
            <div class="question-text">体調が悪い（　　）、今日の試合は欠席します。</div>
            <div class="options">
                <div class="option" data-value="1">1. わけで</div>
                <div class="option" data-value="2">2. ものの</div>
                <div class="option" data-value="3">3. ため</div>
                <div class="option" data-value="4">4. ところで</div>
            </div>
            <div class="explanation">「〜ため」は理由・原因を表します。</div>
        </div>

        <div class="question" data-answer="2">
            <div class="question-num">問題6</div>
            <div class="question-text">彼は日本語（　　）英語も話せる。</div>
            <div class="options">
                <div class="option" data-value="1">1. しか</div>
                <div class="option" data-value="2">2. だけでなく</div>
                <div class="option" data-value="3">3. だけ</div>
                <div class="option" data-value="4">4. ばかり</div>
            </div>
            <div class="explanation">「〜だけでなく」は「〜のほかに」という付加を表します。</div>
        </div>

        <div class="question" data-answer="4">
            <div class="question-num">問題7</div>
            <div class="question-text">年を取る（　　）、体力が落ちてきた。</div>
            <div class="options">
                <div class="option" data-value="1">1. くせに</div>
                <div class="option" data-value="2">2. ものの</div>
                <div class="option" data-value="3">3. とたんに</div>
                <div class="option" data-value="4">4. につれて</div>
            </div>
            <div class="explanation">「〜につれて」は変化に伴う別の変化を表します。</div>
        </div>

        <div class="question" data-answer="1">
            <div class="question-num">問題8</div>
            <div class="question-text">先輩に言われた（　　）、すぐに行動した。</div>
            <div class="options">
                <div class="option" data-value="1">1. とおりに</div>
                <div class="option" data-value="2">2. ついでに</div>
                <div class="option" data-value="3">3. うちに</div>
                <div class="option" data-value="4">4. わりに</div>
            </div>
            <div class="explanation">「〜とおりに」は指示や期待に沿った行動を表します。</div>
        </div>

        <div class="question" data-answer="3">
            <div class="question-num">問題9</div>
            <div class="question-text">駅に着いた（　　）、電車が出発してしまった。</div>
            <div class="options">
                <div class="option" data-value="1">1. ついでに</div>
                <div class="option" data-value="2">2. うちに</div>
                <div class="option" data-value="3">3. とたんに</div>
                <div class="option" data-value="4">4. からには</div>
            </div>
            <div class="explanation">「〜とたんに」は直後に別のことが起きることを表します。</div>
        </div>

        <div class="question" data-answer="2">
            <div class="question-num">問題10</div>
            <div class="question-text">彼女は疲れている（　　）、仕事を続けた。</div>
            <div class="options">
                <div class="option" data-value="1">1. ために</div>
                <div class="option" data-value="2">2. ながらも</div>
                <div class="option" data-value="3">3. によって</div>
                <div class="option" data-value="4">4. とおりに</div>
            </div>
            <div class="explanation">「〜ながらも」は逆接を表し、「〜にもかかわらず」に近い意味です。</div>
        </div>

        <div class="question" data-answer="4">
            <div class="question-num">問題11</div>
            <div class="question-text">この映画は何度見ても（　　）感動する。</div>
            <div class="options">
                <div class="option" data-value="1">1. まるで</div>
                <div class="option" data-value="2">2. もっと</div>
                <div class="option" data-value="3">3. たとえ</div>
                <div class="option" data-value="4">4. やはり</div>
            </div>
            <div class="explanation">「やはり」は予想通りの結果や変わらない事実を表します。</div>
        </div>

        <div class="question" data-answer="1">
            <div class="question-num">問題12</div>
            <div class="question-text">彼女が来た（　　）、パーティーが始まった。</div>
            <div class="options">
                <div class="option" data-value="1">1. のをきっかけに</div>
                <div class="option" data-value="2">2. うちに</div>
                <div class="option" data-value="3">3. ものの</div>
                <div class="option" data-value="4">4. からには</div>
            </div>
            <div class="explanation">「〜をきっかけに」は何かを契機として変化が起きることを表します。</div>
        </div>

        <div class="question" data-answer="3">
            <div class="question-num">問題13</div>
            <div class="question-text">あの人は上司（　　）、いつも部下に責任を押し付ける。</div>
            <div class="options">
                <div class="option" data-value="1">1. として</div>
                <div class="option" data-value="2">2. によって</div>
                <div class="option" data-value="3">3. のくせに</div>
                <div class="option" data-value="4">4. のために</div>
            </div>
            <div class="explanation">「〜のくせに」は立場や状況に反する批判的な行動を表します。上司なのに部下に責任を押し付けるという非難の文脈に合います。</div>
        </div>

        </div>

        <!-- 問題2: 並べ替え -->
        <div class="section"><div class="section-title">問題2 文の組み立て</div>
        <p style="color:#666; font-size:0.9em; margin-bottom:16px;">次の文の ＿＿ に入る最もよいものを選んでください。</p>

        <div class="question" data-answer="3">
            <div class="question-num">問題14</div>
            <div class="question-text">彼女は ＿＿ ★ ＿＿ ＿＿ です。</div>
            <div class="options options-horizontal">
                <div class="option" data-value="1">1. 見える</div>
                <div class="option" data-value="2">2. より</div>
                <div class="option" data-value="3">3. 若く</div>
                <div class="option" data-value="4">4. 実際</div>
            </div>
            <div class="explanation">正しい順序：彼女は「実際より若く見える」です。★は「若く」が入ります。</div>
        </div>

        <div class="question" data-answer="2">
            <div class="question-num">問題15</div>
            <div class="question-text">この本は ＿＿ ★ ＿＿ ＿＿ 思います。</div>
            <div class="options options-horizontal">
                <div class="option" data-value="1">1. 読む</div>
                <div class="option" data-value="2">2. 価値が</div>
                <div class="option" data-value="3">3. ある</div>
                <div class="option" data-value="4">4. と</div>
            </div>
            <div class="explanation">正しい順序：「読む価値があると思います」。★は「価値が」が入ります。</div>
        </div>

        <div class="question" data-answer="2">
            <div class="question-num">問題16</div>
            <div class="question-text">彼は ＿＿ ★ ＿＿ ＿＿ 帰った。</div>
            <div class="options options-horizontal">
                <div class="option" data-value="1">1. ずぶ濡れ</div>
                <div class="option" data-value="2">2. に</div>
                <div class="option" data-value="3">3. なり</div>
                <div class="option" data-value="4">4. ながら</div>
            </div>
            <div class="explanation">正しい順序：「ずぶ濡れになりながら帰った」。★は「に」が入ります。</div>
        </div>

        <div class="question" data-answer="2">
            <div class="question-num">問題17</div>
            <div class="question-text">彼女は留学を ＿＿ ★ ＿＿ ＿＿ した。</div>
            <div class="options options-horizontal">
                <div class="option" data-value="1">1. きっかけに</div>
                <div class="option" data-value="2">2. 英語を</div>
                <div class="option" data-value="3">3. 勉強し始めることを</div>
                <div class="option" data-value="4">4. 決意</div>
            </div>
            <div class="explanation">正しい順序：「留学をきっかけに英語を勉強し始めることを決意した」。★は「英語を」が入ります。</div>
        </div>

        <div class="question" data-answer="2">
            <div class="question-num">問題18</div>
            <div class="question-text">この問題は ＿＿ ★ ＿＿ ＿＿ ない。</div>
            <div class="options options-horizontal">
                <div class="option" data-value="1">1. 簡単には</div>
                <div class="option" data-value="2">2. 解け</div>
                <div class="option" data-value="3">3. そう</div>
                <div class="option" data-value="4">4. で</div>
            </div>
            <div class="explanation">正しい順序：「簡単には解けそうでない」。★は「解け」が入ります。</div>
        </div>

        </div>

        <!-- 問題3: 文章文法 -->
        <div class="actions">
        <div class="section-box">
            <div class="section-title">問題3 文章の文法</div>
            <div class="section-desc">次の文章を読んで、文章全体の内容を考えて、（19）から（23）の中に入る最もよいものを、1・2・3・4から一つ選びなさい。</div>
            <div class="passage-section">
                <div class="passage-box">
                    日本では「空気を読む」という表現がよく使われる。これは、周りの状況や相手の気持ちを言葉に（　<b>19</b>　）察することを意味する。<br><br>
                    外国人にとって、この「空気を読む」文化は（　<b>20</b>　）理解しにくいことがある。日本では、直接言わなくても相手に伝わることを（　<b>21</b>　）とされているからだ。<br><br>
                    しかし、最近では日本でも「言葉でしっかり伝えることが大切だ」という考え方が（　<b>22</b>　）。特に国際的なビジネスの場では、はっきり意思を伝える（　<b>23</b>　）が求められている。
                </div>
                <div class="passage-questions">
                    <div class="question" data-answer="3">
                        <div class="question-num">問題19</div>
                        <div class="question-text">（19）</div>
                        <div class="options options-horizontal">
                            <div class="option" data-value="1">1. しながら</div>
                            <div class="option" data-value="2">2. してから</div>
                            <div class="option" data-value="3">3. せずに</div>
                            <div class="option" data-value="4">4. させて</div>
                        </div>
                        <div class="explanation">「言葉にせずに察する」が文脈に合います。</div>
                    </div>
                    <div class="question" data-answer="2">
                        <div class="question-num">問題20</div>
                        <div class="question-text">（20）</div>
                        <div class="options options-horizontal">
                            <div class="option" data-value="1">1. やっと</div>
                            <div class="option" data-value="2">2. なかなか</div>
                            <div class="option" data-value="3">3. きっと</div>
                            <div class="option" data-value="4">4. わざわざ</div>
                        </div>
                        <div class="explanation">「なかなか理解しにくい」は容易ではないことを表します。「やっと・わざわざ・きっと」はこの文脈では不自然です。</div>
                    </div>
                    <div class="question" data-answer="4">
                        <div class="question-num">問題21</div>
                        <div class="question-text">（21）</div>
                        <div class="options options-horizontal">
                            <div class="option" data-value="1">1. 悪いこと</div>
                            <div class="option" data-value="2">2. 難しいこと</div>
                            <div class="option" data-value="3">3. 珍しいこと</div>
                            <div class="option" data-value="4">4. 美徳</div>
                        </div>
                        <div class="explanation">「美徳とされている」は文化的な価値観を表します。</div>
                    </div>
                    <div class="question" data-answer="1">
                        <div class="question-num">問題22</div>
                        <div class="question-text">（22）</div>
                        <div class="options options-horizontal">
                            <div class="option" data-value="1">1. 広まっている</div>
                            <div class="option" data-value="2">2. 消えている</div>
                            <div class="option" data-value="3">3. 反対されている</div>
                            <div class="option" data-value="4">4. 問題になっている</div>
                        </div>
                        <div class="explanation">「考え方が広まっている」が文脈に合います。</div>
                    </div>
                    <div class="question" data-answer="3">
                        <div class="question-num">問題23</div>
                        <div class="question-text">（23）</div>
                        <div class="options options-horizontal">
                            <div class="option" data-value="1">1. 遠慮</div>
                            <div class="option" data-value="2">2. 沈黙</div>
                            <div class="option" data-value="3">3. 能力</div>
                            <div class="option" data-value="4">4. 感情</div>
                        </div>
                        <div class="explanation">「意思を伝える能力」が文脈に合います。</div>
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
