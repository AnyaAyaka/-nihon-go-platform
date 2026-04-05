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
    <title>JLPT N3 Listening - MOCK-06 | Nihon GO!</title>
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
        <h1>JLPT N3 Mock Test 06 - 聴解</h1>
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
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-06/audio/m1_q1.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s1-1')">スクリプトを見る</button>
            <div class="script" id="s1-1"><span class="script-label">スクリプト</span>
                <strong>質問：男の人はこの後まず何をしますか。</strong><br><br>
                <span class="speaker female">女：</span>田中さん、明日の発表の準備はできていますか。<br>
                <span class="speaker male">男：</span>スライドはできているんですが、まだ原稿を書いていないんです。<br>
                <span class="speaker female">女：</span>先に部長に内容を確認してもらった方がいいですよ。それから原稿を書いた方が効率的です。<br>
                <span class="speaker male">男：</span>そうですね。では先に部長に相談してから原稿を書きます。
            </div>
            <div class="question" data-answer="2">
                <div class="question-number">問1</div>
                <div class="question-text">男の人はこの後まず何をしますか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">スライドを作る</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">部長に内容を確認してもらう</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">原稿を書く</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">発表の練習をする</span></div>
                </div>
                <div class="explanation">「先に部長に相談してから原稿を書きます」と言っています。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">2</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-06/audio/m1_q2.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s1-2')">スクリプトを見る</button>
            <div class="script" id="s1-2"><span class="script-label">スクリプト</span>
                <strong>質問：女の人はどのチケットを買いますか。</strong><br><br>
                <span class="speaker female">女：</span>すみません、東京まで行きたいんですが。<br>
                <span class="speaker male">駅員：</span>自由席は3,000円、指定席は3,500円です。<br>
                <span class="speaker female">女：</span>自由席と指定席、どちらが空いていますか。<br>
                <span class="speaker male">駅員：</span>今日は自由席がかなり混んでいます。指定席なら確実に座れますよ。<br>
                <span class="speaker female">女：</span>じゃあ指定席にします。
            </div>
            <div class="question" data-answer="2">
                <div class="question-number">問2</div>
                <div class="question-text">女の人はどのチケットを買いますか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">自由席（3,000円）</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">指定席（3,500円）</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">グリーン席</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">まだ決めていない</span></div>
                </div>
                <div class="explanation">「じゃあ指定席にします」と言っています。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">3</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-06/audio/m1_q3.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s1-3')">スクリプトを見る</button>
            <div class="script" id="s1-3"><span class="script-label">スクリプト</span>
                <strong>質問：二人は何をすることにしましたか。</strong><br><br>
                <span class="speaker female">女：</span>週末、何する？映画でも見に行く？<br>
                <span class="speaker male">男：</span>いいね。でも最近ずっと映画だから、たまには外でご飯でも食べない？<br>
                <span class="speaker female">女：</span>それもいいね。じゃあ新しくできたイタリアンレストランに行ってみよう。<br>
                <span class="speaker male">男：</span>いいね、そうしよう。
            </div>
            <div class="question" data-answer="3">
                <div class="question-number">問3</div>
                <div class="question-text">二人は何をすることにしましたか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">映画を見に行く</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">家で料理をする</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">イタリアンレストランに行く</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">公園に散歩に行く</span></div>
                </div>
                <div class="explanation">「新しくできたイタリアンレストランに行ってみよう」と決まりました。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">4</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-06/audio/m1_q4.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s1-4')">スクリプトを見る</button>
            <div class="script" id="s1-4"><span class="script-label">スクリプト</span>
                <strong>質問：男の人はこの後まず何をしますか。</strong><br><br>
                <span class="speaker female">女：</span>引越しの準備、どうする？<br>
                <span class="speaker male">男：</span>まず不用品を処分しないと。でもその前に荷物の量を確認しないと業者を選べないな。<br>
                <span class="speaker female">女：</span>じゃあ私が業者に見積もりを頼むから、あなたは荷物の量を確認してね。<br>
                <span class="speaker male">男：</span>わかった。じゃあ先に荷物の量を確認する。
            </div>
            <div class="question" data-answer="1">
                <div class="question-number">問4</div>
                <div class="question-text">男の人はこの後まず何をしますか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">荷物の量を確認する</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">不用品を処分する</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">業者に見積もりを頼む</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">新しい家を探す</span></div>
                </div>
                <div class="explanation">「じゃあ先に荷物の量を確認する」と言っています。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">5</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-06/audio/m1_q5.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s1-5')">スクリプトを見る</button>
            <div class="script" id="s1-5"><span class="script-label">スクリプト</span>
                <strong>質問：女の人はどのコースを選びますか。</strong><br><br>
                <span class="speaker male">スタッフ：</span>ジムのコースはベーシック、スタンダード、プレミアムの3つがございます。<br>
                <span class="speaker female">女：</span>プールも使いたいんですが。<br>
                <span class="speaker male">スタッフ：</span>プールはスタンダード以上でご利用いただけます。<br>
                <span class="speaker female">女：</span>じゃあスタンダードにします。プレミアムは高すぎるので。
            </div>
            <div class="question" data-answer="2">
                <div class="question-number">問5</div>
                <div class="question-text">女の人はどのコースを選びますか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">ベーシック</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">スタンダード</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">プレミアム</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">まだ決めていない</span></div>
                </div>
                <div class="explanation">「じゃあスタンダードにします」と言っています。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">6</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-06/audio/m1_q6.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s1-6')">スクリプトを見る</button>
            <div class="script" id="s1-6"><span class="script-label">スクリプト</span>
                <strong>質問：女の人はこの後まず何をしますか。</strong><br><br>
                <span class="speaker male">男：</span>レポート、もうできた？<br>
                <span class="speaker female">女：</span>本文はできたんだけど、参考文献リストがまだなんだ。あと先生に提出する前に一度読み直したい。<br>
                <span class="speaker male">男：</span>じゃあ先に参考文献を書いてから読み直したら？<br>
                <span class="speaker female">女：</span>そうする。じゃあまず参考文献リストを完成させる。
            </div>
            <div class="question" data-answer="3">
                <div class="question-number">問6</div>
                <div class="question-text">女の人はこの後まず何をしますか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">本文を書く</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">レポートを読み直す</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">参考文献リストを書く</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">先生に提出する</span></div>
                </div>
                <div class="explanation">「まず参考文献リストを完成させる」と言っています。</div>
            </div>
        </div>
        </div>

        <!-- 問題2: ポイント理解 -->
        <div class="mondai-section">
        <div class="mondai-header">問題2 ポイント理解</div>
        <div class="mondai-instruction">はじめに質問を聞いてください。それから話を聞いて、答えを選んでください。</div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">1</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-06/audio/m2_q1.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s2-1')">スクリプトを見る</button>
            <div class="script" id="s2-1"><span class="script-label">スクリプト</span>
                <strong>質問：このお店のセールはいつですか。</strong><br><br>
                <span class="speaker female">アナウンス：</span>本日のお知らせです。明日10月25日（土）から27日（月）の3日間、店内全品20%オフのセールを行います。なお、一部の商品はセール対象外となっております。詳しくは店員までお問い合わせください。
            </div>
            <div class="question" data-answer="2">
                <div class="question-number">問1</div>
                <div class="question-text">このお店のセールはいつですか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">今日</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">明日から3日間</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">今週末だけ</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">来月から</span></div>
                </div>
                <div class="explanation">「明日10月25日（土）から27日（月）の3日間」とあります。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">2</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-06/audio/m2_q2.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s2-2')">スクリプトを見る</button>
            <div class="script" id="s2-2"><span class="script-label">スクリプト</span>
                <strong>質問：女の人はなぜ料理教室をやめましたか。</strong><br><br>
                <span class="speaker male">男：</span>料理教室、続けているの？<br>
                <span class="speaker female">女：</span>やめちゃった。料理自体は楽しかったんだけど、毎週土曜日に通うのが大変で。仕事が忙しくなって、休日くらいゆっくりしたいなと思って。<br>
                <span class="speaker male">男：</span>そうか、残念だね。<br>
                <span class="speaker female">女：</span>また時間ができたら再開したいな。
            </div>
            <div class="question" data-answer="3">
                <div class="question-number">問2</div>
                <div class="question-text">女の人はなぜ料理教室をやめましたか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">料理が嫌いになったから</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">料理が上手になったから</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">仕事が忙しくなって休日に休みたいから</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">教室が遠くなったから</span></div>
                </div>
                <div class="explanation">「仕事が忙しくなって、休日くらいゆっくりしたい」と言っています。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">3</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-06/audio/m2_q3.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s2-3')">スクリプトを見る</button>
            <div class="script" id="s2-3"><span class="script-label">スクリプト</span>
                <strong>質問：このホテルで一番人気のサービスは何ですか。</strong><br><br>
                <span class="speaker female">スタッフ：</span>当ホテルでは様々なサービスをご用意しております。一番人気は屋上の温泉で、夜景を見ながらご入浴いただけます。次いで人気なのがレストランのモーニングビュッフェです。スパマッサージも好評ですが、事前予約が必要です。
            </div>
            <div class="question" data-answer="1">
                <div class="question-number">問3</div>
                <div class="question-text">このホテルで一番人気のサービスは何ですか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">屋上の温泉</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">モーニングビュッフェ</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">スパマッサージ</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">ルームサービス</span></div>
                </div>
                <div class="explanation">「一番人気は屋上の温泉で」と言っています。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">4</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-06/audio/m2_q4.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s2-4')">スクリプトを見る</button>
            <div class="script" id="s2-4"><span class="script-label">スクリプト</span>
                <strong>質問：男の人が新しい趣味を始めた理由は何ですか。</strong><br><br>
                <span class="speaker female">女：</span>最近、写真を撮り始めたって聞いたけど。<br>
                <span class="speaker male">男：</span>うん。去年、友達の結婚式でプロのカメラマンの写真を見て感動してね。自分でもやってみたくなって。<br>
                <span class="speaker female">女：</span>いいきっかけだね。<br>
                <span class="speaker male">男：</span>最初は難しかったけど、少しずつ上達してきて楽しくなってきたよ。
            </div>
            <div class="question" data-answer="2">
                <div class="question-number">問4</div>
                <div class="question-text">男の人が写真を始めた理由は何ですか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">仕事で必要になったから</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">友達の結婚式でプロの写真に感動したから</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">カメラが安くなったから</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">友達に誘われたから</span></div>
                </div>
                <div class="explanation">「友達の結婚式でプロのカメラマンの写真を見て感動して、自分でもやってみたくなった」と言っています。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">5</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-06/audio/m2_q5.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s2-5')">スクリプトを見る</button>
            <div class="script" id="s2-5"><span class="script-label">スクリプト</span>
                <strong>質問：女の人の専門は何ですか。</strong><br><br>
                <span class="speaker male">男：</span>田中さんは大学で何を専攻されているんですか。<br>
                <span class="speaker female">女：</span>環境科学を専攻しています。特に海洋汚染の研究をしています。<br>
                <span class="speaker male">男：</span>それは重要な研究ですね。他の分野も勉強されているんですか。<br>
                <span class="speaker female">女：</span>政策についても少し学んでいますが、メインは環境科学です。
            </div>
            <div class="question" data-answer="3">
                <div class="question-number">問5</div>
                <div class="question-text">女の人の専門は何ですか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">政策学</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">海洋生物学</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">環境科学</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">国際関係学</span></div>
                </div>
                <div class="explanation">「環境科学を専攻しています」「メインは環境科学です」と言っています。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">6</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-06/audio/m2_q6.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s2-6')">スクリプトを見る</button>
            <div class="script" id="s2-6"><span class="script-label">スクリプト</span>
                <strong>質問：日本で最も多く消費されているエネルギーは何ですか。</strong><br><br>
                <span class="speaker male">ナレーター：</span>調査によると、日本で最も多く消費されているエネルギーは石油で、次いで天然ガス、石炭の順となっています。再生可能エネルギーの割合は少しずつ増えてきていますが、まだ全体の一部にとどまっています。
            </div>
            <div class="question" data-answer="1">
                <div class="question-number">問6</div>
                <div class="question-text">日本で最も多く消費されているエネルギーは何ですか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">石油</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">天然ガス</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">石炭</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">再生可能エネルギー</span></div>
                </div>
                <div class="explanation">「最も多く消費されているエネルギーは石油で、次いで天然ガス」と言っています。</div>
            </div>
        </div>
        </div>

        <!-- 問題3: 概要理解 -->
        <div class="mondai-section">
        <div class="mondai-header">問題3 概要理解</div>
        <div class="mondai-instruction">話を聞いて、話し手が最も言いたいことを選んでください。</div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">1</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-06/audio/m3_q1.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s3-1')">スクリプトを見る</button>
            <div class="script" id="s3-1"><span class="script-label">スクリプト</span>
                <span class="speaker male">課長：</span>皆さん、今期の営業成績についてお話しします。全体的に目標を達成できましたが、特に新規顧客の獲得が好調でした。これは皆さんの努力の結果です。来期はさらに既存顧客との関係強化にも力を入れていきたいと思います。引き続きよろしくお願いします。
            </div>
            <div class="question" data-answer="2">
                <div class="question-number">問1</div>
                <div class="question-text">課長が一番言いたいことは何ですか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">今期の成績は目標を達成できなかった</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">今期は新規顧客獲得が好調で、来期は既存顧客との関係強化にも力を入れる</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">来期は新規顧客獲得をやめる</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">皆さんの努力は足りなかった</span></div>
                </div>
                <div class="explanation">目標達成・新規顧客好調の報告と、来期は既存顧客強化も行うという方針が主な内容です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">2</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-06/audio/m3_q2.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s3-2')">スクリプトを見る</button>
            <div class="script" id="s3-2"><span class="script-label">スクリプト</span>
                <span class="speaker female">女：</span>睡眠の質を上げるためには、寝る前のスマートフォンの使用を控えることが大切です。画面の光が脳を刺激して眠りにくくなるからです。また、寝る1時間前には激しい運動や食事を避けることも重要です。毎日同じ時間に寝起きする習慣をつけることで、体内時計が整い、自然と眠れるようになります。
            </div>
            <div class="question" data-answer="3">
                <div class="question-number">問2</div>
                <div class="question-text">この人が一番言いたいことは何ですか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">スマートフォンをやめるべきだ</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">運動は体に悪い</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">生活習慣を整えることで睡眠の質が上がる</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">毎日12時間以上寝るべきだ</span></div>
                </div>
                <div class="explanation">スマホ・運動・食事・就寝時間など、生活習慣を整えることが睡眠の質向上につながるという主張です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">3</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-06/audio/m3_q3.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s3-3')">スクリプトを見る</button>
            <div class="script" id="s3-3"><span class="script-label">スクリプト</span>
                <span class="speaker male">先生：</span>ボランティア活動というと、何か特別なことをしなければならないと思う人も多いでしょう。しかし、近所のゴミ拾いや困っている人に道を教えるような小さな行動も、立派なボランティアです。大切なのは、誰かの役に立ちたいという気持ちを行動に移すことです。特別なスキルがなくても、できることから始めてみてください。
            </div>
            <div class="question" data-answer="4">
                <div class="question-number">問3</div>
                <div class="question-text">先生が一番言いたいことは何ですか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">ボランティアには特別なスキルが必要だ</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">ゴミ拾いだけがボランティアだ</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">ボランティアは時間がある人だけがするものだ</span></div>
                    <div class="option" data-value="4"><span class="option-label">4</span><span class="option-text">特別なスキルがなくてもできることからボランティアを始めてほしい</span></div>
                </div>
                <div class="explanation">「特別なスキルがなくても、できることから始めてみてください」が主張です。</div>
            </div>
        </div>
        </div>

        <!-- 問題4: 発話表現 -->
        <div class="mondai-section">
        <div class="mondai-header">問題4 発話表現</div>
        <div class="mondai-instruction">状況を聞いて、適切な発話を選んでください。</div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">1</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-06/audio/m4_q1.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s4-1')">スクリプトを見る</button>
            <div class="script" id="s4-1"><span class="script-label">スクリプト</span>友達が悩んでいます。話を聞いてあげたいです。なんと言いますか。</div>
            <div class="question" data-answer="2">
                <div class="question-number">問1</div>
                <div class="question-text">なんと言いますか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">悩むのはよくない。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">よかったら話してみて。一緒に考えるよ。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">私には関係ない。</span></div>
                </div>
                <div class="explanation">悩んでいる友達に寄り添う言葉として「話してみて、一緒に考えるよ」が最も自然です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">2</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-06/audio/m4_q2.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s4-2')">スクリプトを見る</button>
            <div class="script" id="s4-2"><span class="script-label">スクリプト</span>電車で席を譲りたいお年寄りがいます。なんと言いますか。</div>
            <div class="question" data-answer="1">
                <div class="question-number">問2</div>
                <div class="question-text">なんと言いますか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">よかったらどうぞ。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">席を取ってください。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">電車は混んでいます。</span></div>
                </div>
                <div class="explanation">席を譲るときは「よかったらどうぞ」が自然で丁寧な表現です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">3</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-06/audio/m4_q3.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s4-3')">スクリプトを見る</button>
            <div class="script" id="s4-3"><span class="script-label">スクリプト</span>友達から誕生日プレゼントをもらいました。なんと言いますか。</div>
            <div class="question" data-answer="3">
                <div class="question-number">問3</div>
                <div class="question-text">なんと言いますか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">プレゼントはいりません。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">誕生日はいつですか。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">わあ、ありがとう！うれしい！</span></div>
                </div>
                <div class="explanation">プレゼントをもらったときは感謝と喜びを伝えるのが自然です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">4</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-06/audio/m4_q4.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s4-4')">スクリプトを見る</button>
            <div class="script" id="s4-4"><span class="script-label">スクリプト</span>取引先との電話で、担当者が席を外しています。伝言をお願いします。なんと言いますか。</div>
            <div class="question" data-answer="2">
                <div class="question-number">問4</div>
                <div class="question-text">なんと言いますか。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">また電話します。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">よろしければ、折り返しご連絡いただけますでしょうか。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">担当者はどこにいますか。</span></div>
                </div>
                <div class="explanation">ビジネスの場面で折り返し電話をお願いする場合、「折り返しご連絡いただけますでしょうか」が適切です。</div>
            </div>
        </div>
        </div>

        <!-- 問題5: 即時応答 -->
        <div class="mondai-section">
        <div class="mondai-header">問題5 即時応答</div>
        <div class="mondai-instruction">短い文を聞いて、正しい返事を選んでください。</div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">1</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-06/audio/m4_q5.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s5-1')">スクリプトを見る</button>
            <div class="script" id="s5-1"><span class="script-label">スクリプト</span>「少々お待ちいただけますか。」</div>
            <div class="question" data-answer="2">
                <div class="question-number">問1</div>
                <div class="question-text">返事を選んでください。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">待ちません。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">はい、どうぞ。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">少々とはどのくらいですか。</span></div>
                </div>
                <div class="explanation">「少々お待ちいただけますか」への返答は「はい、どうぞ」が自然です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">2</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-06/audio/m4_q6.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s5-2')">スクリプトを見る</button>
            <div class="script" id="s5-2"><span class="script-label">スクリプト</span>「お荷物、お持ちしましょうか。」</div>
            <div class="question" data-answer="3">
                <div class="question-number">問2</div>
                <div class="question-text">返事を選んでください。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">荷物はありません。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">荷物は重いです。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">ありがとうございます。お願いします。</span></div>
                </div>
                <div class="explanation">荷物を持ってくれるという申し出への返答として感謝して受け入れるのが自然です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">3</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-06/audio/m4_q7.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s5-3')">スクリプトを見る</button>
            <div class="script" id="s5-3"><span class="script-label">スクリプト</span>「今日も一日お疲れ様。」</div>
            <div class="question" data-answer="1">
                <div class="question-number">問3</div>
                <div class="question-text">返事を選んでください。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">お疲れ様です。ありがとうございます。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">今日は疲れていません。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">一日はどのくらいですか。</span></div>
                </div>
                <div class="explanation">「お疲れ様」への返答は「お疲れ様です」と感謝の言葉が自然です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">4</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-06/audio/m4_q8.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s5-4')">スクリプトを見る</button>
            <div class="script" id="s5-4"><span class="script-label">スクリプト</span>「このプロジェクト、一緒にやってみない？」</div>
            <div class="question" data-answer="2">
                <div class="question-number">問4</div>
                <div class="question-text">返事を選んでください。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">プロジェクトは大変です。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">ぜひ！どんな内容か教えて。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">プロジェクトはどこにありますか。</span></div>
                </div>
                <div class="explanation">一緒にやろうという誘いに乗る場合、「ぜひ！」と詳細を聞くのが自然です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">5</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-06/audio/m4_q9.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s5-5')">スクリプトを見る</button>
            <div class="script" id="s5-5"><span class="script-label">スクリプト</span>「先ほどはご迷惑をおかけして申し訳ございませんでした。」</div>
            <div class="question" data-answer="3">
                <div class="question-number">問5</div>
                <div class="question-text">返事を選んでください。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">迷惑でした。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">先ほどはどこですか。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">いいえ、大丈夫ですよ。お気になさらず。</span></div>
                </div>
                <div class="explanation">謝罪への返答として「大丈夫ですよ、お気になさらず」が自然で丁寧な表現です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">6</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-06/audio/m4_q10.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s5-6')">スクリプトを見る</button>
            <div class="script" id="s5-6"><span class="script-label">スクリプト</span>「お時間があれば、今度うちに食事に来ませんか。」</div>
            <div class="question" data-answer="1">
                <div class="question-number">問6</div>
                <div class="question-text">返事を選んでください。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">ぜひ、ご招待いただきありがとうございます。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">食事は好きではありません。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">うちはどこですか。</span></div>
                </div>
                <div class="explanation">食事に招待されたときの返答として「ぜひ、ご招待いただきありがとうございます」が丁寧で自然です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">7</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-06/audio/m4_q11.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s5-7')">スクリプトを見る</button>
            <div class="script" id="s5-7"><span class="script-label">スクリプト</span>「資料の件、確認していただけましたか。」</div>
            <div class="question" data-answer="2">
                <div class="question-number">問7</div>
                <div class="question-text">返事を選んでください。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">資料はどこですか。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">はい、先ほど確認いたしました。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">資料は読みません。</span></div>
                </div>
                <div class="explanation">確認したかどうかを聞かれているので「はい、確認しました」が自然な返答です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">8</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-06/audio/m4_q12.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s5-8')">スクリプトを見る</button>
            <div class="script" id="s5-8"><span class="script-label">スクリプト</span>「最近、元気なさそうだけど、大丈夫？」</div>
            <div class="question" data-answer="3">
                <div class="question-number">問8</div>
                <div class="question-text">返事を選んでください。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">元気です。</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">最近は天気がいいですね。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">ちょっと疲れていて。心配してくれてありがとう。</span></div>
                </div>
                <div class="explanation">心配してくれた相手への自然な返答は状況説明と感謝です。</div>
            </div>
        </div>

        <div class="scenario-block">
            <div class="scenario-title"><span class="scenario-number">9</span></div>
            <div class="audio-player"><audio controls><source src="https://nihongo-world.com/materials/jlpt/n3/mock-06/audio/m4_q13.mp3" type="audio/mpeg"></audio></div>
            <button class="script-toggle" onclick="toggleScript('s5-9')">スクリプトを見る</button>
            <div class="script" id="s5-9"><span class="script-label">スクリプト</span>「このレポート、本当にこれで提出していいのかな…」</div>
            <div class="question" data-answer="1">
                <div class="question-number">問9</div>
                <div class="question-text">返事を選んでください。</div>
                <div class="options">
                    <div class="option" data-value="1"><span class="option-label">1</span><span class="option-text">一緒に見てあげようか？</span></div>
                    <div class="option" data-value="2"><span class="option-label">2</span><span class="option-text">レポートは難しいです。</span></div>
                    <div class="option" data-value="3"><span class="option-label">3</span><span class="option-text">提出しなくていいです。</span></div>
                </div>
                <div class="explanation">不安を感じている相手には手助けを申し出るのが自然です。</div>
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
