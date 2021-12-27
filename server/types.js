let error = {
    // ACCOUNT RELATED ERRORS
    NO_PASSWORD: "Ooops, I found no password.",
    PASSWORD_SHORT: "Well looks like your password is too short. Needs to be longer then 8 characters.",
    PASSWORD: "Your password is either too short or too long.",
    NO_EMAIL: "Oops, I found no email.",
    EMAIL_NOTVALID: "Well, the magicians couldn\'t match your email. That must suck.",
    EMAIL_SHORT: "Looks like the bare minimum is 5 characters.",
    EMAIL_LONG: "Your email is longer then 255 characters? Wow, that's amazing but it's not going to work.",
    EMAIL: "Your email is either too short or too long.",
    NO_USERNAME: "You want an account without a name?",
    USERNAME_SHORT: "Well your username is too short. 3+ baby.",
    USERNAME_LONG: "Calm down man, the limit is 32 characters.",
    USERNAME: "Your username is either too short or too long.",
    USER_EXISTS: "Oops, looks like that name is already in use.",

    // INTERNAL ERRORS
    missing_params: "Mr. Dev, you forgot to actually pass something. Heeeeelloooooo"
}

module.exports = error;