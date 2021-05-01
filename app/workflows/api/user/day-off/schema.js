import { date } from 'schema-validator'
import { assertObjectIdIsValid as objectId } from '../../../../utils/mongoose'

export const CreateDayOffSchema = { date: date.future }
export const DeleteDayOffSchema = { dayOffId: objectId }