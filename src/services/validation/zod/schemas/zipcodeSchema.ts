import { z } from 'zod'

import { VALIDATION_ERRORS } from '@/services/validation/constants/validation-errors'

import { REGEX } from '@/utils/constants/regex'

export const zipcodeSchema = z
  .string({
    required_error: VALIDATION_ERRORS.required,
  })
  .length(8, VALIDATION_ERRORS.zipcode.length)
  .regex(REGEX.number, VALIDATION_ERRORS.number)
