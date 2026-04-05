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
    <title>JLPT N3 Reading - MOCK-04 | Nihon GO!</title>
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
        .passage { background: #f8fafc; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin-bottom: 20px; line-height: 2; font-size: 0.95rem; }
        .passage-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; align-items: start; }
        .passage-sticky { position: sticky; top: 80px; }
        @media (max-width: 768px) { .passage-grid { grid-template-columns: 1fr; } .passage-sticky { position: static; } }
        .question { margin-bottom: 24px; padding: 16px; background: #f9fafb; border-radius: 8px; }
        .question-num { font-size: 0.85em; color: #06b6d4; font-weight: 600; margin-bottom: 8px; }
        .question-text { font-size: 1.05em; margin-bottom: 12px; }
        .options { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        @media (max-width: 600px) { .options { grid-template-columns: 1fr; } }
        .option { padding: 12px 16px; border: 2px solid #e5e7eb; border-radius: 8px; cursor: pointer; transition: all 0.15s; background: #fff; color: #333; font-size: 1rem; text-align: left; }
        .option:hover { border-color: #06b6d4; background: #ecfeff; }
        .option.selected { border-color: #06b6d4; background: #ecfeff; }
        .option.correct { border-color: #06b6d4; background: #cffafe; }
        .option.incorrect { border-color: #ef4444; background: #fee2e2; }
        .explanation { margin-top: 12px; padding: 12px; background: #fef3c7; border-radius: 6px; display: none; font-size: 0.9em; }
        .info-table { width: 100%; border-collapse: collapse; margin: 12px 0; font-size: 0.9rem; }
        .info-table th { background: #06b6d4; color: #fff; padding: 8px 12px; text-align: left; }
        .info-table td { padding: 8px 12px; border-bottom: 1px solid #e5e7eb; }
        .info-table tr:nth-child(even) td { background: #f8fafc; }
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
        <h1>JLPT N3 Mock Test 04 - 読解</h1>
        <div class="nav-back-row">
            <a href="/materials/jlpt/n3/" class="nav-back">&#8592; 問題一覧</a>
        </div>
        <div class="nav">
            <a href="vocabulary.html">語彙</a><a href="grammar.html">文法</a><a href="reading.html" class="active">読解</a><a href="listening.html">聴解</a>
        </div>

        <!-- 問題1: 短文A -->
        <div class="section">
            <div class="section-title">問題1</div>
            <div class="passage">
                ビジネスメールでは、件名を具体的に書くことが大切だ。「お世話になっております」などの挨拶から始まり、用件を簡潔に伝えるのが基本とされている。また、返信は24時間以内にするのがマナーとされており、すぐに返答できない場合でも「確認してからご連絡します」などの一言を添えることが丁寧な対応とされている。メールは相手の顔が見えないため、言葉の選び方に特に注意が必要だ。
            </div>
            <div class="question" data-answer="2">
                <div class="question-num">問1</div>
                <div class="question-text">ビジネスメールのマナーとして正しいものはどれですか。</div>
                <div class="options">
                    <div class="option" data-value="1">1. 件名は書かなくてもいい</div>
                    <div class="option" data-value="2">2. 返信は24時間以内にするのがマナーだ</div>
                    <div class="option" data-value="3">3. 挨拶は省略した方が良い</div>
                    <div class="option" data-value="4">4. すぐに返答できない場合は無視してよい</div>
                </div>
                <div class="explanation">「返信は24時間以内にするのがマナーとされており」と書かれています。</div>
            </div>
            <div class="question" data-answer="4">
                <div class="question-num">問2</div>
                <div class="question-text">メールで言葉の選び方に注意が必要な理由は何ですか。</div>
                <div class="options">
                    <div class="option" data-value="1">1. メールは長く書く必要があるから</div>
                    <div class="option" data-value="2">2. 件名が重要だから</div>
                    <div class="option" data-value="3">3. 返信が遅くなるから</div>
                    <div class="option" data-value="4">4. 相手の顔が見えないから</div>
                </div>
                <div class="explanation">「メールは相手の顔が見えないため、言葉の選び方に特に注意が必要だ」と書かれています。</div>
            </div>
        </div>

        <!-- 問題2: 短文B（お知らせ） -->
        <div class="section">
            <div class="section-title">問題2</div>
            <div class="passage">
                <strong>市民プール料金改定のお知らせ</strong><br><br>
                来月より、市民プールの利用料金を以下のとおり改定いたします。<br><br>
                <table class="info-table">
                    <tr><th>区分</th><th>現在の料金</th><th>新料金</th></tr>
                    <tr><td>一般（高校生以上）</td><td>400円</td><td>500円</td></tr>
                    <tr><td>中学生</td><td>200円</td><td>250円</td></tr>
                    <tr><td>小学生以下</td><td>100円</td><td>100円（変更なし）</td></tr>
                    <tr><td>65歳以上</td><td>200円</td><td>200円（変更なし）</td></tr>
                </table>
                <br>
                ※回数券（10回分）をお持ちの方は、旧料金での利用が来月末まで可能です。<br>
                ※障がい者の方は半額となります。<br>
                ご不明な点は受付までお問い合わせください。
            </div>
            <div class="question" data-answer="3">
                <div class="question-num">問3</div>
                <div class="question-text">料金が変わらないのは誰ですか。</div>
                <div class="options">
                    <div class="option" data-value="1">1. 高校生</div>
                    <div class="option" data-value="2">2. 中学生</div>
                    <div class="option" data-value="3">3. 小学生</div>
                    <div class="option" data-value="4">4. 大学生</div>
                </div>
                <div class="explanation">「小学生以下：100円（変更なし）」と書かれています。</div>
            </div>
            <div class="question" data-answer="1">
                <div class="question-num">問4</div>
                <div class="question-text">回数券を持っている人はいつまで旧料金で使えますか。</div>
                <div class="options">
                    <div class="option" data-value="1">1. 来月末まで</div>
                    <div class="option" data-value="2">2. 今月末まで</div>
                    <div class="option" data-value="3">3. 来年末まで</div>
                    <div class="option" data-value="4">4. 来月から使えない</div>
                </div>
                <div class="explanation">「旧料金での利用が来月末まで可能です」と書かれています。</div>
            </div>
        </div>

        <!-- 問題3: 中文 -->
        <div class="section">
            <div class="section-title">問題3</div>
            <div class="passage-grid">
                <div class="passage-sticky">
                    <div class="passage">
                        日本のコンビニエンスストアは、今や生活に欠かせない存在となっている。食料品だけでなく、公共料金の支払いや宅配便の受け取りなど、さまざまなサービスが利用できる。<br><br>
                        特に注目されているのが、高齢化社会への対応だ。一人暮らしの高齢者が増える中、近くのコンビニで必要なものをすべて揃えられることは大きな助けになっている。また、24時間営業のため、夜間や休日にも利用できることも便利だ。<br><br>
                        一方で、課題もある。深夜営業のための人手不足や、食品ロスの問題が指摘されている。各社はAIを使った発注システムの導入や、閉店時間の設定など、様々な取り組みを進めている。
                    </div>
                </div>
                <div>
                    <div class="question" data-answer="3">
                        <div class="question-num">問5</div>
                        <div class="question-text">コンビニで利用できるサービスとして正しいものはどれですか。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. 病院の予約</div>
                            <div class="option" data-value="2">2. 車の修理</div>
                            <div class="option" data-value="3">3. 公共料金の支払い</div>
                            <div class="option" data-value="4">4. 不動産の契約</div>
                        </div>
                        <div class="explanation">「公共料金の支払いや宅配便の受け取りなど、さまざまなサービスが利用できる」と書かれています。</div>
                    </div>
                    <div class="question" data-answer="2">
                        <div class="question-num">問6</div>
                        <div class="question-text">高齢化社会においてコンビニが助けになっている理由は何ですか。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. 商品が安いから</div>
                            <div class="option" data-value="2">2. 近くで必要なものをすべて揃えられるから</div>
                            <div class="option" data-value="3">3. 若者向けのサービスが充実しているから</div>
                            <div class="option" data-value="4">4. 海外の商品が買えるから</div>
                        </div>
                        <div class="explanation">「近くのコンビニで必要なものをすべて揃えられることは大きな助けになっている」と書かれています。</div>
                    </div>
                    <div class="question" data-answer="4">
                        <div class="question-num">問7</div>
                        <div class="question-text">コンビニが取り組んでいる課題解決の方法として正しいものはどれですか。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. 商品の値上げ</div>
                            <div class="option" data-value="2">2. 店舗の閉鎖</div>
                            <div class="option" data-value="3">3. 外国人スタッフの禁止</div>
                            <div class="option" data-value="4">4. AIを使った発注システムの導入</div>
                        </div>
                        <div class="explanation">「AIを使った発注システムの導入や、閉店時間の設定など、様々な取り組みを進めている」と書かれています。</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 問題4: 長文 -->
        <div class="section">
            <div class="section-title">問題4</div>
            <div class="passage-grid">
                <div class="passage-sticky">
                    <div class="passage">
                        近年、AI（人工知能）技術の発展が目覚ましい。文章を書いたり、絵を描いたり、会話をしたりするAIが次々と登場し、私たちの生活に大きな変化をもたらしている。<br><br>
                        AIが社会に与える影響は、ポジティブな面とネガティブな面の両方がある。ポジティブな面としては、医療分野での診断支援や、教育分野での個別指導など、専門家の仕事を補助する役割が期待されている。一方、単純作業を中心に、AIに仕事を奪われるという懸念も広がっている。<br><br>
                        しかし、歴史を振り返ると、新しい技術が登場するたびに人々は同じような不安を感じてきた。蒸気機関や自動車の登場も、当初は雇用を奪うと恐れられたが、結果的には新しい職種を生み出した。AIも同様に、新しい形の仕事や価値を生み出す可能性が高い。<br><br>
                        大切なのは、AIを敵視するのではなく、AIと共存する方法を考えることだ。AIが得意なことはAIに任せ、人間にしかできないことに集中するという姿勢が、これからの時代には求められるだろう。
                    </div>
                </div>
                <div>
                    <div class="question" data-answer="1">
                        <div class="question-num">問8</div>
                        <div class="question-text">AIのポジティブな影響として挙げられているものはどれですか。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. 医療分野での診断支援</div>
                            <div class="option" data-value="2">2. 単純作業の増加</div>
                            <div class="option" data-value="3">3. 雇用の減少</div>
                            <div class="option" data-value="4">4. 専門家の仕事の廃止</div>
                        </div>
                        <div class="explanation">「医療分野での診断支援や、教育分野での個別指導など、専門家の仕事を補助する役割が期待されている」と書かれています。</div>
                    </div>
                    <div class="question" data-answer="3">
                        <div class="question-num">問9</div>
                        <div class="question-text">蒸気機関や自動車の例から筆者が言いたいことは何ですか。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. 新技術は常に雇用を奪う</div>
                            <div class="option" data-value="2">2. 蒸気機関は悪い影響しかなかった</div>
                            <div class="option" data-value="3">3. 新技術は最終的に新しい職種を生み出した</div>
                            <div class="option" data-value="4">4. AIは蒸気機関より危険だ</div>
                        </div>
                        <div class="explanation">「結果的には新しい職種を生み出した。AIも同様に、新しい形の仕事や価値を生み出す可能性が高い」と書かれています。</div>
                    </div>
                    <div class="question" data-answer="4">
                        <div class="question-num">問10</div>
                        <div class="question-text">筆者がこれからの時代に必要だと言っていることは何ですか。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. AIの開発を止めること</div>
                            <div class="option" data-value="2">2. AIだけに頼ること</div>
                            <div class="option" data-value="3">3. 人間の仕事をすべてAIに任せること</div>
                            <div class="option" data-value="4">4. AIと共存する方法を考えること</div>
                        </div>
                        <div class="explanation">「AIを敵視するのではなく、AIと共存する方法を考えることだ」と書かれています。</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 問題5: 情報検索 -->
        <div class="section">
            <div class="section-title">問題5</div>
            <div class="passage">
                <strong>アルバイト募集</strong><br><br>
                <table class="info-table">
                    <tr>
                        <th>職種</th>
                        <th>勤務時間</th>
                        <th>時給</th>
                        <th>条件</th>
                        <th>勤務地</th>
                    </tr>
                    <tr>
                        <td>カフェスタッフ</td>
                        <td>平日 9:00〜17:00</td>
                        <td>1,100円</td>
                        <td>経験不問・18歳以上</td>
                        <td>渋谷駅徒歩3分</td>
                    </tr>
                    <tr>
                        <td>英会話講師補助</td>
                        <td>週2〜3日 13:00〜19:00</td>
                        <td>1,500円</td>
                        <td>英検2級以上・大学生以上</td>
                        <td>新宿駅徒歩5分</td>
                    </tr>
                    <tr>
                        <td>コンビニスタッフ</td>
                        <td>深夜 22:00〜翌6:00</td>
                        <td>1,300円</td>
                        <td>経験不問・20歳以上</td>
                        <td>池袋駅徒歩1分</td>
                    </tr>
                    <tr>
                        <td>データ入力</td>
                        <td>週3〜5日 10:00〜16:00</td>
                        <td>1,200円</td>
                        <td>PC基本操作できる方・高校生可</td>
                        <td>在宅勤務</td>
                    </tr>
                    <tr>
                        <td>イベントスタッフ</td>
                        <td>土日のみ 10:00〜18:00</td>
                        <td>1,250円</td>
                        <td>経験不問・18歳以上</td>
                        <td>各会場（都内）</td>
                    </tr>
                </table>
                <br>
                ※交通費は全職種支給（上限月1万円）<br>
                ※試用期間3ヶ月あり（同条件）
            </div>
            <div class="question" data-answer="4">
                <div class="question-num">問11</div>
                <div class="question-text">田中さんは17歳の高校生です。PCが使えます。応募できる仕事はどれですか。</div>
                <div class="options">
                    <div class="option" data-value="1">1. カフェスタッフ</div>
                    <div class="option" data-value="2">2. コンビニスタッフ</div>
                    <div class="option" data-value="3">3. イベントスタッフ</div>
                    <div class="option" data-value="4">4. データ入力</div>
                </div>
                <div class="explanation">データ入力は「高校生可」で、PC基本操作ができれば応募できます。他は18歳以上または20歳以上の条件があります。</div>
            </div>
            <div class="question" data-answer="2">
                <div class="question-num">問12</div>
                <div class="question-text">時給が一番高い仕事はどれですか。</div>
                <div class="options">
                    <div class="option" data-value="1">1. コンビニスタッフ</div>
                    <div class="option" data-value="2">2. 英会話講師補助</div>
                    <div class="option" data-value="3">3. イベントスタッフ</div>
                    <div class="option" data-value="4">4. データ入力</div>
                </div>
                <div class="explanation">英会話講師補助の時給は1,500円で、最も高いです。</div>
            </div>
            <div class="question" data-answer="3">
                <div class="question-num">問13</div>
                <div class="question-text">週末だけ働きたい人に向いている仕事はどれですか。</div>
                <div class="options">
                    <div class="option" data-value="1">1. カフェスタッフ</div>
                    <div class="option" data-value="2">2. データ入力</div>
                    <div class="option" data-value="3">3. イベントスタッフ</div>
                    <div class="option" data-value="4">4. 英会話講師補助</div>
                </div>
                <div class="explanation">イベントスタッフは「土日のみ」の勤務です。</div>
            </div>
        </div>

        <div class="actions">
            <button class="btn-submit" onclick="checkAnswers()">採点する</button>
        </div>

        <div class="score" id="score">
            <div class="score-num" id="score-num"></div>
            <div class="score-label">Score: <span id="score-pct"></span></div>
            <a href="listening.html" class="next-section-btn" id="next-btn" style="display: none;">次：聴解 →</a>
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
