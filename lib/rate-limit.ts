const WINDOW_MS = 60 * 60 * 1000 // 1 hour
const MAX_REQUESTS = 5

interface Entry {
  count: number
  resetAt: number
}

const store = new Map<string, Entry>()

export function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  // Fail open for unknown IPs — never block legitimate users
  if (ip === 'unknown') return { allowed: true, remaining: MAX_REQUESTS }

  const now = Date.now()

  // Prune stale entries
  for (const [key, entry] of store) {
    if (entry.resetAt < now) store.delete(key)
  }

  const entry = store.get(ip)

  if (!entry || entry.resetAt < now) {
    store.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return { allowed: true, remaining: MAX_REQUESTS - 1 }
  }

  if (entry.count >= MAX_REQUESTS) {
    return { allowed: false, remaining: 0 }
  }

  entry.count++
  return { allowed: true, remaining: MAX_REQUESTS - entry.count }
}
