import mongoose, { Schema } from 'mongoose'
import BaseModel from './base'

const schema = new Schema({
  user  : {
    type: Schema.Types.ObjectId,
    ref : 'User',
  },
  date  : {
    type    : Schema.Types.Date,
    required: true,
  }
}, { versionKey: false })

schema.loadClass(BaseModel)

global.DayOff = mongoose.model('DayOff', schema)
