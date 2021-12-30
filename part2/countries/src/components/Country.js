import axios from 'axios';
import { useEffect, useState } from 'react';

const owm_api_key = process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY;

const Country = ({ country }) => {
  const [weather, setWeather] = useState({});
  useEffect(() => {
    if (country.capital) {
      axios
        .get(`http://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]},${country.cca2}&appid=${owm_api_key}&mode=json&units=metric&lang=en`)
        .then(({ data }) => {
          setWeather({
            temp: data.main.temp,
            windSpeed: data.wind.speed,
            windDir: data.wind.deg,
            icon: data.weather[0].icon,
            iconName: data.weather[0].value
          });
        })
    }
  }, [])

  return (
    <>
      <h2>{country.name.common}</h2>
      {country.capital && <p>Capital {country.capital[0]}</p>}
      <p>Population {country.population}</p>
      <h3>Languages</h3>
      <ul>
        {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
      </ul>
      <img src={`${country.flags.svg}`} alt={`${country.name.official}`} width="100px" height="auto"></img>
      {country.capital && weather && <>      
        <h3>Weather in {country.capital[0]}</h3>
        <p>Temperature: {weather.temp} Celsius</p>
        <img src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt={weather.iconName}></img>
        <p>Wind: {weather.windSpeed} meter/sec direction {weather.windDir}</p>
      </>}
    </>
  );
};

export default Country;