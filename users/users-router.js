const express = require('express')

const Users = require('./users-model.js')
//const authenticate = require('../auth/authenticate-middleware.js')
const restricted = require('../auth/restricted-middleware.js')

const router = express.Router()

router.get('/', restricted, async (req, res) => {
    try {
        const users = await Users.getUsers()
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json({
            message: "There was an error retrieving the users."
        })
    }
})



/*router.post('/login', (req, res) => {
    const { username, password } = req.headers

    Users.getUserByName(username)
        .then(user => {
            console.log(user)
            if (user && bcrypt.compareSync(password, user.password)) {
                res.status(200).json({
                    message: `${user.username} has successfully logged in!`
                })
            } else {
                res.status(401).json({
                    message: "Your username or password are incorrect."
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: "There was an error logging in."
            })
        })
})*/

module.exports = router