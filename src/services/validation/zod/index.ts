import { SafeParseReturnType } from 'zod'

import { IValidation } from '../interfaces/IValidation'

import { emailSchema } from './schemas/emailSchema'


function returnValidation(validation: SafeParseReturnType<string, string>) {
  return {
    isValid: validation.success,
    errors: !validation.success ? validation?.error.format()._errors : [],
  }
}

export const ZodValidationProvider = (): IValidation => {
  return {
    validateEmail(email: string) {
      const emailValidation = emailSchema.safeParse(email)

      return returnValidation(emailValidation)
    },
  }
}
