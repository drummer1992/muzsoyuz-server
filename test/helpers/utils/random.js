export const oneOfEnum = _enum => {
  const values = Object.values(_enum)

  return values[Math.round(Math.random() * (values.length - 1))]
}