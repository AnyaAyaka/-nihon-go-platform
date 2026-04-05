'use client'
import AccessCheck from '../../../../AccessCheck'

export default function Page() {
  return (
    <>
      <AccessCheck level="N3" mockNum={10} />
      <div dangerouslySetInnerHTML={{ __html: `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JLPT N3 Listening - MOCK-10 | Nihon GO!</title>
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
        <h1>JLPT N3 Mock Test 10 - 聴解</h1>
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
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-10/audio/m1_q1.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s1-1')">スクリプトを見る</button>
            <div class="script" id="s1-1"><span class="script-label">スクリプト</span>
                <strong>質問：女の人はこの後まず何をしますか。</strong><br><br>
                <span class="speaker male">男：</span>山本さん、新製品の説明資料、できましたか。<br>
                <span class="speaker female">女：</span>文章はできているんですが、写真をまだ追加していないんです。<br>
                <span class="speaker male">男：</span>写真を入れる前に、一度営業部長にチェックしてもらった方がいいですよ。<br>
                <span class="speaker female">女：</span>そうですね。では先に部長に確認してもらいます。
            </div>
            <div class="question" data-answer="2">
                <div class="question-number">問1</div>
                <div class="question-text">女の人はこの後まず何をしますか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">写真を追加する</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">部長に資料を確認してもらう</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">文章を修正する</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">新製品の資料を作り直す</span></div>
                </div>
                <div class="explanation">「先に部長に確認してもらいます」と言っています。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">2</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-10/audio/m1_q2.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s1-2')">スクリプトを見る</button>
            <div class="script" id="s1-2"><span class="script-label">スクリプト</span>
                <strong>質問：二人はどこで待ち合わせることにしましたか。</strong><br><br>
                <span class="speaker female">女：</span>明日の待ち合わせ、どこにする？<br>
                <span class="speaker male">男：</span>駅の南口はどう？<br>
                <span class="speaker female">女：</span>南口は工事中だよ。北口の方がわかりやすくない？<br>
                <span class="speaker male">男：</span>そうだね。じゃあ北口にしよう。
            </div>
            <div class="question" data-answer="3">
                <div class="question-number">問2</div>
                <div class="question-text">二人はどこで待ち合わせることにしましたか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">駅の南口</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">駅の東口</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">駅の北口</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">駅の西口</span></div>
                </div>
                <div class="explanation">「じゃあ北口にしよう」と決まりました。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">3</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-10/audio/m1_q3.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s1-3')">スクリプトを見る</button>
            <div class="script" id="s1-3"><span class="script-label">スクリプト</span>
                <strong>質問：男の人はこの後まず何をしますか。</strong><br><br>
                <span class="speaker female">女：</span>発表会の準備、どうする？<br>
                <span class="speaker male">男：</span>まずスライドを作らないと。でもその前に発表の流れを決めないとスライドが作れないな。<br>
                <span class="speaker female">女：</span>じゃあ私がスライドのデザインを考えるから、あなたは発表の流れを決めて。<br>
                <span class="speaker male">男：</span>わかった。じゃあまず発表の流れを決める。
            </div>
            <div class="question" data-answer="4">
                <div class="question-number">問3</div>
                <div class="question-text">男の人はこの後まず何をしますか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">スライドを作る</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">スライドのデザインを考える</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">発表の練習をする</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">発表の流れを決める</span></div>
                </div>
                <div class="explanation">「まず発表の流れを決める」と言っています。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">4</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-10/audio/m1_q4.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s1-4')">スクリプトを見る</button>
            <div class="script" id="s1-4"><span class="script-label">スクリプト</span>
                <strong>質問：女の人はどのランチセットを選びましたか。</strong><br><br>
                <span class="speaker female">女：</span>ランチセット、AとBとCがあるけど、どれにしよう。<br>
                <span class="speaker male">男：</span>AはパスタでBは定食でCはカレーだよ。<br>
                <span class="speaker female">女：</span>昨日もカレー食べたから、今日はパスタにしようかな。でも定食の方がボリュームあっていいな。<br>
                <span class="speaker male">男：</span>じゃあBにしたら？<br>
                <span class="speaker female">女：</span>そうする。Bにします。
            </div>
            <div class="question" data-answer="2">
                <div class="question-number">問4</div>
                <div class="question-text">女の人はどのランチセットを選びましたか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">Aセット（パスタ）</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">Bセット（定食）</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">Cセット（カレー）</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">まだ決めていない</span></div>
                </div>
                <div class="explanation">「Bにします」と言っています。Bは定食です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">5</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-10/audio/m1_q5.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s1-5')">スクリプトを見る</button>
            <div class="script" id="s1-5"><span class="script-label">スクリプト</span>
                <strong>質問：二人は何を買うことにしましたか。</strong><br><br>
                <span class="speaker female">女：</span>部長へのお祝いの品、何にする？<br>
                <span class="speaker male">男：</span>お菓子はどう？<br>
                <span class="speaker female">女：</span>部長は甘いものが苦手だから、お茶かコーヒーの方がいいんじゃない？<br>
                <span class="speaker male">男：</span>コーヒーが好きだって聞いたことあるよ。じゃあコーヒーにしよう。<br>
                <span class="speaker female">女：</span>いいね、そうしよう。
            </div>
            <div class="question" data-answer="3">
                <div class="question-number">問5</div>
                <div class="question-text">二人は何を買うことにしましたか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">お菓子</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">お茶</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">コーヒー</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">まだ決めていない</span></div>
                </div>
                <div class="explanation">「じゃあコーヒーにしよう」「そうしよう」と決まりました。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">6</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-10/audio/m1_q6.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s1-6')">スクリプトを見る</button>
            <div class="script" id="s1-6"><span class="script-label">スクリプト</span>
                <strong>質問：男の人はこの後まず何をしますか。</strong><br><br>
                <span class="speaker female">女：</span>ウェブサイトのリニューアル、どこから始める？<br>
                <span class="speaker male">男：</span>まずデザインを変えないと。でもその前にユーザーの意見を集めないと方向性が決まらないな。<br>
                <span class="speaker female">女：</span>じゃあ私がデザイン案を考えるから、あなたはアンケートを取って。<br>
                <span class="speaker male">男：</span>わかった。じゃあまずアンケートを作る。
            </div>
            <div class="question" data-answer="1">
                <div class="question-number">問6</div>
                <div class="question-text">男の人はこの後まず何をしますか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">アンケートを作る</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">デザイン案を考える</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">ウェブサイトを更新する</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">ユーザーに連絡する</span></div>
                </div>
                <div class="explanation">「まずアンケートを作る」と言っています。</div>
            </div>
        </div>
        </div>

        <!-- 問題2: ポイント理解 -->
        <div class="mondai-section">
        <div class="mondai-header">問題2 ポイント理解</div>
        <div class="mondai-instruction">はじめに質問を聞いてください。それから話を聞いて、答えを選んでください。</div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">1</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-10/audio/m2_q1.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s2-1')">スクリプトを見る</button>
            <div class="script" id="s2-1"><span class="script-label">スクリプト</span>
                <strong>質問：このプールの営業時間は何時から何時までですか。</strong><br><br>
                <span class="speaker male">アナウンス：</span>市民プールからのお知らせです。本日より夏季営業時間に変更となります。平日は午前9時から午後8時まで、土日祝日は午前8時から午後9時まで営業いたします。なお、水曜日は清掃のため午後3時に閉館いたします。
            </div>
            <div class="question" data-answer="2">
                <div class="question-number">問1</div>
                <div class="question-text">平日の営業時間は何時から何時までですか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">午前8時から午後9時</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">午前9時から午後8時</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">午前9時から午後9時</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">午前8時から午後8時</span></div>
                </div>
                <div class="explanation">「平日は午前9時から午後8時まで」とあります。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">2</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-10/audio/m2_q2.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s2-2')">スクリプトを見る</button>
            <div class="script" id="s2-2"><span class="script-label">スクリプト</span>
                <strong>質問：男の人はなぜ引越しを考えていますか。</strong><br><br>
                <span class="speaker female">女：</span>引越し考えてるって聞いたけど、何かあったの？<br>
                <span class="speaker male">男：</span>今の部屋、駅からちょっと遠くて毎日通勤が大変で。もっと駅近の物件に住みたいんだ。<br>
                <span class="speaker female">女：</span>確かに遠いよね。<br>
                <span class="speaker male">男：</span>家賃は上がるけど、時間の節約の方が大事かなと思って。
            </div>
            <div class="question" data-answer="1">
                <div class="question-number">問2</div>
                <div class="question-text">男の人はなぜ引越しを考えていますか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">駅から遠くて通勤が大変だから</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">家賃が高すぎるから</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">部屋が狭いから</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">近所の人との関係が悪いから</span></div>
                </div>
                <div class="explanation">「駅からちょっと遠くて毎日通勤が大変」と言っています。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">3</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-10/audio/m2_q3.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s2-3')">スクリプトを見る</button>
            <div class="script" id="s2-3"><span class="script-label">スクリプト</span>
                <strong>質問：この旅行代理店で一番人気のツアーはどれですか。</strong><br><br>
                <span class="speaker female">スタッフ：</span>当社の海外ツアーについてご説明します。一番人気はハワイツアーで、特に新婚旅行のお客様に選ばれています。次いで人気なのがヨーロッパ周遊ツアーで、シニア層に好評です。アジアツアーも手頃な価格で人気ですが、予約状況によって変わります。
            </div>
            <div class="question" data-answer="1">
                <div class="question-number">問3</div>
                <div class="question-text">一番人気のツアーはどれですか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">ハワイツアー</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">ヨーロッパ周遊ツアー</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">アジアツアー</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">国内ツアー</span></div>
                </div>
                <div class="explanation">「一番人気はハワイツアーで」と言っています。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">4</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-10/audio/m2_q4.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s2-4')">スクリプトを見る</button>
            <div class="script" id="s2-4"><span class="script-label">スクリプト</span>
                <strong>質問：女の人はなぜ料理を始めましたか。</strong><br><br>
                <span class="speaker male">男：</span>最近、料理始めたって聞いたけど。<br>
                <span class="speaker female">女：</span>うん。一人暮らしを始めて、外食ばかりだと健康が心配になってきて。自分で作った方が栄養も考えられるし。<br>
                <span class="speaker male">男：</span>いいね。料理は楽しい？<br>
                <span class="speaker female">女：</span>最初は大変だったけど、今は楽しくなってきたよ。
            </div>
            <div class="question" data-answer="3">
                <div class="question-number">問4</div>
                <div class="question-text">女の人はなぜ料理を始めましたか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">料理が好きだったから</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">外食が高くなったから</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">一人暮らしで外食ばかりで健康が心配になったから</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">友達に誘われたから</span></div>
                </div>
                <div class="explanation">「外食ばかりだと健康が心配になってきて」と言っています。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">5</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-10/audio/m2_q5.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s2-5')">スクリプトを見る</button>
            <div class="script" id="s2-5"><span class="script-label">スクリプト</span>
                <strong>質問：男の人の職業は何ですか。</strong><br><br>
                <span class="speaker female">女：</span>林さんはどんなお仕事をされているんですか。<br>
                <span class="speaker male">男：</span>システムエンジニアをしています。主にウェブアプリケーションの開発を担当しています。<br>
                <span class="speaker female">女：</span>難しそうですね。プログラミングもされるんですか。<br>
                <span class="speaker male">男：</span>はい、コードを書くのがメインの仕事です。設計も少しやりますが。
            </div>
            <div class="question" data-answer="2">
                <div class="question-number">問5</div>
                <div class="question-text">男の人の職業は何ですか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">デザイナー</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">システムエンジニア</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">営業マン</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">教師</span></div>
                </div>
                <div class="explanation">「システムエンジニアをしています」と言っています。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">6</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-10/audio/m2_q6.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s2-6')">スクリプトを見る</button>
            <div class="script" id="s2-6"><span class="script-label">スクリプト</span>
                <strong>質問：日本で最も多く消費されている飲み物は何ですか。</strong><br><br>
                <span class="speaker female">ナレーター：</span>調査によると、日本で最も多く消費されている飲み物は緑茶で、次いでコーヒー、ミネラルウォーターの順となっています。緑茶は健康意識の高まりとともに、近年さらに需要が増加しているようです。
            </div>
            <div class="question" data-answer="1">
                <div class="question-number">問6</div>
                <div class="question-text">日本で最も多く消費されている飲み物は何ですか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">緑茶</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">コーヒー</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">ミネラルウォーター</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">コーラ</span></div>
                </div>
                <div class="explanation">「最も多く消費されている飲み物は緑茶で、次いでコーヒー」と言っています。</div>
            </div>
        </div>
        </div>

        <!-- 問題3: 概要理解 -->
        <div class="mondai-section">
        <div class="mondai-header">問題3 概要理解</div>
        <div class="mondai-instruction">話を聞いて、話し手が最も言いたいことを選んでください。</div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">1</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-10/audio/m3_q1.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s3-1')">スクリプトを見る</button>
            <div class="script" id="s3-1"><span class="script-label">スクリプト</span>
                <span class="speaker male">男：</span>時間管理が苦手という人は多いですが、実はちょっとした工夫で改善できます。まず、やるべきことをリストに書き出すことから始めましょう。そして、重要度と緊急度で優先順位をつけます。次に、各作業にかかる時間を事前に見積もることで、無駄な時間が減ります。毎日この習慣を続けることで、自然と時間管理が上手くなります。
            </div>
            <div class="question" data-answer="4">
                <div class="question-number">問1</div>
                <div class="question-text">この人が一番言いたいことは何ですか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">時間管理は才能がないとできない</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">やるべきことは全部メモしなければならない</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">時間管理は難しいのであきらめるべきだ</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">リスト作成・優先順位・時間見積もりの習慣で時間管理が上手くなる</span></div>
                </div>
                <div class="explanation">「ちょっとした工夫で改善できる」として、リスト・優先順位・時間見積もりの3つの習慣を勧めています。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">2</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-10/audio/m3_q2.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s3-2')">スクリプトを見る</button>
            <div class="script" id="s3-2"><span class="script-label">スクリプト</span>
                <span class="speaker female">先生：</span>読書は語彙力や読解力を高めるだけでなく、想像力や共感力も育てます。特に小説を読むことで、様々な人生経験や感情を疑似体験できます。忙しい毎日の中でも、1日15分でいいので読書の時間を作ることをお勧めします。本の種類は何でも構いません。自分が楽しいと思えるものから始めてみてください。
            </div>
            <div class="question" data-answer="2">
                <div class="question-number">問2</div>
                <div class="question-text">先生が一番言いたいことは何ですか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">小説だけを読むべきだ</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">楽しめる本から毎日少しでも読書の時間を作ることが大切だ</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">1日1時間以上読書しなければならない</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">読書より映画を見る方がいい</span></div>
                </div>
                <div class="explanation">「1日15分でいいので読書の時間を作ること」「自分が楽しいと思えるものから始めて」が主張です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">3</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-10/audio/m3_q3.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s3-3')">スクリプトを見る</button>
            <div class="script" id="s3-3"><span class="script-label">スクリプト</span>
                <span class="speaker male">男：</span>人間関係でストレスを感じることは誰にでもあります。大切なのは、そのストレスをため込まないことです。信頼できる人に話を聞いてもらったり、趣味に打ち込んだりすることで、気持ちをリセットできます。また、すべての人と仲良くしようとするのではなく、本当に大切な人間関係に集中することも重要です。
            </div>
            <div class="question" data-answer="3">
                <div class="question-number">問3</div>
                <div class="question-text">この人が一番言いたいことは何ですか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">人間関係のストレスは我慢すべきだ</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">すべての人と仲良くすることが大切だ</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">ストレスをためず、大切な人間関係に集中することが重要だ</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">人間関係は避けるべきだ</span></div>
                </div>
                <div class="explanation">「ストレスをため込まないこと」「本当に大切な人間関係に集中すること」が主張です。</div>
            </div>
        </div>
        </div>

        <!-- 問題4: 発話表現 -->
        <div class="mondai-section">
        <div class="mondai-header">問題4 発話表現</div>
        <div class="mondai-instruction">状況を聞いて、適切な発話を選んでください。</div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">1</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-10/audio/m4_q1.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s4-1')">スクリプトを見る</button>
            <div class="script" id="s4-1"><span class="script-label">スクリプト</span>友達の家でパーティーをしています。帰るときに挨拶をします。なんと言いますか。</div>
            <div class="question" data-answer="2">
                <div class="question-number">問1</div>
                <div class="question-text">なんと言いますか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">また来ます。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">今日は楽しかった。招待してくれてありがとう。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">パーティーはどこですか。</span></div>
                </div>
                <div class="explanation">帰るときの挨拶として感謝と楽しかったという気持ちを伝えるのが自然です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">2</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-10/audio/m4_q2.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s4-2')">スクリプトを見る</button>
            <div class="script" id="s4-2"><span class="script-label">スクリプト</span>友達が悲しそうにしています。声をかけます。なんと言いますか。</div>
            <div class="question" data-answer="3">
                <div class="question-number">問2</div>
                <div class="question-text">なんと言いますか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">悲しいのはよくない。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">今日は天気がいいね。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">どうしたの？何かあった？</span></div>
                </div>
                <div class="explanation">悲しそうな友達への自然な声かけは「どうしたの、何かあった？」です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">3</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-10/audio/m4_q3.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s4-3')">スクリプトを見る</button>
            <div class="script" id="s4-3"><span class="script-label">スクリプト</span>先生が授業中に難しい質問をしました。答えがわかりません。なんと言いますか。</div>
            <div class="question" data-answer="1">
                <div class="question-number">問3</div>
                <div class="question-text">なんと言いますか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">すみません、わかりません。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">質問はどこですか。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">先生は難しいです。</span></div>
                </div>
                <div class="explanation">わからないときは素直に「すみません、わかりません」と言うのが自然です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">4</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-10/audio/m4_q4.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s4-4')">スクリプトを見る</button>
            <div class="script" id="s4-4"><span class="script-label">スクリプト</span>友達が結婚すると教えてくれました。お祝いを言います。なんと言いますか。</div>
            <div class="question" data-answer="2">
                <div class="question-number">問4</div>
                <div class="question-text">なんと言いますか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">結婚はどこですか。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">おめでとう！いつ式を挙げるの？</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">結婚は大変です。</span></div>
                </div>
                <div class="explanation">結婚の知らせへのお祝いとして「おめでとう」と続けて質問するのが自然です。</div>
            </div>
        </div>
        </div>

        <!-- 問題5: 即時応答 -->
        <div class="mondai-section">
        <div class="mondai-header">問題5 即時応答</div>
        <div class="mondai-instruction">短い文を聞いて、正しい返事を選んでください。</div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">1</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-10/audio/m4_q5.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s5-1')">スクリプトを見る</button>
            <div class="script" id="s5-1"><span class="script-label">スクリプト</span>「お電話ありがとうございます。ただいま混み合っております。」</div>
            <div class="question" data-answer="2">
                <div class="question-number">問1</div>
                <div class="question-text">返事を選んでください。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">混んでいます。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">わかりました。少し待ちます。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">電話はどこですか。</span></div>
                </div>
                <div class="explanation">混み合っていると言われたときは「わかりました、待ちます」が自然な返答です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">2</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-10/audio/m4_q6.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s5-2')">スクリプトを見る</button>
            <div class="script" id="s5-2"><span class="script-label">スクリプト</span>「このプロジェクト、いつまでに終わりますか。」</div>
            <div class="question" data-answer="3">
                <div class="question-number">問2</div>
                <div class="question-text">返事を選んでください。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">プロジェクトは難しいです。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">プロジェクトはどこですか。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">来週の金曜日までに完了させます。</span></div>
                </div>
                <div class="explanation">終了時期を聞かれているので、日程を答えるのが自然です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">3</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-10/audio/m4_q7.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s5-3')">スクリプトを見る</button>
            <div class="script" id="s5-3"><span class="script-label">スクリプト</span>「会議の準備はできていますか。」</div>
            <div class="question" data-answer="1">
                <div class="question-number">問3</div>
                <div class="question-text">返事を選んでください。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">はい、資料も会議室の予約も完了しています。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">会議はどこですか。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">会議は難しいです。</span></div>
                </div>
                <div class="explanation">準備状況を聞かれているので、準備完了の報告が自然です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">4</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-10/audio/m4_q8.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s5-4')">スクリプトを見る</button>
            <div class="script" id="s5-4"><span class="script-label">スクリプト</span>「この仕事、手伝ってもらえますか。」</div>
            <div class="question" data-answer="2">
                <div class="question-number">問4</div>
                <div class="question-text">返事を選んでください。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">仕事はどこですか。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">もちろんです。何をすればいいですか。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">仕事は大変です。</span></div>
                </div>
                <div class="explanation">手伝いを頼まれたときは快く引き受けて内容を確認するのが自然です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">5</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-10/audio/m4_q9.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s5-5')">スクリプトを見る</button>
            <div class="script" id="s5-5"><span class="script-label">スクリプト</span>「今日の会議、お疲れ様でした。」</div>
            <div class="question" data-answer="3">
                <div class="question-number">問5</div>
                <div class="question-text">返事を選んでください。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">会議はどこですか。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">会議は好きです。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">お疲れ様でした。長い会議でしたね。</span></div>
                </div>
                <div class="explanation">「お疲れ様」への返答は同じく「お疲れ様」と共感の言葉が自然です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">6</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-10/audio/m4_q10.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s5-6')">スクリプトを見る</button>
            <div class="script" id="s5-6"><span class="script-label">スクリプト</span>「この書類、どちらに提出すればいいですか。」</div>
            <div class="question" data-answer="1">
                <div class="question-number">問6</div>
                <div class="question-text">返事を選んでください。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">総務部の窓口にお持ちください。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">書類はどこですか。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">書類は難しいです。</span></div>
                </div>
                <div class="explanation">提出先を聞かれているので、場所を教えるのが自然です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">7</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-10/audio/m4_q11.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s5-7')">スクリプトを見る</button>
            <div class="script" id="s5-7"><span class="script-label">スクリプト</span>「先週はご一緒できて楽しかったです。」</div>
            <div class="question" data-answer="2">
                <div class="question-number">問7</div>
                <div class="question-text">返事を選んでください。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">先週はどこですか。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">こちらこそ、とても楽しかったです。またご一緒しましょう。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">先週は忙しかったです。</span></div>
                </div>
                <div class="explanation">楽しかったという気持ちへの返答として「こちらこそ楽しかった」が自然です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">8</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-10/audio/m4_q12.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s5-8')">スクリプトを見る</button>
            <div class="script" id="s5-8"><span class="script-label">スクリプト</span>「今度、一緒に食事でもどうですか。」</div>
            <div class="question" data-answer="3">
                <div class="question-number">問8</div>
                <div class="question-text">返事を選んでください。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">食事はどこですか。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">食事は好きではありません。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">ぜひ！いつがご都合よろしいですか。</span></div>
                </div>
                <div class="explanation">食事の誘いへの返答として「ぜひ、いつがいいですか」が自然です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">9</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-10/audio/m4_q13.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s5-9')">スクリプトを見る</button>
            <div class="script" id="s5-9"><span class="script-label">スクリプト</span>「新しいプロジェクト、うまくいきそう？」</div>
            <div class="question" data-answer="1">
                <div class="question-number">問9</div>
                <div class="question-text">返事を選んでください。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">まだ始まったばかりですが、チームの雰囲気はいいです。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">プロジェクトはどこですか。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">プロジェクトは難しいです。</span></div>
                </div>
                <div class="explanation">プロジェクトの状況を聞かれているので、現状を報告するのが自然です。</div>
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
