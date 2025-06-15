const express = require("express");
const multer = require("multer");
const path = require("path");
const Voter = require("../models/voterModel");

const router = express.Router();

// Set up storage for identity proof files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Files will be stored in the 'uploads' folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});

// File upload middleware
const upload = multer({ storage });

// ✅ Voter Registration Route with File Upload
router.post("/", upload.single("identityProof"), async (req, res) => {
    try {
        const { name, age, gender, address, email, phone } = req.body;

        if (!req.file) {
            return res.status(400).json({ error: "Identity proof is required!" });
        }

        // Generate unique voterId
        const voterId = `VOTER${Math.floor(1000 + Math.random() * 9000)}`;

        // Save voter details
        const newVoter = new Voter({
            name,
            age,
            voterId,
            gender,
            address,
            email,
            phone,
            identityProof: req.file.path // Store file path
        });

        await newVoter.save();
        res.status(201).json({ message: "Voter registered successfully!", voter: newVoter });
    } catch (error) {
        console.error("Error registering voter:", error);
        res.status(500).json({ error: error.message });
    }
});

// ✅ Get All Voters
router.get("/all", async (req, res) => {
    try {
        const voters = await Voter.find();
        res.status(200).json(voters);
    } catch (error) {
        console.error("Error fetching voters:", error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
