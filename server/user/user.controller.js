const express = require("express");
const router = express.Router();
const { User } = require("../models");
const checkUserParams = require("../_helpers/checkUserParams");
const bcrypt = require("bcrypt");

// routes
router.get("/createUser", createUser);

module.exports = router;

async function createUser(req, res) {
    let check = await checkUserParams({params: req.query });
    
    if(check.error == "none") {
        bcrypt.hash(req.query.password, 10, (err, hash) => {
            User.create({
                username: req.query.username,
                password: hash,
                email: req.query.email.toLowerCase()
            }).then(user => {
                res.status(200).json({
                    message: "User was succesfully created.",
                    user: user
                })
            })
        })
    } else {
        switch(check.error) {
            case "username": 
                return res.status(400).json({ message: "No username/doesn't meet criteria" });
                break;
            case "password":
                return res.status(400).json({ message: "No password/doesn't meet criteria" });
                break;
            case "email":
                return res.status(400).json({ message: "No email/doesn't meet criteria" });
                break;
            case "user/exists": 
                return res.status(400).json({ message: "Username exists." });
                break;
        }
    }
}
