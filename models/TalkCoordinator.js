const mongoose = require('mongoose')
const Schema = mongoose.Schema

const talkCoodinatorSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    congregation: String,
    email: String,
    phoneNumber: Number
  },
  {
    timestamps: true
  }
)

const TalkCoodinator = mongoose.model('TalkCoodinator', talkCoodinatorSchema)

module.exports = TalkCoodinator
