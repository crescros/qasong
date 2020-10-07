const express = require("express")
const router = express.Router()

const con = require("../database/connection.js")
const jwt = require("jsonwebtoken")

// routes
router.post("/", makeOne)
router.get("/", getAll)

function getAll(req, res, next) {
  con.query(
    `SELECT id, created_at, author, content FROM globalchat ORDER BY created_at DESC LIMIT 80;`,
    (err, data) => {
      if (err) {
        res.json(err)
      } else {
        data.forEach((msg) => {
          let timeStamp = new Date(msg.created_at)
          msg.created_at = timeStamp.toLocaleString()
        })

        res.json(data)
      }
    }
  )
}

function makeOne(req, res, next) {
  let { author, content } = req.body
  con.query(
    `INSERT INTO globalchat (author, content) VALUES('${con.escape(
      author
    )}', '${con.escape(content)}');`,
    (err, data) => {
      if (err) {
        res.json(err)
      } else {
        res.json({
          message: `post created`,
        })
      }
    }
  )
}

module.exports = router
