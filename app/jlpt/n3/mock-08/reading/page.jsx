'use client'
export default function Page() {
  return (
    <div dangerouslySetInnerHTML={{ __html: `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JLPT N3 Reading - MOCK-08 | Nihon GO!</title>
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
        <h1>JLPT N3 Mock Test 08 - 読解</h1>
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

            <!-- P1: 電気代節約 -->
            <div class="reading-layout">
                <div class="passage-box">
                    電気代を節約するために、いくつかの工夫ができる。まず、使っていない電気はこまめに消すこと。次に、エアコンの設定温度を夏は28度、冬は20度にすることが推奨されている。また、省エネ家電に買い替えることも長期的には節約につながる。小さな積み重ねが大きな節約につながることを覚えておきたい。
                </div>
                <div class="reading-questions">
                    <div class="question" data-answer="3">
                        <div class="question-number">問1</div>
                        <div class="question-text">この文章で述べられていないものはどれか。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. 使っていない電気を消す</div>
                            <div class="option" data-value="2">2. エアコンの設定温度を調整する</div>
                            <div class="option" data-value="3">3. 太陽光パネルを設置する</div>
                            <div class="option" data-value="4">4. 省エネ家電に買い替える</div>
                        </div>
                        <div class="explanation">「太陽光パネルの設置」については述べられていません。</div>
                    </div>
                </div>
            </div>

            <!-- P2: 年末年始休業 -->
            <div class="reading-layout" style="margin-top:24px;">
                <div class="passage-box">
                    <strong>年末年始休業のお知らせ</strong><br><br>
                    誠に勝手ながら、下記の期間を年末年始休業とさせていただきます。<br><br>
                    休業期間：12月29日（日）〜1月3日（金）<br><br>
                    ※1月4日（土）より通常営業いたします。<br>
                    ※休業期間中のお問い合わせは、1月4日以降に順次対応いたします。<br>
                    ※緊急の場合は、メールにてご連絡ください。<br><br>
                    ご不便をおかけして申し訳ございません。
                </div>
                <div class="reading-questions">
                    <div class="question" data-answer="4">
                        <div class="question-number">問2</div>
                        <div class="question-text">このお知らせの内容として正しいものはどれか。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. 1月3日から通常営業が始まる</div>
                            <div class="option" data-value="2">2. 休業期間中は電話で問い合わせができる</div>
                            <div class="option" data-value="3">3. 休業期間中の問い合わせには翌日に対応する</div>
                            <div class="option" data-value="4">4. 緊急の場合はメールで連絡できる</div>
                        </div>
                        <div class="explanation">「緊急の場合は、メールにてご連絡ください」とあります。通常営業は1月4日からです。</div>
                    </div>
                </div>
            </div>

            <!-- P3: 食品ロス -->
            <div class="reading-layout" style="margin-top:24px;">
                <div class="passage-box">
                    食品ロスとは、まだ食べられるのに捨てられてしまう食品のことだ。日本では年間約600万トンもの食品が廃棄されているという。家庭でできる対策として、買いすぎない、使い切れる量だけ買う、食材を上手に使い回すなどが挙げられる。一人一人の小さな行動が、食品ロス削減につながる。
                </div>
                <div class="reading-questions">
                    <div class="question" data-answer="2">
                        <div class="question-number">問3</div>
                        <div class="question-text">この文章で筆者が最も言いたいことは何か。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. 食品ロスは政府だけが解決できる問題だ</div>
                            <div class="option" data-value="2">2. 一人一人の小さな行動が食品ロス削減につながる</div>
                            <div class="option" data-value="3">3. 食品ロスの問題は日本だけの問題だ</div>
                            <div class="option" data-value="4">4. 食品は安く買うべきだ</div>
                        </div>
                        <div class="explanation">「一人一人の小さな行動が、食品ロス削減につながる」が主張です。</div>
                    </div>
                </div>
            </div>

            <!-- P4: ファッションと個性 -->
            <div class="reading-layout" style="margin-top:24px;">
                <div class="passage-box">
                    ファッションは個性を表現する手段の一つだ。最近では、流行を追うだけでなく、自分らしいスタイルを大切にする人が増えている。服選びに正解はなく、自分が着て気持ちいいと思えるものが一番よいスタイルだと言えるだろう。他人の目を気にしすぎず、自分の好みを大切にすることが、ファッションを楽しむ基本だ。
                </div>
                <div class="reading-questions">
                    <div class="question" data-answer="3">
                        <div class="question-number">問4</div>
                        <div class="question-text">ファッションについてこの文章と合っているものはどれか。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. 流行を追うことが最も大切だ</div>
                            <div class="option" data-value="2">2. 他人の目を常に意識すべきだ</div>
                            <div class="option" data-value="3">3. 自分が着て気持ちいいと思えるものが一番よいスタイルだ</div>
                            <div class="option" data-value="4">4. 服選びには明確な正解がある</div>
                        </div>
                        <div class="explanation">「自分が着て気持ちいいと思えるものが一番よいスタイルだ」とあります。</div>
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
                    子供の教育について、親によって考え方は様々だ。勉強を最優先にする親もいれば、遊びや体験を大切にする親もいる。<br><br>
                    私は、どちらも大切だと思っている。知識を身につけることはもちろん重要だが、友達と遊んだり、自然の中で体を動かしたりする経験も、子供の成長に欠かせないものだ。<br><br>
                    大切なのは、子供自身が何に興味を持っているかをよく観察し、その気持ちを尊重することではないだろうか。子供の可能性を信じて、親が焦らずに見守ることも、教育の大切な一面だと思う。
                </div>
                <div class="reading-questions">
                    <div class="question" data-answer="3">
                        <div class="question-number">問5</div>
                        <div class="question-text">筆者は勉強と遊びについてどう考えているか。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. 勉強だけが重要だ</div>
                            <div class="option" data-value="2">2. 遊びだけが重要だ</div>
                            <div class="option" data-value="3">3. 勉強も遊びも両方大切だ</div>
                            <div class="option" data-value="4">4. どちらも必要ない</div>
                        </div>
                        <div class="explanation">「どちらも大切だと思っている」と述べています。</div>
                    </div>
                    <div class="question" data-answer="2">
                        <div class="question-number">問6</div>
                        <div class="question-text">筆者が子供の教育で最も大切だと述べていることは何か。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. 勉強を最優先にすること</div>
                            <div class="option" data-value="2">2. 子供の興味を観察してその気持ちを尊重すること</div>
                            <div class="option" data-value="3">3. 自然の中で体を動かすこと</div>
                            <div class="option" data-value="4">4. 親が厳しく管理すること</div>
                        </div>
                        <div class="explanation">「子供自身が何に興味を持っているかをよく観察し、その気持ちを尊重すること」とあります。</div>
                    </div>
                    <div class="question" data-answer="4">
                        <div class="question-number">問7</div>
                        <div class="question-text">筆者は親の役割についてどう述べているか。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. 親が全てを決めるべきだ</div>
                            <div class="option" data-value="2">2. 子供に任せすぎるべきだ</div>
                            <div class="option" data-value="3">3. 親は教育に関わるべきでない</div>
                            <div class="option" data-value="4">4. 子供の可能性を信じて焦らず見守ることも大切だ</div>
                        </div>
                        <div class="explanation">「子供の可能性を信じて、親が焦らずに見守ることも、教育の大切な一面だ」とあります。</div>
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
                    日本には多くの伝統工芸がある。陶磁器、漆器、織物など、地域ごとに独自の技術が発展してきた。これらの工芸品は、職人が何年もかけて技術を磨き、次の世代に受け継いできた大切な文化遺産だ。<br><br>
                    しかし近年、伝統工芸の職人数は減少している。若者の職人離れや、大量生産品との価格競争が主な理由として挙げられている。一方で、伝統工芸に関心を持つ外国人が増えており、海外でも日本の工芸品の評価は高い。<br><br>
                    この状況を打開するため、伝統工芸とモダンデザインを融合させた新しい商品開発や、職人の技術を動画で発信するなど、様々な取り組みが行われている。<br><br>
                    伝統工芸を守るには、技術の継承だけでなく、現代の消費者のニーズに合わせた新しい展開も必要だろう。伝統と革新のバランスをどのように取るかが、今後の課題だと言える。
                </div>
                <div class="reading-questions">
                    <div class="question" data-answer="2">
                        <div class="question-number">問8</div>
                        <div class="question-text">伝統工芸の職人数が減少している理由として挙げられているものはどれか。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. 外国人に人気がないから</div>
                            <div class="option" data-value="2">2. 若者の職人離れと大量生産品との価格競争</div>
                            <div class="option" data-value="3">3. 政府の支援がないから</div>
                            <div class="option" data-value="4">4. 技術が難しすぎるから</div>
                        </div>
                        <div class="explanation">「若者の職人離れや、大量生産品との価格競争が主な理由」とあります。</div>
                    </div>
                    <div class="question" data-answer="3">
                        <div class="question-number">問9</div>
                        <div class="question-text">伝統工芸を守るための取り組みとして述べられていないものはどれか。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. 伝統とモダンデザインを融合させた新商品開発</div>
                            <div class="option" data-value="2">2. 職人の技術を動画で発信する</div>
                            <div class="option" data-value="3">3. 外国人職人を招いて技術を学ぶ</div>
                            <div class="option" data-value="4">4. 現代の消費者のニーズに合わせた展開</div>
                        </div>
                        <div class="explanation">「外国人職人を招く」については述べられていません。</div>
                    </div>
                    <div class="question" data-answer="4">
                        <div class="question-number">問10</div>
                        <div class="question-text">筆者は伝統工芸の今後についてどう述べているか。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. 技術の継承だけに集中すべきだ</div>
                            <div class="option" data-value="2">2. 伝統工芸はもう守れない</div>
                            <div class="option" data-value="3">3. 外国人向けに特化すべきだ</div>
                            <div class="option" data-value="4">4. 伝統と革新のバランスをどう取るかが課題だ</div>
                        </div>
                        <div class="explanation">「伝統と革新のバランスをどのように取るかが、今後の課題だ」とあります。</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 問題13: 情報検索 -->
        <div class="section-box">
            <div class="section-title">問題13 情報検索</div>
            <div class="section-desc">右のページは、会員制サービスの規約です。これを読んで、後の問いに答えなさい。</div>
            <div class="reading-layout">
                <div class="passage-box">
                    <strong>プレミアム会員規約</strong><br><br>
                    <strong>会員種別と料金</strong><br>
                    ・無料会員：基本サービスのみ利用可<br>
                    ・スタンダード会員：月額980円<br>
                    ・プレミアム会員：月額1,980円<br><br>
                    <strong>プレミアム会員の特典</strong><br>
                    ・全コンテンツ閲覧可<br>
                    ・広告なし<br>
                    ・月3回まで専門家に相談可<br>
                    ・家族2名まで同時利用可<br><br>
                    <strong>解約について</strong><br>
                    ・解約は月末締め切り<br>
                    ・月途中の解約は翌月末まで有効<br>
                    ・解約後のデータは30日間保持<br><br>
                    ※スタンダード会員はプレミアム特典の一部のみ利用可
                </div>
                <div class="reading-questions">
                    <div class="question" data-answer="2">
                        <div class="question-number">問11</div>
                        <div class="question-text">プレミアム会員が月に何回まで専門家に相談できるか。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. 1回</div>
                            <div class="option" data-value="2">2. 3回</div>
                            <div class="option" data-value="3">3. 5回</div>
                            <div class="option" data-value="4">4. 無制限</div>
                        </div>
                        <div class="explanation">「月3回まで専門家に相談可」とあります。</div>
                    </div>
                    <div class="question" data-answer="3">
                        <div class="question-number">問12</div>
                        <div class="question-text">5月15日に解約した場合、サービスはいつまで使えるか。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. 5月15日まで</div>
                            <div class="option" data-value="2">2. 5月31日まで</div>
                            <div class="option" data-value="3">3. 6月30日まで</div>
                            <div class="option" data-value="4">4. 7月31日まで</div>
                        </div>
                        <div class="explanation">「月途中の解約は翌月末まで有効」なので、5月15日に解約すると6月30日まで使えます。</div>
                    </div>
                    <div class="question" data-answer="4">
                        <div class="question-number">問13</div>
                        <div class="question-text">この規約について正しいものはどれか。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. 無料会員は全コンテンツを閲覧できる</div>
                            <div class="option" data-value="2">2. スタンダード会員は広告なしで利用できる</div>
                            <div class="option" data-value="3">3. 解約後すぐにデータが削除される</div>
                            <div class="option" data-value="4">4. プレミアム会員は家族2名まで同時利用できる</div>
                        </div>
                        <div class="explanation">「家族2名まで同時利用可」とあります。解約後のデータは30日間保持されます。</div>
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
  )
}
