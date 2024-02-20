import { IValidation } from "./interfaces/IValidation"

let validation: IValidation

export function injectValidationProvider(
  ValidationProvider: () => IValidation
) {
  validation = ValidationProvider()
}

export function useValidation() {
  return validation
}
