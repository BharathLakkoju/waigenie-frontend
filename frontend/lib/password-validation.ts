export const passwordRequirements = {
  minLength: 6,
  requireCapital: true,
  requireLowercase: true,
  requireNumber: true,
  requireSpecial: true,
};

export interface PasswordValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validatePassword(password: string): PasswordValidationResult {
  const errors: string[] = [];

  // Check minimum length
  if (password.length < passwordRequirements.minLength) {
    errors.push(`Password must be at least ${passwordRequirements.minLength} characters long`);
  }

  // Check for capital letter
  if (passwordRequirements.requireCapital && !/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one capital letter");
  }

  // Check for lowercase letter
  if (passwordRequirements.requireLowercase && !/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter");
  }

  // Check for number
  if (passwordRequirements.requireNumber && !/\d/.test(password)) {
    errors.push("Password must contain at least one number");
  }

  // Check for special character
  if (passwordRequirements.requireSpecial && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push("Password must contain at least one special character");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function getPasswordStrength(password: string): {
  strength: 'weak' | 'medium' | 'strong';
  color: string;
  percentage: number;
} {
  let score = 0;
  const maxScore = 5;

  // Length check
  if (password.length >= passwordRequirements.minLength) score++;

  // Capital letter check
  if (/[A-Z]/.test(password)) score++;

  // Lowercase letter check
  if (/[a-z]/.test(password)) score++;

  // Number check
  if (/\d/.test(password)) score++;

  // Special character check
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;

  const percentage = (score / maxScore) * 100;

  if (score <= 2) {
    return { strength: 'weak', color: 'text-red-500', percentage };
  } else if (score <= 4) {
    return { strength: 'medium', color: 'text-yellow-500', percentage };
  } else {
    return { strength: 'strong', color: 'text-green-500', percentage };
  }
} 