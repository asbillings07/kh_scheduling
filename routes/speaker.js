const express = require('express')
require('dotenv').config()
const router = express.Router()
const {
  getSpeakers,
  getSpeakerById,
  createSpeaker,
  deleteSpeaker,
  createMultiSpeakers,
  updateSpeaker
} = require('../controllers/speakerController')

router.get('/getSpeakers', getSpeakers)
router.get('/getSpeaker', getSpeakerById)
router.post('/createSpeaker', createSpeaker)
router.post('/massCreateSpeakers', createMultiSpeakers)
router.put('/updateSpeaker', updateSpeaker)
router.post('/deleteSpeaker', deleteSpeaker)

module.exports = router
