const ElectionState = require('../Models/StateModel');

/**
 * POST /api/elections/start
 * Start an election for a given state.
 */
const startElection = async (req, res, next) => {
  const { state } = req.body;
  try {
    const existing = await ElectionState.findOne({ state });
    if (existing) {
      return res.status(409).json({ message: 'Election already started for this state' });
    }

    await ElectionState.create({ state, active: true, stopped: false });
    res.status(201).json({ message: `Election started for ${state}` });
  } catch (error) {
    console.error('Error starting election:', error);
    next(error);
  }
};

/**
 * POST /api/elections/stop
 * Stop an ongoing election for a given state.
 */
const stopElection = async (req, res, next) => {
  const { state } = req.body;
  try {
    const election = await ElectionState.findOneAndUpdate(
      { state },
      { active: false, stopped: true },
      { new: true }
    );

    if (!election) {
      return res.status(404).json({ message: `No active election found for ${state}` });
    }

    res.status(200).json({ message: `Election stopped for ${state}` });
  } catch (error) {
    console.error('Error stopping election:', error);
    next(error);
  }
};

/**
 * DELETE /api/elections/end-all
 * End all elections (removes all records).
 */
const endAllElections = async (req, res, next) => {
  try {
    await ElectionState.deleteMany({});
    res.status(200).json({ message: 'All elections ended' });
  } catch (error) {
    console.error('Error ending elections:', error);
    next(error);
  }
};

/**
 * GET /api/elections/
 * Retrieve all election states.
 */
const getAllElections = async (req, res, next) => {
  try {
    const states = await ElectionState.find();
    res.status(200).json(states);
  } catch (error) {
    next(error);
  }
};

module.exports = { startElection, stopElection, endAllElections, getAllElections };
