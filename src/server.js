// const express = require('express')
import express from 'express';
import configViewEngine from './configs/viewEngine';
require('dotenv').config()

const app = express()
const port = process.env.PORT;

console.log('check: ', port)
configViewEngine(app);

app.get('/', (req, res) => {
    res.render('text/index.ejs')
})

app.get('/about', (req, res) => {
    res.send('Toi la yangho!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})