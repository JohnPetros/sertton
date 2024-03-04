export const VALIDATION_ERRORS = {
  required: 'Campo obrigatório',
  number: 'Deve ser um número',
  email: {
    regex: 'Digite um e-mail válido',
    inUse: 'E-mail já utilizado por outro usuário',
  },
  cpf: {
    length: 'Deve conter 11 dígitos',
    inUse: 'CPF já utilizado por outro usuário',
  },
  cnpj: {
    length: 'Deve conter 14 dígitos',
    inUse: 'CNPJ já utilizado por outro usuário',
  },
  zipcode: {
    length: 'Deve conter 8 números',
  },
}
