import { z } from 'zod'

import { VALIDATION_ERRORS } from '@/services/validation/constants/validation-errors'
import { REGEX } from '@/utils/constants/regex'

export const cnpjSchema = z
  .string({
    required_error: VALIDATION_ERRORS.required,
  })
  .length(14, VALIDATION_ERRORS.cnpj.length)
  .regex(REGEX.number)
