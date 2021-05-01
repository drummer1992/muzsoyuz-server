import assert from 'assert'
import { Types } from 'mongoose'
import { isObject, omitBy } from './object'

export const isObjectId = value => Types.ObjectId.isValid(value)
export const generateObjectId = () => Types.ObjectId()
export const isEqualObjectIds = (a, b) => a.toString() === b.toString()

export const assertObjectIdIsValid = (value, key) => {
  assert(isObjectId(value), `${key} should be type of ObjectId`)
}

export const isRange = value => {
  return isObject(value) && ['from', 'to'].some(attr => attr in value)
}

export const transformRangeToQuery = range => omitBy({
  $gte: range.from,
  $lte: range.to,
})