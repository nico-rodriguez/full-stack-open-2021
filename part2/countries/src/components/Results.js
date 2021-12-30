import { useState } from "react";
import Country from "./Country";

const Results = ({ countries }) => {
  const [show, setShow] = useState(null);

  if (countries.length > 10) return <p>More than 10 countries matched! Specify another filter.</p>;
  
  if (countries.length > 1) {
    const countryNames = countries.map((country, index) =>
      <p key={country.name.official}>
        {country.name.official} <button value={index} onClick={() => setShow(index)}>show</button>
      </p>);

    if (show != null) {
      return <>
        {countryNames}
        <Country country={countries[show]} />
      </>;
    } else {
      return countryNames;
    }
  }
  
  if (countries.length === 0) return null;
  
  // countries.length === 1
  return <Country country={countries[0]}/>;
}

export default Results;