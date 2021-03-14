import { Role as r } from '../../app/constants/user'
import { keyBy } from '../../app/utils/object'

const data = [
  {
    name    : r.DRUMS,
    imageURL: 'https://muzsoyuz.com/assets/icon/drums.svg',
  },
  {
    name    : r.PANDORA,
    imageURL: 'https://muzsoyuz.com/assets/icon/pandora.svg',
  },
  {
    name    : r.GUITAR,
    imageURL: 'https://muzsoyuz.com/assets/icon/guitar.svg',
  },
  {
    name    : r.BAS,
    imageURL: 'https://muzsoyuz.com/assets/icon/bas.svg',
  },
  {
    name    : r.VOICE,
    imageURL: 'https://muzsoyuz.com/assets/icon/voice.svg',
  },
  {
    name    : r.SAX,
    imageURL: 'https://muzsoyuz.com/assets/icon/sax.svg',
  },
  {
    name    : r.TRUMPET,
    imageURL: 'https://muzsoyuz.com/assets/icon/trumpet.svg',
  },
  {
    name    : r.VIOLIN,
    imageURL: 'https://muzsoyuz.com/assets/icon/violin.svg',
  }, {
    name    : r.PIANO,
    imageURL: 'https://muzsoyuz.com/assets/icon/piano.svg',
  },
]

const roleScript = async () => {
  const roleByName = await Role.find().then(roles => keyBy(roles, 'name'))

  const dataToCreate = []

  data.forEach(dto => {
    if (!roleByName[dto.name]) {
      dataToCreate.push(dto)
    }
  })

  if (dataToCreate.length) {
    await Role.insertMany(dataToCreate)

    console.log('Inserted:', JSON.stringify(dataToCreate, null, 2))
  }
}

export default roleScript