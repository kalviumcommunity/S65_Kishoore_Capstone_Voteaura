const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
  heading: String,
  text: String
})

module.exports = mongoose.model('Message', messageSchema)
