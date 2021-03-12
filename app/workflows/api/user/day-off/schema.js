import Validator, { and } from '../../../../errors/validation'

const { required, date } = Validator

export const CreateDayOffSchema = {
  date: and([required, date.future])
}