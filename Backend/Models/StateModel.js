const mongoose = require('mongoose')

const electionStateSchema = new mongoose.Schema({
  state: { type: String, required: true, unique: true },
  active: { type: Boolean, default: true },
  stopped: { type: Boolean, default: false }
})

module.exports = mongoose.model('ElectionState', electionStateSchema)
