import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'

const App = () => {

  const [users, setUsers] = useState([]);

  // UseRef
  const name = useRef();
  const email = useRef();

  // UseEffect
  useEffect(() => {
    getUsers()
  }, [])

  // Get User From Beckend API
  const getUsers = () => {
    axios.get('http://localhost:3000/api/v1/users')
      .then((res) => {
        setUsers(res.data);
      })
      .catch((rej) => {
        console.log(rej);
      })
  }

  // Add User From Beckend API
  const addUser = (event) => {
    event.preventDefault();

    axios.post('http://localhost:3000/api/v1/users', {
      name: name.current.value,
      email: email.current.value
    })
      .then((res) => {
        name.current.value = '';
        email.current.value = '';
        getUsers();

      })
      .catch((rej) => {
        console.log(rej);
      })
  }


  return (
    <>
      <h1> Welcome! </h1>

      {/* User Add Form */}
      <form onSubmit={addUser}>
        <input type="text" ref={name} placeholder='Name' />
        <input type="email" ref={email} placeholder='Email' />
        <button type="submit"> Add User </button>
      </form>

      {/* Users Rendering */}
      <div>
        {users.length > 0 ? users.map((user) => {
          return <div key={user.id}>
            <h1>{user.name}</h1>
            <h3> {user.email} </h3>
            <h4> {user.id} </h4>
            <hr />
          </div>
        }) : <h3> Loading... </h3>}
      </div>
    </>
  )
}

export default App
