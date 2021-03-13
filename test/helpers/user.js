import faker from 'faker'
import { oneOfEnum } from './utils/random'
import { Gender, Role } from '../../app/constants/user'
import signIn from '../../app/workflows/api/auth/sign-in'

export const createUser = () => new User({
  yearCommercialExp: faker.random.number(),
  countOfJobs      : faker.random.number(),
  imageURL         : faker.image.imageUrl(),
  dob              : faker.date.past(),
  phone            : faker.phone.phoneNumber(),
  name             : faker.name.findName(),
  role             : oneOfEnum(Role),
  gender           : oneOfEnum(Gender),
  email            : faker.internet.email(),
}).save()

export const getToken = user => signIn(user._id)