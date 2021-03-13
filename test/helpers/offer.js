import faker from 'faker'
import { oneOfEnum } from './utils/random'
import { JobType, Role } from '../../app/constants/user'

export const prepareOffer = (override = {}) => ({
  role     : oneOfEnum(Role),
  jobType  : oneOfEnum(JobType),
  sets     : oneOfEnum([1, 2, 3, 4, 5]),
  title    : faker.name.jobTitle(),
  extraInfo: faker.name.jobDescriptor(),
  salary   : faker.random.number(),
  date     : Date.now(),
  address  : faker.address.streetAddress(),
  phone    : faker.phone.phoneNumber(),
  ...override,
})

export const createOffer = (override = {}) => Offer.create(prepareOffer(override))