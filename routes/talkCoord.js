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

router.get('/getTalkcoords', getTalkCoords)
router.get('/getTalkcoord', getTalkCoordById)
router.post('/createTalkcoord', createTalkCoord)
router.post('/massCreateTalkcoords', createMultiTalkCoord)
router.put('/updateTalkcoord', updateTalkCoord)
router.post('/deleteTalkcoord', deleteTalkCoord)

module.exports = router
