import express from "express";
import APIController from '../controller/APIController';

let router = express.Router();

const initAPIRoute = (app) => {
    router.post("/login", APIController.login)
    router.get('/trangchu', APIController.trangchu)
    router.post('/tthb', APIController.tthb)
    router.post('/createNewHB', APIController.createNewHB)
    router.post('/filtertenHB', APIController.filtertenHB)
    router.post('/updateHB', APIController.updateHB)
    router.post('/deleteHB', APIController.deleteHB)
    return app.use('/api/v1/', router)
}

export default initAPIRoute;