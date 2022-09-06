import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { exerciseCalculator } from './exerciseCalculator';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

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

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    return res.status(400).json({ error: 'parameters missing' });
  }

  const isNotNumberTarget = isNaN(Number(target));
  const isNotValidDailyExercises =
    !Array.isArray(daily_exercises) ||
    daily_exercises.some((value) => isNaN(Number(value)));
  if (isNotNumberTarget || isNotValidDailyExercises) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const trainingSummary = exerciseCalculator(daily_exercises, Number(target));
  return res.json(trainingSummary);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
