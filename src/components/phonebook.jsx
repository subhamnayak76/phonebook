// phonebook.jsx

import React from "react";
import axios from "axios";

const Filter = ({ filter, setfilter }) => {
  function filterhandler(event) {
    setfilter(event.target.value);
  }

  return (
    <div>
      filter shown with <input value={filter} onChange={filterhandler} />
    </div>
  );
};

const From = ({
  setNumber,
  number,
  setNewName,
  setPersons,
  persons,
  newName,
}) => {
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
      const existing = persons.find((person) => person.name.toLowerCase() === newName.toLowerCase())
      const updatenumber = {...existing ,number : number}
      if (window.confirm(`${newName} is already added to phonebook ,replace the old number with the new one ?`)){
        axios
        .put(`http://localhost:3001/persons/${updatenumber.id}`,updatenumber)
        .then((response) =>{
          setPersons(persons.map((person) => person.id !== updatenumber.id ? person : response.data))
          setNumber("")
          setNewName("")
        })

      }



    } else {
      const newPerson = {
        id: persons.length + 1,
        name: newName,
        number: number,
      };
      axios
        .post("http://localhost:3001/persons", newPerson)
        .then((response) => {
          setPersons(persons.filter((person) => person.id !== id));
          setNewName("");
        });
    }
  }
  return (
    <>
      <form onSubmit={addNote}>
        <div>
          name: <input value={newName} onChange={onchangehandler} />
        </div>
        <div>
          number: <input value={number} onChange={onnumberhandler} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

const Getresult = ({ persons, filter, setPersons }) => {
  const filteredPersons = persons.filter(
    (person) =>
      person.name && person.name.toLowerCase().includes(filter.toLowerCase())
  );

  const deletehandler = (id) => {
    if (window.confirm("Do you really want to delete")) {
      axios
        .delete(`http://localhost:3001/persons/${id}`)
        .then((response) => {
          setPersons(persons.filter((person) => person.id !== id));
        })

        .catch((error) => {
          console.error("Error deleting the person:", error);
        });
    }
  };

  return (
    <div>
      {filteredPersons.map((x) => (
        <p key={x.id}>
          {x.name} {x.number}{" "}
          <button onClick={() => deletehandler(x.id)}>delete</button>
        </p>
      ))}
    </div>
  );
};

export { Filter, From, Getresult };
