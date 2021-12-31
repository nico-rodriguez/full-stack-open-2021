import { useState } from "react";
import personService from "../services/persons";


const PersonForm = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const addPerson = (event) => {
    event.preventDefault();
    
    const newPerson = {
      name: newName,
      number: newNumber
    };

    const person = persons.find(({ name }) => name === newName);
    if (person) {
      if (window.confirm(`${newName} is already in the phonebook.\nReplace the old number?`)) {
        personService
          .put(person.id, newPerson)
          .then(newPerson => {
            setPersons(persons.map(person => person.name === newPerson.name ? newPerson : person));
            setNewName('');
            setNewNumber('');
          })
      }
    } else {
      personService
        .create(newPerson)
        .then(person => {
          setPersons(persons.concat(person));
          setNewName('');
          setNewNumber('');
        })
    }
  }
  
  return (
    <form onSubmit={event => addPerson(event)}>
      <div>
        name: <input type="text" value={newName} onChange={e => setNewName(e.target.value)}/>
      </div>
      <div>
        number: <input type="tel" value={newNumber} onChange={e => setNewNumber(e.target.value)}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}

export default PersonForm;