const PersonForm = ({ addName, newName, newPhone, setNewName, setNewPhone }) => <form onSubmit={event => addName(event)}>
  <div>
    name: <input type="text" value={newName} onChange={e => setNewName(e.target.value)}/>
  </div>
  <div>
    number: <input type="tel" value={newPhone} onChange={e => setNewPhone(e.target.value)}/>
  </div>
  <div>
    <button type="submit">add</button>
  </div>
</form>;

export default PersonForm;