const Speaker = require('../models/Speaker')
const TalkCoordinator = require('../models/TalkCoordinator')
const { asyncHandler } = require('../helpers/errorHandler')

const getTalkCoords = asyncHandler(async (req, res) => {
  try {
    const speakers = await TalkCoordinator.find({}).exec()
    res.status(200).send({ success: true, error: false, speakers })
  } catch (err) {
    res.status(400).send({ success: false, error: true, err })
  }
})

const getTalkCoordById = asyncHandler(async (req, res) => {
  const { id } = req.query
  try {
    const talkCoordWithSpeakers = await TalkCoordinator.findById(id).populate('speakers')
    res.status(200).send({ success: true, error: false, talkCoordWithSpeakers })
  } catch (err) {
    res.status(400).send({ success: false, error: true, err })
  }
})

// const getUserByTalkCoordinator = asyncHandler(async (req, res) => {
//   const { id } = req.currentUser
//   const user = await User.findById(id).populate('talkCoordinator')
//   res.send(user)
// })

const createTalkCoord = asyncHandler(async (req, res) => {
  const { speaker } = req.body
  if (speaker !== {}) {
    const createdSpeaker = await TalkCoordinator.create(speaker)
    res.status(201).json({
      success: true,
      error: false,
      message: 'Speaker created successfully!',
      speaker: createdSpeaker
    })
  } else {
    res.status(400).json({ success: false, error: true, message: 'You can not send an empty body' })
  }
})

const createMultiTalkCoord = asyncHandler(async (req, res) => {
  const { speakers } = req.body
  try {
    if (Array.isArray(speakers)) {
      const createdSpeakers = await TalkCoordinator.insertMany(speakers)
      res.status(201).json({
        success: true,
        message: `${speakers.length} speakers were successfully stored`,
        createdSpeakers
      })
    } else {
      const speaker = await TalkCoordinator.create(newSpeaker)
      res.status(200).json({ speaker })
    }
  } catch (err) {
    res.status(500).json({ success: false, error: true, message: err })
  }
})

const updateTalkCoord = asyncHandler(async (req, res) => {
  const { id, speakerUpdates } = req.body
  try {
    const updatedSpeaker = await TalkCoordinator.updateOne({ _id: id }, speakerUpdates)
    res.status(200).json({
      success: true,
      error: false,
      message: 'speaker updated successfully',
      updatedSpeaker
    })
  } catch (err) {
    res.status(400).json({ success: false, error: true, message: err })
  }
})

const deleteTalkCoord = asyncHandler(async (req, res) => {
  const { id } = req.body
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
