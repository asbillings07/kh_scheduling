const mongoose = require('mongoose')
const Schema = mongoose.Schema

const congregationSchema = new Schema(
  {
    name: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    phoneNumber: String,
    speakers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Speaker'
      }
    ],
    talkCoordinators: [
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

const Congregation = mongoose.model('Congregation', congregationSchema)

module.exports = Congregation
