

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// MongoDB setup
mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// MongoDB Schema and Models
const patientSchema = new mongoose.Schema({
  surname: String,
  otherNames: String,
  gender: String,
  phoneNumber: String,
  residentialAddress: String,
  emergencyName: String,
  emergencyContact: String,
  relationshipWithPatient: String,
  encounters: [{
    date: String,
    time: String,
    encounterType: String,
    vitals: {
      bloodPressure: String,
      temperature: String,
      pulse: String,
      spo2: String
    }
  }]
});

const Patient = mongoose.model('Patient', patientSchema);

// Function to register patients
app.post('/patients/register', async (req, res) => {
  const {
    surname,
    otherNames,
    gender,
    phoneNumber,
    residentialAddress,
    emergencyName,
    emergencyContact,
    relationshipWithPatient
  } = req.body;

  try {
    const patient = new Patient({
      surname,
      otherNames,
      gender,
      phoneNumber,
      residentialAddress,
      emergencyName,
      emergencyContact,
      relationshipWithPatient
    });

    await patient.save();

    res.status(201).json(patient);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Function to start an encounter for a patient
app.post('/encounters/start', async (req, res) => {
  const { patientId, date, time, encounterType } = req.body;

  try {
    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    const encounter = {
      date,
      time,
      encounterType
    };

    patient.encounters.push(encounter);
    await patient.save();

    res.status(201).json(encounter);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Function to submit patient vitals by a nurse
app.post('/nurse/vitals', async (req, res) => {
  const { patientId, bloodPressure, temperature, pulse, spo2 } = req.body;

  try {
    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    const currentEncounter = patient.encounters[patient.encounters.length - 1];
    if (!currentEncounter) {
      return res.status(400).json({ error: 'No active encounter for the patient' });
    }

    currentEncounter.vitals = {
      bloodPressure,
      temperature,
      pulse,
      spo2
    };

    await patient.save();

    res.status(201).json(currentEncounter.vitals);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Function to view the list of patients by a doctor
app.get('/doctor/patients', async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Function to view detailed information about a specific patient by a doctor
app.get('/doctor/patients/:patientId', async (req, res) => {
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
