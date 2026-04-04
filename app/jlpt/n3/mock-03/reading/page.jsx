'use client'
export default function Page() {
  return (
    <div dangerouslySetInnerHTML={{ __html: `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JLPT N3 Reading - MOCK-03 | Nihon GO!</title>
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
        <h1>JLPT N3 Mock Test 03 - 読解</h1>
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
                人間は一日に7〜8時間の睡眠が必要だと言われている。しかし、現代人の多くは十分な睡眠が取れていない。睡眠不足が続くと、集中力が下がり、ミスが増えるだけでなく、免疫力も低下して病気になりやすくなる。また、長期的には生活習慣病のリスクも高まる。良い睡眠のためには、毎日同じ時間に寝起きすること、寝る前にスマートフォンを見ないことが効果的だと言われている。
            </div>
            <div class="question" data-answer="3">
                <div class="question-num">問1</div>
                <div class="question-text">睡眠不足が続くとどうなりますか。</div>
                <div class="options">
                    <div class="option" data-value="1">1. 集中力が上がる</div>
                    <div class="option" data-value="2">2. 免疫力が高まる</div>
                    <div class="option" data-value="3">3. 病気になりやすくなる</div>
                    <div class="option" data-value="4">4. 生活習慣が改善される</div>
                </div>
                <div class="explanation">「免疫力も低下して病気になりやすくなる」と書かれています。</div>
            </div>
            <div class="question" data-answer="2">
                <div class="question-num">問2</div>
                <div class="question-text">良い睡眠のために効果的なことは何ですか。</div>
                <div class="options">
                    <div class="option" data-value="1">1. 毎日違う時間に寝ること</div>
                    <div class="option" data-value="2">2. 毎日同じ時間に寝起きすること</div>
                    <div class="option" data-value="3">3. 寝る前にスマートフォンを見ること</div>
                    <div class="option" data-value="4">4. 7時間以上運動すること</div>
                </div>
                <div class="explanation">「毎日同じ時間に寝起きすること、寝る前にスマートフォンを見ないことが効果的」と書かれています。</div>
            </div>
        </div>

        <!-- 問題2: 短文B（お知らせ） -->
        <div class="section">
            <div class="section-title">問題2</div>
            <div class="passage">
                <strong>図書館からのお知らせ</strong><br><br>
                いつも図書館をご利用いただきありがとうございます。来月より、以下のとおりサービスを変更いたします。<br><br>
                1. 貸し出し期間：現在の2週間から3週間に延長します。<br>
                2. 貸し出し冊数：1人5冊まで（変更なし）<br>
                3. 自習室の利用時間：午後9時まで（現在より1時間延長）<br>
                4. インターネット端末：1人1日30分まで（現在の15分から延長）<br><br>
                なお、館内での飲食は引き続き禁止です。ご不明な点はカウンターまでお問い合わせください。
            </div>
            <div class="question" data-answer="4">
                <div class="question-num">問3</div>
                <div class="question-text">来月から変わることは何ですか。</div>
                <div class="options">
                    <div class="option" data-value="1">1. 貸し出し冊数が増える</div>
                    <div class="option" data-value="2">2. 館内での飲食が可能になる</div>
                    <div class="option" data-value="3">3. インターネット端末の利用が禁止になる</div>
                    <div class="option" data-value="4">4. 貸し出し期間が長くなる</div>
                </div>
                <div class="explanation">「貸し出し期間：現在の2週間から3週間に延長します」と書かれています。</div>
            </div>
            <div class="question" data-answer="2">
                <div class="question-num">問4</div>
                <div class="question-text">インターネット端末は1日何分まで使えるようになりますか。</div>
                <div class="options">
                    <div class="option" data-value="1">1. 15分</div>
                    <div class="option" data-value="2">2. 30分</div>
                    <div class="option" data-value="3">3. 45分</div>
                    <div class="option" data-value="4">4. 60分</div>
                </div>
                <div class="explanation">「インターネット端末：1人1日30分まで」と書かれています。</div>
            </div>
        </div>

        <!-- 問題3: 中文 -->
        <div class="section">
            <div class="section-title">問題3</div>
            <div class="passage-grid">
                <div class="passage-sticky">
                    <div class="passage">
                        日本語には、外国語からきた言葉がたくさんある。これらを「外来語」と呼び、主にカタカナで書かれる。例えば、「テレビ」「コンピュータ」「パン」なども外来語だ。<br><br>
                        外来語が増えた理由の一つは、外国の文化や技術が日本に入ってきたとき、その言葉をそのまま使うことが多いからだ。新しい概念を表す言葉を日本語で作るより、外来語をそのまま使う方が便利な場合が多い。<br><br>
                        しかし、外来語が増えすぎると、日本語本来の豊かさが失われるという意見もある。特に高齢者の中には、外来語が理解できず困っている人も多い。大切なのは、外来語と日本語を場面に応じてうまく使い分けることではないだろうか。
                    </div>
                </div>
                <div>
                    <div class="question" data-answer="1">
                        <div class="question-num">問5</div>
                        <div class="question-text">外来語が増えた理由は何ですか。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. 外国の文化や技術が入ってきたとき、その言葉をそのまま使うことが多いから</div>
                            <div class="option" data-value="2">2. 日本語で新しい言葉を作るのが得意だから</div>
                            <div class="option" data-value="3">3. 高齢者が外来語を好むから</div>
                            <div class="option" data-value="4">4. カタカナの方が書きやすいから</div>
                        </div>
                        <div class="explanation">「外国の文化や技術が日本に入ってきたとき、その言葉をそのまま使うことが多いから」と書かれています。</div>
                    </div>
                    <div class="question" data-answer="3">
                        <div class="question-num">問6</div>
                        <div class="question-text">筆者が大切だと考えていることは何ですか。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. 外来語を使わないようにすること</div>
                            <div class="option" data-value="2">2. 日本語だけを使うこと</div>
                            <div class="option" data-value="3">3. 場面に応じて外来語と日本語を使い分けること</div>
                            <div class="option" data-value="4">4. 高齢者に外来語を教えること</div>
                        </div>
                        <div class="explanation">「外来語と日本語を場面に応じてうまく使い分けることではないだろうか」と書かれています。</div>
                    </div>
                    <div class="question" data-answer="4">
                        <div class="question-num">問7</div>
                        <div class="question-text">外来語が増えることへの問題点は何ですか。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. カタカナが増えて読みにくくなる</div>
                            <div class="option" data-value="2">2. 外国人が日本語を学びにくくなる</div>
                            <div class="option" data-value="3">3. 新しい技術が入ってこなくなる</div>
                            <div class="option" data-value="4">4. 日本語本来の豊かさが失われる可能性がある</div>
                        </div>
                        <div class="explanation">「外来語が増えすぎると、日本語本来の豊かさが失われるという意見もある」と書かれています。</div>
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
                        近年、日本では「働き方改革」が進んでいる。長時間労働を減らし、社員が仕事とプライベートのバランスを保てるようにすることが主な目的だ。<br><br>
                        以前の日本では、長時間働くことが美徳とされ、残業を多くする社員が評価される傾向があった。しかし、過労による健康被害や、育児・介護と仕事の両立が困難であることが社会問題となり、政府が制度を変えることになった。<br><br>
                        改革の一つとして、残業時間に上限が設けられた。また、有給休暇の取得も義務化され、社員が休みを取りやすい環境づくりが進んでいる。テレワークの普及も、通勤時間の削減につながっている。<br><br>
                        しかし、課題もある。制度は変わっても、職場の雰囲気や上司の意識がなかなか変わらないという声も多い。本当の意味での改革には、制度だけでなく、社会全体の意識が変わる必要があるだろう。
                    </div>
                </div>
                <div>
                    <div class="question" data-answer="2">
                        <div class="question-num">問8</div>
                        <div class="question-text">働き方改革の主な目的は何ですか。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. 残業を増やして生産性を上げること</div>
                            <div class="option" data-value="2">2. 仕事とプライベートのバランスを保てるようにすること</div>
                            <div class="option" data-value="3">3. テレワークを禁止すること</div>
                            <div class="option" data-value="4">4. 有給休暇を減らすこと</div>
                        </div>
                        <div class="explanation">「仕事とプライベートのバランスを保てるようにすることが主な目的だ」と書かれています。</div>
                    </div>
                    <div class="question" data-answer="1">
                        <div class="question-num">問9</div>
                        <div class="question-text">以前の日本の職場ではどんな傾向がありましたか。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. 残業を多くする社員が評価される傾向があった</div>
                            <div class="option" data-value="2">2. 有給休暇を多く取る社員が評価された</div>
                            <div class="option" data-value="3">3. テレワークが積極的に推進されていた</div>
                            <div class="option" data-value="4">4. 育児と仕事の両立が簡単だった</div>
                        </div>
                        <div class="explanation">「残業を多くする社員が評価される傾向があった」と書かれています。</div>
                    </div>
                    <div class="question" data-answer="4">
                        <div class="question-num">問10</div>
                        <div class="question-text">筆者は本当の改革のために何が必要だと言っていますか。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. 残業時間の上限をなくすこと</div>
                            <div class="option" data-value="2">2. テレワークをやめること</div>
                            <div class="option" data-value="3">3. 有給休暇の義務化をやめること</div>
                            <div class="option" data-value="4">4. 制度だけでなく社会全体の意識が変わること</div>
                        </div>
                        <div class="explanation">「制度だけでなく、社会全体の意識が変わる必要があるだろう」と書かれています。</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 問題5: 情報検索 -->
        <div class="section">
            <div class="section-title">問題5</div>
            <div class="passage">
                <strong>みどりカルチャーセンター 春の講座案内</strong><br><br>
                <table class="info-table">
                    <tr>
                        <th>講座名</th>
                        <th>曜日・時間</th>
                        <th>対象</th>
                        <th>料金（月額）</th>
                        <th>定員</th>
                    </tr>
                    <tr>
                        <td>初めての水彩画</td>
                        <td>火・木 10:00〜12:00</td>
                        <td>初心者</td>
                        <td>5,000円</td>
                        <td>15名</td>
                    </tr>
                    <tr>
                        <td>英会話（初級）</td>
                        <td>月・水 19:00〜20:30</td>
                        <td>初心者〜中級</td>
                        <td>8,000円</td>
                        <td>10名</td>
                    </tr>
                    <tr>
                        <td>ヨガ入門</td>
                        <td>月・金 10:00〜11:30</td>
                        <td>全レベル</td>
                        <td>6,000円</td>
                        <td>20名</td>
                    </tr>
                    <tr>
                        <td>料理（和食）</td>
                        <td>土 13:00〜15:00</td>
                        <td>全レベル</td>
                        <td>10,000円</td>
                        <td>8名</td>
                    </tr>
                    <tr>
                        <td>書道</td>
                        <td>水・金 14:00〜16:00</td>
                        <td>初心者〜上級</td>
                        <td>4,000円</td>
                        <td>12名</td>
                    </tr>
                </table>
                ※材料費は別途必要な場合があります。<br>
                ※体験レッスン（1回1,000円）もご用意しています。<br>
                ※お申し込みはカウンターまたはお電話で。
            </div>
            <div class="question" data-answer="3">
                <div class="question-num">問11</div>
                <div class="question-text">田中さんは平日の夜だけ通える会社員です。英語を勉強したいと思っています。田中さんが参加できる講座はどれですか。</div>
                <div class="options">
                    <div class="option" data-value="1">1. 初めての水彩画</div>
                    <div class="option" data-value="2">2. ヨガ入門</div>
                    <div class="option" data-value="3">3. 英会話（初級）</div>
                    <div class="option" data-value="4">4. 書道</div>
                </div>
                <div class="explanation">英会話（初級）は月・水の夜19:00〜20:30で、平日の夜に通える田中さんに合っています。</div>
            </div>
            <div class="question" data-answer="1">
                <div class="question-num">問12</div>
                <div class="question-text">月額料金が最も安い講座はどれですか。</div>
                <div class="options">
                    <div class="option" data-value="1">1. 書道</div>
                    <div class="option" data-value="2">2. 初めての水彩画</div>
                    <div class="option" data-value="3">3. ヨガ入門</div>
                    <div class="option" data-value="4">4. 英会話（初級）</div>
                </div>
                <div class="explanation">書道の月額料金は4,000円で、最も安いです。</div>
            </div>
            <div class="question" data-answer="2">
                <div class="question-num">問13</div>
                <div class="question-text">定員が最も少ない講座はどれですか。</div>
                <div class="options">
                    <div class="option" data-value="1">1. 英会話（初級）</div>
                    <div class="option" data-value="2">2. 料理（和食）</div>
                    <div class="option" data-value="3">3. 書道</div>
                    <div class="option" data-value="4">4. 初めての水彩画</div>
                </div>
                <div class="explanation">料理（和食）の定員は8名で、最も少ないです。</div>
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
  )
}
