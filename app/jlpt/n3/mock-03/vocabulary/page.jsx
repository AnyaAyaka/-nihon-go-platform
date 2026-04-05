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
    <title>JLPT N3 Vocabulary - MOCK-03 | Nihon GO!</title>
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
        .section { background: #fff; border-radius: 12px; padding: 24px; margin-bottom: 20px; border: 1px solid #e5e7eb; }
        .section-title { font-size: 1.1em; font-weight: 600; margin-bottom: 20px; padding-bottom: 12px; border-bottom: 2px solid #06b6d4; }
        .question { margin-bottom: 24px; padding: 16px; background: #f9fafb; border-radius: 8px; }
        .question-num { font-size: 0.85em; color: #06b6d4; font-weight: 600; margin-bottom: 8px; }
        .question-text { font-size: 1.05em; margin-bottom: 12px; }
        .options { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        @media (max-width: 600px) { .options { grid-template-columns: 1fr; } }
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
            <div class="timer" id="timer">30:00</div>
        </div>
    </header>
    <div class="container">
        <h1>JLPT N3 Mock Test 03 - 語彙</h1>
        <div class="nav-back-row">
            <a href="/materials/jlpt/n3/" class="nav-back">&#8592; 問題一覧</a>
        </div>
        <div class="nav">
            <a href="vocabulary.html" class="active">語彙</a><a href="grammar.html">文法</a><a href="reading.html">読解</a><a href="listening.html">聴解</a>
        </div>

        <!-- 問題1: 漢字読み -->
        <div class="section"><div class="section-title">問題1</div>

        <div class="question" data-answer="2">
            <div class="question-num">問1</div>
            <div class="question-text">この工場では製品の<u>検査</u>を毎日行っている。</div>
            <div class="options">
                <div class="option" data-value="1">1. けんせい</div>
                <div class="option" data-value="2">2. けんさ</div>
                <div class="option" data-value="3">3. けいさ</div>
                <div class="option" data-value="4">4. けいせい</div>
            </div>
            <div class="explanation">「検査」は「けんさ」と読みます。</div>
        </div>

        <div class="question" data-answer="3">
            <div class="question-num">問2</div>
            <div class="question-text">彼女は<u>環境</u>問題に深く関心を持っている。</div>
            <div class="options">
                <div class="option" data-value="1">1. かんけい</div>
                <div class="option" data-value="2">2. かんこう</div>
                <div class="option" data-value="3">3. かんきょう</div>
                <div class="option" data-value="4">4. かんぎょう</div>
            </div>
            <div class="explanation">「環境」は「かんきょう」と読みます。</div>
        </div>

        <div class="question" data-answer="1">
            <div class="question-num">問3</div>
            <div class="question-text">新しいビルが<u>建設</u>される予定だ。</div>
            <div class="options">
                <div class="option" data-value="1">1. けんせつ</div>
                <div class="option" data-value="2">2. けんさつ</div>
                <div class="option" data-value="3">3. きんせつ</div>
                <div class="option" data-value="4">4. きんさつ</div>
            </div>
            <div class="explanation">「建設」は「けんせつ」と読みます。</div>
        </div>

        <div class="question" data-answer="4">
            <div class="question-num">問4</div>
            <div class="question-text">この地域では農業が<u>盛ん</u>だ。</div>
            <div class="options">
                <div class="option" data-value="1">1. ゆたか</div>
                <div class="option" data-value="2">2. にぎやか</div>
                <div class="option" data-value="3">3. おだやか</div>
                <div class="option" data-value="4">4. さかん</div>
            </div>
            <div class="explanation">「盛ん」は「さかん」と読みます。</div>
        </div>

        <div class="question" data-answer="2">
            <div class="question-num">問5</div>
            <div class="question-text">会議の<u>議題</u>は新製品の開発についてだ。</div>
            <div class="options">
                <div class="option" data-value="1">1. ぎだい</div>
                <div class="option" data-value="2">2. ぎだい</div>
                <div class="option" data-value="3">3. きだい</div>
                <div class="option" data-value="4">4. きたい</div>
            </div>
            <div class="explanation">「議題」は「ぎだい」と読みます。</div>
        </div>

        <div class="question" data-answer="3">
            <div class="question-num">問6</div>
            <div class="question-text">この問題の<u>原因</u>を調べる必要がある。</div>
            <div class="options">
                <div class="option" data-value="1">1. げんさい</div>
                <div class="option" data-value="2">2. げいいん</div>
                <div class="option" data-value="3">3. げんいん</div>
                <div class="option" data-value="4">4. けいいん</div>
            </div>
            <div class="explanation">「原因」は「げんいん」と読みます。</div>
        </div>

        <div class="question" data-answer="1">
            <div class="question-num">問7</div>
            <div class="question-text">彼女は<u>親切</u>な人で誰にでも優しい。</div>
            <div class="options">
                <div class="option" data-value="1">1. しんせつ</div>
                <div class="option" data-value="2">2. しんきん</div>
                <div class="option" data-value="3">3. しんせん</div>
                <div class="option" data-value="4">4. しんかん</div>
            </div>
            <div class="explanation">「親切」は「しんせつ」と読みます。</div>
        </div>

        <div class="question" data-answer="4">
            <div class="question-num">問8</div>
            <div class="question-text">新しい法律が<u>施行</u>された。</div>
            <div class="options">
                <div class="option" data-value="1">1. さいこう</div>
                <div class="option" data-value="2">2. さっこう</div>
                <div class="option" data-value="3">3. しさく</div>
                <div class="option" data-value="4">4. しこう</div>
            </div>
            <div class="explanation">「施行」は「しこう」と読みます。</div>
        </div>

        </div>

        <!-- 問題2: 漢字書き -->
        <div class="section"><div class="section-title">問題2</div>

        <div class="question" data-answer="1">
            <div class="question-num">問9</div>
            <div class="question-text">試合で優勝して、全員で<u>よろこんだ</u>。</div>
            <div class="options">
                <div class="option" data-value="1">1. 喜んだ</div>
                <div class="option" data-value="2">2. 楽んだ</div>
                <div class="option" data-value="3">3. 悦んだ</div>
                <div class="option" data-value="4">4. 歓んだ</div>
            </div>
            <div class="explanation">「よろこんだ」は「喜んだ」と書きます。</div>
        </div>

        <div class="question" data-answer="2">
            <div class="question-num">問10</div>
            <div class="question-text">部屋を<u>かたづける</u>のが苦手だ。</div>
            <div class="options">
                <div class="option" data-value="1">1. 形付ける</div>
                <div class="option" data-value="2">2. 片付ける</div>
                <div class="option" data-value="3">3. 方付ける</div>
                <div class="option" data-value="4">4. 各付ける</div>
            </div>
            <div class="explanation">「かたづける」は「片付ける」と書きます。</div>
        </div>

        <div class="question" data-answer="4">
            <div class="question-num">問11</div>
            <div class="question-text">彼は何事にも<u>ねっしん</u>に取り組む。</div>
            <div class="options">
                <div class="option" data-value="1">1. 熱深</div>
                <div class="option" data-value="2">2. 熱信</div>
                <div class="option" data-value="3">3. 執心</div>
                <div class="option" data-value="4">4. 熱心</div>
            </div>
            <div class="explanation">「ねっしん」は「熱心」と書きます。</div>
        </div>

        <div class="question" data-answer="4">
            <div class="question-num">問12</div>
            <div class="question-text">プレゼントを<u>おくった</u>ら、とても喜ばれた。</div>
            <div class="options">
                <div class="option" data-value="1">1. 遅った</div>
                <div class="option" data-value="2">2. 運った</div>
                <div class="option" data-value="3">3. 配った</div>
                <div class="option" data-value="4">4. 贈った</div>
            </div>
            <div class="explanation">プレゼントを「おくった」は「贈った」と書きます。</div>
        </div>

        <div class="question" data-answer="3">
            <div class="question-num">問13</div>
            <div class="question-text">先生に<u>ほめられた</u>。</div>
            <div class="options">
                <div class="option" data-value="1">1. 誉められた</div>
                <div class="option" data-value="2">2. 讃められた</div>
                <div class="option" data-value="3">3. 褒められた</div>
                <div class="option" data-value="4">4. 称められた</div>
            </div>
            <div class="explanation">「ほめられた」は「褒められた」と書きます。</div>
        </div>

        <div class="question" data-answer="2">
            <div class="question-num">問14</div>
            <div class="question-text">彼は困った人を<u>たすける</u>のが好きだ。</div>
            <div class="options">
                <div class="option" data-value="1">1. 支ける</div>
                <div class="option" data-value="2">2. 助ける</div>
                <div class="option" data-value="3">3. 佐ける</div>
                <div class="option" data-value="4">4. 補ける</div>
            </div>
            <div class="explanation">「たすける」は「助ける」と書きます。</div>
        </div>

        </div>

        <!-- 問題3: 文脈規定 -->
        <div class="section"><div class="section-title">問題3</div>

        <div class="question" data-answer="2">
            <div class="question-num">問15</div>
            <div class="question-text">試合に負けて、チーム全員が（　　）した。</div>
            <div class="options">
                <div class="option" data-value="1">1. 感謝</div>
                <div class="option" data-value="2">2. 落胆</div>
                <div class="option" data-value="3">3. 満足</div>
                <div class="option" data-value="4">4. 感動</div>
            </div>
            <div class="explanation">試合に負けてがっかりすることを「落胆」と言います。感謝・満足・感動はこの文脈に合いません。</div>
        </div>

        <div class="question" data-answer="4">
            <div class="question-num">問16</div>
            <div class="question-text">この映画は（　　）が高く、世界中で話題になった。</div>
            <div class="options">
                <div class="option" data-value="1">1. 人口</div>
                <div class="option" data-value="2">2. 費用</div>
                <div class="option" data-value="3">3. 人数</div>
                <div class="option" data-value="4">4. 完成度</div>
            </div>
            <div class="explanation">映画の出来栄えを表すには「完成度が高い」が適切です。</div>
        </div>

        <div class="question" data-answer="4">
            <div class="question-num">問17</div>
            <div class="question-text">手術の後、医者に（　　）に動くように言われた。</div>
            <div class="options">
                <div class="option" data-value="1">1. 元気よく</div>
                <div class="option" data-value="2">2. はげしく</div>
                <div class="option" data-value="3">3. おおげさに</div>
                <div class="option" data-value="4">4. ゆっくり</div>
            </div>
            <div class="explanation">手術後は「ゆっくり」動くよう指示されます。元気よく・はげしく・おおげさには医療の文脈に合いません。</div>
        </div>

        <div class="question" data-answer="4">
            <div class="question-num">問18</div>
            <div class="question-text">息子が賞をもらって、親として（　　）が高い思いだ。</div>
            <div class="options">
                <div class="option" data-value="1">1. 口</div>
                <div class="option" data-value="2">2. 耳</div>
                <div class="option" data-value="3">3. 目</div>
                <div class="option" data-value="4">4. 鼻</div>
            </div>
            <div class="explanation">「鼻が高い」は誇らしく得意な気持ちを表す慣用句です。</div>
        </div>

        <div class="question" data-answer="2">
            <div class="question-num">問19</div>
            <div class="question-text">この地域は（　　）が豊かで、川や山でのアクティビティが楽しめる。</div>
            <div class="options">
                <div class="option" data-value="1">1. 工業</div>
                <div class="option" data-value="2">2. 自然</div>
                <div class="option" data-value="3">3. 交通</div>
                <div class="option" data-value="4">4. 産業</div>
            </div>
            <div class="explanation">川や山でのアクティビティが楽しめる理由として「自然が豊か」が唯一適切です。</div>
        </div>

        <div class="question" data-answer="4">
            <div class="question-num">問20</div>
            <div class="question-text">大勢の人の前でスピーチをして、とても（　　）した。</div>
            <div class="options">
                <div class="option" data-value="1">1. 退屈</div>
                <div class="option" data-value="2">2. 安心</div>
                <div class="option" data-value="3">3. 満足</div>
                <div class="option" data-value="4">4. 緊張</div>
            </div>
            <div class="explanation">大勢の前でスピーチをするときに「緊張する」が最も自然です。</div>
        </div>

        <div class="question" data-answer="1">
            <div class="question-num">問21</div>
            <div class="question-text">彼の話は（　　）があって、聞いた人は皆大笑いした。</div>
            <div class="options">
                <div class="option" data-value="1">1. 面白み</div>
                <div class="option" data-value="2">2. 厳しさ</div>
                <div class="option" data-value="3">3. 難しさ</div>
                <div class="option" data-value="4">4. 正確さ</div>
            </div>
            <div class="explanation">「大笑いした」という結果から、「面白み」が唯一適切です。</div>
        </div>

        <div class="question" data-answer="3">
            <div class="question-num">問22</div>
            <div class="question-text">この薬は副作用が（　　）ので、安心して使える。</div>
            <div class="options">
                <div class="option" data-value="1">1. 多い</div>
                <div class="option" data-value="2">2. 強い</div>
                <div class="option" data-value="3">3. 少ない</div>
                <div class="option" data-value="4">4. 激しい</div>
            </div>
            <div class="explanation">「副作用が少ない」から安心して使えるという文脈です。</div>
        </div>

        <div class="question" data-answer="2">
            <div class="question-num">問23</div>
            <div class="question-text">彼は子供たちにピアノの（　　）をして生活している。</div>
            <div class="options">
                <div class="option" data-value="1">1. 研究</div>
                <div class="option" data-value="2">2. 指導</div>
                <div class="option" data-value="3">3. 観察</div>
                <div class="option" data-value="4">4. 発見</div>
            </div>
            <div class="explanation">子供たちにピアノを教えることを「指導」と言います。研究・観察・発見はこの文脈に合いません。</div>
        </div>

        <div class="question" data-answer="4">
            <div class="question-num">問24</div>
            <div class="question-text">新しいプロジェクトへの（　　）が高まり、チーム全員がやる気になっている。</div>
            <div class="options">
                <div class="option" data-value="1">1. 不安</div>
                <div class="option" data-value="2">2. 反対</div>
                <div class="option" data-value="3">3. 批判</div>
                <div class="option" data-value="4">4. 期待</div>
            </div>
            <div class="explanation">「期待が高まりやる気になる」が自然な流れです。不安・反対・批判が高まればやる気にはなりません。</div>
        </div>

        <div class="question" data-answer="1">
            <div class="question-num">問25</div>
            <div class="question-text">彼女は（　　）が強く、自分の意見をはっきり言う。</div>
            <div class="options">
                <div class="option" data-value="1">1. 意志</div>
                <div class="option" data-value="2">2. 感情</div>
                <div class="option" data-value="3">3. 印象</div>
                <div class="option" data-value="4">4. 記憶</div>
            </div>
            <div class="explanation">「意志が強い」は自分の考えを曲げない強さを表します。</div>
        </div>

        </div>

        <!-- 問題4: 言い換え類義語 -->
        <div class="section"><div class="section-title">問題4</div>

        <div class="question" data-answer="2">
            <div class="question-num">問26</div>
            <div class="question-text">彼女は<u>おだやか</u>な性格で、怒ることがない。</div>
            <div class="options">
                <div class="option" data-value="1">1. 激しい</div>
                <div class="option" data-value="2">2. 穏やかで落ち着いた</div>
                <div class="option" data-value="3">3. 怒りっぽい</div>
                <div class="option" data-value="4">4. 落ち着きのない</div>
            </div>
            <div class="explanation">「おだやか」は穏やかで落ち着いた様子を表します。他の選択肢は「怒ることがない」と矛盾します。</div>
        </div>

        <div class="question" data-answer="4">
            <div class="question-num">問27</div>
            <div class="question-text">この計画は<u>ぎりぎり</u>間に合った。</div>
            <div class="options">
                <div class="option" data-value="1">1. 余裕を持って</div>
                <div class="option" data-value="2">2. 予定より早く</div>
                <div class="option" data-value="3">3. 偶然に</div>
                <div class="option" data-value="4">4. かろうじて</div>
            </div>
            <div class="explanation">「ぎりぎり」は「かろうじて」「ようやく」と同じ意味です。</div>
        </div>

        <div class="question" data-answer="1">
            <div class="question-num">問28</div>
            <div class="question-text">彼は<u>わくわく</u>しながら旅行の準備をした。</div>
            <div class="options">
                <div class="option" data-value="1">1. 期待や興奮を感じながら</div>
                <div class="option" data-value="2">2. 緊張しながら</div>
                <div class="option" data-value="3">3. 疲れながら</div>
                <div class="option" data-value="4">4. 慌てながら</div>
            </div>
            <div class="explanation">「わくわく」は期待や興奮で心が高ぶる状態を表します。</div>
        </div>

        <div class="question" data-answer="3">
            <div class="question-num">問29</div>
            <div class="question-text">彼女は<u>ぼんやり</u>と窓の外を見ていた。</div>
            <div class="options">
                <div class="option" data-value="1">1. 真剣に</div>
                <div class="option" data-value="2">2. うれしそうに</div>
                <div class="option" data-value="3">3. 何も考えずに</div>
                <div class="option" data-value="4">4. 驚いて</div>
            </div>
            <div class="explanation">「ぼんやり」は集中せず何も考えていない状態を表します。</div>
        </div>

        <div class="question" data-answer="2">
            <div class="question-num">問30</div>
            <div class="question-text">今日の仕事は<u>やっと</u>終わった。</div>
            <div class="options">
                <div class="option" data-value="1">1. すぐに</div>
                <div class="option" data-value="2">2. ようやく</div>
                <div class="option" data-value="3">3. たまたま</div>
                <div class="option" data-value="4">4. あっという間に</div>
            </div>
            <div class="explanation">「やっと」は「ようやく」と同じ意味で、長い時間や苦労の末に結果が出ることを表します。</div>
        </div>

        </div>

        <!-- 問題5: 用法 -->
        <div class="section"><div class="section-title">問題5</div>

        <div class="question" data-answer="3">
            <div class="question-num">問31</div>
            <div class="question-text">つぎの「<strong>ぜひ</strong>」をつかった文として、いちばんよいものを１・２・３・４からひとつえらんでください。</div>
            <div class="options">
                <div class="option" data-value="1">1. 今日はぜひ雨が降るだろう。</div>
                <div class="option" data-value="2">2. 彼はぜひ背が高い。</div>
                <div class="option" data-value="3">3. 日本に来たら、ぜひ富士山を見てください。</div>
                <div class="option" data-value="4">4. ぜひ昨日、映画を見た。</div>
            </div>
            <div class="explanation">「ぜひ」は強い希望や勧めを表します。3が正しい使い方です。</div>
        </div>

        <div class="question" data-answer="1">
            <div class="question-num">問32</div>
            <div class="question-text">つぎの「<strong>きっと</strong>」をつかった文として、いちばんよいものを１・２・３・４からひとつえらんでください。</div>
            <div class="options">
                <div class="option" data-value="1">1. 彼女はきっと成功すると信じている。</div>
                <div class="option" data-value="2">2. きっと昨日、友達と会った。</div>
                <div class="option" data-value="3">3. この料理はきっと塩だ。</div>
                <div class="option" data-value="4">4. きっと今日は月曜日だ。</div>
            </div>
            <div class="explanation">「きっと」は確信を持った推量を表します。1が正しい使い方です。</div>
        </div>

        <div class="question" data-answer="2">
            <div class="question-num">問33</div>
            <div class="question-text">つぎの「<strong>あいにく</strong>」をつかった文として、いちばんよいものを１・２・３・４からひとつえらんでください。</div>
            <div class="options">
                <div class="option" data-value="1">1. あいにく彼女は料理が上手だ。</div>
                <div class="option" data-value="2">2. あいにく、今日は担当者が不在です。</div>
                <div class="option" data-value="3">3. あいにく明日は晴れるだろう。</div>
                <div class="option" data-value="4">4. 彼はあいにく背が高い。</div>
            </div>
            <div class="explanation">「あいにく」は相手の期待に反する残念な状況を伝えるときに使います。2が正しい使い方です。</div>
        </div>

        <div class="question" data-answer="2">
            <div class="question-num">問34</div>
            <div class="question-text">つぎの「<strong>いっそ</strong>」をつかった文として、いちばんよいものを１・２・３・４からひとつえらんでください。</div>
            <div class="options">
                <div class="option" data-value="1">1. 彼女はいっそ料理が上手だ。</div>
                <div class="option" data-value="2">2. こんなに悩むなら、いっそ仕事をやめてしまおうかと思った。</div>
                <div class="option" data-value="3">3. いっそ今日は晴れている。</div>
                <div class="option" data-value="4">4. いっそ昨日、彼に会った。</div>
            </div>
            <div class="explanation">「いっそ」は思い切って別の選択をしようとする気持ちを表します。2が正しい使い方です。</div>
        </div>

        <div class="question" data-answer="3">
            <div class="question-num">問35</div>
            <div class="question-text">つぎの「<strong>いつのまにか</strong>」をつかった文として、いちばんよいものを１・２・３・４からひとつえらんでください。</div>
            <div class="options">
                <div class="option" data-value="1">1. 彼はいつのまにか料理が好きだ。</div>
                <div class="option" data-value="2">2. いつのまにか今日は暑い。</div>
                <div class="option" data-value="3">3. 話していたら、いつのまにか夜中の12時になっていた。</div>
                <div class="option" data-value="4">4. いつのまにか駅まで歩いた。</div>
            </div>
            <div class="explanation">「いつのまにか」は気づかないうちに変化が起きていることを表します。3が正しい使い方です。</div>
        </div>

        </div>

        <div class="actions">
            <button class="btn-submit" onclick="checkAnswers()">採点する</button>
        </div>

        <div class="score" id="score">
            <div class="score-num" id="score-num"></div>
            <div class="score-label">Score: <span id="score-pct"></span></div>
            <a href="grammar.html" class="next-section-btn" id="next-btn" style="display: none;">次：文法 →</a>
        </div>
    </div>

    <script>
        let timeLeft = 1800;
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
