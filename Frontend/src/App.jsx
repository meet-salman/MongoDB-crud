import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'

const App = () => {

  const [students, setStudents] = useState([]);

  // UseRef
  const name = useRef();
  const email = useRef();
  const age = useRef();

  // UseEffect
  useEffect(() => {
    getStudents()
  }, [])

  // Get User From DB
  const getStudents = () => {
    axios.get('http://localhost:3000/api/v1/students')
      .then((res) => {
        setStudents(res.data.students);
      })
      .catch((rej) => {
        console.log(rej);
      })
  }

  // Add User to DB
  const addStudent = (event) => {
    event.preventDefault();

    axios.post('http://localhost:3000/api/v1/students', {
      name: name.current.value,
      email: email.current.value,
      age: age.current.value
    })
      .then((res) => {
        name.current.value = '';
        email.current.value = '';
        age.current.value = '';
        getStudents();

      })
      .catch((rej) => {
        console.log(rej);
      })
  }

  // Edit Student in DB
  const editStudent = () => {

  }

  // Delete Student From DB
  const deleteStudent = (id) => {
    axios.delete(`http://localhost:3000/api/v1/students/${id}`)
      .then((res) => {
        console.log(res.data.message);
        getStudents()
      })
      .catch((rej) => {
        console.log(rej);
      })
  }

  return (
    <>
      <h1> Welcome! </h1>

      {/* User Add Form */}
      <form onSubmit={addStudent}>
        <input type="text" ref={name} placeholder='Name' />
        <input type="email" ref={email} placeholder='Email' />
        <input type="number" ref={age} placeholder='Age' />
        <button type="submit"> Add User </button>
      </form>

      {/* Users Rendering */}
      <div>
        {students.length > 0 ? students.map((student) => {
          return <div key={student._id}>
            <h1>{student.name}</h1>
            <h3> {student.email} </h3>
            <h4> {student._id} </h4>
            <button onClick={() => editStudent(student._id)}>Edit</button>
            <button onClick={() => deleteStudent(student._id)}>Delete</button>
            <hr />
          </div>
        }) : <h3> Loading... </h3>}
      </div>
    </>
  )
}

export default App
