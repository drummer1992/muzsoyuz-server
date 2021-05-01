import { and, or, boolean, string, number, date, array, oneOf, optional, object } from 'schema-validator'
import { JobType, Role } from '../../../../constants/user'

const ROLES = Object.values(Role)
const JOB_TYPES = Object.values(JobType)
const SETS = [1, 2, 3, 4, 5]

const AVAILABLE_PROPS = [
  'isActive',
  'extraInfo',
  'salary',
  'date',
  'address',
  'phone',
  'jobType',
  'role',
  'sets',
  'title',
  'created',
]

const AVAILABLE_SORT_VALUES = ['ASC', 'DESC'].map(direction => (
  AVAILABLE_PROPS.map(attr => `${attr} ${direction}`)
)).flat(Infinity)

const DefaultOfferSchema = {
  isActive : optional(boolean),
  extraInfo: optional(string),
  salary   : optional(number),
  date     : optional(date.future),
  address  : optional(string.maxLength(250)),
  phone    : optional(string.maxLength(30)),
  jobType  : optional(oneOf(JOB_TYPES)),
  role     : optional(oneOf(ROLES)),
  sets     : optional(oneOf(SETS)),
  title    : optional(and([string, string.maxLength(100)])),
}

export const CreateOfferSchema = {
  ...DefaultOfferSchema,
  salary : number,
  sets   : oneOf(SETS),
  jobType: oneOf(JOB_TYPES),
  role   : oneOf(ROLES),
  title  : and([string, string.maxLength(100)]),
}

export const UpdateOfferSchema = {
  ...DefaultOfferSchema,
}

const valueOrArrayOfValues = (values, message) => or([oneOf(values), array.of(oneOf(values))], message)

export const FindOffersSchema = {
  where  : optional(object.schema({
    role    : optional(valueOrArrayOfValues(ROLES, 'role should be valid role or array of roles')),
    jobType : optional(valueOrArrayOfValues(JOB_TYPES, 'jobType should be valid jobType or array of jobTypes')),
    sets    : optional(and([number, oneOf(SETS)])),
    salary  : optional(object.softRange),
    date    : optional(object.softRange),
    isActive: optional(boolean),
  })),
  limit  : optional(number),
  offset : optional(number),
  props  : optional(array.of(oneOf(AVAILABLE_PROPS))),
  orderBy: optional(oneOf(AVAILABLE_SORT_VALUES)),
}