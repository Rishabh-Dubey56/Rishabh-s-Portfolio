interface OtpEntry {
  code: string;
  expiresAt: number;
  attempts: number;
  createdAt: number;
}

// In-memory OTP storage keyed by normalized email
const otpStore = new Map<string, OtpEntry>();

const OTP_EXPIRY_MS = 10 * 60 * 1000; // 10 minutes
const MAX_ATTEMPTS = 5;

/**
 * Generate a cryptographically random 6-digit numeric OTP and store it.
 */
export function generateOtp(email: string): string {
  const normalizedEmail = email.toLowerCase().trim();
  // Generate random 6-digit number string [100000, 999999]
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  
  otpStore.set(normalizedEmail, {
    code,
    expiresAt: Date.now() + OTP_EXPIRY_MS,
    attempts: 0,
    createdAt: Date.now(),
  });

  return code;
}

/**
 * Verify an OTP for a given email.
 */
export function verifyOtp(email: string, code: string): { valid: boolean; reason?: string } {
  const normalizedEmail = email.toLowerCase().trim();
  const entry = otpStore.get(normalizedEmail);

  if (!entry) {
    return {
      valid: false,
      reason: "No verification code was requested for this email, or it has already been used.",
    };
  }

  if (Date.now() > entry.expiresAt) {
    otpStore.delete(normalizedEmail);
    return {
      valid: false,
      reason: "Verification code has expired. Please request a new code.",
    };
  }

  if (entry.attempts >= MAX_ATTEMPTS) {
    otpStore.delete(normalizedEmail);
    return {
      valid: false,
      reason: "Too many failed attempts. Please request a fresh verification code.",
    };
  }

  if (entry.code !== code.trim()) {
    entry.attempts += 1;
    const remaining = MAX_ATTEMPTS - entry.attempts;
    return {
      valid: false,
      reason: `Invalid verification code. ${remaining} attempt${remaining === 1 ? "" : "s"} remaining.`,
    };
  }

  // Verification succeeded - clear OTP so it cannot be reused
  otpStore.delete(normalizedEmail);
  return { valid: true };
}

/**
 * Clear any active OTP for an email.
 */
export function clearOtp(email: string): void {
  otpStore.delete(email.toLowerCase().trim());
}
