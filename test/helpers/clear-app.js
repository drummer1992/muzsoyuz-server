const TABLES = [
  Reaction,
  Role,
  Offer,
  User,
  DayOff,
]

export const clearApp = async () => {
  for (const Table of TABLES) {
    await Table.deleteMany({})
  }

  console.log('---App Cleaned---')
}