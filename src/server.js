import express from 'express';
import configViewEngine from './configs/viewEngine';
import initWebRoute from './route/web'
require('dotenv').config()

const app = express()
const port = process.env.PORT || 2209;


//set up new enine
configViewEngine(app);

//init web route
initWebRoute(app);



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})