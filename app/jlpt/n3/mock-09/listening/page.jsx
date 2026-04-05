'use client'
import AccessCheck from '../../../AccessCheck'

export default function Page() {
  return (
    <>
      <AccessCheck level="N3" mockNum={9} />
      <div dangerouslySetInnerHTML={{ __html: `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JLPT N3 Listening - MOCK-09 | Nihon GO!</title>
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
        <h1>JLPT N3 Mock Test 09 - 聴解</h1>
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
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-09/audio/m1_q1.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s1-1')">スクリプトを見る</button>
            <div class="script" id="s1-1"><span class="script-label">スクリプト</span>
                <strong>質問：女の人はこの後まず何をしますか。</strong><br><br>
                <span class="speaker male">男：</span>木村さん、新商品の企画書できましたか。<br>
                <span class="speaker female">女：</span>内容はほぼできているんですが、データのグラフがまだなんです。<br>
                <span class="speaker male">男：</span>グラフを追加する前に、一度内容を部長に見せた方がいいですよ。修正があるかもしれないので。<br>
                <span class="speaker female">女：</span>そうですね。では先に部長に確認してもらってからグラフを作ります。
            </div>
            <div class="question" data-answer="3">
                <div class="question-number">問1</div>
                <div class="question-text">女の人はこの後まず何をしますか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">グラフを作る</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">企画書の内容を修正する</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">部長に企画書を確認してもらう</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">データを集める</span></div>
                </div>
                <div class="explanation">「先に部長に確認してもらってからグラフを作ります」と言っています。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">2</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-09/audio/m1_q2.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s1-2')">スクリプトを見る</button>
            <div class="script" id="s1-2"><span class="script-label">スクリプト</span>
                <strong>質問：二人はどの交通手段を使うことにしましたか。</strong><br><br>
                <span class="speaker female">女：</span>会場まで、電車とバスどっちで行く？<br>
                <span class="speaker male">男：</span>電車の方が早いけど、荷物が多いからバスの方が楽じゃない？<br>
                <span class="speaker female">女：</span>でも今日は雨だし、バス停まで歩くのが大変だな。<br>
                <span class="speaker male">男：</span>じゃあタクシーにしよう。<br>
                <span class="speaker female">女：</span>そうしよう。
            </div>
            <div class="question" data-answer="3">
                <div class="question-number">問2</div>
                <div class="question-text">二人はどの交通手段を使うことにしましたか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">電車</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">バス</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">タクシー</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">自転車</span></div>
                </div>
                <div class="explanation">「じゃあタクシーにしよう」「そうしよう」と決まりました。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">3</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-09/audio/m1_q3.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s1-3')">スクリプトを見る</button>
            <div class="script" id="s1-3"><span class="script-label">スクリプト</span>
                <strong>質問：男の人はこの後まず何をしますか。</strong><br><br>
                <span class="speaker female">女：</span>展示会の準備、何から始める？<br>
                <span class="speaker male">男：</span>まず会場のレイアウトを考えないと。でもその前に展示品の数を確認しないと配置が決められないな。<br>
                <span class="speaker female">女：</span>じゃあ私がレイアウトを考えるから、あなたは展示品の数を確認して。<br>
                <span class="speaker male">男：</span>わかった。じゃあまず展示品の数を確認する。
            </div>
            <div class="question" data-answer="4">
                <div class="question-number">問3</div>
                <div class="question-text">男の人はこの後まず何をしますか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">会場を予約する</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">レイアウトを考える</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">展示品を運ぶ</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">展示品の数を確認する</span></div>
                </div>
                <div class="explanation">「まず展示品の数を確認する」と言っています。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">4</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-09/audio/m1_q4.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s1-4')">スクリプトを見る</button>
            <div class="script" id="s1-4"><span class="script-label">スクリプト</span>
                <strong>質問：女の人はどのプランを選びましたか。</strong><br><br>
                <span class="speaker female">女：</span>このジム、月額プランと年間プランがあるんだけど、どっちがいいかな。<br>
                <span class="speaker male">男：</span>年間プランの方が1ヶ月あたりは安いけど、続けられるか不安じゃない？<br>
                <span class="speaker female">女：</span>確かに。まず月額プランで試してみて、続けられそうだったら年間に変えよう。<br>
                <span class="speaker male">男：</span>それがいいね。
            </div>
            <div class="question" data-answer="1">
                <div class="question-number">問4</div>
                <div class="question-text">女の人はどのプランを選びましたか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">月額プラン</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">年間プラン</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">週払いプラン</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">まだ決めていない</span></div>
                </div>
                <div class="explanation">「まず月額プランで試してみる」と言っています。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">5</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-09/audio/m1_q5.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s1-5')">スクリプトを見る</button>
            <div class="script" id="s1-5"><span class="script-label">スクリプト</span>
                <strong>質問：二人はどこで食事をすることにしましたか。</strong><br><br>
                <span class="speaker female">女：</span>今日のランチ、どこにする？<br>
                <span class="speaker male">男：</span>新しくできたイタリアンはどう？<br>
                <span class="speaker female">女：</span>いいけど、昨日もパスタ食べたから和食がいいな。<br>
                <span class="speaker male">男：</span>じゃあ近くの定食屋はどう？<br>
                <span class="speaker female">女：</span>いいね、そこにしよう。
            </div>
            <div class="question" data-answer="2">
                <div class="question-number">問5</div>
                <div class="question-text">二人はどこで食事をすることにしましたか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">イタリアンレストラン</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">定食屋</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">カフェ</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">ラーメン屋</span></div>
                </div>
                <div class="explanation">「じゃあ近くの定食屋はどう？」「いいね、そこにしよう」と決まりました。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">6</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-09/audio/m1_q6.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s1-6')">スクリプトを見る</button>
            <div class="script" id="s1-6"><span class="script-label">スクリプト</span>
                <strong>質問：女の人はこの後まず何をしますか。</strong><br><br>
                <span class="speaker male">男：</span>イベントの告知、もうした？<br>
                <span class="speaker female">女：</span>SNSにはまだなんだけど、その前にポスターを作らないといけないな。<br>
                <span class="speaker male">男：</span>じゃあ僕がSNSの文章を考えるから、あなたはポスターを作って。<br>
                <span class="speaker female">女：</span>わかった。じゃあまずポスターを作る。
            </div>
            <div class="question" data-answer="2">
                <div class="question-number">問6</div>
                <div class="question-text">女の人はこの後まず何をしますか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-label">1</span><span class="option-text">SNSに投稿する</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">ポスターを作る</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">SNSの文章を考える</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">会場を予約する</span></div>
                </div>
                <div class="explanation">「まずポスターを作る」と言っています。</div>
            </div>
        </div>
        </div>

        <!-- 問題2: ポイント理解 -->
        <div class="mondai-section">
        <div class="mondai-header">問題2 ポイント理解</div>
        <div class="mondai-instruction">はじめに質問を聞いてください。それから話を聞いて、答えを選んでください。</div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">1</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-09/audio/m2_q1.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s2-1')">スクリプトを見る</button>
            <div class="script" id="s2-1"><span class="script-label">スクリプト</span>
                <strong>質問：このスーパーのタイムセールは何時から始まりますか。</strong><br><br>
                <span class="speaker female">アナウンス：</span>お客様にお知らせいたします。本日午後6時より、生鮮食品を中心にタイムセールを開催いたします。一部の商品は最大50%オフになります。数量に限りがございますので、お早めにどうぞ。セールは午後8時までとなっております。
            </div>
            <div class="question" data-answer="3">
                <div class="question-number">問1</div>
                <div class="question-text">タイムセールは何時から始まりますか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">午後4時</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">午後5時</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">午後6時</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">午後8時</span></div>
                </div>
                <div class="explanation">「本日午後6時よりタイムセールを開催いたします」とあります。午後8時は終了時間です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">2</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-09/audio/m2_q2.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s2-2')">スクリプトを見る</button>
            <div class="script" id="s2-2"><span class="script-label">スクリプト</span>
                <strong>質問：女の人はなぜ転職を考えていますか。</strong><br><br>
                <span class="speaker male">男：</span>最近元気がないけど、大丈夫？<br>
                <span class="speaker female">女：</span>実は転職を考えていて。今の仕事は給料はいいんだけど、残業が多くてプライベートの時間が全然なくて。<br>
                <span class="speaker male">男：</span>それは大変だね。<br>
                <span class="speaker female">女：</span>もっと自分の時間を大切にできる仕事がしたいな。
            </div>
            <div class="question" data-answer="3">
                <div class="question-number">問2</div>
                <div class="question-text">女の人はなぜ転職を考えていますか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">給料が低いから</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">仕事内容が嫌いだから</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">残業が多くてプライベートの時間がないから</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">職場の人間関係が悪いから</span></div>
                </div>
                <div class="explanation">「残業が多くてプライベートの時間が全然ない」と言っています。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">3</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-09/audio/m2_q3.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s2-3')">スクリプトを見る</button>
            <div class="script" id="s2-3"><span class="script-label">スクリプト</span>
                <strong>質問：このホテルで一番人気の部屋タイプは何ですか。</strong><br><br>
                <span class="speaker female">スタッフ：</span>当ホテルのお部屋についてご説明します。一番人気はオーシャンビュールームで、海が一望できます。次に人気なのがマウンテンビュールーム、そしてシティビュールームとなっています。週末はオーシャンビュールームがすぐに埋まりますので、お早めのご予約をおすすめします。
            </div>
            <div class="question" data-answer="1">
                <div class="question-number">問3</div>
                <div class="question-text">一番人気の部屋タイプは何ですか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">オーシャンビュールーム</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">マウンテンビュールーム</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">シティビュールーム</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">スタンダードルーム</span></div>
                </div>
                <div class="explanation">「一番人気はオーシャンビュールームで」と言っています。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">4</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-09/audio/m2_q4.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s2-4')">スクリプトを見る</button>
            <div class="script" id="s2-4"><span class="script-label">スクリプト</span>
                <strong>質問：男の人はなぜ日本語を勉強し始めましたか。</strong><br><br>
                <span class="speaker female">女：</span>日本語を勉強し始めたのはいつですか。<br>
                <span class="speaker male">男：</span>3年前です。最初は仕事で日本の取引先と話す必要があったからです。でも今は日本のアニメや映画が好きで、もっと楽しみたくて続けています。<br>
                <span class="speaker female">女：</span>すごいですね。<br>
                <span class="speaker male">男：</span>最初の理由とは変わりましたが、楽しいので続けています。
            </div>
            <div class="question" data-answer="1">
                <div class="question-number">問4</div>
                <div class="question-text">男の人が最初に日本語を勉強し始めた理由は何ですか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">仕事で日本の取引先と話す必要があったから</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">アニメが好きだったから</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">日本映画が好きだったから</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">日本に旅行したかったから</span></div>
                </div>
                <div class="explanation">「最初は仕事で日本の取引先と話す必要があったから」と言っています。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">5</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-09/audio/m2_q5.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s2-5')">スクリプトを見る</button>
            <div class="script" id="s2-5"><span class="script-label">スクリプト</span>
                <strong>質問：女の人の専門は何ですか。</strong><br><br>
                <span class="speaker male">男：</span>田村さんは大学で何を専攻されているんですか。<br>
                <span class="speaker female">女：</span>心理学を専攻しています。特に子供の発達心理に興味があって、卒業論文もそのテーマで書いています。<br>
                <span class="speaker male">男：</span>将来は何になりたいですか。<br>
                <span class="speaker female">女：</span>臨床心理士になって、子供のカウンセリングをしたいと思っています。
            </div>
            <div class="question" data-answer="2">
                <div class="question-number">問5</div>
                <div class="question-text">女の人の専攻は何ですか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">教育学</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">心理学</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">医学</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">社会学</span></div>
                </div>
                <div class="explanation">「心理学を専攻しています」と言っています。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">6</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-09/audio/m2_q6.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s2-6')">スクリプトを見る</button>
            <div class="script" id="s2-6"><span class="script-label">スクリプト</span>
                <strong>質問：日本で最も人気のある旅行先はどこですか。</strong><br><br>
                <span class="speaker female">ナレーター：</span>調査によると、日本国内で最も人気のある旅行先は京都で、次いで北海道、沖縄の順となっています。外国人観光客にも京都は特に人気が高く、世界遺産が多いことが理由の一つとして挙げられています。
            </div>
            <div class="question" data-answer="1">
                <div class="question-number">問6</div>
                <div class="question-text">日本で最も人気のある旅行先はどこですか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">京都</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">北海道</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">沖縄</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">東京</span></div>
                </div>
                <div class="explanation">「最も人気のある旅行先は京都で、次いで北海道、沖縄」と言っています。</div>
            </div>
        </div>
        </div>

        <!-- 問題3: 概要理解 -->
        <div class="mondai-section">
        <div class="mondai-header">問題3 概要理解</div>
        <div class="mondai-instruction">話を聞いて、話し手が最も言いたいことを選んでください。</div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">1</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-09/audio/m3_q1.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s3-1')">スクリプトを見る</button>
            <div class="script" id="s3-1"><span class="script-label">スクリプト</span>
                <span class="speaker female">女：</span>忙しい毎日の中でも、食事の質を上げることは可能です。例えば、週末に野菜を切って冷蔵庫に保存しておくだけで、平日の料理が簡単になります。また、インスタント食品を使うときも、野菜をプラスするだけで栄養バランスが改善します。完璧な食事を目指すより、少しずつ改善していくことが長続きのコツです。
            </div>
            <div class="question" data-answer="3">
                <div class="question-number">問1</div>
                <div class="question-text">この人が一番言いたいことは何ですか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">忙しい人は食事の質を上げることができない</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">インスタント食品は食べてはいけない</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">完璧を目指さず少しずつ改善していくことが食事の質を上げる近道だ</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">週末は必ず料理をしなければならない</span></div>
                </div>
                <div class="explanation">「完璧な食事を目指すより、少しずつ改善していくことが長続きのコツ」が主張です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">2</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-09/audio/m3_q2.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s3-2')">スクリプトを見る</button>
            <div class="script" id="s3-2"><span class="script-label">スクリプト</span>
                <span class="speaker male">先生：</span>語学を学ぶ際、完璧な発音や文法を最初から求めすぎると、話すことへの恐怖心が生まれます。最初は間違えても構いません。大切なのは、積極的に使ってみることです。間違いを恐れずに話すことで、自然と上達していきます。失敗は学習の一部だと考えてください。
            </div>
            <div class="question" data-answer="2">
                <div class="question-number">問2</div>
                <div class="question-text">先生が一番言いたいことは何ですか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">発音と文法を完璧にしてから話すべきだ</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">間違いを恐れず積極的に使うことが語学上達の近道だ</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">語学は才能がないと上達しない</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">語学学習に失敗はつきものなのであきらめるべきだ</span></div>
                </div>
                <div class="explanation">「間違いを恐れずに話すことで自然と上達する」「失敗は学習の一部」が主張です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">3</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-09/audio/m3_q3.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s3-3')">スクリプトを見る</button>
            <div class="script" id="s3-3"><span class="script-label">スクリプト</span>
                <span class="speaker female">女：</span>職場でのコミュニケーションで大切なのは、報告・連絡・相談、いわゆる「ほうれんそう」です。仕事の進捗を上司に報告し、変化があれば連絡し、判断に迷ったときは相談する。この3つを習慣にすることで、トラブルを未然に防ぎ、チームで効率よく仕事を進めることができます。
            </div>
            <div class="question" data-answer="4">
                <div class="question-number">問3</div>
                <div class="question-text">この人が一番言いたいことは何ですか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">職場では上司に全て任せるべきだ</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">ほうれんそうは野菜の名前だ</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">トラブルが起きてから相談すればよい</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">報告・連絡・相談を習慣にすることでトラブルを防ぎ効率よく仕事できる</span></div>
                </div>
                <div class="explanation">「報告・連絡・相談の3つを習慣にすることでトラブルを未然に防ぎ効率よく仕事を進められる」が主張です。</div>
            </div>
        </div>
        </div>

        <!-- 問題4: 発話表現 -->
        <div class="mondai-section">
        <div class="mondai-header">問題4 発話表現</div>
        <div class="mondai-instruction">状況を聞いて、適切な発話を選んでください。</div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">1</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-09/audio/m4_q1.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s4-1')">スクリプトを見る</button>
            <div class="script" id="s4-1"><span class="script-label">スクリプト</span>上司から急な残業を頼まれましたが、今日は用事があって難しいです。丁寧に断ります。なんと言いますか。</div>
            <div class="question" data-answer="2">
                <div class="question-number">問1</div>
                <div class="question-text">なんと言いますか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">残業はできません。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">申し訳ありませんが、本日はどうしても外せない用事がございまして。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">用事があるので帰ります。</span></div>
                </div>
                <div class="explanation">上司への丁寧な断りとして「申し訳ありませんが〜外せない用事がございまして」が適切です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">2</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-09/audio/m4_q2.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s4-2')">スクリプトを見る</button>
            <div class="script" id="s4-2"><span class="script-label">スクリプト</span>取引先の方からプレゼントをいただきました。お礼を言います。なんと言いますか。</div>
            <div class="question" data-answer="3">
                <div class="question-number">問2</div>
                <div class="question-text">なんと言いますか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">プレゼントはいりません。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">プレゼントはどこで買いましたか。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">ありがとうございます。大切にいたします。</span></div>
                </div>
                <div class="explanation">プレゼントをいただいたときは感謝の言葉と大切にする気持ちを伝えるのが自然です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">3</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-09/audio/m4_q3.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s4-3')">スクリプトを見る</button>
            <div class="script" id="s4-3"><span class="script-label">スクリプト</span>会議室を使いたいですが、先客がいます。確認します。なんと言いますか。</div>
            <div class="question" data-answer="1">
                <div class="question-number">問3</div>
                <div class="question-text">なんと言いますか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">すみません、この部屋はいつまでお使いになりますか。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">出ていってください。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">会議室はどこですか。</span></div>
                </div>
                <div class="explanation">先客への確認として「いつまでお使いになりますか」が丁寧で自然です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">4</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-09/audio/m4_q4.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s4-4')">スクリプトを見る</button>
            <div class="script" id="s4-4"><span class="script-label">スクリプト</span>電話で取引先の方に商品の説明をしています。もう一度説明してほしいと言われました。なんと言いますか。</div>
            <div class="question" data-answer="2">
                <div class="question-number">問4</div>
                <div class="question-text">なんと言いますか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">もう説明しません。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">かしこまりました。それではもう一度ご説明いたします。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">わかりましたか。</span></div>
                </div>
                <div class="explanation">再度の説明を求められたときは「かしこまりました。もう一度ご説明いたします」が適切です。</div>
            </div>
        </div>
        </div>

        <!-- 問題5: 即時応答 -->
        <div class="mondai-section">
        <div class="mondai-header">問題5 即時応答</div>
        <div class="mondai-instruction">短い文を聞いて、正しい返事を選んでください。</div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">1</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-09/audio/m4_q5.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s5-1')">スクリプトを見る</button>
            <div class="script" id="s5-1"><span class="script-label">スクリプト</span>「ただいま担当者が外出しております。」</div>
            <div class="question" data-answer="2">
                <div class="question-number">問1</div>
                <div class="question-text">返事を選んでください。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">担当者はどこにいますか。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">そうですか。では後ほどまたお電話します。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">外出は好きです。</span></div>
                </div>
                <div class="explanation">担当者が不在だと言われたときは「後ほどまた連絡する」が自然な返答です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">2</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-09/audio/m4_q6.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s5-2')">スクリプトを見る</button>
            <div class="script" id="s5-2"><span class="script-label">スクリプト</span>「報告書の提出期限はいつですか。」</div>
            <div class="question" data-answer="3">
                <div class="question-number">問2</div>
                <div class="question-text">返事を選んでください。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">報告書は難しいです。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">提出はしません。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">今週の金曜日までです。</span></div>
                </div>
                <div class="explanation">期限を聞かれているので、日付を答えるのが自然です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">3</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-09/audio/m4_q7.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s5-3')">スクリプトを見る</button>
            <div class="script" id="s5-3"><span class="script-label">スクリプト</span>「先日の件、ご検討いただけましたか。」</div>
            <div class="question" data-answer="1">
                <div class="question-number">問3</div>
                <div class="question-text">返事を選んでください。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">はい、前向きに検討しております。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">先日はどこですか。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">検討は好きではありません。</span></div>
                </div>
                <div class="explanation">検討状況を聞かれているので、状況を答えるのが自然です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">4</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-09/audio/m4_q8.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s5-4')">スクリプトを見る</button>
            <div class="script" id="s5-4"><span class="script-label">スクリプト</span>「おはようございます。今日もよろしくお願いします。」</div>
            <div class="question" data-answer="2">
                <div class="question-number">問4</div>
                <div class="question-text">返事を選んでください。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">おやすみなさい。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">おはようございます。こちらこそよろしくお願いします。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">今日は忙しいです。</span></div>
                </div>
                <div class="explanation">「おはようございます」への返答は同じ挨拶で返すのが自然です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">5</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-09/audio/m4_q9.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s5-5')">スクリプトを見る</button>
            <div class="script" id="s5-5"><span class="script-label">スクリプト</span>「この書類に印鑑をお願いできますか。」</div>
            <div class="question" data-answer="3">
                <div class="question-number">問5</div>
                <div class="question-text">返事を選んでください。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">印鑑はどこですか。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">印鑑は押しません。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">はい、こちらでよろしいですか。</span></div>
                </div>
                <div class="explanation">印鑑を押すよう依頼されたときは確認しながら対応するのが自然です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">6</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-09/audio/m4_q10.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s5-6')">スクリプトを見る</button>
            <div class="script" id="s5-6"><span class="script-label">スクリプト</span>「最近、仕事が楽しくなってきた。」</div>
            <div class="question" data-answer="1">
                <div class="question-number">問6</div>
                <div class="question-text">返事を選んでください。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">それはよかった。何かきっかけがあったの？</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">仕事は楽しくないです。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">仕事はどこですか。</span></div>
                </div>
                <div class="explanation">良い知らせへの返答として「よかった、きっかけを聞く」が最も自然です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">7</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-09/audio/m4_q11.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s5-7')">スクリプトを見る</button>
            <div class="script" id="s5-7"><span class="script-label">スクリプト</span>「こちらの商品、在庫はありますか。」</div>
            <div class="question" data-answer="2">
                <div class="question-number">問7</div>
                <div class="question-text">返事を選んでください。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">商品は好きです。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">少々お待ちください。確認いたします。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">在庫はどこですか。</span></div>
                </div>
                <div class="explanation">在庫を聞かれたときは確認してから答えるのが自然です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">8</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-09/audio/m4_q12.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s5-8')">スクリプトを見る</button>
            <div class="script" id="s5-8"><span class="script-label">スクリプト</span>「このプロジェクト、うまくいくかな…」</div>
            <div class="question" data-answer="3">
                <div class="question-number">問8</div>
                <div class="question-text">返事を選んでください。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">プロジェクトは大変です。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">うまくいきません。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">きっと大丈夫だよ。みんなで頑張ろう。</span></div>
                </div>
                <div class="explanation">不安を感じている相手には励ましの言葉が自然です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">9</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-09/audio/m4_q13.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s5-9')">スクリプトを見る</button>
            <div class="script" id="s5-9"><span class="script-label">スクリプト</span>「お電話ありがとうございます。ABC商事でございます。」</div>
            <div class="question" data-answer="1">
                <div class="question-number">問9</div>
                <div class="question-text">返事を選んでください。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">お世話になっております。XYZ株式会社の田中と申します。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">電話はどこですか。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">ABC商事は好きです。</span></div>
                </div>
                <div class="explanation">ビジネス電話への返答として「お世話になっております。〜と申します」が適切です。</div>
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
