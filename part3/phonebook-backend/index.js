const cors = require('cors');
const express = require("express");
const morgan = require("morgan");
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());


morgan.token("body", (req, res) => {
  if (req.method === "POST") return JSON.stringify(req.body);
});
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

let phonebook = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const generateId = () => {
  const range = 238476234872364823;
  return Math.floor(Math.random() * range);
};

app.get("/api/persons", (req, res) => res.json(phonebook));

app.get("/api/persons/:id", (req, res) => {
  const person = phonebook.find(({ id }) => id === Number(req.params.id));

  if (!person) return res.status(404).end();

  res.json(person);
});

app.post("/api/persons", (req, res) => {
  const newPerson = req.body;

  if (!newPerson.name) {
    return res.status(400).json({
      error: "name is missing",
    });
  }

  if (!newPerson.number) {
    return res.status(400).json({
      error: "number is missing",
    });
  }

  if (phonebook.find(({ name }) => name === newPerson.name)) {
    return res.status(400).json({
      error: "name must be unique",
    });
  }

  newPerson.id = generateId();
  phonebook = phonebook.concat(newPerson);
  res.json(newPerson);
});

app.delete("/api/persons/:id", (req, res) => {
  const newPhonebook = phonebook.filter(
    ({ id }) => id !== Number(req.params.id)
  );

  phonebook = newPhonebook;
  res.status(204).end();
});

app.get("/info", (req, res) =>
  res.send(
    `<p>Phonebook has info for ${
      phonebook.length
    } people</p><p>${new Date().toUTCString()}</p>`
  )
);

app.listen(port, () => console.log(`Listening on port ${port}!`));
