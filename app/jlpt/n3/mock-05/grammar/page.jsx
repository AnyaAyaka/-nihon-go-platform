'use client'
export default function Page() {
  return (
    <div dangerouslySetInnerHTML={{ __html: `<!DOCTYPE html>

<html lang="ja">
<head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>JLPT N3 Grammar - MOCK-05 | Nihon GO!</title>
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
<h1>JLPT N3 Mock Test 05 - 文法</h1>
<div class="nav-back-row">
<a class="nav-back" href="/materials/jlpt/n3/">← 問題一覧</a>
</div>
<div class="nav">
<a href="vocabulary.html">語彙</a><a class="active" href="grammar.html">文法</a><a href="reading.html">読解</a><a href="listening.html">聴解</a>
</div>
<!-- 問題1: 文法形式 -->
<div class="section"><div class="section-title">問題1 文法形式</div>
<div class="question" data-answer="1">
<div class="question-num">問題1</div>
<div class="question-text">空が急に暗くなってきた。雨が降り（　　）。</div>
<div class="options">
<div class="option" data-value="1">1. そうだ</div>
<div class="option" data-value="2">2. らしい</div>
<div class="option" data-value="3">3. ようだ</div>
<div class="option" data-value="4">4. はずだ</div>
</div>
<div class="explanation">「そうだ（様態）」は見た目・外見から判断するときに使います。「降りそうだ」は「降るらしい」「降るようだ」とは接続形が違うので正解は1です。</div>
</div>
<div class="question" data-answer="2">
<div class="question-num">問題2</div>
<div class="question-text">彼女はどうやら風邪を引いた（　　）。声がかれている。</div>
<div class="options">
<div class="option" data-value="1">1. そうだ</div>
<div class="option" data-value="2">2. らしい</div>
<div class="option" data-value="3">3. ことだ</div>
<div class="option" data-value="4">4. わけだ</div>
</div>
<div class="explanation">「らしい」は根拠のある推量を表します。声がかれているという根拠から判断しているので「らしい」が適切です。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問題3</div>
<div class="question-text">彼女の顔色が悪い。体調が悪い（　　）。</div>
<div class="options">
<div class="option" data-value="1">1. からには</div>
<div class="option" data-value="2">2. ものの</div>
<div class="option" data-value="3">3. ようだ</div>
<div class="option" data-value="4">4. にしても</div>
</div>
<div class="explanation">「ようだ」は様子から判断した推量を表します。顔色を見て体調が悪そうだと判断しています。</div>
</div>
<div class="question" data-answer="4">
<div class="question-num">問題4</div>
<div class="question-text">コーヒーをこぼして、大事な書類が（　　）なってしまった。</div>
<div class="options">
<div class="option" data-value="1">1. 使えるように</div>
<div class="option" data-value="2">2. きれいに</div>
<div class="option" data-value="3">3. 読みやすく</div>
<div class="option" data-value="4">4. 読めなく</div>
</div>
<div class="explanation">コーヒーをこぼした結果、書類が「読めなく」なってしまったという流れが自然です。</div>
</div>
<div class="question" data-answer="2">
<div class="question-num">問題5</div>
<div class="question-text">10年間フランスに住んでいた（　　）、フランス語が本当に流暢だ。</div>
<div class="options">
<div class="option" data-value="1">1. にとって</div>
<div class="option" data-value="2">2. だけあって</div>
<div class="option" data-value="3">3. として</div>
<div class="option" data-value="4">4. ながらも</div>
</div>
<div class="explanation">「だけあって」は「〜だから当然」という納得の理由を表します。10年住んでいたから流暢なのは当然という文脈です。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問題6</div>
<div class="question-text">試験勉強を頑張った（　　）、結果はよくなかった。</div>
<div class="options">
<div class="option" data-value="1">1. からには</div>
<div class="option" data-value="2">2. だけあって</div>
<div class="option" data-value="3">3. ものの</div>
<div class="option" data-value="4">4. ために</div>
</div>
<div class="explanation">「ものの」は「〜したが、しかし期待通りにならなかった」という逆接を表します。</div>
</div>
<div class="question" data-answer="2">
<div class="question-num">問題7</div>
<div class="question-text">彼は帰国子女だったのか。英語が得意な（　　）。</div>
<div class="options">
<div class="option" data-value="1">1. はずがない</div>
<div class="option" data-value="2">2. わけだ</div>
<div class="option" data-value="3">3. ようだ</div>
<div class="option" data-value="4">4. ものの</div>
</div>
<div class="explanation">「わけだ」は新しい情報を聞いて、それまでの状況に納得するときに使います。「だから〜なんだ」という意味です。</div>
</div>
<div class="question" data-answer="4">
<div class="question-num">問題8</div>
<div class="question-text">あの映画を見て、泣かず（　　）いられなかった。</div>
<div class="options">
<div class="option" data-value="1">1. わけには</div>
<div class="option" data-value="2">2. ことには</div>
<div class="option" data-value="3">3. だけでは</div>
<div class="option" data-value="4">4. には</div>
</div>
<div class="explanation">「〜ずにはいられない」は感情を抑えられないことを表します。</div>
</div>
<div class="question" data-answer="2">
<div class="question-num">問題9</div>
<div class="question-text">悩んだ末に、会社を辞める（　　）にした。</div>
<div class="options">
<div class="option" data-value="1">1. よう</div>
<div class="option" data-value="2">2. こと</div>
<div class="option" data-value="3">3. もの</div>
<div class="option" data-value="4">4. わけ</div>
</div>
<div class="explanation">「ことにする」は自分の意志で決定したことを表します。「ようにする」は習慣・努力目標なので、悩んだ末の決断には「ことにする」が適切です。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問題10</div>
<div class="question-text">日本語を勉強する（　　）、難しさがわかってきた。</div>
<div class="options">
<div class="option" data-value="1">1. うえに</div>
<div class="option" data-value="2">2. たびに</div>
<div class="option" data-value="3">3. につれて</div>
<div class="option" data-value="4">4. からには</div>
</div>
<div class="explanation">「につれて」は変化に伴ってもう一方も変化することを表します。勉強が進むにつれて難しさがわかってきたという文脈です。</div>
</div>
<div class="question" data-answer="1">
<div class="question-num">問題11</div>
<div class="question-text">彼は朝から何も食べていない。お腹が空いている（　　）。</div>
<div class="options">
<div class="option" data-value="1">1. に違いない</div>
<div class="option" data-value="2">2. ことはない</div>
<div class="option" data-value="3">3. わけがない</div>
<div class="option" data-value="4">4. ものがある</div>
</div>
<div class="explanation">「に違いない」は強い確信を持った推量を表します。朝から何も食べていないのだからお腹が空いているのは当然という文脈です。</div>
</div>
<div class="question" data-answer="4">
<div class="question-num">問題12</div>
<div class="question-text">この店のラーメンはいつも行列ができている。おいしい（　　）。</div>
<div class="options">
<div class="option" data-value="1">1. わけにはいかない</div>
<div class="option" data-value="2">2. ことになっている</div>
<div class="option" data-value="3">3. ようになった</div>
<div class="option" data-value="4">4. に決まっている</div>
</div>
<div class="explanation">「に決まっている」は確信を持った断定を表します。行列ができているから当然おいしいはずだという文脈です。</div>
</div>
<div class="question" data-answer="2">
<div class="question-num">問題13</div>
<div class="question-text">来月から、全員がテレワークをする（　　）。</div>
<div class="options">
<div class="option" data-value="1">1. からといって</div>
<div class="option" data-value="2">2. ことになった</div>
<div class="option" data-value="3">3. だけあって</div>
<div class="option" data-value="4">4. ものの</div>
</div>
<div class="explanation">「ことになった」は外部からの決定・規則として決まったことを表します。</div>
</div>
</div>
<!-- 問題2: 並べ替え -->
<div class="section"><div class="section-title">問題2 文の組み立て</div>
<p style="color:#666; font-size:0.9em; margin-bottom:16px;">次の文の ＿＿ に入る最もよいものを選んでください。</p>
<div class="question" data-answer="1">
<div class="question-num">問題14</div>
<div class="question-text">彼女は ＿＿ ★ ＿＿ ＿＿ 合格した。</div>
<div class="options options-horizontal">
<div class="option" data-value="1">1. 努力</div>
<div class="option" data-value="2">2. して</div>
<div class="option" data-value="3">3. 試験に</div>
<div class="option" data-value="4">4. 懸命に</div>
</div>
<div class="explanation">正しい順序：「懸命に努力して試験に合格した」。★は「努力」が入ります。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問題15</div>
<div class="question-text">この本は ＿＿ ★ ＿＿ ＿＿ 書かれている。</div>
<div class="options options-horizontal">
<div class="option" data-value="1">1. ように</div>
<div class="option" data-value="2">2. 誰でも</div>
<div class="option" data-value="3">3. わかる</div>
<div class="option" data-value="4">4. 丁寧に</div>
</div>
<div class="explanation">正しい順序：「誰でもわかるように丁寧に書かれている」。★は「わかる」が入ります。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問題16</div>
<div class="question-text">彼女は ＿＿ ＿＿ ★ ＿＿ いる。</div>
<div class="options options-horizontal">
<div class="option" data-value="1">1. あきらめずに</div>
<div class="option" data-value="2">2. 何度</div>
<div class="option" data-value="3">3. 失敗しても</div>
<div class="option" data-value="4">4. 挑戦し続けて</div>
</div>
<div class="explanation">正しい順序：「何度失敗してもあきらめずに挑戦し続けている」。★は「失敗しても」が入ります。</div>
</div>
<div class="question" data-answer="4">
<div class="question-num">問題17</div>
<div class="question-text">彼は ＿＿ ★ ＿＿ ＿＿ もらった。</div>
<div class="options options-horizontal">
<div class="option" data-value="1">1. 上司に</div>
<div class="option" data-value="2">2. 仕事を</div>
<div class="option" data-value="3">3. 手伝って</div>
<div class="option" data-value="4">4. 頼んで</div>
</div>
<div class="explanation">正しい順序：「上司に頼んで仕事を手伝ってもらった」。★は「頼んで」が入ります。</div>
</div>
<div class="question" data-answer="1">
<div class="question-num">問題18</div>
<div class="question-text">母が ＿＿ ★ ＿＿ ＿＿ うれしかった。</div>
<div class="options options-horizontal">
<div class="option" data-value="1">1. 作って</div>
<div class="option" data-value="2">2. 料理を</div>
<div class="option" data-value="3">3. くれて</div>
<div class="option" data-value="4">4. 手作りの</div>
</div>
<div class="explanation">正しい順序：「母が手作りの料理を作ってくれてうれしかった」。★は「作って」が入ります。</div>
</div>
</div>
<!-- 問題3: 文章文法 -->
<div class="actions">
<div class="section-box">
<div class="section-title">問題3 文章の文法</div>
<div class="section-desc">次の文章を読んで、文章全体の内容を考えて、（19）から（23）の中に入る最もよいものを、1・2・3・4から一つ選びなさい。</div>
<div class="passage-section">
<div class="passage-box">
現代人は本を読む時間が（　<b>19</b>　）なっているという。スマートフォンやSNSに時間を（　<b>20</b>　）、読書に使う時間が減っているからだ。<br/><br/>
しかし、読書には多くのメリットがある。語彙力や読解力が（　<b>21</b>　）だけでなく、集中力も高まる。また、さまざまな知識を（　<b>22</b>　）ことができる。<br/><br/>
忙しい現代人（　<b>23</b>　）、1日15分でも本を読む習慣をつけることが大切ではないだろうか。
</div>
<div class="passage-questions">
<div class="question" data-answer="2">
<div class="question-num">問題19</div>
<div class="question-text">（19）</div>
<div class="options options-horizontal">
<div class="option" data-value="1">1. 多く</div>
<div class="option" data-value="2">2. 増える</div>
<div class="option" data-value="3">3. 長く</div>
<div class="option" data-value="4">4. 早く</div>
</div>
<div class="explanation">本を読む時間が「少なく」なっているという文脈が適切です。</div>
</div>
<div class="question" data-answer="1">
<div class="question-num">問題20</div>
<div class="question-text">（20）</div>
<div class="options options-horizontal">
<div class="option" data-value="1">1. 使いすぎて</div>
<div class="option" data-value="2">2. 増やして</div>
<div class="option" data-value="3">3. 節約して</div>
<div class="option" data-value="4">4. 忘れて</div>
</div>
<div class="explanation">SNSに時間を「使いすぎて」読書の時間が減るという因果関係が自然です。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問題21</div>
<div class="question-text">（21）</div>
<div class="options options-horizontal">
<div class="option" data-value="1">1. 下がる</div>
<div class="option" data-value="2">2. 消える</div>
<div class="option" data-value="3">3. 上がる</div>
<div class="option" data-value="4">4. 戻る</div>
</div>
<div class="explanation">読書によって語彙力や読解力が「上がる」という文脈が適切です。</div>
</div>
<div class="question" data-answer="4">
<div class="question-num">問題22</div>
<div class="question-text">（22）</div>
<div class="options options-horizontal">
<div class="option" data-value="1">1. 捨てる</div>
<div class="option" data-value="2">2. 減らす</div>
<div class="option" data-value="3">3. 迷う</div>
<div class="option" data-value="4">4. 得る</div>
</div>
<div class="explanation">読書によって知識を「得る」ことができるという表現が自然です。</div>
</div>
<div class="question" data-answer="2">
<div class="question-num">問題23</div>
<div class="question-text">（23）</div>
<div class="options options-horizontal">
<div class="option" data-value="1">1. からには</div>
<div class="option" data-value="2">2. こそ</div>
<div class="option" data-value="3">3. だけあって</div>
<div class="option" data-value="4">4. ものの</div>
</div>
<div class="explanation">「忙しい現代人こそ」は逆説的に強調する表現で、だからこそ読書が大切だという意味になります。</div>
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
