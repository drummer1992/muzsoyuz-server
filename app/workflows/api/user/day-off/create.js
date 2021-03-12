import assert from 'assert'

const createDayOff = (userId, payload) => {
  assert(userId, 'userId is required')
  assert(payload, 'payload is required')

  return DayOff.create({
    user: userId,
    date: payload.date,
  })
}

export default createDayOff