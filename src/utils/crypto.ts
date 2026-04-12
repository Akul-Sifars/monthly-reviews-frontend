/**
 * Hash a password with a salt using SHA-256
 * @param password - The password to hash
 * @param salt - The salt to use for hashing
 * @returns The hashed password as a hexadecimal string
 */
export async function hashPassword(password: string, salt: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + salt);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Generate a random UUID
 * @returns A random UUID string
 */
export function generateUUID(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback for environments without crypto.randomUUID
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * Get or create a browser ID from localStorage
 * @returns The browser ID
 */
export function getOrCreateBrowserId(): string {
  if (typeof localStorage === 'undefined') {
    return generateUUID();
  }
  let browserId = localStorage.getItem('review_id');
  if (!browserId) {
    browserId = generateUUID();
    localStorage.setItem('review_id', browserId);
  }
  return browserId;
}
