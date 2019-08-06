import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios'
import 'semantic-ui-css/semantic.min.css'
import Users from './components/Users'
import { Card } from 'semantic-ui-react'

function App() {
  const [data, setData] = useState([])
  
  useEffect(() => {
    axios
      .get('http://localhost:8001/users')
      .then(response => {
        console.log(response)
        setData(response.data)
      })
  }, [])

  const addUser = e => {
    axios
      .post('http://localhost:8001/users', e)
      .then(response => {
        console.log(response)
        setData(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const deleteUser = id => {
    axios 
      .delete(`http://localhost:8001/users/${id}`)
      .then(response => {
        console.log(response)
        setData(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <div className="App">
      {data.map((user, index) => {
        return <Card key={index}>
          <p>{user.name}</p>
          <p>{user.bio}</p>
          <button onClick={() => deleteUser(user.id)}>Delete</button>
        </Card>
      })}
      <Users addUser={addUser} />
    </div>
  );
}

export default App;
