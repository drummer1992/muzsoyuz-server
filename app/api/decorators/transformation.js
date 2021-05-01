import { TransformationPipe } from '../../utils/decorators/transformation-pipe'

export function BodyTransformationPipe(schema, options = {}) {
  return TransformationPipe(schema, {
    ...options,
    context: 'body',
  })
}

export function PathParamsTransformationPipe(schema, options = {}) {
  return TransformationPipe(schema, {
    ...options,
    context: 'pathParams',
  })
}

export function QueryParamsTransformationPipe(schema, options = {}) {
  return TransformationPipe(schema, {
    ...options,
    context: 'queryParams',
  })
}