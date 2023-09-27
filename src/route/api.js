import express from "express";
import APIController from '../controller/APIController';

let router = express.Router();

const initAPIRoute = (app) => {
    router.post("/login", APIController.login)
    router.post("/loginsv", APIController.loginsv)
    router.get('/trangchu', APIController.trangchu)
    router.get('/trangchu1', APIController.trangchu1)
    router.get('/trangchu2', APIController.trangchu2)
    router.post('/tthb', APIController.tthb)
    router.post('/createNewHB', APIController.createNewHB)
    router.post('/filtertenHB', APIController.filtertenHB)
    router.post('/updateHB', APIController.updateHB)
    router.post('/deleteHB', APIController.deleteHB)
    router.get('/trangchusv', APIController.trangchusv)
    return app.use('/api/v1/', router)
}

export default initAPIRoute;