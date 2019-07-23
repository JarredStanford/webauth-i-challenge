const express = require('express')

const AuthRouter = require('../auth/auth-router.js')
const UsersRouter = require('../users/users-router.js')
const setupGlobalMiddleware = require('./setup-middleware.js')

const server = express()

setupGlobalMiddleware(server);

server.get('/', (req, res) => {
    res.send("Hi")
})

server.use('/api/auth', AuthRouter)
server.use('/api/users', UsersRouter)


module.exports = server