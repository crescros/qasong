/* eslint-disable no-unused-vars */

const express = require("express");
const router = express.Router();

const con = require("../database/connection.js");
const jwt = require("jsonwebtoken");

// routes
router.post("/authenticate", authenticate);
router.post("/changepassword", changePassword);
router.post("/create", makeOne);
router.get("/", getAll);

module.exports = router;

function authenticate(req, res, next) {
  let { username, password } = req.body;
  con.query(
    `SELECT username, userid, email, badges FROM users WHERE username='${
      username
    }' AND password='${password}';`,
    (err, data) => {
      if (err) {
        res.json(err);
      } else if (!data[0]) {
        res.status(400).json({ message: "no user found" });
      } else {
        const token = jwt.sign({ sub: data[0].dbid }, process.env.SECRET);

        const username = data[0].username;
        const email = data[0].email;
        const badges = data[0].badges;

        res.json({
          email: email,
          badges: badges,
          username: username,
          token: token,
        });
      }
    }
  );
}

function getAll(req, res, next) {
  con.query("SELECT username FROM users LIMIT 3000;", (err, data) => {
    if (err) {
      res.json(err);
    } else {
      res.json(data);
    }
  });
}

function makeOne(req, res, next) {
  let { username, password } = req.body;
  if(!username) return res.json("no username");;
  if(!password) return rese.json("no password");;
  con.query(
    `INSERT INTO users (username, password) VALUES('${con.escape(username)}', '${con.escape(
      password
    )}');`,
    (err, data) => {
      if (err) {
        res.json(err);
      } else {
        res.json({
          message: "user created",
        });
      }
    }
  );
}

function changePassword(req, res, next) {
  let { username, password, newPassword } = req.body;

  con.query(
    `UPDATE users SET password='${con.escape(newPassword)}' WHERE username='${con.escape(
      username
    )}' AND password='${con.escape(password)}'`,
    (err, data) => {
      if (err) {
        res.json(err);
      } else {
        res.json({ message: "password changed" });
      }
    }
  );
}
