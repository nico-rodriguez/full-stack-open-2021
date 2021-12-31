import { useEffect, useState } from 'react';
import Filter from './components/Filter';
import Notification from './components/Notification';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [query, setQuery] = useState('');
  const [errMsg, setErrMsg] = useState(null);
  const [notificationType, setNotificationType] = useState('error');

  useEffect(() => {
    personService
      .getAll()
      .then(persons => {
        setPersons(persons);
      })
      .catch(err => displayNotification(`Could not retrieve the persons from the server\n${err}`, 'error', 5000))
  }, []);

  const matched = (name, query) => name.toLowerCase().includes(query.toLowerCase());

  const displayNotification = (message, notificationType, timeOut) => {
    setErrMsg(message);
    setNotificationType(notificationType);
    setTimeout(() => setErrMsg(null), timeOut);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errMsg} notificationType={notificationType}/>
      <Filter query={query} handleQuery={e => setQuery(e.target.value)}/>
      <h3>Add a new</h3>
      <PersonForm displayNotification={displayNotification} persons={persons} setPersons={setPersons}/>
      <h3>Numbers</h3>
      <Persons displayNotification={displayNotification} filteredPersons={persons.filter(({ name}) => matched(name, query))} persons={persons} setPersons={setPersons}
        setErrMsg={setErrMsg} setNotificationType={setNotificationType}
      />
    </div>
  )
}

export default App