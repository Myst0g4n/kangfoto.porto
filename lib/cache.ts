// lib/cache.ts

interface CacheItem<T> {
  data: T;
  timestamp: number;
}

// Durasi cache: 5 menit (300.000 ms)
const CACHE_DURATION = 1000 * 60 * 5;

/**
 * Mengambil data dari Local Storage jika masih valid (belum kadaluarsa).
 */
export function getCachedData<T>(key: string): T | null {
  if (typeof window === 'undefined') return null;

  try {
    const cached = localStorage.getItem(key);
    if (!cached) return null;

    const { data, timestamp }: CacheItem<T> = JSON.parse(cached);
    const isExpired = Date.now() - timestamp > CACHE_DURATION;

    if (isExpired) {
      localStorage.removeItem(key);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error reading cache:', error);
    return null;
  }
}

/**
 * Menyimpan data ke Local Storage dengan timestamp saat ini.
 */
export function setCachedData<T>(key: string, data: T): void {
  if (typeof window === 'undefined') return;

  try {
    const cacheItem: CacheItem<T> = {
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(key, JSON.stringify(cacheItem));
  } catch (error) {
    console.error('Error writing cache:', error);
  }
}
