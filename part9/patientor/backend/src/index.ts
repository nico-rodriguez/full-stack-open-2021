import express from 'express';

import diagnosesRouter from './routes/diagnoses';

const app = express();
const PORT = process.env.PORT || 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');

  res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);

app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}!`));
