const asyncHandler = (cb) => {
  return async (req, res, next) => {
    try {
      await cb(req, res, next)
    } catch (err) {
      if (err === 'SequelizeDatabaseError') {
        console.log(err)
        res.status(err.status).json({ error: err.message })
      } else {
        console.log(err)
        res.json({ error: err })
      }
    }
  }
}

module.exports = {
  asyncHandler
}
