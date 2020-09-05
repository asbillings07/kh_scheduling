const createWithAnotherModel = async (topModel, topModelId, insertModel, data, prop, res) => {
  try {
    const doc = await insertModel.create(data)
    console.log('created:', doc)
    await topModel.findByIdAndUpdate(
      topModelId,
      { $push: { [prop]: doc._id } },
      { new: true, useFindAndModify: false }
    )
    res.status(201).json({
      success: true,
      error: false,
      message: `${prop} created successfully`,
      [prop]: doc
    })
  } catch (err) {
    res.status(400).json({ success: false, error: true, errorMessage: err })
  }
}

module.exports = {
  createWithAnotherModel
}
