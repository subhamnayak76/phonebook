import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('your name')
  const [number,setNumber] = useState('your number')
  const [filter,setFilter] = useState('')
  function addNote(event) {
    event.preventDefault()
    const isDuplicate = persons.some(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );
    if(isDuplicate){
      alert(`${newName} is already added in the phonebook`)
    }
    else{
    const newname = {
      id : persons.length + 1,
      name : newName,
      number: number
    }
  
    setPersons(persons.concat(newname))
    setNewName('')
  
  }
}
function onnumberhandler(event) {
 setNumber(event.target.value)
}
  function onchangehandler(event) {
    setNewName (event.target.value)
  }
  function filterhandler(event) {
    setFilter(event.target.value)
  }
    const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
    
  )
  console.log(filteredPersons)
  
  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value ={filter}
        onChange={filterhandler}
        />
      </div>
      <form onSubmit={addNote}>
        <div>
          name: <input value ={newName}
            onChange={onchangehandler}
            />
        </div>
        <div>number: <input value={number}
        onChange = {onnumberhandler}
        /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
      {filteredPersons.map((x) => (
          <p key={x.id}>{x.name} {x.number}</p>
        ))}
      </div>
    </div>
  )
}

export default App