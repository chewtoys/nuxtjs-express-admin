import { Schema, model } from 'mongoose'

const schema: Schema = new Schema({
  id: {
    type: Number,
    default: 0,
    index: { unique: true }
  },
  type: {
    type: String
  },
  token: {
    type: String
  },
  create_at: {
    type: Date,
    default: Date.now
  }, 
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
})

export default model('verify', schema)