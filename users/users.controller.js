const express = require('express');
const router = express.Router();
const userService = require('./user.service');
const dbClient = require('../database/connection.js');
const jwt = require("jsonwebtoken");

dbClient.connect()

// routes
router.post('/authenticate', authenticate);
router.post('/changepassword', changePassword);
router.post('/create', makeOne);
router.get('/', getAll);

module.exports = router;

function authenticate(req, res, next) {

    let { username, password } = req.body
    dbClient.query(`SELECT name, id FROM mausers WHERE name='${username}' AND password='${password}';`, (err, data) => {

        if (err) {
            res.json(err)
        } else if (!data.rows[0]) {
            res.status(400).json({ "message": "no user found" })
        } else {

            const token = jwt.sign({ sub: data.rows[0].id }, process.env.SECRET);
            const name = data.rows[0].name

            res.json({

                "username": name,
                "token": token
            })
        }
    })
}

function getAll(req, res, next) {

    dbClient.query(`SELECT name, id FROM mausers;`, (err, data) => {

        if (err) {
            res.json(err)
        } else {
            res.json(data.rows)
        }
    })
}

function makeOne(req, res, next) {
    let { username, password } = req.body
    dbClient.query(`INSERT INTO mausers (name, password) VALUES('${username}', '${password}');`, (err, data) => {

        if (err) {
            res.json(err)
        } else {

            res.json({
                "message": `user created`
            })
        }
    })
}

function changePassword(req, res, next) {
    let { username, password, newPassword } = req.body


    dbClient.query(`UPDATE mausers SET password='${newPassword}' WHERE name='${username}' AND password='${password}'`, (err, data) => {

        if (err) {
            res.json(err)

            console.log(err)
        } else {   
            res.json({ "message": "password changed" })
        }
    })

}

