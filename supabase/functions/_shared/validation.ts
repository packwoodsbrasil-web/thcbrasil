// Shared validation utilities for edge functions

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

// Validate CPF format (11 digits)
export function validateCPF(cpf: string): ValidationResult {
  const cleanCPF = cpf?.replace(/\D/g, '');
  if (!cleanCPF || cleanCPF.length !== 11) {
    return { valid: false, error: 'CPF deve ter 11 dígitos' };
  }
  
  // Check for known invalid CPFs (all same digits)
  if (/^(\d)\1+$/.test(cleanCPF)) {
    return { valid: false, error: 'CPF inválido' };
  }
  
  return { valid: true };
}

// Validate email format
export function validateEmail(email: string): ValidationResult {
  if (!email || typeof email !== 'string') {
    return { valid: false, error: 'E-mail é obrigatório' };
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim()) || email.length > 255) {
    return { valid: false, error: 'E-mail inválido' };
  }
  
  return { valid: true };
}

// Validate phone format (10-11 digits for Brazilian numbers)
export function validatePhone(phone: string): ValidationResult {
  const cleanPhone = phone?.replace(/\D/g, '');
  if (!cleanPhone || cleanPhone.length < 10 || cleanPhone.length > 11) {
    return { valid: false, error: 'Telefone deve ter 10 ou 11 dígitos' };
  }
  
  return { valid: true };
}

// Validate CEP format (8 digits)
export function validateCEP(cep: string): ValidationResult {
  const cleanCEP = cep?.replace(/\D/g, '');
  if (!cleanCEP || cleanCEP.length !== 8) {
    return { valid: false, error: 'CEP deve ter 8 dígitos' };
  }
  
  return { valid: true };
}

// Validate name (not empty, reasonable length)
export function validateName(name: string, fieldName: string = 'Nome'): ValidationResult {
  if (!name || typeof name !== 'string') {
    return { valid: false, error: `${fieldName} é obrigatório` };
  }
  
  const trimmed = name.trim();
  if (trimmed.length < 2 || trimmed.length > 100) {
    return { valid: false, error: `${fieldName} deve ter entre 2 e 100 caracteres` };
  }
  
  return { valid: true };
}

// Validate credit card number (13-19 digits, basic Luhn check)
export function validateCardNumber(number: string): ValidationResult {
  const cleanNumber = number?.replace(/\D/g, '');
  if (!cleanNumber || cleanNumber.length < 13 || cleanNumber.length > 19) {
    return { valid: false, error: 'Número do cartão inválido' };
  }
  
  // Luhn algorithm
  let sum = 0;
  let isEven = false;
  
  for (let i = cleanNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cleanNumber[i], 10);
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  if (sum % 10 !== 0) {
    return { valid: false, error: 'Número do cartão inválido' };
  }
  
  return { valid: true };
}

// Validate CVV (3-4 digits)
export function validateCVV(cvv: string): ValidationResult {
  const cleanCVV = cvv?.replace(/\D/g, '');
  if (!cleanCVV || cleanCVV.length < 3 || cleanCVV.length > 4) {
    return { valid: false, error: 'CVV deve ter 3 ou 4 dígitos' };
  }
  
  return { valid: true };
}

// Validate card expiration month (01-12)
export function validateExpirationMonth(month: string): ValidationResult {
  const monthNum = parseInt(month, 10);
  if (isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
    return { valid: false, error: 'Mês de validade inválido' };
  }
  
  return { valid: true };
}

// Validate card expiration year (2 digits, not expired)
export function validateExpirationYear(year: string, month: string): ValidationResult {
  const yearNum = parseInt(year, 10);
  const monthNum = parseInt(month, 10);
  
  if (isNaN(yearNum) || yearNum < 0 || yearNum > 99) {
    return { valid: false, error: 'Ano de validade inválido' };
  }
  
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() % 100;
  const currentMonth = currentDate.getMonth() + 1;
  
  if (yearNum < currentYear || (yearNum === currentYear && monthNum < currentMonth)) {
    return { valid: false, error: 'Cartão expirado' };
  }
  
  return { valid: true };
}

// Validate order ID (should be a positive integer)
export function validateOrderId(orderId: any): ValidationResult {
  const id = typeof orderId === 'string' ? parseInt(orderId, 10) : orderId;
  if (!id || isNaN(id) || id <= 0) {
    return { valid: false, error: 'ID do pedido inválido' };
  }
  
  return { valid: true };
}

// Validate customer ID (should be a positive integer)
export function validateCustomerId(customerId: any): ValidationResult {
  const id = typeof customerId === 'string' ? parseInt(customerId, 10) : customerId;
  if (!id || isNaN(id) || id <= 0) {
    return { valid: false, error: 'ID do cliente inválido' };
  }
  
  return { valid: true };
}

// Validate installments (1-6)
export function validateInstallments(installments: any): ValidationResult {
  const num = typeof installments === 'string' ? parseInt(installments, 10) : installments;
  if (!num || isNaN(num) || num < 1 || num > 6) {
    return { valid: false, error: 'Número de parcelas deve ser entre 1 e 6' };
  }
  
  return { valid: true };
}

// Combine multiple validations
export function validateAll(validations: ValidationResult[]): ValidationResult {
  for (const validation of validations) {
    if (!validation.valid) {
      return validation;
    }
  }
  return { valid: true };
}
