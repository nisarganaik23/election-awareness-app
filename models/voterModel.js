const mongoose = require("mongoose");

const voterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    voterId: {  
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String
    },
    address: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    identityProof: {  // New field for storing the file path
        type: String,
        required: true
    }
}, { timestamps: true });

const Voter = mongoose.model("Voter", voterSchema);
module.exports = Voter;
