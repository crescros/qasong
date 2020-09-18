const expressJwt = require('express-jwt');


module.exports = jwt;

function jwt() {



    return expressJwt({ secret: process.env.SECRET,  algorithms: ['RS256']  }).unless({
        path:[
            /favicon.ico/, // for dev
            new RegExp('\/'),
            new RegExp('\/api\/search'),
            new RegExp('\/api\/users\/authenticate'),
            new RegExp('\/api\/users\/create'),
            new RegExp('\/api\/animations\/trials')
        ]
    });
}
