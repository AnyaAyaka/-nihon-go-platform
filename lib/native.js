// ストアのアプリ（iPhone / Android）の中で開かれているかを見分ける。
// アプリの殻（mobile/ フォルダ）がこのサイトを読み込むと、window.Capacitor が入ってくる。
// 普通のブラウザやホーム画面に追加した版では、どちらも 'web' / false になる。

export function nativePlatform() {
  if (typeof window === 'undefined') return 'web'
  const cap = window.Capacitor
  if (!cap || typeof cap.getPlatform !== 'function') return 'web'
  return cap.getPlatform() // 'ios' | 'android' | 'web'
}

export function isNativeApp() {
  const p = nativePlatform()
  return p === 'ios' || p === 'android'
}
