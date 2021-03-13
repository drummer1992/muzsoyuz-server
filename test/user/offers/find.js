import { createOffer } from '../../helpers/offer'
import { MuzsoyuzApi } from '../../helpers/api-call'
import { clearApp } from '../../helpers/clear-app'
import { Role } from '../../../app/constants/user'

describe('workflows/api/user/offers/find', () => {
  let offer

  before(async () => {
    await clearApp()

    offer = await createOffer()
  })

  it('should returns offers without filters', async () => {
    const response = await MuzsoyuzApi.user.findOffers()

    assert(response)
    assert(response.length)

    assert.strictEqual(response.length, 1)

    const fetchedOffer = response.pop()

    assert.strictEqual(fetchedOffer._id, offer._id.toString())
  })

  describe('query', () => {
    let drumOffer
    let guitarOffer

    const future = faker.date.future()

    before(async () => {
      await Offer.deleteMany({})

      drumOffer = await createOffer({ role: Role.DRUMS })
      guitarOffer = await createOffer({
        role: Role.GUITAR,
        date: future,
      })
    })

    it('should return drum offer', async () => {
      const response = await MuzsoyuzApi.user.findOffers({
        where: { role: Role.DRUMS },
        props: ['role'],
      })

      assert.deepStrictEqual(response, [{
        _id : drumOffer._id.toString(),
        role: Role.DRUMS,
      }])
    })

    it('should return guitar offer by date', async () => {
      const response = await MuzsoyuzApi.user.findOffers({
        where: { date: { from: Number(guitarOffer.date) } },
        props: ['role'],
      })

      assert.deepStrictEqual(response, [{
        _id : guitarOffer._id.toString(),
        role: Role.GUITAR,
      }])
    })
  })
})