import Validator, { and, or } from '../../../../errors/validation'
import { JobType, Role } from '../../../../constants/user'

const { number, oneOf, required, string, date, boolean, array, object } = Validator

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
]

const AVAILABLE_SORT_VALUES = ['ASC', 'DESC'].map(direction => (
  AVAILABLE_PROPS.map(attr => `${attr} ${direction}`)
)).flat(Infinity)

const DefaultOfferSchema = {
  isActive : boolean,
  extraInfo: string,
  salary   : number,
  date     : date.future,
  address  : string.maxLength(250),
  phone    : string.maxLength(30),
  jobType  : oneOf(JOB_TYPES),
  role     : oneOf(ROLES),
  sets     : oneOf(SETS),
  title    : and([string, string.maxLength(100)]),
}

export const CreateOfferSchema = {
  ...DefaultOfferSchema,
  salary : and([required, number]),
  sets   : and([required, oneOf(SETS)]),
  jobType: and([required, oneOf(JOB_TYPES)]),
  role   : and([required, oneOf(ROLES)]),
}

export const UpdateOfferSchema = {
  ...DefaultOfferSchema,
}

export const FindOffersSchema = {
  where  : object.schema({
    role    : or([oneOf(ROLES), array.of(oneOf(ROLES))],
      'role should be valid role or array of roles'),
    jobType : or([oneOf(JOB_TYPES), array.of(oneOf(JOB_TYPES))],
      'jobType should be valid jobType or array of jobTypes'),
    sets    : and([number, oneOf(SETS)]),
    salary  : object.softRange,
    date    : object.softRange,
    isActive: boolean,
  }),
  limit  : number,
  offset : number,
  props  : array.of(oneOf(AVAILABLE_PROPS)),
  orderBy: oneOf(AVAILABLE_SORT_VALUES),
}