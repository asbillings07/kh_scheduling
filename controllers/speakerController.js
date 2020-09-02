const Speaker = require('../models/Speaker')
const { asyncHandler } = require('../helpers/errorHandler')

const getSpeakers = asyncHandler(async (req, res) => {
  const speakers = await Speaker.find({}).exec()
  res.status(200).send({ speakers })
})

const getSpeakerById = asyncHandler(async (req, res) => {
  const { id } = req.currentUser
  const user = await Speaker.findOne({ _id: id }).exec()
  res.status(200).send({ user })
})

// const getUserByTalkCoordinator = asyncHandler(async (req, res) => {
//   const { id } = req.currentUser
//   const user = await User.findById(id).populate('talkCoordinator')
//   res.send(user)
// })

const createSpeaker = asyncHandler(async (req, res) => {
  const newSpeaker = req.body
  const speaker = await Speaker.create(newSpeaker)
  res.status(200).json({ speaker })
})

const updateSpeaker = asyncHandler(async (req, res) => {
  const speakerUpdates = res.body
  const speaker = new Speaker(speakerUpdates)
  const savedSpeaker = await speaker.save()
  res.status(200).json({ savedSpeaker })
})

const deleteSpeaker = asyncHandler(async (req, res) => {
  const { id } = req.body
  await Speaker.remove({ _id: id })
  res.status(200).json({ message: 'speaker has been deleted' })
})

module.exports = {
  getSpeakers,
  getSpeakerById,
  createSpeaker,
  deleteSpeaker,
  updateSpeaker
}
