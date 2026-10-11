// ストアのアプリだけで使う。多読ストーリーを音声ごと端末に保存して、
// 電波がない時でも読めるようにする（オフライン時は mobile/www/offline.html が開く）。
//
// 保存先（アプリ専用の領域）:
//   offline/index.json                 保存したストーリーの一覧
//   offline/stories/<id>.json          本文（サイトの /materials/stories/data/<id>.json と同じ形）
//   offline/audio/<id>/<01>.mp3        一文ずつの音声

const SITE = 'https://nihongo-world.com/materials/stories'
const DIR = 'DATA'
const INDEX = 'offline/index.json'

async function plugins() {
  const [{ Filesystem, Encoding }, { CapacitorHttp }] = await Promise.all([
    import('@capacitor/filesystem'),
    import('@capacitor/core'),
  ])
  return { Filesystem, Encoding, CapacitorHttp }
}

export async function readOfflineIndex() {
  try {
    const { Filesystem, Encoding } = await plugins()
    const { data } = await Filesystem.readFile({ path: INDEX, directory: DIR, encoding: Encoding.UTF8 })
    return JSON.parse(typeof data === 'string' ? data : '{}')
  } catch (e) {
    return {}
  }
}

async function writeIndex(index) {
  const { Filesystem, Encoding } = await plugins()
  await Filesystem.writeFile({
    path: INDEX, directory: DIR, encoding: Encoding.UTF8, recursive: true,
    data: JSON.stringify(index),
  })
}

// 1話ぶん保存する。音声がない文は飛ばす（オフラインでは端末の読み上げで代わりに読む）。
async function saveStory(story) {
  const { Filesystem, Encoding, CapacitorHttp } = await plugins()
  const res = await CapacitorHttp.get({ url: `${SITE}/data/${story.id}.json`, responseType: 'json' })
  if (res.status !== 200) throw new Error(`Could not download ${story.id}`)
  const body = typeof res.data === 'string' ? JSON.parse(res.data) : res.data
  await Filesystem.writeFile({
    path: `offline/stories/${story.id}.json`, directory: DIR, encoding: Encoding.UTF8, recursive: true,
    data: JSON.stringify(body),
  })

  const count = Array.isArray(body.sents) ? body.sents.length : 0
  let audio = 0
  for (let i = 0; i < count; i++) {
    const nn = String(i + 1).padStart(2, '0')
    try {
      const a = await CapacitorHttp.get({ url: `${SITE}/audio/${story.id}/${nn}.mp3`, responseType: 'blob' })
      if (a.status !== 200 || typeof a.data !== 'string') continue
      await Filesystem.writeFile({
        path: `offline/audio/${story.id}/${nn}.mp3`, directory: DIR, recursive: true, data: a.data,
      })
      audio++
    } catch (e) {}
  }
  return { sentences: count, audio }
}

// あるレベルを丸ごと保存。onProgress(done, total) で進み具合を返す。
export async function saveLevelOffline(stories, onProgress) {
  const index = await readOfflineIndex()
  let done = 0
  for (const s of stories) {
    if (!index[s.id]) {
      try {
        const r = await saveStory(s)
        index[s.id] = { id: s.id, lv: s.lv, no: s.no, title: s.title, en: s.en, audio: r.audio, sentences: r.sentences }
        await writeIndex(index)
      } catch (e) {}
    }
    done++
    if (onProgress) onProgress(done, stories.length)
  }
  return index
}

export async function removeLevelOffline(lv) {
  const { Filesystem } = await plugins()
  const index = await readOfflineIndex()
  for (const id of Object.keys(index)) {
    if (index[id].lv !== lv) continue
    try { await Filesystem.deleteFile({ path: `offline/stories/${id}.json`, directory: DIR }) } catch (e) {}
    try { await Filesystem.rmdir({ path: `offline/audio/${id}`, directory: DIR, recursive: true }) } catch (e) {}
    delete index[id]
  }
  await writeIndex(index)
  return index
}
