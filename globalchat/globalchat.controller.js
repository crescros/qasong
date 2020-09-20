const express = require('express');
const router = express.Router();

const con = require('../database/connection.js');
const jwt = require("jsonwebtoken");

// routes
router.post('/', makeOne);
router.get('/', getAll);

function getAll(req, res, next) {
    con.query(`SELECT author, content FROM globalchat ORDER BY created_at DESC LIMIT 12;`, (err, data) => {
        if (err) {
            res.json(err)
        } else {
            res.json(data)
        }
    })
}

function makeOne(req, res, next) {
    let { author, content } = req.body
    con.query(`INSERT INTO globalchat (author, content) VALUES('${author}', '${content}');`, (err, data) => {

        if (err) {
            res.json(err)
        } else {

            res.json({
                "message": `post created`
            })
        }
    })
}



module.exports = router;

