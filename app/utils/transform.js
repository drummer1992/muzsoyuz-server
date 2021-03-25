export default function transform(object, schema) {
  return Object.keys(schema).reduce(
    (result, currentKey) => Object.assign(object, {
      ...result,
      [currentKey]: schema[currentKey](object[currentKey]),
    }),
    object,
  )
}

export const number = value => parseInt(value)