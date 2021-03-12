import assert from 'assert'

const getDaysOff = userId => {
  assert(userId, 'userId is required')

  return DayOff.find({ user: userId })
}

export default getDaysOff