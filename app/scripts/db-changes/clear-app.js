const TABLES = [
  Reaction,
  Role,
  Offer,
  User,
]

module.exports = async () => {
  for (const Table of TABLES) {
    await Table.deleteMany({})
  }

  console.log('---App Cleaned---')
}