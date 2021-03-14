import Validator, { and } from '../../../../errors/validation'

const { required, date, object } = Validator

export const CreateDayOffSchema = { date: and([required, date.future]) }
export const DeleteDayOffSchema = { dayOffId: and([required, object]) }