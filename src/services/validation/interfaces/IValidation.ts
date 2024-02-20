type ValidationResult = {
  isValid: boolean
  errors: string[]
}

export interface IValidation {
  validateEmail(email: string): ValidationResult
}
