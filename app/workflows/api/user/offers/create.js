import assert from 'assert'

const createOffer = (userId, payload) => {
  assert(userId, 'userId is required')
  assert(payload, 'payload is required')

  const offer = new Offer({
    user: userId,
    ...payload,
  })

  return offer.save()
}

export default createOffer
