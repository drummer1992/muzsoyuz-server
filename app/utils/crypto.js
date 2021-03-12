import crypto from 'crypto'
import { promisify } from 'util'

const pbkdf2 = promisify(crypto.pbkdf2)

const SIZE = 16
const ITERATIONS = 1000
const KEY_LEN = 64
const DIGEST = 'sha512'
const ENCODING = 'hex'

/**
 * @param {Buffer} buffer
 * @returns {string}
 */
const toString = buffer => buffer.toString(ENCODING)

export const generateSalt = () => toString(crypto.randomBytes(SIZE))
export const generateHash = (str, salt) => pbkdf2(str, salt, ITERATIONS, KEY_LEN, DIGEST).then(toString)
