const express = require('express')
require('dotenv').config()
const router = express.Router()
const {
  getCongs,
  getCongById,
  updateCong,
  createCong,
  createMultiCongs,
  deleteCong
} = require('../controllers/congregationController')

router.get('/getcongs', getCongs)
router.get('/getCong', getCongById)
router.post('/createCong', createCong)
router.post('/massCreateCongs', createMultiCongs)
router.put('/updateCong', updateCong)
router.post('/deleteCong', deleteCong)

module.exports = router
