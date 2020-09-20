var mysql = require('mysql');

var con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
});


module.exports = con

// con.connect(function (err) {
//     if (err) throw err;
//     console.log("Connected!");



//     con.query(`
        
//     SELECT * FROM mausers LIMIT 3;
        
        
//         `, function (err, result) {
//         if (err) throw err;
//         console.log(result);





//     })


// });


