import { ValidationPipe } from '../../../errors/validation/decorator'

export function BodyValidationPipe(schema, options = {}) {
  return ValidationPipe(schema, {
    ...options,
    context: 'body',
  })
}

export function PathParamsValidationPipe(schema, options = {}) {
  return ValidationPipe(schema, {
    ...options,
    context: 'pathParams',
  })
}

export function QueryParamsValidationPipe(schema, options = {}) {
  return ValidationPipe(schema, {
    ...options,
    context: 'queryParams',
  })
}