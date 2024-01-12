import { useEffect, useState } from 'react'
import axios from 'axios'
import { Filter, From, Getresult } from './components/phonebook';
// import Getresult from './components/phonebook'
const App = () => {
  const [persons, setPersons] = useState([])
  useEffect(() =>{
    axios
    .get('http://localhost:3001/persons')
    .then(response =>{
      setPersons(response.data)
    })
  },[])


  

  const [newName, setNewName] = useState('yo')
  const [number,setNumber] = useState('your number')
  const [filter,setFilter] = useState('')
 
 
  
    
  
  // console.log(filteredPersons)
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter ={filter}  setfilter = {setFilter}/>
  
    
    <From number={number}
    setNewName={setNewName}
    setNumber={setNumber}
    persons={persons}
    setPersons={setPersons}
    newName={newName}
    
    />
      <h2>Numbers</h2>
    <Getresult persons={persons} filter ={filter}/>
      
    </div>
  

    
 )
}

export default App