/**
 * Server-side cache for FRED API responses
 * Reduces API calls and improves performance
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

class ServerCache {
  private cache: Map<string, CacheEntry<any>>;
  private readonly DEFAULT_TTL = 12 * 60 * 60 * 1000; // 12 hours in milliseconds

  constructor() {
    this.cache = new Map();
  }

  /**
   * Generate a cache key from parameters
   */
  generateKey(prefix: string, params: Record<string, any>): string {
    const sortedParams = Object.keys(params)
      .sort()
      .map(key => `${key}=${params[key]}`)
      .join('&');
    return `${prefix}:${sortedParams}`;
  }

  /**
   * Get data from cache if it exists and hasn't expired
   */
  get<T>(key: string): T | null {
    const entry = this.cache.get(key);

    if (!entry) {
      return null;
    }

    // Check if expired
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      console.log(`🗑️  Cache expired: ${key}`);
      return null;
    }

    const age = Math.round((Date.now() - entry.timestamp) / 1000 / 60); // age in minutes
    console.log(`✅ Cache hit: ${key} (age: ${age} minutes)`);
    return entry.data as T;
  }

  /**
   * Store data in cache with TTL
   */
  set<T>(key: string, data: T, ttl: number = this.DEFAULT_TTL): void {
    const now = Date.now();
    const entry: CacheEntry<T> = {
      data,
      timestamp: now,
      expiresAt: now + ttl,
    };

    this.cache.set(key, entry);
    const ttlHours = Math.round(ttl / 1000 / 60 / 60 * 10) / 10; // TTL in hours
    console.log(`💾 Cached: ${key} (TTL: ${ttlHours}h)`);
  }

  /**
   * Generate a cache key for series observations
   */
  getSeriesObservationsKey(seriesId: string, params: Record<string, any>): string {
    return this.generateKey(`observations:${seriesId}`, params);
  }

  /**
   * Generate a cache key for series info
   */
  getSeriesInfoKey(seriesId: string): string {
    return `info:${seriesId}`;
  }

  /**
   * Generate a cache key for series search
   */
  getSeriesSearchKey(searchText: string, params: Record<string, any>): string {
    return this.generateKey(`search:${searchText}`, params);
  }

  /**
   * Clear all expired entries
   */
  clearExpired(): number {
    let cleared = 0;
    const now = Date.now();

    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.expiresAt) {
        this.cache.delete(key);
        cleared++;
      }
    }

    if (cleared > 0) {
      console.log(`🗑️  Cleared ${cleared} expired cache entries`);
    }

    return cleared;
  }

  /**
   * Clear all cache entries
   */
  clearAll(): void {
    const size = this.cache.size;
    this.cache.clear();
    console.log(`🗑️  Cleared all cache (${size} entries)`);
  }

  /**
   * Get cache statistics
   */
  getStats(): { size: number; entries: Array<{ key: string; age: string; expiresIn: string }> } {
    const now = Date.now();
    const entries = Array.from(this.cache.entries()).map(([key, entry]) => {
      const ageMinutes = Math.round((now - entry.timestamp) / 1000 / 60);
      const expiresMinutes = Math.round((entry.expiresAt - now) / 1000 / 60);

      return {
        key,
        age: ageMinutes > 60 ? `${Math.round(ageMinutes / 60)}h` : `${ageMinutes}m`,
        expiresIn: expiresMinutes > 60 ? `${Math.round(expiresMinutes / 60)}h` : `${expiresMinutes}m`,
      };
    });

    return {
      size: this.cache.size,
      entries,
    };
  }
}

// Export singleton instance
export const fredCache = new ServerCache();

// Periodically clear expired entries (every hour)
if (typeof global !== 'undefined') {
  setInterval(() => {
    fredCache.clearExpired();
  }, 60 * 60 * 1000); // 1 hour
}
