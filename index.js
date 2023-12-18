// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Connect to MongoDB (replace 'your_database_url' with your actual MongoDB connection string)
mongoose.connect('mongodb://localhost:27017/your_database_name', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define patient schema
const patientSchema = new mongoose.Schema({
  name: String,
  contact: String,
  gender: String,
  address: String,
  emergencyName: String,
  relationshipStatus: String,
  encounters: [
    {
      patientId: mongoose.Types.ObjectId,
      date: String,
      time: String,
      bloodPressure: String,
    }
  ]
});

const Patient = mongoose.model('Patient', patientSchema);

app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
  res.send('Front Desk API is running!');
});

app.post('/register', async (req, res) => {
  const {
    name,
    contact,
    gender,
    address,
    emergencyName,
    relationshipStatus
  } = req.body;

  if (!name || !contact || !gender || !address || !emergencyName || !relationshipStatus) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const patient = new Patient({
    name,
    contact,
    gender,
    address,
    emergencyName,
    relationshipStatus
  });

  try {
    await patient.save();
    res.status(201).json(patient);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/encounter/:patientId', async (req, res) => {
  const { date, time, bloodPressure } = req.body;
  const patientId = req.params.patientId;

  try {
    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    patient.encounters.push({ date, time, bloodPressure });
    await patient.save();

    res.status(201).json(patient.encounters[patient.encounters.length - 1]);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/patients', async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/patient/:patientId', async (req, res) => {
  const patientId = req.params.patientId;

  try {
    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    res.json(patient);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
