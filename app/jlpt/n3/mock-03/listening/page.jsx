'use client'
import AccessCheck from '../../../AccessCheck'

export default function Page() {
  return (
    <>
      <AccessCheck level="N3" mockNum={3} />
      <div dangerouslySetInnerHTML={{ __html: `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JLPT N3 Listening - MOCK-03 | Nihon GO!</title>
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
        <h1>JLPT N3 Mock Test 03 - 聴解</h1>
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
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-03/audio/m1_q1.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s1-1')">スクリプトを見る</button>
            <div class="script" id="s1-1"><span class="script-label">スクリプト</span>
                <strong>質問：二人はどこで待ち合わせをすることにしましたか。</strong><br><br>
                <span class="speaker female">女：</span>来週の旅行、集合場所どうする？<br>
                <span class="speaker male">男：</span>駅の改札はどうかな？でも荷物多いし混むよね。<br>
                <span class="speaker female">女：</span>じゃあ駅前のバスターミナルにしない？バスで空港まで行けるし。<br>
                <span class="speaker male">男：</span>そうしよう。バスターミナルで集合ね。
            </div>
            <div class="question" data-answer="3">
                <div class="question-number">問1</div>
                <div class="question-text">二人はどこで待ち合わせをすることにしましたか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">駅の改札前</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">空港</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">駅前のバスターミナル</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">ホテルのロビー</span></div>
                </div>
                <div class="explanation">「バスターミナルで集合ね」と決まりました。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">2</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-03/audio/m1_q2.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s1-2')">スクリプトを見る</button>
            <div class="script" id="s1-2"><span class="script-label">スクリプト</span>
                <strong>質問：女の人はこの後何をしますか。</strong><br><br>
                <span class="speaker male">男：</span>病院の予約、取れた？<br>
                <span class="speaker female">女：</span>まだなんです。今日電話したら、来週の水曜しか空いてないって言われて。<br>
                <span class="speaker male">男：</span>水曜は会議があるんじゃない？<br>
                <span class="speaker female">女：</span>そうなんです。だから別の病院を探してみます。
            </div>
            <div class="question" data-answer="4">
                <div class="question-number">問2</div>
                <div class="question-text">女の人はこの後何をしますか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">来週の水曜日に病院に行く</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">会議を休む</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">今日病院に行く</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">別の病院を探す</span></div>
                </div>
                <div class="explanation">「別の病院を探してみます」と言っています。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">3</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-03/audio/m1_q3.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s1-3')">スクリプトを見る</button>
            <div class="script" id="s1-3"><span class="script-label">スクリプト</span>
                <strong>質問：男の人はまず何をしますか。</strong><br><br>
                <span class="speaker female">不動産：</span>引越し先のご希望はありますか。<br>
                <span class="speaker male">男：</span>駅から歩いて10分以内で、2LDKがいいんですが。<br>
                <span class="speaker female">不動産：</span>予算はいかがでしょう。<br>
                <span class="speaker male">男：</span>月10万円以内で。いくつか候補を見せてもらえますか。<br>
                <span class="speaker female">不動産：</span>では、まず資料をお持ちします。気に入ったものがあれば内見できますよ。<br>
                <span class="speaker male">男：</span>お願いします。資料を見てから決めます。
            </div>
            <div class="question" data-answer="2">
                <div class="question-number">問3</div>
                <div class="question-text">男の人はまず何をしますか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">すぐに内見に行く</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">資料を見る</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">引越し先を決める</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">契約書にサインする</span></div>
                </div>
                <div class="explanation">「資料を見てから決めます」と言っています。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">4</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-03/audio/m1_q4.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s1-4')">スクリプトを見る</button>
            <div class="script" id="s1-4"><span class="script-label">スクリプト</span>
                <strong>質問：男の人の車はどこに止めますか。</strong><br><br>
                <span class="speaker male">男：</span>すみません、駐車場はどこですか。<br>
                <span class="speaker female">店員：</span>建物の裏に第一駐車場がありますが、今日は満車です。<br>
                <span class="speaker male">男：</span>そうですか。近くに別の駐車場はありますか。<br>
                <span class="speaker female">店員：</span>50メートルほど先に第二駐車場があります。そちらはまだ空きがあると思います。<br>
                <span class="speaker male">男：</span>わかりました。そちらに止めます。
            </div>
            <div class="question" data-answer="2">
                <div class="question-number">問4</div>
                <div class="question-text">男の人の車はどこに止めますか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">建物の裏の第一駐車場</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">50メートル先の第二駐車場</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">建物の前</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">駅前の駐車場</span></div>
                </div>
                <div class="explanation">第一駐車場は満車なので、「50メートルほど先の第二駐車場」に止めることにしました。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">5</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-03/audio/m1_q5.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s1-5')">スクリプトを見る</button>
            <div class="script" id="s1-5"><span class="script-label">スクリプト</span>
                <strong>質問：女の人は本をいつまでに返しますか。</strong><br><br>
                <span class="speaker female">女：</span>すみません、この本の返却期限はいつですか。<br>
                <span class="speaker male">司書：</span>貸し出しは2週間です。今日が10日なので、24日までになります。<br>
                <span class="speaker female">女：</span>もう少し時間がかかりそうなんですが、延長できますか。<br>
                <span class="speaker male">司書：</span>1週間だけ延長できます。その場合は31日までになります。<br>
                <span class="speaker female">女：</span>じゃあ延長をお願いします。
            </div>
            <div class="question" data-answer="3">
                <div class="question-number">問5</div>
                <div class="question-text">女の人は本をいつまでに返しますか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">10日</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">24日</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">31日</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">来月10日</span></div>
                </div>
                <div class="explanation">延長を申請したので「31日まで」になります。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">6</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-03/audio/m1_q6.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s1-6')">スクリプトを見る</button>
            <div class="script" id="s1-6"><span class="script-label">スクリプト</span>
                <strong>質問：二人は今夜何を作ることにしましたか。</strong><br><br>
                <span class="speaker male">男：</span>今夜の夕飯、何にする？カレーはどう？<br>
                <span class="speaker female">女：</span>カレーは昨日食べたよ。パスタにしない？<br>
                <span class="speaker male">男：</span>いいね。でも、トマトソースの材料買ってきてないな。<br>
                <span class="speaker female">女：</span>じゃあ、冷蔵庫にある卵と野菜で炒め物にしよう。<br>
                <span class="speaker male">男：</span>それがいいね。じゃあそうしよう。
            </div>
            <div class="question" data-answer="4">
                <div class="question-number">問6</div>
                <div class="question-text">二人は今夜何を作ることにしましたか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">カレー</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">パスタ</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">トマトソースパスタ</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">卵と野菜の炒め物</span></div>
                </div>
                <div class="explanation">「卵と野菜で炒め物にしよう」と決まりました。</div>
            </div>
        </div>
        </div>

        <!-- 問題2: ポイント理解 (6問) -->
        <div class="mondai-section" id="mondai2">
        <div class="mondai-header">問題2 ポイント理解</div>
        <div class="mondai-instruction">はじめに質問を聞いてください。それから話を聞いて、答えを選んでください。</div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">1</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-03/audio/m2_q1.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s2-1')">スクリプトを見る</button>
            <div class="script" id="s2-1"><span class="script-label">スクリプト</span>
                <strong>質問：明日の天気はどうですか。</strong><br><br>
                <span class="speaker male">ナレーター：</span>明日の天気をお伝えします。朝は晴れますが、昼過ぎから雲が増えてきます。夕方には雨が降り始め、夜は強い雨になる見込みです。気温は今日より3度低く、最高気温は18度の予報です。傘の準備をお忘れなく。
            </div>
            <div class="question" data-answer="3">
                <div class="question-number">問1</div>
                <div class="question-text">明日の天気はどうですか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">一日中晴れる</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">朝から雨が降る</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">朝は晴れて夕方から雨になる</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">一日中くもりで雨は降らない</span></div>
                </div>
                <div class="explanation">「朝は晴れますが、夕方には雨が降り始め」と言っています。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">2</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-03/audio/m2_q2.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s2-2')">スクリプトを見る</button>
            <div class="script" id="s2-2"><span class="script-label">スクリプト</span>
                <strong>質問：このジムで一番安いコースはいくらですか。</strong><br><br>
                <span class="speaker female">スタッフ：</span>当ジムには3つのコースがございます。ビジター制は1回1,500円です。月会員は月8,000円で平日のみご利用いただけます。フル会員は月12,000円で、いつでもご利用いただけます。
            </div>
            <div class="question" data-answer="1">
                <div class="question-number">問2</div>
                <div class="question-text">このジムで一番安いコースはいくらですか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">1回1,500円</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">月8,000円</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">月12,000円</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">月10,000円</span></div>
                </div>
                <div class="explanation">一番安いのはビジター制の1回1,500円です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">3</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-03/audio/m2_q3.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s2-3')">スクリプトを見る</button>
            <div class="script" id="s2-3"><span class="script-label">スクリプト</span>
                <strong>質問：男の人が海外旅行をしたい理由は何ですか。</strong><br><br>
                <span class="speaker female">女：</span>最近、海外旅行に興味があるって言ってたね。<br>
                <span class="speaker male">男：</span>うん。仕事でずっとストレスがたまってて。自然の中でゆっくりしたいなと思って。<br>
                <span class="speaker female">女：</span>観光地より自然派なんだね。<br>
                <span class="speaker male">男：</span>そう。ショッピングより、山とか海でのんびりしたい。
            </div>
            <div class="question" data-answer="2">
                <div class="question-number">問3</div>
                <div class="question-text">男の人が海外旅行をしたい理由は何ですか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">ショッピングを楽しみたいから</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">仕事のストレスを解消したいから</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">観光地を見て回りたいから</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">友達に会いたいから</span></div>
                </div>
                <div class="explanation">「仕事でずっとストレスがたまってて。自然の中でゆっくりしたい」と言っています。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">4</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-03/audio/m2_q4.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s2-4')">スクリプトを見る</button>
            <div class="script" id="s2-4"><span class="script-label">スクリプト</span>
                <strong>質問：先生が一番大切だと言っていることは何ですか。</strong><br><br>
                <span class="speaker female">先生：</span>外国語を上手になるためには、毎日続けることが大切です。単語をたくさん覚えることも大事ですが、それより、実際に話す練習を積み重ねることの方が重要です。間違いを恐れずに、どんどん話してみてください。
            </div>
            <div class="question" data-answer="3">
                <div class="question-number">問4</div>
                <div class="question-text">先生が一番大切だと言っていることは何ですか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">単語をたくさん覚えること</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">間違いをしないこと</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">実際に話す練習を積み重ねること</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">文法を完璧に覚えること</span></div>
                </div>
                <div class="explanation">「実際に話す練習を積み重ねることの方が重要」と言っています。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">5</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-03/audio/m2_q5.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s2-5')">スクリプトを見る</button>
            <div class="script" id="s2-5"><span class="script-label">スクリプト</span>
                <strong>質問：男の人の趣味は何ですか。</strong><br><br>
                <span class="speaker female">女：</span>休みの日は何をしているんですか。<br>
                <span class="speaker male">男：</span>最近は陶芸を始めました。土を使って器を作るのが楽しくて。<br>
                <span class="speaker female">女：</span>いいですね。絵を描いたりもしますか。<br>
                <span class="speaker male">男：</span>絵は苦手で。陶芸一本です。
            </div>
            <div class="question" data-answer="2">
                <div class="question-number">問5</div>
                <div class="question-text">男の人の趣味は何ですか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">絵を描くこと</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">陶芸</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">料理</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">スポーツ</span></div>
                </div>
                <div class="explanation">「陶芸を始めました」「陶芸一本です」と言っています。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">6</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-03/audio/m2_q6.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s2-6')">スクリプトを見る</button>
            <div class="script" id="s2-6"><span class="script-label">スクリプト</span>
                <strong>質問：日本で一番多いペットは何ですか。</strong><br><br>
                <span class="speaker male">ナレーター：</span>最近の調査によると、日本で飼われているペットで最も多いのは猫で、次に犬、そして魚類と続いています。猫は犬に比べて世話が楽なことや、一人暮らしでも飼いやすいことが人気の理由とされています。
            </div>
            <div class="question" data-answer="1">
                <div class="question-number">問6</div>
                <div class="question-text">日本で一番多いペットは何ですか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">猫</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">犬</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">魚</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">鳥</span></div>
                </div>
                <div class="explanation">「最も多いのは猫で、次に犬」と言っています。</div>
            </div>
        </div>
        </div>

        <!-- 問題3: 概要理解 (3問) -->
        <div class="mondai-section" id="mondai3">
        <div class="mondai-header">問題3 概要理解</div>
        <div class="mondai-instruction">話を聞いて、話し手が最も言いたいことを選んでください。</div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">1</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-03/audio/m3_q1.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s3-1')">スクリプトを見る</button>
            <div class="script" id="s3-1"><span class="script-label">スクリプト</span>
                <span class="speaker female">女：</span>適度な運動は体に良いと言われますが、毎日激しい運動をする必要はありません。大切なのは、無理なく続けられることです。30分の散歩でも、続けることで体力が上がり、気持ちも前向きになります。完璧を目指すより、小さく始めて習慣にすることが健康への近道です。
            </div>
            <div class="question" data-answer="3">
                <div class="question-number">問1</div>
                <div class="question-text">この人が一番言いたいことは何ですか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">毎日激しい運動をすることが大切だ</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">散歩は体に良くない</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">無理なく続けられる運動を習慣にすることが大切だ</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">完璧な運動計画を立てるべきだ</span></div>
                </div>
                <div class="explanation">「無理なく続けられること」「小さく始めて習慣にすることが健康への近道」が主張です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">2</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-03/audio/m3_q2.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s3-2')">スクリプトを見る</button>
            <div class="script" id="s3-2"><span class="script-label">スクリプト</span>
                <span class="speaker male">男：</span>仕事をする意味は、お金を稼ぐことだけではないと思います。仕事を通じて人と関わり、社会に貢献することで、自分自身も成長できます。やりがいを感じながら働ける環境を作ることが、会社にとっても社員にとっても大切なことではないでしょうか。
            </div>
            <div class="question" data-answer="2">
                <div class="question-number">問2</div>
                <div class="question-text">男の人が一番言いたいことは何ですか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">仕事はお金のためだけにするものだ</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">やりがいを感じながら働ける環境が大切だ</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">社会貢献より個人の成長が重要だ</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">会社の利益が最も大切だ</span></div>
                </div>
                <div class="explanation">「やりがいを感じながら働ける環境を作ることが大切」が主張です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">3</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-03/audio/m3_q3.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s3-3')">スクリプトを見る</button>
            <div class="script" id="s3-3"><span class="script-label">スクリプト</span>
                <span class="speaker female">先生：</span>デジタル化が進む中、子供たちにとってスマートフォンやタブレットは身近な存在になっています。しかし、使い方を間違えると、視力の低下や睡眠不足につながります。大切なのは禁止することではなく、正しい使い方を教えることです。デジタル機器と上手に付き合う力を育てることが、今の教育に求められています。
            </div>
            <div class="question" data-answer="4">
                <div class="question-number">問3</div>
                <div class="question-text">先生が一番言いたいことは何ですか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">子供にスマートフォンを持たせてはいけない</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">デジタル機器は視力に悪い</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">タブレットを使った授業を増やすべきだ</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">デジタル機器の正しい使い方を教えることが重要だ</span></div>
                </div>
                <div class="explanation">「正しい使い方を教えること」「デジタル機器と上手に付き合う力を育てること」が主張です。</div>
            </div>
        </div>
        </div>

        <!-- 問題4: 発話表現 (4問) -->
        <div class="mondai-section" id="mondai4">
        <div class="mondai-header">問題4 発話表現</div>
        <div class="mondai-instruction">状況を聞いて、適切な発話を選んでください。</div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">1</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-03/audio/m4_q1.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s4-1')">スクリプトを見る</button>
            <div class="script" id="s4-1"><span class="script-label">スクリプト</span>友達が試験に合格したと聞きました。お祝いの言葉をかけます。なんと言いますか。</div>
            <div class="question" data-answer="2">
                <div class="question-number">問1</div>
                <div class="question-text">なんと言いますか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">試験、大変だったね。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">合格おめでとう！本当によかったね。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">次の試験はいつ？</span></div>
                </div>
                <div class="explanation">合格のお祝いとして「合格おめでとう！」が最も自然です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">2</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-03/audio/m4_q2.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s4-2')">スクリプトを見る</button>
            <div class="script" id="s4-2"><span class="script-label">スクリプト</span>電車の中で席を譲りたい高齢者がいます。なんと言いますか。</div>
            <div class="question" data-answer="1">
                <div class="question-number">問2</div>
                <div class="question-text">なんと言いますか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">よろしければ、どうぞお座りください。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">席を取ってください。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">ここに座っています。</span></div>
                </div>
                <div class="explanation">席を譲るときは「どうぞお座りください」が適切です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">3</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-03/audio/m4_q3.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s4-3')">スクリプトを見る</button>
            <div class="script" id="s4-3"><span class="script-label">スクリプト</span>上司に仕事の締め切りを延ばしてもらいたいです。なんと言いますか。</div>
            <div class="question" data-answer="3">
                <div class="question-number">問3</div>
                <div class="question-text">なんと言いますか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">締め切りを延ばします。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">仕事が終わりません。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">申し訳ありませんが、締め切りを少し延ばしていただけないでしょうか。</span></div>
                </div>
                <div class="explanation">上司への丁寧なお願いとして「〜していただけないでしょうか」が適切です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">4</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-03/audio/m4_q4.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s4-4')">スクリプトを見る</button>
            <div class="script" id="s4-4"><span class="script-label">スクリプト</span>友達の家を訪問したとき、手土産を渡したいです。なんと言いますか。</div>
            <div class="question" data-answer="2">
                <div class="question-number">問4</div>
                <div class="question-text">なんと言いますか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">これを受け取ってください。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">つまらないものですが、よかったらどうぞ。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">お土産がありますか。</span></div>
                </div>
                <div class="explanation">手土産を渡すときは「つまらないものですが」という謙遜表現が自然です。</div>
            </div>
        </div>
        </div>

        <!-- 問題5: 即時応答 (9問) -->
        <div class="mondai-section" id="mondai5">
        <div class="mondai-header">問題5 即時応答</div>
        <div class="mondai-instruction">短い文を聞いて、正しい返事を選んでください。</div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">1</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-03/audio/m4_q5.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s5-1')">スクリプトを見る</button>
            <div class="script" id="s5-1"><span class="script-label">スクリプト</span>「この仕事、手伝ってもらえますか。」</div>
            <div class="question" data-answer="1">
                <div class="question-number">問1</div>
                <div class="question-text">返事を選んでください。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">もちろんです。何をすればいいですか。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">仕事は大変ですね。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">手伝いは必要ありません。</span></div>
                </div>
                <div class="explanation">手伝いを頼まれたときの自然な返答は承諾の言葉です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">2</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-03/audio/m4_q6.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s5-2')">スクリプトを見る</button>
            <div class="script" id="s5-2"><span class="script-label">スクリプト</span>「昨日の発表、うまくいった？」</div>
            <div class="question" data-answer="2">
                <div class="question-number">問2</div>
                <div class="question-text">返事を選んでください。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">発表は来週です。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">おかげさまで、うまくいきました。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">発表の資料を作っています。</span></div>
                </div>
                <div class="explanation">昨日の発表の結果を聞かれているので、結果を答えます。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">3</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-03/audio/m4_q7.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s5-3')">スクリプトを見る</button>
            <div class="script" id="s5-3"><span class="script-label">スクリプト</span>「窓を開けてもいいですか。」</div>
            <div class="question" data-answer="3">
                <div class="question-number">問3</div>
                <div class="question-text">返事を選んでください。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">窓はあそこです。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">窓を開けています。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">ええ、どうぞ。</span></div>
                </div>
                <div class="explanation">許可を求められているので「どうぞ」と答えるのが自然です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">4</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-03/audio/m4_q8.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s5-4')">スクリプトを見る</button>
            <div class="script" id="s5-4"><span class="script-label">スクリプト</span>「この映画、もう見ましたか。」</div>
            <div class="question" data-answer="1">
                <div class="question-number">問4</div>
                <div class="question-text">返事を選んでください。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">はい、先週見ました。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">映画館はどこですか。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">映画が好きです。</span></div>
                </div>
                <div class="explanation">見たかどうか聞かれているので、見た・見ていないを答えます。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">5</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-03/audio/m4_q9.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s5-5')">スクリプトを見る</button>
            <div class="script" id="s5-5"><span class="script-label">スクリプト</span>「ただいま。」</div>
            <div class="question" data-answer="2">
                <div class="question-number">問5</div>
                <div class="question-text">返事を選んでください。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">いってらっしゃい。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">おかえり。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">よろしくお願いします。</span></div>
                </div>
                <div class="explanation">「ただいま」への返答は「おかえり（なさい）」です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">6</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-03/audio/m4_q10.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s5-6')">スクリプトを見る</button>
            <div class="script" id="s5-6"><span class="script-label">スクリプト</span>「そのかばん、新しいんですか。」</div>
            <div class="question" data-answer="3">
                <div class="question-number">問6</div>
                <div class="question-text">返事を選んでください。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">かばんを買いたいです。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">かばんはあそこにあります。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">ええ、先日買ったんです。</span></div>
                </div>
                <div class="explanation">かばんが新しいかどうか聞かれているので、それについて答えます。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">7</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-03/audio/m4_q11.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s5-7')">スクリプトを見る</button>
            <div class="script" id="s5-7"><span class="script-label">スクリプト</span>「会議の時間、変わったって知ってた？」</div>
            <div class="question" data-answer="1">
                <div class="question-number">問7</div>
                <div class="question-text">返事を選んでください。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">えっ、知らなかった。何時になったの？</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">会議室はどこですか。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">会議は長いですね。</span></div>
                </div>
                <div class="explanation">会議の時間変更を知っているか聞かれているので、知らなかったことと確認の質問をするのが自然です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">8</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-03/audio/m4_q12.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s5-8')">スクリプトを見る</button>
            <div class="script" id="s5-8"><span class="script-label">スクリプト</span>「ごちそうさまでした。とてもおいしかったです。」</div>
            <div class="question" data-answer="2">
                <div class="question-number">問8</div>
                <div class="question-text">返事を選んでください。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">いただきます。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">喜んでいただけてよかったです。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">料理は難しいです。</span></div>
                </div>
                <div class="explanation">料理をほめられたときの返答として「喜んでいただけてよかったです」が最も自然です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">9</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-03/audio/m4_q13.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s5-9')">スクリプトを見る</button>
            <div class="script" id="s5-9"><span class="script-label">スクリプト</span>「今日は早く帰っていいですよ。」</div>
            <div class="question" data-answer="3">
                <div class="question-number">問9</div>
                <div class="question-text">返事を選んでください。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">もっと遅く帰ります。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">早く来てください。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">ありがとうございます。お先に失礼します。</span></div>
                </div>
                <div class="explanation">早退を許可されたときの返答として「ありがとうございます。お先に失礼します」が最も自然です。</div>
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
