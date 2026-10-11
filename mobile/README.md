# Nihon GO! ストア版アプリ

App Store と Google Play に出すための殻。
中身は今の app.nihongo-world.com/my をそのまま読み込む。
なので多読ストーリーや復習を直したら、アプリの方も自動で新しくなる。ストアに出し直す必要なし。

## 動き方

・アプリを開くと app.nihongo-world.com/my が出る
・JLPT 模試パックは、アプリの中では Stripe ではなくアプリ内課金で買う
・アプリ内で買った記録は RevenueCat から `/api/webhooks/revenuecat` に届いて、サイトで買った時と同じ `jlpt_subscriptions` に入る
・サイトで買った人も、アプリでログインすればそのまま使える
・レッスンのチケットと学校向けライセンスは Apple の決まりでアプリ内課金にしなくていい（対面や個人レッスン、法人向けは対象外）

## Ayaka がやること

1. D-U-N-S 番号を取る（A-Digital Works Ltd 名義）
2. Apple Developer Program に登録（年 $99）
3. Google Play Console に登録（一回だけ $25）
4. Apple の登録が通ったら Small Business Program に申し込む（手数料15%になる）
5. RevenueCat のアカウントを作って、iOS と Android のアプリを登録
6. App Store Connect と Google Play で商品を作る。種類は「自動更新しない」もので、ID はこの5つ
   ・jlpt_n5_60d
   ・jlpt_n4_60d
   ・jlpt_n3_60d
   ・jlpt_n2_60d
   ・jlpt_n1_60d
7. RevenueCat の Webhook に `https://app.nihongo-world.com/api/webhooks/revenuecat` を登録して、Authorization に好きな長い文字列を入れる
8. Vercel の環境変数に追加
   ・`NEXT_PUBLIC_REVENUECAT_IOS_KEY`：RevenueCat の iOS 用キー
   ・`NEXT_PUBLIC_REVENUECAT_ANDROID_KEY`：RevenueCat の Android 用キー
   ・`REVENUECAT_WEBHOOK_AUTH`：7で入れた文字列
   ・`REVENUECAT_ALLOW_SANDBOX`：テスト購入の間だけ `1`。本番前に消す

## ビルド

iPhone 版は Mac と Xcode が必要。

```
cd mobile
npm install
npx cap sync
npx cap open ios       # Xcode が開く
npx cap open android   # Android Studio が開く
```

Xcode で一回だけやること
・Signing & Capabilities で自分のチームを選ぶ
・同じ画面で「In-App Purchase」を追加する

アプリの ID は今 `com.nihongoworld.app`。ストアに最初に出す前なら変えられる。出した後は変えられない。

## 審査に出す前にやること（まだ入ってない）

・アプリらしい機能。サイトを包んだだけだと Apple に落とされることがある。学習リマインダーの通知、音声のオフライン再生あたりを入れる
・アイコンと起動画面を、今の Nihon GO! のロゴで作る
・アプリの中では、サイトの「£9.99」や Stripe へのリンクを見せない。Apple は「サイトの方が安い」と案内するのを認めていない。nihongo-world.com の模試ページの購入ボタンは、アプリの中では隠す必要あり
・ストア用のスクショ、説明文、プライバシーの申告
