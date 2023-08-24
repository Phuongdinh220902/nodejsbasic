import mysql from 'mysql2';

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    port: '3307',
    user: 'root',
    database: 'nodejs_basic'
});

// simple query
// connection.query(
//     'SELECT * FROM `user`',
//     function (err, results, fields) {
//         console.log('check mysql')
//         console.log(results); // results contains rows returned by server
//         let rows = results.map((row) => { return row });
//         console.log(rows);
//     }
// );

export default connection;