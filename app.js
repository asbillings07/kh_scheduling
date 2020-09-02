const express = require('express')
const { port } = require('./config')
const bodyParser = require('body-parser')
const config = require('./config')
const { logger } = require('./logger')
const cors = require('cors')
const textMessage = require('./routes/text')

require('./mongoose')(config)

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/api', textMessage)
app.get('/', (req, res, next) => {
  res.json({
    message: 'Welcome to the kh-scheduling server!'
  })
})

/// whitelisting for Cors
const whitelist = ['http://localhost:3000', 'http://localhost:9000', 'http://localhost:3001']
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

logger.debug("Overriding 'Express' logger")
app.use(require('morgan')('combined', { stream: logger.stream }))

app.use(cors({ credentials: true, origin: corsOptions }))

// global error handler
app.use('*', (req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use((err, req, res, next) => {
  res.locals.error = err
  if (err.status >= 100 && err.status < 600) {
    res.status(err.status).json({ err })
    console.log(err.status)
    console.log(err.message)
    console.log(err.stack)
  } else {
    res.status(500).json({ message: 'an internal server error occured' })
    console.log(500)
    console.log(err.message)
    console.log(err.stack)
  }
})

// creates server
app.listen(port, () => {
  console.log(`Server is running on ${port}`)
})
