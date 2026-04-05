'use client'
import AccessCheck from '../../../AccessCheck'

export default function Page() {
  return (
    <>
      <AccessCheck level="N3" mockNum={2} />
      <div dangerouslySetInnerHTML={{ __html: `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JLPT N3 Reading - MOCK-02 | Nihon GO!</title>
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
        .section-box {
            background: #fff;
            border-radius: 12px;
            padding: 24px;
            margin-bottom: 20px;
            border: 1px solid #e5e7eb;
        }
        .section-title {
            font-size: 1.1em;
            font-weight: 600;
            margin-bottom: 12px;
            padding-bottom: 12px;
            border-bottom: 2px solid #06b6d4;
        }
        .section-desc { color: #666; font-size: 0.9em; margin-bottom: 20px; }
        .reading-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; align-items: start; margin-bottom: 24px; }
        .reading-layout:last-child { margin-bottom: 0; }
        .passage-box { background: #f8fafc; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; line-height: 2; position: sticky; top: 80px; font-size: 0.95rem; }
        .reading-questions { display: flex; flex-direction: column; gap: 16px; }
        @media (max-width: 768px) { .reading-layout { grid-template-columns: 1fr; } .passage-box { position: static; } }
        .info-table { width: 100%; border-collapse: collapse; font-size: 0.9rem; }
        .info-table th { background: #cffafe; padding: 10px 14px; text-align: left; font-weight: 600; border-bottom: 1px solid #e5e7eb; }
        .info-table td { padding: 10px 14px; border-bottom: 1px solid #e5e7eb; }
        .question {
            padding: 16px;
            background: #f9fafb;
            border-radius: 8px;
        }
        .question-number { font-weight: 700; color: #06b6d4; margin-bottom: 8px; font-size: 0.9rem; }
        .question-text { font-size: 1em; margin-bottom: 12px; }
        .options { display: grid; grid-template-columns: 1fr; gap: 8px; }
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
        <h1>JLPT N3 Mock Test 02 - 読解</h1>
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

            <!-- P1: 睡眠 -->
            <div class="reading-layout">
                <div class="passage-box">
                    現代人は睡眠不足になりやすいと言われている。スマートフォンを夜遅くまで見たり、仕事や勉強で夜更かしをしたりする人が増えているからだ。睡眠が不足すると、集中力が下がったり、免疫力が弱くなったりするため、毎日しっかり眠ることが健康のために重要だ。
                </div>
                <div class="reading-questions">
                    <div class="question" data-answer="3">
                        <div class="question-number">問1</div>
                        <div class="question-text">この文章の内容として最も適切なものはどれか。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. スマートフォンを使うことは体に良い</div>
                            <div class="option" data-value="2">2. 睡眠不足になっても仕事や勉強には影響しない</div>
                            <div class="option" data-value="3">3. 健康のために十分な睡眠をとることが大切だ</div>
                            <div class="option" data-value="4">4. 現代人は睡眠が多すぎて困っている</div>
                        </div>
                        <div class="explanation">「毎日しっかり眠ることが健康のために重要だ」と述べられています。</div>
                    </div>
                </div>
            </div>

            <!-- P2: 図書館のお知らせ -->
            <div class="reading-layout" style="margin-top:24px;">
                <div class="passage-box">
                    <strong>図書館利用者の皆様へ</strong><br><br>
                    システム更新のため、下記の期間、図書館の貸出サービスを停止いたします。<br><br>
                    停止期間：6月10日（月）〜6月12日（水）<br>
                    ※閲覧・自習室のご利用は通常通り可能です。<br>
                    ※返却は停止期間中もご利用いただけます。<br><br>
                    6月13日（木）より通常サービスを再開します。
                </div>
                <div class="reading-questions">
                    <div class="question" data-answer="2">
                        <div class="question-number">問2</div>
                        <div class="question-text">このお知らせの内容として正しいものはどれか。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. 6月10日から12日の間、図書館はすべて利用できない</div>
                            <div class="option" data-value="2">2. 停止期間中も本の返却はできる</div>
                            <div class="option" data-value="3">3. 自習室は6月13日から使える</div>
                            <div class="option" data-value="4">4. 貸出サービスは6月12日から再開する</div>
                        </div>
                        <div class="explanation">「返却は停止期間中もご利用いただけます」とあります。</div>
                    </div>
                </div>
            </div>

            <!-- P3: ゴミ出し -->
            <div class="reading-layout" style="margin-top:24px;">
                <div class="passage-box">
                    日本では、ゴミを種類ごとに分けて捨てることが義務づけられている地域が多い。燃えるゴミ、燃えないゴミ、資源ゴミなどに分類し、決められた日に出さなければならない。ルールを守らないと、ゴミを持ち帰ることになる場合もある。
                </div>
                <div class="reading-questions">
                    <div class="question" data-answer="4">
                        <div class="question-number">問3</div>
                        <div class="question-text">この文章で述べられていることとして正しいものはどれか。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. 日本では全国どこでもゴミの分別は不要だ</div>
                            <div class="option" data-value="2">2. ゴミはいつでも好きな日に出してよい</div>
                            <div class="option" data-value="3">3. 燃えないゴミと資源ゴミは同じ日に出す</div>
                            <div class="option" data-value="4">4. ルールを守らないとゴミを持ち帰らなければならないことがある</div>
                        </div>
                        <div class="explanation">「ルールを守らないと、ゴミを持ち帰ることになる場合もある」と書かれています。</div>
                    </div>
                </div>
            </div>

            <!-- P4: SNS -->
            <div class="reading-layout" style="margin-top:24px;">
                <div class="passage-box">
                    SNSのおかげで、遠くに住む友人や家族と気軽に連絡が取れるようになった。しかし、SNSを使いすぎると、直接会って話す機会が減ってしまうという問題もある。便利なツールも、使い方次第で人間関係に良くも悪くも影響する。
                </div>
                <div class="reading-questions">
                    <div class="question" data-answer="2">
                        <div class="question-number">問4</div>
                        <div class="question-text">筆者がSNSについて言いたいことは何か。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. SNSは使わないほうがいい</div>
                            <div class="option" data-value="2">2. SNSは使い方によって良い面も悪い面もある</div>
                            <div class="option" data-value="3">3. SNSは遠くの人と話すためだけに使うべきだ</div>
                            <div class="option" data-value="4">4. SNSを使えば直接会う必要がなくなる</div>
                        </div>
                        <div class="explanation">「使い方次第で人間関係に良くも悪くも影響する」と述べられています。</div>
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
                    私は大学に入るまで、ずっと同じ町に住んでいた。友達も多く、生活も安定していたので、その町を出ることを考えたことがなかった。しかし、大学進学を機に、初めて一人暮らしを始めた。<br><br>
                    最初の数ヶ月は、寂しくてたまらなかった。家族に会いたくて、毎週末帰省しようとしたこともある。しかし、徐々に新しい環境に慣れ、新しい友達もできた。今では、一人暮らしを通じて自立できたことが自分の成長につながったと感じている。
                </div>
                <div class="reading-questions">
                    <div class="question" data-answer="1">
                        <div class="question-number">問5</div>
                        <div class="question-text">筆者が一人暮らしを始めたのはいつか。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. 大学に進学したとき</div>
                            <div class="option" data-value="2">2. 就職したとき</div>
                            <div class="option" data-value="3">3. 友達が少なくなったとき</div>
                            <div class="option" data-value="4">4. 生活が不安定になったとき</div>
                        </div>
                        <div class="explanation">「大学進学を機に、初めて一人暮らしを始めた」とあります。</div>
                    </div>
                    <div class="question" data-answer="3">
                        <div class="question-number">問6</div>
                        <div class="question-text">一人暮らしを始めた最初の頃、筆者はどう感じたか。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. 自由で楽しかった</div>
                            <div class="option" data-value="2">2. 新しい友達がすぐできて充実していた</div>
                            <div class="option" data-value="3">3. 寂しくてつらかった</div>
                            <div class="option" data-value="4">4. 家族に会いたいとは思わなかった</div>
                        </div>
                        <div class="explanation">「最初の数ヶ月は、寂しくてたまらなかった」とあります。</div>
                    </div>
                    <div class="question" data-answer="4">
                        <div class="question-number">問7</div>
                        <div class="question-text">筆者は一人暮らしについて今どう思っているか。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. 一人暮らしはつらいだけだったと思っている</div>
                            <div class="option" data-value="2">2. 一人暮らしをやめて実家に戻りたいと思っている</div>
                            <div class="option" data-value="3">3. 一人暮らしをしなければよかったと後悔している</div>
                            <div class="option" data-value="4">4. 一人暮らしで自立できたことが自分の成長につながったと感じている</div>
                        </div>
                        <div class="explanation">「一人暮らしを通じて自立できたことが自分の成長につながったと感じている」とあります。</div>
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
                    「シェアリングエコノミー」という言葉を聞いたことがあるだろうか。これは、個人が持っているモノやスペース、スキルなどを、インターネットを通じて他の人と共有するしくみのことだ。代表的なサービスとして、個人の家を宿泊場所として貸し出す「民泊」や、一般のドライバーが乗客を運ぶ「ライドシェア」などがある。<br><br>
                    このしくみには多くのメリットがある。まず、使っていないものを収入に変えることができる。また、利用する側にとっては、ホテルや従来のタクシーより安く済む場合が多い。さらに、物をシェアすることで、環境への負担を減らすことにもつながる。<br><br>
                    一方で、課題もある。品質の保証が難しく、トラブルが起きたときの責任の所在が不明確になりやすいという問題がある。また、既存の業者との競争が激しくなり、社会的な摩擦が生じることもある。<br><br>
                    シェアリングエコノミーはまだ発展途上の分野だが、社会のあり方を変える可能性を持っている。ルールを整備しながら、うまく活用していくことが求められている。
                </div>
                <div class="reading-questions">
                    <div class="question" data-answer="2">
                        <div class="question-number">問8</div>
                        <div class="question-text">「シェアリングエコノミー」とはどのようなものか。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. 企業が大量に商品を生産して売るしくみ</div>
                            <div class="option" data-value="2">2. 個人がモノやスキルなどをインターネットを通じて共有するしくみ</div>
                            <div class="option" data-value="3">3. 政府が資源を管理して国民に配るしくみ</div>
                            <div class="option" data-value="4">4. 銀行が資産を運用するしくみ</div>
                        </div>
                        <div class="explanation">「個人が持っているモノやスペース、スキルなどを、インターネットを通じて他の人と共有するしくみ」と書かれています。</div>
                    </div>
                    <div class="question" data-answer="3">
                        <div class="question-number">問9</div>
                        <div class="question-text">シェアリングエコノミーのメリットとして述べられていないものはどれか。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. 使っていないものを収入にできる</div>
                            <div class="option" data-value="2">2. 利用者がホテルより安く済む場合がある</div>
                            <div class="option" data-value="3">3. トラブルが起きたときの責任が明確だ</div>
                            <div class="option" data-value="4">4. 環境への負担を減らすことができる</div>
                        </div>
                        <div class="explanation">「責任の所在が不明確になりやすい」と課題として述べられており、メリットではありません。</div>
                    </div>
                    <div class="question" data-answer="4">
                        <div class="question-number">問10</div>
                        <div class="question-text">筆者はシェアリングエコノミーについてどう述べているか。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. すぐに禁止するべきだ</div>
                            <div class="option" data-value="2">2. メリットがないので利用すべきでない</div>
                            <div class="option" data-value="3">3. 既存の業者を守るために規制すべきだ</div>
                            <div class="option" data-value="4">4. ルールを整えながらうまく活用していくことが求められる</div>
                        </div>
                        <div class="explanation">「ルールを整備しながら、うまく活用していくことが求められている」とあります。</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 問題13: 情報検索 -->
        <div class="section-box">
            <div class="section-title">問題13 情報検索</div>
            <div class="section-desc">右のページは、料理教室のお知らせです。これを読んで、後の問いに答えなさい。</div>
            <div class="reading-layout">
                <div class="passage-box">
                    <strong>日本料理体験教室 参加者募集</strong><br><br>
                    内容：寿司・天ぷら・味噌汁の作り方を学ぶ<br>
                    対象：18歳以上の方（日本語・英語で対応可能）<br>
                    定員：各回10名<br>
                    参加費：5,000円（材料費込み）<br>
                    日程：<br>
                    &nbsp;&nbsp;Aコース：毎月第1土曜日 10:00〜12:30<br>
                    &nbsp;&nbsp;Bコース：毎月第3日曜日 14:00〜16:30<br><br>
                    ※申込はメールのみ受付。電話・窓口での受付は不可。<br>
                    ※キャンセルは3日前までにご連絡ください。<br>
                    ※持ち物：エプロン・タオル
                </div>
                <div class="reading-questions">
                    <div class="question" data-answer="1">
                        <div class="question-number">問11</div>
                        <div class="question-text">この料理教室に参加するにはどうすればよいか。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. メールで申し込む</div>
                            <div class="option" data-value="2">2. 電話で申し込む</div>
                            <div class="option" data-value="3">3. 窓口に直接行く</div>
                            <div class="option" data-value="4">4. Webサイトから申し込む</div>
                        </div>
                        <div class="explanation">「申込はメールのみ受付。電話・窓口での受付は不可」とあります。</div>
                    </div>
                    <div class="question" data-answer="3">
                        <div class="question-number">問12</div>
                        <div class="question-text">Bコースに参加する場合、何時に終わるか。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. 12:30</div>
                            <div class="option" data-value="2">2. 14:00</div>
                            <div class="option" data-value="3">3. 16:30</div>
                            <div class="option" data-value="4">4. 17:00</div>
                        </div>
                        <div class="explanation">Bコースは「14:00〜16:30」とあります。</div>
                    </div>
                    <div class="question" data-answer="2">
                        <div class="question-number">問13</div>
                        <div class="question-text">この教室について正しいものはどれか。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. 参加費に材料費は含まれない</div>
                            <div class="option" data-value="2">2. エプロンとタオルを持参する必要がある</div>
                            <div class="option" data-value="3">3. 17歳でも参加できる</div>
                            <div class="option" data-value="4">4. 日本語のみで対応している</div>
                        </div>
                        <div class="explanation">「持ち物：エプロン・タオル」とあります。参加費は材料費込みで、対象は18歳以上です。</div>
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
