const express = require("express");
const router = express.Router();
const { User } = require("../models");
const checkUserParams = require("../_helpers/checkUserParams");
const bcrypt = require("bcrypt");
const types = require("../types");

// routes
router.get("/createUser", createUser);

module.exports = router;

async function createUser(req, res) {
  let check = await checkUserParams({ params: req.query });

  if (check == "none") {
    bcrypt.hash(req.query.password, 10, (err, hash) => {
      User.create({
        username: req.query.username,
        password: hash,
        email: req.query.email.toLowerCase(),
      }).then((user) => {
        res.status(200).json({
          message: "User was succesfully created.",
          user: user,
        });
      });
    });
  } else {
    res.status(400).json({ message: types[check] });
  }
}
