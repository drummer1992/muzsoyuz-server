export const isObject = value => value === Object(value)

export const predicates = {
  isUndefined: value => typeof value === 'undefined',
  isNil      : value => value == null,
}

export const keyBy = (array, predicate) => {
  const result = {}

  if (typeof predicate === 'string') {
    const path = predicate

    predicate = object => object[path]
  }

  array.forEach(item => result[predicate(item)] = item)

  return result
}

export const pick = (object, props) => props.reduce(
  (obj, attr) => Object.assign(obj, { [attr]: object[attr] }), {},
)

export const omit = (object, props) => Object.keys(object)
  .reduce(
    (result, key) => Object.assign(result, props.includes(key)
      ? {}
      : { [key]: object[key] }),
    {},
  )

export const omitBy = (object, predicate = predicates.isUndefined) => {
  const propsToOmit = Object.keys(object).filter(key => predicate(object[key]))

  return omit(object, propsToOmit)
}

export const isEmpty = value => {
  const array = []

  if (isObject(value) || Array.isArray(value)) {
    array.push(...Object.keys(value))
  }

  return !array.length
}

export const decoratePrototype = (decorator, object) => {
  const methods = Object.getOwnPropertyNames(object.prototype)

  methods.forEach(method => {
    if (method !== 'constructor') {
      object.prototype[method] = decorator(object.prototype[method])
    }
  })
}

export const isRange = value => {
  return isObject(value) && ['from', 'to'].some(attr => attr in value)
}

export const transformRangeToQuery = range => omitBy({
  $gte: range.from,
  $lte: range.to
})