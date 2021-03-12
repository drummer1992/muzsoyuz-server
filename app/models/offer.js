import mongoose, { Schema } from 'mongoose'
import BaseModel from './base'
import { JobType, Role } from '../constants/user'

const schema = new Schema({
  address  : {
    type     : Schema.Types.String,
    maxLength: 250,
  },
  salary   : {
    type    : Schema.Types.Number,
    required: true,
    default : 0,
  },
  date     : {
    type    : Schema.Types.Date,
    required: true,
    default : Date.now,
  },
  sets     : {
    type    : Schema.Types.Number,
    enum    : [1, 2, 3, 4, 5],
    required: true,
  },
  user     : {
    type: mongoose.Schema.Types.ObjectId,
    ref : 'User',
  },
  phone    : {
    type     : Schema.Types.String,
    maxLength: 30,
  },
  title    : {
    type     : Schema.Types.String,
    maxLength: 100,
  },
  isActive : {
    type   : Schema.Types.Boolean,
    default: true,
  },
  jobType  : {
    type     : Schema.Types.String,
    maxLength: 30,
    enum     : Object.values(JobType),
    required : true,
    default  : JobType.MUSICAL_REPLACEMENT,
  },
  role     : {
    type    : Schema.Types.String,
    enum    : Object.values(Role),
    required: true,
  },
  extraInfo: Schema.Types.String,
}, { timestamps: true, versionKey: false })

schema.loadClass(BaseModel)

global.Offer = mongoose.model('Offer', schema)
