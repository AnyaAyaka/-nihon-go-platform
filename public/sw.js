// ホーム画面に追加できるようにするためだけのもの。
// 何もキャッシュしない。常にネットワークに取りに行く。
self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()))
self.addEventListener('fetch', () => {})
