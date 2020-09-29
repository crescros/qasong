const express = require('express');
const router = express.Router();

const con = require('../database/connection.js');
const jwt = require("jsonwebtoken");

// routes
router.post('/authenticate', authenticate);
router.post('/changepassword', changePassword);
router.post('/create', makeOne);
router.get('/', getAll);

module.exports = router;

function authenticate(req, res, next) {

    let { username, password } = req.body
    con.query(`SELECT name, id FROM mausers WHERE name='${con.escape(username)}' AND password='${con.escape(password)}';`, (err, data) => {

        if (err) {
            res.json(err)
        } else if (!data[0]) {
            res.status(400).json({ "message": "no user found" })
        } else {

            const token = jwt.sign({ sub: data[0].id }, process.env.SECRET);
            const name = data[0].name

            res.json({

                "username": name,
                "token": token
            })
        }
    })
}

function getAll(req, res, next) {
    con.query(`SELECT name FROM mausers LIMIT 3000;`, (err, data) => {
        if (err) {
            res.json(err)
        } else {
            res.json(data)
        }
    })
}

function makeOne(req, res, next) {
    let { username, password } = req.body
    con.query(`INSERT INTO mausers (name, password) VALUES('${con.escape(username)}', '${con.escape(password)}');`, (err, data) => {

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


    con.query(`UPDATE mausers SET password='${con.escape(newPassword)}' WHERE name='${con.escape(username)}' AND password='${con.escape(password)}'`, (err, data) => {

        if (err) {
            res.json(err)

        } else {
            res.json({ "message": "password changed" })
        }
    })

}

