import personService from "../services/persons";


const Persons = ({ filteredPersons, persons, setPersons }) => {
  const handleDelete = (id, deleteName) => {
    if (window.confirm(`Delete ${deleteName}?`)) {
      personService
        .remove(id)
        .then(() => setPersons(persons.filter(({ name }) => name !== deleteName)));
    }
  }

  return filteredPersons.map(({ name, number, id }) =>
    <p key={id}>{name} {number} <button onClick={() => handleDelete(id, name)}>delete</button></p>
)};

export default Persons;