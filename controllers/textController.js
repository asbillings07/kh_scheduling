const { accountSid, authToken, phone_number } = require('../config')
const client = require('twilio')(accountSid, authToken)
const { asyncHandler } = require('../errorHandler')

const sendTextMessage = asyncHandler(async (req, res, next) => {
  client.messages
    .create({
      body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
      from: '+14703308891',
      to: phone_number
    })
    .then((message) => res.json(message))
})

module.exports = {
  sendTextMessage
}
