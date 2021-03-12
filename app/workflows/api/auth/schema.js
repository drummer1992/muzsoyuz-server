import Validator, { and } from '../../../errors/validation'

const { required, string } = Validator

export const AuthSchema = {
  email   : and([required, string.minLength(10), string.maxLength(250)]),
  password: and([required, string.minLength(6)]),
}