const IPV4_REGEX = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

const IPV6_REGEX = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;

export const isValidIPv4 = (ip: string): boolean => {
  return IPV4_REGEX.test(ip.trim());
};

export const isValidIPv6 = (ip: string): boolean => {
  return IPV6_REGEX.test(ip.trim());
};

export const validateIP = (ip: string): boolean => {
  const trimmed = ip.trim();
  return isValidIPv4(trimmed) || isValidIPv6(trimmed);
};

export const sanitizeIP = (ip: string): string => {
  return ip.trim().toLowerCase();
};

export type ValidatedIP = string & { __brand: 'ValidatedIP' };

export const createValidatedIP = (ip: string): ValidatedIP | null => {
  const sanitized = sanitizeIP(ip);
  return validateIP(sanitized) ? (sanitized as ValidatedIP) : null;
};

export type ValidationResult<T> =
  | { isValid: true; value: T }
  | { isValid: false; error: string };

export const getIPValidationResult = (ip: string): ValidationResult<ValidatedIP> => {
  if (!ip || ip.trim() === '') {
    return { isValid: false, error: 'La dirección IP es requerida' };
  }

  const validatedIP = createValidatedIP(ip);
  if (!validatedIP) {
    return { isValid: false, error: 'Formato de dirección IP inválido' };
  }

  return { isValid: true, value: validatedIP };
};

export const getIPValidationError = (ip: string): string | null => {
  const result = getIPValidationResult(ip);
  return !result.isValid ? result.error : null;
};