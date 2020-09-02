const Speaker = require('../models/Speaker')
const TalkCoodinator = require('../models/TalkCoodinator')
const { asyncHanlder } = require('../helpers/errorHandler')

const createTalkCoordinator = asyncHanlder(async (req, res) => {
  const { id } = req.currentUser
  const newCourse = req.body
  const course = await Course.create(newCourse)
  await course.save()

  const user = await User.findById(id)
  user.courses.push(course)
  await user.save()

  res.status(200).send({ course })
})

const getAllCourses = asyncHanlder(async (req, res) => {
  const courses = await Course.find().populate('user')
  res.status(200).send(courses)
})

const getCourseById = asyncHanlder(async (req, res) => {
  const id = req.query.id
  const course = await Course.findById(id).populate('user')
  res.status(200).send(course)
})

const updateCourse = asyncHanlder(async (req, res) => {
  const user = req.currentUser
  const newCourse = req.body
  const id = +req.params.id
  const verifyUser = await User.findById(id)
  if (verifyUser._id === user._id) {
    const course = await Course.findById(id)
    course.update({
      title: newCourse.title,
      description: newCourse.description,
      estimatedTime: newCourse.estimatedTime,
      materialsNeeded: newCourse.materialsNeeded
    })
    res.status(200).send(course)
  } else {
    res.status(403).json({
      errors: {
        message:
          'You can only edit courses that you own. Please choose a choose a course you own and try again.'
      }
    })
  }
})

// const deleteCourse = asyncHanlder(async (req, res) => {})

module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse
}
