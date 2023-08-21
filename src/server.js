// const express = require('express')
import express from 'express';
import configViewEngine from './configs/viewEngine';

const app = express()
const port = 2209

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