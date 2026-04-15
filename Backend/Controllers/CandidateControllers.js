const Candidate = require('../Models/CandidateModel');
const { getIO } = require('../Config/socket');

/**
 * POST /api/candidates/add
 * Add a new candidate with profile and party images.
 */
const addCandidate = async (req, res, next) => {
  try {
    const { name, partyname } = req.body;
    const { profileimg, partyimg } = req.files;

    if (!name || !partyname) {
      return res.status(400).json({ message: 'Name and party name are required.' });
    }

    if (!profileimg || !partyimg) {
      return res.status(400).json({ message: 'Profile image and party image are required.' });
    }

    const newCandidate = new Candidate({
      name: name.trim(),
      profileimg: profileimg[0].path,
      partyname: partyname.trim(),
      partyimg: partyimg[0].path,
    });

    await newCandidate.save();

    return res.status(201).json({
      message: 'Candidate added successfully',
      candidate: newCandidate,
    });
  } catch (error) {
    console.error('Error in adding Candidate:', error);
    next(error); // Pass to centralized error handler
  }
};

/**
 * GET /api/candidates/
 * Retrieve all candidates.
 */
const getAllCandidates = async (req, res, next) => {
  try {
    const candidates = await Candidate.find();
    res.status(200).json(candidates);
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/candidates/vote/:id
 * Cast a vote for a candidate and emit real-time update via Socket.io.
 */
const voteCandidate = async (req, res, next) => {
  try {
    const { id } = req.params;

    const candidate = await Candidate.findById(id);
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }

    candidate.voteCount += 1;
    await candidate.save();

    // Emit real-time vote update to all connected clients
    try {
      getIO().emit('vote-updated', {
        candidateId: candidate._id,
        voteCount: candidate.voteCount,
      });
    } catch (socketError) {
      console.error('Socket.io emit error (non-critical):', socketError.message);
    }

    return res.status(200).json({ message: 'Vote cast successfully', candidate });
  } catch (error) {
    console.error('Error casting vote:', error);
    next(error);
  }
};

module.exports = { addCandidate, getAllCandidates, voteCandidate };
