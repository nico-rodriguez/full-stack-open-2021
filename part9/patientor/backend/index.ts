import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');

  res.send('pong');
});

app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}!`));
