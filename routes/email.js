const express = require('express')
require('dotenv').config()
const router = express.Router()
const { confirmSpeaker } = require('../controllers/emailController')

router.post('/sendEmail', confirmSpeaker)

module.exports = router
