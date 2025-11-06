// Validation utilities for authentication

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface UserCredentials {
  username?: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

// Username validation rules
export const validateUsername = (username: string): ValidationResult => {
  const errors: string[] = [];
  
  // Check length (3-20 characters)
  if (username.length < 3) {
    errors.push('Username must be at least 3 characters long');
  }
  if (username.length > 20) {
    errors.push('Username must be no more than 20 characters long');
  }
  
  // Check allowed characters (alphanumeric, underscores, hyphens)
  const usernameRegex = /^[a-zA-Z0-9_-]+$/;
  if (!usernameRegex.test(username)) {
    errors.push('Username can only contain letters, numbers, underscores, and hyphens');
  }
  
  // Check that it doesn't start or end with special characters
  if (username.startsWith('-') || username.startsWith('_') || 
      username.endsWith('-') || username.endsWith('_')) {
    errors.push('Username cannot start or end with underscores or hyphens');
  }
  
  // Check for consecutive special characters
  if (/__|-_|_-|--|__/.test(username)) {
    errors.push('Username cannot contain consecutive special characters');
  }
  
  // Check that it's not all numbers
  if (/^\d+$/.test(username)) {
    errors.push('Username cannot be all numbers');
  }
  
  // Reserved usernames
  const reservedUsernames = [
    'admin', 'administrator', 'root', 'user', 'guest', 'anonymous', 'system',
    'moderator', 'mod', 'support', 'help', 'api', 'test', 'demo', 'null',
    'undefined', 'hivehub', 'thehivehub', 'bee', 'honey', 'official'
  ];
  
  if (reservedUsernames.includes(username.toLowerCase())) {
    errors.push('This username is reserved and cannot be used');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Email validation
export const validateEmail = (email: string): ValidationResult => {
  const errors: string[] = [];
  
  // Basic email format validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    errors.push('Please enter a valid email address');
  }
  
  // Check length
  if (email.length > 254) {
    errors.push('Email address is too long');
  }
  
  // Check for common issues
  if (email.includes('..')) {
    errors.push('Email cannot contain consecutive dots');
  }
  
  if (email.startsWith('.') || email.endsWith('.')) {
    errors.push('Email cannot start or end with a dot');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Password validation rules
export const validatePassword = (password: string): ValidationResult => {
  const errors: string[] = [];
  
  // Check minimum length (8 characters)
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  // Check maximum length (128 characters for security)
  if (password.length > 128) {
    errors.push('Password must be no more than 128 characters long');
  }
  
  // Check for at least one lowercase letter
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  // Check for at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  // Check for at least one number
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  // Check for at least one special character
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(password)) {
    errors.push('Password must contain at least one special character (!@#$%^&*()_+-=[]{}|;:,.<>?)');
  }
  
  // Check for common weak patterns
  const commonPatterns = [
    /(.)\1{2,}/, // Three or more consecutive identical characters
    /123|234|345|456|567|678|789|890/, // Sequential numbers
    /abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz/i, // Sequential letters
    /qwer|asdf|zxcv|qwerty|asdfgh|zxcvbn/i // Keyboard patterns
  ];
  
  for (const pattern of commonPatterns) {
    if (pattern.test(password)) {
      errors.push('Password contains common patterns and is too predictable');
      break;
    }
  }
  
  // Check against common weak passwords
  const commonWeakPasswords = [
    'password', 'password123', '12345678', 'qwerty123', 'abc123456',
    'password1', 'welcome123', 'admin123', 'letmein123', 'changeme123'
  ];
  
  if (commonWeakPasswords.includes(password.toLowerCase())) {
    errors.push('This password is too common and easily guessed');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Confirm password validation
export const validatePasswordConfirmation = (password: string, confirmPassword: string): ValidationResult => {
  const errors: string[] = [];
  
  if (password !== confirmPassword) {
    errors.push('Passwords do not match');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Complete registration validation
export const validateRegistration = (credentials: UserCredentials): ValidationResult => {
  const allErrors: string[] = [];
  
  // Validate username
  if (credentials.username) {
    const usernameValidation = validateUsername(credentials.username);
    allErrors.push(...usernameValidation.errors);
  }
  
  // Validate email
  const emailValidation = validateEmail(credentials.email);
  allErrors.push(...emailValidation.errors);
  
  // Validate password
  const passwordValidation = validatePassword(credentials.password);
  allErrors.push(...passwordValidation.errors);
  
  // Validate password confirmation
  if (credentials.confirmPassword) {
    const confirmValidation = validatePasswordConfirmation(credentials.password, credentials.confirmPassword);
    allErrors.push(...confirmValidation.errors);
  }
  
  return {
    isValid: allErrors.length === 0,
    errors: allErrors
  };
};

// Login validation (lighter rules)
export const validateLogin = (credentials: UserCredentials): ValidationResult => {
  const allErrors: string[] = [];
  
  // Validate email
  const emailValidation = validateEmail(credentials.email);
  allErrors.push(...emailValidation.errors);
  
  // Basic password check (just not empty)
  if (!credentials.password || credentials.password.trim().length === 0) {
    allErrors.push('Password is required');
  }
  
  return {
    isValid: allErrors.length === 0,
    errors: allErrors
  };
};

// Password strength indicator
export const getPasswordStrength = (password: string): {
  score: number;
  label: string;
  color: string;
} => {
  let score = 0;
  
  // Length scoring
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (password.length >= 16) score += 1;
  
  // Character variety scoring
  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(password)) score += 1;
  
  // Bonus for good patterns
  if (password.length >= 12 && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`])/.test(password)) {
    score += 1;
  }
  
  // Penalty for common patterns
  const commonPatterns = [
    /(.)\1{2,}/,
    /123|234|345|456|567|678|789|890/,
    /abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz/i,
    /qwer|asdf|zxcv|qwerty|asdfgh|zxcvbn/i
  ];
  
  for (const pattern of commonPatterns) {
    if (pattern.test(password)) {
      score = Math.max(0, score - 2);
      break;
    }
  }
  
  // Return strength assessment
  if (score <= 2) {
    return { score, label: 'Weak', color: 'text-destructive' };
  } else if (score <= 4) {
    return { score, label: 'Fair', color: 'text-orange-500' };
  } else if (score <= 6) {
    return { score, label: 'Good', color: 'text-yellow-500' };
  } else {
    return { score, label: 'Strong', color: 'text-green-500' };
  }
};
