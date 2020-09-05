const TalkCoordinator = require('../models/TalkCoordinator')
const { createWithAnotherModel } = require('../helpers/mongoHelpers')
const { asyncHandler } = require('../helpers/errorHandler')
const Congregation = require('../models/Congregation')

const getTalkCoords = asyncHandler(async (req, res) => {
  try {
    const talkCoords = await TalkCoordinator.find({}).exec()
    res.status(200).send({ success: true, talkCoordinators: talkCoords })
  } catch (err) {
    res.status(400).send({ error: true, err })
  }
})

const getTalkCoordById = asyncHandler(async (req, res) => {
  const { id } = req.query
  try {
    const talkCoordWithSpeakers = await TalkCoordinator.findById(id).populate('speakers')
    res.status(200).send({ success: true, talkCoordWithSpeakers })
  } catch (err) {
    res.status(400).send({ error: true, err })
  }
})

const createTalkCoord = asyncHandler(async (req, res) => {
  const { congId } = req.body
  const { talkCoord } = req.body

  if (typeof congId == 'string') {
    await createWithAnotherModel(
      Congregation,
      congId,
      TalkCoordinator,
      talkCoord,
      'talkCoordinators',
      res
    )
  } else {
    res.status(400).json({
      error: true,
      message: 'You must pair a talk coordinator to a congregation'
    })
  }
})

const createMultiTalkCoord = asyncHandler(async (req, res) => {
  const { talkCoords } = req.body
  try {
    if (Array.isArray(talkCoords)) {
      const createdTalkCoords = await TalkCoordinator.insertMany(talkCoords)
      res.status(201).json({
        success: true,
        message: `${talkCoords.length} speakers were successfully stored`,
        createdTalkCoords
      })
    } else {
      const talkCoord = await TalkCoordinator.create(talkCoords)
      res.status(200).json({ talkCoord })
    }
  } catch (err) {
    res.status(500).json({ error: true, err })
  }
})

const updateTalkCoord = asyncHandler(async (req, res) => {
  const { id, talkCoordUpdates } = req.body
  try {
    const updatedTalkCoord = await TalkCoordinator.updateOne({ _id: id }, talkCoordUpdates)
    res.status(200).json({
      success: true,
      error: false,
      message: 'speaker updated successfully',
      updatedTalkCoord
    })
  } catch (err) {
    res.status(400).json({ error: true, err })
  }
})

const deleteTalkCoord = asyncHandler(async (req, res) => {
  const { id } = req.query
  const callback = (err, docs) => {
    if (err) {
      res.status(200).json({ success: false, error: true, message: err })
    } else {
      res
        .status(200)
        .json({ success: true, error: false, message: 'speaker has been deleted', docs })
    }
  }
  TalkCoordinator.findByIdAndRemove(id, callback)
})

module.exports = {
  getTalkCoords,
  getTalkCoordById,
  createTalkCoord,
  createMultiTalkCoord,
  updateTalkCoord,
  deleteTalkCoord
}
