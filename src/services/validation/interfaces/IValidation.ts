type ValidationResult = {
  isValid: boolean
  errors: string[]
}

export interface IValidation {
  validateEmail(email: string): ValidationResult
  validateCpf(cpf: string): ValidationResult
  validateCnpj(cnpj: string): ValidationResult
}
