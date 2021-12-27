const { User } = require("../models");

async function checkUserParams({ params }) {
    if(!params) return { error: "params" };
    if(!params.username || params.username.length < 5 && params.username.length > 32) return { error: "username" };
    if(!params.email || params.email.kength < 5 && params.email.length > 255) return { error: "email" };
    if(!params.password || params.password.length < 8) return { error: "password" };
    if(!params.email.match(/@/)) return { error: "email" };

    let res = await User.findOne({ username: params.username });

    if(res != null) return { error: "user/exists" }

    return { error: "none" };
}

module.exports = checkUserParams;