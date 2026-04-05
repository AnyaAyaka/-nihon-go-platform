'use client'
import AccessCheck from '../../../AccessCheck'

export default function Page() {
  return (
    <>
      <AccessCheck level="N3" mockNum={8} />
      <div dangerouslySetInnerHTML={{ __html: `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JLPT N3 Listening - MOCK-08 | Nihon GO!</title>
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
        <h1>JLPT N3 Mock Test 08 - 聴解</h1>
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
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-08/audio/m1_q1.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s1-1')">スクリプトを見る</button>
            <div class="script" id="s1-1"><span class="script-label">スクリプト</span>
                <strong>質問：女の人はこの後まず何をしますか。</strong><br><br>
                <span class="speaker male">男：</span>佐藤さん、プレゼンの資料できましたか。<br>
                <span class="speaker female">女：</span>内容はできているんですが、グラフをまだ追加していないんです。<br>
                <span class="speaker male">男：</span>先に課長に見てもらって、OKが出てからグラフを追加した方がいいですよ。<br>
                <span class="speaker female">女：</span>そうですね。では先に課長に確認してもらいます。
            </div>
            <div class="question" data-answer="2">
                <div class="question-number">問1</div>
                <div class="question-text">女の人はこの後まず何をしますか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">グラフを追加する</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">課長に資料を確認してもらう</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">内容を修正する</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">プレゼンの練習をする</span></div>
                </div>
                <div class="explanation">「先に課長に確認してもらいます」と言っています。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">2</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-08/audio/m1_q2.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s1-2')">スクリプトを見る</button>
            <div class="script" id="s1-2"><span class="script-label">スクリプト</span>
                <strong>質問：男の人はどのプランを選びましたか。</strong><br><br>
                <span class="speaker female">女：</span>旅行のホテル、どうする？<br>
                <span class="speaker male">男：</span>朝食付きのプランと、素泊まりのプランがあるんだけど。<br>
                <span class="speaker female">女：</span>朝食付きの方がお得じゃない？<br>
                <span class="speaker male">男：</span>でも朝ゆっくりしたいから、近くのカフェで食べたいな。素泊まりにしよう。
            </div>
            <div class="question" data-answer="2">
                <div class="question-number">問2</div>
                <div class="question-text">男の人はどのプランを選びましたか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">朝食付きプラン</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">素泊まりプラン</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">夕食付きプラン</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">まだ決めていない</span></div>
                </div>
                <div class="explanation">「素泊まりにしよう」と言っています。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">3</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-08/audio/m1_q3.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s1-3')">スクリプトを見る</button>
            <div class="script" id="s1-3"><span class="script-label">スクリプト</span>
                <strong>質問：男の人はこの後まず何をしますか。</strong><br><br>
                <span class="speaker female">女：</span>新しいシステムの導入、進んでる？<br>
                <span class="speaker male">男：</span>まず既存のデータを移行しないといけないんだけど、その前にバックアップを取らないと。<br>
                <span class="speaker female">女：</span>じゃあ私がデータ移行の手順を確認するから、あなたはバックアップをお願い。<br>
                <span class="speaker male">男：</span>わかった。じゃあまずバックアップを取る。
            </div>
            <div class="question" data-answer="3">
                <div class="question-number">問3</div>
                <div class="question-text">男の人はこの後まず何をしますか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">データを移行する</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">手順を確認する</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">バックアップを取る</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">システムを導入する</span></div>
                </div>
                <div class="explanation">「まずバックアップを取る」と言っています。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">4</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-08/audio/m1_q4.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s1-4')">スクリプトを見る</button>
            <div class="script" id="s1-4"><span class="script-label">スクリプト</span>
                <strong>質問：女の人はどの席を選びましたか。</strong><br><br>
                <span class="speaker female">女：</span>コンサートのチケット、どの席にする？<br>
                <span class="speaker male">男：</span>S席、A席、B席があるよ。S席は一番前で見やすいけど高いな。<br>
                <span class="speaker female">女：</span>B席は安いけど、せっかくだからもう少し見やすいところがいいな。<br>
                <span class="speaker male">男：</span>じゃあA席にしようか。<br>
                <span class="speaker female">女：</span>うん、A席にする。
            </div>
            <div class="question" data-answer="2">
                <div class="question-number">問4</div>
                <div class="question-text">女の人はどの席を選びましたか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">S席</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">A席</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">B席</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">まだ決めていない</span></div>
                </div>
                <div class="explanation">「うん、A席にする」と言っています。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">5</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-08/audio/m1_q5.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s1-5')">スクリプトを見る</button>
            <div class="script" id="s1-5"><span class="script-label">スクリプト</span>
                <strong>質問：二人はどこで待ち合わせることにしましたか。</strong><br><br>
                <span class="speaker female">女：</span>明日の待ち合わせ、どこにする？<br>
                <span class="speaker male">男：</span>駅の改札前はどう？<br>
                <span class="speaker female">女：</span>改札前はいつも混んでるから、駅前の時計台の前はどう？<br>
                <span class="speaker male">男：</span>わかりやすくていいね。じゃあ時計台の前にしよう。
            </div>
            <div class="question" data-answer="3">
                <div class="question-number">問5</div>
                <div class="question-text">二人はどこで待ち合わせることにしましたか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">駅の改札前</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">駅の出口</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">時計台の前</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">カフェの前</span></div>
                </div>
                <div class="explanation">「じゃあ時計台の前にしよう」と決まりました。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">6</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-08/audio/m1_q6.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s1-6')">スクリプトを見る</button>
            <div class="script" id="s1-6"><span class="script-label">スクリプト</span>
                <strong>質問：女の人はこの後まず何をしますか。</strong><br><br>
                <span class="speaker male">男：</span>引越し業者に連絡した？<br>
                <span class="speaker female">女：</span>まだなんだ。その前に新しい住所を確定させないと連絡できないな。<br>
                <span class="speaker male">男：</span>じゃあ僕が業者に連絡するから、あなたは住所を確定させておいて。<br>
                <span class="speaker female">女：</span>わかった。じゃあまず住所を確定させる。
            </div>
            <div class="question" data-answer="4">
                <div class="question-number">問6</div>
                <div class="question-text">女の人はこの後まず何をしますか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">引越し業者に連絡する</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">荷物をまとめる</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">新居を探す</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">新しい住所を確定させる</span></div>
                </div>
                <div class="explanation">「まず住所を確定させる」と言っています。</div>
            </div>
        </div>
        </div>

        <!-- 問題2: ポイント理解 -->
        <div class="mondai-section">
        <div class="mondai-header">問題2 ポイント理解</div>
        <div class="mondai-instruction">はじめに質問を聞いてください。それから話を聞いて、答えを選んでください。</div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">1</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-08/audio/m2_q1.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s2-1')">スクリプトを見る</button>
            <div class="script" id="s2-1"><span class="script-label">スクリプト</span>
                <strong>質問：この図書館の閉館時間は何時ですか。</strong><br><br>
                <span class="speaker female">アナウンス：</span>ご利用の皆様にお知らせいたします。本日は特別整理日のため、通常より1時間早く午後7時に閉館いたします。通常の閉館時間は午後8時となっております。ご不便をおかけして申し訳ありません。
            </div>
            <div class="question" data-answer="2">
                <div class="question-number">問1</div>
                <div class="question-text">本日の図書館の閉館時間は何時ですか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">午後6時</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">午後7時</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">午後8時</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">午後9時</span></div>
                </div>
                <div class="explanation">「本日は午後7時に閉館いたします」とあります。通常は午後8時です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">2</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-08/audio/m2_q2.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s2-2')">スクリプトを見る</button>
            <div class="script" id="s2-2"><span class="script-label">スクリプト</span>
                <strong>質問：女の人はなぜ新しいスマホを買いましたか。</strong><br><br>
                <span class="speaker male">男：</span>新しいスマホ買ったの？<br>
                <span class="speaker female">女：</span>うん。古いのがバッテリーの持ちが悪くなってきてね。充電してもすぐ切れちゃって。<br>
                <span class="speaker male">男：</span>それは不便だったね。<br>
                <span class="speaker female">女：</span>外出先で電池が切れると困るから、思い切って買い換えたの。
            </div>
            <div class="question" data-answer="1">
                <div class="question-number">問2</div>
                <div class="question-text">女の人はなぜ新しいスマホを買いましたか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">バッテリーの持ちが悪くなったから</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">画面が割れたから</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">新しい機種が出たから</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">安くなったから</span></div>
                </div>
                <div class="explanation">「バッテリーの持ちが悪くなってきて、充電してもすぐ切れる」と言っています。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">3</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-08/audio/m2_q3.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s2-3')">スクリプトを見る</button>
            <div class="script" id="s2-3"><span class="script-label">スクリプト</span>
                <strong>質問：このレストランで一番人気のメニューは何ですか。</strong><br><br>
                <span class="speaker male">ウェイター：</span>本日のおすすめメニューをご紹介します。一番人気はパスタセットで、ランチタイムにはほぼ毎日売り切れます。次に人気なのがハンバーグ定食で、お子様にも好評です。ステーキも好評ですが、数量限定となっております。
            </div>
            <div class="question" data-answer="1">
                <div class="question-number">問3</div>
                <div class="question-text">このレストランで一番人気のメニューは何ですか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">パスタセット</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">ハンバーグ定食</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">ステーキ</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">サラダセット</span></div>
                </div>
                <div class="explanation">「一番人気はパスタセットで」と言っています。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">4</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-08/audio/m2_q4.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s2-4')">スクリプトを見る</button>
            <div class="script" id="s2-4"><span class="script-label">スクリプト</span>
                <strong>質問：男の人が英語の勉強を始めた理由は何ですか。</strong><br><br>
                <span class="speaker female">女：</span>最近、英語を勉強してるって聞いたけど。<br>
                <span class="speaker male">男：</span>うん。来年から海外の取引先との仕事が増えるって言われてね。仕事で必要になったんだ。<br>
                <span class="speaker female">女：</span>大変だね。<br>
                <span class="speaker male">男：</span>でも、いい機会だと思って頑張ってるよ。
            </div>
            <div class="question" data-answer="2">
                <div class="question-number">問4</div>
                <div class="question-text">男の人が英語の勉強を始めた理由は何ですか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">留学したいから</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">海外の取引先との仕事が増えるから</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">英語が好きだから</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">友達に誘われたから</span></div>
                </div>
                <div class="explanation">「来年から海外の取引先との仕事が増えるって言われて、仕事で必要になった」と言っています。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">5</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-08/audio/m2_q5.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s2-5')">スクリプトを見る</button>
            <div class="script" id="s2-5"><span class="script-label">スクリプト</span>
                <strong>質問：女の人の職業は何ですか。</strong><br><br>
                <span class="speaker male">男：</span>中村さんはどんなお仕事をされているんですか。<br>
                <span class="speaker female">女：</span>小学校で教えています。主に算数を担当しているんですが、最近は理科も教えています。<br>
                <span class="speaker male">男：</span>素晴らしいですね。何年生を担当されているんですか。<br>
                <span class="speaker female">女：</span>今年は3年生と4年生を担当しています。
            </div>
            <div class="question" data-answer="3">
                <div class="question-number">問5</div>
                <div class="question-text">女の人の職業は何ですか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">中学校の先生</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">高校の先生</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">小学校の先生</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">大学の先生</span></div>
                </div>
                <div class="explanation">「小学校で教えています」と言っています。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">6</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-08/audio/m2_q6.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s2-6')">スクリプトを見る</button>
            <div class="script" id="s2-6"><span class="script-label">スクリプト</span>
                <strong>質問：日本で最も多く読まれているジャンルの本は何ですか。</strong><br><br>
                <span class="speaker male">ナレーター：</span>調査によると、日本で最も多く読まれている本のジャンルはビジネス書で、次いで小説、そして料理・実用書の順となっています。特にビジネス書は、自己啓発を求める社会人に人気が高いようです。
            </div>
            <div class="question" data-answer="1">
                <div class="question-number">問6</div>
                <div class="question-text">日本で最も多く読まれているジャンルの本は何ですか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">ビジネス書</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">小説</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">料理・実用書</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">漫画</span></div>
                </div>
                <div class="explanation">「最も多く読まれている本のジャンルはビジネス書で」と言っています。</div>
            </div>
        </div>
        </div>

        <!-- 問題3: 概要理解 -->
        <div class="mondai-section">
        <div class="mondai-header">問題3 概要理解</div>
        <div class="mondai-instruction">話を聞いて、話し手が最も言いたいことを選んでください。</div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">1</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-08/audio/m3_q1.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s3-1')">スクリプトを見る</button>
            <div class="script" id="s3-1"><span class="script-label">スクリプト</span>
                <span class="speaker male">男：</span>日記を書くことは、自分の気持ちを整理するのにとても効果的です。毎日の出来事を振り返ることで、感情のコントロールが上手くなります。また、目標を書き留めることで、達成への意識が高まります。難しく考えず、まず3行でもいいので書き始めてみてください。続けることで、少しずつ変化が感じられるはずです。
            </div>
            <div class="question" data-answer="4">
                <div class="question-number">問1</div>
                <div class="question-text">この人が一番言いたいことは何ですか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">日記は長く書かなければならない</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">日記を書くと記憶力が上がる</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">日記は難しいので書かなくていい</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">短くてもいいので日記を書き続けることで変化が感じられる</span></div>
                </div>
                <div class="explanation">「3行でもいいので書き始めてみて」「続けることで変化が感じられる」が主張です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">2</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-08/audio/m3_q2.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s3-2')">スクリプトを見る</button>
            <div class="script" id="s3-2"><span class="script-label">スクリプト</span>
                <span class="speaker female">先生：</span>コミュニケーション能力を高めるためには、話す力だけでなく、聞く力も大切です。相手の話をしっかり聞き、理解しようとする姿勢が信頼関係を築きます。相手が話しているときは、うなずいたり、相づちを打ったりすることで、「聞いていますよ」というサインを伝えましょう。
            </div>
            <div class="question" data-answer="2">
                <div class="question-number">問2</div>
                <div class="question-text">先生が一番言いたいことは何ですか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">話す力だけを鍛えるべきだ</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">聞く力も大切で、相手の話をしっかり聞く姿勢が信頼関係を築く</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">うなずくだけでコミュニケーションは完璧だ</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">コミュニケーションは難しいのであきらめるべきだ</span></div>
                </div>
                <div class="explanation">「聞く力も大切」「相手の話を聞き理解しようとする姿勢が信頼関係を築く」が主張です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">3</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-08/audio/m3_q3.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s3-3')">スクリプトを見る</button>
            <div class="script" id="s3-3"><span class="script-label">スクリプト</span>
                <span class="speaker male">男：</span>目標を達成するためには、大きな目標を小さなステップに分けることが大切です。いきなり大きなことを達成しようとすると挫折しやすくなります。毎日少しずつ進めることで、気がつけば大きな目標に近づいていることがわかります。焦らず、一歩一歩確実に進むことが成功への近道です。
            </div>
            <div class="question" data-answer="3">
                <div class="question-number">問3</div>
                <div class="question-text">この人が一番言いたいことは何ですか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">大きな目標は持つべきでない</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">目標は一気に達成すべきだ</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">大きな目標を小さなステップに分けて一歩一歩進むことが成功への近道だ</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">目標は他人に任せるべきだ</span></div>
                </div>
                <div class="explanation">「大きな目標を小さなステップに分けて」「一歩一歩確実に進むことが成功への近道」が主張です。</div>
            </div>
        </div>
        </div>

        <!-- 問題4: 発話表現 -->
        <div class="mondai-section">
        <div class="mondai-header">問題4 発話表現</div>
        <div class="mondai-instruction">状況を聞いて、適切な発話を選んでください。</div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">1</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-08/audio/m4_q1.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s4-1')">スクリプトを見る</button>
            <div class="script" id="s4-1"><span class="script-label">スクリプト</span>友達が新しい仕事を始めたと聞きました。励まします。なんと言いますか。</div>
            <div class="question" data-answer="2">
                <div class="question-number">問1</div>
                <div class="question-text">なんと言いますか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">新しい仕事は大変です。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">新しい仕事、頑張ってね。応援してるよ。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">仕事はやめた方がいいです。</span></div>
                </div>
                <div class="explanation">励ます場合は「頑張ってね、応援してるよ」が自然な表現です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">2</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-08/audio/m4_q2.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s4-2')">スクリプトを見る</button>
            <div class="script" id="s4-2"><span class="script-label">スクリプト</span>友達から「最近どう？」と聞かれました。調子がいいと伝えます。なんと言いますか。</div>
            <div class="question" data-answer="3">
                <div class="question-number">問2</div>
                <div class="question-text">なんと言いますか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">最近はどこに行きますか。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">最近は忙しくて大変です。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">おかげさまで、最近は充実してるよ。</span></div>
                </div>
                <div class="explanation">調子がいいと伝えるには「充実している」が自然な表現です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">3</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-08/audio/m4_q3.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s4-3')">スクリプトを見る</button>
            <div class="script" id="s4-3"><span class="script-label">スクリプト</span>友達が落ち込んでいます。元気づけます。なんと言いますか。</div>
            <div class="question" data-answer="1">
                <div class="question-number">問3</div>
                <div class="question-text">なんと言いますか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">大丈夫だよ。きっとうまくいくよ。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">落ち込むのはよくない。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">元気がないですね。</span></div>
                </div>
                <div class="explanation">元気づけるには「大丈夫だよ、きっとうまくいくよ」が最も自然です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">4</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-08/audio/m4_q4.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s4-4')">スクリプトを見る</button>
            <div class="script" id="s4-4"><span class="script-label">スクリプト</span>友達の家に遊びに来て、料理をごちそうになりました。お礼を言います。なんと言いますか。</div>
            <div class="question" data-answer="2">
                <div class="question-number">問4</div>
                <div class="question-text">なんと言いますか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">料理はどこで作りましたか。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">ごちそうさまでした。すごくおいしかったよ。ありがとう。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">料理は好きではありません。</span></div>
                </div>
                <div class="explanation">ごちそうになったあとのお礼として「ごちそうさまでした、おいしかった、ありがとう」が自然です。</div>
            </div>
        </div>
        </div>

        <!-- 問題5: 即時応答 -->
        <div class="mondai-section">
        <div class="mondai-header">問題5 即時応答</div>
        <div class="mondai-instruction">短い文を聞いて、正しい返事を選んでください。</div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">1</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-08/audio/m4_q5.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s5-1')">スクリプトを見る</button>
            <div class="script" id="s5-1"><span class="script-label">スクリプト</span>「このたびはご迷惑をおかけして、誠に申し訳ございませんでした。」</div>
            <div class="question" data-answer="2">
                <div class="question-number">問1</div>
                <div class="question-text">返事を選んでください。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">迷惑でした。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">いいえ、お気になさらず。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">ありがとうございます。</span></div>
                </div>
                <div class="explanation">謝罪への返答として「お気になさらず」が自然で丁寧です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">2</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-08/audio/m4_q6.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s5-2')">スクリプトを見る</button>
            <div class="script" id="s5-2"><span class="script-label">スクリプト</span>「来週の会議の資料、準備できていますか。」</div>
            <div class="question" data-answer="1">
                <div class="question-number">問2</div>
                <div class="question-text">返事を選んでください。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">はい、昨日完成しました。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">会議はどこですか。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">資料は難しいです。</span></div>
                </div>
                <div class="explanation">資料の準備ができているかどうかを聞かれているので、状況を答えるのが自然です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">3</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-08/audio/m4_q7.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s5-3')">スクリプトを見る</button>
            <div class="script" id="s5-3"><span class="script-label">スクリプト</span>「先日はお世話になりました。」</div>
            <div class="question" data-answer="3">
                <div class="question-number">問3</div>
                <div class="question-text">返事を選んでください。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">先日はどこですか。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">世話はしません。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">こちらこそ、お世話になりました。</span></div>
                </div>
                <div class="explanation">「お世話になりました」への返答は「こちらこそ、お世話になりました」が自然です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">4</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-08/audio/m4_q8.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s5-4')">スクリプトを見る</button>
            <div class="script" id="s5-4"><span class="script-label">スクリプト</span>「もしもし、田中さんはいらっしゃいますか。」</div>
            <div class="question" data-answer="2">
                <div class="question-number">問4</div>
                <div class="question-text">返事を選んでください。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">田中は好きです。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">はい、田中でございます。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">田中はどこですか。</span></div>
                </div>
                <div class="explanation">電話で自分の名前を呼ばれたときは「はい、田中でございます」が丁寧な返答です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">5</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-08/audio/m4_q9.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s5-5')">スクリプトを見る</button>
            <div class="script" id="s5-5"><span class="script-label">スクリプト</span>「この企画、面白いと思わない？」</div>
            <div class="question" data-answer="1">
                <div class="question-number">問5</div>
                <div class="question-text">返事を選んでください。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">うん、すごくいいと思う。ぜひやってみよう。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">企画はどこですか。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">企画は難しいです。</span></div>
                </div>
                <div class="explanation">賛同する場合、「いいと思う、ぜひやってみよう」が自然な返答です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">6</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-08/audio/m4_q10.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s5-6')">スクリプトを見る</button>
            <div class="script" id="s5-6"><span class="script-label">スクリプト</span>「今日中にこの仕事を終わらせてほしいんだけど。」</div>
            <div class="question" data-answer="3">
                <div class="question-number">問6</div>
                <div class="question-text">返事を選んでください。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">仕事はどこにありますか。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">今日は無理です。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">わかりました。頑張ります。</span></div>
                </div>
                <div class="explanation">仕事を頼まれた場合、「わかりました、頑張ります」が自然な返答です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">7</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-08/audio/m4_q11.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s5-7')">スクリプトを見る</button>
            <div class="script" id="s5-7"><span class="script-label">スクリプト</span>「ご注文はお決まりでしょうか。」</div>
            <div class="question" data-answer="2">
                <div class="question-number">問7</div>
                <div class="question-text">返事を選んでください。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">注文はしません。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">すみません、もう少し時間をいただけますか。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">メニューはどこですか。</span></div>
                </div>
                <div class="explanation">まだ決まっていない場合は「もう少し時間をいただけますか」が自然です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">8</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-08/audio/m4_q12.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s5-8')">スクリプトを見る</button>
            <div class="script" id="s5-8"><span class="script-label">スクリプト</span>「最近、顔色がいいね。何かいいことあった？」</div>
            <div class="question" data-answer="1">
                <div class="question-number">問8</div>
                <div class="question-text">返事を選んでください。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">ありがとう。実は先週から運動を始めたんだ。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">顔色はどこですか。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">最近は忙しくて大変です。</span></div>
                </div>
                <div class="explanation">顔色がいいとほめられた場合、感謝して理由を説明するのが自然です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">9</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-08/audio/m4_q13.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s5-9')">スクリプトを見る</button>
            <div class="script" id="s5-9"><span class="script-label">スクリプト</span>「このレポート、もう少し詳しく書いてもらえますか。」</div>
            <div class="question" data-answer="3">
                <div class="question-number">問9</div>
                <div class="question-text">返事を選んでください。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">レポートはどこですか。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">詳しくは書けません。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">承知しました。どの部分を詳しく書けばいいですか。</span></div>
                </div>
                <div class="explanation">修正の依頼への返答として「承知しました」と具体的な確認をするのが自然です。</div>
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
