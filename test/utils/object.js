import { clone } from '../../app/utils/object'

describe('utils/object', () => {
  describe('clone', () => {
    it('should clone object', () => {
      const o1 = {}
      const o2 = clone(o1)

      assert(o1 !== o2)
    })

    it('should make deep object clone', () => {
      const o1 = {
        person: {
          name: 'Andrii',
          cars: [],
          professions: [
            'it',
            'music',
          ],
        },
      }
      const o2 = clone(o1)

      assert(o1 !== o2)
      assert.deepStrictEqual(o2, o1)
    })

    it('should make deep array clone', () => {
      const a1 = [
        {
          person: {
            name: 'Andrii',
            cars: [],
            professions: [
              'it',
              'music',
            ],
          },
        },
        {
          person: {
            name: 'Max',
            cars: ['Sonata'],
            professions: [
              'it',
              'seller',
            ],
          },
        },
      ]
      const a2 = clone(a1)

      assert(a1 !== a2)
      assert(a1[0] !== a2[0])
      assert(a1[0].person !== a2[0].person)
      assert(a1[0].person.cars !== a2[0].person.cars)
      assert(a1[1] !== a2[1])
      assert(a1[1].person !== a2[1].person)
      assert(a1[1].person.cars !== a2[1].person.cars)
      assert.deepStrictEqual(a2, a1)
    })
  })
})