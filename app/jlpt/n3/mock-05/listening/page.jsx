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
    <title>JLPT N3 Listening - MOCK-05 | Nihon GO!</title>
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
        .container { max-width: 900px; margin: 0 auto; padding: 20px; }
        h1 { font-size: 1.5em; margin-bottom: 10px; text-align: center; }
        .mondai-section { background: #fff; border-radius: 12px; padding: 24px; margin-bottom: 20px; border: 1px solid #e5e7eb; }
        .mondai-header { font-size: 1.1em; font-weight: 600; margin-bottom: 8px; padding-bottom: 12px; border-bottom: 2px solid #06b6d4; }
        .mondai-instruction { color: #666; font-size: 0.9em; margin-bottom: 20px; }
        .scenario-block { margin-bottom: 28px; padding: 16px; background: #f9fafb; border-radius: 8px; }
        .scenario-title { font-weight: 600; margin-bottom: 12px; color: #06b6d4; }
        .scenario-number { display: inline-block; background: #06b6d4; color: #fff; border-radius: 50%; width: 28px; height: 28px; text-align: center; line-height: 28px; font-size: 0.9em; margin-right: 8px; }
        .audio-player { margin-bottom: 12px; }
        .audio-player audio { width: 100%; }
        .script { display: none; background: #f3f4f6; border-radius: 6px; padding: 12px; margin-bottom: 12px; font-size: 0.9em; line-height: 1.8; }
        .script-label { font-weight: 600; color: #06b6d4; display: block; margin-bottom: 8px; }
        .script-toggle { background: none; border: 1px solid #06b6d4; color: #06b6d4; padding: 4px 12px; border-radius: 4px; cursor: pointer; font-size: 0.85em; margin-bottom: 12px; }
        .script-toggle:hover { background: #ecfeff; }
        .speaker { font-weight: 600; }
        .speaker.female { color: #db2777; }
        .speaker.male { color: #2563eb; }
        .question { margin-top: 12px; }
        .question-number { font-size: 0.85em; color: #06b6d4; font-weight: 600; margin-bottom: 8px; }
        .question-text { font-size: 1em; margin-bottom: 10px; }
        .options { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
        @media (max-width: 600px) { .options { grid-template-columns: 1fr; } }
        .option { padding: 10px 14px; border: 2px solid #e5e7eb; border-radius: 8px; cursor: pointer; background: #fff; color: #333; font-size: 1rem; text-align: left; transition: all 0.15s; display: flex; align-items: center; gap: 8px; }
        .option:hover { border-color: #06b6d4; background: #ecfeff; }
        .option.selected { border-color: #06b6d4; background: #ecfeff; }
        .option.correct { border-color: #06b6d4; background: #cffafe; }
        .option.incorrect { border-color: #ef4444; background: #fee2e2; }
        .option-label { background: #e5e7eb; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-size: 0.8em; font-weight: 600; flex-shrink: 0; }
        .option-text { flex: 1; }
        .explanation { margin-top: 10px; padding: 10px; background: #fef3c7; border-radius: 6px; display: none; font-size: 0.9em; }
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
            <div class="timer" id="timer">40:00</div>
        </div>
    </header>
    <div class="container">
        <h1>JLPT N3 Mock Test 05 - 聴解</h1>
        <div class="nav-back-row">
            <a href="/materials/jlpt/n3/" class="nav-back">&#8592; 問題一覧</a>
        </div>
        <div class="nav">
            <a href="vocabulary.html">語彙</a><a href="grammar.html">文法</a><a href="reading.html">読解</a><a href="listening.html" class="active">聴解</a>
        </div>

        <!-- 問題1: 課題理解 (6問) -->
        <div class="mondai-section" id="mondai1">
        <div class="mondai-header">問題1 課題理解</div>
        <div class="mondai-instruction">会話を聞いて、質問に答えてください。</div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">1</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-05/audio/m1_q1.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s1-1')">スクリプトを見る</button>
            <div class="script" id="s1-1"><span class="script-label">スクリプト</span>
                <strong>質問：女の人はこの後まず何をしますか。</strong><br><br>
                <span class="speaker male">男：</span>鈴木さん、報告書はもうできた？<br>
                <span class="speaker female">女：</span>グラフはできてるんですが、まとめのページがまだなんです。<br>
                <span class="speaker male">男：</span>先に部長に確認してもらう必要があるから、今日中にお願いできる？<br>
                <span class="speaker female">女：</span>わかりました。まとめのページを先に終わらせて、部長に見せます。
            </div>
            <div class="question" data-answer="3">
                <div class="question-number">問1</div>
                <div class="question-text">女の人はこの後まず何をしますか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">グラフを修正する</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">部長に報告書を見せる</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">まとめのページを作る</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">男の人に相談する</span></div>
                </div>
                <div class="explanation">「まとめのページを先に終わらせて」と言っているので、まず「まとめのページを作る」が正解です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">2</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-05/audio/m1_q2.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s1-2')">スクリプトを見る</button>
            <div class="script" id="s1-2"><span class="script-label">スクリプト</span>
                <strong>質問：女の人はどの電車に乗りますか。</strong><br><br>
                <span class="speaker female">女：</span>すみません、池袋まで行きたいんですが、どの電車が早いですか。<br>
                <span class="speaker male">男：</span>急行なら15分で着きますが、次は30分後です。各駅停車は5分後に来ますが、25分かかります。<br>
                <span class="speaker female">女：</span>急いでいるので、早く着きたいんですが…。<br>
                <span class="speaker male">男：</span>じゃあ各駅停車に乗るか、タクシーですかね。<br>
                <span class="speaker female">女：</span>じゃあ各駅停車にします。
            </div>
            <div class="question" data-answer="2">
                <div class="question-number">問2</div>
                <div class="question-text">女の人はどの電車に乗りますか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">急行（30分後）</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">各駅停車（5分後）</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">特急</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">タクシー</span></div>
                </div>
                <div class="explanation">「じゃあ各駅停車にします」と言っています。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">3</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-05/audio/m1_q3.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s1-3')">スクリプトを見る</button>
            <div class="script" id="s1-3"><span class="script-label">スクリプト</span>
                <strong>質問：男の人はこの後まず何をしますか。</strong><br><br>
                <span class="speaker female">女：</span>明日のパーティーの準備、どうする？<br>
                <span class="speaker male">男：</span>まず飲み物を買いに行こうかな。あ、でもその前に部屋の掃除をしないと。<br>
                <span class="speaker female">女：</span>じゃあ私が飲み物を買ってくるから、あなたは掃除をお願い。<br>
                <span class="speaker male">男：</span>わかった。じゃあ先に掃除をする。
            </div>
            <div class="question" data-answer="1">
                <div class="question-number">問3</div>
                <div class="question-text">男の人はこの後まず何をしますか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">部屋の掃除をする</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">飲み物を買いに行く</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">料理を作る</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">ゲストに連絡する</span></div>
                </div>
                <div class="explanation">「じゃあ先に掃除をする」と言っています。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">4</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-05/audio/m1_q4.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s1-4')">スクリプトを見る</button>
            <div class="script" id="s1-4"><span class="script-label">スクリプト</span>
                <strong>質問：女の人はどのプランを選びますか。</strong><br><br>
                <span class="speaker male">スタッフ：</span>スマホのプランはAプランとBプランがございます。Aプランはデータ無制限で月額5,000円、Bプランはデータ10GBで月額3,000円です。<br>
                <span class="speaker female">女：</span>動画はあまり見ないんですが、メールやSNSはよく使います。<br>
                <span class="speaker male">スタッフ：</span>でしたらBプランで十分かと思います。<br>
                <span class="speaker female">女：</span>じゃあ、Bプランにします。
            </div>
            <div class="question" data-answer="2">
                <div class="question-number">問4</div>
                <div class="question-text">女の人はどのプランを選びますか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">Aプラン（データ無制限）</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">Bプラン（データ10GB）</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">Cプラン</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">まだ決めていない</span></div>
                </div>
                <div class="explanation">「じゃあ、Bプランにします」と言っています。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">5</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-05/audio/m1_q5.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s1-5')">スクリプトを見る</button>
            <div class="script" id="s1-5"><span class="script-label">スクリプト</span>
                <strong>質問：二人はどこで待ち合わせることにしましたか。</strong><br><br>
                <span class="speaker female">女：</span>明日、映画の後でランチしない？<br>
                <span class="speaker male">男：</span>いいね。どこで待ち合わせる？駅の改札前はどう？<br>
                <span class="speaker female">女：</span>映画館の前の方が分かりやすくない？<br>
                <span class="speaker male">男：</span>そうだね。じゃあ映画館の入口で。<br>
                <span class="speaker female">女：</span>OK！
            </div>
            <div class="question" data-answer="3">
                <div class="question-number">問5</div>
                <div class="question-text">二人はどこで待ち合わせることにしましたか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">駅の改札前</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">レストランの前</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">映画館の入口</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">公園の前</span></div>
                </div>
                <div class="explanation">「じゃあ映画館の入口で」と決まりました。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">6</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-05/audio/m1_q6.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s1-6')">スクリプトを見る</button>
            <div class="script" id="s1-6"><span class="script-label">スクリプト</span>
                <strong>質問：男の人はこの後まず何をしますか。</strong><br><br>
                <span class="speaker female">女：</span>新しいパソコン、どうする？<br>
                <span class="speaker male">男：</span>まず量販店に見に行こうかな。でも、その前にネットで調べた方がいいかな。<br>
                <span class="speaker female">女：</span>私が店に行くから、あなたはネットで値段を調べておいて。<br>
                <span class="speaker male">男：</span>わかった。じゃあ先にネットで調べる。
            </div>
            <div class="question" data-answer="4">
                <div class="question-number">問6</div>
                <div class="question-text">男の人はこの後まず何をしますか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">量販店に行く</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">パソコンを買う</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">女の人に相談する</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">ネットで値段を調べる</span></div>
                </div>
                <div class="explanation">「じゃあ先にネットで調べる」と言っています。</div>
            </div>
        </div>
        </div>

        <!-- 問題2: ポイント理解 (6問) -->
        <div class="mondai-section" id="mondai2">
        <div class="mondai-header">問題2 ポイント理解</div>
        <div class="mondai-instruction">はじめに質問を聞いてください。それから話を聞いて、答えを選んでください。</div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">1</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-05/audio/m2_q1.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s2-1')">スクリプトを見る</button>
            <div class="script" id="s2-1"><span class="script-label">スクリプト</span>
                <strong>質問：このイベントはいつですか。</strong><br><br>
                <span class="speaker male">アナウンス：</span>地域清掃ボランティアのお知らせです。今月15日の土曜日、午前9時から11時まで、駅前公園で清掃活動を行います。雨天の場合は翌16日の日曜日に延期します。参加ご希望の方は前日までにお申し込みください。
            </div>
            <div class="question" data-answer="2">
                <div class="question-number">問1</div>
                <div class="question-text">このイベントはいつですか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">今月14日</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">今月15日</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">今月16日</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">来月1日</span></div>
                </div>
                <div class="explanation">「今月15日の土曜日」に行います。16日は雨天延期の場合です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">2</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-05/audio/m2_q2.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s2-2')">スクリプトを見る</button>
            <div class="script" id="s2-2"><span class="script-label">スクリプト</span>
                <strong>質問：男の人が引っ越しを決めた理由は何ですか。</strong><br><br>
                <span class="speaker female">女：</span>引っ越しするって聞いたけど、今のアパートに不満があるの？<br>
                <span class="speaker male">男：</span>家賃には満足してるんだけど、通勤時間が長くて。毎日2時間かかるんだよね。<br>
                <span class="speaker female">女：</span>それは大変だね。<br>
                <span class="speaker male">男：</span>もっと職場の近くに住みたくて、引っ越すことにしたんだ。
            </div>
            <div class="question" data-answer="1">
                <div class="question-number">問2</div>
                <div class="question-text">男の人が引っ越しを決めた理由は何ですか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">通勤時間が長いから</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">家賃が高いから</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">近所の人間関係が悪いから</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">アパートが古いから</span></div>
                </div>
                <div class="explanation">「通勤時間が長くて、もっと職場の近くに住みたい」と言っています。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">3</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-05/audio/m2_q3.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s2-3')">スクリプトを見る</button>
            <div class="script" id="s2-3"><span class="script-label">スクリプト</span>
                <strong>質問：この店で一番人気のスイーツは何ですか。</strong><br><br>
                <span class="speaker female">店員：</span>いらっしゃいませ。当店はフランス菓子専門店です。一番人気はモンブランで、週末は開店前から行列ができるほどです。次に人気なのがショコラタルトです。フルーツタルトも人気ですが、季節限定となっております。
            </div>
            <div class="question" data-answer="3">
                <div class="question-number">問3</div>
                <div class="question-text">この店で一番人気のスイーツは何ですか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">ショコラタルト</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">フルーツタルト</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">モンブラン</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">エクレア</span></div>
                </div>
                <div class="explanation">「一番人気はモンブランで」と言っています。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">4</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-05/audio/m2_q4.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s2-4')">スクリプトを見る</button>
            <div class="script" id="s2-4"><span class="script-label">スクリプト</span>
                <strong>質問：女の人が趣味を始めた理由は何ですか。</strong><br><br>
                <span class="speaker male">男：</span>最近、絵を描いているって聞いたけど。<br>
                <span class="speaker female">女：</span>うん。在宅勤務が増えて、家にいる時間が多くなったからかな。何か創造的なことがしたくて始めたんだ。<br>
                <span class="speaker male">男：</span>楽しそうだね。<br>
                <span class="speaker female">女：</span>最初はうまくできなかったけど、今はとても楽しいよ。
            </div>
            <div class="question" data-answer="4">
                <div class="question-number">問4</div>
                <div class="question-text">女の人が絵を始めた理由は何ですか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">友達に勧められたから</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">お金がかからないから</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">仕事で必要だから</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">在宅勤務で家にいる時間が増え、創造的なことをしたかったから</span></div>
                </div>
                <div class="explanation">「在宅勤務が増えて家にいる時間が多くなった」「何か創造的なことがしたくて」と言っています。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">5</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-05/audio/m2_q5.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s2-5')">スクリプトを見る</button>
            <div class="script" id="s2-5"><span class="script-label">スクリプト</span>
                <strong>質問：男の人の職業は何ですか。</strong><br><br>
                <span class="speaker female">女：</span>山田さんはどのようなお仕事をされているんですか。<br>
                <span class="speaker male">男：</span>システムエンジニアをしています。主にアプリの開発を担当しています。<br>
                <span class="speaker female">女：</span>すごいですね。他の分野もされるんですか。<br>
                <span class="speaker male">男：</span>データ分析も少しやりますが、メインはアプリ開発です。
            </div>
            <div class="question" data-answer="2">
                <div class="question-number">問5</div>
                <div class="question-text">男の人の職業は何ですか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">データアナリスト</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">システムエンジニア</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">デザイナー</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">プロジェクトマネージャー</span></div>
                </div>
                <div class="explanation">「システムエンジニアをしています」と言っています。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">6</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-05/audio/m2_q6.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s2-6')">スクリプトを見る</button>
            <div class="script" id="s2-6"><span class="script-label">スクリプト</span>
                <strong>質問：日本で最もよく食べられている魚は何ですか。</strong><br><br>
                <span class="speaker male">ナレーター：</span>調査によると、日本で最もよく食べられている魚はサーモンで、次いでマグロ、そしてエビと続きます。サーモンは寿司や刺身として特に人気で、若い世代を中心に好まれています。
            </div>
            <div class="question" data-answer="1">
                <div class="question-number">問6</div>
                <div class="question-text">日本で最もよく食べられている魚は何ですか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">サーモン</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">マグロ</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">エビ</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">タコ</span></div>
                </div>
                <div class="explanation">「最もよく食べられている魚はサーモンで、次いでマグロ」と言っています。</div>
            </div>
        </div>
        </div>

        <!-- 問題3: 概要理解 (3問) -->
        <div class="mondai-section" id="mondai3">
        <div class="mondai-header">問題3 概要理解</div>
        <div class="mondai-instruction">話を聞いて、話し手が最も言いたいことを選んでください。</div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">1</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-05/audio/m3_q1.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s3-1')">スクリプトを見る</button>
            <div class="script" id="s3-1"><span class="script-label">スクリプト</span>
                <span class="speaker female">女：</span>料理が苦手な人が増えていると言われています。しかし、料理は決して難しいものではありません。まず、簡単なレシピから始めて、少しずつスキルを上げていくことが大切です。毎日少しでも料理をすることで、自然と上手になっていきます。健康にも家計にも良い、料理の習慣をぜひつけてみてください。
            </div>
            <div class="question" data-answer="3">
                <div class="question-number">問1</div>
                <div class="question-text">この人が一番言いたいことは何ですか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">料理は難しいので専門家に習うべきだ</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">料理が苦手な人は外食すればいい</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">簡単なところから始めて毎日少しずつ料理をする習慣をつけることが大切だ</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">料理は健康に悪い</span></div>
                </div>
                <div class="explanation">「簡単なレシピから始めて」「毎日少しでも料理をすることで上手になる」「料理の習慣をつけてほしい」が主張です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">2</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-05/audio/m3_q2.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s3-2')">スクリプトを見る</button>
            <div class="script" id="s3-2"><span class="script-label">スクリプト</span>
                <span class="speaker male">男：</span>皆さんは勉強するとき、どんな環境を作っていますか。最近の研究では、スマートフォンを机の上に置いておくだけで集中力が下がるという結果が出ています。たとえ電源を切っていても、目に入るだけで気が散るそうです。集中したいときは、スマートフォンを別の部屋に置くか、かばんの中にしまうことをお勧めします。
            </div>
            <div class="question" data-answer="2">
                <div class="question-number">問2</div>
                <div class="question-text">この人が一番言いたいことは何ですか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">スマートフォンを使いながら勉強するのが効率的だ</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">集中するためにはスマートフォンを視界から外すべきだ</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">スマートフォンを持つべきではない</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">勉強は静かな場所でしかできない</span></div>
                </div>
                <div class="explanation">「集中したいときは、スマートフォンを別の部屋に置くかかばんの中に」という主張が核心です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">3</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-05/audio/m3_q3.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s3-3')">スクリプトを見る</button>
            <div class="script" id="s3-3"><span class="script-label">スクリプト</span>
                <span class="speaker female">先生：</span>英語を話せるようになるには、とにかく話す機会を増やすことが重要です。日本では英語を話す機会が少ないと感じるかもしれませんが、最近はオンラインで外国人と話せるサービスも増えています。完璧な英語でなくてもいい。まず声に出して、間違いを恐れず練習することが、英語上達への一番の近道だと思います。
            </div>
            <div class="question" data-answer="4">
                <div class="question-number">問3</div>
                <div class="question-text">先生が一番言いたいことは何ですか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">英語は日本では学べない</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">完璧な英語を話せるまで練習すべきだ</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">オンラインサービスだけで英語は上達する</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">間違いを恐れず話す機会を増やすことが英語上達の近道だ</span></div>
                </div>
                <div class="explanation">「間違いを恐れず練習することが、英語上達への一番の近道」が主張です。</div>
            </div>
        </div>
        </div>

        <!-- 問題4: 発話表現 (4問) -->
        <div class="mondai-section" id="mondai4">
        <div class="mondai-header">問題4 発話表現</div>
        <div class="mondai-instruction">状況を聞いて、適切な発話を選んでください。</div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">1</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-05/audio/m4_q1.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s4-1')">スクリプトを見る</button>
            <div class="script" id="s4-1"><span class="script-label">スクリプト</span>上司に仕事を手伝ってほしいとお願いします。なんと言いますか。</div>
            <div class="question" data-answer="2">
                <div class="question-number">問1</div>
                <div class="question-text">なんと言いますか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">手伝ってください。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">お時間がございましたら、少しご協力いただけますでしょうか。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">手伝わないと困ります。</span></div>
                </div>
                <div class="explanation">上司への依頼は「〜ていただけますでしょうか」が適切な丁寧表現です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">2</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-05/audio/m4_q2.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s4-2')">スクリプトを見る</button>
            <div class="script" id="s4-2"><span class="script-label">スクリプト</span>友達が悲しそうにしています。声をかけます。なんと言いますか。</div>
            <div class="question" data-answer="1">
                <div class="question-number">問2</div>
                <div class="question-text">なんと言いますか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">どうしたの？何かあった？</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">悲しいのはよくない。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">泣かないでください。</span></div>
                </div>
                <div class="explanation">友達への声かけとして「どうしたの？何かあった？」が最も自然で親切な表現です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">3</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-05/audio/m4_q3.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s4-3')">スクリプトを見る</button>
            <div class="script" id="s4-3"><span class="script-label">スクリプト</span>会議に遅刻してしまいました。謝ります。なんと言いますか。</div>
            <div class="question" data-answer="3">
                <div class="question-number">問3</div>
                <div class="question-text">なんと言いますか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">会議はもう終わりましたか。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">電車が遅かったです。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">大変失礼いたしました。お待たせしてしまい、申し訳ございません。</span></div>
                </div>
                <div class="explanation">会議への遅刻の謝罪として「失礼いたしました」「申し訳ございません」が適切な丁寧表現です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">4</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-05/audio/m4_q4.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s4-4')">スクリプトを見る</button>
            <div class="script" id="s4-4"><span class="script-label">スクリプト</span>友達から「新しい仕事はどう？」と聞かれました。うまくいっていると伝えます。なんと言いますか。</div>
            <div class="question" data-answer="1">
                <div class="question-number">問4</div>
                <div class="question-text">なんと言いますか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">おかげさまで、とても充実しているよ。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">仕事はどこにありますか。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">仕事は大変です。</span></div>
                </div>
                <div class="explanation">うまくいっていると伝えるには「充実している」が自然な表現です。</div>
            </div>
        </div>
        </div>

        <!-- 問題5: 即時応答 (9問) -->
        <div class="mondai-section" id="mondai5">
        <div class="mondai-header">問題5 即時応答</div>
        <div class="mondai-instruction">短い文を聞いて、正しい返事を選んでください。</div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">1</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-05/audio/m4_q5.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s5-1')">スクリプトを見る</button>
            <div class="script" id="s5-1"><span class="script-label">スクリプト</span>「ご苦労様でした。」</div>
            <div class="question" data-answer="1">
                <div class="question-number">問1</div>
                <div class="question-text">返事を選んでください。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">ありがとうございます。お疲れ様でした。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">ご苦労様は嫌いです。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">仕事はどこですか。</span></div>
                </div>
                <div class="explanation">お疲れ様の言葉への返答は「ありがとうございます。お疲れ様でした」が自然です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">2</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-05/audio/m4_q6.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s5-2')">スクリプトを見る</button>
            <div class="script" id="s5-2"><span class="script-label">スクリプト</span>「この資料、コピーしておいてもらえますか。」</div>
            <div class="question" data-answer="2">
                <div class="question-number">問2</div>
                <div class="question-text">返事を選んでください。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">資料はどこですか。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">はい、承知しました。何部必要ですか。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">コピーはできません。</span></div>
                </div>
                <div class="explanation">コピーの依頼への返答として「承知しました」と必要部数を確認するのが自然です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">3</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-05/audio/m4_q7.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s5-3')">スクリプトを見る</button>
            <div class="script" id="s5-3"><span class="script-label">スクリプト</span>「最近、仕事うまくいってる？」</div>
            <div class="question" data-answer="3">
                <div class="question-number">問3</div>
                <div class="question-text">返事を選んでください。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">仕事はどこにありますか。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">仕事はあまり好きではありません。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">うん、少しずつ慣れてきたよ。</span></div>
                </div>
                <div class="explanation">仕事の状況を聞かれているので、状況を答える3が自然です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">4</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-05/audio/m4_q8.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s5-4')">スクリプトを見る</button>
            <div class="script" id="s5-4"><span class="script-label">スクリプト</span>「ただいま。」</div>
            <div class="question" data-answer="2">
                <div class="question-number">問4</div>
                <div class="question-text">返事を選んでください。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">行ってきます。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">おかえり。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">はじめまして。</span></div>
                </div>
                <div class="explanation">「ただいま」への返答は「おかえり（なさい）」が自然です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">5</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-05/audio/m4_q9.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s5-5')">スクリプトを見る</button>
            <div class="script" id="s5-5"><span class="script-label">スクリプト</span>「この料理、一口食べてみて。」</div>
            <div class="question" data-answer="3">
                <div class="question-number">問5</div>
                <div class="question-text">返事を選んでください。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">料理は難しいです。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">一口はどこですか。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">ありがとう。いただきます。</span></div>
                </div>
                <div class="explanation">食べてみてと勧められた場合、「いただきます」と受け入れるのが自然です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">6</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-05/audio/m4_q10.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s5-6')">スクリプトを見る</button>
            <div class="script" id="s5-6"><span class="script-label">スクリプト</span>「週末、一緒にハイキングに行かない？」</div>
            <div class="question" data-answer="1">
                <div class="question-number">問6</div>
                <div class="question-text">返事を選んでください。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">いいね！どこに行くの？</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">ハイキングは山です。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">週末は忙しいです。</span></div>
                </div>
                <div class="explanation">誘いに乗る場合、「いいね！どこに行くの？」が自然な返答です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">7</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-05/audio/m4_q11.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s5-7')">スクリプトを見る</button>
            <div class="script" id="s5-7"><span class="script-label">スクリプト</span>「お世話になっております。山田商事の佐藤と申します。」</div>
            <div class="question" data-answer="2">
                <div class="question-number">問7</div>
                <div class="question-text">返事を選んでください。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">はじめまして。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">いつもお世話になっております。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">よろしくお願いします、初めて会います。</span></div>
                </div>
                <div class="explanation">ビジネスの挨拶への返答は「いつもお世話になっております」が正しい定型表現です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">8</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-05/audio/m4_q12.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s5-8')">スクリプトを見る</button>
            <div class="script" id="s5-8"><span class="script-label">スクリプト</span>「昨日の発表、すごくよかったよ。」</div>
            <div class="question" data-answer="3">
                <div class="question-number">問8</div>
                <div class="question-text">返事を選んでください。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">発表はどこでしましたか。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">昨日は暑かったですね。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">ありがとう。緊張したけど、うまくできてよかった。</span></div>
                </div>
                <div class="explanation">ほめられた場合、感謝と感想を伝えるのが自然です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">9</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-05/audio/m4_q13.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s5-9')">スクリプトを見る</button>
            <div class="script" id="s5-9"><span class="script-label">スクリプト</span>「この仕事、本当に終わるかな…」</div>
            <div class="question" data-answer="1">
                <div class="question-number">問9</div>
                <div class="question-text">返事を選んでください。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">大丈夫だよ。一緒に頑張ろう。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">仕事は難しいです。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">終わりません。</span></div>
                </div>
                <div class="explanation">不安を感じている相手への自然な返答は励ましの言葉です。</div>
            </div>
        </div>
        </div>

        <button class="btn-submit" onclick="checkAnswers()">採点する</button>

        <div class="score" id="score">
            <div class="score-num" id="score-num"></div>
            <div class="score-label">Score: <span id="score-pct"></span></div>
        </div>
    </div>

    <script>
        let timeLeft = 2400;
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

        function toggleScript(id) {
            const s = document.getElementById(id);
            s.style.display = s.style.display === 'block' ? 'none' : 'block';
        }

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
            clearInterval(timer);
        }
    </script>
<div style="text-align: center; padding: 30px 20px; background: #f8fafc; border-top: 1px solid #e5e7eb; margin-top: 40px;"><p style="color: #6b7280; font-size: 0.85rem; margin: 0;">Original JLPT practice content created by <a href="https://nihongo-world.com" style="color: #fb7185; text-decoration: none; font-weight: 500;">Nihon GO! World</a></p><p style="color: #9ca3af; font-size: 0.8rem; margin-top: 8px;">Free for personal use &bull; Government-certified teachers</p></div></body>
</html>
` }} />
    </>
  )
}
