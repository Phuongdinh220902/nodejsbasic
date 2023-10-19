const { json } = require("body-parser")
import pool from '../configs/connectDB';
const crypto = require('crypto');
const nodemailer = require('nodemailer');

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
    console.log(rows[0]['id_sv'])
    if (rows.length > 0) {
        return res.status(200).json({
            check: "1",
            id_sv: rows[0]['id_sv']
        })
    } else {
        return res.status(200).json({
            check: "0",
        })
    }
}

let registersv = async (req, res) => {
    let { mssv, tenSV, email, password, nganh_hoc } = req.body;

    // Kiểm tra xem sinh viên đã tồn tại với email này chưa
    const [existingRows, existingFields] = await pool.execute("SELECT * FROM sinh_vien WHERE email = ?", [email]);

    if (existingRows.length > 0) {
        return res.status(400).json({
            message: "Email đã tồn tại trong hệ thống",
        });
    }

    try {
        const [rows, fields] = await pool.execute(
            "INSERT INTO sinh_vien (mssv, tenSV, email, password, nganh_hoc) VALUES (?, ?, ?, ?, ?)",
            [mssv, tenSV, email, password, nganh_hoc]
        );

        return res.status(200).json({
            check: "1",
        });
    } catch (error) {
        console.error(error);
        return res.status(200).json({
            check: "0",
        });
    }
}

// let hsungtuyen = async (req, res) => {
//     let maHB = req.body;
//     console.log(req.body)
//     const [rows, fields] = await pool.execute("SELECT id_sv, ten_file FROM ung_tuyen WHERE maHB = ?", [maHB]);
//     if (rows.length > 0) {
//         const info = rows[0];
//         return res.status(200).json({ info });
//     } else {
//         return res.status(404).json({ message: "Không tìm thấy thông tin học bổng" });
//     }
//     return res.status(200).json({
//         thongtin: rows,
//     })
// }

let hsungtuyen = async (req, res) => {
    try {
        // Kiểm tra xem trường maHB có trong req.body không
        if (!req.body.maHB) {
            return res.status(400).json({ message: "Thiếu thông tin mã học bổng" });
        }

        const maHB = req.body.maHB; // Giả sử trường mã học bổng là maHB
        console.log(req.body);
        const [rows, fields] = await pool.execute("SELECT id_sv, ten_file FROM ung_tuyen WHERE maHB = ?", [maHB]);
        if (rows.length > 0) {
            const info = rows[0];
            return res.status(200).json({ info });
        } else {
            return res.status(404).json({ message: "Không tìm thấy thông tin học bổng" });
        }
    } catch (error) {
        console.error("Error occurred: ", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}


let getMaXacNhan = async (req, res) => {
    let email = req.body.email
    // let testAccount = await nodemailer.createTestAccount();
    const generateVerificationCode = (length) => {
        // return Math.floor(1000 + Math.random() * 9000).toString();
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    };

    const verificationCode = generateVerificationCode(6);

    // console.log(verificationCode)

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        service: 'gmail',
        auth: {
            user: "ld7941682@gmail.com",
            pass: "ijippjqyfxuyqgxs",
        },
    });

    const [r1, f1] = await pool.execute("SELECT * FROM sinh_vien WHERE email = ?", [email])

    if (r1.length == 0) {
        return res.status(200).json({
            check: "0",
            msg: "Email không tồn tại"
        })
    }

    // const [r2, f2] = await pool.execute("UPDATE users set maxacnhan=? where email = ?", [verificationCode, email])
    const [r2, f2] = await pool.execute('SELECT password FROM sinh_vien WHERE email = ?', [email])

    const old_password = r2[0].password
    // console.log(old_password)
    await pool.execute("UPDATE sinh_vien SET password = ? WHERE email = ?", [verificationCode, email])
    const mailOptions = {
        from: 'ld7941682@gmail.com',
        to: email,
        subject: 'New Password',
        text: `Your new password is: ${verificationCode}`,
    };

    await transporter.sendMail(mailOptions, async function (error, info) {
        if (error) {
            console.log(error);
            await pool.execute("UPDATE sinh_vien SET password = ? WHERE email = ?", [
                old_password,
                email,
            ]);
            return res.status(200).json({ check: "0" });
        } else {
            return res.status(200).json({ check: "1" });
        }
    });
}




module.exports = {
    login, trangchu, tthb, createNewHB, filtertenHB, updateHB, deleteHB, trangchu1, trangchu2,
    trangchusv, loginsv, registersv, hsungtuyen, getMaXacNhan
}