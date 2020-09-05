const { fromEmail } = require('../config')

module.exports = {
  emailConfirm: (email, name, message, title) => ({
    from: fromEmail,
    to: email,
    subject: title,
    html: `
        <p>
        Hello Bro ${name}, 
        </p>
        <p>
          ${message}
        </p>
        <p>
        Thanks,
        </p>
        <p>Aaron Billings</p>
      `
  })
}
