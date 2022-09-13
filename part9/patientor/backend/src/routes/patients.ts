import express from 'express';
import patientsService from '../services/patients';
import { toNewEntry, toNewPatientEntry } from '../utils/patients';

const router = express.Router();

router.get('/', (_req, res) => {
  const patients = patientsService.getNonSensitiveEntries();

  res.json(patients);
});

router.get('/:patientId', (req, res) => {
  const { patientId } = req.params;

  const patient = patientsService.getEntryById(patientId);

  if (patient) {
    res.json(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const patient = toNewPatientEntry(req.body);
    const newPatient = patientsService.addPatientEntry(patient);

    res.json(newPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).json({ error: errorMessage });
  }
});

router.post('/:patientId/entries', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const entry = toNewEntry(req.body);
    const { patientId } = req.params;
    const newEntry = patientsService.addEntry(entry, patientId);

    res.json(newEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).json({ error: errorMessage });
  }
});

export default router;
