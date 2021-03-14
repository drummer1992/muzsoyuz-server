const invokeScript = async path => {
  const module = await import(path)

  return module.default()
}

const dbChanges = async () => {
  console.log('---Started db-changes scripts---')

  await invokeScript('./role')

  console.log('---Finished db-changes scripts---')
}

export default dbChanges