const Speaker = require('../models/Speaker')
const TalkCoordinator = require('../models/TalkCoordinator')
const { asyncHandler } = require('../helpers/errorHandler')

const getSpeakers = asyncHandler(async (req, res) => {
  try {
    const speakers = await Speaker.find({}).exec()
    res.status(200).send({ success: true, error: false, speakers })
  } catch (err) {
    res.status(400).send({ success: false, error: true, err })
  }
})

const getSpeakerById = asyncHandler(async (req, res) => {
  const { id } = req.query
  try {
    const speaker = await Speaker.findById(id).exec()
    res.status(200).send({ success: true, error: false, speaker })
  } catch (err) {
    res.status(400).send({ success: false, error: true, err })
  }
})

const createSpeakerWithTalkCoord = (talkCoordId, speaker) => {
  return Speaker.create(speaker).then((docSpeaker) => {
    console.log('\n>> Created Speaker:\n', docSpeaker)

    return TalkCoordinator.findByIdAndUpdate(
      talkCoordId,
      { $push: { speakers: docSpeaker._id } },
      { new: true, useFindAndModify: false }
    )
  })
}

const createSpeaker = asyncHandler(async (req, res) => {
  const { talkCoordId } = req.body
  const { speaker } = req.body
  if (req.body !== {}) {
    if (talkCoordId) {
      const info = createSpeakerWithTalkCoord(talkCoordId, speaker)
      res.status(201).json({
        success: true,
        error: false,
        message: 'Speaker created successfully!',
        speaker: createdSpeaker
      })
    } else {
      const createdSpeaker = await Speaker.create(speaker)
      res.status(201).json({
        success: true,
        error: false,
        message: 'Speaker created successfully!',
        speaker: createdSpeaker
      })
    }
  } else {
    res.status(400).json({ success: false, error: true, message: 'You can not send an empty body' })
  }
})

const createMultiSpeakers = asyncHandler(async (req, res) => {
  const { speakers } = req.body
  try {
    if (Array.isArray(speakers)) {
      const createdSpeakers = await Speaker.insertMany(speakers)
      res.status(201).json({
        success: true,
        message: `${speakers.length} speakers were successfully stored`,
        createdSpeakers
      })
    } else {
      const speaker = await Speaker.create(newSpeaker)
      res.status(200).json({ speaker })
    }
  } catch (err) {
    res.status(500).json({ success: false, error: true, message: err })
  }
})

const updateSpeaker = asyncHandler(async (req, res) => {
  const { id, speakerUpdates } = req.body
  try {
    const updatedSpeaker = await Speaker.updateOne({ _id: id }, speakerUpdates)
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

const deleteSpeaker = asyncHandler(async (req, res) => {
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
  Speaker.findByIdAndRemove(id, callback)
})

module.exports = {
  getSpeakers,
  getSpeakerById,
  createSpeaker,
  deleteSpeaker,
  updateSpeaker,
  createMultiSpeakers
}
