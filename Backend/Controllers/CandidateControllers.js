const Candidate = require('../Models/CandidateModel')

const addCandidate = async (req, res) => {
  try {
    const {name, partyname} = req.body

    const newCandidate = new Candidate({
      name,
      profileimg: `/uploads/${req.files.profileimg[0].filename}`,
      partyname,
      partyimg: `/uploads/${req.files.partyimg[0].filename}`
    })

    await newCandidate.save()

    return res.status(201).json({ message: 'Candidate added successfully', candidate: newCandidate })
  } catch (error) {
    console.error("Error in adding Candidate:", error)
    return res.status(500).json({ error: "Error in adding Candidate", desc: error.message })
  }
}

const getAllCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find()
    res.status(200).json(candidates)
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

const voteCandidate = async (req, res) => {
  try {
    const { id } = req.params

    const candidate = await Candidate.findById(id)
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' })
    }

    candidate.voteCount += 1
    await candidate.save()

    return res.status(200).json({ message: 'Vote cast successfully', candidate })
  } catch (error) {
    console.error('Error casting vote:', error)
    return res.status(500).json({ error: 'Error casting vote', desc: error.message })
  }
}

module.exports = { addCandidate, getAllCandidates, voteCandidate }
