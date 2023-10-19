import express from "express";
import APIController from '../controller/APIController';
import multer from "multer";
import path from 'path'
import pool from '../configs/connectDB';
const formidable = require('formidable');

let router = express.Router();

const initAPIRoute = (app) => {
    router.post("/login", APIController.login)
    router.get('/trangchu', APIController.trangchu)
    router.get('/trangchu1', APIController.trangchu1)
    router.get('/trangchu2', APIController.trangchu2)
    router.post('/tthb', APIController.tthb)
    router.post('/createNewHB', APIController.createNewHB)
    router.post('/filtertenHB', APIController.filtertenHB)
    router.post('/updateHB', APIController.updateHB)
    router.post('/deleteHB', APIController.deleteHB)
    router.get('/trangchusv', APIController.trangchusv)
    router.post("/loginsv", APIController.loginsv)
    router.post('/registersv', APIController.registersv)
    router.post('/hsungtuyen', APIController.hsungtuyen)
    router.post('/getMaXacNhan', APIController.getMaXacNhan)


    var filename = ''
    const upload = multer({
        storage: multer.diskStorage({
            destination: './src/public/ungtuyen',
            filename: (req, file, cb) => {
                // tạo tên file duy nhất
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const originalName = file.originalname;
                const extension = originalName.split('.').pop();
                cb(null, file.fieldname + '-' + uniqueSuffix + '.' + extension);
                filename = file.fieldname + '-' + uniqueSuffix + '.' + extension
            }
        })
    });

    router.post('/uploadfile', upload.single('file'), async (req, res) => {
        console.log(req.body)
        let { id_sv, maHB } = req.body
        console.log(id_sv)
        console.log(maHB)


        try {
            // thêm vào CSDL
            await pool.execute(
                'INSERT INTO ung_tuyen(id_sv, maHB, ten_file, time_upload) VALUES(?, ?, ?, NOW())',
                [id_sv, maHB, filename]
            );

            res.status(200).json({ message: 'Upload thành công' });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Lỗi server' });
        }



    });

    return app.use('/api/v1/', router)
}

export default initAPIRoute;