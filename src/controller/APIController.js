const { json } = require("body-parser")
import pool from '../configs/connectDB';

// let getAllHB = async (req, res) => {
//     const [rows, fields] = await pool.execute("SELECT * FROM hoc_bong")
//     return res.status(200).json({
//         users: rows
//     })
// }

let createNewHB = async (req, res) => {
    console.log(req.body)
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
    const [rows, fields] = await pool.execute("SELECT maHB, tenHB, donVi, hanDK FROM hoc_bong order by hanDK DESC")
    const [rows2, fields2] = await pool.execute("SELECT DISTINCT tenHB FROM hoc_bong")
    const [rows3, fields3] = await pool.execute("SELECT DISTINCT donVi FROM hoc_bong")
    const [rows4, fields4] = await pool.execute("SELECT DISTINCT hanDK FROM hoc_bong")

    return res.status(200).json({
        thongtin: rows,
        tk2: rows2,
        tk3: rows3,
        tk4: rows4
    })
}

let trangchu1 = async (req, res) => {
    const currentDate = new Date().toISOString().slice(0, 10); // Lấy ngày hiện tại (định dạng YYYY-MM-DD)

    const [rows, fields] = await pool.execute(`SELECT maHB, tenHB, donVi, hanDK FROM hoc_bong WHERE hanDK >= ? ORDER BY hanDK DESC`, [currentDate]);
    const [rows2, fields2] = await pool.execute("SELECT DISTINCT tenHB FROM hoc_bong");
    const [rows3, fields3] = await pool.execute("SELECT DISTINCT donVi FROM hoc_bong");
    const [rows4, fields4] = await pool.execute("SELECT DISTINCT hanDK FROM hoc_bong");

    return res.status(200).json({
        thongtin: rows,
        tk2: rows2,
        tk3: rows3,
        tk4: rows4
    });
}

let trangchu2 = async (req, res) => {
    const currentDate = new Date().toISOString().slice(0, 10); // lấy ngày hiện tại (định dạng YYYY-MM-DD)

    const [rows, fields] = await pool.execute(`SELECT maHB, tenHB, donVi, hanDK FROM hoc_bong WHERE hanDK < ? ORDER BY hanDK DESC`, [currentDate]);
    const [rows2, fields2] = await pool.execute("SELECT DISTINCT tenHB FROM hoc_bong");
    const [rows3, fields3] = await pool.execute("SELECT DISTINCT donVi FROM hoc_bong");
    const [rows4, fields4] = await pool.execute("SELECT DISTINCT hanDK FROM hoc_bong");

    return res.status(200).json({
        thongtin: rows,
        tk2: rows2,
        tk3: rows3,
        tk4: rows4
    });
}



let filtertenHB = async (req, res) => {
    let { tenHB } = req.body;
    const [rows, fields] = await pool.execute("SELECT * FROM hoc_bong WHERE tenHB = ?", [tenHB])
    const [rows2, fields2] = await pool.execute("SELECT DISTINCT tenHB FROM hoc_bong")
    const [rows3, fields3] = await pool.execute("SELECT DISTINCT donVi FROM hoc_bong")
    const [rows4, fields4] = await pool.execute("SELECT DISTINCT hanDK FROM hoc_bong")
    return res.status(200).json({
        thongtin: rows,
        tk2: rows2,
        tk3: rows3,
        tk4: rows4
    })
}

let tthb = async (req, res) => {
    let { maHB } = req.body;
    console.log(maHB);
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

let updateHB = async (req, res) => {
    let { maHB, tenHB, donVi, dieuKien, soTien, cachThamGia, hanDK, soLuongDK, tgToChuc } = req.body;
    const [rows, fields] = await pool.execute("UPDATE hoc_bong SET tenHB = ?, donVi=?, dieuKien = ?, soTien = ?, cachThamGia = ?,hanDK =?, soLuongDK=?, tgToChuc=?  WHERE maHB=?", [tenHB, donVi, dieuKien, soTien, cachThamGia, hanDK, soLuongDK, tgToChuc, maHB])
    return res.status(200).json({
        "message": "ok"
    })
}

let deleteHB = async (req, res) => {
    let maHB = req.body.maHB;
    if (!maHB) {
        return res.status(400).json({ message: 'Mã học bổng không hợp lệ.' });
    }

    try {
        const [rows, fields] = await pool.execute("DELETE FROM hoc_bong WHERE maHB=?", [maHB]);
        if (rows.affectedRows > 0) {
            return res.status(200).json({ message: 'ok' });
        } else {
            return res.status(404).json({ message: 'Không tìm thấy học bổng để xóa.' });
        }
    } catch (error) {
        console.error("Lỗi khi xóa học bổng:", error);
        return res.status(500).json({ message: 'Có lỗi xảy ra trong quá trình xóa học bổng.' });
    }
}

let trangchusv = async (req, res) => {
    const currentDate = new Date().toISOString().slice(0, 10); // Lấy ngày hiện tại (định dạng YYYY-MM-DD)

    const [rows, fields] = await pool.execute("SELECT * FROM hoc_bong WHERE hanDK >= ? ORDER BY hanDK DESC", [currentDate])

    return res.status(200).json({
        thongtin: rows,
    })
}

let loginsv = async (req, res) => {
    let { email, password } = req.body;
    const [rows, fields] = await pool.execute("SELECT * FROM sinh_vien WHERE email = ? and password = ?", [email, password])
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


module.exports = {
    login, trangchu, tthb, createNewHB, filtertenHB, updateHB, deleteHB, trangchu1, trangchu2, trangchusv, loginsv
}
