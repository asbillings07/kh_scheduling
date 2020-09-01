const express = require('express')
const { port } = require('./config')
const app = express()
const textMessage = require('./routes/text')

app.use('/api', textMessage)
app.get('/', (req, res, next) => {
  res.json({
    message: 'Welcome to the kh-scheduling server!'
  })
})

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
