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


// let getDetailPage = async (req, res) => {
//     try {
//         let id = req.params.id;
//         let [userRows, userFields] = await pool.execute('SELECT * FROM user WHERE id = 1');
//         console.log('check req params: ', userRows);
//         return res.send('hello');
//     } catch (error) {
//         console.error(error);
//         return res.status(500).send('Internal Server Error');
//     }
// };
module.exports = {
    getHomepage, getDetailPage
}