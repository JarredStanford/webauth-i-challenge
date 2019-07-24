const router = require('express').Router()
const bcrypt = require('bcryptjs')

const Users = require('../users/users-model.js')

router.post('/register', uniqueNameCheck, (req, res) => {
    const user = {
        username: req.body.username,
        password: req.body.password
    }

    if (user.username && user.password) {
        const hash = bcrypt.hashSync(user.password, 10);
        user.password = hash

        Users.addUser(user)
            .then(saved => {
                res.status(201).json(saved)
            })
            .catch(err => {
                res.status(500).json({
                    message: "There was a registration error."
                })
            })
    } else {
        res.status(400).json({
            message: "Username & Password required to register."
        })
    }
})

router.post('/login', (req, res) => {
    const { username, password } = req.body

    if (username && password) {
        Users.getUserByName(username)
            .then(user => {

                if (user && bcrypt.compareSync(password, user.password)) {
                    req.session.username = user.username;
                    console.log(req.session)
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
    } else {
        res.status(401).json({
            message: "Username or password are missing."
        })
    }

})

router.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                res.status(500).json({
                    message: "There was an error logging out."
                })
            } else {
                res.status(200).json({
                    message: "You have been logged out!"
                })
            }
        })
    } else {
        res.status(200).json({
            message: 'You are not logged in.'
        })
    }
})

//middleware
async function uniqueNameCheck(req, res, next) {
    const { username } = req.body
    const user = await Users.getUserByName(username)
    user
        ? res.status(400).json({
            message: "A user with this name already exists."
        })
        : next()
}

module.exports = router;