const { Schema } = require("mongoose");
const bcrypt = require("bcrypt");

let UserSchema = new Schema({
  username: {
    type: String,
    required: [true, "You can't have an account without a name, can you?"],
  },
  email: {
    type: String,
    lowercase: true,
    required: [true, "You don't have a home address?"],
    match: [/@/, "Well I need an email, not some random string."],
  },
  password: {
    type: String,
    required: [true, "Oops, no password = no security. And we don't allow that here."],
  },
});

module.exports = UserSchema;
