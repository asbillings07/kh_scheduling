const mongoose = require('mongoose')
const Schema = mongoose.Schema

const speakerSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    congregation: String,
    email: String,
    phoneNumber: Number,
    dateOfTalk: { type: Date, index: true },
    TalkCoodinator: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TalkCoodinator'
      }
    ]
  },
  {
    timestamps: true
  }
)

const Speaker = mongoose.model('Speaker', speakerSchema)

module.exports = Speaker
