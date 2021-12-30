import axios from 'axios';
import { useEffect, useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [query, setQuery] = useState('');
  const [filteredPersons, setFilteredPersons] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(({ data }) => {
        setPersons(data);
        setFilteredPersons(data);
      });
  }, []);

  const addName = (event) => {
    event.preventDefault();

    if (persons.find(({ name }) => name === newName)) {
      alert(`${newName} is already in the phonebook`);
    } else {
      const newPerson = {
        name: newName,
        phone: newPhone,
        id: persons.length + 1
      };
      setPersons(persons.concat(newPerson));
      if (newName.toLocaleLowerCase().includes(query.toLocaleLowerCase())) {
        setFilteredPersons(filteredPersons.concat(newPerson));
      }
      setNewName('');
      setNewPhone('');
    }
  }

  const handleQuery = e => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    setFilteredPersons(persons.filter(({ name }) => name.toLowerCase().includes(newQuery.toLowerCase())));
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter query={query} handleQuery={handleQuery}/>
      <h3>Add a new</h3>
      <PersonForm addName={addName} newName={newName} newPhone={newPhone} setNewName={setNewName} setNewPhone={setNewPhone}/>
      <h3>Numbers</h3>
      <Persons persons={filteredPersons}/>
    </div>
  )
}

export default App