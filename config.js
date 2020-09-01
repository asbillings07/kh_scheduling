require('dotenv').config()
const accountSid = process.env.ACCOUNT_SID
const authToken = process.env.AUTH_TOKEN
const phone_number = '+16785235670'
const port = '9000'

module.exports = {
  accountSid,
  authToken,
  phone_number,
  port
}
