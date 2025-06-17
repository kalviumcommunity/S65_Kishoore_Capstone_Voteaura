const Message = require('../Models/InformationModel')

const createMessage = async (req, res) => {
  try {
    const { heading, text } = req.body
    const newMessage = await Message.create({ heading, text })
    res.status(201).json(newMessage)
  } catch (error) {
    console.log('create message error',error)
    res.status(500).json({ error: 'Failed to create message' })
  }
}

const getMessages = async (req, res) => {
  try {
    const messages = await Message.find()
    res.json(messages)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' })
  }
}

const deleteMessage = async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id)
    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete message' })
  }
}

module.exports = { createMessage, getMessages, deleteMessage }
