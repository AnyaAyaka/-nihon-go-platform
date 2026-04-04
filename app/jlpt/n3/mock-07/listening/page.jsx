'use client'
export default function Page() {
  return (
    <div dangerouslySetInnerHTML={{ __html: `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JLPT N3 Listening - MOCK-07 | Nihon GO!</title>
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
        <h1>JLPT N3 Mock Test 07 - 聴解</h1>
        <div class="nav-back-row">
            <a href="/materials/jlpt/n3/" class="nav-back">&#8592; 問題一覧</a>
        </div>
        <div class="nav">
            <a href="vocabulary.html">語彙</a><a href="grammar.html">文法</a><a href="reading.html">読解</a><a href="listening.html" class="active">聴解</a>
        </div>

        <!-- 問題1: 課題理解 -->
        <div class="mondai-section">
        <div class="mondai-header">問題1 課題理解</div>
        <div class="mondai-instruction">会話を聞いて、質問に答えてください。</div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">1</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-07/audio/m1_q1.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s1-1')">スクリプトを見る</button>
            <div class="script" id="s1-1"><span class="script-label">スクリプト</span>
                <strong>質問：男の人はこの後まず何をしますか。</strong><br><br>
                <span class="speaker female">女：</span>山田さん、明日の会議の準備はできていますか。<br>
                <span class="speaker male">男：</span>資料はできているんですが、まだコピーをしていないんです。<br>
                <span class="speaker female">女：</span>コピーの前に、部長に内容を確認してもらった方がいいですよ。<br>
                <span class="speaker male">男：</span>そうですね。では先に部長に確認してもらってから、コピーします。
            </div>
            <div class="question" data-answer="2">
                <div class="question-number">問1</div>
                <div class="question-text">男の人はこの後まず何をしますか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">資料を作る</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">部長に内容を確認してもらう</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">資料をコピーする</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">会議室を予約する</span></div>
                </div>
                <div class="explanation">「先に部長に確認してもらってから、コピーします」と言っています。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">2</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-07/audio/m1_q2.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s1-2')">スクリプトを見る</button>
            <div class="script" id="s1-2"><span class="script-label">スクリプト</span>
                <strong>質問：女の人はどのコースを選びましたか。</strong><br><br>
                <span class="speaker female">女：</span>すみません、英語コースについて教えてください。<br>
                <span class="speaker male">スタッフ：</span>初級・中級・上級の3コースがあります。英語の日常会話ができる方は中級からがおすすめです。<br>
                <span class="speaker female">女：</span>旅行で簡単な会話はできますが、ビジネス英語は全くわからないんです。<br>
                <span class="speaker male">スタッフ：</span>でしたら中級がちょうどいいかと思います。<br>
                <span class="speaker female">女：</span>じゃあ中級にします。
            </div>
            <div class="question" data-answer="2">
                <div class="question-number">問2</div>
                <div class="question-text">女の人はどのコースを選びましたか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">初級コース</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">中級コース</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">上級コース</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">ビジネスコース</span></div>
                </div>
                <div class="explanation">「じゃあ中級にします」と言っています。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">3</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-07/audio/m1_q3.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s1-3')">スクリプトを見る</button>
            <div class="script" id="s1-3"><span class="script-label">スクリプト</span>
                <strong>質問：女の人はこの後まず何をしますか。</strong><br><br>
                <span class="speaker male">男：</span>イベントの準備、どうする？<br>
                <span class="speaker female">女：</span>まず会場を予約しないと。あ、でも先に参加者の人数を確認しないと会場が選べないな。<br>
                <span class="speaker male">男：</span>じゃあ僕が参加者に連絡するから、君は会場の候補を調べておいて。<br>
                <span class="speaker female">女：</span>わかった。じゃあ先に会場の候補を調べる。
            </div>
            <div class="question" data-answer="3">
                <div class="question-number">問3</div>
                <div class="question-text">女の人はこの後まず何をしますか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">会場を予約する</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">参加者に連絡する</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">会場の候補を調べる</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">人数を確認する</span></div>
                </div>
                <div class="explanation">「先に会場の候補を調べる」と言っています。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">4</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-07/audio/m1_q4.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s1-4')">スクリプトを見る</button>
            <div class="script" id="s1-4"><span class="script-label">スクリプト</span>
                <strong>質問：男の人はどの席を選びましたか。</strong><br><br>
                <span class="speaker male">男：</span>映画のチケットを買いたいんですが。<br>
                <span class="speaker female">係員：</span>本日のS席は残り2席、A席は10席、B席は30席ございます。<br>
                <span class="speaker male">男：</span>S席はいくらですか。<br>
                <span class="speaker female">係員：</span>S席は3,000円、A席は2,000円、B席は1,500円です。<br>
                <span class="speaker male">男：</span>じゃあA席を2枚ください。
            </div>
            <div class="question" data-answer="2">
                <div class="question-number">問4</div>
                <div class="question-text">男の人はどの席を選びましたか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">S席</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">A席</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">B席</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">まだ決めていない</span></div>
                </div>
                <div class="explanation">「じゃあA席を2枚ください」と言っています。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">5</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-07/audio/m1_q5.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s1-5')">スクリプトを見る</button>
            <div class="script" id="s1-5"><span class="script-label">スクリプト</span>
                <strong>質問：二人はどこで昼食を食べることにしましたか。</strong><br><br>
                <span class="speaker female">女：</span>お昼、どこで食べる？あそこのカフェは？<br>
                <span class="speaker male">男：</span>いいけど、今日は込んでそうだな。駅前のそば屋はどう？<br>
                <span class="speaker female">女：</span>そば屋か。でも昨日もそばだったし。イタリアンは？<br>
                <span class="speaker male">男：</span>いいね。じゃあイタリアンにしよう。
            </div>
            <div class="question" data-answer="3">
                <div class="question-number">問5</div>
                <div class="question-text">二人はどこで昼食を食べることにしましたか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">カフェ</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">そば屋</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">イタリアン</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">まだ決めていない</span></div>
                </div>
                <div class="explanation">「じゃあイタリアンにしよう」と決まりました。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">6</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-07/audio/m1_q6.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s1-6')">スクリプトを見る</button>
            <div class="script" id="s1-6"><span class="script-label">スクリプト</span>
                <strong>質問：男の人はこの後まず何をしますか。</strong><br><br>
                <span class="speaker female">女：</span>旅行の準備、どうする？<br>
                <span class="speaker male">男：</span>まずホテルを予約しないと。でもその前に交通手段を決めないとホテルの場所が選べないな。<br>
                <span class="speaker female">女：</span>じゃあ私がホテルを調べるから、あなたは交通手段を調べて。<br>
                <span class="speaker male">男：</span>わかった。じゃあ先に交通手段を調べる。
            </div>
            <div class="question" data-answer="4">
                <div class="question-number">問6</div>
                <div class="question-text">男の人はこの後まず何をしますか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">ホテルを予約する</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">旅行先を決める</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">ホテルを調べる</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">交通手段を調べる</span></div>
                </div>
                <div class="explanation">「じゃあ先に交通手段を調べる」と言っています。</div>
            </div>
        </div>
        </div>

        <!-- 問題2: ポイント理解 -->
        <div class="mondai-section">
        <div class="mondai-header">問題2 ポイント理解</div>
        <div class="mondai-instruction">はじめに質問を聞いてください。それから話を聞いて、答えを選んでください。</div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">1</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-07/audio/m2_q1.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s2-1')">スクリプトを見る</button>
            <div class="script" id="s2-1"><span class="script-label">スクリプト</span>
                <strong>質問：このお知らせはいつから有効ですか。</strong><br><br>
                <span class="speaker male">アナウンス：</span>会員の皆様へお知らせします。来月1日より新しいポイント制度が始まります。1,000円のご購入ごとに10ポイントが付与されます。現在お持ちのポイントは新制度移行後もそのままご利用いただけます。詳しくはウェブサイトをご確認ください。
            </div>
            <div class="question" data-answer="3">
                <div class="question-number">問1</div>
                <div class="question-text">新しいポイント制度はいつから始まりますか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">今日から</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">今月末から</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">来月1日から</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">来年から</span></div>
                </div>
                <div class="explanation">「来月1日より新しいポイント制度が始まります」とあります。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">2</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-07/audio/m2_q2.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s2-2')">スクリプトを見る</button>
            <div class="script" id="s2-2"><span class="script-label">スクリプト</span>
                <strong>質問：男の人はなぜ運動を始めましたか。</strong><br><br>
                <span class="speaker female">女：</span>最近、ジムに通い始めたって聞いたけど。<br>
                <span class="speaker male">男：</span>うん。先月の健康診断で血糖値が高いって言われてね。医者に運動するよう言われたんだ。<br>
                <span class="speaker female">女：</span>大変だったね。<br>
                <span class="speaker male">男：</span>でも始めてみたら気持ちよくて、今は楽しんでやってるよ。
            </div>
            <div class="question" data-answer="2">
                <div class="question-number">問2</div>
                <div class="question-text">男の人はなぜ運動を始めましたか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">友達に誘われたから</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">健康診断で血糖値が高いと言われたから</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">ダイエットをしたいから</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">運動が好きだから</span></div>
                </div>
                <div class="explanation">「健康診断で血糖値が高いって言われて、医者に運動するよう言われた」と言っています。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">3</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-07/audio/m2_q3.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s2-3')">スクリプトを見る</button>
            <div class="script" id="s2-3"><span class="script-label">スクリプト</span>
                <strong>質問：このイベントで一番人気のコーナーは何ですか。</strong><br><br>
                <span class="speaker female">スタッフ：</span>本日の秋祭りのご案内です。一番人気は地元野菜の即売会で、毎年開始直後に売り切れてしまいます。次に人気なのが手作り体験コーナーです。屋台フードも充実していますが、席数に限りがありますのでお早めにどうぞ。
            </div>
            <div class="question" data-answer="1">
                <div class="question-number">問3</div>
                <div class="question-text">このイベントで一番人気のコーナーは何ですか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">地元野菜の即売会</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">手作り体験コーナー</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">屋台フード</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">ステージイベント</span></div>
                </div>
                <div class="explanation">「一番人気は地元野菜の即売会で」と言っています。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">4</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-07/audio/m2_q4.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s2-4')">スクリプトを見る</button>
            <div class="script" id="s2-4"><span class="script-label">スクリプト</span>
                <strong>質問：女の人が料理教室を始めた理由は何ですか。</strong><br><br>
                <span class="speaker male">男：</span>最近、料理教室に通ってるって聞いたけど。<br>
                <span class="speaker female">女：</span>うん。結婚してから料理をする機会が増えたんだけど、レパートリーが少なくて。もっといろんな料理を作れるようになりたくて始めたんだ。<br>
                <span class="speaker male">男：</span>いいね。何か作れるようになった？<br>
                <span class="speaker female">女：</span>和食が少しできるようになったよ。
            </div>
            <div class="question" data-answer="3">
                <div class="question-number">問4</div>
                <div class="question-text">女の人が料理教室を始めた理由は何ですか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">友達に誘われたから</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">料理が嫌いだったから</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">結婚して料理の機会が増え、レパートリーを増やしたかったから</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">プロの料理人になりたいから</span></div>
                </div>
                <div class="explanation">「結婚してから料理をする機会が増えて、レパートリーが少なくて、もっといろんな料理を作れるようになりたくて始めた」と言っています。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">5</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-07/audio/m2_q5.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s2-5')">スクリプトを見る</button>
            <div class="script" id="s2-5"><span class="script-label">スクリプト</span>
                <strong>質問：男の人の仕事は何ですか。</strong><br><br>
                <span class="speaker female">女：</span>鈴木さんはどんなお仕事をされているんですか。<br>
                <span class="speaker male">男：</span>グラフィックデザイナーをしています。主に広告やパッケージのデザインを担当しています。<br>
                <span class="speaker female">女：</span>素敵ですね。ウェブデザインもされるんですか。<br>
                <span class="speaker male">男：</span>少しはやりますが、メインは印刷物のデザインです。
            </div>
            <div class="question" data-answer="2">
                <div class="question-number">問5</div>
                <div class="question-text">男の人の仕事は何ですか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">ウェブデザイナー</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">グラフィックデザイナー</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">カメラマン</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">イラストレーター</span></div>
                </div>
                <div class="explanation">「グラフィックデザイナーをしています」と言っています。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">6</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-07/audio/m2_q6.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s2-6')">スクリプトを見る</button>
            <div class="script" id="s2-6"><span class="script-label">スクリプト</span>
                <strong>質問：日本で最も多く輸出されている農産物は何ですか。</strong><br><br>
                <span class="speaker female">ナレーター：</span>調査によると、日本から最も多く輸出されている農産物はりんごで、次いでぶどう、もも、の順となっています。特にりんごはアジアを中心に人気が高く、輸出量が年々増加しています。
            </div>
            <div class="question" data-answer="1">
                <div class="question-number">問6</div>
                <div class="question-text">日本で最も多く輸出されている農産物は何ですか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">りんご</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">ぶどう</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">もも</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">みかん</span></div>
                </div>
                <div class="explanation">「最も多く輸出されている農産物はりんごで、次いでぶどう」と言っています。</div>
            </div>
        </div>
        </div>

        <!-- 問題3: 概要理解 -->
        <div class="mondai-section">
        <div class="mondai-header">問題3 概要理解</div>
        <div class="mondai-instruction">話を聞いて、話し手が最も言いたいことを選んでください。</div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">1</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-07/audio/m3_q1.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s3-1')">スクリプトを見る</button>
            <div class="script" id="s3-1"><span class="script-label">スクリプト</span>
                <span class="speaker female">女：</span>毎日忙しくて料理をする時間がないという人も多いと思います。でも、週末にまとめて作り置きをしておくだけで、平日の食事の準備がとても楽になります。野菜を切ってゆでておくだけでも十分です。少しの工夫で、バランスのいい食事を続けることができます。
            </div>
            <div class="question" data-answer="3">
                <div class="question-number">問1</div>
                <div class="question-text">この人が一番言いたいことは何ですか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">毎日料理をしなければならない</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">外食の方が便利だ</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">週末の作り置きなど少しの工夫でバランスのいい食事が続けられる</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">料理は難しいのでやめるべきだ</span></div>
                </div>
                <div class="explanation">「少しの工夫で、バランスのいい食事を続けることができます」が主張です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">2</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-07/audio/m3_q2.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s3-2')">スクリプトを見る</button>
            <div class="script" id="s3-2"><span class="script-label">スクリプト</span>
                <span class="speaker male">男：</span>資格を取ることは、就職や転職に有利になるだけでなく、自分の可能性を広げることにもつながります。しかし、資格を取ることが目的になってしまい、実際の仕事に活かせていない人も多いようです。大切なのは、自分のキャリアや目標に合った資格を選び、それを実際の仕事に結びつけることです。
            </div>
            <div class="question" data-answer="4">
                <div class="question-number">問2</div>
                <div class="question-text">この人が一番言いたいことは何ですか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">資格はたくさん取った方がいい</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">資格を取っても意味がない</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">就職のためだけに資格を取るべきだ</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">自分の目標に合った資格を選び、実際の仕事に活かすことが大切だ</span></div>
                </div>
                <div class="explanation">「自分のキャリアや目標に合った資格を選び、それを実際の仕事に結びつけること」が主張です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">3</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-07/audio/m3_q3.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s3-3')">スクリプトを見る</button>
            <div class="script" id="s3-3"><span class="script-label">スクリプト</span>
                <span class="speaker female">先生：</span>子供の頃に読書習慣をつけることはとても大切です。本を読むことで語彙力や読解力が育ちますが、それだけではありません。様々なストーリーや登場人物を通じて、共感する力や想像力も育ちます。無理に難しい本を読ませるのではなく、子供が興味を持てる本から始めることが大切です。
            </div>
            <div class="question" data-answer="2">
                <div class="question-number">問3</div>
                <div class="question-text">先生が一番言いたいことは何ですか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">子供には難しい本を読ませるべきだ</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">子供が興味を持てる本から始めて読書習慣をつけることが大切だ</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">読書より語学学習の方が重要だ</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">大人になってから読書を始めても遅くない</span></div>
                </div>
                <div class="explanation">「子供が興味を持てる本から始めることが大切です」が主張です。</div>
            </div>
        </div>
        </div>

        <!-- 問題4: 発話表現 -->
        <div class="mondai-section">
        <div class="mondai-header">問題4 発話表現</div>
        <div class="mondai-instruction">状況を聞いて、適切な発話を選んでください。</div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">1</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-07/audio/m4_q1.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s4-1')">スクリプトを見る</button>
            <div class="script" id="s4-1"><span class="script-label">スクリプト</span>上司に仕事の締め切りを延ばしてほしいとお願いします。なんと言いますか。</div>
            <div class="question" data-answer="2">
                <div class="question-number">問1</div>
                <div class="question-text">なんと言いますか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">締め切りを延ばしてください。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">申し訳ありませんが、もう少しお時間をいただけますでしょうか。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">締め切りは明日です。</span></div>
                </div>
                <div class="explanation">上司への丁寧なお願いとして「もう少しお時間をいただけますでしょうか」が適切です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">2</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-07/audio/m4_q2.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s4-2')">スクリプトを見る</button>
            <div class="script" id="s4-2"><span class="script-label">スクリプト</span>取引先の方が初めて会社に来ました。案内します。なんと言いますか。</div>
            <div class="question" data-answer="3">
                <div class="question-number">問2</div>
                <div class="question-text">なんと言いますか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">どこに行きますか。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">ここが会社です。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">こちらへどうぞ。会議室にご案内いたします。</span></div>
                </div>
                <div class="explanation">来客を案内するときは「こちらへどうぞ、ご案内いたします」が自然で丁寧な表現です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">3</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-07/audio/m4_q3.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s4-3')">スクリプトを見る</button>
            <div class="script" id="s4-3"><span class="script-label">スクリプト</span>同僚が大事なプレゼンを成功させました。褒めます。なんと言いますか。</div>
            <div class="question" data-answer="1">
                <div class="question-number">問3</div>
                <div class="question-text">なんと言いますか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">お疲れ様でした。プレゼン、すごくよかったですよ。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">プレゼンはどこでしましたか。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">次もがんばってください。</span></div>
                </div>
                <div class="explanation">成功を称えるには「よかったですよ」とほめる言葉が最も自然です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">4</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-07/audio/m4_q4.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s4-4')">スクリプトを見る</button>
            <div class="script" id="s4-4"><span class="script-label">スクリプト</span>上司から仕事を頼まれましたが、今日は予定があって難しいです。断ります。なんと言いますか。</div>
            <div class="question" data-answer="2">
                <div class="question-number">問4</div>
                <div class="question-text">なんと言いますか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">できません。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">申し訳ありませんが、本日は先約がございまして。明日でよろしければ対応いたします。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">仕事は嫌いです。</span></div>
                </div>
                <div class="explanation">上司への断りは「申し訳ありませんが〜できかねます」と代替案を提示するのが丁寧です。</div>
            </div>
        </div>
        </div>

        <!-- 問題5: 即時応答 -->
        <div class="mondai-section">
        <div class="mondai-header">問題5 即時応答</div>
        <div class="mondai-instruction">短い文を聞いて、正しい返事を選んでください。</div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">1</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-07/audio/m4_q5.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s5-1')">スクリプトを見る</button>
            <div class="script" id="s5-1"><span class="script-label">スクリプト</span>「この仕事、引き受けていただけますか。」</div>
            <div class="question" data-answer="2">
                <div class="question-number">問1</div>
                <div class="question-text">返事を選んでください。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">仕事はどこですか。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">はい、喜んでお引き受けします。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">仕事は大変です。</span></div>
                </div>
                <div class="explanation">仕事の依頼を受けるときは「喜んでお引き受けします」が丁寧な返答です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">2</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-07/audio/m4_q6.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s5-2')">スクリプトを見る</button>
            <div class="script" id="s5-2"><span class="script-label">スクリプト</span>「この書類、ファックスで送っていただけますか。」</div>
            <div class="question" data-answer="1">
                <div class="question-number">問2</div>
                <div class="question-text">返事を選んでください。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">かしこまりました。すぐに送ります。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">書類はどこですか。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">ファックスは古いです。</span></div>
                </div>
                <div class="explanation">依頼への返答として「かしこまりました」が最も丁寧です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">3</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-07/audio/m4_q7.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s5-3')">スクリプトを見る</button>
            <div class="script" id="s5-3"><span class="script-label">スクリプト</span>「今日の会議、何時からでしたっけ？」</div>
            <div class="question" data-answer="3">
                <div class="question-number">問3</div>
                <div class="question-text">返事を選んでください。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">会議は好きです。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">会議室は3階です。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">午後2時からですよ。</span></div>
                </div>
                <div class="explanation">会議の時間を聞かれているので、時間を答えるのが自然です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">4</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-07/audio/m4_q8.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s5-4')">スクリプトを見る</button>
            <div class="script" id="s5-4"><span class="script-label">スクリプト</span>「いってきます。」</div>
            <div class="question" data-answer="2">
                <div class="question-number">問4</div>
                <div class="question-text">返事を選んでください。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">ただいま。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">いってらっしゃい。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">おかえり。</span></div>
                </div>
                <div class="explanation">「いってきます」への返答は「いってらっしゃい」が自然です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">5</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-07/audio/m4_q9.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s5-5')">スクリプトを見る</button>
            <div class="script" id="s5-5"><span class="script-label">スクリプト</span>「この仕事、一人でできるかな…」</div>
            <div class="question" data-answer="1">
                <div class="question-number">問5</div>
                <div class="question-text">返事を選んでください。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">大丈夫だよ。困ったら相談して。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">一人は無理です。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">仕事は難しいですね。</span></div>
                </div>
                <div class="explanation">不安を感じている相手への励ましと支援の申し出が自然な返答です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">6</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-07/audio/m4_q10.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s5-6')">スクリプトを見る</button>
            <div class="script" id="s5-6"><span class="script-label">スクリプト</span>「ご注文はお決まりですか。」</div>
            <div class="question" data-answer="3">
                <div class="question-number">問6</div>
                <div class="question-text">返事を選んでください。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">注文はしません。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">メニューはどこですか。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">はい、ラーメンをひとつお願いします。</span></div>
                </div>
                <div class="explanation">注文を聞かれたときは注文する内容を伝えるのが自然です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">7</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-07/audio/m4_q11.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s5-7')">スクリプトを見る</button>
            <div class="script" id="s5-7"><span class="script-label">スクリプト</span>「田中部長はいらっしゃいますか。」</div>
            <div class="question" data-answer="2">
                <div class="question-number">問7</div>
                <div class="question-text">返事を選んでください。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">田中は好きです。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">ただいま席を外しております。すぐ戻りますので少々お待ちください。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">田中はいません。</span></div>
                </div>
                <div class="explanation">来客に対して上司が不在のときは「席を外しております」と丁寧に伝えるのが適切です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">8</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-07/audio/m4_q12.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s5-8')">スクリプトを見る</button>
            <div class="script" id="s5-8"><span class="script-label">スクリプト</span>「昨日の発表、緊張したでしょう？」</div>
            <div class="question" data-answer="1">
                <div class="question-number">問8</div>
                <div class="question-text">返事を選んでください。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">はい、かなり緊張しました。でも無事終わってよかったです。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">発表はどこでしましたか。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">昨日は暑かったですね。</span></div>
                </div>
                <div class="explanation">緊張したかどうかを聞かれているので、正直に答えるのが自然です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">9</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-07/audio/m4_q13.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s5-9')">スクリプトを見る</button>
            <div class="script" id="s5-9"><span class="script-label">スクリプト</span>「この企画書、明日までに仕上がりそう？」</div>
            <div class="question" data-answer="3">
                <div class="question-number">問9</div>
                <div class="question-text">返事を選んでください。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">企画書はどこですか。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">企画書は難しいです。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">はい、今夜中に仕上げます。</span></div>
                </div>
                <div class="explanation">明日までに仕上がるかどうかを聞かれているので、進捗を答えるのが自然です。</div>
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
  )
}
