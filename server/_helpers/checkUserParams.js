const { User } = require("../models");

async function checkUserParams({ params }) {
  if (!params) return "missing_params";

  if (!params.username || params.username.length < 5 || params.username.length > 32)
    return "USERNAME";

  if (!params.email || params.email.length < 5 || params.email.length > 255)
    return "EMAIL";
  if (!params.email.match(/@/)) return "EMAIL";

  if (!params.password || params.password.length < 8) return "PASSWORD";

  let res = await User.findOne({ username: params.username });
  if (res != null) return "USER_EXISTS";

  return "none";
}

module.exports = checkUserParams;
