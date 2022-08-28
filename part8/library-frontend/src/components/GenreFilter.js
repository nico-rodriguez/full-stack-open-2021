const GenreFilter = ({ name, setFilter }) => {
  return <button onClick={() => setFilter(name)}>{name}</button>;
};

export default GenreFilter;
