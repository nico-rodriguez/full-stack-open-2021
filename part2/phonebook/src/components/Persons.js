const Persons = ({ persons }) => persons.map(({ name, phone, id }) => <p key={id}>{name} {phone}</p>);

export default Persons;