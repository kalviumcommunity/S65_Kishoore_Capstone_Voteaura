const Candidate = require('../Models/CandidateModel')

const addCandidate = async (req, res) => {
  try {
    const { name, partyname, state, district } = req.body
    const { profileimg, partyimg } = req.files
    if (!name || !partyname || !state || !district) {
      return res.status(400).json({ error: 'Missing required fields in the form data' })
    }

    if (!profileimg || !partyimg || !profileimg[0] || !partyimg[0]) {
      return res.status(400).json({ error: 'Missing profile or party image' })
    }

    const newCandidate = new Candidate({
      name: name.trim(),
      profileimg: profileimg[0].path,
      partyname: partyname.trim(),
      partyimg: partyimg[0].path,
      state: state.trim(),
      district: district.trim()
    })

    await newCandidate.save()

    return res.status(201).json({ message: 'Candidate added successfully', candidate: newCandidate })
  } catch (error) {
    console.error("Error in adding Candidate:", error)
    return res.status(500).json({ error: "Error in adding Candidate", desc: error.message })
  }
}


const getAllCandidates = async (req, res) => {
  const {state}=req.query
  try {
    const candidates = await Candidate.find({state})
    res.status(200).json({candidates})
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
