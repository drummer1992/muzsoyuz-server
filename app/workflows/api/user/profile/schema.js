import { Gender, Role } from '../../../../constants/user'
import { number, string, date, oneOf, forbidden, optional } from 'schema-validator'
import * as t from '../../../../utils/transform'

export const UpdateUserSchema = {
  yearCommercialExp: optional(number),
  countOfJobs      : optional(number),
  imageURL         : optional(string),
  dob              : optional(date.past),
  phone            : optional(string.maxLength(30)),
  name             : optional(string.maxLength(80)),
  role             : optional(oneOf(Object.values(Role))),
  gender           : optional(oneOf(Object.values(Gender))),
  facebookId       : forbidden,
  googleId         : forbidden,
  email            : forbidden,
  hash             : forbidden,
  salt             : forbidden,
}

export const UploadImageSchema = {
  type  : optional(oneOf(['jpeg', 'png'])),
  width : optional(number),
  height: optional(number),
  x     : optional(number),
  y     : optional(number),
}

export const UploadImageTransformationSchema = {
  width : t.number,
  height: t.number,
  x     : t.number,
  y     : t.number,
}