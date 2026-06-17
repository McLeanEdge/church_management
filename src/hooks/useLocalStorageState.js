import { useEffect, useState } from 'react';

// A drop-in replacement for useState that automatically persists its
// value to localStorage under `key`, and rehydrates from it on mount.
// `initializer` (value or function) is only used the very first time,
// when nothing has been saved yet.
export function useLocalStorageState(key, initializer) {
  const [state, setState] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Guard against an accidentally-empty persisted array (e.g. the
        // slideshow must always keep at least one slide).
        if (!Array.isArray(parsed) || parsed.length > 0) return parsed;
      }
    } catch (e) {
      // Ignore corrupted storage and fall back to the initializer below.
    }
    return typeof initializer === 'function' ? initializer() : initializer;
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (e) {
      // Storage may be unavailable (private browsing, quota exceeded, etc).
      console.warn(`Could not persist "${key}" to localStorage.`, e);
    }
  }, [key, state]);

  return [state, setState];
}
