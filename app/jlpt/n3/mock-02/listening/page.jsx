'use client'
export default function Page() {
  return (
    <div dangerouslySetInnerHTML={{ __html: `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JLPT N3 Listening - MOCK-02 | Nihon GO!</title>
    <style>
        :root {
            --primary: #06b6d4;
            --primary-dark: #0e7490;
            --correct: #28a745;
            --incorrect: #dc3545;
            --bg: #f9fafb;
            --card: #ffffff;
            --border: #e5e7eb;
            --text: #333;
            --text-light: #666;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background: var(--bg);
            color: var(--text);
            line-height: 1.6;
            padding-bottom: 60px;
        }
        .header {
            background: #fff;
            border-bottom: 1px solid var(--border);
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
        .logo span { color: var(--primary); }
        .timer {
            background: #f3f4f6;
            padding: 8px 16px;
            border-radius: 6px;
            font-weight: 600;
            font-size: 1.1em;
        }
        .timer.warning { background: #fef3c7; color: #92400e; }
        .timer.danger { background: #fee2e2; color: #991b1b; }
        .container { max-width: 900px; margin: 0 auto; padding: 20px; }
        h1 { font-size: 1.5em; margin-bottom: 10px; text-align: center; }
        .nav-back-row { padding: 8px 0 4px 0; }
        .nav-back { color: var(--primary); text-decoration: none; font-weight: 600; font-size: 0.95rem; }
        .nav-back:hover { text-decoration: underline; }
        .nav { display: flex; justify-content: center; gap: 8px; padding: 12px 0 20px 0; flex-wrap: wrap; }
        .nav a { padding: 10px 20px; background: #f3f4f6; color: #333; text-decoration: none; border-radius: 8px; font-size: 0.95rem; font-weight: 500; border: 1px solid var(--border); transition: all 0.2s; }
        .nav a:hover { background: #e5e7eb; }
        .nav a.active { background: var(--primary); color: #fff; border-color: var(--primary); }
        .mondai-section {
            background: var(--card);
            border-radius: 12px;
            border: 1px solid var(--border);
            padding: 24px;
            margin-bottom: 24px;
        }
        .mondai-header {
            font-size: 1.1rem;
            font-weight: 700;
            color: var(--primary);
            padding-bottom: 12px;
            border-bottom: 2px solid var(--primary);
            margin-bottom: 8px;
        }
        .mondai-instruction {
            font-size: 0.9rem;
            color: var(--text-light);
            margin-bottom: 20px;
        }
        .scenario-block {
            background: #f8fafc;
            border-radius: 10px;
            padding: 20px;
            margin-bottom: 20px;
            border: 1px solid var(--border);
        }
        .scenario-title {
            font-weight: 700;
            margin-bottom: 12px;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .scenario-number {
            background: var(--primary);
            color: white;
            width: 28px;
            height: 28px;
            border-radius: 50%;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 0.9rem;
            font-weight: 700;
        }
        .audio-player { margin-bottom: 12px; }
        .audio-player audio { width: 100%; }
        .script {
            display: none;
            background: #fffbeb;
            border: 1px solid #fde68a;
            border-radius: 8px;
            padding: 16px;
            margin-bottom: 16px;
            font-size: 0.9rem;
            line-height: 2;
        }
        .script.show { display: block; }
        .script-toggle {
            background: #fef3c7;
            border: 1px solid #fde68a;
            color: #92400e;
            padding: 0.5rem 1rem;
            border-radius: 6px;
            cursor: pointer;
            font-size: 0.85rem;
            margin-bottom: 1rem;
            display: inline-block;
            font-family: inherit;
        }
        .script-toggle:hover { background: #fde68a; }
        .script-label { font-weight: 700; color: #b45309; margin-bottom: 0.75rem; display: block; }
        .speaker { font-weight: 500; }
        .speaker.male { color: #2563eb; }
        .speaker.female { color: #db2777; }
        .question {
            padding: 1rem 0;
            border-bottom: 1px solid var(--border);
        }
        .question:last-child { border-bottom: none; }
        .question-number {
            font-weight: 700;
            color: var(--primary);
            margin-bottom: 0.5rem;
            font-size: 0.9rem;
        }
        .question-text {
            font-size: 1rem;
            margin-bottom: 1rem;
            font-weight: 500;
        }
        .options { display: grid; grid-template-columns: 1fr; gap: 0.5rem; }
        .option {
            padding: 0.75rem 1rem;
            border: 2px solid var(--border);
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }
        .option:hover { border-color: var(--primary); background: rgba(6,182,212,0.05); }
        .option.selected { border-color: var(--primary); background: rgba(6,182,212,0.1); }
        .option.correct { border-color: var(--correct); background: rgba(40,167,69,0.15); }
        .option.incorrect { border-color: var(--incorrect); background: rgba(220,53,69,0.1); }
        .option-label {
            width: 26px;
            height: 26px;
            border-radius: 50%;
            background: var(--border);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.85rem;
            font-weight: 600;
            flex-shrink: 0;
        }
        .option.selected .option-label { background: var(--primary); color: white; }
        .option.correct .option-label { background: var(--correct); color: white; }
        .option.incorrect .option-label { background: var(--incorrect); color: white; }
        .option-text { flex: 1; }
        .explanation {
            margin-top: 1rem;
            padding: 0.875rem;
            background: #ecfeff;
            border-radius: 8px;
            font-size: 0.9rem;
            display: none;
            border-left: 3px solid var(--correct);
        }
        .explanation.show { display: block; }
        .nav-buttons {
            display: flex;
            justify-content: space-between;
            gap: 1rem;
            margin-top: 2rem;
            flex-wrap: wrap;
        }
        .btn {
            padding: 0.875rem 2rem;
            border: none;
            border-radius: 8px;
            font-family: inherit;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            text-decoration: none;
            transition: all 0.2s;
        }
        .btn-primary { background: var(--primary); color: white; }
        .btn-primary:hover { background: var(--primary-dark); }
        .results-modal {
            display: none;
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0,0,0,0.6);
            z-index: 200;
            align-items: center;
            justify-content: center;
        }
        .results-modal.show { display: flex; }
        .results-content {
            background: white;
            padding: 2rem;
            border-radius: 16px;
            max-width: 420px;
            width: 90%;
            text-align: center;
        }
        .results-score { font-size: 3rem; font-weight: 700; color: var(--primary); }
        .results-label { color: var(--text-light); margin: 0.5rem 0 1.5rem; }
        .results-home { display: inline-block; padding: 0.875rem 2rem; background: var(--primary); color: white; border-radius: 8px; text-decoration: none; font-weight: 600; }
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
        <h1>JLPT N3 Mock Test 02 - 聴解</h1>
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
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-02/audio/m1_q1.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s1-1')">スクリプトを見る</button>
            <div class="script" id="s1-1"><span class="script-label">スクリプト</span>
                <strong>質問：女の人はこの後まず何をしますか。</strong><br><br>
                <span class="speaker male">男：</span>田中さん、来週の発表の準備はどう？<br>
                <span class="speaker female">女：</span>スライドはほぼできてるんですが、データの確認がまだなんです。<br>
                <span class="speaker male">男：</span>発表は来週の月曜だから、データを先に確認した方がいいんじゃない？<br>
                <span class="speaker female">女：</span>そうですね。じゃあ今日中にデータを確認して、明日スライドを仕上げます。
            </div>
            <div class="question" data-answer="2">
                <div class="question-number">問1</div>
                <div class="question-text">女の人はこの後まず何をしますか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">スライドを仕上げる</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">データを確認する</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">発表の練習をする</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">男の人に相談する</span></div>
                </div>
                <div class="explanation">「今日中にデータを確認して、明日スライドを仕上げます」と言っています。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">2</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-02/audio/m1_q2.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s1-2')">スクリプトを見る</button>
            <div class="script" id="s1-2"><span class="script-label">スクリプト</span>
                <strong>質問：男の人は何を買いに行きますか。</strong><br><br>
                <span class="speaker female">女：</span>あ、お醤油がなくなってたよ。<br>
                <span class="speaker male">男：</span>そうか。じゃあスーパーに行ってくるよ。他に何か必要なものある？<br>
                <span class="speaker female">女：</span>えーと、卵もなかったと思う。あと牛乳も。<br>
                <span class="speaker male">男：</span>わかった。じゃあ醤油と卵と牛乳ね。
            </div>
            <div class="question" data-answer="3">
                <div class="question-number">問2</div>
                <div class="question-text">男の人は何を買いに行きますか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">醤油だけ</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">醤油と卵</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">醤油と卵と牛乳</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">卵と牛乳</span></div>
                </div>
                <div class="explanation">「醤油と卵と牛乳」を買いに行くと確認しました。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">3</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-02/audio/m1_q3.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s1-3')">スクリプトを見る</button>
            <div class="script" id="s1-3"><span class="script-label">スクリプト</span>
                <strong>質問：男の人はどのクラスに申し込みましたか。</strong><br><br>
                <span class="speaker female">受付：</span>いらっしゃいませ。どのクラスをご希望ですか。<br>
                <span class="speaker male">男：</span>水曜日の夜のクラスはありますか。<br>
                <span class="speaker female">受付：</span>水曜の夜は19時からと21時からがございます。<br>
                <span class="speaker male">男：</span>21時は遅いので、19時のにします。
            </div>
            <div class="question" data-answer="2">
                <div class="question-number">問3</div>
                <div class="question-text">男の人はどのクラスに申し込みましたか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">水曜19時</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">水曜19時</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">水曜21時</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">木曜19時</span></div>
                </div>
                <div class="explanation">「21時は遅いので、19時のにします」と言っています。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">4</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-02/audio/m1_q4.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s1-4')">スクリプトを見る</button>
            <div class="script" id="s1-4"><span class="script-label">スクリプト</span>
                <strong>質問：二人はどこで待ち合わせますか。</strong><br><br>
                <span class="speaker female">女：</span>明日の待ち合わせ、どこにする？<br>
                <span class="speaker male">男：</span>駅の改札前はどうかな？<br>
                <span class="speaker female">女：</span>土曜は混むから、駅の近くのコーヒーショップにしない？<br>
                <span class="speaker male">男：</span>いいね。じゃあそこにしよう。
            </div>
            <div class="question" data-answer="4">
                <div class="question-number">問4</div>
                <div class="question-text">二人はどこで待ち合わせますか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">駅の改札前</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">駅のホーム</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">レストラン</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">駅の近くのコーヒーショップ</span></div>
                </div>
                <div class="explanation">「駅の近くのコーヒーショップ」で待ち合わせると決まりました。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">5</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-02/audio/m1_q5.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s1-5')">スクリプトを見る</button>
            <div class="script" id="s1-5"><span class="script-label">スクリプト</span>
                <strong>質問：男の子はいつ宿題をしますか。</strong><br><br>
                <span class="speaker female">母：</span>ケンタ、宿題は？<br>
                <span class="speaker male">ケンタ：</span>今日は野球の練習があるから、帰ってきてからやる。<br>
                <span class="speaker female">母：</span>帰りは何時になるの？<br>
                <span class="speaker male">ケンタ：</span>7時ごろかな。夕ご飯食べてから、8時から始めるよ。
            </div>
            <div class="question" data-answer="3">
                <div class="question-number">問5</div>
                <div class="question-text">男の子はいつ宿題をしますか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">野球の練習の前</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">帰宅してすぐ</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">夕ご飯を食べた後、8時から</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">7時から</span></div>
                </div>
                <div class="explanation">「夕ご飯食べてから、8時から始める」と言っています。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">6</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-02/audio/m1_q6.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s1-6')">スクリプトを見る</button>
            <div class="script" id="s1-6"><span class="script-label">スクリプト</span>
                <strong>質問：女の人はこれからどうしますか。</strong><br><br>
                <span class="speaker male">男：</span>あれ、傘持ってこなかったの？外、雨降ってるよ。<br>
                <span class="speaker female">女：</span>え、本当だ。天気予報見てなかった。<br>
                <span class="speaker male">男：</span>コンビニで買う？<br>
                <span class="speaker female">女：</span>いや、タクシーで帰ることにする。お金がかかるけど仕方ない。
            </div>
            <div class="question" data-answer="2">
                <div class="question-number">問6</div>
                <div class="question-text">女の人はこれからどうしますか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">コンビニで傘を買う</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">タクシーで帰る</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">雨がやむまで待つ</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">男の人の傘を借りる</span></div>
                </div>
                <div class="explanation">「タクシーで帰ることにする」と言いました。</div>
            </div>
        </div>
        </div>

        <!-- 問題2: ポイント理解 (6問) -->
        <div class="mondai-section" id="mondai2">
        <div class="mondai-header">問題2 ポイント理解</div>
        <div class="mondai-instruction">はじめに質問を聞いてください。それから話を聞いて、答えを選んでください。</div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">1</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-02/audio/m2_q1.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s2-1')">スクリプトを見る</button>
            <div class="script" id="s2-1"><span class="script-label">スクリプト</span>
                <strong>質問：この店で一番人気のメニューは何ですか。</strong><br><br>
                <span class="speaker female">店員：</span>いらっしゃいませ。今日のおすすめは抹茶パフェです。でも一番人気はチョコレートケーキで、毎日早い時間に売り切れます。次に人気なのがフルーツタルトです。
            </div>
            <div class="question" data-answer="2">
                <div class="question-number">問1</div>
                <div class="question-text">この店で一番人気のメニューは何ですか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">抹茶パフェ</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">チョコレートケーキ</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">フルーツタルト</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">プリン</span></div>
                </div>
                <div class="explanation">「一番人気はチョコレートケーキ」と言っています。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">2</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-02/audio/m2_q2.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s2-2')">スクリプトを見る</button>
            <div class="script" id="s2-2"><span class="script-label">スクリプト</span>
                <strong>質問：女の人が英語の勉強を始めた理由は何ですか。</strong><br><br>
                <span class="speaker male">男：</span>最近、英語の勉強してるんだって？<br>
                <span class="speaker female">女：</span>うん。来年、海外の取引先を担当することになったから。<br>
                <span class="speaker male">男：</span>大変だね。<br>
                <span class="speaker female">女：</span>でも、もともと海外に行きたいって気持ちもあったし、いい機会だと思って。
            </div>
            <div class="question" data-answer="1">
                <div class="question-number">問2</div>
                <div class="question-text">女の人が英語の勉強を始めた理由は何ですか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">海外の取引先を担当することになったから</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">海外に旅行したいから</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">英語が好きだから</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">上司に勧められたから</span></div>
                </div>
                <div class="explanation">「来年、海外の取引先を担当することになったから」が直接の理由です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">3</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-02/audio/m2_q3.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s2-3')">スクリプトを見る</button>
            <div class="script" id="s2-3"><span class="script-label">スクリプト</span>
                <strong>質問：市民プールの利用時間はいつですか。</strong><br><br>
                <span class="speaker male">アナウンス：</span>市民プールからのお知らせです。7月から9月の夏季期間は、午前9時から午後8時まで営業しております。ただし、水曜日は定期清掃のため、午後1時からの営業となります。10月からは通常通り、午前10時から午後6時の営業となります。
            </div>
            <div class="question" data-answer="3">
                <div class="question-number">問3</div>
                <div class="question-text">夏季期間の水曜日、プールは何時から使えますか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">午前9時から</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">午前10時から</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">午後1時から</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">午後6時から</span></div>
                </div>
                <div class="explanation">「水曜日は定期清掃のため、午後1時からの営業」と言っています。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">4</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-02/audio/m2_q4.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s2-4')">スクリプトを見る</button>
            <div class="script" id="s2-4"><span class="script-label">スクリプト</span>
                <strong>質問：男の人が料理教室に通い始めた理由は何ですか。</strong><br><br>
                <span class="speaker female">女：</span>山本さん、最近料理教室に通ってるって本当？<br>
                <span class="speaker male">男：</span>うん。一人暮らしを始めてから、ずっと外食ばかりだったから、健康が心配になって。<br>
                <span class="speaker female">女：</span>えらいね。楽しい？<br>
                <span class="speaker male">男：</span>最初は大変だったけど、今は楽しいよ。料理って面白いね。
            </div>
            <div class="question" data-answer="2">
                <div class="question-number">問4</div>
                <div class="question-text">男の人が料理教室に通い始めた理由は何ですか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">料理が好きだから</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">健康が心配になったから</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">一人暮らしが楽しいから</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">友達に誘われたから</span></div>
                </div>
                <div class="explanation">「健康が心配になって」が理由です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">5</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-02/audio/m2_q5.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s2-5')">スクリプトを見る</button>
            <div class="script" id="s2-5"><span class="script-label">スクリプト</span>
                <strong>質問：女の人の趣味はどれですか。</strong><br><br>
                <span class="speaker male">男：</span>鈴木さんって、休日は何してるんですか。<br>
                <span class="speaker female">女：</span>最近はハイキングにはまってます。山に登って、おいしいものを食べて帰るのが好きで。<br>
                <span class="speaker male">男：</span>いいですね。写真も撮ったりしますか。<br>
                <span class="speaker female">女：</span>写真は苦手なので、景色を目で楽しむようにしてます。
            </div>
            <div class="question" data-answer="3">
                <div class="question-number">問5</div>
                <div class="question-text">女の人の趣味はどれですか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">写真撮影</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">料理</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">ハイキング</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">旅行</span></div>
                </div>
                <div class="explanation">「ハイキングにはまってます」と言っています。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">6</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-02/audio/m2_q6.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s2-6')">スクリプトを見る</button>
            <div class="script" id="s2-6"><span class="script-label">スクリプト</span>
                <strong>質問：研究によると、集中力が続くのは何分ですか。</strong><br><br>
                <span class="speaker male">ナレーター：</span>最近の研究によると、人間の集中力が続くのは平均25分程度だと言われています。それ以上続けると効率が落ちるため、25分作業して5分休憩するサイクルが効果的だという研究結果が出ています。
            </div>
            <div class="question" data-answer="2">
                <div class="question-number">問6</div>
                <div class="question-text">研究によると、集中力が続くのは何分ですか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">5分</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">25分</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">30分</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">60分</span></div>
                </div>
                <div class="explanation">「集中力が続くのは平均25分程度」と言っています。</div>
            </div>
        </div>
        </div>

        <!-- 問題3: 概要理解 (3問) -->
        <div class="mondai-section" id="mondai3">
        <div class="mondai-header">問題3 概要理解</div>
        <div class="mondai-instruction">話を聞いて、話し手が最も言いたいことを選んでください。</div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">1</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-02/audio/m3_q1.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s3-1')">スクリプトを見る</button>
            <div class="script" id="s3-1"><span class="script-label">スクリプト</span>
                <span class="speaker male">男：</span>日本語を勉強している人からよく「どうすれば上手くなりますか」と聞かれます。私は必ず「毎日少しでいいので話す機会を作ってください」と答えます。文法を覚えることも大切ですが、実際に使わないと身につきません。間違えることを恐れず、どんどん話してみてください。
            </div>
            <div class="question" data-answer="2">
                <div class="question-number">問1</div>
                <div class="question-text">この人が一番言いたいことは何ですか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">文法を完璧に覚えることが大切だ</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">実際に話す機会を作ることが上達への近道だ</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">間違えないように慎重に話すべきだ</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">日本語の勉強は毎日長時間やるべきだ</span></div>
                </div>
                <div class="explanation">「毎日少しでいいので話す機会を作ってください」「実際に使わないと身につかない」が主張です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">2</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-02/audio/m3_q2.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s3-2')">スクリプトを見る</button>
            <div class="script" id="s3-2"><span class="script-label">スクリプト</span>
                <span class="speaker female">女：</span>環境のためにペットボトルをリサイクルすることはもちろん大切です。でも、それ以上に大切なのは、そもそもペットボトルを使う量を減らすことです。マイボトルを持ち歩くだけで、大きく貢献できます。リサイクルより、まず使わないことを考えましょう。
            </div>
            <div class="question" data-answer="3">
                <div class="question-number">問2</div>
                <div class="question-text">女の人が一番言いたいことは何ですか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">ペットボトルをリサイクルすることが大切だ</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">マイボトルはとても便利だ</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">リサイクルより、ペットボトルを使う量を減らすことが重要だ</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">環境問題は解決できない</span></div>
                </div>
                <div class="explanation">「リサイクルより、まず使わないことを考えましょう」が主張です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">3</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-02/audio/m3_q3.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s3-3')">スクリプトを見る</button>
            <div class="script" id="s3-3"><span class="script-label">スクリプト</span>
                <span class="speaker male">先生：</span>テストの点数だけで自分の能力を判断しないでください。点数は一つの参考にすぎません。大切なのは、間違えた問題を理解して次に活かすことです。失敗から学ぶ姿勢こそが、長期的な成長につながります。
            </div>
            <div class="question" data-answer="2">
                <div class="question-number">問3</div>
                <div class="question-text">先生が一番言いたいことは何ですか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">テストで高い点数を取ることが一番大切だ</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">失敗から学ぶ姿勢が成長につながる</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">テストは受けない方がいい</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">点数が低くても気にしなくていい</span></div>
                </div>
                <div class="explanation">「失敗から学ぶ姿勢こそが、長期的な成長につながります」が主張です。</div>
            </div>
        </div>
        </div>

        <!-- 問題4: 発話表現 (4問) -->
        <div class="mondai-section" id="mondai4">
        <div class="mondai-header">問題4 発話表現</div>
        <div class="mondai-instruction">状況を聞いて、適切な発話を選んでください。</div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">1</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-02/audio/m4_q1.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s4-1')">スクリプトを見る</button>
            <div class="script" id="s4-1"><span class="script-label">スクリプト</span>友人が新しい仕事を始めたと聞きました。お祝いの言葉をかけます。なんと言いますか。</div>
            <div class="question" data-answer="2">
                <div class="question-number">問1</div>
                <div class="question-text">なんと言いますか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">新しい仕事、大変だね。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">新しい仕事、頑張ってね。応援してるよ。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">新しい仕事はどこですか。</span></div>
                </div>
                <div class="explanation">お祝いと激励の言葉として「頑張ってね。応援してるよ」が最も自然です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">2</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-02/audio/m4_q2.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s4-2')">スクリプトを見る</button>
            <div class="script" id="s4-2"><span class="script-label">スクリプト</span>図書館で本を探しています。司書にどこにあるか聞きたいです。なんと言いますか。</div>
            <div class="question" data-answer="1">
                <div class="question-number">問2</div>
                <div class="question-text">なんと言いますか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">すみません、日本史に関する本はどこにありますか。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">本を取ってください。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">本があります。</span></div>
                </div>
                <div class="explanation">場所を丁寧に尋ねる表現として「〜はどこにありますか」が適切です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">3</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-02/audio/m4_q3.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s4-3')">スクリプトを見る</button>
            <div class="script" id="s4-3"><span class="script-label">スクリプト</span>先生が説明してくれましたが、よく理解できませんでした。もう一度説明してもらいたいです。なんと言いますか。</div>
            <div class="question" data-answer="3">
                <div class="question-number">問3</div>
                <div class="question-text">なんと言いますか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">説明が下手です。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">もう一度言いなさい。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">申し訳ありませんが、もう一度説明していただけますか。</span></div>
                </div>
                <div class="explanation">再説明を丁寧にお願いする表現として「〜していただけますか」が適切です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">4</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-02/audio/m4_q4.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s4-4')">スクリプトを見る</button>
            <div class="script" id="s4-4"><span class="script-label">スクリプト</span>友人の家でパーティーに招待されました。帰るときに感謝を伝えたいです。なんと言いますか。</div>
            <div class="question" data-answer="2">
                <div class="question-number">問4</div>
                <div class="question-text">なんと言いますか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">パーティーはどうでしたか。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">今日はお招きいただきありがとうございました。とても楽しかったです。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">またパーティーをしてください。</span></div>
                </div>
                <div class="explanation">招いてくれた感謝を丁寧に伝える表現として「お招きいただきありがとうございました」が適切です。</div>
            </div>
        </div>
        </div>

        <!-- 問題5: 即時応答 (9問) -->
        <div class="mondai-section" id="mondai5">
        <div class="mondai-header">問題5 即時応答</div>
        <div class="mondai-instruction">短い文を聞いて、正しい返事を選んでください。</div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">1</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-02/audio/m4_q5.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s5-1')">スクリプトを見る</button>
            <div class="script" id="s5-1"><span class="script-label">スクリプト</span>「今日の会議、何時からでしたっけ？」</div>
            <div class="question" data-answer="2">
                <div class="question-number">問1</div>
                <div class="question-text">返事を選んでください。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">会議室は3階です。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">午後2時からだったと思います。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">会議は長いです。</span></div>
                </div>
                <div class="explanation">時間を尋ねられたので、時間を答えます。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">2</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-02/audio/m4_q6.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s5-2')">スクリプトを見る</button>
            <div class="script" id="s5-2"><span class="script-label">スクリプト</span>「この荷物、重そうですね。手伝いましょうか。」</div>
            <div class="question" data-answer="1">
                <div class="question-number">問2</div>
                <div class="question-text">返事を選んでください。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">ありがとうございます。助かります。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">荷物を持っています。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">重くありません。</span></div>
                </div>
                <div class="explanation">手伝いを申し出られたときの自然な返答は感謝の言葉です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">3</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-02/audio/m4_q7.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s5-3')">スクリプトを見る</button>
            <div class="script" id="s5-3"><span class="script-label">スクリプト</span>「この資料、コピーしておいてもらえますか。10部お願いします。」</div>
            <div class="question" data-answer="3">
                <div class="question-number">問3</div>
                <div class="question-text">返事を選んでください。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">コピー機はあそこです。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">資料を読みました。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">かしこまりました。10部ですね。</span></div>
                </div>
                <div class="explanation">依頼を受けたときは「かしこまりました」＋確認が自然です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">4</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-02/audio/m4_q8.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s5-4')">スクリプトを見る</button>
            <div class="script" id="s5-4"><span class="script-label">スクリプト</span>「すみません、今ちょっとよろしいですか。」</div>
            <div class="question" data-answer="1">
                <div class="question-number">問4</div>
                <div class="question-text">返事を選んでください。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">ええ、何でしょうか。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">すみませんでした。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">よろしくお願いします。</span></div>
                </div>
                <div class="explanation">「よろしいですか」という呼びかけへの返答として「何でしょうか」が自然です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">5</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-02/audio/m4_q9.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s5-5')">スクリプトを見る</button>
            <div class="script" id="s5-5"><span class="script-label">スクリプト</span>「お先に失礼します。」</div>
            <div class="question" data-answer="2">
                <div class="question-number">問5</div>
                <div class="question-text">返事を選んでください。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">いってらっしゃい。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">お疲れ様でした。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">ありがとうございます。</span></div>
                </div>
                <div class="explanation">職場で先に帰る人への返答は「お疲れ様でした」が自然です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">6</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-02/audio/m4_q10.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s5-6')">スクリプトを見る</button>
            <div class="script" id="s5-6"><span class="script-label">スクリプト</span>「レポートの締め切りって、明日でしたよね？」</div>
            <div class="question" data-answer="3">
                <div class="question-number">問6</div>
                <div class="question-text">返事を選んでください。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">レポートは長いです。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">はい、締め切りがあります。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">いいえ、今週の金曜日ですよ。</span></div>
                </div>
                <div class="explanation">確認の質問に対して、正しい情報を教える返答です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">7</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-02/audio/m4_q11.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s5-7')">スクリプトを見る</button>
            <div class="script" id="s5-7"><span class="script-label">スクリプト</span>「このプリント、田中さんに渡しておいてもらえますか。」</div>
            <div class="question" data-answer="1">
                <div class="question-number">問7</div>
                <div class="question-text">返事を選んでください。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">わかりました。田中さんに渡しておきます。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">プリントがあります。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">田中さんはいません。</span></div>
                </div>
                <div class="explanation">伝言を頼まれたときは内容を確認しながら承諾します。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">8</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-02/audio/m4_q12.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s5-8')">スクリプトを見る</button>
            <div class="script" id="s5-8"><span class="script-label">スクリプト</span>「今日は本当にありがとうございました。おかげで助かりました。」</div>
            <div class="question" data-answer="2">
                <div class="question-number">問8</div>
                <div class="question-text">返事を選んでください。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">ありがとうございます。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">いいえ、お役に立てて良かったです。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">助かりました。</span></div>
                </div>
                <div class="explanation">感謝されたときの謙虚な返答として「お役に立てて良かった」が自然です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">9</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-02/audio/m4_q13.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s5-9')">スクリプトを見る</button>
            <div class="script" id="s5-9"><span class="script-label">スクリプト</span>「部長、少しお時間よろしいでしょうか。」</div>
            <div class="question" data-answer="1">
                <div class="question-number">問9</div>
                <div class="question-text">返事を選んでください。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">ああ、いいよ。何かな。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">時間があります。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">よろしくお願いします。</span></div>
                </div>
                <div class="explanation">部下からの声かけに対して上司が承諾する自然な返答です。</div>
            </div>
        </div>
        </div>

        <div class="nav-buttons">
            <button class="btn btn-primary" onclick="submitAll()">採点する</button>
        </div>
    </div>

    <div class="results-modal" id="resultsModal">
        <div class="results-content">
            <div class="results-score" id="resultsScore"></div>
            <div class="results-label">聴解セクション完了</div>
            <a href="/materials/jlpt/n3/" class="results-home">問題一覧に戻る</a>
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
            if (timeLeft <= 0) { clearInterval(timer); submitAll(); }
        }, 1000);

        function toggleScript(id) {
            const el = document.getElementById(id);
            el.classList.toggle('show');
        }

        document.querySelectorAll('.option').forEach(opt => {
            opt.addEventListener('click', function() {
                this.closest('.question').querySelectorAll('.option').forEach(o => o.classList.remove('selected'));
                this.classList.add('selected');
            });
        });

        function submitAll() {
            clearInterval(timer);
            let correct = 0;
            let total = 0;
            document.querySelectorAll('.question').forEach(q => {
                total++;
                const answer = q.dataset.answer;
                const selected = q.querySelector('.option.selected');
                const expl = q.querySelector('.explanation');
                q.querySelectorAll('.option').forEach(opt => {
                    if (opt.dataset.value === answer) opt.classList.add('correct');
                });
                if (selected) {
                    if (selected.dataset.value === answer) correct++;
                    else selected.classList.add('incorrect');
                }
                if (expl) expl.classList.add('show');
            });
            document.getElementById('resultsScore').textContent = correct + ' / ' + total;
            document.getElementById('resultsModal').classList.add('show');
        }
    </script>
<div style="text-align: center; padding: 30px 20px; background: #f8fafc; border-top: 1px solid #e5e7eb; margin-top: 40px;"><p style="color: #6b7280; font-size: 0.85rem; margin: 0;">Original JLPT practice content created by <a href="https://nihongo-world.com" style="color: #fb7185; text-decoration: none; font-weight: 500;">Nihon GO! World</a></p><p style="color: #9ca3af; font-size: 0.8rem; margin-top: 8px;">Free for personal use &bull; Government-certified teachers</p></div></body>
</html>
` }} />
  )
}
