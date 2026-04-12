import { useState, useEffect } from 'react';
import { getOrCreateBrowserId } from '../utils/crypto';

/**
 * Custom hook to manage browser ID for anonymous review submission
 * @returns The browser ID
 */
export const useBrowserId = (): string | null => {
  const [browserId, setBrowserId] = useState<string | null>(null);

  useEffect(() => {
    const id = getOrCreateBrowserId();
    setBrowserId(id);
  }, []);

  return browserId;
};
