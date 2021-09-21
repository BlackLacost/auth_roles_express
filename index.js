const express = require('express')
const config = require('config')

const port = config.get('port')
const host = config.get('host')

const app = express()

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(port, () => {
  console.log(`Сервер запущен на http://${host}:${port}`)
})
