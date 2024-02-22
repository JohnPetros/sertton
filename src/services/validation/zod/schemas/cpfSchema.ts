import { z } from 'zod'

import { VALIDATION_ERRORS } from '@/services/validation/constants/validation-errors'
import { REGEX } from '@/utils/constants/regex'

export const cpfSchema = z
  .string({
    required_error: VALIDATION_ERRORS.required,
  })
  .length(11, VALIDATION_ERRORS.cpf.length)
  .regex(REGEX.number, VALIDATION_ERRORS.number)
