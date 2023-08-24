import connection from '../configs/connectDB';

let getHomepage = (req, res) => {
    let data = [];
    connection.query(
        'SELECT * FROM `user` ',
        function (err, results, fields) {
            console.log('>check mysql')
            console.log(results); // results contains rows returned by server
            data = results.map((row) => { return row });
            console.log('>>check data: ', data)
        }
    )
    return res.render('text/index.ejs', { dataUser: JSON.stringify(data) })
}

module.exports = {
    getHomepage
}