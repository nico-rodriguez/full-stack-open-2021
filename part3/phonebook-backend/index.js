const Person = require("./models/person");
const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const app = express();
const port = process.env.PORT || 3001;

app.use(express.static("build"));
app.use(cors());
app.use(express.json());

morgan.token("body", (req, res) => {
  if (req.method === "POST") return JSON.stringify(req.body);
});
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.get("/api/persons", (req, res, next) => {
  Person.find({})
    .then((persons) => res.json(persons))
    .catch((err) => next(err));
});

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => res.json(person))
    .catch((err) => next(err));
});

app.post("/api/persons", (req, res, next) => {
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

  Person.findOne({ name: newPerson.name })
    .then((person) => {
      if (person) {
        return res.status(400).json({
          error: "name must be unique",
        });
      }

      const newPersonEntry = new Person({ ...newPerson });
      newPersonEntry.save().then((result) => {
        res.json(result);
      });
    })
    .catch((err) => next(err));
});

app.put("/api/persons/:id", (req, res, next) => {
  if (!req.body.number) {
    return res.status(400).end();
  }

  Person.findByIdAndUpdate(
    req.params.id,
    { number: req.body.number },
    { new: true }
  )
    .then((person) => res.json(person))
    .catch((err) => next(err));
});

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then((result) => {
      console.log(result);
      res.status(204).end();
    })
    .catch((err) => next(err));
});

app.get("/info", (req, res) =>
  Person.find({}).then((persons) => {
    res.send(
      `<p>Phonebook has info for ${
        persons.length
      } people</p><p>${new Date().toUTCString()}</p>`
    );
  })
);

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoin" });
};

app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformed id" });
  }

  next(error);
};

app.use(errorHandler);

app.listen(port, () => console.log(`Listening on port ${port}!`));
