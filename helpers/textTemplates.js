const { fromPhone } = require('../config')

module.exports = {
  textConfirm: (textMessage, name, phoneNumber) => ({
    body: `
      Hi Bro. ${name}!

      ${textMessage}

      Thanks,

      Aaron Billings
    `,
    from: fromPhone,
    to: phoneNumber
  })
}
