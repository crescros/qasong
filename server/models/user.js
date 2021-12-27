const { Schema } = require("mongoose");
const bcrypt = require("bcrypt");

let UserSchema = new Schema({
    username: {
        type: String,
        minlength: [ 3, 'What are you, mr. noman?' ],
        maxlength: [ 32, 'Well that\'s a long name... better keep it for yourself.' ],
        required: [ true, 'You can\'t have an account without a name, can you?' ]
    },
    email: {
        type: String,
        lowercase: true,
        required: [ true, 'You don\'t have a home address?' ],
        match: [ /@/, 'Well I need an email, not some random string.' ],
        minlength: [ 5, 'That\'s a short email... or is it really an email?' ],
        maxlength: [ 255, 'Woah, calm down man. You\'re going to mess up your keyboard with that long email' ]
    },
    password: {
        type: String,
        required: [ true, 'Oops, no password = no security. And we don\'t allow that here.' ],
        minlength: [ 8, 'Smaller then 8? Well that must not be nice. Can\'t relate.' ]
    },
});

module.exports = UserSchema;