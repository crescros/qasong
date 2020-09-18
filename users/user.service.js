const jwt = require("jsonwebtoken");
const fs = require("fs");

// users hardcoded for simplicity, store in a db for production applications

module.exports = {
    authenticate,
    makeOne,
    changePassword
};

let users = JSON.parse(fs.readFileSync("data/users.json", "utf8"));

async function authenticate({ username, password }) {
    const user = users.find(
        (u) => u.username.toLowerCase() === username.toLowerCase() && u.password === password
    );
    if (user) {
        const token = jwt.sign({ sub: user.id }, process.env.SECRET);
        const { password, ...userWithoutPassword } = user;
        return {
            ...userWithoutPassword,
            token,
        };
    }
}

async function makeOne({ username, password }) {

    let message = ''
    let success = false

    if (users.find(u => u.username == username)) {
        message = "This username " + username + " is already taken"
    } else if (password.length < 8) {
        message = "Password must be at least 8 characters"
    } else {
        users.push({
            "username": username,
            "password": password,
            "groups": ["member"]
        })

        fs.writeFileSync("data/users.json", JSON.stringify(users));

        message = "New Account Created for " + username
        success = true
    }

    return {
        "message": message,
        "success": success 
    }
}

async function changePassword({ username, password, newpassword }) {
    const userIndex = users.findIndex((u) => u.username.toLowerCase() === username.toLowerCase() && u.password === password
    );

    if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], password: newpassword };
        fs.writeFileSync("data/users.json", JSON.stringify(users));

        return "Password Changed"
    }

}
