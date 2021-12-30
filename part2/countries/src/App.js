import axios from 'axios';
import { useEffect, useState } from 'react';
import Results from './components/Results';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(({ data }) => {
      setCountries(data);
    });
  }, []);

  const handleQuery = event => {
    setQuery(event.target.value);
    setFilteredCountries(countries.filter(({ name }) => name.official.toLowerCase().includes(event.target.value.toLowerCase())));
  }

  return (
    <>
      <div>
        Find countries <input type="text" value={query} onChange={handleQuery}></input>
      </div>
      <Results countries={filteredCountries}/>
    </>
  );
}

export default App;
