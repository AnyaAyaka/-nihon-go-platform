'use client'
import AccessCheck from '../../../../AccessCheck'

export default function Page() {
  return (
    <>
      <AccessCheck level="N3" mockNum={6} />
      <div dangerouslySetInnerHTML={{ __html: `<!DOCTYPE html>

<html lang="ja">
<head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>JLPT N3 Grammar - MOCK-06 | Nihon GO!</title>
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
<h1>JLPT N3 Mock Test 06 - 文法</h1>
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
<div class="question-text">今さら謝っても許してもらえる（　　）が、とりあえず連絡した。</div>
<div class="options">
<div class="option" data-value="1">1. わけにはいかない</div>
<div class="option" data-value="2">2. ことになっている</div>
<div class="option" data-value="3">3. かどうかわからない</div>
<div class="option" data-value="4">4. に決まっている</div>
</div>
<div class="explanation">「〜かどうかわからない」は確信が持てない状況を表します。謝っても許されるかわからないが連絡したという文脈です。</div>
</div>
<div class="question" data-answer="2">
<div class="question-num">問題2</div>
<div class="question-text">約束を破ってしまったのだから、きちんと謝る（　　）だ。</div>
<div class="options">
<div class="option" data-value="1">1. ほかない</div>
<div class="option" data-value="2">2. べき</div>
<div class="option" data-value="3">3. らしい</div>
<div class="option" data-value="4">4. ようだ</div>
</div>
<div class="explanation">「べきだ」は「〜するのが当然・義務だ」という意味です。</div>
</div>
<div class="question" data-answer="4">
<div class="question-num">問題3</div>
<div class="question-text">財布を家に置いた（　　）外出してしまった。</div>
<div class="options">
<div class="option" data-value="1">1. ために</div>
<div class="option" data-value="2">2. ものの</div>
<div class="option" data-value="3">3. からには</div>
<div class="option" data-value="4">4. まま</div>
</div>
<div class="explanation">「〜まま」は「その状態のまま変わらず」という意味です。財布を置いた状態のまま出かけてしまったという文脈です。</div>
</div>
<div class="question" data-answer="1">
<div class="question-num">問題4</div>
<div class="question-text">悪いとわかり（　　）、つい食べすぎてしまう。</div>
<div class="options">
<div class="option" data-value="1">1. つつも</div>
<div class="option" data-value="2">2. からには</div>
<div class="option" data-value="3">3. だけあって</div>
<div class="option" data-value="4">4. ものの</div>
</div>
<div class="explanation">「つつも」は「〜しながらも、それでも」という逆接を表します。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問題5</div>
<div class="question-text">あの映画のラストシーンは感動せず（　　）。</div>
<div class="options">
<div class="option" data-value="1">1. わけにはいかない</div>
<div class="option" data-value="2">2. ほかない</div>
<div class="option" data-value="3">3. にはいられなかった</div>
<div class="option" data-value="4">4. べきだった</div>
</div>
<div class="explanation">「〜ずにはいられない」は感情を抑えることができないことを表します。</div>
</div>
<div class="question" data-answer="2">
<div class="question-num">問題6</div>
<div class="question-text">彼の部屋はいつも服（　　）で、足の踏み場もない。</div>
<div class="options">
<div class="option" data-value="1">1. ほこり</div>
<div class="option" data-value="2">2. だらけ</div>
<div class="option" data-value="3">3. ほど</div>
<div class="option" data-value="4">4. らしい</div>
</div>
<div class="explanation">「だらけ」は「いっぱいで困った状態」を表します。「まみれ」も似た意味ですが、液体や汚れに使います。服には「だらけ」が適切です。</div>
</div>
<div class="question" data-answer="4">
<div class="question-num">問題7</div>
<div class="question-text">彼は締め切りを忘れ（　　）なので、いつもメモを取るようにしている。</div>
<div class="options">
<div class="option" data-value="1">1. っぽい</div>
<div class="option" data-value="2">2. だらけ</div>
<div class="option" data-value="3">3. まま</div>
<div class="option" data-value="4">4. がち</div>
</div>
<div class="explanation">「がち」は「そうなりやすい傾向がある」という意味です。忘れがちだからメモを取るという文脈が自然です。</div>
</div>
<div class="question" data-answer="1">
<div class="question-num">問題8</div>
<div class="question-text">最近の彼は怒り（　　）で、話しかけにくい。</div>
<div class="options">
<div class="option" data-value="1">1. っぽく</div>
<div class="option" data-value="2">2. がちで</div>
<div class="option" data-value="3">3. だらけで</div>
<div class="option" data-value="4">4. まま</div>
</div>
<div class="explanation">「っぽい」は「〜の感じがする」という意味です。怒りっぽい様子を表します。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問題9</div>
<div class="question-text">窓を開けた（　　）寝てしまったので、風邪を引いた。</div>
<div class="options">
<div class="option" data-value="1">1. ために</div>
<div class="option" data-value="2">2. ものの</div>
<div class="option" data-value="3">3. まま</div>
<div class="option" data-value="4">4. からには</div>
</div>
<div class="explanation">「〜まま」は「その状態を変えずに」という意味です。窓を開けた状態のまま寝てしまった文脈です。</div>
</div>
<div class="question" data-answer="2">
<div class="question-num">問題10</div>
<div class="question-text">大事な書類を家に忘れてきてしまった。取りに戻る（　　）。</div>
<div class="options">
<div class="option" data-value="1">1. うえで</div>
<div class="option" data-value="2">2. ほかない</div>
<div class="option" data-value="3">3. べきだった</div>
<div class="option" data-value="4">4. だらけで</div>
</div>
<div class="explanation">「ほかない」は他に選択肢がないことを表します。忘れ物をしたら取りに戻るしかないという文脈です。</div>
</div>
<div class="question" data-answer="4">
<div class="question-num">問題11</div>
<div class="question-text">みんなが残業しているのに、自分だけ先に帰る（　　）。</div>
<div class="options">
<div class="option" data-value="1">1. べきだ</div>
<div class="option" data-value="2">2. まま</div>
<div class="option" data-value="3">3. つつも</div>
<div class="option" data-value="4">4. わけにはいかない</div>
</div>
<div class="explanation">「わけにはいかない」は状況的にできないことを表します。みんなが残業中に一人で帰れないという文脈です。</div>
</div>
<div class="question" data-answer="1">
<div class="question-num">問題12</div>
<div class="question-text">彼は疲れを感じ（　　）、仕事を続けた。</div>
<div class="options">
<div class="option" data-value="1">1. つつも</div>
<div class="option" data-value="2">2. だらけで</div>
<div class="option" data-value="3">3. がちで</div>
<div class="option" data-value="4">4. まま</div>
</div>
<div class="explanation">「つつも」は「疲れを感じながらも、それでも」という逆接の継続を表します。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問題13</div>
<div class="question-text">彼は疲れている（　　）、弱音を一切吐かない。</div>
<div class="options">
<div class="option" data-value="1">1. ほかなく</div>
<div class="option" data-value="2">2. がちで</div>
<div class="option" data-value="3">3. つつも</div>
<div class="option" data-value="4">4. っぽく</div>
</div>
<div class="explanation">「つつも」は「〜しながらも、それでも」という逆接の継続を表します。疲れているのに弱音を吐かないという文脈です。</div>
</div>
</div>
<!-- 問題2: 並べ替え -->
<div class="section"><div class="section-title">問題2 文の組み立て</div>
<p style="color:#666; font-size:0.9em; margin-bottom:16px;">次の文の ＿＿ に入る最もよいものを選んでください。</p>
<div class="question" data-answer="3">
<div class="question-num">問題14</div>
<div class="question-text">彼は ＿＿ ★ ＿＿ ＿＿ いる。</div>
<div class="options options-horizontal">
<div class="option" data-value="1">1. 知り</div>
<div class="option" data-value="2">2. 黙って</div>
<div class="option" data-value="3">3. つつも</div>
<div class="option" data-value="4">4. 事実を</div>
</div>
<div class="explanation">正しい順序：「事実を知りつつも黙っている」。★は「つつも」が入ります。</div>
</div>
<div class="question" data-answer="2">
<div class="question-num">問題15</div>
<div class="question-text">彼は ＿＿ ★ ＿＿ ＿＿ 続けた。</div>
<div class="options options-horizontal">
<div class="option" data-value="1">1. 疲れを</div>
<div class="option" data-value="2">2. つつも</div>
<div class="option" data-value="3">3. 感じ</div>
<div class="option" data-value="4">4. 走り</div>
</div>
<div class="explanation">正しい順序：「疲れを感じつつも走り続けた」。★は「つつも」が入ります。</div>
</div>
<div class="question" data-answer="1">
<div class="question-num">問題16</div>
<div class="question-text">部屋が ＿＿ ★ ＿＿ ＿＿ ない。</div>
<div class="options options-horizontal">
<div class="option" data-value="1">1. ゴミ</div>
<div class="option" data-value="2">2. 足の</div>
<div class="option" data-value="3">3. だらけで</div>
<div class="option" data-value="4">4. 踏み場が</div>
</div>
<div class="explanation">正しい順序：「ゴミだらけで足の踏み場がない」。★は「ゴミ」が入ります。</div>
</div>
<div class="question" data-answer="2">
<div class="question-num">問題17</div>
<div class="question-text">彼は眼鏡を ＿＿ ★ ＿＿ ＿＿ 眠った。</div>
<div class="options options-horizontal">
<div class="option" data-value="1">1. かけた</div>
<div class="option" data-value="2">2. まま</div>
<div class="option" data-value="3">3. ソファで</div>
<div class="option" data-value="4">4. うっかり</div>
</div>
<div class="explanation">正しい順序：「眼鏡をかけたままソファでうっかり眠った」。★は「まま」が入ります。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問題18</div>
<div class="question-text">約束した ＿＿ ＿＿ ★ ＿＿ だ。</div>
<div class="options options-horizontal">
<div class="option" data-value="1">1. 以上は</div>
<div class="option" data-value="2">2. 約束を</div>
<div class="option" data-value="3">3. 守る</div>
<div class="option" data-value="4">4. べき</div>
</div>
<div class="explanation">正しい順序：「約束した以上は約束を守るべきだ」。★は「守る」が入ります。</div>
</div>
</div>
<!-- 問題3: 文章文法 -->
<div class="actions">
<div class="section-box">
<div class="section-title">問題3 文章の文法</div>
<div class="section-desc">次の文章を読んで、文章全体の内容を考えて、（19）から（23）の中に入る最もよいものを、1・2・3・4から一つ選びなさい。</div>
<div class="passage-section">
<div class="passage-box">
                    現代社会では、食事を（　<b>19</b>　）人が増えている。忙しさを理由に、コンビニやファストフードで（　<b>20</b>　）人も少なくない。<br/><br/>
                    しかし、食事は単に栄養を（　<b>21</b>　）だけのものではない。家族や友人と食卓を（　<b>22</b>　）ことで、コミュニケーションが生まれ、心の豊かさにつながる。<br/><br/>
                    忙しい現代人（　<b>23</b>　）、たまには大切な人と一緒にゆっくり食事をする時間を作ることが必要ではないだろうか。
                </div>
<div class="passage-questions">
<div class="question" data-answer="2">
<div class="question-num">問題19</div>
<div class="question-text">（19）</div>
<div class="options options-horizontal">
<div class="option" data-value="1">1. 丁寧に作る</div>
<div class="option" data-value="2">2. 一人で済ませる</div>
<div class="option" data-value="3">3. 家族と楽しむ</div>
<div class="option" data-value="4">4. ゆっくり食べる</div>
</div>
<div class="explanation">後の文脈で「コミュニケーションが生まれ心の豊かさにつながる」と述べており、孤食が問題だという流れから「一人で済ませる」が適切です。</div>
</div>
<div class="question" data-answer="3">
<div class="question-num">問題20</div>
<div class="question-text">（20）</div>
<div class="options options-horizontal">
<div class="option" data-value="1">1. 料理する</div>
<div class="option" data-value="2">2. 食事を断る</div>
<div class="option" data-value="3">3. 食事を済ませる</div>
<div class="option" data-value="4">4. 買い物する</div>
</div>
<div class="explanation">コンビニやファストフードで「食事を済ませる」という表現が自然です。</div>
</div>
<div class="question" data-answer="1">
<div class="question-num">問題21</div>
<div class="question-text">（21）</div>
<div class="options options-horizontal">
<div class="option" data-value="1">1. 摂取する</div>
<div class="option" data-value="2">2. 浪費する</div>
<div class="option" data-value="3">3. 節約する</div>
<div class="option" data-value="4">4. 無視する</div>
</div>
<div class="explanation">栄養を「摂取する」が食事の基本的な目的として適切です。</div>
</div>
<div class="question" data-answer="4">
<div class="question-num">問題22</div>
<div class="question-text">（22）</div>
<div class="options options-horizontal">
<div class="option" data-value="1">1. 避ける</div>
<div class="option" data-value="2">2. 壊す</div>
<div class="option" data-value="3">3. 片付ける</div>
<div class="option" data-value="4">4. 囲む</div>
</div>
<div class="explanation">「食卓を囲む」はみんなで一緒に食事をするという意味の定型表現です。</div>
</div>
<div class="question" data-answer="2">
<div class="question-num">問題23</div>
<div class="question-text">（23）</div>
<div class="options options-horizontal">
<div class="option" data-value="1">1. だけあって</div>
<div class="option" data-value="2">2. こそ</div>
<div class="option" data-value="3">3. ものの</div>
<div class="option" data-value="4">4. からには</div>
</div>
<div class="explanation">「忙しい現代人こそ」はだからこそという強調の逆説を表します。</div>
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
