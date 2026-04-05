'use client'
import AccessCheck from '../../../../AccessCheck'

export default function Page() {
  return (
    <>
      <AccessCheck level="N3" mockNum={9} />
      <div dangerouslySetInnerHTML={{ __html: `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JLPT N3 Reading - MOCK-09 | Nihon GO!</title>
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
        <h1>JLPT N3 Mock Test 09 - 読解</h1>
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

            <!-- P1: 運動と脳 -->
            <div class="reading-layout">
                <div class="passage-box">
                    運動は体だけでなく、脳にもよい影響を与えることが研究でわかってきた。特に有酸素運動は、脳の血流を増やし、集中力や記憶力の向上に役立つとされている。また、運動をすることでストレスが解消され、気分がよくなる効果もある。忙しい毎日の中でも、少しの時間を運動に使うことが、心身の健康につながる。
                </div>
                <div class="reading-questions">
                    <div class="question" data-answer="3">
                        <div class="question-number">問1</div>
                        <div class="question-text">この文章の内容として正しいものはどれか。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. 運動は体にはいいが、脳には悪影響がある</div>
                            <div class="option" data-value="2">2. 有酸素運動だけが健康に効果的だ</div>
                            <div class="option" data-value="3">3. 運動は集中力や記憶力の向上だけでなくストレス解消にも役立つ</div>
                            <div class="option" data-value="4">4. 運動は毎日長時間しなければ効果がない</div>
                        </div>
                        <div class="explanation">「集中力や記憶力の向上」と「ストレスが解消され気分がよくなる」の両方が述べられています。</div>
                    </div>
                </div>
            </div>

            <!-- P2: 図書館イベント -->
            <div class="reading-layout" style="margin-top:24px;">
                <div class="passage-box">
                    <strong>図書館イベントのお知らせ</strong><br><br>
                    来月、市立図書館にて以下のイベントを開催します。<br><br>
                    ・読み聞かせ会：毎週土曜日 10:00〜11:00（対象：3〜6歳）<br>
                    ・読書感想文講座：8月10日（土）14:00〜16:00（対象：小学生）<br>
                    ・大人の読書会：8月24日（土）13:00〜15:00（対象：18歳以上）<br><br>
                    ※参加無料、事前申込不要<br>
                    ※定員になり次第締め切り
                </div>
                <div class="reading-questions">
                    <div class="question" data-answer="2">
                        <div class="question-number">問2</div>
                        <div class="question-text">このお知らせの内容として正しいものはどれか。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. 読み聞かせ会は事前申込が必要だ</div>
                            <div class="option" data-value="2">2. すべてのイベントは参加無料だ</div>
                            <div class="option" data-value="3">3. 大人の読書会は小学生も参加できる</div>
                            <div class="option" data-value="4">4. 読書感想文講座は毎週開催される</div>
                        </div>
                        <div class="explanation">「参加無料、事前申込不要」とあります。</div>
                    </div>
                </div>
            </div>

            <!-- P3: 方言の魅力 -->
            <div class="reading-layout" style="margin-top:24px;">
                <div class="passage-box">
                    日本各地には様々な方言がある。方言は単なる言葉の違いではなく、その地域の文化や歴史を反映したものだ。近年、標準語の普及により方言を話す人が減ってきているが、方言には独特の温かみや表現力があり、地域のアイデンティティを守る大切なものだと再評価されている。方言を大切にすることは、地域の文化を守ることにつながる。
                </div>
                <div class="reading-questions">
                    <div class="question" data-answer="4">
                        <div class="question-number">問3</div>
                        <div class="question-text">筆者が方言について最も言いたいことは何か。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. 方言は標準語に変えるべきだ</div>
                            <div class="option" data-value="2">2. 方言は日本中で同じだ</div>
                            <div class="option" data-value="3">3. 方言を話す人が増えている</div>
                            <div class="option" data-value="4">4. 方言は地域の文化を守る大切なものだ</div>
                        </div>
                        <div class="explanation">「方言を大切にすることは、地域の文化を守ることにつながる」が主張です。</div>
                    </div>
                </div>
            </div>

            <!-- P4: 節約と幸福感 -->
            <div class="reading-layout" style="margin-top:24px;">
                <div class="passage-box">
                    節約をすることは、将来への備えとして重要だ。しかし、節約しすぎると日々の生活が窮屈になり、かえってストレスが増えることもある。大切なのは、必要なものにはお金を使い、不要なものには使わないという意識だ。賢い消費者になることで、節約と生活の質を両立させることができる。
                </div>
                <div class="reading-questions">
                    <div class="question" data-answer="1">
                        <div class="question-number">問4</div>
                        <div class="question-text">この文章の内容として正しいものはどれか。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. 節約しすぎるとストレスが増えることもある</div>
                            <div class="option" data-value="2">2. お金は一切使わないことが大切だ</div>
                            <div class="option" data-value="3">3. 節約と生活の質を両立させることは不可能だ</div>
                            <div class="option" data-value="4">4. 節約は将来への備えとして不要だ</div>
                        </div>
                        <div class="explanation">「節約しすぎると日々の生活が窮屈になり、かえってストレスが増えることもある」とあります。</div>
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
                    私が住む町では、毎月第一日曜日に地域の清掃活動が行われている。最初はあまり参加者が多くなかったが、町内会の呼びかけや、SNSでの告知により、最近は毎回50人以上が集まるようになった。<br><br>
                    この活動を通じて、参加者同士の交流が生まれ、地域のつながりが強まっている。顔を知らなかった近所の人と話せるようになったという声も多い。<br><br>
                    地域コミュニティを活性化するには、こうした小さな活動の積み重ねが大切だと感じている。
                </div>
                <div class="reading-questions">
                    <div class="question" data-answer="2">
                        <div class="question-number">問5</div>
                        <div class="question-text">清掃活動の参加者が増えたきっかけは何か。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. 市役所からの命令があったから</div>
                            <div class="option" data-value="2">2. 町内会の呼びかけやSNSでの告知があったから</div>
                            <div class="option" data-value="3">3. 参加者に賞金が出るようになったから</div>
                            <div class="option" data-value="4">4. 清掃活動が法律で義務化されたから</div>
                        </div>
                        <div class="explanation">「町内会の呼びかけや、SNSでの告知により」参加者が増えたとあります。</div>
                    </div>
                    <div class="question" data-answer="3">
                        <div class="question-number">問6</div>
                        <div class="question-text">清掃活動を通じて生まれた効果は何か。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. 町がきれいになっただけだ</div>
                            <div class="option" data-value="2">2. 参加者が毎回減っている</div>
                            <div class="option" data-value="3">3. 参加者同士の交流が生まれ、地域のつながりが強まった</div>
                            <div class="option" data-value="4">4. 近所の人との仲が悪くなった</div>
                        </div>
                        <div class="explanation">「参加者同士の交流が生まれ、地域のつながりが強まっている」とあります。</div>
                    </div>
                    <div class="question" data-answer="4">
                        <div class="question-number">問7</div>
                        <div class="question-text">筆者は地域コミュニティの活性化についてどう考えているか。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. 大きなイベントだけが効果的だ</div>
                            <div class="option" data-value="2">2. 政府だけが解決できる問題だ</div>
                            <div class="option" data-value="3">3. 地域コミュニティの活性化は不可能だ</div>
                            <div class="option" data-value="4">4. 小さな活動の積み重ねが大切だ</div>
                        </div>
                        <div class="explanation">「小さな活動の積み重ねが大切だと感じている」とあります。</div>
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
                    日本はかつて単一民族国家と言われていたが、近年は外国人労働者や留学生の増加により、多様な文化的背景を持つ人々が共に暮らす「多文化共生社会」へと変化しつつある。<br><br>
                    多文化共生を実現するためには、言語の壁を越えることが重要だ。自治体の窓口や医療機関での多言語対応、日本語教育の充実などが進められている。<br><br>
                    しかし、言語だけでなく、文化や習慣の違いから生じる誤解や摩擦も課題となっている。互いの文化を尊重し、理解しようとする姿勢が求められる。<br><br>
                    多文化共生は、外国人だけの問題ではない。日本人も含めた社会全体が、多様性を受け入れ、共に豊かな社会を築いていくことが大切だ。
                </div>
                <div class="reading-questions">
                    <div class="question" data-answer="2">
                        <div class="question-number">問8</div>
                        <div class="question-text">多文化共生を実現するための取り組みとして述べられているものはどれか。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. 外国人の入国を制限する</div>
                            <div class="option" data-value="2">2. 自治体窓口での多言語対応や日本語教育の充実</div>
                            <div class="option" data-value="3">3. 外国人を特定の地域に集める</div>
                            <div class="option" data-value="4">4. 日本語だけで対応する</div>
                        </div>
                        <div class="explanation">「自治体の窓口や医療機関での多言語対応、日本語教育の充実」とあります。</div>
                    </div>
                    <div class="question" data-answer="3">
                        <div class="question-number">問9</div>
                        <div class="question-text">多文化共生の課題として述べられていないものはどれか。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. 言語の壁</div>
                            <div class="option" data-value="2">2. 文化や習慣の違いから生じる誤解や摩擦</div>
                            <div class="option" data-value="3">3. 外国人の数が少なすぎること</div>
                            <div class="option" data-value="4">4. 互いの文化を理解することの難しさ</div>
                        </div>
                        <div class="explanation">「外国人の数が少なすぎること」については述べられていません。</div>
                    </div>
                    <div class="question" data-answer="4">
                        <div class="question-number">問10</div>
                        <div class="question-text">筆者は多文化共生についてどう述べているか。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. 外国人だけが努力すべき問題だ</div>
                            <div class="option" data-value="2">2. 日本人は関係ない問題だ</div>
                            <div class="option" data-value="3">3. 多文化共生は不可能だ</div>
                            <div class="option" data-value="4">4. 社会全体が多様性を受け入れ共に豊かな社会を築くことが大切だ</div>
                        </div>
                        <div class="explanation">「日本人も含めた社会全体が、多様性を受け入れ、共に豊かな社会を築いていくことが大切だ」とあります。</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 問題13: 情報検索 -->
        <div class="section-box">
            <div class="section-title">問題13 情報検索</div>
            <div class="section-desc">右のページは、ホームステイ受け入れ家庭の条件です。これを読んで、後の問いに答えなさい。</div>
            <div class="reading-layout">
                <div class="passage-box">
                    <strong>ホームステイ受け入れ家庭 募集要項</strong><br><br>
                    <strong>受け入れ条件</strong><br>
                    ・家族構成：2名以上の家族<br>
                    ・専用個室の提供（6畳以上）<br>
                    ・食事の提供（朝・夕2食）<br>
                    ・受け入れ期間：最低2週間〜<br><br>
                    <strong>謝礼金</strong><br>
                    ・1日あたり3,500円<br>
                    ・食費・光熱費は別途支給<br><br>
                    <strong>対象学生</strong><br>
                    ・18歳〜30歳の外国人留学生<br>
                    ・日本語基礎レベル以上<br>
                    ・ペットアレルギーなしの方優先<br><br>
                    ※1人暮らしの方はお受けできません<br>
                    ※詳細はお問い合わせください
                </div>
                <div class="reading-questions">
                    <div class="question" data-answer="3">
                        <div class="question-number">問11</div>
                        <div class="question-text">ホームステイを受け入れられない家庭はどれか。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. 夫婦2人暮らしで6畳の個室がある家庭</div>
                            <div class="option" data-value="2">2. 3人家族で朝夕の食事が提供できる家庭</div>
                            <div class="option" data-value="3">3. 1人暮らしで広い部屋がある家庭</div>
                            <div class="option" data-value="4">4. 4人家族でペットを飼っている家庭</div>
                        </div>
                        <div class="explanation">「1人暮らしの方はお受けできません」とあります。</div>
                    </div>
                    <div class="question" data-answer="2">
                        <div class="question-number">問12</div>
                        <div class="question-text">2週間受け入れた場合の謝礼金はいくらか。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. 35,000円</div>
                            <div class="option" data-value="2">2. 49,000円</div>
                            <div class="option" data-value="3">3. 42,000円</div>
                            <div class="option" data-value="4">4. 70,000円</div>
                        </div>
                        <div class="explanation">1日3,500円×14日＝49,000円です。</div>
                    </div>
                    <div class="question" data-answer="4">
                        <div class="question-number">問13</div>
                        <div class="question-text">この募集要項について正しいものはどれか。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. 食費・光熱費は謝礼金に含まれている</div>
                            <div class="option" data-value="2">2. 受け入れ期間は最長2週間だ</div>
                            <div class="option" data-value="3">3. 対象学生は日本語が話せなくてもよい</div>
                            <div class="option" data-value="4">4. 食事は朝と夕の2食を提供する</div>
                        </div>
                        <div class="explanation">「食事の提供（朝・夕2食）」とあります。食費・光熱費は別途支給、受け入れ期間は最低2週間からです。</div>
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
