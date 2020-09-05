const { fromPhone } = require('../config')

module.exports = {
  textConfirm: (textMessage, name, phoneNumber) => ({
    body: `
      Hi Bro ${name},

    ${textMessage.trim()}

    Thanks,

    Aaron Billings
    `,
    from: fromPhone,
    to: phoneNumber
  })
}
