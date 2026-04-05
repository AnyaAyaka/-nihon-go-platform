'use client'
import AccessCheck from '../../../../AccessCheck'

export default function Page() {
  return (
    <>
      <AccessCheck level="N3" mockNum={6} />
      <div dangerouslySetInnerHTML={{ __html: `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JLPT N3 Reading - MOCK-06 | Nihon GO!</title>
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
        <h1>JLPT N3 Mock Test 06 - 読解</h1>
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

            <!-- P1: ストレス解消法 -->
            <div class="reading-layout">
                <div class="passage-box">
                    現代人にとってストレス解消は重要な課題だ。運動、趣味、睡眠など、様々な方法があるが、人によって効果は異なる。大切なのは、自分に合った方法を見つけることだ。無理に他人と同じ方法をとる必要はなく、自分がリラックスできる方法を継続することが最も効果的だと言われている。
                </div>
                <div class="reading-questions">
                    <div class="question" data-answer="3">
                        <div class="question-number">問1</div>
                        <div class="question-text">この文章で筆者が最も言いたいことは何か。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. 運動がストレス解消に最も効果的だ</div>
                            <div class="option" data-value="2">2. 他人と同じ方法でストレスを解消すべきだ</div>
                            <div class="option" data-value="3">3. 自分に合ったストレス解消法を継続することが大切だ</div>
                            <div class="option" data-value="4">4. ストレスは解消できないものだ</div>
                        </div>
                        <div class="explanation">「自分に合った方法を見つけること」「自分がリラックスできる方法を継続することが最も効果的」が主張です。</div>
                    </div>
                </div>
            </div>

            <!-- P2: 道路工事のお知らせ -->
            <div class="reading-layout" style="margin-top:24px;">
                <div class="passage-box">
                    <strong>道路工事のお知らせ</strong><br><br>
                    下記の期間、道路工事のため交通規制を実施いたします。<br><br>
                    工事期間：11月1日（月）〜11月15日（金）<br>
                    規制区間：駅前通り〜市役所前<br>
                    規制内容：片側交互通行（通行可能）<br><br>
                    ※歩行者の通行は可能です。<br>
                    ※緊急車両の通行は妨げません。<br>
                    ※工事期間中は迂回路をご利用ください。<br><br>
                    ご不便をおかけして申し訳ございません。
                </div>
                <div class="reading-questions">
                    <div class="question" data-answer="2">
                        <div class="question-number">問2</div>
                        <div class="question-text">このお知らせの内容として正しいものはどれか。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. 工事期間中は車も歩行者も通行できない</div>
                            <div class="option" data-value="2">2. 歩行者は工事期間中も通行できる</div>
                            <div class="option" data-value="3">3. 緊急車両も通行できない</div>
                            <div class="option" data-value="4">4. 工事は11月15日以降も続く</div>
                        </div>
                        <div class="explanation">「歩行者の通行は可能です」とあります。</div>
                    </div>
                </div>
            </div>

            <!-- P3: 外国語学習の効果 -->
            <div class="reading-layout" style="margin-top:24px;">
                <div class="passage-box">
                    外国語を学ぶことは、言語スキルを身につけるだけでなく、異文化への理解を深める効果もある。外国語学習を通じて、異なる価値観や考え方に触れることで、視野が広がる。また、脳の活性化にも役立つという研究結果もある。外国語学習は、社会人になってからも続ける価値がある活動だと言えるだろう。
                </div>
                <div class="reading-questions">
                    <div class="question" data-answer="4">
                        <div class="question-number">問3</div>
                        <div class="question-text">外国語学習の効果として述べられていないものはどれか。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. 異文化への理解が深まる</div>
                            <div class="option" data-value="2">2. 視野が広がる</div>
                            <div class="option" data-value="3">3. 脳の活性化に役立つ</div>
                            <div class="option" data-value="4">4. 収入が上がる</div>
                        </div>
                        <div class="explanation">「収入が上がる」については述べられていません。</div>
                    </div>
                </div>
            </div>

            <!-- P4: お歳暮の習慣 -->
            <div class="reading-layout" style="margin-top:24px;">
                <div class="passage-box">
                    お歳暮とは、年末に日頃お世話になっている人へ贈り物をする日本の習慣だ。一般的に12月初旬から20日頃までに贈る。品物は食べ物や飲み物が多く、相手の好みに合わせて選ぶのが一般的だ。近年では、この習慣を行う人が減ってきているが、感謝の気持ちを伝える大切な文化として今も続いている。
                </div>
                <div class="reading-questions">
                    <div class="question" data-answer="1">
                        <div class="question-number">問4</div>
                        <div class="question-text">お歳暮について正しいものはどれか。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. 年末に感謝の気持ちを込めて贈り物をする習慣だ</div>
                            <div class="option" data-value="2">2. 1月に贈るものだ</div>
                            <div class="option" data-value="3">3. 品物は必ず高価なものでなければならない</div>
                            <div class="option" data-value="4">4. 近年この習慣をする人が増えている</div>
                        </div>
                        <div class="explanation">「年末に日頃お世話になっている人へ贈り物をする」「感謝の気持ちを伝える大切な文化」とあります。</div>
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
                    私は日本語を10年以上勉強しているが、外国語を学ぶたびに気づくことがある。それは、言語が違えば、ものの見方や感じ方も違うということだ。<br><br>
                    例えば、日本語には「木漏れ日」という言葉がある。これは木の葉の間から差し込む光のことだが、この概念を一言で表す言葉は英語にはない。逆に、英語の「serendipity」（偶然の幸運な発見）も日本語では一言では言い表せない。<br><br>
                    言語を学ぶことは、単に言葉を覚えることではなく、その言語を使う人々の文化や感性を理解することでもあると、私は考えている。
                </div>
                <div class="reading-questions">
                    <div class="question" data-answer="2">
                        <div class="question-number">問5</div>
                        <div class="question-text">「木漏れ日」について、筆者はどう述べているか。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. 英語にも同じ意味の言葉がある</div>
                            <div class="option" data-value="2">2. この概念を一言で表す英語の言葉がない</div>
                            <div class="option" data-value="3">3. 日本語でも説明が難しい言葉だ</div>
                            <div class="option" data-value="4">4. 最近できた新しい日本語だ</div>
                        </div>
                        <div class="explanation">「この概念を一言で表す言葉は英語にはない」とあります。</div>
                    </div>
                    <div class="question" data-answer="3">
                        <div class="question-number">問6</div>
                        <div class="question-text">筆者が言語学習を通じて気づいたことは何か。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. 日本語は英語より難しい</div>
                            <div class="option" data-value="2">2. 外国語は10年以上勉強しないと上手にならない</div>
                            <div class="option" data-value="3">3. 言語が違えばものの見方や感じ方も違う</div>
                            <div class="option" data-value="4">4. 英語は世界で最も使われている言語だ</div>
                        </div>
                        <div class="explanation">「言語が違えば、ものの見方や感じ方も違う」とあります。</div>
                    </div>
                    <div class="question" data-answer="4">
                        <div class="question-number">問7</div>
                        <div class="question-text">筆者は言語を学ぶことについてどう考えているか。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. 言葉をたくさん覚えることが最も大切だ</div>
                            <div class="option" data-value="2">2. 文法を完璧にすることが重要だ</div>
                            <div class="option" data-value="3">3. 外国語は若いうちに始めるべきだ</div>
                            <div class="option" data-value="4">4. その言語を使う人々の文化や感性を理解することでもある</div>
                        </div>
                        <div class="explanation">「その言語を使う人々の文化や感性を理解することでもある」とあります。</div>
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
                    近年、世界各地で観光客が増加し、「オーバーツーリズム」と呼ばれる問題が深刻化している。観光客が増えすぎることで、地域住民の生活環境が悪化したり、自然や文化遺産が傷ついたりするケースが増えている。<br><br>
                    日本でも、京都や鎌倉などの人気観光地でこの問題が顕著に見られる。道路が観光客で混雑し、地元の人々が日常生活を送りにくくなっているという声も多い。<br><br>
                    対策として、観光客の入場制限や入場料の徴収、観光客が訪れる時間帯の分散化などが試みられている。また、観光客をより多くの地域に分散させる「分散型観光」を推進する動きもある。<br><br>
                    観光業は地域経済にとって重要な収入源だが、過度な観光客の集中は地域の持続可能な発展を妨げる可能性がある。観光客と地域住民が共存できるバランスを見つけることが、今後の課題だと言えるだろう。
                </div>
                <div class="reading-questions">
                    <div class="question" data-answer="2">
                        <div class="question-number">問8</div>
                        <div class="question-text">「オーバーツーリズム」とはどのような問題か。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. 観光客が少なすぎて地域経済が衰退する問題</div>
                            <div class="option" data-value="2">2. 観光客が増えすぎて地域に悪影響が出る問題</div>
                            <div class="option" data-value="3">3. 観光地が閉鎖されて観光できなくなる問題</div>
                            <div class="option" data-value="4">4. 観光客がマナーを守らない問題</div>
                        </div>
                        <div class="explanation">「観光客が増えすぎることで、地域住民の生活環境が悪化したり、自然や文化遺産が傷ついたりする」と説明されています。</div>
                    </div>
                    <div class="question" data-answer="3">
                        <div class="question-number">問9</div>
                        <div class="question-text">オーバーツーリズムの対策として述べられていないものはどれか。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. 観光客の入場制限</div>
                            <div class="option" data-value="2">2. 観光客の訪問時間帯の分散化</div>
                            <div class="option" data-value="3">3. 観光地の完全閉鎖</div>
                            <div class="option" data-value="4">4. 観光客を多くの地域に分散させる</div>
                        </div>
                        <div class="explanation">「観光地の完全閉鎖」については述べられていません。</div>
                    </div>
                    <div class="question" data-answer="4">
                        <div class="question-number">問10</div>
                        <div class="question-text">筆者はオーバーツーリズムについてどう述べているか。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. 観光業をやめるべきだ</div>
                            <div class="option" data-value="2">2. 観光客を完全に制限すべきだ</div>
                            <div class="option" data-value="3">3. 観光業は地域に不要だ</div>
                            <div class="option" data-value="4">4. 観光客と地域住民が共存できるバランスを見つけることが課題だ</div>
                        </div>
                        <div class="explanation">「観光客と地域住民が共存できるバランスを見つけることが、今後の課題だ」とあります。</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 問題13: 情報検索 -->
        <div class="section-box">
            <div class="section-title">問題13 情報検索</div>
            <div class="section-desc">右のページは、文化センターの講座案内です。これを読んで、後の問いに答えなさい。</div>
            <div class="reading-layout">
                <div class="passage-box">
                    <strong>市民文化センター 秋期講座のご案内</strong><br><br>
                    <strong>【Aコース】水彩画入門</strong><br>
                    対象：18歳以上の初心者<br>
                    日程：毎週火曜日 10:00〜12:00<br>
                    期間：10月〜12月（全12回）<br>
                    受講料：18,000円（材料費込み）<br><br>
                    <strong>【Bコース】料理教室（和食）</strong><br>
                    対象：どなたでも<br>
                    日程：毎週木曜日 13:00〜15:00<br>
                    期間：10月〜11月（全8回）<br>
                    受講料：12,000円（材料費込み）<br><br>
                    <strong>【Cコース】英会話（初級）</strong><br>
                    対象：18歳以上<br>
                    日程：毎週土曜日 14:00〜16:00<br>
                    期間：10月〜12月（全12回）<br>
                    受講料：15,000円（教材費別途）<br><br>
                    ※申込はメールまたは窓口にて受付<br>
                    ※定員になり次第締め切り
                </div>
                <div class="reading-questions">
                    <div class="question" data-answer="3">
                        <div class="question-number">問11</div>
                        <div class="question-text">15歳の中学生が申し込めるコースはどれか。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. Aコースのみ</div>
                            <div class="option" data-value="2">2. Cコースのみ</div>
                            <div class="option" data-value="3">3. Bコースのみ</div>
                            <div class="option" data-value="4">4. どのコースも申し込めない</div>
                        </div>
                        <div class="explanation">Aコース・Cコースは「18歳以上」が対象です。Bコースは「どなたでも」なので15歳でも申し込めます。</div>
                    </div>
                    <div class="question" data-answer="1">
                        <div class="question-number">問12</div>
                        <div class="question-text">Cコースを受講する場合、合計でいくら必要になるか。ただし、教材費は3,000円とする。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. 18,000円</div>
                            <div class="option" data-value="2">2. 15,000円</div>
                            <div class="option" data-value="3">3. 12,000円</div>
                            <div class="option" data-value="4">4. 20,000円</div>
                        </div>
                        <div class="explanation">Cコースの受講料15,000円＋教材費3,000円＝18,000円です。</div>
                    </div>
                    <div class="question" data-answer="2">
                        <div class="question-number">問13</div>
                        <div class="question-text">この講座について正しいものはどれか。</div>
                        <div class="options">
                            <div class="option" data-value="1">1. 申込は窓口のみで受け付けている</div>
                            <div class="option" data-value="2">2. 定員になったら申し込めなくなる</div>
                            <div class="option" data-value="3">3. Aコースの材料費は別途必要だ</div>
                            <div class="option" data-value="4">4. Bコースは3ヶ月間ある</div>
                        </div>
                        <div class="explanation">「定員になり次第締め切り」とあります。申込はメールまたは窓口、Aコースは材料費込み、Bコースは2ヶ月間です。</div>
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
