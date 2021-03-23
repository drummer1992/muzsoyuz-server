import mongoose, { Schema } from 'mongoose'
import BaseModel from './base'

const chatMessageSchema = new Schema({
  text: {
    type    : Schema.Types.String,
    required: true,
  },
  user: {
    type    : Schema.Types.ObjectId,
    ref     : 'User',
    required: true,
  },
  chat: {
    type    : Schema.Types.ObjectId,
    ref     : 'Chat',
    required: true,
  },
}, { timestamps: true, versionKey: false })

const chatSchema = new Schema({
  participants: [{
    type    : Schema.Types.ObjectId,
    ref     : 'User',
    required: true,
  }],
  messages    : [{
    type: Schema.Types.ObjectId,
    ref : 'ChatMessage',
  }],
}, { timestamps: true, versionKey: false })

chatSchema.loadClass(BaseModel)
chatMessageSchema.loadClass(BaseModel)

global.Chat = mongoose.model('Chat', chatSchema)
global.ChatMessage = mongoose.model('ChatMessage', chatMessageSchema)
