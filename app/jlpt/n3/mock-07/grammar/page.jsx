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
<title>JLPT N3 Grammar - MOCK-07 | Nihon GO!</title>
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
<h1>JLPT N3 Mock Test 07 - 文法</h1>
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
<div class="question-text">彼女は料理（　　）、プロのシェフにも負けないほど上手だ。</div>
<div class="options">
<div class="option" data-value="1">1. といえば</div>
<div class="option" data-value="2">2. にかけては</div>
<div class="option" data-value="3">3. というより</div>
<div class="option" data-value="4">4. にしては</div>
</div>
<div class="explanation">「にかけては」は「その分野では誰にも負けない」という得意分野を強調する表現です。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問題2</div>
<div class="question-text">この映画は怖い（　　）、むしろ感動的な内容だった。</div>
<div class="options">
<div class="option" data-value="1">1. にかけては</div>
<div class="option" data-value="2">2. といえば</div>
<div class="option" data-value="3">3. というより</div>
<div class="option" data-value="4">4. だけあって</div>
</div>
<div class="explanation">「というより」は「〜というよりむしろ〜だ」と言い換えるときに使います。</div>
</div>
<div class="question" data-answer="1">
<div class="question-num">問題3</div>
<div class="question-text">日本（　　）、桜や富士山がすぐに思い浮かぶ。</div>
<div class="options">
<div class="option" data-value="1">1. といえば</div>
<div class="option" data-value="2">2. にかけては</div>
<div class="option" data-value="3">3. というより</div>
<div class="option" data-value="4">4. どころか</div>
</div>
<div class="explanation">「といえば」は話題を転換したり、連想されるものを述べるときに使います。</div>
</div>
<div class="question" data-answer="4">
<div class="question-num">問題4</div>
<div class="question-text">初めて作った料理（　　）、とてもおいしい。</div>
<div class="options">
<div class="option" data-value="1">1. というより</div>
<div class="option" data-value="2">2. といえば</div>
<div class="option" data-value="3">3. にかけては</div>
<div class="option" data-value="4">4. にしては</div>
</div>
<div class="explanation">「にしては」は「〜の割には予想外だ」という意味です。初めてにしてはおいしいという予想外の結果を表します。</div>
</div>
<div class="question" data-answer="2">
<div class="question-num">問題5</div>
<div class="question-text">10年のキャリアがある（　　）、仕事が速くて正確だ。</div>
<div class="options">
<div class="option" data-value="1">1. にしては</div>
<div class="option" data-value="2">2. だけあって</div>
<div class="option" data-value="3">3. というより</div>
<div class="option" data-value="4">4. に関して</div>
</div>
<div class="explanation">「だけあって」は「〜だから当然」という納得の理由を表します。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問題6</div>
<div class="question-text">彼は謝る（　　）、言い訳ばかりしている。</div>
<div class="options">
<div class="option" data-value="1">1. だけあって</div>
<div class="option" data-value="2">2. にしては</div>
<div class="option" data-value="3">3. どころか</div>
<div class="option" data-value="4">4. といえば</div>
</div>
<div class="explanation">「どころか」は「〜はおろか、むしろ逆だ」という意味です。謝るどころか言い訳をするという逆の状況を表します。</div>
</div>
<div class="question" data-answer="1">
<div class="question-num">問題7</div>
<div class="question-text">内容を確認して（　　）、返事はできません。</div>
<div class="options">
<div class="option" data-value="1">1. からでないと</div>
<div class="option" data-value="2">2. だけあって</div>
<div class="option" data-value="3">3. どころか</div>
<div class="option" data-value="4">4. わりに</div>
</div>
<div class="explanation">「てからでないと」は「〜してからでなければ〜できない」という順序の条件を表します。</div>
</div>
<div class="question" data-answer="4">
<div class="question-num">問題8</div>
<div class="question-text">この店は値段の（　　）、料理の質がとても高い。</div>
<div class="options">
<div class="option" data-value="1">1. どころか</div>
<div class="option" data-value="2">2. にかけては</div>
<div class="option" data-value="3">3. といえば</div>
<div class="option" data-value="4">4. わりに</div>
</div>
<div class="explanation">「わりに」は「〜の割には予想以上だ」という意味です。値段のわりに質が高いという文脈です。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問題9</div>
<div class="question-text">彼女は緊張し（　　）、堂々とスピーチをやり遂げた。</div>
<div class="options">
<div class="option" data-value="1">1. わりに</div>
<div class="option" data-value="2">2. にかけては</div>
<div class="option" data-value="3">3. ながらも</div>
<div class="option" data-value="4">4. というより</div>
</div>
<div class="explanation">「ながらも」は「〜しながらも、それでも」という逆接の継続を表します。</div>
</div>
<div class="question" data-answer="2">
<div class="question-num">問題10</div>
<div class="question-text">この曲を聞く（　　）、学生時代を思い出す。</div>
<div class="options">
<div class="option" data-value="1">1. からでないと</div>
<div class="option" data-value="2">2. たびに</div>
<div class="option" data-value="3">3. にしては</div>
<div class="option" data-value="4">4. だけあって</div>
</div>
<div class="explanation">「たびに」は「〜するたびに毎回」という意味です。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問題11</div>
<div class="question-text">新しい仕事に慣れてきた（　　）、まだわからないことも多い。</div>
<div class="options">
<div class="option" data-value="1">1. というより</div>
<div class="option" data-value="2">2. だけあって</div>
<div class="option" data-value="3">3. ものの</div>
<div class="option" data-value="4">4. にかけては</div>
</div>
<div class="explanation">「ものの」は「〜したが、しかし期待通りではない」という逆接を表します。</div>
</div>
<div class="question" data-answer="4">
<div class="question-num">問題12</div>
<div class="question-text">彼女は頭がいい（　　）、スポーツも得意だ。</div>
<div class="options">
<div class="option" data-value="1">1. にしては</div>
<div class="option" data-value="2">2. というより</div>
<div class="option" data-value="3">3. にかけては</div>
<div class="option" data-value="4">4. うえに</div>
</div>
<div class="explanation">「うえに」は「〜に加えて、さらに」という意味で付け加えを表します。</div>
</div>
<div class="question" data-answer="4">
<div class="question-num">問題13</div>
<div class="question-text">雨が降っている（　　）、彼は傘を持たずに出かけた。</div>
<div class="options">
<div class="option" data-value="1">1. だけあって</div>
<div class="option" data-value="2">2. どころか</div>
<div class="option" data-value="3">3. にしては</div>
<div class="option" data-value="4">4. にもかかわらず</div>
</div>
<div class="explanation">「にもかかわらず」は「〜なのに、それでも」という逆接を表します。</div>
</div>
</div>
<!-- 問題2: 並べ替え -->
<div class="section"><div class="section-title">問題2 文の組み立て</div>
<p style="color:#666; font-size:0.9em; margin-bottom:16px;">次の文の ＿＿ に入る最もよいものを選んでください。</p>
<div class="question" data-answer="1">
<div class="question-num">問題14</div>
<div class="question-text">彼女は ＿＿ ★ ＿＿ ＿＿ 続けた。</div>
<div class="options options-horizontal">
<div class="option" data-value="1">1. ながらも</div>
<div class="option" data-value="2">2. 泣き</div>
<div class="option" data-value="3">3. 笑い</div>
<div class="option" data-value="4">4. つつも</div>
</div>
<div class="explanation">正しい順序：「泣きながらも笑い続けた」。★は「ながらも」が入ります。</div>
</div>
<div class="question" data-answer="1">
<div class="question-num">問題15</div>
<div class="question-text">この映画は ＿＿ ★ ＿＿ ＿＿ だ。</div>
<div class="options options-horizontal">
<div class="option" data-value="1">1. というより</div>
<div class="option" data-value="2">2. 怖い</div>
<div class="option" data-value="3">3. 感動的</div>
<div class="option" data-value="4">4. むしろ</div>
</div>
<div class="explanation">正しい順序：「怖いというよりむしろ感動的だ」。★は「というより」が入ります。</div>
</div>
<div class="question" data-answer="1">
<div class="question-num">問題16</div>
<div class="question-text">部長に ＿＿ ★ ＿＿ ＿＿ できない。</div>
<div class="options options-horizontal">
<div class="option" data-value="1">1. もらって</div>
<div class="option" data-value="2">2. からでないと</div>
<div class="option" data-value="3">3. 確認して</div>
<div class="option" data-value="4">4. 返事が</div>
</div>
<div class="explanation">正しい順序：「部長に確認してもらってからでないと返事ができない」。★は「もらって」が入ります。</div>
</div>
<div class="question" data-answer="2">
<div class="question-num">問題17</div>
<div class="question-text">この店は ＿＿ ★ ＿＿ ＿＿ 高い。</div>
<div class="options options-horizontal">
<div class="option" data-value="1">1. 値段の</div>
<div class="option" data-value="2">2. わりに</div>
<div class="option" data-value="3">3. 質が</div>
<div class="option" data-value="4">4. とても</div>
</div>
<div class="explanation">正しい順序：「値段のわりに質がとても高い」。★は「わりに」が入ります。</div>
</div>
<div class="question" data-answer="1">
<div class="question-num">問題18</div>
<div class="question-text">彼は ＿＿ ★ ＿＿ ＿＿ 合格した。</div>
<div class="options options-horizontal">
<div class="option" data-value="1">1. だけあって</div>
<div class="option" data-value="2">2. 努力した</div>
<div class="option" data-value="3">3. 試験に</div>
<div class="option" data-value="4">4. 毎日</div>
</div>
<div class="explanation">正しい順序：「毎日努力しただけあって試験に合格した」。★は「だけあって」が入ります。</div>
</div>
</div>
<!-- 問題3: 文章文法 -->
<div class="actions">
<div class="section-box">
<div class="section-title">問題3 文章の文法</div>
<div class="section-desc">次の文章を読んで、文章全体の内容を考えて、（19）から（23）の中に入る最もよいものを、1・2・3・4から一つ選びなさい。</div>
<div class="passage-section">
<div class="passage-box">
                    近年、オンライン学習が（　<b>19</b>　）広まっている。自宅にいながら、自宅にいながら、世界中の（　<b>20</b>　）の授業が受けられるという点が多くの人に支持されている。<br/><br/>
                    しかし、オンライン学習には課題もある。自己管理が（　<b>21</b>　）、途中でやめてしまう人も少なくない。また、対面授業と（　<b>22</b>　）、どこでも学習できる点が最大のメリットだ。<br/><br/>
                    オンラインと対面を（　<b>23</b>　）組み合わせることで、より効果的な学習環境が生まれると考えられている。
                </div>
<div class="passage-questions">
<div class="question" data-answer="3">
<div class="question-num">問題19</div>
<div class="question-text">（19）</div>
<div class="options options-horizontal">
<div class="option" data-value="1">1. めったに</div>
<div class="option" data-value="2">2. ほとんど</div>
<div class="option" data-value="3">3. 急速に</div>
<div class="option" data-value="4">4. たまに</div>
</div>
<div class="explanation">「急速に広まっている」が最も自然な表現です。</div>
</div>
<div class="question" data-answer="2">
<div class="question-num">問題20</div>
<div class="question-text">（20）</div>
<div class="options options-horizontal">
<div class="option" data-value="1">1. 生徒</div>
<div class="option" data-value="2">2. 講師</div>
<div class="option" data-value="3">3. 教室</div>
<div class="option" data-value="4">4. 教育</div>
</div>
<div class="explanation">「世界中の講師から学べる」という表現が自然です。</div>
</div>
<div class="question" data-answer="4">
<div class="question-num">問題21</div>
<div class="question-text">（21）</div>
<div class="options options-horizontal">
<div class="option" data-value="1">1. 簡単なので</div>
<div class="option" data-value="2">2. 楽しいので</div>
<div class="option" data-value="3">3. 充実しており</div>
<div class="option" data-value="4">4. 難しく</div>
</div>
<div class="explanation">自己管理が「難しく」途中でやめてしまうという因果関係が自然です。</div>
</div>
<div class="question" data-answer="1">
<div class="question-num">問題22</div>
<div class="question-text">（22）</div>
<div class="options options-horizontal">
<div class="option" data-value="1">1. 違い</div>
<div class="option" data-value="2">2. 同様に</div>
<div class="option" data-value="3">3. 合わせて</div>
<div class="option" data-value="4">4. 加えて</div>
</div>
<div class="explanation">「対面授業と違い」はオンライン学習の特徴を対比して述べる表現です。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問題23</div>
<div class="question-text">（23）</div>
<div class="options options-horizontal">
<div class="option" data-value="1">1. むりやり</div>
<div class="option" data-value="2">2. たまに</div>
<div class="option" data-value="3">3. うまく</div>
<div class="option" data-value="4">4. めったに</div>
</div>
<div class="explanation">「うまく組み合わせることで効果的な学習環境が生まれる」という文脈が自然です。</div>
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
