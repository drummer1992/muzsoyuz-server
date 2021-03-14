export const clearApp = async () => {
  const TABLES = [
    Reaction,
    Offer,
    User,
    DayOff,
  ]

  for (const Table of TABLES) {
    await Table.deleteMany({})
  }

  console.log('---App Cleaned---')
}