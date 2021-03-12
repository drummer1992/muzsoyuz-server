import assert from 'assert'
import { isNumber } from '../../utils/number'
import { isEmpty, isObject, predicates as p } from '../../utils/object'
import { isString } from '../../utils/string'
import { InvalidArgumentsError } from '../index'
import { isDate, isFutureDate } from '../../utils/date'
import { isObjectId } from '../../db/utils'

export const and = (validators, message) => (value, key) => {
  try {
    validators.forEach(validate => validate(value, key))
  } catch (e) {
    e.message = message || e.message

    throw e
  }
}

export const or = (validators, message) => (value, key) => {
  validators.some((validate, i) => {
    try {
      validate(value, key)

      return true
    } catch (e) {
      const isLast = validators.length - 1 === i

      if (isLast) {
        e.message = message || e.message

        throw e
      }
    }
  })
}

const optional = validate => (value, key) => !p.isUndefined(value) && validate(value, key)

const required = (value, key) => {
  assert(!p.isNil(value), `${key} is required`)
}

const forbidden = (value, key) => {
  assert(p.isUndefined(value), `${key} is forbidden for update`)
}

const objectId = optional((value, key) => {
  assert(isObjectId(value), `${key} should be type of ObjectId`)
})

const boolean = optional((value, key) => {
  assert(typeof value === 'boolean', `${key} should be type of boolean`)
})

const number = optional((value, key) => {
  assert(isNumber(value), `${key} should be type of number`)
})

const string = optional((value, key) => {
  assert(isString(value), `${key} should be type of string`)
})

const object = optional((value, key) => {
  assert(isObject(value), `${key} should be type of object`)
})

const array = optional((value, key) => {
  assert(Array.isArray(value), `${key} should be type of array`)
})

const date = optional((value, key) => {
  assert(isDate(value), `${key} should be type of date`)
})

const futureDate = optional((value, key) => {
  assert(isFutureDate(value), `${key} can not be in past`)
})

const pastDate = optional((value, key) => {
  assert(!isFutureDate(value), `${key} can not be in future`)
})

const notEmpty = optional((value, key) => {
  assert(!isEmpty(value), `${key} should not be empty`)
})

const oneOf = values => optional((value, key) => {
  assert(values.includes(value), `${key} should be one of [${values.join(', ')}]`)
})

const maxLength = n => optional((value, key) => {
  assert(value.length <= n, `${key} should has length less than ${n}`)
})

const minLength = n => optional((value, key) => {
  assert(value.length >= n, `${key} should has length greater than ${n}`)
})

const max = n => optional((value, key) => {
  assert(value <= n, `${key} should be less than ${n}`)
})

const min = n => optional((value, key) => {
  assert(value >= n, `${key} should be greater than ${n}`)
})

object.notEmpty = and([object, notEmpty])
array.notEmpty = and([array, notEmpty])

object.schema = schema => optional((object, objectName) => {
  Object.keys(schema).forEach(schemaKey => {
    const nestedValidator = schema[schemaKey]

    nestedValidator(object[schemaKey], `${objectName}.${schemaKey}`)
  })
})

object.range = and([
  object,
  object.notEmpty,
  object.schema({
    from: and([required, number]),
    to  : and([required, number]),
  }),
])

object.softRange = and([
  object,
  object.notEmpty,
  object.schema({ from: number, to: number }),
  or([
    object.schema({ from: required }),
    object.schema({ to: required }),
  ]),
])

array.of = (validator, message) => and([
  array,
  array.notEmpty,
  optional((array, key) => array.forEach(value => validator(value, key))),
], message)

string.maxLength = n => and([string, maxLength(n)])
string.minLength = n => and([string, minLength(n)])

number.max = n => and([number, max(n)])
number.min = n => and([number, min(n)])

date.future = and([date, futureDate])
date.past = and([date, pastDate])

const Validator = {
  required,
  optional,
  forbidden,
  objectId,
  boolean,
  number,
  string,
  object,
  array,
  date,
  futureDate,
  pastDate,
  notEmpty,
  oneOf,
  maxLength,
  minLength,
  max,
  min,
}

export const validate = (schema, options) => payload => {
  const { required = true } = options

  try {
    const keys = Object.keys(schema)

    if (required || payload) {
      Validator.required(payload, 'payload')

      keys.forEach(key => {
        const validator = schema[key]

        const value = payload[key]

        validator(value, key)
      })

      assert(keys.some(key => key in payload), 'payload is not valid')
    }
  } catch (error) {
    throw new InvalidArgumentsError(error.message)
  }
}

export default Validator