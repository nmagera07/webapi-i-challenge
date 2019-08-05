// implement your API here
const express = require('express')

const Users = require('./data/db')

const server = express()

server.use(express.json())

server.get('/', (req, res) => {
    res.send('hello you can connect')
})

server.get('/users', (req, res) => {
    Users.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(error => {
            if (error) {
                res.status(500).json({ error: 'The users information could not be retrieved.'})
                // res.abort(500).json({ error: 'The users information could not be retrieved.'})
            }
        })
})

server.get('/users/:id', (req, res) => {
    const userId = req.params.id 
    Users.findById(userId)
        .then(user => {
            if (user) {
                res.status(200).json(user)
            } else {
                res.status(404).json({ message: 'The user with the specified ID does not exist'})
            }
        })
        .catch(error => {
            res.status(500).json({ message: 'The user information could not be retrieved'})
        })
})

server.delete('/users/:id', (req, res) => {
    const userId = req.params.id 
    Users.remove(userId)
        .then(user => {
            if (user) {
                res.status(200).json( {user, message: 'user deleted successfully'} )
            } else {
                res.status(404).json({ message: 'The user with the specified ID does not exist.'})
            }
        })
        .catch(error => {
            res.status(500).json({ message: 'user could not be deleted'})
        })
})

server.post('/users', (req, res) => {
    console.log('body data', req)
    const userInfo = req.body
    Users.insert(userInfo)
        .then(user => {
            
            res.status(201).json(user)
           
                res.status(400).json({ errorMessage: 'Please provide name and bio for the user.'})
            
        })
        .catch(error => {
            res.status(500).json({ error: "There was an error while saving the user to the database" })
        })
})

server.put('/users/:id', (req, res) => {
    const { id } = req.params
    const changes = req.body

    Users.update(id, changes)
        .then(updated => {
            if (updated) {
                res.status(200).json(updated)
            } else {
                res.status(404).json({ message: 'The user with the specified ID does not exist.'})
            }
        })
        .catch(error => {
            res.status(500).json({ error: 'The user information could not be modified, sucka'})
        })
})


const port = 8001
server.listen(port, () => console.log('you are connected'))