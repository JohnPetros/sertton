import { SafeParseReturnType } from 'zod'

import { IValidation } from '../interfaces/IValidation'

import { cnpjSchema } from './schemas/cnpjSchema'
import { zipcodeSchema } from './schemas/zipcodeSchema'
import { cpfSchema } from './schemas/cpfSchema'
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

    validateZipcode(zipcode: string) {
      const cepValidation = zipcodeSchema.safeParse(zipcode)

      return returnValidation(cepValidation)
    },

    validateCpf(cpf: string) {
      const cpfValidation = cpfSchema.safeParse(cpf)

      return returnValidation(cpfValidation)
    },

    validateCnpj(cnpj: string) {
      const cnpjValidation = cnpjSchema.safeParse(cnpj)

      return returnValidation(cnpjValidation)
    },
  }
}
