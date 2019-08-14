const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const session = require('express-session')
const KnexSessionStore = require('connect-session-knex')(session)

module.exports = server => {
    const sessionConfig = {
        name: 'focusGroup',
        secret: process.env.SESSION_SECRET || 'secret',
        cookie: {
            maxAge: 1000 * 60 * 10,
            secure: false,
            httpOnly: true
        },
        resave: false,
        saveUninitialized: true,
        store: new KnexSessionStore({
            knex: require('../data/dbConfig.js'),
            tablename: 'sessions',
            createTable: true,
            sidfieldname: 'sid',
            clearInterval: 1000 * 60 * 60
        })
    }

    server.use(helmet());
    server.use(express.json());
    server.use(cors());
    server.use(session(sessionConfig))
}