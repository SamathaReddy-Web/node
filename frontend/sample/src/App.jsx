import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [users, setUsers] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const url = ' http://localhost:5000/users'
      const response = await axios.post(url, {
        name,
        email
      })
      console.log("User created :", response.data)
      setUsers([...users, response.data]) // Update the users state with the new user
      setName('')
      setEmail('')
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const url = ' http://localhost:5000/users'
        const response = await axios.get(url)
        setUsers(response.data)
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }

    fetchUsers()
  }, [])

  return(
    <div>
      <h1>Add User</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} required/>
        <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
        <button type="submit">Submit</button>
      </form>
      <h2>Users List</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user.name} - {user.email}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
