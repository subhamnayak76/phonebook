// phonebook.jsx

import React from 'react';
import axios from 'axios';

const Filter = ({ filter, setfilter }) => {
  function filterhandler(event) {
    setfilter(event.target.value);
  }

  return (
    <div>
      filter shown with{' '}
      <input value={filter} onChange={filterhandler} />
    </div>
  );
};


const From = ({setNumber,number,setNewName,setPersons,persons,newName}) =>{
  function onnumberhandler(event) {
    setNumber(event.target.value);
  }
  function onchangehandler(event) {
    setNewName(event.target.value);
  }
  function addNote(event) {
    event.preventDefault();
  
    const isDuplicate = persons.some(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );
    if (isDuplicate) {
      alert(`${newName} is already added in the phonebook`);
    } else {
      const newPerson = {
        id: persons.length + 1,
        name: newName,
        number: number,
      };
      axios
        .post('http://localhost:3001/persons', newPerson)
        .then((response) => {
          setPersons(persons.concat(response.data));
          setNewName('');
        });
    }
  }
  return (
    <>
      <form onSubmit={addNote}>
      <div>
        name:{' '}
        <input
          value={newName}
          onChange={onchangehandler}
        />
      </div>
      <div>
        number:{' '}
        <input
          value={number}
          onChange={onnumberhandler}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
    </>
  )
}

const Getresult =({persons,filter})=>{
  const filteredPersons = persons.filter((person) =>
  person.name.toLowerCase().includes(filter.toLowerCase())
  )
  return(
    <div>
    {filteredPersons.map((x) => (
      <p key={x.id}>
        {x.name} {x.number}
      </p>
    ))}
    </div>

  )
}


 

 

export { Filter, From ,Getresult};

