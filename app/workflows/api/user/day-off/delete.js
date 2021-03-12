import assert from 'assert'
import { notFoundAssert } from '../../../../errors'

const deleteDayOff = async (userId, dayOffId) => {
  assert(userId, 'userId is required')
  assert(dayOffId, 'dayOffId is required')

  const dayOff = await DayOff.findOne({ user: userId, _id: dayOffId })

  notFoundAssert(dayOff, `DayOff not found`)

  return dayOff.remove()
}

export default deleteDayOff