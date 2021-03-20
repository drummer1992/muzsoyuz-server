import { isObject, omitBy } from './object'

export const isRange = value => {
  return isObject(value) && ['from', 'to'].some(attr => attr in value)
}

export const transformRangeToQuery = range => omitBy({
  $gte: range.from,
  $lte: range.to,
})