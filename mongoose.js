const mongoose = require('mongoose')
const { logger } = require('./logger')
const { dbUrl } = require('./config')

// Models

const Speaker = require('./models/Speaker')
const TalkCoodinator = require('./models/TalkCoordinator')
const Congregation = require('./models/Congregation')

module.exports = (config) => {
  const options = {
    socketTimeoutMS: 30000,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    promiseLibrary: global.Promise
  }

  const connectToDB = () => {
    mongoose.connect(dbUrl, options)
  }
  // CONNECTION EVENTS
  // When successfully connected
  mongoose.connection.on('connected', () => {
    logger.debug('Mongoose default connection open')
  })

  // If the connection throws an error
  mongoose.connection.on('error', (err) => {
    logger.debug('Mongoose default connection error: ' + err)
  })

  // When the connection is disconnected
  mongoose.connection.on('disconnected', (event) => {
    logger.debug('Mongoose connection was disconnected' + event)
    logger.debug('Reconnecting...')
    connectToDB()
  })

  connectToDB()
}
