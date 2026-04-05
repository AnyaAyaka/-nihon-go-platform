'use client'
import AccessCheck from '../../../../AccessCheck'

export default function Page() {
  return (
    <>
      <AccessCheck level="N3" mockNum={7} />
      <div dangerouslySetInnerHTML={{ __html: `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JLPT N3 Reading - MOCK-07 | Nihon GO!</title>
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
        .section-box { background: #fff; border-radius: 12px; padding: 24px; margin-bottom: 20px; border: 1px solid #e5e7eb; }
        .section-title { font-size: 1.1em; font-weight: 600; margin-bottom: 12px; padding-bottom: 12px; border-bottom: 2px solid #06b6d4; }
        .section-desc { color: #666; font-size: 0.9em; margin-bottom: 20px; }
        .reading-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; align-items: start; margin-bottom: 24px; }
        .reading-layout:last-child { margin-bottom: 0; }
        .passage-box { background: #f8fafc; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; line-height: 2; position: sticky; top: 80px; font-size: 0.95rem; }
        .reading-questions { display: flex; flex-direction: column; gap: 16px; }
        @media (max-width: 768px) { .reading-layout { grid-template-columns: 1fr; } .passage-box { position: static; } }
        .question { padding: 16px; background: #f9fafb; border-radius: 8px; }
        .question-number { font-weight: 700; color: #06b6d4; margin-bottom: 8px; font-size: 0.9rem; }
        .question-text { font-size: 1em; margin-bottom: 12px; }
        .options { display: grid; grid-template-columns: 1fr; gap: 8px; }
        .option { padding: 12px 16px; border: 2px solid #e5e7eb; border-radius: 8px; cursor: pointer; transition: all 0.15s; background: #fff; color: #333; font-size: 1rem; text-align: left; }
        .option:hover { border-color: #06b6d4; background: #ecfeff; }
        .option.selected { border-color: #06b6d4; background: #ecfeff; }
        .option.correct { border-color: #06b6d4; background: #cffafe; }
        .option.incorrect { border-color: #ef4444; background: #fee2e2; }
        .explanation { margin-top: 12px; padding: 12px; background: #fef3c7; border-radius: 6px; display: none; font-size: 0.9em; }
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
        <h1>JLPT N3 Mock Test 07 - 読解</h1>
        <div class="nav-back-row">
            <a href="/materials/jlpt/n3/" class="nav-back">&#8592; 問題一覧</a>
        </div>
        <div class="nav">
            <a href="vocabulary.html">語彙</a><a href="grammar.html">文法</a><a href="reading.html" class="active">読解</a><a href="listening.html">聴解</a>
        </div>

        <!-- 問題10: 短文読解 -->
        <div class="section-box">
            <div class="section-title">問題10 短文読解</div>
            <div class="section-desc">次の文章を読んで、後の問いに対する答えとして最もよいものを、1・2・3・4から一つ選びなさい。</div>

            <!-- P1: 在宅勤務と子育て -->
            <div class="reading-layout">
                <div class="passage-box">
                    在宅勤務が普及したことで、子育てと仕事を両立しやすくなったと感じる親が増えている。通勤時間がなくなった分、子供と過ごす時間が増えたからだ。しかし一方で、仕事と育児の区別がつきにくくなり、集中して仕事ができないと感じる人も多い。在宅勤務は環境を整えることが大切だと言えるだろう。
                </div>
                <div class="reading-questions">
                    <div class="question" data-answer="4">
                        <div class="question-number">問1</div>
                        <div class="question-text">この文章の内容として最も適切なものはどれか。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. 在宅勤務は子育てに全く向いていない</div>
                            <div class="option" data-value="2">2. 在宅勤務では仕事の効率が必ず上がる</div>
                            <div class="option" data-value="3">3. 通勤時間がなくなると子供と過ごす時間が減る</div>
                            <div class="option" data-value="4">4. 在宅勤務にはメリットもあるが課題もあり、環境を整えることが大切だ</div>
                        </div>
                        <div class="explanation">「両立しやすくなった」というメリットと「集中できない」という課題の両方が述べられています。</div>
                    </div>
                </div>
            </div>

            <!-- P2: アプリ不具合のお知らせ -->
            <div class="reading-layout" style="margin-top:24px;">
                <div class="passage-box">
                    <strong>アプリ不具合のお知らせ</strong><br><br>
                    現在、当アプリにて一部の機能が正常に動作しない不具合が発生しております。<br><br>
                    対象機能：通知機能・メッセージ送受信<br>
                    発生日時：11月20日（水）午前10時頃より<br>
                    復旧予定：11月21日（木）午前中<br><br>
                    ※ご不便をおかけして申し訳ございません。<br>
                    ※緊急の場合はお電話にてご連絡ください。
                </div>
                <div class="reading-questions">
                    <div class="question" data-answer="3">
                        <div class="question-number">問2</div>
                        <div class="question-text">このお知らせの内容として正しいものはどれか。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. アプリのすべての機能が使えない</div>
                            <div class="option" data-value="2">2. 不具合は11月20日午前中に復旧する</div>
                            <div class="option" data-value="3">3. 緊急の場合は電話で連絡できる</div>
                            <div class="option" data-value="4">4. メッセージ機能だけは正常に使える</div>
                        </div>
                        <div class="explanation">「緊急の場合はお電話にてご連絡ください」とあります。</div>
                    </div>
                </div>
            </div>

            <!-- P3: あいさつの重要性 -->
            <div class="reading-layout" style="margin-top:24px;">
                <div class="passage-box">
                    日常生活の中で、あいさつは人間関係を築く上でとても大切だ。「おはようございます」「ありがとうございます」といった一言が、相手に親しみやすさや信頼感を与える。特に職場では、あいさつができる人は周囲から好印象を持たれることが多い。小さなことのように思えるが、あいさつは人と人をつなぐ重要な役割を果たしている。
                </div>
                <div class="reading-questions">
                    <div class="question" data-answer="2">
                        <div class="question-number">問3</div>
                        <div class="question-text">筆者があいさつについて最も言いたいことは何か。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. 職場以外ではあいさつは必要ない</div>
                            <div class="option" data-value="2">2. あいさつは人間関係を築く上で大切な役割を果たしている</div>
                            <div class="option" data-value="3">3. あいさつは長い言葉でするべきだ</div>
                            <div class="option" data-value="4">4. あいさつができなくても問題ない</div>
                        </div>
                        <div class="explanation">「あいさつは人と人をつなぐ重要な役割を果たしている」が主張です。</div>
                    </div>
                </div>
            </div>

            <!-- P4: 化粧品の口コミ -->
            <div class="reading-layout" style="margin-top:24px;">
                <div class="passage-box">
                    この化粧水を使い始めて1ヶ月になります。肌がしっとりして、乾燥が気にならなくなりました。香りも自然で使いやすいです。ただ、量が少なめなので、1ヶ月で1本使い切ってしまいました。値段は少し高めですが、効果を考えると満足しています。乾燥肌の方にはおすすめです。
                </div>
                <div class="reading-questions">
                    <div class="question" data-answer="1">
                        <div class="question-number">問4</div>
                        <div class="question-text">この口コミの内容として正しいものはどれか。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. 値段は高めだが効果に満足している</div>
                            <div class="option" data-value="2">2. 香りが強くて使いにくい</div>
                            <div class="option" data-value="3">3. 1本で3ヶ月使えた</div>
                            <div class="option" data-value="4">4. 乾燥肌には向いていない</div>
                        </div>
                        <div class="explanation">「値段は少し高めですが、効果を考えると満足しています」とあります。</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 問題11: 中文読解 -->
        <div class="section-box">
            <div class="section-title">問題11 中文読解</div>
            <div class="section-desc">次の文章を読んで、後の問いに対する答えとして最もよいものを、1・2・3・4から一つ選びなさい。</div>
            <div class="reading-layout">
                <div class="passage-box">
                    私は3年間勤めた会社を辞め、転職することにした。最初は安定した仕事を手放すことへの不安があった。しかし、同じ仕事を続けることへの物足りなさを感じ始めていた。<br><br>
                    転職活動は思ったより大変だった。何社も面接を受けたが、なかなか採用されなかった。それでも諦めずに続けた結果、やりたかった仕事に就くことができた。<br><br>
                    今の仕事は以前より給料は下がったが、毎日やりがいを感じている。転職は簡単ではないが、自分に合った仕事を見つけることの大切さを実感している。
                </div>
                <div class="reading-questions">
                    <div class="question" data-answer="2">
                        <div class="question-number">問5</div>
                        <div class="question-text">筆者が転職を決めた理由は何か。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. 給料が低かったから</div>
                            <div class="option" data-value="2">2. 同じ仕事を続けることへの物足りなさを感じたから</div>
                            <div class="option" data-value="3">3. 会社が倒産したから</div>
                            <div class="option" data-value="4">4. 上司と仲が悪かったから</div>
                        </div>
                        <div class="explanation">「同じ仕事を続けることへの物足りなさを感じ始めていた」とあります。</div>
                    </div>
                    <div class="question" data-answer="3">
                        <div class="question-number">問6</div>
                        <div class="question-text">転職活動はどうだったか。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. すぐに採用された</div>
                            <div class="option" data-value="2">2. 1社しか受けなかった</div>
                            <div class="option" data-value="3">3. 何社も受けたがなかなか採用されなかった</div>
                            <div class="option" data-value="4">4. 転職活動をやめてしまった</div>
                        </div>
                        <div class="explanation">「何社も面接を受けたが、なかなか採用されなかった」とあります。</div>
                    </div>
                    <div class="question" data-answer="4">
                        <div class="question-number">問7</div>
                        <div class="question-text">筆者は現在の仕事についてどう感じているか。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. 給料が上がって満足している</div>
                            <div class="option" data-value="2">2. 転職しなければよかったと後悔している</div>
                            <div class="option" data-value="3">3. 仕事が難しすぎて困っている</div>
                            <div class="option" data-value="4">4. 給料は下がったがやりがいを感じている</div>
                        </div>
                        <div class="explanation">「給料は下がったが、毎日やりがいを感じている」とあります。</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 問題12: 長文読解 -->
        <div class="section-box">
            <div class="section-title">問題12 長文読解</div>
            <div class="section-desc">次の文章を読んで、後の問いに対する答えとして最もよいものを、1・2・3・4から一つ選びなさい。</div>
            <div class="reading-layout">
                <div class="passage-box">
                    近年、日本では「働き方改革」が推進されている。長時間労働の削減や、テレワークの導入など、働く環境を改善しようという動きが広がっている。<br><br>
                    この改革の背景には、過労死や精神的な健康問題など、長時間労働による深刻な問題がある。特に日本では、残業が当たり前という文化が根付いており、それが様々な問題を引き起こしていると指摘されている。<br><br>
                    改革の成果として、一部の企業では残業時間が減り、有給休暇の取得率が上がったという報告もある。しかし、業種や企業によって改革の進み方には差があり、まだ課題も多い。<br><br>
                    働き方改革を真に実現するには、制度を変えるだけでなく、働くことへの意識や企業文化を変えていくことも必要だと言えるだろう。
                </div>
                <div class="reading-questions">
                    <div class="question" data-answer="2">
                        <div class="question-number">問8</div>
                        <div class="question-text">働き方改革が推進されている背景として述べられているものはどれか。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. 労働者が増えすぎたから</div>
                            <div class="option" data-value="2">2. 長時間労働による過労死や精神的健康問題があるから</div>
                            <div class="option" data-value="3">3. 日本の経済が悪化しているから</div>
                            <div class="option" data-value="4">4. テレワークの技術が発達したから</div>
                        </div>
                        <div class="explanation">「過労死や精神的な健康問題など、長時間労働による深刻な問題がある」とあります。</div>
                    </div>
                    <div class="question" data-answer="3">
                        <div class="question-number">問9</div>
                        <div class="question-text">改革の成果として述べられていないものはどれか。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. 残業時間が減った企業がある</div>
                            <div class="option" data-value="2">2. 有給休暇の取得率が上がった企業がある</div>
                            <div class="option" data-value="3">3. すべての企業で改革が完了した</div>
                            <div class="option" data-value="4">4. テレワークが導入されている</div>
                        </div>
                        <div class="explanation">「業種や企業によって改革の進み方には差があり、まだ課題も多い」とあり、すべての企業で完了したわけではありません。</div>
                    </div>
                    <div class="question" data-answer="4">
                        <div class="question-number">問10</div>
                        <div class="question-text">筆者は働き方改革について何が必要だと述べているか。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. 残業を完全に禁止すること</div>
                            <div class="option" data-value="2">2. 外国の制度をそのまま導入すること</div>
                            <div class="option" data-value="3">3. もっと多くの法律を作ること</div>
                            <div class="option" data-value="4">4. 制度だけでなく意識や企業文化も変えること</div>
                        </div>
                        <div class="explanation">「制度を変えるだけでなく、働くことへの意識や企業文化を変えていくことも必要だ」とあります。</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 問題13: 情報検索 -->
        <div class="section-box">
            <div class="section-title">問題13 情報検索</div>
            <div class="section-desc">右のページは、市民マラソンの参加要項です。これを読んで、後の問いに答えなさい。</div>
            <div class="reading-layout">
                <div class="passage-box">
                    <strong>第10回 市民マラソン大会 参加要項</strong><br><br>
                    開催日：12月8日（日）<br>
                    場所：中央公園スタート・ゴール<br><br>
                    <strong>コース</strong><br>
                    ・フルマラソン（42.195km）：18歳以上<br>
                    ・ハーフマラソン（21km）：16歳以上<br>
                    ・10kmコース：小学生以上<br><br>
                    <strong>参加費</strong><br>
                    ・フルマラソン：5,000円<br>
                    ・ハーフマラソン：3,500円<br>
                    ・10kmコース：2,000円<br><br>
                    ※参加費には完走証・記念品を含む<br>
                    ※申込締切：11月30日（土）<br>
                    ※雨天決行・荒天中止<br>
                    ※参加人数：各コース先着500名
                </div>
                <div class="reading-questions">
                    <div class="question" data-answer="2">
                        <div class="question-number">問11</div>
                        <div class="question-text">17歳の高校生が参加できるコースはどれか。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. フルマラソンのみ</div>
                            <div class="option" data-value="2">2. ハーフマラソンと10kmコース</div>
                            <div class="option" data-value="3">3. 10kmコースのみ</div>
                            <div class="option" data-value="4">4. どのコースにも参加できない</div>
                        </div>
                        <div class="explanation">フルマラソンは18歳以上、ハーフは16歳以上、10kmは小学生以上なので、17歳はハーフと10kmに参加できます。</div>
                    </div>
                    <div class="question" data-answer="3">
                        <div class="question-number">問12</div>
                        <div class="question-text">フルマラソンとハーフマラソンの両方に申し込んだ場合、参加費の合計はいくらか。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. 5,000円</div>
                            <div class="option" data-value="2">2. 7,000円</div>
                            <div class="option" data-value="3">3. 8,500円</div>
                            <div class="option" data-value="4">4. 10,500円</div>
                        </div>
                        <div class="explanation">フルマラソン5,000円＋ハーフマラソン3,500円＝8,500円です。</div>
                    </div>
                    <div class="question" data-answer="4">
                        <div class="question-number">問13</div>
                        <div class="question-text">この大会について正しいものはどれか。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. 雨天の場合は中止になる</div>
                            <div class="option" data-value="2">2. 参加費に記念品は含まれない</div>
                            <div class="option" data-value="3">3. 申込締切は12月1日だ</div>
                            <div class="option" data-value="4">4. 各コース先着500名まで参加できる</div>
                        </div>
                        <div class="explanation">「参加人数：各コース先着500名」とあります。雨天決行・荒天中止なので、雨だけでは中止になりません。</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="actions">
            <button class="btn-submit" onclick="checkAnswers()">採点する</button>
        </div>

        <div class="score" id="score">
            <div class="score-num" id="score-num"></div>
            <div class="score-label">Score: <span id="score-pct"></span></div>
            <a href="listening.html" class="next-section-btn" id="next-btn" style="display: none;">次：聴解 &#8594;</a>
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
