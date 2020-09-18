const expressJwt = require('express-jwt');


module.exports = jwt;

function jwt() {



    return expressJwt({ secret: process.env.SECRET,  algorithms: ['RS256']  }).unless({
        path:[
            /favicon.ico/, // for dev
            new RegExp(process.env.APIROOT + '\/'),
            new RegExp(process.env.APIROOT + '\/app'),
            new RegExp(process.env.APIROOT + '\/api\/users\/authenticate'),
            new RegExp(process.env.APIROOT + '\/api\/users\/create'),
            new RegExp(process.env.APIROOT + '\/api\/animations\/trials')
        ]
    });
}
