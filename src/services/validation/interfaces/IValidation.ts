type ValidationResult = {
  isValid: boolean
  errors: string[]
}

export interface IValidation {
  validateEmail(email: string): ValidationResult
  validateZipcode(zipcode: string): ValidationResult
  validateCpf(cpf: string): ValidationResult
  validateCnpj(cnpj: string): ValidationResult
}
