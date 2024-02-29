import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'

const App = () => {

  const [students, setStudents] = useState([]);
  const [editForm, setEditForm] = useState(false);
  const [id, setID] = useState();

  // UseRef
  const name = useRef();
  const email = useRef();
  const age = useRef();
  const editedName = useRef();
  const editedEmail = useRef();
  const editedAge = useRef();



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

  // Show Edit Form
  const showEditForm = (id, index) => {
    setEditForm(true);

    editedEmail.current.value = students[index].email;
    editedName.current.value = students[index].name;
    editedAge.current.value = students[index].age;

    setID(id)
  }

  // Edit Student in DB
  const updateStudent = (event) => {
    event.preventDefault();

    axios.put(`http://localhost:3000/api/v1/students/${id}`, {
      name: editedName.current.value,
      email: editedEmail.current.value,
      age: editedAge.current.value
    })
      .then((res) => {
        console.log(res.data.message);
        getStudents();
        setEditForm(false);
      })
      .catch((rej) => {
        console.log(rej);
      })
  }

  // Delete Student From DB
  const deleteStudent = (id, index) => {
    axios.delete(`http://localhost:3000/api/v1/students/${id}`)
      .then((res) => {
        console.log(res.data.message);
        students.splice(index, 1);
        setStudents([...students]);
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

      <br />

      {/* Edit Student Form */}
      <form onSubmit={updateStudent} style={editForm ? { display: 'block' } : { display: 'none' }}>
        <input type="text" ref={editedName} placeholder='Name' />
        <input type="email" ref={editedEmail} placeholder='Email' />
        <input type="number" ref={editedAge} placeholder='Age' />
        <button type="submit"> Update </button>
      </form>


      {/* Users Rendering */}
      <div>
        {students.length > 0 ? students.map((student, index) => {
          return <div key={student._id}>
            <h1>{student.name}</h1>
            <h3> {student.email} </h3>
            <h4> {student.age} </h4>
            <button onClick={() => showEditForm(student._id, index)}>Edit</button>
            <button onClick={() => deleteStudent(student._id, index)}>Delete</button>
            <hr />
          </div>
        }) : <h3> Loading... </h3>}
      </div>

    </>
  )
}

export default App
