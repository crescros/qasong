const uuid = require('uuid')


module.exports = {
    makeOne,
    changePassword
};



async function makeOne({ username, password }) {

    let message = ''
    let success = false

    if (users.find(u => u.username == username)) {
        message = "This username " + username + " is already taken"
    } else if (password.length < 8) {
        message = "Password must be at least 8 characters"
    } else {

        let dateCreated = new Date()

        users.push({
            "id": uuid.v4(),
            "date_created": dateCreated,
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
