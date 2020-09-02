require('dotenv').config()
const accountSid = process.env.ACCOUNT_SID
const authToken = process.env.AUTH_TOKEN
const fromPhone = '+14703308891'
const fromEmail = 'asbillings2007@gmail.com'
const port = '9000'
const dbUrl = process.env.MONGO_URL
const googleMailClientId = process.env.GOOGLE_MAIL_CLIENT_ID
const googleMailClientSecret = process.env.GOOGLE_MAIL_CLIENT_SECRET
const refreshToken = process.env.REFRESH_TOKEN

module.exports = {
  refreshToken
  googleMailClientSecret,
  googleMailClientId,
  accountSid,
  authToken,
  fromPhone,
  fromEmail,
  port,
  dbUrl
}
