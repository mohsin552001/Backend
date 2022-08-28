let mysql = require('mysql');
let connection = mysql.createPool({
    host: "34.133.240.13",
    user: "mohsin",
    password: "abc",
    database: "mohsin"
})



module.exports = {
    connection,
}