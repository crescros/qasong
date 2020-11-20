/* eslint-disable no-unused-vars */

const express = require("express");
const router = express.Router();

const con = require("../database/connection.js");
con.connect();

const jwt = require("jsonwebtoken");

// routes
router.post("/authenticate", authenticate);
router.post("/changepassword", changePassword);
router.post("/create", makeOne);
router.get("/", getAll);

module.exports = router;

function authenticate(req, res, next) {
  let { username, password } = req.body;

  const sql = `
    SELECT username, userid, email, badges 
    FROM users 
    WHERE username='${username}' AND password='${password}';
  `;
  // backkkkkkkkkkkkkkk
  // query the database
  con.query(sql, (err, data) => {
    // if SQL error, return that error to the user
    if (err) {
      res.json(err);

      // if no selected user, return 400 error
    } else if (!data[0]) {
      res.status(400).json({ message: "no user found" });
    } else {
      // verify selected user password matches password in request
      if (data[0].password !== password)
        return res.status(400).json({ message: "Incorrect password" });

      // create JWT using database id for selected user
      const token = jwt.sign({ sub: data[0].dbid }, process.env.SECRET);

      // return user fields and token in 200 response
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
  });
}

function getAll(req, res, next) {
  const sql = "SELECT username FROM users LIMIT 3000;";

  con.query(sql, (err, data) => {
    if (err) {
      res.json(err);
    } else {
      res.json(data);
    }
  });
}

function makeOne(req, res, next) {
  let { username, password } = req.body;
  if (!username) return res.json("no username");
  if (!password) return res.json("no password");

  const sql = `
    INSERT INTO users (username, password)
    VALUES('${con.escape(username)}','${con.escape(password)}');
  `;
  con.query(sql, (err, data) => {
    if (err) {
      res.json(err);
    } else {
      res.json({
        message: "user created",
      });
    }
  });
}

function changePassword(req, res, next) {
  let { username, password, newPassword } = req.body;

  const sql = `
    UPDATE users 
    SET password='${con.escape(newPassword)}' 
    WHERE username='${con.escape(username)}' 
    AND password='${con.escape(password)}';
  `;

  con.query(sql, (err, data) => {
    if (err) {
      res.json(err);
    } else {
      res.json({ message: "password changed" });
    }
  });
}
