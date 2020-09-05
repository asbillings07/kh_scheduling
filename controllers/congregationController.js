const Congregation = require('../models/Congregation')
const { asyncHandler } = require('../helpers/errorHandler')

const getCongs = asyncHandler(async (req, res) => {
  try {
    const congregations = await Congregation.find({}).exec()
    res.status(200).send({ success: true, error: false, congregations })
  } catch (err) {
    res.status(400).send({ success: false, error: true, err })
  }
})

const getCongById = asyncHandler(async (req, res) => {
  const { id } = req.query
  try {
    const congregation = await Congregation.findById(id).exec()
    res.status(200).send({ success: true, error: false, congregation })
  } catch (err) {
    res.status(400).send({ success: false, error: true, err })
  }
})

const createCong = asyncHandler(async (req, res) => {
  const { cong } = req.body
  if (req.body !== {}) {
    const createdCong = await Congregation.create(cong)
    res.status(201).json({
      success: true,
      error: false,
      message: 'congregation created successfully!',
      congregation: createdCong
    })
  } else {
    res.status(400).json({ success: false, error: true, message: 'You can not send an empty body' })
  }
})

const createMultiCongs = asyncHandler(async (req, res) => {
  const { congs } = req.body
  try {
    if (Array.isArray(congs)) {
      const createdCongs = await Congregation.insertMany(congs)
      res.status(201).json({
        success: true,
        message: `${congs.length} speakers were successfully stored`,
        createdCongs
      })
    } else {
      const createdCong = await Congregation.create(congs)
      res.status(200).json({ success: true, createdCong })
    }
  } catch (err) {
    res.status(500).json({ error: true, message: err })
  }
})

const updateCong = asyncHandler(async (req, res) => {
  const { id, congUpdates } = req.body
  try {
    const updatedCong = await Congregation.updateOne({ _id: id }, congUpdates)
    res.status(200).json({
      success: true,
      message: 'congregation updated successfully',
      updatedCong
    })
  } catch (err) {
    res.status(400).json({ error: true, message: err })
  }
})

const deleteCong = asyncHandler(async (req, res) => {
  const { id } = req.body
  const callback = (err, docs) => {
    if (err) {
      res.status(200).json({ success: false, error: true, message: err })
    } else {
      res
        .status(200)
        .json({ success: true, error: false, message: 'congregation has been deleted', docs })
    }
  }
  Congregation.findByIdAndRemove(id, callback)
})

module.exports = {
  getCongs,
  getCongById,
  createCong,
  deleteCong,
  updateCong,
  createMultiCongs
}
