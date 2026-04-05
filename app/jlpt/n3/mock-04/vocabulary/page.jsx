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
    <title>JLPT N3 Vocabulary - MOCK-04 | Nihon GO!</title>
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
        <h1>JLPT N3 Mock Test 04 - 語彙</h1>
        <div class="nav-back-row">
            <a href="/materials/jlpt/n3/" class="nav-back">&#8592; 問題一覧</a>
        </div>
        <div class="nav">
            <a href="vocabulary.html" class="active">語彙</a><a href="grammar.html">文法</a><a href="reading.html">読解</a><a href="listening.html">聴解</a>
        </div>

        <!-- 問題1: 漢字読み -->
        <div class="section"><div class="section-title">問題1</div>

        <div class="question" data-answer="3">
            <div class="question-num">問1</div>
            <div class="question-text">その問題については、自分で<u>判断</u>することが大切だ。</div>
            <div class="options">
                <div class="option" data-value="1">1. はんだい</div>
                <div class="option" data-value="2">2. はんたん</div>
                <div class="option" data-value="3">3. はんだん</div>
                <div class="option" data-value="4">4. はんてい</div>
            </div>
            <div class="explanation">「判断」は「はんだん」と読みます。</div>
        </div>

        <div class="question" data-answer="1">
            <div class="question-num">問2</div>
            <div class="question-text">彼女は目標に向かって<u>努力</u>を続けている。</div>
            <div class="options">
                <div class="option" data-value="1">1. どりょく</div>
                <div class="option" data-value="2">2. どうりょく</div>
                <div class="option" data-value="3">3. のりょく</div>
                <div class="option" data-value="4">4. のうりょく</div>
            </div>
            <div class="explanation">「努力」は「どりょく」と読みます。</div>
        </div>

        <div class="question" data-answer="4">
            <div class="question-num">問3</div>
            <div class="question-text">最近、エネルギーの<u>消費</u>量が増えている。</div>
            <div class="options">
                <div class="option" data-value="1">1. しょうひょう</div>
                <div class="option" data-value="2">2. しょうひん</div>
                <div class="option" data-value="3">3. しょうはい</div>
                <div class="option" data-value="4">4. しょうひ</div>
            </div>
            <div class="explanation">「消費」は「しょうひ」と読みます。</div>
        </div>

        <div class="question" data-answer="2">
            <div class="question-num">問4</div>
            <div class="question-text">彼女の家には<u>豊か</u>な自然が広がっている。</div>
            <div class="options">
                <div class="option" data-value="1">1. おだやか</div>
                <div class="option" data-value="2">2. ゆたか</div>
                <div class="option" data-value="3">3. にぎやか</div>
                <div class="option" data-value="4">4. さかん</div>
            </div>
            <div class="explanation">「豊か」は「ゆたか」と読みます。</div>
        </div>

        <div class="question" data-answer="1">
            <div class="question-num">問5</div>
            <div class="question-text">結婚式の<u>記念</u>に写真を撮った。</div>
            <div class="options">
                <div class="option" data-value="1">1. きねん</div>
                <div class="option" data-value="2">2. きかん</div>
                <div class="option" data-value="3">3. きけん</div>
                <div class="option" data-value="4">4. きもん</div>
            </div>
            <div class="explanation">「記念」は「きねん」と読みます。</div>
        </div>

        <div class="question" data-answer="3">
            <div class="question-num">問6</div>
            <div class="question-text">人口の<u>増加</u>が都市部で問題になっている。</div>
            <div class="options">
                <div class="option" data-value="1">1. ぞうだい</div>
                <div class="option" data-value="2">2. ぞうきょう</div>
                <div class="option" data-value="3">3. ぞうか</div>
                <div class="option" data-value="4">4. ぞうほ</div>
            </div>
            <div class="explanation">「増加」は「ぞうか」と読みます。</div>
        </div>

        <div class="question" data-answer="2">
            <div class="question-num">問7</div>
            <div class="question-text"><u>適切</u>な言葉を選んで文を作りなさい。</div>
            <div class="options">
                <div class="option" data-value="1">1. てきぜつ</div>
                <div class="option" data-value="2">2. てきせつ</div>
                <div class="option" data-value="3">3. てきじつ</div>
                <div class="option" data-value="4">4. てっせつ</div>
            </div>
            <div class="explanation">「適切」は「てきせつ」と読みます。</div>
        </div>

        <div class="question" data-answer="4">
            <div class="question-num">問8</div>
            <div class="question-text">彼の発言に対して強い<u>批判</u>が集まった。</div>
            <div class="options">
                <div class="option" data-value="1">1. ひけつ</div>
                <div class="option" data-value="2">2. ひかん</div>
                <div class="option" data-value="3">3. ひせい</div>
                <div class="option" data-value="4">4. ひはん</div>
            </div>
            <div class="explanation">「批判」は「ひはん」と読みます。</div>
        </div>

        </div>

        <!-- 問題2: 漢字書き -->
        <div class="section"><div class="section-title">問題2</div>

        <div class="question" data-answer="2">
            <div class="question-num">問9</div>
            <div class="question-text">どんなに難しくても<u>あきらめない</u>ことが大切だ。</div>
            <div class="options">
                <div class="option" data-value="1">1. 空きらめない</div>
                <div class="option" data-value="2">2. 諦めない</div>
                <div class="option" data-value="3">3. 明きらめない</div>
                <div class="option" data-value="4">4. 開きらめない</div>
            </div>
            <div class="explanation">「あきらめない」は「諦めない」と書きます。</div>
        </div>

        <div class="question" data-answer="3">
            <div class="question-num">問10</div>
            <div class="question-text">二つの案を<u>くらべて</u>、どちらがいいか決めた。</div>
            <div class="options">
                <div class="option" data-value="1">1. 較べて</div>
                <div class="option" data-value="2">2. 対べて</div>
                <div class="option" data-value="3">3. 比べて</div>
                <div class="option" data-value="4">4. 競べて</div>
            </div>
            <div class="explanation">「くらべて」は「比べて」と書きます。</div>
        </div>

        <div class="question" data-answer="1">
            <div class="question-num">問11</div>
            <div class="question-text">新しい仕事を<u>さがして</u>いる最中だ。</div>
            <div class="options">
                <div class="option" data-value="1">1. 探して</div>
                <div class="option" data-value="2">2. 捜して</div>
                <div class="option" data-value="3">3. 索して</div>
                <div class="option" data-value="4">4. 調して</div>
            </div>
            <div class="explanation">仕事を「さがして」は「探して」と書きます。</div>
        </div>

        <div class="question" data-answer="4">
            <div class="question-num">問12</div>
            <div class="question-text">発表の前に内容を<u>ととのえた</u>。</div>
            <div class="options">
                <div class="option" data-value="1">1. 調えた</div>
                <div class="option" data-value="2">2. 備えた</div>
                <div class="option" data-value="3">3. 揃えた</div>
                <div class="option" data-value="4">4. 整えた</div>
            </div>
            <div class="explanation">内容を「ととのえた」は「整えた」と書きます。</div>
        </div>

        <div class="question" data-answer="2">
            <div class="question-num">問13</div>
            <div class="question-text">初めて人前で歌って、とても<u>はずかしかった</u>。</div>
            <div class="options">
                <div class="option" data-value="1">1. 恥すかしかった</div>
                <div class="option" data-value="2">2. 恥ずかしかった</div>
                <div class="option" data-value="3">3. 辱かしかった</div>
                <div class="option" data-value="4">4. 恥かしかった</div>
            </div>
            <div class="explanation">「はずかしかった」は「恥ずかしかった」と書きます。</div>
        </div>

        <div class="question" data-answer="3">
            <div class="question-num">問14</div>
            <div class="question-text">新しいプロジェクトの担当を<u>うけた</u>。</div>
            <div class="options">
                <div class="option" data-value="1">1. 取けた</div>
                <div class="option" data-value="2">2. 引けた</div>
                <div class="option" data-value="3">3. 受けた</div>
                <div class="option" data-value="4">4. 承けた</div>
            </div>
            <div class="explanation">担当を「うけた」は「受けた」と書きます。</div>
        </div>

        </div>

        <!-- 問題3: 文脈規定 -->
        <div class="section"><div class="section-title">問題3</div>

        <div class="question" data-answer="3">
            <div class="question-num">問15</div>
            <div class="question-text">彼は仕事で大きなミスをして、上司に（　　）された。</div>
            <div class="options">
                <div class="option" data-value="1">1. 賞賛</div>
                <div class="option" data-value="2">2. 感謝</div>
                <div class="option" data-value="3">3. 注意</div>
                <div class="option" data-value="4">4. 応援</div>
            </div>
            <div class="explanation">ミスをして上司から「注意された」が最も自然な文脈です。</div>
        </div>

        <div class="question" data-answer="1">
            <div class="question-num">問16</div>
            <div class="question-text">この仕事は（　　）が必要で、一人ではできない。</div>
            <div class="options">
                <div class="option" data-value="1">1. 協力</div>
                <div class="option" data-value="2">2. 競争</div>
                <div class="option" data-value="3">3. 対立</div>
                <div class="option" data-value="4">4. 批判</div>
            </div>
            <div class="explanation">一人ではできない仕事には「協力が必要」が最も適切です。</div>
        </div>

        <div class="question" data-answer="4">
            <div class="question-num">問17</div>
            <div class="question-text">試験が近づいてきたので、勉強に（　　）している。</div>
            <div class="options">
                <div class="option" data-value="1">1. 油断</div>
                <div class="option" data-value="2">2. 後悔</div>
                <div class="option" data-value="3">3. 失望</div>
                <div class="option" data-value="4">4. 集中</div>
            </div>
            <div class="explanation">試験前に勉強に「集中している」が最も自然です。</div>
        </div>

        <div class="question" data-answer="2">
            <div class="question-num">問18</div>
            <div class="question-text">彼は（　　）が広く、いろんな分野に興味を持っている。</div>
            <div class="options">
                <div class="option" data-value="1">1. 経験</div>
                <div class="option" data-value="2">2. 視野</div>
                <div class="option" data-value="3">3. 技術</div>
                <div class="option" data-value="4">4. 知識</div>
            </div>
            <div class="explanation">「視野が広い」はいろんな分野に興味を持つ様子を表します。</div>
        </div>

        <div class="question" data-answer="3">
            <div class="question-num">問19</div>
            <div class="question-text">その計画には（　　）な点が多く、すぐには実行できない。</div>
            <div class="options">
                <div class="option" data-value="1">1. 完全</div>
                <div class="option" data-value="2">2. 適切</div>
                <div class="option" data-value="3">3. 不明確</div>
                <div class="option" data-value="4">4. 明確</div>
            </div>
            <div class="explanation">すぐに実行できない理由として「不明確な点が多い」が最も適切です。</div>
        </div>

        <div class="question" data-answer="1">
            <div class="question-num">問20</div>
            <div class="question-text">彼女はいつも（　　）な態度で、周りから信頼されている。</div>
            <div class="options">
                <div class="option" data-value="1">1. 誠実</div>
                <div class="option" data-value="2">2. 無責任</div>
                <div class="option" data-value="3">3. 自己中心的</div>
                <div class="option" data-value="4">4. 消極的</div>
            </div>
            <div class="explanation">「誠実な態度」で周りから信頼されるという文脈です。</div>
        </div>

        <div class="question" data-answer="4">
            <div class="question-num">問21</div>
            <div class="question-text">新製品の（　　）が成功して、売上が大きく伸びた。</div>
            <div class="options">
                <div class="option" data-value="1">1. 廃止</div>
                <div class="option" data-value="2">2. 失敗</div>
                <div class="option" data-value="3">3. 節約</div>
                <div class="option" data-value="4">4. 販売</div>
            </div>
            <div class="explanation">「販売が成功して売上が伸びた」が文脈に合います。</div>
        </div>

        <div class="question" data-answer="2">
            <div class="question-num">問22</div>
            <div class="question-text">この映画は（　　）が深く、何度見ても楽しめる。</div>
            <div class="options">
                <div class="option" data-value="1">1. 速度</div>
                <div class="option" data-value="2">2. 内容</div>
                <div class="option" data-value="3">3. 価格</div>
                <div class="option" data-value="4">4. 長さ</div>
            </div>
            <div class="explanation">「内容が深い」は充実した内容を表します。</div>
        </div>

        <div class="question" data-answer="3">
            <div class="question-num">問23</div>
            <div class="question-text">彼は会議で自分の（　　）をはっきりと述べた。</div>
            <div class="options">
                <div class="option" data-value="1">1. 体力</div>
                <div class="option" data-value="2">2. 趣味</div>
                <div class="option" data-value="3">3. 意見</div>
                <div class="option" data-value="4">4. 外見</div>
            </div>
            <div class="explanation">会議で「意見をはっきり述べた」が最も自然です。</div>
        </div>

        <div class="question" data-answer="1">
            <div class="question-num">問24</div>
            <div class="question-text">地震の後、市民に（　　）な情報が提供された。</div>
            <div class="options">
                <div class="option" data-value="1">1. 正確</div>
                <div class="option" data-value="2">2. 複雑</div>
                <div class="option" data-value="3">3. 曖昧</div>
                <div class="option" data-value="4">4. 不十分</div>
            </div>
            <div class="explanation">災害後に「正確な情報が提供された」が最も適切です。</div>
        </div>

        <div class="question" data-answer="4">
            <div class="question-num">問25</div>
            <div class="question-text">この問題は（　　）が必要で、簡単には解決できない。</div>
            <div class="options">
                <div class="option" data-value="1">1. 無関心</div>
                <div class="option" data-value="2">2. 軽視</div>
                <div class="option" data-value="3">3. 無視</div>
                <div class="option" data-value="4">4. 慎重な対応</div>
            </div>
            <div class="explanation">簡単に解決できない問題には「慎重な対応が必要」が最も適切です。</div>
        </div>

        </div>

        <!-- 問題4: 言い換え類義語 -->
        <div class="section"><div class="section-title">問題4</div>

        <div class="question" data-answer="3">
            <div class="question-num">問26</div>
            <div class="question-text">彼は<u>はっきり</u>と自分の意見を言った。</div>
            <div class="options">
                <div class="option" data-value="1">1. ゆっくりと</div>
                <div class="option" data-value="2">2. やさしく</div>
                <div class="option" data-value="3">3. 明確に</div>
                <div class="option" data-value="4">4. 静かに</div>
            </div>
            <div class="explanation">「はっきり」は「明確に」「はっきりと」という意味です。</div>
        </div>

        <div class="question" data-answer="2">
            <div class="question-num">問27</div>
            <div class="question-text">彼女は<u>なんとなく</u>不安な気持ちになった。</div>
            <div class="options">
                <div class="option" data-value="1">1. はっきりと</div>
                <div class="option" data-value="2">2. 理由もなく</div>
                <div class="option" data-value="3">3. 突然に</div>
                <div class="option" data-value="4">4. 強く</div>
            </div>
            <div class="explanation">「なんとなく」は「理由はわからないがそういう感じがする」という意味です。</div>
        </div>

        <div class="question" data-answer="4">
            <div class="question-num">問28</div>
            <div class="question-text">彼は<u>いきなり</u>大声で話し始めた。</div>
            <div class="options">
                <div class="option" data-value="1">1. ゆっくりと</div>
                <div class="option" data-value="2">2. 小さな声で</div>
                <div class="option" data-value="3">3. 予定通りに</div>
                <div class="option" data-value="4">4. 突然に</div>
            </div>
            <div class="explanation">「いきなり」は「突然に」「前ぶれなく」という意味です。</div>
        </div>

        <div class="question" data-answer="1">
            <div class="question-num">問29</div>
            <div class="question-text">授業が終わったと思ったら、<u>あっという間に</u>夕方になっていた。</div>
            <div class="options">
                <div class="option" data-value="1">1. 気づいたらもう</div>
                <div class="option" data-value="2">2. ゆっくりと時間が過ぎて</div>
                <div class="option" data-value="3">3. なかなか</div>
                <div class="option" data-value="4">4. 予想より遅く</div>
            </div>
            <div class="explanation">「あっという間に」は非常に短い時間で何かが起きることを表します。</div>
        </div>

        <div class="question" data-answer="3">
            <div class="question-num">問30</div>
            <div class="question-text">彼は<u>うっかり</u>大切な書類を忘れてしまった。</div>
            <div class="options">
                <div class="option" data-value="1">1. わざと</div>
                <div class="option" data-value="2">2. ゆっくりと</div>
                <div class="option" data-value="3">3. 不注意で</div>
                <div class="option" data-value="4">4. 仕方なく</div>
            </div>
            <div class="explanation">「うっかり」は「不注意で」「うかつにも」という意味です。</div>
        </div>

        </div>

        <!-- 問題5: 用法 -->
        <div class="section"><div class="section-title">問題5</div>

        <div class="question" data-answer="2">
            <div class="question-num">問31</div>
            <div class="question-text">つぎの「<strong>かえって</strong>」をつかった文として、いちばんよいものを１・２・３・４からひとつえらんでください。</div>
            <div class="options">
                <div class="option" data-value="1">1. 彼はかえって背が高い。</div>
                <div class="option" data-value="2">2. 薬を飲んだら、かえって気分が悪くなった。</div>
                <div class="option" data-value="3">3. 彼女はかえって三人家族だ。</div>
                <div class="option" data-value="4">4. かえって今日は暑い。</div>
            </div>
            <div class="explanation">「かえって」は予想と逆の結果になるときに使います。2が正しい使い方です。</div>
        </div>

        <div class="question" data-answer="1">
            <div class="question-num">問32</div>
            <div class="question-text">つぎの「<strong>ますます</strong>」をつかった文として、いちばんよいものを１・２・３・４からひとつえらんでください。</div>
            <div class="options">
                <div class="option" data-value="1">1. 練習を続けるにつれて、ますます上手になった。</div>
                <div class="option" data-value="2">2. ますます昨日、友達と会った。</div>
                <div class="option" data-value="3">3. 彼女はますます三人家族だ。</div>
                <div class="option" data-value="4">4. ますます駅まで歩いた。</div>
            </div>
            <div class="explanation">「ますます」は程度がどんどん大きくなることを表します。1が正しい使い方です。</div>
        </div>

        <div class="question" data-answer="3">
            <div class="question-num">問33</div>
            <div class="question-text">つぎの「<strong>たとえ</strong>」をつかった文として、いちばんよいものを１・２・３・４からひとつえらんでください。</div>
            <div class="options">
                <div class="option" data-value="1">1. 彼女はたとえ料理が上手だ。</div>
                <div class="option" data-value="2">2. たとえ今日は暑い。</div>
                <div class="option" data-value="3">3. たとえ失敗しても、あきらめないことが大切だ。</div>
                <div class="option" data-value="4">4. たとえ昨日、映画を見た。</div>
            </div>
            <div class="explanation">「たとえ〜ても」は仮定の逆接を表します。3が正しい使い方です。</div>
        </div>

        <div class="question" data-answer="4">
            <div class="question-num">問34</div>
            <div class="question-text">つぎの「<strong>せめて</strong>」をつかった文として、いちばんよいものを１・２・３・４からひとつえらんでください。</div>
            <div class="options">
                <div class="option" data-value="1">1. せめて彼は背が高い。</div>
                <div class="option" data-value="2">2. せめて今日は月曜日だ。</div>
                <div class="option" data-value="3">3. 彼女はせめて三人家族だ。</div>
                <div class="option" data-value="4">4. 忙しいのはわかるが、せめて返事だけでもしてほしい。</div>
            </div>
            <div class="explanation">「せめて」は「最低限でも〜してほしい」という願望を表します。4が正しい使い方です。</div>
        </div>

        <div class="question" data-answer="1">
            <div class="question-num">問35</div>
            <div class="question-text">つぎの「<strong>あこがれる</strong>」をつかった文として、いちばんよいものを１・２・３・４からひとつえらんでください。</div>
            <div class="options">
                <div class="option" data-value="1">1. 私は有名な歌手にあこがれている。</div>
                <div class="option" data-value="2">2. 彼女はあこがれて三人家族だ。</div>
                <div class="option" data-value="3">3. あこがれて今日は暑い。</div>
                <div class="option" data-value="4">4. 昨日、あこがれて映画を見た。</div>
            </div>
            <div class="explanation">「あこがれる」は理想の人や状態に強く引きつけられる気持ちを表します。1が正しい使い方です。</div>
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
