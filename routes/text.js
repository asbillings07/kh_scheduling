const express = require('express')
require('dotenv').config()
const router = express.Router()
const { sendTextMessage } = require('../controllers/textController')

router.get('/sendTxtMessage', sendTextMessage)

module.exports = router
