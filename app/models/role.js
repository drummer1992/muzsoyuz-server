import mongoose, { Schema } from 'mongoose'
import BaseModel from './base'
import { Role } from '../constants/user'

const schema = new Schema({
  name    : {
    type     : Schema.Types.String,
    maxLength: 10,
    enum     : Object.values(Role),
    required : true,
  },
  imageURL: {
    type    : Schema.Types.String,
    required: true,
  }
}, { versionKey: false })

schema.loadClass(BaseModel)

global.Role = mongoose.model('Role', schema)
