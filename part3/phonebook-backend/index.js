const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const Person = require('./models/person');

const app = express();
const port = process.env.PORT || 3001;

app.use(express.static('build'));
app.use(cors());
app.use(express.json());

morgan.token('body', (req) => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body);
  }
  return '';
});
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
);

app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then((persons) => res.json(persons))
    .catch((err) => next(err));
});

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => res.json(person))
    .catch((err) => next(err));
});

app.post('/api/persons', (req, res, next) => {
  const newPerson = req.body;

  Person.findOne({ name: newPerson.name });
  const newPersonEntry = new Person({ ...newPerson });
  newPersonEntry
    .save()
    .then((result) => res.json(result))
    .catch((err) => next(err));
});

app.put('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndUpdate(
    req.params.id,
    { number: req.body.number },
    { new: true, runValidators: true }
  )
    .then((person) => res.json(person))
    .catch((err) => next(err));
});

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).end())
    .catch((err) => next(err));
});

app.get('/info', (req, res) => Person.find({}).then((persons) => {
  res.send(
    `<p>Phonebook has info for ${
      persons.length
    } people</p><p>${new Date().toUTCString()}</p>`
  );
}));

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoin' });
};

app.use(unknownEndpoint);

const errorHandler = (err, req, res, next) => {
  console.error(err.message);

  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'malformed id' });
  }

  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  }

  return next(err);
};

app.use(errorHandler);

app.listen(port, () => console.log(`Listening on port ${port}!`));
