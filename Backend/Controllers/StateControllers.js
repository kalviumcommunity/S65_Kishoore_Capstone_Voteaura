const ElectionState = require('../Models/StateModel')

const startElection = async (req, res) => {
  const { state } = req.body
  try {
    const existing = await ElectionState.findOne({ state })
    if (existing) return res.status(400).json({ message: 'Election already started for this state' })
    await ElectionState.create({ state, active: true, stopped: false })
    res.status(200).json({ message: `Election started for ${state}` })
  } catch (error) {
    res.status(500).json({ message: 'Error starting election', error: error.message })
  }
}

const stopElection = async (req, res) => {
  const { state } = req.body
  try {
    await ElectionState.findOneAndUpdate({ state }, { active: false, stopped: true })
    res.status(200).json({ message: `Election stopped for ${state}` })
  } catch (error) {
    res.status(500).json({ message: 'Error stopping election', error: error.message })
  }
}

const endAllElections = async (req, res) => {
  try {
    await ElectionState.deleteMany({})
    res.status(200).json({ message: 'All elections ended' })
  } catch (error) {
    res.status(500).json({ message: 'Error ending elections', error: error.message })
  }
}

const getAllElections = async (req, res) => {
  try {
    const states = await ElectionState.find()
    res.status(200).json(states)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching states', error: error.message })
  }
}

module.exports = { startElection, stopElection, endAllElections, getAllElections }
