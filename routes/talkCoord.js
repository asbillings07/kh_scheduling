const express = require('express')
require('dotenv').config()
const router = express.Router()
const {
  getTalkCoordById,
  getTalkCoords,
  createMultiTalkCoord,
  createTalkCoord,
  updateTalkCoord,
  deleteTalkCoord
} = require('../controllers/talkCoordController')

router.get('/getTalkCoords', getTalkCoords)
router.get('/getTalkCoord', getTalkCoordById)
router.post('/createTalkCoord', createTalkCoord)
router.post('/massCreateTalkCoords', createMultiTalkCoord)
router.put('/updateTalkCoord', updateTalkCoord)
router.post('/deleteTalkCoord', deleteTalkCoord)

module.exports = router
