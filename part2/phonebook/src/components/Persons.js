import personService from "../services/persons";


const Persons = ({ displayNotification, filteredPersons, persons, setPersons, setErrMsg, setNotificationType }) => {
  const handleDelete = (id, deleteName) => {
    if (window.confirm(`Delete ${deleteName}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(({ name }) => name !== deleteName));
          displayNotification(`Removed ${deleteName} from the server`, 'success', 5000);
        })
        .catch(err => displayNotification(`Could not delete ${deleteName} from the server\n${err}`, 'error', 5000));
    }
  }

  return filteredPersons.map(({ name, number, id }) =>
    <p key={id}>{name} {number} <button onClick={() => handleDelete(id, name)}>delete</button></p>
)};

export default Persons;