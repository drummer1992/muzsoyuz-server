const SCRIPTS = [
  // require('./clear-app'),
  require('./role'),
]

const dbChanges = async () => {
  console.log('---Started db-changes scripts---')

  for (const script of SCRIPTS) {
    await script()
  }

  console.log('---Finished db-changes scripts---')
}

export default dbChanges