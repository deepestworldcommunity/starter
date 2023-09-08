const crypto = require('node:crypto')

const BASE_URL = 'https://dw.kvn.wtf'
const seenChunks = new Map()

function hashChunk(chunk) {
  return crypto.createHash('sha1').update(JSON.stringify(chunk)).digest('hex')
}

async function onSeenChunks(chunks) {
  const requests = []

  for (const [chunkName, chunk] of Object.entries(chunks)) {
    const hash = hashChunk(chunk)
    if ((seenChunks.get(chunkName) ?? '') === hash) {
      continue
    }

    seenChunks.set(chunkName, hash)

    requests.push(fetch(
      `${BASE_URL}/log/chunk?name=${encodeURIComponent(chunkName)}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(chunk)
      }
    ))
  }

  await Promise.allSettled(requests)
}

async function onLoot(entries){
  const requests = []

  for (const entry of entries) {
    if (!entry.item.mods) {
      continue
    }

    const item = {...entry.item}
    delete item.n

    requests.push(fetch(
      `${BASE_URL}/log/loot`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item)
      }
    ))
  }

  await Promise.allSettled(requests)
}

module.exports = {
  onSeenChunks,
  onLoot,
}
