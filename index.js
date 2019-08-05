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
            res.status(500).json({ message: 'error fetching list of users'})
        })
})



const port = 8001
server.listen(port, () => console.log('you are connected'))