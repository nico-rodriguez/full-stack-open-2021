import { useEffect, useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    personService
      .getAll()
      .then(persons => {
        setPersons(persons);
      })
  }, []);

  const matched = (name, query) => name.toLowerCase().includes(query.toLowerCase());

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter query={query} handleQuery={e => setQuery(e.target.value)}/>
      <h3>Add a new</h3>
      <PersonForm persons={persons} setPersons={setPersons}/>
      <h3>Numbers</h3>
      <Persons filteredPersons={persons.filter(({ name}) => matched(name, query))} persons={persons} setPersons={setPersons}/>
    </div>
  )
}

export default App