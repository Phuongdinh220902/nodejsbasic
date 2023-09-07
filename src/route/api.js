import express from "express";
import APIController from '../controller/APIController';

let router = express.Router();

const initAPIRoute = (app) => {
    // router.get('/users', APIController.getAllUser) //get -> read data
    // router.post('/create-user', APIController.createNewUser) //post -> create data
    router.post("/login", APIController.login)
    router.get('/trangchu', APIController.trangchu)
    router.post('/tthb', APIController.tthb)
    router.post('/createNewHB', APIController.createNewHB)
    router.post('/filtertenHB', APIController.filtertenHB)
    router.post('/updateHB', APIController.updateHB)
    return app.use('/api/v1/', router)
}

export default initAPIRoute;