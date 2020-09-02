const express = require('express')
require('dotenv').config()
const router = express.Router()
const { sendTextMessage, respondToTextMessage } = require('../controllers/textController')

router.get('/sendSms', sendTextMessage)
router.post('/replySms', respondToTextMessage)
module.exports = router
