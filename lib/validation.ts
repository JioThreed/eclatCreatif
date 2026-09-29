export const ERRORS = {
  EMAIL_REQUIRED:
    "Veuillez saisir une adresse email",

  EMAIL_INVALID:
    "Adresse email invalide (Format attendu : xxx@xxx.xxx",

  USERNAME_REQUIRED:
    "Veuillez choisir un pseudo",

  USERNAME_INVALID:
    "Le pseudo doit contenir entre 3 et 30 caractères (lettres sans accent, chiffres ou _)",

  PASSWORD_REQUIRED:
    "Veuillez saisir un mot de passe",

  PASSWORD_MIN_LENGTH:
    "Le mot de passe doit contenir au moins 12 caractères",

  PASSWORD_UPPERCASE:
    "Le mot de passe doit contenir une majuscule",

  PASSWORD_LOWERCASE:
    "Le mot de passe doit contenir une minuscule",

  PASSWORD_NUMBER:
    "Le mot de passe doit contenir un chiffre",

  CONFIRM_PASSWORD_REQUIRED:
    "Veuillez confirmer votre mot de passe",

  PASSWORD_MISMATCH:
    "Les mots de passe ne correspondent pas",
};

export function getEmailError(
  email: string
): string | null {
  if (!email.trim()) {
    return ERRORS.EMAIL_REQUIRED;
  }

  const regex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!regex.test(email)) {
    return ERRORS.EMAIL_INVALID;
  }

  return null;
}

export function getUsernameError(
  username: string
): string | null {
  if (!username.trim()) {
    return ERRORS.USERNAME_REQUIRED;
  }

  if (
    !/^[a-zA-Z0-9_]{3,30}$/.test(
      username
    )
  ) {
    return ERRORS.USERNAME_INVALID;
  }

  return null;
}

export function getPasswordError(
  password: string
): string | null {
  let errorResult = "";

  if (!password) {
   errorResult += ERRORS.PASSWORD_REQUIRED + "\n";
  }

  if (password.length < 12) {
    errorResult += ERRORS.PASSWORD_MIN_LENGTH + "\n";
  }

  if (!/[A-Z]/.test(password)) {
    errorResult += ERRORS.PASSWORD_UPPERCASE + "\n";
  }

  if (!/[a-z]/.test(password)) {
    errorResult += ERRORS.PASSWORD_LOWERCASE + "\n";
  }

  if (!/\d/.test(password)) {
    errorResult += ERRORS.PASSWORD_NUMBER + "\n";
  }

  if(errorResult != "")
	return errorResult;
  
  return null;
}

export function getConfirmPasswordError(
  password: string,
  confirmPassword: string
): string | null {
  if (!confirmPassword) {
    return ERRORS.CONFIRM_PASSWORD_REQUIRED;
  }

  if (password !== confirmPassword) {
    return ERRORS.PASSWORD_MISMATCH;
  }

  return null;
}