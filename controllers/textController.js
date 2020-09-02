const { accountSid, authToken, phone_number } = require('../config')
const client = require('twilio')(accountSid, authToken)
const { logger } = require('../logger')
const MessagingResponse = require('twilio').twiml.MessagingResponse
const { textConfirm } = require('../helpers/textTemplates')
const { asyncHandler } = require('../helpers/errorHandler')

const sendTextMessage = asyncHandler(async (req, res, next) => {
  const { textMessage, name, phoneNumber } = req.body
  client.messages
    .create(textConfirm(textMessage, name, phoneNumber))
    .then((message) => res.status(200).json(message))
})

const respondToTextMessage = asyncHandler((req, res) => {
  logger.debug(req.body)
  const { body } = req.body
  const twiml = new MessagingResponse()
  switch (true) {
    case body.includes('thank you'):
      twiml.message('Thanks!')
      break
    default:
      twiml.message('Thanks!')
  }

  res.writeHead(200, { 'Content-Type': 'text/xml' })
  res.end(twiml.toString())
})

module.exports = {
  sendTextMessage,
  respondToTextMessage
}
