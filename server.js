const express = require('express')

const app = express()
const port = 2209

app.get('/', (req, res) => {
    res.send('Hello Phuong Dinh!')
})

app.get('/about', (req, res) => {
    res.send('Toi la yangho!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})