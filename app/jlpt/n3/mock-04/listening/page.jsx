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
    <title>JLPT N3 Listening - MOCK-04 | Nihon GO!</title>
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
        <h1>JLPT N3 Mock Test 04 - 聴解</h1>
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
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-04/audio/m1_q1.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s1-1')">スクリプトを見る</button>
            <div class="script" id="s1-1"><span class="script-label">スクリプト</span>
                <strong>質問：女の人はこの後何をしますか。</strong><br><br>
                <span class="speaker male">男：</span>田中さん、明日の会議の資料、もうできた？<br>
                <span class="speaker female">女：</span>グラフはできてるんですが、まとめのページがまだで。<br>
                <span class="speaker male">男：</span>今日中に仕上げてもらえる？印刷は僕がやるから。<br>
                <span class="speaker female">女：</span>わかりました。まとめのページを先に終わらせます。
            </div>
            <div class="question" data-answer="2">
                <div class="question-number">問1</div>
                <div class="question-text">女の人はこの後何をしますか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">グラフを作る</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">まとめのページを作る</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">資料を印刷する</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">会議室を予約する</span></div>
                </div>
                <div class="explanation">「まとめのページを先に終わらせます」と言っています。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">2</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-04/audio/m1_q2.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s1-2')">スクリプトを見る</button>
            <div class="script" id="s1-2"><span class="script-label">スクリプト</span>
                <strong>質問：男の人はどの電車に乗りますか。</strong><br><br>
                <span class="speaker female">女：</span>すみません、渋谷まで行きたいんですが。<br>
                <span class="speaker male">男：</span>渋谷ですか。このホームから急行に乗れば15分です。<br>
                <span class="speaker female">女：</span>急行はあと何分で来ますか。<br>
                <span class="speaker male">男：</span>急行は20分後です。でも各駅停車なら5分後に来ますよ。30分かかりますけど。<br>
                <span class="speaker female">女：</span>じゃあ各駅停車で行きます。
            </div>
            <div class="question" data-answer="3">
                <div class="question-number">問2</div>
                <div class="question-text">女の人はどの電車に乗りますか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">急行（20分後）</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">特急</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">各駅停車（5分後）</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">バス</span></div>
                </div>
                <div class="explanation">「じゃあ各駅停車で行きます」と言っています。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">3</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-04/audio/m1_q3.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s1-3')">スクリプトを見る</button>
            <div class="script" id="s1-3"><span class="script-label">スクリプト</span>
                <strong>質問：男の人はこの後まず何をしますか。</strong><br><br>
                <span class="speaker female">店員：</span>ご注文はお決まりですか。<br>
                <span class="speaker male">男：</span>えーと、ランチセットをひとつ。あ、その前にメニューをもう一度見せてもらえますか。<br>
                <span class="speaker female">店員：</span>はい、こちらです。<br>
                <span class="speaker male">男：</span>ありがとうございます。少し考えてからにします。
            </div>
            <div class="question" data-answer="1">
                <div class="question-number">問3</div>
                <div class="question-text">男の人はこの後まず何をしますか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">メニューをもう一度見る</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">ランチセットを注文する</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">店を出る</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">水を頼む</span></div>
                </div>
                <div class="explanation">「メニューをもう一度見せてもらえますか」と言い、「少し考えてからにします」と言っています。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">4</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-04/audio/m1_q4.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s1-4')">スクリプトを見る</button>
            <div class="script" id="s1-4"><span class="script-label">スクリプト</span>
                <strong>質問：女の人はどのコースを申し込みますか。</strong><br><br>
                <span class="speaker male">スタッフ：</span>英語コースは初級、中級、上級の3つがございます。<br>
                <span class="speaker female">女：</span>日常会話はできるんですが、ビジネス英語を学びたくて。<br>
                <span class="speaker male">スタッフ：</span>では中級か上級がよろしいかと。ビジネス英語は上級コースに含まれています。<br>
                <span class="speaker female">女：</span>じゃあ上級にします。
            </div>
            <div class="question" data-answer="3">
                <div class="question-number">問4</div>
                <div class="question-text">女の人はどのコースを申し込みますか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">初級コース</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">中級コース</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">上級コース</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">ビジネスコース</span></div>
                </div>
                <div class="explanation">「じゃあ上級にします」と言っています。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">5</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-04/audio/m1_q5.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s1-5')">スクリプトを見る</button>
            <div class="script" id="s1-5"><span class="script-label">スクリプト</span>
                <strong>質問：二人は何時に出発することにしましたか。</strong><br><br>
                <span class="speaker female">女：</span>明日の遠足、何時に出発する？<br>
                <span class="speaker male">男：</span>8時はどう？<br>
                <span class="speaker female">女：</span>早すぎない？9時の方がよくない？<br>
                <span class="speaker male">男：</span>でも道が混むから、8時半ぐらいがいいんじゃないかな。<br>
                <span class="speaker female">女：</span>そうね。じゃあ8時半にしよう。
            </div>
            <div class="question" data-answer="2">
                <div class="question-number">問5</div>
                <div class="question-text">二人は何時に出発することにしましたか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">8時</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">8時半</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">9時</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">9時半</span></div>
                </div>
                <div class="explanation">「じゃあ8時半にしよう」と決まりました。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">6</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-04/audio/m1_q6.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s1-6')">スクリプトを見る</button>
            <div class="script" id="s1-6"><span class="script-label">スクリプト</span>
                <strong>質問：男の人はこの後まず何をしますか。</strong><br><br>
                <span class="speaker female">女：</span>引越しの荷物、どうする？<br>
                <span class="speaker male">男：</span>まず段ボールを集めないと。スーパーにもらいに行くよ。<br>
                <span class="speaker female">女：</span>段ボールは私が近所のコンビニにもらいに行くから、あなたは梱包用のテープを買ってきて。<br>
                <span class="speaker male">男：</span>わかった。じゃあテープを買いに行く。
            </div>
            <div class="question" data-answer="3">
                <div class="question-number">問6</div>
                <div class="question-text">男の人はこの後まず何をしますか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">段ボールをもらいに行く</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">荷物を梱包する</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">梱包用のテープを買う</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">引越し業者に電話する</span></div>
                </div>
                <div class="explanation">「じゃあテープを買いに行く」と言っています。</div>
            </div>
        </div>
        </div>

        <!-- 問題2: ポイント理解 (6問) -->
        <div class="mondai-section" id="mondai2">
        <div class="mondai-header">問題2 ポイント理解</div>
        <div class="mondai-instruction">はじめに質問を聞いてください。それから話を聞いて、答えを選んでください。</div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">1</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-04/audio/m2_q1.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s2-1')">スクリプトを見る</button>
            <div class="script" id="s2-1"><span class="script-label">スクリプト</span>
                <strong>質問：このイベントはいつですか。</strong><br><br>
                <span class="speaker male">アナウンス：</span>地域清掃ボランティアのお知らせです。今月25日の土曜日、午前9時から11時まで、駅前公園で清掃活動を行います。雨天の場合は翌26日の日曜日に延期します。参加希望の方は前日までにお申し込みください。
            </div>
            <div class="question" data-answer="2">
                <div class="question-number">問1</div>
                <div class="question-text">このイベントはいつですか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">今月24日</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">今月25日</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">今月26日</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">来月1日</span></div>
                </div>
                <div class="explanation">「今月25日の土曜日」に行います。26日は雨天延期の場合です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">2</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-04/audio/m2_q2.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s2-2')">スクリプトを見る</button>
            <div class="script" id="s2-2"><span class="script-label">スクリプト</span>
                <strong>質問：女の人が転職を決めた理由は何ですか。</strong><br><br>
                <span class="speaker male">男：</span>転職するって聞いたけど、今の会社に不満があるの？<br>
                <span class="speaker female">女：</span>給料には満足してるんだけど、残業が多くて。子供が生まれたから、もっと家族と過ごす時間がほしくて。<br>
                <span class="speaker male">男：</span>なるほど。<br>
                <span class="speaker female">女：</span>家族との時間を大切にしたいから、残業の少ない会社に変わることにしたの。
            </div>
            <div class="question" data-answer="3">
                <div class="question-number">問2</div>
                <div class="question-text">女の人が転職を決めた理由は何ですか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">給料が低いから</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">仕事が難しいから</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">家族との時間を大切にしたいから</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">職場の人間関係が悪いから</span></div>
                </div>
                <div class="explanation">「家族との時間を大切にしたいから、残業の少ない会社に変わることにした」と言っています。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">3</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-04/audio/m2_q3.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s2-3')">スクリプトを見る</button>
            <div class="script" id="s2-3"><span class="script-label">スクリプト</span>
                <strong>質問：このレストランで最も人気のある料理は何ですか。</strong><br><br>
                <span class="speaker female">店員：</span>いらっしゃいませ。当店は和食専門店です。一番人気は黒毛和牛のすき焼きで、週末は予約が必要なほどです。次に人気なのが天ぷら定食です。お刺身の盛り合わせも人気ですが、数量限定となっております。
            </div>
            <div class="question" data-answer="1">
                <div class="question-number">問3</div>
                <div class="question-text">このレストランで最も人気のある料理は何ですか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">黒毛和牛のすき焼き</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">天ぷら定食</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">お刺身の盛り合わせ</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">うな重</span></div>
                </div>
                <div class="explanation">「一番人気は黒毛和牛のすき焼き」と言っています。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">4</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-04/audio/m2_q4.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s2-4')">スクリプトを見る</button>
            <div class="script" id="s2-4"><span class="script-label">スクリプト</span>
                <strong>質問：男の人が運動を始めた理由は何ですか。</strong><br><br>
                <span class="speaker female">女：</span>最近、ジムに通ってるって聞いたけど。<br>
                <span class="speaker male">男：</span>うん。健診で血圧が高いって言われてさ。医者に運動するよう勧められたんだ。<br>
                <span class="speaker female">女：</span>大変だったね。<br>
                <span class="speaker male">男：</span>でも始めてみたら楽しくて。体重も少し減ったし。
            </div>
            <div class="question" data-answer="2">
                <div class="question-number">問4</div>
                <div class="question-text">男の人が運動を始めた理由は何ですか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">体重を減らしたいから</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">血圧が高いと言われたから</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">友達に誘われたから</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">運動が好きだから</span></div>
                </div>
                <div class="explanation">「健診で血圧が高いって言われて、医者に運動するよう勧められた」と言っています。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">5</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-04/audio/m2_q5.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s2-5')">スクリプトを見る</button>
            <div class="script" id="s2-5"><span class="script-label">スクリプト</span>
                <strong>質問：女の人の仕事は何ですか。</strong><br><br>
                <span class="speaker male">男：</span>鈴木さんのお仕事は何をされているんですか。<br>
                <span class="speaker female">女：</span>フリーランスで翻訳の仕事をしています。英語と日本語の間の翻訳が主な仕事ですね。<br>
                <span class="speaker male">男：</span>すごいですね。他の言語もできるんですか。<br>
                <span class="speaker female">女：</span>フランス語も少しできますが、翻訳の仕事はまだ英語だけです。
            </div>
            <div class="question" data-answer="4">
                <div class="question-number">問5</div>
                <div class="question-text">女の人の仕事は何ですか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">英語教師</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">フランス語翻訳</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">通訳</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">英語と日本語の翻訳</span></div>
                </div>
                <div class="explanation">「英語と日本語の間の翻訳が主な仕事」と言っています。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">6</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-04/audio/m2_q6.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s2-6')">スクリプトを見る</button>
            <div class="script" id="s2-6"><span class="script-label">スクリプト</span>
                <strong>質問：日本で一番多く飲まれている飲み物は何ですか。</strong><br><br>
                <span class="speaker male">ナレーター：</span>調査によると、日本で最もよく飲まれている飲み物は緑茶で、次いでコーヒー、そして水と続きます。緑茶は健康への意識の高まりとともに、国内外での人気が高まっています。
            </div>
            <div class="question" data-answer="1">
                <div class="question-number">問6</div>
                <div class="question-text">日本で一番多く飲まれている飲み物は何ですか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">緑茶</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">コーヒー</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">水</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">ジュース</span></div>
                </div>
                <div class="explanation">「最もよく飲まれている飲み物は緑茶で、次いでコーヒー」と言っています。</div>
            </div>
        </div>
        </div>

        <!-- 問題3: 概要理解 (3問) -->
        <div class="mondai-section" id="mondai3">
        <div class="mondai-header">問題3 概要理解</div>
        <div class="mondai-instruction">話を聞いて、話し手が最も言いたいことを選んでください。</div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">1</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-04/audio/m3_q1.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s3-1')">スクリプトを見る</button>
            <div class="script" id="s3-1"><span class="script-label">スクリプト</span>
                <span class="speaker male">男：</span>最近の若者はコミュニケーション能力が低いとよく言われます。しかし、実際には彼らはSNSを通じて多くの人と積極的にやり取りをしています。問題は、対面での会話が苦手なだけで、コミュニケーション自体が苦手なわけではありません。対面のスキルを伸ばす機会を作ることが大切なのではないでしょうか。
            </div>
            <div class="question" data-answer="2">
                <div class="question-number">問1</div>
                <div class="question-text">この人が一番言いたいことは何ですか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">若者はコミュニケーション能力が低い</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">若者が対面のスキルを伸ばす機会を作ることが大切だ</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">SNSは使わない方がいい</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">若者はSNSを使いすぎている</span></div>
                </div>
                <div class="explanation">「対面のスキルを伸ばす機会を作ることが大切なのではないでしょうか」が主張です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">2</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-04/audio/m3_q2.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s3-2')">スクリプトを見る</button>
            <div class="script" id="s3-2"><span class="script-label">スクリプト</span>
                <span class="speaker female">女：</span>食事は1日3回が基本とされていますが、最近の研究では食事の回数より、何を食べるかの方が重要だという意見もあります。大切なのは、野菜、たんぱく質、炭水化物のバランスを意識することです。回数にこだわりすぎず、体の声を聞きながら食事をすることが健康への近道だと思います。
            </div>
            <div class="question" data-answer="3">
                <div class="question-number">問2</div>
                <div class="question-text">女の人が一番言いたいことは何ですか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">1日3回食事をすることが最も大切だ</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">食事の回数を減らすべきだ</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">回数より食べるものの栄養バランスが大切だ</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">野菜だけ食べれば健康になれる</span></div>
                </div>
                <div class="explanation">「食事の回数より、何を食べるかの方が重要」「バランスを意識することが大切」が主張です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">3</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-04/audio/m3_q3.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s3-3')">スクリプトを見る</button>
            <div class="script" id="s3-3"><span class="script-label">スクリプト</span>
                <span class="speaker male">先生：</span>プログラミングは今の時代、特別な人だけのスキルではありません。料理のレシピを見て料理ができるように、プログラミングも基本を学べば誰でもできます。難しく考えず、まずは簡単なものを作ってみる楽しさを体験することが大切です。失敗を恐れず、試行錯誤することがプログラミング上達への一番の近道です。
            </div>
            <div class="question" data-answer="4">
                <div class="question-number">問3</div>
                <div class="question-text">先生が一番言いたいことは何ですか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">プログラミングは特別な人だけができる</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">料理とプログラミングは同じだ</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">難しいプログラミングを最初から学ぶべきだ</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">失敗を恐れず試行錯誤することが上達への近道だ</span></div>
                </div>
                <div class="explanation">「失敗を恐れず、試行錯誤することがプログラミング上達への一番の近道」が主張です。</div>
            </div>
        </div>
        </div>

        <!-- 問題4: 発話表現 (4問) -->
        <div class="mondai-section" id="mondai4">
        <div class="mondai-header">問題4 発話表現</div>
        <div class="mondai-instruction">状況を聞いて、適切な発話を選んでください。</div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">1</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-04/audio/m4_q1.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s4-1')">スクリプトを見る</button>
            <div class="script" id="s4-1"><span class="script-label">スクリプト</span>会議中に急用ができて、席を外さなければなりません。上司に伝えます。なんと言いますか。</div>
            <div class="question" data-answer="3">
                <div class="question-number">問1</div>
                <div class="question-text">なんと言いますか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">会議に出たくないです。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">帰ります。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">申し訳ありませんが、急用ができてしまいまして、少し席を外してもよろしいでしょうか。</span></div>
                </div>
                <div class="explanation">上司への丁寧なお断りとして「〜てもよろしいでしょうか」が適切です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">2</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-04/audio/m4_q2.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s4-2')">スクリプトを見る</button>
            <div class="script" id="s4-2"><span class="script-label">スクリプト</span>レストランで料理を注文しようとしましたが、そのメニューが売り切れでした。別のものを頼みたいです。なんと言いますか。</div>
            <div class="question" data-answer="2">
                <div class="question-number">問2</div>
                <div class="question-text">なんと言いますか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">売り切れは困ります。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">では、こちらのパスタをいただけますか。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">メニューを持ってきてください。</span></div>
                </div>
                <div class="explanation">別のものを注文するときは「〜をいただけますか」が丁寧で適切です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">3</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-04/audio/m4_q3.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s4-3')">スクリプトを見る</button>
            <div class="script" id="s4-3"><span class="script-label">スクリプト</span>道で外国人が地図を見て困っていました。声をかけたいです。なんと言いますか。</div>
            <div class="question" data-answer="1">
                <div class="question-number">問3</div>
                <div class="question-text">なんと言いますか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">何かお困りですか。よかったらご案内しましょうか。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">地図を貸してください。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">ここは日本です。</span></div>
                </div>
                <div class="explanation">困っている人への声かけとして「お困りですか」「ご案内しましょうか」が最も自然です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">4</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-04/audio/m4_q4.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s4-4')">スクリプトを見る</button>
            <div class="script" id="s4-4"><span class="script-label">スクリプト</span>友達から借りた本にコーヒーをこぼして汚してしまいました。謝ります。なんと言いますか。</div>
            <div class="question" data-answer="2">
                <div class="question-number">問4</div>
                <div class="question-text">なんと言いますか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">本が汚れています。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">ごめん、本にコーヒーをこぼしちゃって。弁償するね。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">コーヒーはおいしかった。</span></div>
                </div>
                <div class="explanation">友達への謝罪として「ごめん」と「弁償する」の意思を伝えるのが自然です。</div>
            </div>
        </div>
        </div>

        <!-- 問題5: 即時応答 (9問) -->
        <div class="mondai-section" id="mondai5">
        <div class="mondai-header">問題5 即時応答</div>
        <div class="mondai-instruction">短い文を聞いて、正しい返事を選んでください。</div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">1</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-04/audio/m4_q5.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s5-1')">スクリプトを見る</button>
            <div class="script" id="s5-1"><span class="script-label">スクリプト</span>「お誕生日おめでとうございます。」</div>
            <div class="question" data-answer="3">
                <div class="question-number">問1</div>
                <div class="question-text">返事を選んでください。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">おめでとうございます。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">誕生日は来週です。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">ありがとうございます。</span></div>
                </div>
                <div class="explanation">お祝いの言葉への返答は「ありがとうございます」が自然です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">2</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-04/audio/m4_q6.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s5-2')">スクリプトを見る</button>
            <div class="script" id="s5-2"><span class="script-label">スクリプト</span>「この書類、明日までに確認していただけますか。」</div>
            <div class="question" data-answer="1">
                <div class="question-number">問2</div>
                <div class="question-text">返事を選んでください。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">承知しました。明日までに確認しておきます。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">書類はどこですか。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">明日は休みです。</span></div>
                </div>
                <div class="explanation">依頼への返答として「承知しました」＋内容の確認が自然です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">3</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-04/audio/m4_q7.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s5-3')">スクリプトを見る</button>
            <div class="script" id="s5-3"><span class="script-label">スクリプト</span>「最近、疲れているみたいだけど、大丈夫？」</div>
            <div class="question" data-answer="2">
                <div class="question-number">問3</div>
                <div class="question-text">返事を選んでください。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">疲れていません。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">うん、ちょっと忙しくて。心配してくれてありがとう。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">最近は天気がいいですね。</span></div>
                </div>
                <div class="explanation">心配してくれた相手への自然な返答は状況説明と感謝です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">4</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-04/audio/m4_q8.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s5-4')">スクリプトを見る</button>
            <div class="script" id="s5-4"><span class="script-label">スクリプト</span>「お先に失礼します。」</div>
            <div class="question" data-answer="3">
                <div class="question-number">問4</div>
                <div class="question-text">返事を選んでください。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">いってらっしゃい。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">はじめまして。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">お疲れ様でした。</span></div>
                </div>
                <div class="explanation">職場で先に帰る人への返答は「お疲れ様でした」が自然です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">5</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-04/audio/m4_q9.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s5-5')">スクリプトを見る</button>
            <div class="script" id="s5-5"><span class="script-label">スクリプト</span>「このケーキ、自分で作ったの？すごいね。」</div>
            <div class="question" data-answer="1">
                <div class="question-number">問5</div>
                <div class="question-text">返事を選んでください。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">ありがとう。よかったら食べてみて。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">ケーキは甘いです。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">作りません。</span></div>
                </div>
                <div class="explanation">ほめられたときの自然な返答は感謝と勧めの言葉です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">6</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-04/audio/m4_q10.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s5-6')">スクリプトを見る</button>
            <div class="script" id="s5-6"><span class="script-label">スクリプト</span>「明日の飲み会、来られる？」</div>
            <div class="question" data-answer="2">
                <div class="question-number">問6</div>
                <div class="question-text">返事を選んでください。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">飲み会は楽しいです。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">ごめん、明日は用事があって行けないんだ。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">飲み会はどこですか。</span></div>
                </div>
                <div class="explanation">参加できるかどうか聞かれているので、理由とともに答えます。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">7</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-04/audio/m4_q11.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s5-7')">スクリプトを見る</button>
            <div class="script" id="s5-7"><span class="script-label">スクリプト</span>「いつもお世話になっております。」</div>
            <div class="question" data-answer="3">
                <div class="question-number">問7</div>
                <div class="question-text">返事を選んでください。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">はじめまして。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">よろしくお願いします。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">こちらこそ、お世話になっております。</span></div>
                </div>
                <div class="explanation">ビジネスの挨拶「お世話になっております」への返答は「こちらこそ、お世話になっております」が自然です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">8</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-04/audio/m4_q12.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s5-8')">スクリプトを見る</button>
            <div class="script" id="s5-8"><span class="script-label">スクリプト</span>「先週貸したお金、そろそろ返してもらえる？」</div>
            <div class="question" data-answer="1">
                <div class="question-number">問8</div>
                <div class="question-text">返事を選んでください。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">ごめん、忘れてた。明日持ってくるね。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">お金はどこにありますか。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">先週は楽しかったね。</span></div>
                </div>
                <div class="explanation">お金の返却を求められた場合、謝罪と返却の約束が自然です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">9</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-04/audio/m4_q13.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s5-9')">スクリプトを見る</button>
            <div class="script" id="s5-9"><span class="script-label">スクリプト</span>「この仕事、私にできるかな…」</div>
            <div class="question" data-answer="2">
                <div class="question-number">問9</div>
                <div class="question-text">返事を選んでください。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">仕事は難しいです。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">大丈夫だよ。一緒に頑張ろう。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">できません。</span></div>
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
