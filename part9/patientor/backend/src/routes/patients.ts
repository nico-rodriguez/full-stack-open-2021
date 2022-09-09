import express from 'express';
import patientsService from '../services/patients';
import { toNewPatientEntry } from '../utils/patients';

const router = express.Router();

router.get('/', (_req, res) => {
  const patients = patientsService.getNonSensitiveEntries();

  res.json(patients);
});

router.post('/', function (req, res) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const patient = toNewPatientEntry(req.body);
    const newPatient = patientsService.addEntry(patient);

    res.json(newPatient);
  } catch (error: unknown) {
    let errorMesage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMesage += ' Error: ' + error.message;
    }
    res.status(400).json({ error: errorMesage });
  }
});

export default router;
