const db = require('../data/dbConfig.js')

module.exports = {
    getUsers,
    getUserById,
    getUserByName,
    addUser
}

function getUsers() {
    return db('users')
        .select('username')
}

function getUserById(id) {
    return db('users')
        .where({ id })
        .select('username')
        .first()
}

function getUserByName(username) {
    return db('users')
        .where({ username })
        .first()
}

async function addUser(user) {
    const [id] = await db('users').insert(user)
    return getUserById(id)
}