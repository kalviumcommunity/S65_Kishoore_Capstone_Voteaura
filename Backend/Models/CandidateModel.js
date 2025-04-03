const mongoose = require('mongoose')

const CandidateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: [3, "Minimum character length should be 3"],
    },
    profileimg: {
        type: String,
        required: true
    },
    partyname: {
        type: String,
        required: true
    },
    partyimg: {
        type: String,
        required: true
    },
    voteCount: {
        type: Number,
        default: 0
    }

});

module.exports = mongoose.model("Candidate", CandidateSchema)
