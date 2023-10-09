import express from "express";
import APIController from '../controller/APIController';
import multer from "multer";
import path from 'path'
import pool from '../configs/connectDB';

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

    const storage = multer.diskStorage({

        destination: function (req, file, cb) {
            cb(null, "./src/public/ungtuyen");
        },

        filename: async function (req, file, cb) {
            const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
            let originalName = file.originalname;
            let extension = originalName.split(".")[1];
            cb(null, file.fieldname + "-" + uniqueSuffix + "." + extension);
            // Lấy id_sv và maHB từ req.body hoặc req.params
            const { id_sv, maHB } = req.body;

            try {
                console.log(id_sv, maHB)
                pool.execute('insert into ung_tuyen(id_sv, maHB, tenfile, time_upload) values(?, ?, ?, NOW())', [id_sv, maHB, file.fieldname + "-" + uniqueSuffix + "." + extension])

            } catch (err) {
                console.log(err)
            }

        },
    });

    const upload = multer({ storage: storage });
    router.post("/uploadfile", upload.single("file"), function (req, res) {
        console.log('abc')
        return res.status(200).json({
            message: "OK",
        })
    });


    return app.use('/api/v1/', router)
}

export default initAPIRoute;