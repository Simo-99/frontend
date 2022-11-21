export function setStorage(key, value, ttl = 1000 * 60 * 59 * 2) { localStorage.setItem(key, JSON.stringify({ value: value, expiry: new Date().getTime() + ttl })) }
export function getStorage(key) {
    const itemStr = localStorage.getItem(key)
    if (!itemStr) return null

    if (new Date().getTime() > JSON.parse(itemStr).expiry) { localStorage.removeItem(key); return null; }
    return JSON.parse(itemStr).value
}