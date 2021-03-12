import dbChanges from './db-changes'

const runScripts = async () => {
  await dbChanges()
}

export default runScripts