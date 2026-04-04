'use client'
export default function Page() {
  return (
    <div dangerouslySetInnerHTML={{ __html: `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JLPT N3 Reading - MOCK-10 | Nihon GO!</title>
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
        <h1>JLPT N3 Mock Test 10 - 読解</h1>
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

            <!-- P1: AIと仕事 -->
            <div class="reading-layout">
                <div class="passage-box">
                    AI技術の発展により、これまで人間が行っていた多くの仕事が自動化されるようになった。これにより、単純作業や定型業務の効率が大幅に向上した。一方で、AIには感情や創造性が欠けているため、人間にしかできない仕事も依然として存在する。AIと人間が協力することで、より豊かな社会が実現できると考えられている。
                </div>
                <div class="reading-questions">
                    <div class="question" data-answer="4">
                        <div class="question-number">問1</div>
                        <div class="question-text">この文章の内容として最も適切なものはどれか。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. AIはすべての仕事を人間より上手くこなせる</div>
                            <div class="option" data-value="2">2. AIの発展により人間の仕事はなくなる</div>
                            <div class="option" data-value="3">3. AIは感情があるので創造的な仕事もできる</div>
                            <div class="option" data-value="4">4. AIと人間が協力することでより豊かな社会が実現できる</div>
                        </div>
                        <div class="explanation">「AIと人間が協力することで、より豊かな社会が実現できると考えられている」が主張です。</div>
                    </div>
                </div>
            </div>

            <!-- P2: 町内会清掃 -->
            <div class="reading-layout" style="margin-top:24px;">
                <div class="passage-box">
                    <strong>町内会清掃のお知らせ</strong><br><br>
                    来月、下記の日程で町内清掃を行います。<br><br>
                    日時：10月15日（日）午前9時〜11時<br>
                    集合場所：町内会館前<br>
                    対象区域：駅前通り〜公園周辺<br><br>
                    ※参加無料<br>
                    ※軍手・ゴミ袋は町内会が用意します<br>
                    ※雨天の場合は翌週に延期<br>
                    ※参加希望の方は10月10日までに町内会へご連絡ください
                </div>
                <div class="reading-questions">
                    <div class="question" data-answer="3">
                        <div class="question-number">問2</div>
                        <div class="question-text">このお知らせの内容として正しいものはどれか。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. 参加者は軍手とゴミ袋を自分で用意する必要がある</div>
                            <div class="option" data-value="2">2. 雨天でも予定通り実施する</div>
                            <div class="option" data-value="3">3. 参加希望者は事前に連絡が必要だ</div>
                            <div class="option" data-value="4">4. 清掃は午前8時から始まる</div>
                        </div>
                        <div class="explanation">「参加希望の方は10月10日までに町内会へご連絡ください」とあります。</div>
                    </div>
                </div>
            </div>

            <!-- P3: 親と子のコミュニケーション -->
            <div class="reading-layout" style="margin-top:24px;">
                <div class="passage-box">
                    親と子のコミュニケーションは、子供の成長に大きな影響を与える。子供が何かを話しかけてきたとき、スマートフォンから目を離して向き合うことが大切だ。子供の話をしっかり聞くことで、子供は「自分は大切にされている」と感じ、自己肯定感が育まれる。忙しい毎日の中でも、子供との会話の時間を意識的に作ることが必要だ。
                </div>
                <div class="reading-questions">
                    <div class="question" data-answer="2">
                        <div class="question-number">問3</div>
                        <div class="question-text">筆者が最も言いたいことは何か。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. 子供にスマートフォンを見せてはいけない</div>
                            <div class="option" data-value="2">2. 子供の話をしっかり聞くことで自己肯定感が育まれる</div>
                            <div class="option" data-value="3">3. 親は常に子供と一緒にいるべきだ</div>
                            <div class="option" data-value="4">4. 忙しい親は子育てができない</div>
                        </div>
                        <div class="explanation">「子供の話をしっかり聞くことで、子供は自己肯定感が育まれる」が主張です。</div>
                    </div>
                </div>
            </div>

            <!-- P4: 日本の祝日 -->
            <div class="reading-layout" style="margin-top:24px;">
                <div class="passage-box">
                    日本には年間16の祝日がある。これらの祝日には、それぞれ歴史的・文化的な意味がある。例えば、「文化の日」は11月3日で、文化や芸術を尊重することを目的としている。また、「体育の日」は現在「スポーツの日」と名称が変わり、10月の第2月曜日に設定されている。祝日は日本の文化や価値観を反映した大切な日だ。
                </div>
                <div class="reading-questions">
                    <div class="question" data-answer="1">
                        <div class="question-number">問4</div>
                        <div class="question-text">この文章の内容として正しいものはどれか。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. 「体育の日」は現在「スポーツの日」に名称が変わった</div>
                            <div class="option" data-value="2">2. 「文化の日」は10月3日だ</div>
                            <div class="option" data-value="3">3. 日本の祝日は年間20日ある</div>
                            <div class="option" data-value="4">4. 「スポーツの日」は毎年同じ日付に設定されている</div>
                        </div>
                        <div class="explanation">「体育の日は現在スポーツの日と名称が変わり」とあります。文化の日は11月3日、祝日は16日です。</div>
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
                    スマートフォンやパソコンなどのデジタル技術は、私たちの生活を大きく変えた。遠くに住む家族や友人とすぐに連絡が取れるようになり、世界中の情報に瞬時にアクセスできるようになった。<br><br>
                    しかし、デジタル技術の普及により、直接会って話す機会が減ったという声も多い。オンラインでのコミュニケーションは便利だが、表情や声のトーンなど、対面でしか伝わらない情報も多い。<br><br>
                    デジタルと対面のコミュニケーションをバランスよく組み合わせることが、より豊かな人間関係を築く鍵だと考えられている。
                </div>
                <div class="reading-questions">
                    <div class="question" data-answer="3">
                        <div class="question-number">問5</div>
                        <div class="question-text">デジタル技術の普及によるデメリットとして述べられているものはどれか。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. 世界中の情報にアクセスしにくくなった</div>
                            <div class="option" data-value="2">2. 家族や友人と連絡が取りにくくなった</div>
                            <div class="option" data-value="3">3. 直接会って話す機会が減った</div>
                            <div class="option" data-value="4">4. デジタル技術の使い方が難しくなった</div>
                        </div>
                        <div class="explanation">「直接会って話す機会が減ったという声も多い」とあります。</div>
                    </div>
                    <div class="question" data-answer="2">
                        <div class="question-number">問6</div>
                        <div class="question-text">オンラインコミュニケーションについて述べられていることは何か。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. 対面より優れている</div>
                            <div class="option" data-value="2">2. 便利だが表情や声のトーンなど伝わらない情報もある</div>
                            <div class="option" data-value="3">3. 全く使わない方がいい</div>
                            <div class="option" data-value="4">4. 対面と全く同じ情報が伝わる</div>
                        </div>
                        <div class="explanation">「オンラインでのコミュニケーションは便利だが、表情や声のトーンなど対面でしか伝わらない情報も多い」とあります。</div>
                    </div>
                    <div class="question" data-answer="4">
                        <div class="question-number">問7</div>
                        <div class="question-text">筆者はどのようなコミュニケーションを勧めているか。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. デジタルだけを使うこと</div>
                            <div class="option" data-value="2">2. 対面だけを使うこと</div>
                            <div class="option" data-value="3">3. デジタルをやめること</div>
                            <div class="option" data-value="4">4. デジタルと対面をバランスよく組み合わせること</div>
                        </div>
                        <div class="explanation">「デジタルと対面のコミュニケーションをバランスよく組み合わせることが鍵だ」とあります。</div>
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
                    人工知能（AI）の急速な発展は、社会のあらゆる分野に変化をもたらしている。医療の分野では、AIが病気の早期発見や治療法の提案に活用されており、医師の診断をサポートしている。<br><br>
                    教育の分野でも、AIを活用した個別学習システムが登場し、一人一人のペースや理解度に合わせた学習が可能になった。これにより、これまで画一的だった教育が変わりつつある。<br><br>
                    一方で、AIの普及に伴い、プライバシーの問題や雇用への影響など、新たな課題も生まれている。AIが人間の仕事を奪うという懸念も根強く残っている。<br><br>
                    しかし、AIはあくまでも人間を助けるためのツールだ。AIを上手に活用しながら、人間ならではの創造性や感情を大切にすることが、これからの社会に求められていると言えるだろう。
                </div>
                <div class="reading-questions">
                    <div class="question" data-answer="2">
                        <div class="question-number">問8</div>
                        <div class="question-text">医療分野でのAI活用として述べられているものはどれか。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. AIが医師の代わりに手術をする</div>
                            <div class="option" data-value="2">2. 病気の早期発見や治療法の提案に活用されている</div>
                            <div class="option" data-value="3">3. AIが患者の感情をケアする</div>
                            <div class="option" data-value="4">4. AIが薬を処方する</div>
                        </div>
                        <div class="explanation">「AIが病気の早期発見や治療法の提案に活用されており、医師の診断をサポートしている」とあります。</div>
                    </div>
                    <div class="question" data-answer="3">
                        <div class="question-number">問9</div>
                        <div class="question-text">AIの普及による課題として述べられていないものはどれか。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. プライバシーの問題</div>
                            <div class="option" data-value="2">2. 雇用への影響</div>
                            <div class="option" data-value="3">3. AIの開発コストが高い</div>
                            <div class="option" data-value="4">4. 人間の仕事を奪う懸念</div>
                        </div>
                        <div class="explanation">「AIの開発コストが高い」については述べられていません。</div>
                    </div>
                    <div class="question" data-answer="4">
                        <div class="question-number">問10</div>
                        <div class="question-text">筆者はAIについてどう述べているか。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. AIはすべての問題を解決できる</div>
                            <div class="option" data-value="2">2. AIは危険なので使わない方がいい</div>
                            <div class="option" data-value="3">3. AIは人間を超える存在だ</div>
                            <div class="option" data-value="4">4. AIを活用しながら人間の創造性や感情を大切にすることが重要だ</div>
                        </div>
                        <div class="explanation">「AIを上手に活用しながら、人間ならではの創造性や感情を大切にすることが求められている」とあります。</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 問題13: 情報検索 -->
        <div class="section-box">
            <div class="section-title">問題13 情報検索</div>
            <div class="section-desc">右のページは、資格試験の申し込み要領です。これを読んで、後の問いに答えなさい。</div>
            <div class="reading-layout">
                <div class="passage-box">
                    <strong>ビジネス日本語検定 申し込み要領</strong><br><br>
                    <strong>試験日程</strong><br>
                    ・1級：年2回（6月・12月）<br>
                    ・2級：年3回（3月・7月・11月）<br>
                    ・3級：年4回（3月・6月・9月・12月）<br><br>
                    <strong>受験料</strong><br>
                    ・1級：8,000円<br>
                    ・2級：6,000円<br>
                    ・3級：4,000円<br><br>
                    <strong>申し込み方法</strong><br>
                    ・オンラインまたは郵送にて受付<br>
                    ・申し込み締切：試験日の1ヶ月前<br>
                    ・合格発表：試験日から6週間後<br><br>
                    ※1・2級は記述式、3級はマークシート式<br>
                    ※受験料の返金は不可
                </div>
                <div class="reading-questions">
                    <div class="question" data-answer="2">
                        <div class="question-number">問11</div>
                        <div class="question-text">2級と3級の両方を受験する場合、受験料の合計はいくらか。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. 8,000円</div>
                            <div class="option" data-value="2">2. 10,000円</div>
                            <div class="option" data-value="3">3. 14,000円</div>
                            <div class="option" data-value="4">4. 6,000円</div>
                        </div>
                        <div class="explanation">2級6,000円＋3級4,000円＝10,000円です。</div>
                    </div>
                    <div class="question" data-answer="3">
                        <div class="question-number">問12</div>
                        <div class="question-text">3級を6月に受験したい場合、申し込みの締切はいつか。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. 5月1日</div>
                            <div class="option" data-value="2">2. 6月1日</div>
                            <div class="option" data-value="3">3. 5月中</div>
                            <div class="option" data-value="4">4. 4月中</div>
                        </div>
                        <div class="explanation">「試験日の1ヶ月前」が締切なので、6月の試験なら5月中が締切です。</div>
                    </div>
                    <div class="question" data-answer="4">
                        <div class="question-number">問13</div>
                        <div class="question-text">この試験について正しいものはどれか。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. 1級はマークシート式だ</div>
                            <div class="option" data-value="2">2. 受験料は返金可能だ</div>
                            <div class="option" data-value="3">3. 申し込みは郵送のみだ</div>
                            <div class="option" data-value="4">4. 合格発表は試験日から6週間後だ</div>
                        </div>
                        <div class="explanation">「合格発表：試験日から6週間後」とあります。1・2級は記述式、受験料返金不可、申し込みはオンラインまたは郵送です。</div>
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
