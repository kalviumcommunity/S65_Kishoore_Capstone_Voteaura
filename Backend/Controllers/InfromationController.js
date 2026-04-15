const Message = require('../Models/InformationModel');

/**
 * POST /api/information/
 * Create a new information message (admin broadcast).
 */
const createMessage = async (req, res, next) => {
  try {
    const { heading, text } = req.body;
    const newMessage = await Message.create({ heading, text });
    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Error creating message:', error);
    next(error);
  }
};

/**
 * GET /api/information/
 * Get all information messages.
 */
const getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find().sort({ _id: -1 });
    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/information/:id
 * Delete an information message by ID.
 */
const deleteMessage = async (req, res, next) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    res.status(200).json({ success: true, message: 'Message deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = { createMessage, getMessages, deleteMessage };
