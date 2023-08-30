const { json } = require("body-parser")
import pool from '../configs/connectDB';

// let getAllHB = async (req, res) => {
//     const [rows, fields] = await pool.execute("SELECT * FROM hoc_bong")
//     return res.status(200).json({
//         users: rows
//     })
// }


// let createNewHB = async (req, res) => {
//     let { tenHB, donVi, dieuKien, soTien, cachThamGia, hanDK, soLuongDK, tgToChuc } = req.body;

//     if (!tenHB || !donVi || !dieuKien || !soTien || !cachThamGia || !hanDK || !soLuongDK || !tgToChuc) {
//         return res.status(200).json({
//             message: 'missing required params'
//         })
//     }

//     const query = 'INSERT INTO hoc_bong(tenHB, donVi, dieuKien, soTien, cachThamGia, hanDK, soLuongDK, tgToChuc) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
//     await pool.execute(query, [tenHB, donVi, dieuKien, soTien, cachThamGia, hanDK, soLuongDK, tgToChuc]);
//     return res.status(200).json({
//         message: 'ok'
//     })
// }

let createNewHB = async (req, res) => {
    try {
        const { tenHB, donVi, dieuKien, soTien, cachThamGia, hanDK, soLuongDK, tgToChuc } = req.body;

        if (!tenHB || !donVi || !dieuKien || !soTien || !cachThamGia || !hanDK || !soLuongDK || !tgToChuc) {
            return res.status(400).json({
                message: 'Missing required parameters'
            });
        }

        const query = 'INSERT INTO hoc_bong(tenHB, donVi, dieuKien, soTien, cachThamGia, hanDK, soLuongDK, tgToChuc) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        await pool.execute(query, [tenHB, donVi, dieuKien, soTien, cachThamGia, hanDK, soLuongDK, tgToChuc]);

        return res.status(200).json({
            message: 'OK'
        });
    } catch (error) {
        console.error('Error while adding scholarship:', error);
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
};



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
    login, trangchu, tthb, createNewHB
}
