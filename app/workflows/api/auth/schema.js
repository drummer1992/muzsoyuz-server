import { string, and } from 'schema-validator'

export const AuthSchema = {
  email   : and([string.minLength(10), string.maxLength(250)]),
  password: and([string.minLength(6)]),
}