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
const authClientId = process.env.AUTH0_CLIENT_ID
const authDomain = process.env.AUTH0_DOMAIN
const authClientSecret = process.env.AUTH0_CLIENT_SECRET
const sessionSecret = process.env.SESSION_SECRET

module.exports = {
  sessionSecret,
  authClientId,
  authDomain,
  authClientSecret,
  refreshToken,
  googleMailClientSecret,
  googleMailClientId,
  accountSid,
  authToken,
  fromPhone,
  fromEmail,
  port,
  dbUrl
}
