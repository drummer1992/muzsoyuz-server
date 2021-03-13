import Validator from '../../../../errors/validation'
import { Gender, Role } from '../../../../constants/user'

const { date, forbidden, number, oneOf, string } = Validator

export const UpdateUserSchema = {
  yearCommercialExp: number,
  countOfJobs      : number,
  imageURL         : string,
  dob              : date.past,
  phone            : string.maxLength(30),
  name             : string.maxLength(80),
  role             : oneOf(Object.values(Role)),
  gender           : oneOf(Object.values(Gender)),
  facebookId       : forbidden,
  googleId         : forbidden,
  email            : forbidden,
  hash             : forbidden,
  salt             : forbidden,
}