import mongoose from 'mongoose'
import { ENV as v } from '../config'
import fs from 'fs'

fs.readdirSync('./app/models').map(module => require(`../models/${module}`))

const initDb = async () => {
  await mongoose.connect(v.MONGO_URL, {
    user              : v.MONGO_USER,
    pass              : v.MONGO_PASSWORD,
    dbName            : `${v.MODE === 'DEV' ? 'dev_' : ''}${v.MONGO_DB_NAME}`,
    useNewUrlParser   : true,
    useUnifiedTopology: true,
    useCreateIndex    : true,
  })

  console.log('---Mongo Server connected---')
}

export default initDb
