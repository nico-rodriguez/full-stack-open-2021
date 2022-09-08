import express from 'express';

import diagnosesService from '../services/diagnoses';

const router = express.Router();

router.get('/', (_req, res) => {
  const diagnoses = diagnosesService.getEntries();

  res.json(diagnoses);
});

export default router;
