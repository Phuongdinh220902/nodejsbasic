const { json } = require("body-parser")
import pool from '../configs/connectDB';

// let getAllUser = async (req, res) => {
//     const [rows, fields] = await pool.execute("SELECT * FROM user")
//     return res.status(200).json({
//         users: rows
//     })
// }


// let createNewUser = async (req, res) => {
//     let { firstname, lastname, email, address } = req.body;

//     if (!firstname || !lastname || !email || !address) {
//         return res.status(200).json({
//             message: 'missing required params'
//         })
//     }

//     await pool.execute('insert into user(firstname, lastname, email, address) value (?, ?, ?, ?)',
//         [firstname, lastname, email, address])
//     return res.status(200).json({
//         message: 'ok'
//     })
// }


let login = async (req, res) => {
    let { username, password } = req.body;
    const [rows, fields] = await pool.execute("SELECT * FROM admin WHERE username = ? and password = ?", [username, password])
    if (rows.length > 0) {
        return res.status(200).json({
            check: "1"
        })
    } else {
        return res.status(200).json({
            check: "0",
        })
    }
}

let trangchu = async (req, res) => {
    const [rows, fields] = await pool.execute("SELECT maHB, tenHB, hanDK FROM hoc_bong")
    return res.status(200).json({
        thongtin: rows
    })
}

let tthb = async (req, res) => {
    let { maHB } = req.body;
    console.log(maHB); // In maHB ra console
    try {
        const [rows, fields] = await pool.execute("SELECT * FROM hoc_bong WHERE maHB = ?", [maHB])
        if (rows.length > 0) {
            const info = rows[0];
            return res.status(200).json({ info });
        } else {
            return res.status(404).json({ message: "Không tìm thấy thông tin học bổng" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Lỗi server" });
    }
}



module.exports = {
    login, trangchu, tthb
}
