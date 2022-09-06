import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  if (!height || !weight) {
    return res.status(400).send('malformatted parameters');
  }

  if (isNaN(Number(height)) || isNaN(Number(weight))) {
    return res.status(400).send('malformatted parameters');
  }

  const bmi = calculateBmi(Number(height), Number(weight));
  return res.send(bmi);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
