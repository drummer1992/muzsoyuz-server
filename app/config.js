import assert from 'assert'
import dotenv from 'dotenv'

dotenv.config()

const VARIABLES = [
  'PORT',
  'HOSTNAME',
  'PROTOCOL',
  'MODE',
  'MONGO_URL',
  'MONGO_DB_NAME',
  'MONGO_USER',
  'MONGO_PASSWORD',
  'GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_SECRET',
  'GOOGLE_REDIRECT_URI',
  'FACEBOOK_CLIENT_ID',
  'FACEBOOK_CLIENT_SECRET',
  'FACEBOOK_REDIRECT_URI',
  'JWT_EXPIRES_IN',
  'JWT_AUTH_SECRET',
]

for (const variable of VARIABLES) {
  assert(process.env[variable], `Required variable ${variable} had not set`)
}

export const ENV = process.env
