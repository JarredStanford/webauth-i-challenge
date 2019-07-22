const bcrypt = require('bcryptjs')

const Users = require('../users/users-model.js')

module.exports = authenticate

function authenticate(req, res, next) {
    const { username, password } = req.headers

    Users.getUserByName(username)
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                next()
            } else {
                res.status(400).json({
                    message: "Username or password is not correct."
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                messagE: "There was an error logging in."
            })
        })
}