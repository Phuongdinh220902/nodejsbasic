import pool from '../configs/connectDB';

let getHomepage = async (req, res) => {
    const [rows, fields] = await pool.execute('SELECT * FROM user');

    return res.render('index.ejs', { dataUser: rows })
}
let getDetailPage = async (req, res) => {
    let userid = req.params.id;
    let [user] = await pool.execute('SELECT * FROM user WHERE id = ?', [userid])
    console.log('check req params: ', user)
    return res.send(JSON.stringify(user))
}

let createNewUser = async (req, res) => {
    console.log('check req:', req.body)
    let { firstname, lastname, email, address } = req.body;

    await pool.execute('insert into user(firstname, lastname, email, address) value (?, ?, ?, ?)',
        [firstname, lastname, email, address])
    return res.redirect('/')
}

module.exports = {
    getHomepage, getDetailPage, createNewUser
}