const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(normalizeEmail(email));
}

export function validateEmail(email: unknown): string | null {
  if (typeof email !== "string" || !email.trim()) {
    return null;
  }

  const normalized = normalizeEmail(email);
  return isValidEmail(normalized) ? normalized : null;
}
