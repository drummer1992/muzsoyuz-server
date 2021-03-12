import { Types } from 'mongoose'

export const isObjectId = value => Types.ObjectId.isValid(value)
