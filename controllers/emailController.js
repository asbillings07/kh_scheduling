const { findUserByEmail, findUserById } = require('./userFunctions')
const { sendEmail } = require('../helpers/emailSetUp')
const { emailConfirm } = require('../helpers/emailTemplates')
const { confirm } = require('../helpers/emailMessages')
const asyncHandler = require('./asyncErrorHanlder')

const confirmSpeaker = asyncHandler(async (req, res, next) => {
  // console.log(req.signedCookies)
  const { email, name, message, title } = req.body

  sendEmail(emailConfirm(email, name, message, title), confirm)
  // if (user && !user.confirmed) {
  //   sendEmail(template.confirm(user.email), messages.confirm)
  //   setTimeout(() => {
  //     res.status(200).json('Conformation Email in your inbox')
  //   }, 2000)
  // } else {
  //   res.status(200).json({ message: messages.alreadyConfirmed })
  // }
})

const confirmEmail = asyncHandler(async (req, res) => {
  console.log(req)
  const { id } = req.user

  const user = await findUserById(id)
  if (!user.confirmed) {
    user
      .update({
        confirmed: true
      })
      .then(() => res.json({ message: messages.confirmed }))
      .catch((err) => console.log(err))
  } else {
    res.json({ message: messages.alreadyConfirmed })
  }
})

module.exports = {
  confirmSpeaker
}
