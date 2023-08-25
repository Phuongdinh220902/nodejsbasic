import connection from '../configs/connectDB';

let getHomepage = (req, res) => {
    let data = [];
    connection.query(
        'SELECT * FROM `user` ',
        function (err, results, fields) {
            results.map((row) => {
                data.push({
                    id: row.id,
                    email: row.email,
                    address: row.address,
                    firstname: row.firstname,
                    lastname: row.lastname
                })
            });

            return res.render('index.ejs', { dataUser: JSON.stringify(data) })
        })

    // console.log('>>check data: ', typeof (data), JSON.stringify(data))

    // return res.render('text/index.ejs', { dataUser: JSON.stringify(data) })
}

module.exports = {
    getHomepage
}