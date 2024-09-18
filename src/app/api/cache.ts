interface CacheEntry {
  value: any;
  expiration: number;
}

const cache: { [key: string]: CacheEntry } = {};

/**
 * Sets a value in the cache with an expiration time.
 * @param key The cache key
 * @param value The value to cache
 * @param ttl Time to live (in milliseconds)
 */
export const setCache = (key: string, value: any, ttl: number) => {
  const expiration = Date.now() + ttl;
  cache[key] = { value, expiration };
};

/**
 * Gets a value from the cache if it hasn't expired.
 * @param key The cache key
 * @returns The cached value or null if expired/not found
 */
export const getCache = (key: string) => {
  const entry = cache[key];
  if (!entry || entry.expiration < Date.now()) {
    delete cache[key];
    return null;
  }

  return entry.value;
};

/**
 * Clear the cache for a specific key
 * @param key The cache key
 */
export const clearCache = (key: string) => {
  delete cache[key];
};
