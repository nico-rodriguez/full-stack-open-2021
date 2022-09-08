import express from 'express';
import patientsService from '../services/patients';

const router = express.Router();

router.get('/', (_req, res) => {
  const patients = patientsService.getNonSensitiveEntries();

  res.json(patients);
});

export default router;
