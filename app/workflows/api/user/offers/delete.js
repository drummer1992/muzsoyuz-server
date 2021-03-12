import { notFoundAssert } from '../../../../errors'
import assert from 'assert'

const deleteOffer = async (userId, offerId) => {
  assert(userId, 'userId is required')
  assert(offerId, 'offerId is required')

  const offer = await Offer.findOne({ user: userId, _id: offerId })

  notFoundAssert(offer, 'Offer not found')

  return offer.remove()
}

export default deleteOffer