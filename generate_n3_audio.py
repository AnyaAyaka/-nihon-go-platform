#!/usr/bin/env python3
"""
N3 Mock Test 03 - リスニング音声生成スクリプト
使い方: python3 generate_n3_audio.py
生成先: ./n3_audio/
Hostingerアップロード先: /materials/jlpt/n3/mock-03/audio/
"""

import os, time, base64, requests, re

API_KEY = "AIzaSyCi7wtIal7LIYjYHvLzShLqpe8cNxUNd_0"
TTS_URL = f"https://texttospeech.googleapis.com/v1/text:synthesize?key={API_KEY}"

VOICE_NARRATOR = {"languageCode": "ja-JP", "name": "ja-JP-Standard-D"}
VOICE_FEMALE   = {"languageCode": "ja-JP", "name": "ja-JP-Neural2-B"}
VOICE_MALE     = {"languageCode": "ja-JP", "name": "ja-JP-Neural2-D"}

OUTPUT_DIR = "n3_audio"
os.makedirs(OUTPUT_DIR, exist_ok=True)

def tts(text, voice, filename, rate=0.9):
    payload = {
        "input": {"text": text},
        "voice": voice,
        "audioConfig": {"audioEncoding": "MP3", "speakingRate": rate}
    }
    resp = requests.post(TTS_URL, json=payload)
    if resp.status_code != 200:
        print(f"  ERROR: {resp.text[:100]}")
        return False
    with open(os.path.join(OUTPUT_DIR, filename), "wb") as f:
        f.write(base64.b64decode(resp.json().get("audioContent", "")))
    print(f"  OK: {filename}")
    return True

def pause(s=0.8):
    time.sleep(s)

def combine(files, out):
    with open(os.path.join(OUTPUT_DIR, out), "wb") as o:
        for f in files:
            p = os.path.join(OUTPUT_DIR, f)
            if os.path.exists(p):
                with open(p, "rb") as fp:
                    o.write(fp.read())
    print(f"  COMBINED: {out}")

def mondai1():
    print("\n=== 問題1 課題理解 ===")

    # q1: 旅行の集合場所
    tts("男の人と女の人が話しています。二人はどこで待ち合わせをすることにしましたか。", VOICE_NARRATOR, "m1_q1_a.mp3", 0.85); pause()
    tts("来週の旅行、集合場所どうする？", VOICE_FEMALE, "m1_q1_b.mp3"); pause(0.5)
    tts("駅の改札はどうかな？でも荷物多いし混むよね。", VOICE_MALE, "m1_q1_c.mp3"); pause(0.5)
    tts("じゃあ駅前のバスターミナルにしない？バスで空港まで行けるし。", VOICE_FEMALE, "m1_q1_d.mp3"); pause(0.5)
    tts("そうしよう。バスターミナルで集合ね。", VOICE_MALE, "m1_q1_e.mp3"); pause(0.5)
    tts("二人はどこで待ち合わせをすることにしましたか。", VOICE_NARRATOR, "m1_q1_f.mp3", 0.85); pause()
    combine(["m1_q1_a.mp3","m1_q1_b.mp3","m1_q1_c.mp3","m1_q1_d.mp3","m1_q1_e.mp3","m1_q1_f.mp3"], "m1_q1.mp3")

    # q2: 病院予約
    tts("男の人と女の人が話しています。女の人はこの後何をしますか。", VOICE_NARRATOR, "m1_q2_a.mp3", 0.85); pause()
    tts("病院の予約、取れた？", VOICE_MALE, "m1_q2_b.mp3"); pause(0.5)
    tts("まだなんです。今日電話したら、来週の水曜しか空いてないって言われて。", VOICE_FEMALE, "m1_q2_c.mp3"); pause(0.5)
    tts("水曜は会議があるんじゃない？", VOICE_MALE, "m1_q2_d.mp3"); pause(0.5)
    tts("そうなんです。だから別の病院を探してみます。", VOICE_FEMALE, "m1_q2_e.mp3"); pause(0.5)
    tts("女の人はこの後何をしますか。", VOICE_NARRATOR, "m1_q2_f.mp3", 0.85); pause()
    combine(["m1_q2_a.mp3","m1_q2_b.mp3","m1_q2_c.mp3","m1_q2_d.mp3","m1_q2_e.mp3","m1_q2_f.mp3"], "m1_q2.mp3")

    # q3: 引越し相談
    tts("不動産屋で、男の人と不動産屋の人が話しています。男の人はまず何をしますか。", VOICE_NARRATOR, "m1_q3_a.mp3", 0.85); pause()
    tts("引越し先のご希望はありますか。", VOICE_FEMALE, "m1_q3_b.mp3"); pause(0.5)
    tts("駅から歩いて10分以内で、2LDKがいいんですが。", VOICE_MALE, "m1_q3_c.mp3"); pause(0.5)
    tts("予算はいかがでしょう。", VOICE_FEMALE, "m1_q3_d.mp3"); pause(0.5)
    tts("月10万円以内で。いくつか候補を見せてもらえますか。", VOICE_MALE, "m1_q3_e.mp3"); pause(0.5)
    tts("では、まず資料をお持ちします。気に入ったものがあれば内見できますよ。", VOICE_FEMALE, "m1_q3_f.mp3"); pause(0.5)
    tts("お願いします。資料を見てから決めます。", VOICE_MALE, "m1_q3_g.mp3"); pause(0.5)
    tts("男の人はまず何をしますか。", VOICE_NARRATOR, "m1_q3_h.mp3", 0.85); pause()
    combine(["m1_q3_a.mp3","m1_q3_b.mp3","m1_q3_c.mp3","m1_q3_d.mp3","m1_q3_e.mp3","m1_q3_f.mp3","m1_q3_g.mp3","m1_q3_h.mp3"], "m1_q3.mp3")

    # q4: 駐車場
    tts("男の人と店員が話しています。男の人の車はどこに止めますか。", VOICE_NARRATOR, "m1_q4_a.mp3", 0.85); pause()
    tts("すみません、駐車場はどこですか。", VOICE_MALE, "m1_q4_b.mp3"); pause(0.5)
    tts("建物の裏に第一駐車場がありますが、今日は満車です。", VOICE_FEMALE, "m1_q4_c.mp3"); pause(0.5)
    tts("そうですか。近くに別の駐車場はありますか。", VOICE_MALE, "m1_q4_d.mp3"); pause(0.5)
    tts("50メートルほど先に第二駐車場があります。そちらはまだ空きがあると思います。", VOICE_FEMALE, "m1_q4_e.mp3"); pause(0.5)
    tts("わかりました。そちらに止めます。", VOICE_MALE, "m1_q4_f.mp3"); pause(0.5)
    tts("男の人の車はどこに止めますか。", VOICE_NARRATOR, "m1_q4_g.mp3", 0.85); pause()
    combine(["m1_q4_a.mp3","m1_q4_b.mp3","m1_q4_c.mp3","m1_q4_d.mp3","m1_q4_e.mp3","m1_q4_f.mp3","m1_q4_g.mp3"], "m1_q4.mp3")

    # q5: 図書館返却
    tts("図書館で、女の人と司書が話しています。女の人は本をいつまでに返しますか。", VOICE_NARRATOR, "m1_q5_a.mp3", 0.85); pause()
    tts("すみません、この本の返却期限はいつですか。", VOICE_FEMALE, "m1_q5_b.mp3"); pause(0.5)
    tts("貸し出しは2週間です。今日が10日なので、24日までになります。", VOICE_MALE, "m1_q5_c.mp3"); pause(0.5)
    tts("もう少し時間がかかりそうなんですが、延長できますか。", VOICE_FEMALE, "m1_q5_d.mp3"); pause(0.5)
    tts("1週間だけ延長できます。その場合は31日までになります。", VOICE_MALE, "m1_q5_e.mp3"); pause(0.5)
    tts("じゃあ延長をお願いします。", VOICE_FEMALE, "m1_q5_f.mp3"); pause(0.5)
    tts("女の人は本をいつまでに返しますか。", VOICE_NARRATOR, "m1_q5_g.mp3", 0.85); pause()
    combine(["m1_q5_a.mp3","m1_q5_b.mp3","m1_q5_c.mp3","m1_q5_d.mp3","m1_q5_e.mp3","m1_q5_f.mp3","m1_q5_g.mp3"], "m1_q5.mp3")

    # q6: 夕飯の相談
    tts("男の人と女の人が話しています。二人は今夜何を作ることにしましたか。", VOICE_NARRATOR, "m1_q6_a.mp3", 0.85); pause()
    tts("今夜の夕飯、何にする？カレーはどう？", VOICE_MALE, "m1_q6_b.mp3"); pause(0.5)
    tts("カレーは昨日食べたよ。パスタにしない？", VOICE_FEMALE, "m1_q6_c.mp3"); pause(0.5)
    tts("いいね。でも、トマトソースの材料買ってきてないな。", VOICE_MALE, "m1_q6_d.mp3"); pause(0.5)
    tts("じゃあ、冷蔵庫にある卵と野菜で炒め物にしよう。", VOICE_FEMALE, "m1_q6_e.mp3"); pause(0.5)
    tts("それがいいね。じゃあそうしよう。", VOICE_MALE, "m1_q6_f.mp3"); pause(0.5)
    tts("二人は今夜何を作ることにしましたか。", VOICE_NARRATOR, "m1_q6_g.mp3", 0.85); pause()
    combine(["m1_q6_a.mp3","m1_q6_b.mp3","m1_q6_c.mp3","m1_q6_d.mp3","m1_q6_e.mp3","m1_q6_f.mp3","m1_q6_g.mp3"], "m1_q6.mp3")

def mondai2():
    print("\n=== 問題2 ポイント理解 ===")

    # q1: 天気予報
    tts("天気予報を聞いてください。明日の天気はどうですか。", VOICE_NARRATOR, "m2_q1_a.mp3", 0.85); pause()
    tts("明日の天気をお伝えします。朝は晴れますが、昼過ぎから雲が増えてきます。夕方には雨が降り始め、夜は強い雨になる見込みです。気温は今日より3度低く、最高気温は18度の予報です。傘の準備をお忘れなく。", VOICE_NARRATOR, "m2_q1_b.mp3"); pause(0.5)
    tts("明日の天気はどうですか。", VOICE_NARRATOR, "m2_q1_c.mp3", 0.85); pause()
    combine(["m2_q1_a.mp3","m2_q1_b.mp3","m2_q1_c.mp3"], "m2_q1.mp3")

    # q2: ジムの料金
    tts("スポーツジムのスタッフが話しています。このジムで一番安いコースはいくらですか。", VOICE_NARRATOR, "m2_q2_a.mp3", 0.85); pause()
    tts("当ジムには3つのコースがございます。ビジター制は1回1,500円です。月会員は月8,000円で平日のみご利用いただけます。フル会員は月12,000円で、いつでもご利用いただけます。", VOICE_FEMALE, "m2_q2_b.mp3"); pause(0.5)
    tts("このジムで一番安いコースはいくらですか。", VOICE_NARRATOR, "m2_q2_c.mp3", 0.85); pause()
    combine(["m2_q2_a.mp3","m2_q2_b.mp3","m2_q2_c.mp3"], "m2_q2.mp3")

    # q3: 旅行の理由
    tts("男の人と女の人が話しています。男の人が海外旅行をしたい理由は何ですか。", VOICE_NARRATOR, "m2_q3_a.mp3", 0.85); pause()
    tts("最近、海外旅行に興味があるって言ってたね。", VOICE_FEMALE, "m2_q3_b.mp3"); pause(0.5)
    tts("うん。仕事でずっとストレスがたまってて。自然の中でゆっくりしたいなと思って。", VOICE_MALE, "m2_q3_c.mp3"); pause(0.5)
    tts("観光地より自然派なんだね。", VOICE_FEMALE, "m2_q3_d.mp3"); pause(0.5)
    tts("そう。ショッピングより、山とか海でのんびりしたい。", VOICE_MALE, "m2_q3_e.mp3"); pause(0.5)
    tts("男の人が海外旅行をしたい理由は何ですか。", VOICE_NARRATOR, "m2_q3_f.mp3", 0.85); pause()
    combine(["m2_q3_a.mp3","m2_q3_b.mp3","m2_q3_c.mp3","m2_q3_d.mp3","m2_q3_e.mp3","m2_q3_f.mp3"], "m2_q3.mp3")

    # q4: 勉強方法
    tts("先生が話しています。先生が一番大切だと言っていることは何ですか。", VOICE_NARRATOR, "m2_q4_a.mp3", 0.85); pause()
    tts("外国語を上手になるためには、毎日続けることが大切です。単語をたくさん覚えることも大事ですが、それより、実際に話す練習を積み重ねることの方が重要です。間違いを恐れずに、どんどん話してみてください。", VOICE_FEMALE, "m2_q4_b.mp3"); pause(0.5)
    tts("先生が一番大切だと言っていることは何ですか。", VOICE_NARRATOR, "m2_q4_c.mp3", 0.85); pause()
    combine(["m2_q4_a.mp3","m2_q4_b.mp3","m2_q4_c.mp3"], "m2_q4.mp3")

    # q5: 趣味
    tts("男の人と女の人が話しています。男の人の趣味は何ですか。", VOICE_NARRATOR, "m2_q5_a.mp3", 0.85); pause()
    tts("休みの日は何をしているんですか。", VOICE_FEMALE, "m2_q5_b.mp3"); pause(0.5)
    tts("最近は陶芸を始めました。土を使って器を作るのが楽しくて。", VOICE_MALE, "m2_q5_c.mp3"); pause(0.5)
    tts("いいですね。絵を描いたりもしますか。", VOICE_FEMALE, "m2_q5_d.mp3"); pause(0.5)
    tts("絵は苦手で。陶芸一本です。", VOICE_MALE, "m2_q5_e.mp3"); pause(0.5)
    tts("男の人の趣味は何ですか。", VOICE_NARRATOR, "m2_q5_f.mp3", 0.85); pause()
    combine(["m2_q5_a.mp3","m2_q5_b.mp3","m2_q5_c.mp3","m2_q5_d.mp3","m2_q5_e.mp3","m2_q5_f.mp3"], "m2_q5.mp3")

    # q6: ペット調査
    tts("ニュースを聞いてください。日本で一番多いペットは何ですか。", VOICE_NARRATOR, "m2_q6_a.mp3", 0.85); pause()
    tts("最近の調査によると、日本で飼われているペットで最も多いのは猫で、次に犬、そして魚類と続いています。猫は犬に比べて世話が楽なことや、一人暮らしでも飼いやすいことが人気の理由とされています。", VOICE_NARRATOR, "m2_q6_b.mp3"); pause(0.5)
    tts("日本で一番多いペットは何ですか。", VOICE_NARRATOR, "m2_q6_c.mp3", 0.85); pause()
    combine(["m2_q6_a.mp3","m2_q6_b.mp3","m2_q6_c.mp3"], "m2_q6.mp3")

def mondai3():
    print("\n=== 問題3 概要理解 ===")

    # q1: 運動習慣
    tts("女の人が話しています。この人が一番言いたいことは何ですか。", VOICE_NARRATOR, "m3_q1_a.mp3", 0.85); pause()
    tts("適度な運動は体に良いと言われますが、毎日激しい運動をする必要はありません。大切なのは、無理なく続けられることです。30分の散歩でも、続けることで体力が上がり、気持ちも前向きになります。完璧を目指すより、小さく始めて習慣にすることが健康への近道です。", VOICE_FEMALE, "m3_q1_b.mp3"); pause(0.5)
    tts("この人が一番言いたいことは何ですか。", VOICE_NARRATOR, "m3_q1_c.mp3", 0.85); pause()
    combine(["m3_q1_a.mp3","m3_q1_b.mp3","m3_q1_c.mp3"], "m3_q1.mp3")

    # q2: 仕事の意味
    tts("男の人が話しています。男の人が一番言いたいことは何ですか。", VOICE_NARRATOR, "m3_q2_a.mp3", 0.85); pause()
    tts("仕事をする意味は、お金を稼ぐことだけではないと思います。仕事を通じて人と関わり、社会に貢献することで、自分自身も成長できます。やりがいを感じながら働ける環境を作ることが、会社にとっても社員にとっても大切なことではないでしょうか。", VOICE_MALE, "m3_q2_b.mp3"); pause(0.5)
    tts("男の人が一番言いたいことは何ですか。", VOICE_NARRATOR, "m3_q2_c.mp3", 0.85); pause()
    combine(["m3_q2_a.mp3","m3_q2_b.mp3","m3_q2_c.mp3"], "m3_q2.mp3")

    # q3: デジタル教育
    tts("先生が話しています。先生が一番言いたいことは何ですか。", VOICE_NARRATOR, "m3_q3_a.mp3", 0.85); pause()
    tts("デジタル化が進む中、子供たちにとってスマートフォンやタブレットは身近な存在になっています。しかし、使い方を間違えると、視力の低下や睡眠不足につながります。大切なのは禁止することではなく、正しい使い方を教えることです。デジタル機器と上手に付き合う力を育てることが、今の教育に求められています。", VOICE_FEMALE, "m3_q3_b.mp3"); pause(0.5)
    tts("先生が一番言いたいことは何ですか。", VOICE_NARRATOR, "m3_q3_c.mp3", 0.85); pause()
    combine(["m3_q3_a.mp3","m3_q3_b.mp3","m3_q3_c.mp3"], "m3_q3.mp3")

def mondai4():
    print("\n=== 問題4 発話表現 ===")
    items = [
        ("m4_q1", "友達が試験に合格したと聞きました。お祝いの言葉をかけます。なんと言いますか。"),
        ("m4_q2", "電車の中で席を譲りたい高齢者がいます。なんと言いますか。"),
        ("m4_q3", "上司に仕事の締め切りを延ばしてもらいたいです。なんと言いますか。"),
        ("m4_q4", "友達の家を訪問したとき、手土産を渡したいです。なんと言いますか。"),
    ]
    for qid, text in items:
        tts(text, VOICE_NARRATOR, f"{qid}_a.mp3", 0.85); pause(0.8)
        combine([f"{qid}_a.mp3"], f"{qid}.mp3")

    print("\n=== 問題5 即時応答 ===")
    sokuji = [
        ("m4_q5",  "この仕事、手伝ってもらえますか。"),
        ("m4_q6",  "昨日の発表、うまくいった？"),
        ("m4_q7",  "窓を開けてもいいですか。"),
        ("m4_q8",  "この映画、もう見ましたか。"),
        ("m4_q9",  "ただいま。"),
        ("m4_q10", "そのかばん、新しいんですか。"),
        ("m4_q11", "会議の時間、変わったって知ってた？"),
        ("m4_q12", "ごちそうさまでした。とてもおいしかったです。"),
        ("m4_q13", "今日は早く帰っていいですよ。"),
    ]
    for qid, text in sokuji:
        tts(text, VOICE_NARRATOR, f"{qid}_a.mp3", 0.9); pause(0.8)
        combine([f"{qid}_a.mp3"], f"{qid}.mp3")

if __name__ == "__main__":
    print("N3 Mock Test 03 - 音声生成開始")
    print(f"出力先: {OUTPUT_DIR}/")
    mondai1()
    mondai2()
    mondai3()
    mondai4()
    for f in os.listdir(OUTPUT_DIR):
        if re.search(r'_[a-h]\.mp3$', f):
            os.remove(os.path.join(OUTPUT_DIR, f))
    finals = sorted(os.listdir(OUTPUT_DIR))
    print(f"\n完了！ 生成ファイル数: {len(finals)}")
    for f in finals:
        print(f"  {f}")
    print("\nHostingerアップロード先: /materials/jlpt/n3/mock-03/audio/")
