'use client'
import AccessCheck from '../../../AccessCheck'

export default function Page() {
  return (
    <>
      <AccessCheck level="N3" mockNum={5} />
      <div dangerouslySetInnerHTML={{ __html: `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JLPT N3 Reading - MOCK-05 | Nihon GO!</title>
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
        .info-table { width: 100%; border-collapse: collapse; font-size: 0.9rem; }
        .info-table th { background: #cffafe; padding: 10px 14px; text-align: left; font-weight: 600; border-bottom: 1px solid #e5e7eb; }
        .info-table td { padding: 10px 14px; border-bottom: 1px solid #e5e7eb; }
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
        <h1>JLPT N3 Mock Test 05 - 読解</h1>
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

            <!-- P1: コーヒーと健康 -->
            <div class="reading-layout">
                <div class="passage-box">
                    コーヒーは世界中で広く飲まれている飲み物だ。近年の研究では、適度なコーヒーの摂取が、糖尿病や心臓病のリスクを下げる効果があるとも言われている。しかし、飲みすぎると睡眠の質が下がったり、胃に負担がかかったりすることもある。健康のためには、一日2〜3杯程度にとどめることが望ましい。
                </div>
                <div class="reading-questions">
                    <div class="question" data-answer="2">
                        <div class="question-number">問1</div>
                        <div class="question-text">この文章の内容として最も適切なものはどれか。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. コーヒーは健康に悪いので飲まないほうがいい</div>
                            <div class="option" data-value="2">2. コーヒーは適量なら健康によい効果があるが、飲みすぎは注意が必要だ</div>
                            <div class="option" data-value="3">3. コーヒーを飲むと必ず糖尿病が治る</div>
                            <div class="option" data-value="4">4. コーヒーは一日5杯以上飲むべきだ</div>
                        </div>
                        <div class="explanation">「適度な摂取」が健康によいとされる一方、「飲みすぎ」の注意も述べられており、2が最も適切です。</div>
                    </div>
                </div>
            </div>

            <!-- P2: イベント中止のお知らせ -->
            <div class="reading-layout" style="margin-top:24px;">
                <div class="passage-box">
                    <strong>夏祭りイベント中止のお知らせ</strong><br><br>
                    台風接近のため、8月15日（土）に予定しておりました夏祭りを中止することになりました。<br><br>
                    なお、8月22日（土）に振替イベントを開催する予定です。詳細は改めてお知らせします。<br><br>
                    ※購入済みのチケットは全額返金いたします。返金方法については、お問い合わせください。
                </div>
                <div class="reading-questions">
                    <div class="question" data-answer="3">
                        <div class="question-number">問2</div>
                        <div class="question-text">このお知らせの内容として正しいものはどれか。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. 夏祭りは8月22日に予定通り開催される</div>
                            <div class="option" data-value="2">2. チケットの返金はされない</div>
                            <div class="option" data-value="3">3. 購入済みのチケットは全額返金される</div>
                            <div class="option" data-value="4">4. 振替イベントの日程はまだ決まっていない</div>
                        </div>
                        <div class="explanation">「購入済みのチケットは全額返金いたします」とあります。8月22日は振替イベントです。</div>
                    </div>
                </div>
            </div>

            <!-- P3: 時間の使い方 -->
            <div class="reading-layout" style="margin-top:24px;">
                <div class="passage-box">
                    忙しい現代人にとって、時間の管理は重要な課題だ。やるべきことを書き出し、優先順位をつけることで、効率よく仕事を進めることができる。また、集中できる時間帯を把握して、重要な作業はその時間に行うことも効果的だ。小さな時間の積み重ねが、大きな成果につながる。
                </div>
                <div class="reading-questions">
                    <div class="question" data-answer="4">
                        <div class="question-number">問3</div>
                        <div class="question-text">この文章で述べられていることとして正しいものはどれか。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. 忙しい人は時間管理をする必要がない</div>
                            <div class="option" data-value="2">2. 仕事はいつでも同じ効率でできる</div>
                            <div class="option" data-value="3">3. やるべきことは頭の中だけで管理すればいい</div>
                            <div class="option" data-value="4">4. 優先順位をつけたり集中できる時間を活用したりすることが効果的だ</div>
                        </div>
                        <div class="explanation">「優先順位をつける」「集中できる時間帯を把握する」の両方が述べられており、4が正しいです。</div>
                    </div>
                </div>
            </div>

            <!-- P4: ペット禁止マンション -->
            <div class="reading-layout" style="margin-top:24px;">
                <div class="passage-box">
                    <strong>掲示板</strong><br><br>
                    このマンションはペット飼育禁止です。<br>
                    最近、館内でペットを連れている方が増えております。<br><br>
                    ・犬・猫などの動物の飼育は一切禁止です<br>
                    ・来客のペット同伴も禁止です<br>
                    ・違反が確認された場合、退去をお願いする場合があります<br><br>
                    ご理解とご協力をお願いいたします。<br>
                    管理組合
                </div>
                <div class="reading-questions">
                    <div class="question" data-answer="1">
                        <div class="question-number">問4</div>
                        <div class="question-text">この張り紙の内容として正しいものはどれか。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. 来客がペットを連れてくることも禁止されている</div>
                            <div class="option" data-value="2">2. 小型の犬ならば飼育が許可されている</div>
                            <div class="option" data-value="3">3. ペットを飼っても退去させられることはない</div>
                            <div class="option" data-value="4">4. 猫だけ飼育が認められている</div>
                        </div>
                        <div class="explanation">「来客のペット同伴も禁止」とあります。</div>
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
                    私は大学2年生のとき、1年間カナダに留学した。英語はある程度できると思っていたが、現地では思ったより通じず、最初の数ヶ月はとても苦労した。<br><br>
                    しかし、現地の友人ができてからは状況が変わった。毎日英語で話す機会が増え、半年後には日常会話にそれほど困らなくなった。留学を終えて日本に戻ったとき、英語だけでなく、異なる文化や考え方を受け入れる力も身についたと感じた。<br><br>
                    留学は簡単ではないが、自分を大きく成長させてくれる経験だと思う。
                </div>
                <div class="reading-questions">
                    <div class="question" data-answer="2">
                        <div class="question-number">問5</div>
                        <div class="question-text">筆者が留学して最初に感じたことは何か。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. 英語がすぐに上手くなった</div>
                            <div class="option" data-value="2">2. 英語が思ったより通じなくて苦労した</div>
                            <div class="option" data-value="3">3. すぐに友人ができて楽しかった</div>
                            <div class="option" data-value="4">4. 英語の勉強が簡単だった</div>
                        </div>
                        <div class="explanation">「現地では思ったより通じず、最初の数ヶ月はとても苦労した」とあります。</div>
                    </div>
                    <div class="question" data-answer="3">
                        <div class="question-number">問6</div>
                        <div class="question-text">留学中に状況が変わったきっかけは何か。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. 日本語の勉強をやめたこと</div>
                            <div class="option" data-value="2">2. 英語の授業をたくさん受けたこと</div>
                            <div class="option" data-value="3">3. 現地の友人ができたこと</div>
                            <div class="option" data-value="4">4. 日本から家族が来たこと</div>
                        </div>
                        <div class="explanation">「現地の友人ができてからは状況が変わった」とあります。</div>
                    </div>
                    <div class="question" data-answer="4">
                        <div class="question-number">問7</div>
                        <div class="question-text">筆者は留学についてどう思っているか。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. 留学は時間の無駄だと思っている</div>
                            <div class="option" data-value="2">2. 英語力だけが留学の成果だと思っている</div>
                            <div class="option" data-value="3">3. 留学は簡単で誰でも成功できると思っている</div>
                            <div class="option" data-value="4">4. 留学は大変だが自分を成長させてくれる経験だと思っている</div>
                        </div>
                        <div class="explanation">「留学は簡単ではないが、自分を大きく成長させてくれる経験だと思う」とあります。</div>
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
                    日本では近年、少子化が深刻な社会問題になっている。出生率が低下し続けており、将来の労働力不足や社会保障制度の維持が懸念されている。<br><br>
                    少子化の原因として、まず経済的な問題が挙げられる。子育てにかかる費用が高く、特に教育費の負担が大きいと感じる親が多い。次に、働き方の問題もある。長時間労働が当たり前の職場では、育児と仕事を両立させることが難しい。<br><br>
                    政府はこの問題に対応するため、子育て支援の拡充や、保育所の整備を進めている。また、男性の育児休暇の取得を促進する取り組みも行われている。<br><br>
                    しかし、専門家の間では、これらの対策だけでは不十分だという意見もある。根本的な解決には、社会全体の意識改革が必要だという指摘もある。少子化問題は、個人の問題ではなく、社会全体で取り組むべき課題なのかもしれない。
                </div>
                <div class="reading-questions">
                    <div class="question" data-answer="3">
                        <div class="question-number">問8</div>
                        <div class="question-text">少子化の原因として挙げられていないものはどれか。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. 子育てにかかる費用が高い</div>
                            <div class="option" data-value="2">2. 長時間労働で育児と仕事の両立が難しい</div>
                            <div class="option" data-value="3">3. 保育所が多すぎる</div>
                            <div class="option" data-value="4">4. 教育費の負担が大きい</div>
                        </div>
                        <div class="explanation">「保育所の整備を進めている」とあり、保育所が多すぎるとは述べられていません。3が挙げられていないものです。</div>
                    </div>
                    <div class="question" data-answer="1">
                        <div class="question-number">問9</div>
                        <div class="question-text">政府の取り組みとして述べられているものはどれか。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. 男性の育児休暇の取得を促進している</div>
                            <div class="option" data-value="2">2. 子育て費用を全額負担している</div>
                            <div class="option" data-value="3">3. 長時間労働を義務付けている</div>
                            <div class="option" data-value="4">4. 出生率を下げる政策を実施している</div>
                        </div>
                        <div class="explanation">「男性の育児休暇の取得を促進する取り組みも行われている」とあります。</div>
                    </div>
                    <div class="question" data-answer="4">
                        <div class="question-number">問10</div>
                        <div class="question-text">筆者は少子化問題についてどう述べているか。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. 政府の対策だけで解決できる</div>
                            <div class="option" data-value="2">2. 個人が努力すれば解決できる</div>
                            <div class="option" data-value="3">3. 少子化は問題ではない</div>
                            <div class="option" data-value="4">4. 社会全体で取り組むべき課題かもしれない</div>
                        </div>
                        <div class="explanation">「少子化問題は、個人の問題ではなく、社会全体で取り組むべき課題なのかもしれない」とあります。</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 問題13: 情報検索 -->
        <div class="section-box">
            <div class="section-title">問題13 情報検索</div>
            <div class="section-desc">右のページは、アルバイト求人のお知らせです。これを読んで、後の問いに答えなさい。</div>
            <div class="reading-layout">
                <div class="passage-box">
                    <strong>カフェスタッフ募集</strong><br><br>
                    仕事内容：接客・ドリンク作り・レジ操作<br>
                    勤務地：渋谷店・新宿店（希望勤務地を申告可）<br>
                    時給：1,100円〜（経験者は1,300円〜）<br>
                    勤務時間：<br>
                    &nbsp;&nbsp;早番：7:00〜13:00<br>
                    &nbsp;&nbsp;遅番：13:00〜20:00<br>
                    週2日〜OK・1日4時間〜OK<br><br>
                    応募資格：<br>
                    ・18歳以上（高校生不可）<br>
                    ・週2日以上勤務できる方<br>
                    ・接客経験者歓迎（未経験可）<br><br>
                    ※交通費全額支給<br>
                    ※制服貸与<br>
                    ※応募はWebフォームのみ
                </div>
                <div class="reading-questions">
                    <div class="question" data-answer="2">
                        <div class="question-number">問11</div>
                        <div class="question-text">このアルバイトに応募できるのはどのような人か。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. 高校3年生で18歳の人</div>
                            <div class="option" data-value="2">2. 20歳の大学生で週3日働ける人</div>
                            <div class="option" data-value="3">3. 17歳で接客経験がある人</div>
                            <div class="option" data-value="4">4. 18歳以上で週1日しか働けない人</div>
                        </div>
                        <div class="explanation">「18歳以上（高校生不可）」「週2日以上」という条件から、20歳の大学生で週3日働ける人が該当します。</div>
                    </div>
                    <div class="question" data-answer="3">
                        <div class="question-number">問12</div>
                        <div class="question-text">遅番で働いた場合、最初の時給はいくらか。ただし、接客経験はないものとする。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. 900円</div>
                            <div class="option" data-value="2">2. 1,000円</div>
                            <div class="option" data-value="3">3. 1,100円</div>
                            <div class="option" data-value="4">4. 1,300円</div>
                        </div>
                        <div class="explanation">未経験の場合、時給は「1,100円〜」です。経験者は1,300円〜となります。</div>
                    </div>
                    <div class="question" data-answer="4">
                        <div class="question-number">問13</div>
                        <div class="question-text">このアルバイトについて正しいものはどれか。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. 電話で応募することができる</div>
                            <div class="option" data-value="2">2. 制服は自分で用意しなければならない</div>
                            <div class="option" data-value="3">3. 勤務地は本社が決める</div>
                            <div class="option" data-value="4">4. 交通費は全額支給される</div>
                        </div>
                        <div class="explanation">「交通費全額支給」とあります。応募はWebフォームのみで、制服は貸与（会社が用意）です。</div>
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
