import mongoose, { Schema } from 'mongoose'
import BaseModel from './base'

const schema = new Schema({
  entityId: {
    type    : Schema.Types.String,
    required: true,
  },
  like    : {
    type   : Schema.Types.Number,
    default: 0,
  },
  dislike : {
    type   : Schema.Types.Number,
    default: 0,
  },
}, { timestamps: true, versionKey: false })

schema.loadClass(BaseModel)

global.Reaction = mongoose.model('Reaction', schema)
