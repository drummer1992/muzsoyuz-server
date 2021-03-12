import assert from 'assert'
import { notFoundAssert } from '../../../../errors'

const updateOffer = async (userId, offerId, changes) => {
  assert(userId, 'userId is required')
  assert(offerId, 'offerId is required')
  assert(changes, 'changes are required')

  const offer = await Offer.findOne({ user: userId, _id: offerId })

  notFoundAssert(offer, 'Offer not found')

  Object.assign(offer, changes)

  return offer.save()
}

export default updateOffer
