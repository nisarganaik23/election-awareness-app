const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer'); // Import multer
const path = require('path');
const fs = require('fs');

const app = express();
app.use(express.json());
app.use(cors());

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB Connection
const mongoURI = 'mongodb+srv://nisarganaik57:OrZHsc1bKM95RRkO@nisarga.wyhpu.mongodb.net/voters?retryWrites=true&w=majority&appName=Nisarga';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Voter Schema
const VoterSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  address: String,
  email: String,
  phone: String,
  voterId: { type: String, required: true, unique: true },
  identityProof: String, // Store file path instead of file
});

const Voter = mongoose.model('Voter', VoterSchema);

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// API Route to Register Voter with File Upload
app.post('/api/voters', upload.single('identityProof'), async (req, res) => {
  try {
    const { name, age, gender, address, email, phone } = req.body;

    if (!name || !age || !gender || !address || !email || !phone) {
      return res.status(400).json({ error: 'All fields are required!' });
    }

    const voterId = `VOTER${Math.floor(1000 + Math.random() * 9000)}`;
    const identityProofPath = req.file ? `/uploads/${req.file.filename}` : null;

    const newVoter = new Voter({
      name,
      age,
      gender,
      address,
      email,
      phone,
      voterId,
      identityProof: identityProofPath
    });

    await newVoter.save();
    res.status(201).json({ message: 'Voter registered successfully!', voter: newVoter });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Start the Express Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
