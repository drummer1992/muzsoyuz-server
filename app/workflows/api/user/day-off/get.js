import assert from 'assert'
import { trimTime } from '../../../../utils/date'

const getDaysOff = userId => {
  assert(userId, 'userId is required')

  return DayOff.find({
    user: userId,
    date: { $gte: trimTime(Date.now()) },
  })
}

export default getDaysOff