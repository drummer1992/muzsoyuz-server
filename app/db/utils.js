import { Types } from 'mongoose'

export const isObjectId = value => Types.ObjectId.isValid(value)
export const generateObjectId = () => Types.ObjectId()
export const isEqualObjectIds = (a, b) => a.toString() === b.toString()